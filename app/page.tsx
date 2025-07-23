import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Trophy, Info, PlayCircle, GraduationCap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">Game Edukatif SPLDV</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Belajar Sistem Persamaan Linear Dua Variabel dengan cara yang menyenangkan melalui permainan board interaktif
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              Login Siswa
            </CardTitle>
            <CardDescription>Masuk sebagai siswa untuk bermain dan belajar SPLDV</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login-siswa">
              <Button className="w-full game-button">Masuk Sebagai Siswa</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-purple-600" />
              Login Guru
            </CardTitle>
            <CardDescription>Masuk sebagai guru untuk mengelola soal dan siswa</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login-guru">
              <Button className="w-full game-button">Masuk Sebagai Guru</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-green-600" />
              Materi SPLDV
            </CardTitle>
            <CardDescription>Pelajari konsep dasar Sistem Persamaan Linear Dua Variabel</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/materi">
              <Button variant="outline" className="w-full bg-transparent">
                Baca Materi
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-600" />
              Leaderboard
            </CardTitle>
            <CardDescription>Lihat peringkat skor tertinggi dari semua pemain</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/leaderboard">
              <Button variant="outline" className="w-full bg-transparent">
                Lihat Peringkat
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="h-6 w-6 text-red-600" />
              Cara Bermain
            </CardTitle>
            <CardDescription>Pelajari aturan main, sistem skor, dan fitur-fitur game</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/cara-bermain">
              <Button variant="outline" className="w-full bg-transparent">
                Panduan Game
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-6 w-6 text-indigo-600" />
              Tentang
            </CardTitle>
            <CardDescription>Informasi tentang pengembang dan tujuan pembelajaran</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/about">
              <Button variant="outline" className="w-full bg-transparent">
                Info Lengkap
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Fitur Utama Game</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="font-semibold text-lg mb-2">🎲 Gameplay Board</h3>
              <p className="text-gray-600">
                Bermain di papan board dengan sistem dadu, berbagai jenis kotak soal, dan tantangan menarik
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">📸 Upload Foto Coretan</h3>
              <p className="text-gray-600">
                Upload foto hasil coretan saat mengerjakan soal SPLDV untuk dokumentasi proses pembelajaran
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">⏱️ Sistem Waktu</h3>
              <p className="text-gray-600">
                Batas waktu berbeda untuk setiap kategori soal: SPLDV (1.5 menit), MatDas (30 detik)
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">🏆 Sistem Skor</h3>
              <p className="text-gray-600">Skor dinamis: SPLDV benar +10, salah -5; MatDas benar +5, salah -3</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">🔊 Efek Suara</h3>
              <p className="text-gray-600">
                Sound effect untuk jawaban benar, salah, bonus, dan interaksi game lainnya
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">📊 Tracking Progress</h3>
              <p className="text-gray-600">Pantau progress belajar dengan statistik real-time dan leaderboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
