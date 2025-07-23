import Link from 'next/link';
import { ArrowLeft, Play, Clock, Trophy, Dice6, PenTool, Target } from 'lucide-react';

export default function CaraBermainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/" 
            className="flex items-center text-red-600 hover:text-red-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 mx-auto">
              <Play className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Cara Bermain
            </h1>
            <p className="text-lg text-gray-600">
              Panduan lengkap bermain Game Board SPLDV
            </p>
          </div>

          {/* Aturan Dasar */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Target className="w-6 h-6 text-red-500 mr-2" />
              Aturan Dasar
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Login sebagai Siswa</h3>
                    <p className="text-gray-600 text-sm">Masukkan nama, kelas, dan pilih guru</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Lempar Dadu</h3>
                    <p className="text-gray-600 text-sm">Klik tombol "Roll Dice" untuk bergerak</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Jawab Soal</h3>
                    <p className="text-gray-600 text-sm">Selesaikan soal yang muncul sesuai kotak</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Gunakan Canvas</h3>
                    <p className="text-gray-600 text-sm">Coret-coret untuk membantu menyelesaikan soal</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Kumpulkan Poin</h3>
                    <p className="text-gray-600 text-sm">Jawaban benar memberikan poin positif</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Selesaikan Game</h3>
                    <p className="text-gray-600 text-sm">Game berakhir setelah 30 menit atau 15 soal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jenis Kotak */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Dice6 className="w-6 h-6 text-green-500 mr-2" />
              Jenis Kotak di Board
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-800 font-bold text-sm">SPLDV</span>
                  </div>
                  <h3 className="font-semibold text-blue-800 mb-2">Kotak SPLDV</h3>
                  <p className="text-blue-600 text-sm">Soal SPLDV dengan waktu 1 menit</p>
                  <p className="text-xs text-blue-500 mt-2">Benar: +10 | Salah: -5</p>
                </div>
              </div>
              
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-800 font-bold text-sm">MatDas</span>
                  </div>
                  <h3 className="font-semibold text-green-800 mb-2">Kotak MatDas</h3>
                  <p className="text-green-600 text-sm">Soal Matematika Dasar 20 detik</p>
                  <p className="text-xs text-green-500 mt-2">Benar: +5 | Salah: -3</p>
                </div>
              </div>
              
              <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-yellow-800 font-bold text-sm">Bonus</span>
                  </div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Kotak Bonus</h3>
                  <p className="text-yellow-600 text-sm">Poin bonus atau gerakan khusus</p>
                  <p className="text-xs text-yellow-500 mt-2">+10 hingga +30 poin</p>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-gray-600 font-bold text-sm">Kosong</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Kotak Kosong</h3>
                  <p className="text-gray-600 text-sm">Tidak ada aksi khusus</p>
                  <p className="text-xs text-gray-500 mt-2">Istirahat sejenak</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fitur Canvas */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <PenTool className="w-6 h-6 text-purple-500 mr-2" />
              Fitur Canvas Coret-coret
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PenTool className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Gambar Bebas</h3>
                <p className="text-gray-600 text-sm">Gunakan mouse atau sentuh layar untuk menggambar</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">↶</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Undo & Clear</h3>
                <p className="text-gray-600 text-sm">Batalkan langkah terakhir atau hapus semua</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">PNG</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Export PNG</h3>
                <p className="text-gray-600 text-sm">Simpan hasil coretan sebagai gambar</p>
              </div>
            </div>
          </div>

          {/* Sistem Skor */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
              Sistem Skor
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left">Jenis Soal</th>
                    <th className="border border-gray-200 px-4 py-3 text-center">Waktu</th>
                    <th className="border border-gray-200 px-4 py-3 text-center">Benar</th>
                    <th className="border border-gray-200 px-4 py-3 text-center">Salah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 font-medium">SPLDV</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">60 detik</td>
                    <td className="border border-gray-200 px-4 py-3 text-center text-green-600 font-bold">+10 poin</td>
                    <td className="border border-gray-200 px-4 py-3 text-center text-red-600 font-bold">-5 poin</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium">MatDas</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">20 detik</td>
                    <td className="border border-gray-200 px-4 py-3 text-center text-green-600 font-bold">+5 poin</td>
                    <td className="border border-gray-200 px-4 py-3 text-center text-red-600 font-bold">-3 poin</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 font-medium">Bonus</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">-</td>
                    <td className="border border-gray-200 px-4 py-3 text-center text-yellow-600 font-bold">+10 s/d +30</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Durasi Game */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Clock className="w-6 h-6 text-blue-500 mr-2" />
              Durasi & Syarat Selesai
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3">Batas Waktu</h3>
                <p className="text-blue-700 mb-2">⏰ Maksimal 30 menit</p>
                <p className="text-blue-600 text-sm">Game akan otomatis berakhir setelah 30 menit</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-3">Jumlah Soal</h3>
                <p className="text-green-700 mb-2">📝 Minimal 15 soal</p>
                <p className="text-green-600 text-sm">Game berakhir setelah menjawab 15 soal</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Sudah paham cara bermainnya?
              </h3>
              <p className="text-gray-600 mb-6">
                Ayo mulai bermain dan uji kemampuan SPLDV Anda!
              </p>
              <Link
                href="/login-siswa"
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Mulai Bermain Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

