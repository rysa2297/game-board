import Link from 'next/link';
import { ArrowLeft, Target, CheckCircle, BookOpen, Users } from 'lucide-react';

export default function CapaianPembelajaranPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/" 
            className="flex items-center text-yellow-600 hover:text-yellow-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4 mx-auto">
              <Target className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Capaian Pembelajaran
            </h1>
            <p className="text-lg text-gray-600">
              Target pembelajaran SPLDV melalui Game Board Digital
            </p>
          </div>

          {/* Kompetensi Dasar */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
              Kompetensi Dasar
            </h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 className="font-semibold text-blue-800 mb-2">3.2 Menjelaskan dan menentukan penyelesaian sistem persamaan linear dua variabel</h3>
                <p className="text-blue-700 text-sm">
                  Siswa mampu memahami konsep SPLDV dan menyelesaikannya menggunakan berbagai metode.
                </p>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="font-semibold text-green-800 mb-2">4.2 Menyelesaikan masalah yang berkaitan dengan sistem persamaan linear dua variabel</h3>
                <p className="text-green-700 text-sm">
                  Siswa mampu mengaplikasikan konsep SPLDV dalam menyelesaikan masalah kontekstual.
                </p>
              </div>
            </div>
          </div>

          {/* Indikator Pencapaian */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
              Indikator Pencapaian Kompetensi
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Pengetahuan (KI-3)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Menjelaskan pengertian sistem persamaan linear dua variabel</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Mengidentifikasi bentuk umum SPLDV</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Menjelaskan metode penyelesaian SPLDV</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Menentukan himpunan penyelesaian SPLDV</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Keterampilan (KI-4)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Menyelesaikan SPLDV dengan metode substitusi</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Menyelesaikan SPLDV dengan metode eliminasi</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Menyelesaikan SPLDV dengan metode campuran</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Mengaplikasikan SPLDV dalam masalah kontekstual</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tujuan Pembelajaran */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Target className="w-6 h-6 text-purple-500 mr-2" />
              Tujuan Pembelajaran
            </h2>
            
            <div className="space-y-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Setelah mengikuti pembelajaran melalui Game Board SPLDV, siswa diharapkan dapat:</h3>
                <ol className="list-decimal list-inside space-y-2 text-purple-700">
                  <li>Memahami konsep sistem persamaan linear dua variabel dengan benar</li>
                  <li>Menyelesaikan SPLDV menggunakan metode substitusi, eliminasi, dan campuran</li>
                  <li>Mengaplikasikan konsep SPLDV dalam menyelesaikan masalah sehari-hari</li>
                  <li>Mengembangkan kemampuan berpikir logis dan sistematis</li>
                  <li>Meningkatkan motivasi belajar matematika melalui pendekatan gamifikasi</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Strategi Pembelajaran */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Users className="w-6 h-6 text-orange-500 mr-2" />
              Strategi Pembelajaran
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="font-semibold text-orange-800 mb-3">Pendekatan Gamifikasi</h3>
                <ul className="space-y-2 text-orange-700 text-sm">
                  <li>• Game board interaktif dengan elemen permainan</li>
                  <li>• Sistem poin dan leaderboard untuk motivasi</li>
                  <li>• Tantangan bertingkat sesuai kemampuan</li>
                  <li>• Feedback langsung untuk setiap jawaban</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3">Pembelajaran Interaktif</h3>
                <ul className="space-y-2 text-blue-700 text-sm">
                  <li>• Canvas digital untuk eksplorasi konsep</li>
                  <li>• Soal bervariasi dengan tingkat kesulitan berbeda</li>
                  <li>• Kontrol guru untuk personalisasi pembelajaran</li>
                  <li>• Monitoring progress siswa secara real-time</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Penilaian */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Aspek Penilaian</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left">Aspek</th>
                    <th className="border border-gray-200 px-4 py-3 text-center">Indikator</th>
                    <th className="border border-gray-200 px-4 py-3 text-center">Bobot</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 font-medium">Ketepatan Jawaban</td>
                    <td className="border border-gray-200 px-4 py-3">Persentase jawaban benar</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">40%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium">Kecepatan Penyelesaian</td>
                    <td className="border border-gray-200 px-4 py-3">Waktu yang digunakan</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">30%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 font-medium">Proses Penyelesaian</td>
                    <td className="border border-gray-200 px-4 py-3">Penggunaan canvas dan strategi</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">20%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium">Partisipasi</td>
                    <td className="border border-gray-200 px-4 py-3">Keterlibatan dalam pembelajaran</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">10%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Siap mencapai tujuan pembelajaran?
              </h3>
              <p className="text-gray-600 mb-6">
                Mulai perjalanan belajar SPLDV yang menyenangkan dan interaktif!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/materi"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Pelajari Materi
                </Link>
                <Link
                  href="/login-siswa"
                  className="inline-flex items-center px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Mulai Bermain
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

