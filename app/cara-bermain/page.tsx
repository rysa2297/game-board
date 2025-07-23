import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Dice1, Clock, Trophy, Palette, Download, Target } from "lucide-react"

export default function CaraBermainPage() {
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Cara Bermain</h1>
          <p className="text-xl text-gray-600">Panduan lengkap bermain Game Edukatif SPLDV</p>
        </div>

        <div className="space-y-8">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-blue-600" />
                Tujuan Permainan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Objektif Utama:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Kumpulkan skor setinggi-tingginya</li>
                    <li>• Jawab minimal 15 soal untuk menyelesaikan game</li>
                    <li>• Pelajari konsep SPLDV dengan menyenangkan</li>
                    <li>• Gunakan canvas untuk membantu perhitungan</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Batas Waktu:</h3>
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-red-600" />
                      <span className="font-semibold text-red-800">30 Menit Maksimal</span>
                    </div>
                    <p className="text-sm text-red-700">
                      Game akan berakhir otomatis setelah 30 menit atau setelah menjawab 15+ soal
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Game Board */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dice1 className="h-6 w-6 text-green-600" />
                Papan Permainan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-gray-700">
                  Game dimainkan di papan board dengan 20 kotak. Setiap kotak memiliki fungsi berbeda:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-800 mb-2">SPLDV</h4>
                    <p className="text-sm text-blue-700">Soal Sistem Persamaan Linear Dua Variabel</p>
                    <Badge className="mt-2 bg-blue-500">60 detik</Badge>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-800 mb-2">MatDas</h4>
                    <p className="text-sm text-green-700">Soal Matematika Dasar</p>
                    <Badge className="mt-2 bg-green-500">20 detik</Badge>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-800 mb-2">Bonus ★</h4>
                    <p className="text-sm text-yellow-700">Maju/mundur beberapa kotak atau bonus poin</p>
                    <Badge className="mt-2 bg-yellow-500">Acak</Badge>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-500">
                    <h4 className="font-semibold text-gray-800 mb-2">Kosong</h4>
                    <p className="text-sm text-gray-700">Tidak ada aksi, lanjut ke giliran berikutnya</p>
                    <Badge className="mt-2 bg-gray-500">-</Badge>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Cara Bergerak:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
                    <li>Klik tombol "Lempar Dadu" untuk mendapatkan angka 1-6</li>
                    <li>Pion Anda akan bergerak sesuai angka dadu</li>
                    <li>Jika mendarat di kotak soal, jawab pertanyaan yang muncul</li>
                    <li>Ulangi hingga game selesai</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scoring System */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-600" />
                Sistem Penilaian
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Poin per Soal:</h3>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">SPLDV (60 detik)</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>✅ Jawaban Benar:</span>
                        <Badge className="bg-green-500">+10 poin</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>❌ Jawaban Salah:</span>
                        <Badge variant="destructive">-5 poin</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>⏰ Waktu Habis:</span>
                        <Badge variant="destructive">-5 poin</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">MatDas (20 detik)</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>✅ Jawaban Benar:</span>
                        <Badge className="bg-green-500">+5 poin</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>❌ Jawaban Salah:</span>
                        <Badge variant="destructive">-3 poin</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>⏰ Waktu Habis:</span>
                        <Badge variant="destructive">-3 poin</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Tips Skor Tinggi:</h3>
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <ul className="space-y-2 text-sm text-yellow-800">
                      <li>• Fokus pada soal SPLDV (poin lebih besar)</li>
                      <li>• Gunakan canvas untuk membantu perhitungan</li>
                      <li>• Kelola waktu dengan baik</li>
                      <li>• Jangan terburu-buru, akurasi lebih penting</li>
                      <li>• Manfaatkan kotak bonus untuk keuntungan</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Canvas Feature */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-6 w-6 text-purple-600" />
                Fitur Canvas Coret-Coret
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-gray-700">
                  Setiap soal dilengkapi dengan canvas digital untuk membantu Anda menyelesaikan perhitungan:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Fitur Canvas:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Gambar bebas dengan mouse atau stylus</li>
                      <li>• Pilih warna dan ukuran kuas</li>
                      <li>• Mode penghapus untuk koreksi</li>
                      <li>• Tombol Undo untuk membatalkan</li>
                      <li>• Bersihkan canvas sepenuhnya</li>
                      <li>• Export hasil ke file PNG</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Cara Menggunakan:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                      <li>Baca soal dengan teliti</li>
                      <li>Gunakan canvas untuk mencoret-coret</li>
                      <li>Tulis persamaan dan langkah penyelesaian</li>
                      <li>Klik "Ekspor PNG" untuk menyimpan</li>
                      <li>Pilih jawaban yang benar</li>
                      <li>Klik "Kirim Jawaban"</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold text-purple-800">Export PNG</span>
                  </div>
                  <p className="text-sm text-purple-700">
                    Hasil canvas akan disimpan otomatis ke database dan dapat diunduh sebagai file PNG untuk referensi
                    belajar.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Game Flow */}
          <Card>
            <CardHeader>
              <CardTitle>Alur Permainan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Login Siswa</h4>
                    <p className="text-gray-600 text-sm">Masukkan nama, kelas, dan pilih guru Anda</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Mulai Permainan</h4>
                    <p className="text-gray-600 text-sm">Timer 30 menit dimulai, lempar dadu untuk bergerak</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Jawab Soal</h4>
                    <p className="text-gray-600 text-sm">Gunakan canvas untuk coret-coret, pilih jawaban A/B/C/D</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Selesai Game</h4>
                    <p className="text-gray-600 text-sm">Setelah 30 menit atau 15+ soal, isi kuisioner feedback</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold">Lihat Hasil</h4>
                    <p className="text-gray-600 text-sm">Cek skor Anda di leaderboard dan bandingkan dengan teman</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips and Strategies */}
          <Card>
            <CardHeader>
              <CardTitle>Tips & Strategi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-green-700">✅ Strategi Sukses:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Kelola waktu:</li>
                    <li>• Prioritas SPLDV:</li>
                    <li>• Gunakan canvas:</li>
                    <li>• Baca teliti:</li>
                    <li>• Cek jawaban:</li>
                    <li>• Tenang:</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-red-700">❌ Hindari Kesalahan:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Terburu-buru tanpa membaca soal</li>
                    <li>• Tidak menggunakan canvas untuk perhitungan</li>
                    <li>• Mengabaikan manajemen waktu</li>
                    <li>• Tidak memeriksa jawaban sebelum submit</li>
                    <li>• Panik saat menghadapi soal sulit</li>
                    <li>• Lupa export canvas untuk dokumentasi</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Siap Memulai Petualangan?</h3>
                <p className="text-gray-600 mb-6">
                  Sekarang Anda sudah memahami cara bermain. Saatnya menguji kemampuan SPLDV Anda!
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/login-siswa">
                    <Button className="game-button">Mulai Bermain Sekarang</Button>
                  </Link>
                  <Link href="/materi">
                    <Button variant="outline" className="bg-transparent">
                      Pelajari Materi Dulu
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
