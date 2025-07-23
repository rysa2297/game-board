import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Calculator, Target, Lightbulb } from "lucide-react"

export default function MateriPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Materi SPLDV</h1>
          <p className="text-xl text-gray-600">Sistem Persamaan Linear Dua Variabel</p>
        </div>

        <div className="space-y-8">
          {/* Pengertian */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                Pengertian SPLDV
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Sistem Persamaan Linear Dua Variabel (SPLDV) adalah sistem yang terdiri dari dua persamaan linear dengan
                dua variabel yang saling berkaitan. Bentuk umum SPLDV adalah:
              </p>

              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <div className="text-center space-y-2">
                  <div className="text-lg font-mono">ax + by = c</div>
                  <div className="text-lg font-mono">dx + ey = f</div>
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  dimana a, b, c, d, e, f adalah konstanta dan x, y adalah variabel
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Contoh SPLDV:</h4>
                  <div className="font-mono text-green-700">
                    <div>2x + 3y = 12</div>
                    <div>x - y = 1</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Penyelesaian:</h4>
                  <div className="font-mono text-purple-700">
                    <div>x = 3</div>
                    <div>y = 2</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metode Penyelesaian */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-6 w-6 text-green-600" />
                Metode Penyelesaian SPLDV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-blue-800">1. Metode Substitusi</h3>
                  <p className="text-sm text-gray-600">Mengganti salah satu variabel dengan persamaan yang lain</p>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <div className="font-mono space-y-1">
                      <div>x + y = 5 → x = 5 - y</div>
                      <div>2x + 3y = 12</div>
                      <div>2(5-y) + 3y = 12</div>
                      <div>10 - 2y + 3y = 12</div>
                      <div>y = 2, x = 3</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-green-800">2. Metode Eliminasi</h3>
                  <p className="text-sm text-gray-600">Menghilangkan salah satu variabel dengan operasi aljabar</p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <div className="font-mono space-y-1">
                      <div>2x + 3y = 12 |×1|</div>
                      <div>x - y = 1 |×2|</div>
                      <div>2x + 3y = 12</div>
                      <div>2x - 2y = 2 -</div>
                      <div>5y = 10 → y = 2</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-purple-800">3. Metode Campuran</h3>
                  <p className="text-sm text-gray-600">Kombinasi eliminasi dan substitusi</p>
                  <div className="bg-purple-50 p-3 rounded text-sm">
                    <div className="font-mono space-y-1">
                      <div>Eliminasi untuk y</div>
                      <div>Substitusi untuk x</div>
                      <div>atau sebaliknya</div>
                      <div>Hasil: x = 3, y = 2</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Langkah-langkah */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-orange-600" />
                Langkah-langkah Menyelesaikan SPLDV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Identifikasi Persamaan</h4>
                    <p className="text-gray-600 text-sm">Pastikan kedua persamaan dalam bentuk ax + by = c</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Pilih Metode</h4>
                    <p className="text-gray-600 text-sm">
                      Tentukan metode yang paling efisien (substitusi, eliminasi, atau campuran)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Selesaikan Sistem</h4>
                    <p className="text-gray-600 text-sm">Terapkan metode yang dipilih untuk mencari nilai x dan y</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Verifikasi Jawaban</h4>
                    <p className="text-gray-600 text-sm">
                      Substitusi nilai x dan y ke persamaan awal untuk memastikan kebenaran
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips dan Trik */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                Tips dan Trik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-700">✅ Yang Harus Dilakukan:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Tulis persamaan dengan rapi dan teratur</li>
                    <li>• Periksa kembali setiap langkah perhitungan</li>
                    <li>• Gunakan metode yang paling mudah</li>
                    <li>• Verifikasi jawaban dengan substitusi</li>
                    <li>• Latih berbagai tipe soal</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-red-700">❌ Yang Harus Dihindari:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Kesalahan tanda positif/negatif</li>
                    <li>• Lupa mengalikan seluruh persamaan</li>
                    <li>• Tidak menyederhanakan pecahan</li>
                    <li>• Menukar nilai x dan y</li>
                    <li>• Tidak memverifikasi jawaban</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contoh Soal */}
          <Card>
            <CardHeader>
              <CardTitle>Contoh Soal dan Pembahasan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-3">Soal:</h4>
                <p className="mb-4">Tentukan nilai x dan y dari sistem persamaan berikut:</p>
                <div className="text-center font-mono text-lg mb-4">
                  <div>3x + 2y = 16</div>
                  <div>x + 4y = 14</div>
                </div>

                <h4 className="font-semibold mb-3">Pembahasan (Metode Eliminasi):</h4>
                <div className="space-y-2 font-mono text-sm">
                  <div>Eliminasi x:</div>
                  <div>3x + 2y = 16 |×1| → 3x + 2y = 16</div>
                  <div>x + 4y = 14 |×3| → 3x + 12y = 42</div>
                  <div className="border-t pt-2">3x + 12y = 42</div>
                  <div>3x + 2y = 16 -</div>
                  <div className="border-t pt-2">10y = 26</div>
                  <div>y = 2.6</div>

                  <div className="mt-4">Substitusi y = 2.6 ke persamaan pertama:</div>
                  <div>3x + 2(2.6) = 16</div>
                  <div>3x + 5.2 = 16</div>
                  <div>3x = 10.8</div>
                  <div>x = 3.6</div>
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded border-l-4 border-green-500">
                  <strong>Jawaban: x = 3.6 dan y = 2.6</strong>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Siap Berlatih?</h3>
                <p className="text-gray-600 mb-6">Setelah memahami materi, saatnya berlatih dengan game interaktif!</p>
                <div className="flex gap-4 justify-center">
                  <Link href="/login-siswa">
                    <Button className="game-button">Mulai Bermain</Button>
                  </Link>
                  <Link href="/cara-bermain">
                    <Button variant="outline" className="bg-transparent">
                      Cara Bermain
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
