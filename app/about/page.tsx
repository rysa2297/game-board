import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, Target, Lightbulb, Heart, Code, Gamepad2 } from "lucide-react"

export default function AboutPage() {
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Tentang Game Edukatif SPLDV</h1>
          <p className="text-xl text-gray-600">Inovasi pembelajaran matematika yang menyenangkan dan interaktif</p>
        </div>

        <div className="space-y-8">
          {/* Vision & Mission */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-blue-600" />
                Visi & Misi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-blue-800">🎯 Visi</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Menjadi platform pembelajaran matematika digital terdepan yang membuat konsep SPLDV mudah dipahami
                    melalui pendekatan gamifikasi yang inovatif dan menyenangkan.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-green-800">🚀 Misi</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Meningkatkan pemahaman siswa terhadap konsep SPLDV</li>
                    <li>• Menyediakan pembelajaran yang interaktif dan engaging</li>
                    <li>• Membantu guru dalam monitoring progress siswa</li>
                    <li>• Mengintegrasikan teknologi dalam pendidikan matematika</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                Keunggulan Platform
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <Gamepad2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold">Gamifikasi</h4>
                  <p className="text-sm text-gray-600">
                    Pembelajaran melalui permainan board yang menarik dengan sistem poin dan leaderboard
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <Code className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold">Canvas Digital</h4>
                  <p className="text-sm text-gray-600">
                    Fitur coret-coret digital untuk membantu siswa dalam proses penyelesaian soal
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold">Dashboard Guru</h4>
                  <p className="text-sm text-gray-600">
                    Monitoring progress siswa dan pengelolaan bank soal yang komprehensif
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="h-8 w-8 text-red-600" />
                  </div>
                  <h4 className="font-semibold">User-Friendly</h4>
                  <p className="text-sm text-gray-600">
                    Interface yang intuitif dan responsif untuk berbagai perangkat
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <Target className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h4 className="font-semibold">Adaptive Learning</h4>
                  <p className="text-sm text-gray-600">
                    Soal yang disesuaikan dengan tingkat kemampuan dan progress siswa
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <Lightbulb className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold">Real-time Feedback</h4>
                  <p className="text-sm text-gray-600">
                    Umpan balik langsung untuk membantu proses pembelajaran yang efektif
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technology Stack */}
          <Card>
            <CardHeader>
              <CardTitle>Teknologi yang Digunakan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Frontend:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      • <strong>Next.js 14:</strong> React framework untuk performa optimal
                    </li>
                    <li>
                      • <strong>Tailwind CSS:</strong> Styling yang responsif dan modern
                    </li>
                    <li>
                      • <strong>TypeScript:</strong> Type safety untuk kode yang robust
                    </li>
                    <li>
                      • <strong>Canvas API:</strong> Fitur drawing interaktif
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Backend & Database:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      • <strong>Next.js API Routes:</strong> Backend terintegrasi
                    </li>
                    <li>
                      • <strong>PostgreSQL:</strong> Database relational yang powerful
                    </li>
                    <li>
                      • <strong>Supabase:</strong> Backend-as-a-Service untuk skalabilitas
                    </li>
                    <li>
                      • <strong>Vercel:</strong> Deployment yang cepat dan reliable
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Target Users */}
          <Card>
            <CardHeader>
              <CardTitle>Target Pengguna</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">👨‍🎓 Siswa</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• Siswa SMA kelas X yang mempelajari SPLDV</li>
                    <li>• Siswa yang ingin belajar dengan cara yang menyenangkan</li>
                    <li>• Siswa yang membutuhkan latihan soal interaktif</li>
                    <li>• Siswa yang ingin meningkatkan pemahaman matematika</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">👨‍🏫 Guru</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Guru matematika SMA yang mengajar SPLDV</li>
                    <li>• Guru yang ingin mengintegrasikan teknologi</li>
                    <li>• Guru yang membutuhkan tools monitoring siswa</li>
                    <li>• Guru yang ingin membuat pembelajaran lebih engaging</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Development Team */}
          <Card>
            <CardHeader>
              <CardTitle>Tim Pengembang</CardTitle>
              <CardDescription>Dikembangkan dengan dedikasi untuk kemajuan pendidikan Indonesia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Tim Edutech Indonesia</h4>
                  <p className="text-gray-600 mb-4">
                    Sebuah tim yang terdiri dari developer, educator, dan designer yang berpengalaman dalam
                    mengembangkan solusi teknologi pendidikan.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>Frontend Developer</strong>
                      <p className="text-gray-600">UI/UX & Game Mechanics</p>
                    </div>
                    <div>
                      <strong>Backend Developer</strong>
                      <p className="text-gray-600">Database & API Development</p>
                    </div>
                    <div>
                      <strong>Education Consultant</strong>
                      <p className="text-gray-600">Curriculum & Pedagogy</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Support */}
          <Card>
            <CardHeader>
              <CardTitle>Kontak & Dukungan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Hubungi Kami:</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>📧 Email: support@spldvgame.edu</p>
                    <p>📱 WhatsApp: +62 812-3456-7890</p>
                    <p>🌐 Website: www.spldvgame.edu</p>
                    <p>📍 Jakarta, Indonesia</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Jam Operasional:</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>Senin - Jumat: 08.00 - 17.00 WIB</p>
                    <p>Sabtu: 08.00 - 12.00 WIB</p>
                    <p>Minggu: Libur</p>
                    <p className="text-blue-600 font-medium">Respon email dalam 24 jam</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Mari Bergabung!</h3>
                <p className="text-gray-600 mb-6">
                  Jadilah bagian dari revolusi pembelajaran matematika digital. Mulai petualangan belajar SPLDV yang
                  menyenangkan sekarang juga!
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/login-siswa">
                    <Button className="game-button">Daftar Sebagai Siswa</Button>
                  </Link>
                  <Link href="/login-guru">
                    <Button variant="outline" className="bg-transparent">
                      Daftar Sebagai Guru
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
