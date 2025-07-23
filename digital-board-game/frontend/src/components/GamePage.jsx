import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Trophy, Clock, Users, LogOut } from 'lucide-react'

import dadu1 from '../assets/dadu1.jpeg'
import dadu2 from '../assets/dadu2.jpeg'
import dadu3 from '../assets/dadu3.jpeg'
import dadu4 from '../assets/dadu4.jpeg'
import dadu5 from '../assets/dadu5.jpeg'
import dadu6 from '../assets/dadu6.jpeg'

import sound30Second from '../assets/sounds/30second.mp3'
import soundCorrect from '../assets/sounds/correct.mp3'
import soundDice from '../assets/sounds/dice.mp3'
import soundIncorrect from '../assets/sounds/incorrect.mp3'
import soundKlik from '../assets/sounds/klik.mp3'

const GamePage = ({ user, socket, onLogout }) => {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState({
    players: [],
    currentPlayer: null,
    gameStarted: false,
    gameEnded: false,
    timeLeft: 1800, // 30 minutes in seconds
    currentQuestion: null,
    questionTimeLeft: 30,
    leaderboard: [],
    winners: []
  })
  
  const [playerPosition, setPlayerPosition] = useState(0)
  const [diceValue, setDiceValue] = useState(1)
  const [isRolling, setIsRolling] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)
  const [questionAnswer, setQuestionAnswer] = useState({
    method: '',
    equation: '',
    contextual: ''
  })
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const [playerStats, setPlayerStats] = useState({
    correctAnswers: 0,
    totalAnswers: 0
  })

  const timerRef = useRef(null)
  const questionTimerRef = useRef(null)

  const diceImages = [dadu1, dadu2, dadu3, dadu4, dadu5, dadu6]

  const playClickSound = () => {
    new Audio(soundKlik).play()
  }

  const playDiceSound = () => {
    new Audio(soundDice).play()
  }

  const playCorrectSound = () => {
    new Audio(soundCorrect).play()
  }

  const playIncorrectSound = () => {
    new Audio(soundIncorrect).play()
  }

  const play30SecondSound = () => {
    new Audio(sound30Second).play()
  }

  useEffect(() => {
    if (!socket) return

    // Join game room
    socket.emit('join_game', { user })

    // Socket event listeners
    socket.on('game_state_update', (state) => {
      setGameState(state)
    })

    socket.on('question_received', (question) => {
      setGameState(prev => ({ ...prev, currentQuestion: question, questionTimeLeft: 30 }))
      setShowQuestion(true)
      play30SecondSound()
      startQuestionTimer()
    })

    socket.on('player_moved', ({ playerId, newPosition }) => {
      if (playerId === user.id) {
        setPlayerPosition(newPosition)
      }
    })

    socket.on('game_ended', (results) => {
      setGameState(prev => ({ ...prev, gameEnded: true, winners: results.winners }))
      clearTimers()
    })

    return () => {
      socket.off('game_state_update')
      socket.off('question_received')
      socket.off('player_moved')
      socket.off('game_ended')
      clearTimers()
    }
  }, [socket, user])

  useEffect(() => {
    if (gameState.gameStarted && gameState.timeLeft > 0) {
      startGameTimer()
    }
    return () => clearTimers()
  }, [gameState.gameStarted])

  const clearTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (questionTimerRef.current) clearInterval(questionTimerRef.current)
  }

  const startGameTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    
    timerRef.current = setInterval(() => {
      setGameState(prev => {
        const newTimeLeft = prev.timeLeft - 1
        if (newTimeLeft <= 0) {
          clearInterval(timerRef.current)
          socket.emit('game_timeout')
          return { ...prev, timeLeft: 0, gameEnded: true }
        }
        return { ...prev, timeLeft: newTimeLeft }
      })
    }, 1000)
  }

  const startQuestionTimer = () => {
    if (questionTimerRef.current) clearInterval(questionTimerRef.current)
    
    questionTimerRef.current = setInterval(() => {
      setGameState(prev => {
        const newQuestionTimeLeft = prev.questionTimeLeft - 1
        if (newQuestionTimeLeft <= 0) {
          clearInterval(questionTimerRef.current)
          handleQuestionTimeout()
          return { ...prev, questionTimeLeft: 0 }
        }
        return { ...prev, questionTimeLeft: newQuestionTimeLeft }
      })
    }, 1000)
  }

  const handleQuestionTimeout = () => {
    setShowQuestion(false)
    setQuestionAnswer({ method: '', equation: '', contextual: '' })
    socket.emit('answer_question', {
      questionId: gameState.currentQuestion?.id,
      answer: null,
      timeout: true
    })
  }

  const rollDice = () => {
    if (isRolling || gameState.currentPlayer !== user.id) return
    
    playDiceSound()
    setIsRolling(true)
    
    // Animate dice roll
    let rollCount = 0
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1)
      rollCount++
      
      if (rollCount >= 10) {
        clearInterval(rollInterval)
        const finalValue = Math.floor(Math.random() * 6) + 1
        setDiceValue(finalValue)
        setIsRolling(false)
        
        // Emit dice roll to server
        socket.emit('roll_dice', { value: finalValue })
      }
    }, 100)
  }

  const submitAnswer = () => {
    if (!questionAnswer.method || !questionAnswer.equation) return

    playClickSound()
    clearInterval(questionTimerRef.current)
    
    const isCorrect = checkAnswer()
    
    if (isCorrect) {
      playCorrectSound()
      setPlayerStats(prev => ({
        correctAnswers: prev.correctAnswers + 1,
        totalAnswers: prev.totalAnswers + 1
      }))
    } else {
      playIncorrectSound()
      setPlayerStats(prev => ({
        ...prev,
        totalAnswers: prev.totalAnswers + 1
      }))
    }

    socket.emit('answer_question', {
      questionId: gameState.currentQuestion?.id,
      answer: questionAnswer,
      isCorrect
    })

    setShowQuestion(false)
    setQuestionAnswer({ method: '', equation: '', contextual: '' })
  }

  const checkAnswer = () => {
    // Simple answer checking logic - in real implementation, this would be more sophisticated
    const question = gameState.currentQuestion
    if (!question) return false

    // Check if method selection is appropriate
    const validMethods = ['eliminasi', 'substitusi', 'gabungan']
    if (!validMethods.includes(questionAnswer.method.toLowerCase())) return false

    // Basic equation format check
    if (!questionAnswer.equation.includes('x') || !questionAnswer.equation.includes('y')) return false

    // For demonstration, we'll consider it correct if all fields are filled
    return questionAnswer.method && questionAnswer.equation && 
           (questionAnswer.method !== 'gabungan' || questionAnswer.contextual)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const generateBoard = () => {
    const board = []
    const totalCells = 40
    
    // Create board layout (10 cells per side)
    for (let i = 0; i < totalCells; i++) {
      let position = { row: 0, col: 0 }
      
      if (i < 10) {
        // Top row (left to right)
        position = { row: 0, col: i }
      } else if (i < 20) {
        // Right column (top to bottom)
        position = { row: i - 10, col: 9 }
      } else if (i < 30) {
        // Bottom row (right to left)
        position = { row: 9, col: 9 - (i - 20) }
      } else {
        // Left column (bottom to top)
        position = { row: 9 - (i - 30), col: 0 }
      }
      
      board.push({
        id: i,
        position,
        players: gameState.players.filter(p => p.position === i)
      })
    }
    
    return board
  }

  const renderBoard = () => {
    const board = generateBoard()
    
    return (
      <div className="game-board">
        {board.map((cell) => (
          <div
            key={cell.id}
            className={`board-cell ${cell.id === playerPosition ? 'bg-blue-100' : ''}`}
            style={{
              gridRow: cell.position.row + 1,
              gridColumn: cell.position.col + 1
            }}
          >
            <span className="text-xs">{cell.id + 1}</span>
            {cell.players.map((player, index) => (
              <div
                key={player.id}
                className="player-piece"
                style={{
                  backgroundColor: player.color || '#3b82f6',
                  transform: `translate(-50%, -50%) translate(${index * 4}px, ${index * 4}px)`
                }}
                title={player.name}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  const renderDice = () => {
    return (
      <div className="dice-container">
        <div 
          className={`dice ${isRolling ? 'animate-spin' : ''}`}
          onClick={rollDice}
          style={{ cursor: gameState.currentPlayer === user.id ? 'pointer' : 'not-allowed' }}
        >
          <img 
            src={diceImages[diceValue - 1]} 
            alt={`Dice ${diceValue}`}
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-sm text-gray-600">
          {gameState.currentPlayer === user.id ? 'Giliran Anda!' : 'Menunggu giliran...'}
        </p>
      </div>
    )
  }

  const renderQuestionDialog = () => {
    if (!gameState.currentQuestion) return null

    return (
      <Dialog open={showQuestion} onOpenChange={() => {}}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Soal SPLDV</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="timer danger">
              Waktu tersisa: {formatTime(gameState.questionTimeLeft)}
            </div>
            
            <div className="question-card">
              <h3>Soal:</h3>
              <p>{gameState.currentQuestion.question}</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>1. Pilih Metode Penyelesaian:</Label>
                <Select value={questionAnswer.method} onValueChange={(value) => 
                  setQuestionAnswer(prev => ({ ...prev, method: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih metode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eliminasi">Eliminasi</SelectItem>
                    <SelectItem value="substitusi">Substitusi</SelectItem>
                    <SelectItem value="gabungan">Gabungan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>2. Tulis Persamaan Linear:</Label>
                <Textarea
                  value={questionAnswer.equation}
                  onChange={(e) => setQuestionAnswer(prev => ({ ...prev, equation: e.target.value }))}
                  placeholder="Contoh: 2x + 3y = 7000 dan x + 2y = 4000"
                  rows={3}
                />
              </div>

              {questionAnswer.method === 'gabungan' && (
                <div>
                  <Label>3. Jawaban Kontekstual (x dan y):</Label>
                  <Input
                    value={questionAnswer.contextual}
                    onChange={(e) => setQuestionAnswer(prev => ({ ...prev, contextual: e.target.value }))}
                    placeholder="Contoh: x = 2000, y = 1000"
                  />
                </div>
              )}

              {questionAnswer.method && questionAnswer.method !== 'gabungan' && (
                <div>
                  <Label>3. Jawaban ({questionAnswer.method === 'substitusi' ? 'nilai x atau y' : 'nilai x atau y'}):</Label>
                  <Input
                    value={questionAnswer.contextual}
                    onChange={(e) => setQuestionAnswer(prev => ({ ...prev, contextual: e.target.value }))}
                    placeholder="Contoh: x = 2000 atau y = 1000"
                  />
                </div>
              )}
            </div>

            <Button 
              onClick={submitAnswer}
              disabled={!questionAnswer.method || !questionAnswer.equation}
              className="w-full"
            >
              Kirim Jawaban
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const renderLeaderboard = () => {
    return (
      <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leaderboard</DialogTitle>
          </DialogHeader>
          
          <div className="leaderboard">
            {gameState.leaderboard.map((player, index) => (
              <div key={player.id} className="leaderboard-item">
                <span className="leaderboard-rank">#{index + 1}</span>
                <span className="leaderboard-name">{player.name}</span>
                <span className="leaderboard-score">
                  {player.correctAnswers}/{player.totalAnswers}
                </span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const renderRules = () => {
    return (
      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Aturan Permainan</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold">Alur Permainan:</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Pemain bergiliran melempar dadu untuk bergerak di papan</li>
                <li>Setiap kotak dapat memicu spin wheel atau kartu soal</li>
                <li>Spin wheel memberikan efek: maju, mundur, extra time, skip, atau duel 1vs1</li>
                <li>Kartu soal harus dijawab dalam 30 detik</li>
                <li>Jawaban benar = lanjut lempar dadu, salah = diam di tempat</li>
                <li>Duel 1vs1: menang = bonus 1 langkah, kalah = mundur 5 langkah</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold">Penilaian Jawaban:</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Pilih metode: eliminasi, substitusi, atau gabungan</li>
                <li>Tulis persamaan linear yang sesuai</li>
                <li>Berikan jawaban kontekstual sesuai metode yang dipilih</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold">Pemenang:</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Juara 1-3 ditentukan oleh yang mencapai finish duluan</li>
                <li>Jika waktu habis, pemenang berdasarkan jawaban benar terbanyak</li>
                <li>Total waktu permainan: 30 menit</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (gameState.gameEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Permainan Selesai!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Pemenang:</h3>
              {gameState.winners.map((winner, index) => (
                <div key={winner.id} className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                  <span>🏆 Juara {index + 1}: {winner.name}</span>
                  <span>{winner.correctAnswers} benar</span>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p>Jawaban benar Anda: {playerStats.correctAnswers}/{playerStats.totalAnswers}</p>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => navigate('/menu')} className="flex-1">
                Kembali ke Menu
              </Button>
              <Button variant="outline" onClick={onLogout}>
                Keluar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Game Board SPLDV</h1>
            <p className="text-gray-600">Pemain: {user.name}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="timer">
              <Clock className="h-5 w-5 inline mr-2" />
              {formatTime(gameState.timeLeft)}
            </div>
            
            <Button variant="outline" size="sm" onClick={() => { playClickSound(); setShowLeaderboard(true); }}>
              <Trophy className="h-4 w-4 mr-2" />
              Leaderboard
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => { playClickSound(); setShowRules(true); }}>
              Aturan
            </Button>
            
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Posisi</span>
                <span className="font-bold">{playerPosition + 1}/40</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Jawaban Benar</span>
                <span className="font-bold text-green-600">{playerStats.correctAnswers}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Jawaban</span>
                <span className="font-bold">{playerStats.totalAnswers}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Board and Dice */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Papan Permainan</CardTitle>
              </CardHeader>
              <CardContent>
                {renderBoard()}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Dadu</CardTitle>
              </CardHeader>
              <CardContent>
                {renderDice()}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Giliran Saat Ini</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  {gameState.currentPlayer === user.id ? 
                    <span className="text-green-600 font-bold">Giliran Anda!</span> :
                    <span className="text-gray-600">Menunggu pemain lain...</span>
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dialogs */}
        {renderQuestionDialog()}
        {renderLeaderboard()}
        {renderRules()}
      </div>
    </div>
  )
}

export default GamePage

