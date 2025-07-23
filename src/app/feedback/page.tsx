'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, Send, Home } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function FeedbackPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [gameSession, setGameSession] = useState<any>(null);
  const [feedback, setFeedback] = useState({
    rating1: 0,
    rating2: 0,
    rating3: 0,
    rating4: 0,
    rating5: 0,
    feedback_text: ''
  });
  const [loading, setLoading] = useState(false);

  const questions = [
    'Seberapa mudah permainan ini dimainkan?',
    'Seberapa menarik tampilan permainan ini?',
    'Seberapa membantu permainan ini dalam memahami SPLDV?',
    'Seberapa puas Anda dengan fitur coret-coret?',
    'Seberapa besar kemungkinan Anda merekomendasikan permainan ini?'
  ];

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

    // Ambil data sesi game dari localStorage (sementara)
    const sessionData = localStorage.getItem('gameSession');
    if (sessionData) {
      setGameSession(JSON.parse(sessionData));
    }
  }, []);

  const handleRatingChange = (questionIndex: number, rating: number) => {
    setFeedback(prev => ({
      ...prev,
      [`rating${questionIndex + 1}`]: rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi rating
    const ratings = [feedback.rating1, feedback.rating2, feedback.rating3, feedback.rating4, feedback.rating5];
    if (ratings.some(rating => rating === 0)) {
      alert('Mohon berikan rating untuk semua pertanyaan');
      return;
    }

    setLoading(true);

    try {
      // Simpan feedback ke Firebase
      await addDoc(collection(db, 'feedback'), {
        user_id: user.id || 'anonymous',
        guru_id: user.guru_id || '',
        nama_siswa: user.nama,
        kelas: user.kelas,
        ...feedback,
        created_at: new Date()
      });

      alert('Terima kasih atas feedback Anda!');
      
      // Bersihkan localStorage
      localStorage.removeItem('gameSession');
      
      // Redirect ke leaderboard
      router.push('/leaderboard');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Terjadi kesalahan saat mengirim feedback');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (questionIndex: number, currentRating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(questionIndex, star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                star <= currentRating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/" 
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
          <div className="text-right">
            <p className="font-medium">{user.nama}</p>
            <p className="text-sm text-gray-600">{user.kelas}</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Game Summary */}
          {gameSession && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Permainan</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{gameSession.score || 0}</div>
                  <div className="text-sm text-gray-600">Skor Akhir</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{gameSession.correctAnswers || 0}</div>
                  <div className="text-sm text-gray-600">Jawaban Benar</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{(gameSession.totalQuestions || 0) - (gameSession.correctAnswers || 0)}</div>
                  <div className="text-sm text-gray-600">Jawaban Salah</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{gameSession.totalQuestions || 0}</div>
                  <div className="text-sm text-gray-600">Total Soal</div>
                </div>
              </div>
            </div>
          )}

          {/* Feedback Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Feedback Permainan</h1>
              <p className="text-gray-600">Bantu kami meningkatkan kualitas permainan dengan memberikan feedback</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Rating Questions */}
              {questions.map((question, index) => (
                <div key={index} className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    {index + 1}. {question}
                  </label>
                  {renderStars(index, feedback[`rating${index + 1}` as keyof typeof feedback] as number)}
                </div>
              ))}

              {/* Text Feedback */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  6. Apa yang perlu diperbaiki dari permainan ini?
                </label>
                <textarea
                  value={feedback.feedback_text}
                  onChange={(e) => setFeedback({...feedback, feedback_text: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Tuliskan saran dan masukan Anda..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                <span>{loading ? 'Mengirim...' : 'Kirim Feedback'}</span>
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Setelah mengirim feedback, Anda akan diarahkan ke halaman leaderboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

