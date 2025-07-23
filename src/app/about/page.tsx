import Link from 'next/link';
import { ArrowLeft, Code, Heart, Users, Lightbulb, Target, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/" 
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4 mx-auto">
              <Heart className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tentang Pengembang
            </h1>
            <p className="text-lg text-gray-600">
              Inovasi pembelajaran SPLDV melalui teknologi digital
            </p>
          </div>

          {/* Visi Misi */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Target className="w-6 h-6 text-blue-500 mr-2" />
              Visi & Misi
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Visi
                </h3>
                <p className="text-blue-700">
                  Menjadi platform pembelajaran matematika digital yang inovatif dan interaktif, 
                  membantu siswa memahami konsep SPLDV dengan cara yang menyenangkan dan efektif.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Misi
                </h3>
                <ul className="text-green-700 space-y-2 text-sm">
                  <li>• Mengembangkan metode pembelajaran gamifikasi</li>
                  <li>• Meningkatkan motivasi belajar matematika</li>
                  <li>• Menyediakan tools interaktif untuk guru</li>
                  <li>• Memfasilitasi pembelajaran yang personal</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Latar Belakang */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Users className="w-6 h-6 text-purple-500 mr-2" />
              Latar Belakang
            </h2>
            
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Game Board SPLDV dikembangkan sebagai respons terhadap tantangan pembelajaran matematika 
                di era digital. Banyak siswa mengalami kesulitan dalam memahami konsep Sistem Persamaan 
                Linear Dua Variabel (SPLDV) karena metode pembelajaran yang konvensional.
              </p>
              
              <p className="mb-4">
                Melalui pendekatan gamifikasi, kami menghadirkan solusi pembelajaran yang:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Interaktif</h4>
                  <p className="text-purple-700 text-sm">
                    Siswa dapat berinteraksi langsung dengan materi melalui game board digital
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Menyenangkan</h4>
                  <p className="text-blue-700 text-sm">
                    Elemen permainan membuat pembelajaran menjadi lebih engaging
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Adaptif</h4>
                  <p className="text-green-700 text-sm">
                    Guru dapat menyesuaikan soal dan monitoring progress siswa
                  </p>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Komprehensif</h4>
                  <p className="text-yellow-700 text-sm">
                    Dilengkapi dengan canvas, feedback, dan sistem penilaian
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Teknologi */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Code className="w-6 h-6 text-green-500 mr-2" />
              Teknologi yang Digunakan
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">Next</span>
                </div>
                <h4 className="font-medium text-gray-800">Next.js</h4>
                <p className="text-xs text-gray-600">React Framework</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">TS</span>
                </div>
                <h4 className="font-medium text-gray-800">TypeScript</h4>
                <p className="text-xs text-gray-600">Type Safety</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">🔥</span>
                </div>
                <h4 className="font-medium text-gray-800">Firebase</h4>
                <p className="text-xs text-gray-600">Database & Auth</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">TW</span>
                </div>
                <h4 className="font-medium text-gray-800">Tailwind</h4>
                <p className="text-xs text-gray-600">CSS Framework</p>
              </div>
            </div>
          </div>

          {/* Fitur Unggulan */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Award className="w-6 h-6 text-yellow-500 mr-2" />
              Fitur Unggulan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎲</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Game Board Interaktif</h3>
                <p className="text-gray-600 text-sm">
                  Board game digital dengan 40 kotak berbagai jenis soal dan tantangan
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Canvas Digital</h3>
                <p className="text-gray-600 text-sm">
                  Fitur coret-coret digital untuk membantu siswa dalam menyelesaikan soal
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Dashboard Guru</h3>
                <p className="text-gray-600 text-sm">
                  Kontrol penuh untuk guru dalam mengelola soal dan monitoring siswa
                </p>
              </div>
            </div>
          </div>

          {/* Kontribusi */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Kontribusi & Pengembangan</h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Proyek ini dikembangkan dengan semangat open source dan kolaborasi. 
                Kami mengundang kontribusi dari:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• Guru matematika untuk feedback konten</li>
                  <li>• Developer untuk peningkatan fitur</li>
                  <li>• Designer untuk perbaikan UI/UX</li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li>• Peneliti pendidikan untuk validasi</li>
                  <li>• Siswa untuk testing dan feedback</li>
                  <li>• Komunitas edtech untuk kolaborasi</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Kontak */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Kontak & Dukungan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Untuk Guru & Pendidik</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Butuh bantuan implementasi atau customization untuk sekolah Anda?
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">📧 Email: educator@spldv-game.com</p>
                  <p className="text-gray-700">💬 WhatsApp: +62-xxx-xxxx-xxxx</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Untuk Developer</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Tertarik berkontribusi atau melaporkan bug?
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">🐙 GitHub: github.com/spldv-game-board</p>
                  <p className="text-gray-700">📧 Email: dev@spldv-game.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">
                Mari Bersama Memajukan Pendidikan Indonesia
              </h3>
              <p className="mb-6 opacity-90">
                Bergabunglah dengan misi kami untuk membuat pembelajaran matematika 
                lebih menyenangkan dan efektif melalui teknologi digital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/login-guru"
                  className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Mulai sebagai Guru
                </Link>
                <Link
                  href="/login-siswa"
                  className="inline-flex items-center px-6 py-3 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition-colors"
                >
                  Coba sebagai Siswa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

