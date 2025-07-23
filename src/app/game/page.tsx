'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Clock, Trophy, User, Home } from 'lucide-react';
import Link from 'next/link';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Canvas from '@/components/Canvas';

interface BoardTile {
  id: number;
  type: 'SPLDV' | 'MatDas' | 'Bonus' | 'Kosong';
  position: number;
}

interface Question {
  id: string;
  category: 'SPLDV' | 'MatDas';
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: 'A' | 'B' | 'C' | 'D';
  time_limit: number;
}

interface GameState {
  currentPosition: number;
  score: number;
  timeRemaining: number;
  currentQuestion?: Question;
  isGameActive: boolean;
  totalQuestions: number;
  correctAnswers: number;
  diceValue: number;
  isRolling: boolean;
  questionTimeRemaining: number;
  canvasData?: string;
}

export default function GamePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    currentPosition: 0,
    score: 0,
    timeRemaining: 30 * 60, // 30 menit dalam detik
    isGameActive: false,
    totalQuestions: 0,
    correctAnswers: 0,
    diceValue: 1,
    isRolling: false,
    questionTimeRemaining: 0
  });

  // Board tiles (40 tiles in monopoly style)
  const boardTiles: BoardTile[] = Array.from({ length: 40 }, (_, i) => {
    const types: ('SPLDV' | 'MatDas' | 'Bonus' | 'Kosong')[] = ['SPLDV', 'MatDas', 'Bonus', 'Kosong'];
    return {
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      position: i
    };
  });

  useEffect(() => {
    // Cek apakah user sudah login
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      router.push('/login-siswa');
      return;
    }
    
    const userData = JSON.parse(currentUser);
    if (userData.role !== 'siswa') {
      router.push('/');
      return;
    }
    
    setUser(userData);
    fetchQuestions(userData.guru_id);
    startGame();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState.isGameActive && gameState.timeRemaining > 0) {
      timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (gameState.timeRemaining === 0) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [gameState.timeRemaining, gameState.isGameActive]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState.currentQuestion && gameState.questionTimeRemaining > 0) {
      timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          questionTimeRemaining: prev.questionTimeRemaining - 1
        }));
      }, 1000);
    } else if (gameState.currentQuestion && gameState.questionTimeRemaining === 0) {
      // Waktu habis, jawaban salah
      answerQuestion('A', true); // timeout
    }
    return () => clearTimeout(timer);
  }, [gameState.questionTimeRemaining, gameState.currentQuestion]);

  const fetchQuestions = async (guruId: string) => {
    try {
      const q = query(collection(db, 'questions'), where('created_by', '==', guruId));
      const querySnapshot = await getDocs(q);
      const questionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];
      setQuestions(questionsData);
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Fallback ke soal default jika tidak ada soal dari guru
      setQuestions(getDefaultQuestions());
    }
  };

  const getDefaultQuestions = (): Question[] => {
    return [
      {
        id: 'default1',
        category: 'SPLDV',
        question: 'Tentukan nilai x dan y dari sistem persamaan: 2x + 3y = 12 dan x - y = 1',
        option_a: 'x = 3, y = 2',
        option_b: 'x = 2, y = 3',
        option_c: 'x = 1, y = 4',
        option_d: 'x = 4, y = 1',
        correct_answer: 'A',
        time_limit: 60
      },
      {
        id: 'default2',
        category: 'MatDas',
        question: 'Hasil dari 15 + 25 × 2 adalah...',
        option_a: '65',
        option_b: '55',
        option_c: '80',
        option_d: '40',
        correct_answer: 'A',
        time_limit: 20
      }
    ];
  };

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      isGameActive: true,
      timeRemaining: 30 * 60
    }));
  };

  const endGame = async () => {
    setGameState(prev => ({
      ...prev,
      isGameActive: false
    }));

    // Simpan sesi game ke Firebase
    try {
      await addDoc(collection(db, 'sessions'), {
        user_id: user.id || 'anonymous',
        guru_id: user.guru_id,
        nama: user.nama,
        kelas: user.kelas,
        skor: gameState.score,
        waktu_mulai: new Date(Date.now() - (30 * 60 - gameState.timeRemaining) * 1000),
        waktu_selesai: new Date(),
        waktu_pengerjaan: 30 * 60 - gameState.timeRemaining,
        total_jawaban: gameState.totalQuestions,
        total_benar: gameState.correctAnswers,
        is_finished: true
      });

      // Simpan data sesi untuk feedback
      localStorage.setItem('gameSession', JSON.stringify({
        score: gameState.score,
        totalQuestions: gameState.totalQuestions,
        correctAnswers: gameState.correctAnswers,
        timeUsed: 30 * 60 - gameState.timeRemaining
      }));
    } catch (error) {
      console.error('Error saving game session:', error);
    }

    // Redirect ke feedback
    router.push('/feedback');
  };

  const rollDice = () => {
    if (!gameState.isGameActive || gameState.isRolling || gameState.currentQuestion) return;

    playDiceSound();
    setGameState(prev => ({ ...prev, isRolling: true }));

    // Animasi dadu
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        diceValue: Math.floor(Math.random() * 6) + 1
      }));
      rollCount++;
      
      if (rollCount >= 10) {
        clearInterval(rollInterval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setGameState(prev => ({
          ...prev,
          diceValue: finalValue,
          isRolling: false,
          currentPosition: (prev.currentPosition + finalValue) % 40
        }));
        
        // Cek tile yang didarati
        setTimeout(() => {
          checkTileAction((gameState.currentPosition + finalValue) % 40);
        }, 500);
      }
    }, 100);
  };

  const checkTileAction = (position: number) => {
    const tile = boardTiles[position];
    
    switch (tile.type) {
      case 'SPLDV':
        showQuestion('SPLDV');
        break;
      case 'MatDas':
        showQuestion('MatDas');
        break;
      case 'Bonus':
        const bonusPoints = Math.floor(Math.random() * 20) + 10;
        setGameState(prev => ({
          ...prev,
          score: prev.score + bonusPoints
        }));
        alert(`Bonus! +${bonusPoints} poin`);
        break;
      case 'Kosong':
        break;
    }
  };

  const showQuestion = (category: 'SPLDV' | 'MatDas') => {
    const categoryQuestions = questions.filter(q => q.category === category);
    if (categoryQuestions.length === 0) {
      // Fallback ke soal default
      const defaultQuestions = getDefaultQuestions().filter(q => q.category === category);
      if (defaultQuestions.length > 0) {
        const question = defaultQuestions[Math.floor(Math.random() * defaultQuestions.length)];
        setGameState(prev => ({
          ...prev,
          currentQuestion: question,
          questionTimeRemaining: question.time_limit
        }));
      }
      return;
    }

    const question = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
    setGameState(prev => ({
      ...prev,
      currentQuestion: question,
      questionTimeRemaining: question.time_limit
    }));
  };

  const answerQuestion = (answer: 'A' | 'B' | 'C' | 'D', isTimeout = false) => {
    if (!gameState.currentQuestion) return;

    const isCorrect = !isTimeout && answer === gameState.currentQuestion.correct_answer;
    const points = isCorrect 
      ? (gameState.currentQuestion.category === 'SPLDV' ? 10 : 5)
      : (gameState.currentQuestion.category === 'SPLDV' ? -5 : -3);

    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
      totalQuestions: prev.totalQuestions + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      currentQuestion: undefined,
      questionTimeRemaining: 0,
      canvasData: undefined
    }));

    playClickSound();
    
    if (isTimeout) {
      alert('Waktu habis! Jawaban dianggap salah.');
    } else {
      alert(isCorrect ? `Benar! +${Math.abs(points)} poin` : `Salah! ${points} poin`);
    }

    // Cek apakah sudah mencapai 15 soal
    if (gameState.totalQuestions + 1 >= 15) {
      setTimeout(() => endGame(), 1000);
    }
  };

  const handleCanvasExport = (imageData: string) => {
    setGameState(prev => ({
      ...prev,
      canvasData: imageData
    }));
    alert('Canvas berhasil diekspor! Sekarang pilih jawaban.');
  };

  const playClickSound = () => {
    const audio = new Audio('/sounds/click.mp3');
    audio.play().catch(() => {});
  };

  const playDiceSound = () => {
    const audio = new Audio('/sounds/dice.mp3');
    audio.play().catch(() => {});
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDiceIcon = (value: number) => {
    const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
    const Icon = icons[value - 1];
    return <Icon className="w-8 h-8" />;
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800">
            <Home className="w-6 h-6" />
          </Link>
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="font-medium">{user.nama}</span>
            <span className="text-sm text-gray-500">({user.kelas})</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-red-500" />
            <span className="font-mono text-lg">{formatTime(gameState.timeRemaining)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-lg">{gameState.score}</span>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Board Grid */}
          <div className="grid grid-cols-10 gap-2 mb-6">
            {boardTiles.map((tile, index) => (
              <div
                key={tile.id}
                className={`
                  aspect-square border-2 rounded-lg flex items-center justify-center text-xs font-medium relative
                  ${tile.type === 'SPLDV' ? 'bg-blue-100 border-blue-300 text-blue-800' : ''}
                  ${tile.type === 'MatDas' ? 'bg-green-100 border-green-300 text-green-800' : ''}
                  ${tile.type === 'Bonus' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' : ''}
                  ${tile.type === 'Kosong' ? 'bg-gray-100 border-gray-300 text-gray-600' : ''}
                  ${gameState.currentPosition === index ? 'ring-4 ring-red-400' : ''}
                `}
              >
                {tile.type}
                {gameState.currentPosition === index && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">👤</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Game Controls */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={rollDice}
              disabled={!gameState.isGameActive || gameState.isRolling || !!gameState.currentQuestion}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {getDiceIcon(gameState.diceValue)}
              <span>{gameState.isRolling ? 'Rolling...' : 'Roll Dice'}</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-800">{gameState.totalQuestions}</div>
              <div className="text-sm text-gray-600">Total Soal</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{gameState.correctAnswers}</div>
              <div className="text-sm text-gray-600">Benar</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">{gameState.totalQuestions - gameState.correctAnswers}</div>
              <div className="text-sm text-gray-600">Salah</div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Modal */}
      {gameState.currentQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="text-center mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  gameState.currentQuestion.category === 'SPLDV' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {gameState.currentQuestion.category}
                </div>
                <div className="flex items-center space-x-2 text-red-600">
                  <Clock className="w-5 h-5" />
                  <span className="font-mono text-lg">{formatTime(gameState.questionTimeRemaining)}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {gameState.currentQuestion.question}
              </h3>
            </div>

            {/* Canvas Area */}
            <div className="mb-6">
              <Canvas onExport={handleCanvasExport} width={600} height={200} />
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {['A', 'B', 'C', 'D'].map((option) => (
                <button
                  key={option}
                  onClick={() => answerQuestion(option as 'A' | 'B' | 'C' | 'D')}
                  className="text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-indigo-600">{option}.</span>{' '}
                  {gameState.currentQuestion[`option_${option.toLowerCase()}`]}
                </button>
              ))}
            </div>

            <div className="text-center text-sm text-gray-500">
              Gunakan canvas untuk coret-coret, lalu pilih jawaban yang benar
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

