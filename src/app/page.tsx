import Link from 'next/link';
import { Play, Users, BookOpen, Target, Info, HelpCircle, Trophy } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">SPLDV Game Board</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/materi" className="text-gray-600 hover:text-blue-600 transition-colors">
                Materi
              </Link>
              <Link href="/cara-bermain" className="text-gray-600 hover:text-blue-600 transition-colors">
                Cara Bermain
              </Link>
              <Link href="/cp" className="text-gray-600 hover:text-blue-600 transition-colors">
                Capaian Pembelajaran
              </Link>
              <Link href="/leaderboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                Leaderboard
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                Tentang
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Game Board <span className="text-blue-600">SPLDV</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Platform pembelajaran interaktif untuk Sistem Persamaan Linear Dua Variabel 
            dengan pendekatan gamifikasi yang menyenangkan
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login-siswa"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              <Play className="w-5 h-5 mr-2" />
              Mulai Bermain
            </Link>
            <Link
              href="/login-guru"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
            >
              <Users className="w-5 h-5 mr-2" />
              Dashboard Guru
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link href="/materi" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Materi SPLDV</h3>
              <p className="text-gray-600 text-sm">
                Pelajari konsep dasar dan metode penyelesaian SPLDV
              </p>
            </div>
          </Link>

          <Link href="/cara-bermain" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4">
                <HelpCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Cara Bermain</h3>
              <p className="text-gray-600 text-sm">
                Panduan lengkap bermain game board SPLDV
              </p>
            </div>
          </Link>

          <Link href="/cp" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Capaian Pembelajaran</h3>
              <p className="text-gray-600 text-sm">
                Target dan indikator pembelajaran SPLDV
              </p>
            </div>
          </Link>

          <Link href="/leaderboard" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                <Trophy className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Leaderboard</h3>
              <p className="text-gray-600 text-sm">
                Lihat ranking skor tertinggi siswa
              </p>
            </div>
          </Link>
        </div>

        {/* Game Features */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Fitur Game Board
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎲</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Board Game Interaktif</h4>
              <p className="text-gray-600">
                40 kotak dengan berbagai jenis soal: SPLDV, MatDas, Bonus, dan Kosong
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Canvas Coret-coret</h4>
              <p className="text-gray-600">
                Fitur menggambar digital untuk membantu menyelesaikan soal matematika
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Sistem Skor</h4>
              <p className="text-gray-600">
                Penilaian berdasarkan ketepatan jawaban dan kecepatan penyelesaian
              </p>
            </div>
          </div>
        </div>

        {/* Teacher Features */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Fitur untuk Guru</h3>
            <p className="text-green-100">
              Kontrol penuh untuk mengelola pembelajaran dan monitoring siswa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">➕</span>
              </div>
              <h4 className="font-semibold mb-1">Tambah Soal</h4>
              <p className="text-sm text-green-100">Buat soal custom</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">👥</span>
              </div>
              <h4 className="font-semibold mb-1">Data Siswa</h4>
              <p className="text-sm text-green-100">Monitor progress</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📈</span>
              </div>
              <h4 className="font-semibold mb-1">Statistik</h4>
              <p className="text-sm text-green-100">Analisis pembelajaran</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">💬</span>
              </div>
              <h4 className="font-semibold mb-1">Feedback</h4>
              <p className="text-sm text-green-100">Evaluasi siswa</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">SPLDV Game Board</h4>
              <p className="text-gray-300 text-sm">
                Platform pembelajaran interaktif untuk Sistem Persamaan Linear Dua Variabel
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Menu</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/materi" className="text-gray-300 hover:text-white">Materi SPLDV</Link></li>
                <li><Link href="/cara-bermain" className="text-gray-300 hover:text-white">Cara Bermain</Link></li>
                <li><Link href="/cp" className="text-gray-300 hover:text-white">Capaian Pembelajaran</Link></li>
                <li><Link href="/leaderboard" className="text-gray-300 hover:text-white">Leaderboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Akses</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/login-siswa" className="text-gray-300 hover:text-white">Login Siswa</Link></li>
                <li><Link href="/login-guru" className="text-gray-300 hover:text-white">Login Guru</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white">Tentang Pengembang</Link></li>
                <li><Link href="/feedback" className="text-gray-300 hover:text-white">Feedback</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300 text-sm">
              © 2024 SPLDV Game Board. Dibuat dengan ❤️ untuk pendidikan Indonesia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

