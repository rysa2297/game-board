import Link from 'next/link';
import { ArrowLeft, BookOpen, Calculator, CheckCircle } from 'lucide-react';

export default function MateriPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/" 
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 mx-auto">
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Materi SPLDV
            </h1>
            <p className="text-lg text-gray-600">
              Sistem Persamaan Linear Dua Variabel
            </p>
          </div>

          {/* Pengertian */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
              Pengertian SPLDV
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sistem Persamaan Linear Dua Variabel (SPLDV) adalah sistem yang terdiri dari dua persamaan linear 
              dengan dua variabel yang saling berkaitan. Bentuk umum SPLDV adalah:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-center">
              <p>ax + by = c</p>
              <p>dx + ey = f</p>
            </div>
            <p className="text-gray-700 mt-4">
              dimana a, b, c, d, e, f adalah konstanta dan x, y adalah variabel.
            </p>
          </div>

          {/* Metode Penyelesaian */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Calculator className="w-6 h-6 text-blue-500 mr-2" />
              Metode Penyelesaian
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Substitusi */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">1. Metode Substitusi</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Mengganti salah satu variabel dengan persamaan yang lain.
                </p>
                <div className="bg-blue-50 rounded p-3 text-sm">
                  <p className="font-mono">x + y = 5 → y = 5 - x</p>
                  <p className="font-mono">2x + y = 8</p>
                  <p className="font-mono">2x + (5-x) = 8</p>
                </div>
              </div>

              {/* Eliminasi */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">2. Metode Eliminasi</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Menghilangkan salah satu variabel dengan operasi penjumlahan atau pengurangan.
                </p>
                <div className="bg-green-50 rounded p-3 text-sm">
                  <p className="font-mono">x + y = 5</p>
                  <p className="font-mono">2x - y = 1</p>
                  <p className="font-mono">_______+</p>
                  <p className="font-mono">3x = 6</p>
                </div>
              </div>

              {/* Campuran */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">3. Metode Campuran</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Kombinasi metode eliminasi dan substitusi.
                </p>
                <div className="bg-purple-50 rounded p-3 text-sm">
                  <p className="font-mono">Eliminasi → x = 2</p>
                  <p className="font-mono">Substitusi → y = 3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contoh Soal */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Contoh Soal</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Soal:</h3>
              <p className="text-gray-700 mb-4">
                Tentukan nilai x dan y dari sistem persamaan berikut:
              </p>
              <div className="font-mono text-center bg-white rounded p-3">
                <p>2x + 3y = 12</p>
                <p>x - y = 1</p>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-6">
              <h3 className="font-semibold text-gray-800 mb-2">Penyelesaian:</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Langkah 1:</strong> Dari persamaan kedua: x = y + 1</p>
                <p><strong>Langkah 2:</strong> Substitusi ke persamaan pertama:</p>
                <p className="font-mono ml-4">2(y + 1) + 3y = 12</p>
                <p className="font-mono ml-4">2y + 2 + 3y = 12</p>
                <p className="font-mono ml-4">5y = 10</p>
                <p className="font-mono ml-4">y = 2</p>
                <p><strong>Langkah 3:</strong> Substitusi y = 2 ke x = y + 1:</p>
                <p className="font-mono ml-4">x = 2 + 1 = 3</p>
                <p className="mt-4"><strong>Jadi, x = 3 dan y = 2</strong></p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Siap untuk berlatih?
              </h3>
              <p className="text-gray-600 mb-6">
                Mainkan game board SPLDV untuk menguji pemahaman Anda!
              </p>
              <Link
                href="/login-siswa"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Mulai Bermain
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

