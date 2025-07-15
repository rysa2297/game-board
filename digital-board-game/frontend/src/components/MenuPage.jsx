import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Star, BookOpen, User, MessageSquare, Trophy, Play, LogOut } from 'lucide-react'

import soundKlik from '../assets/sounds/klik.mp3'

const MenuPage = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const [surveyRating, setSurveyRating] = useState(0)
  const [surveyFeedback, setSurveyFeedback] = useState('')
  const [surveySubmitted, setSurveySubmitted] = useState(false)

  const playClickSound = () => {
    new Audio(soundKlik).play()
  }

  const handleStartGame = () => {
    playClickSound()
    navigate('/game')
  }

  const handleLogout = () => {
    playClickSound()
    onLogout()
  }

  const handleSurveySubmit = async () => {
    if (surveyRating === 0) return

    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          rating: surveyRating,
          feedback: surveyFeedback
        })
      })

      if (response.ok) {
        setSurveySubmitted(true)
      }
    } catch (err) {
      console.error('Error submitting survey:', err)
    }
  }

  const renderStarRating = () => {
    return (
      <div className="flex gap-1 justify-center my-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-8 w-8 cursor-pointer transition-colors ${
              star <= surveyRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => setSurveyRating(star)}
          />
        ))}
      </div>
    )
  }

  const spldvMaterial = {
    pengertian: `
      Sistem Persamaan Linear Dua Variabel (SPLDV) adalah sistem yang terdiri dari dua persamaan linear 
      dengan dua variabel yang saling berkaitan. Bentuk umum SPLDV adalah:
      
      ax + by = c
      dx + ey = f
      
      dimana a, b, c, d, e, f adalah konstanta dan x, y adalah variabel.
    `,
    substitusi: `
      Metode substitusi adalah cara menyelesaikan SPLDV dengan mengganti salah satu variabel 
      dari persamaan pertama ke persamaan kedua atau sebaliknya.
      
      Langkah-langkah:
      1. Pilih salah satu persamaan dan nyatakan salah satu variabel dalam variabel lain
      2. Substitusikan hasil langkah 1 ke persamaan yang lain
      3. Selesaikan persamaan yang diperoleh
      4. Substitusikan kembali untuk mencari variabel yang lain
    `,
    eliminasi: `
      Metode eliminasi adalah cara menyelesaikan SPLDV dengan menghilangkan salah satu variabel 
      sehingga diperoleh persamaan linear satu variabel.
      
      Langkah-langkah:
      1. Samakan koefisien salah satu variabel pada kedua persamaan
      2. Kurangkan atau jumlahkan kedua persamaan untuk menghilangkan variabel tersebut
      3. Selesaikan persamaan linear satu variabel yang diperoleh
      4. Substitusikan hasil ke salah satu persamaan awal untuk mencari variabel lain
    `,
    gabungan: `
      Metode gabungan (eliminasi-substitusi) adalah kombinasi dari metode eliminasi dan substitusi.
      
      Langkah-langkah:
      1. Gunakan metode eliminasi untuk mencari salah satu variabel
      2. Gunakan metode substitusi untuk mencari variabel yang lain
      
      Metode ini sering lebih efisien untuk sistem persamaan yang kompleks.
    `,
    manfaat: `
      Manfaat SPLDV dalam kehidupan sehari-hari:
      
      1. Ekonomi: Menentukan harga barang, keuntungan, dan kerugian
      2. Perdagangan: Menghitung modal dan keuntungan
      3. Transportasi: Menentukan jarak, waktu, dan kecepatan
      4. Konstruksi: Menghitung bahan bangunan dan biaya
      5. Pertanian: Menentukan komposisi pupuk dan hasil panen
    `,
    contohSoal: `
      Contoh Soal:
      
      Sebuah toko menjual pensil dan penghapus. Harga 2 pensil dan 3 penghapus adalah Rp 7.000. 
      Harga 1 pensil dan 2 penghapus adalah Rp 4.000. Tentukan harga 1 pensil dan 1 penghapus!
      
      Penyelesaian:
      Misalkan: x = harga 1 pensil, y = harga 1 penghapus
      
      Persamaan:
      2x + 3y = 7000 ... (1)
      x + 2y = 4000 ... (2)
      
      Dari persamaan (2): x = 4000 - 2y ... (3)
      
      Substitusi (3) ke (1):
      2(4000 - 2y) + 3y = 7000
      8000 - 4y + 3y = 7000
      8000 - y = 7000
      y = 1000
      
      Substitusi y = 1000 ke (3):
      x = 4000 - 2(1000) = 2000
      
      Jadi, harga 1 pensil = Rp 2.000 dan harga 1 penghapus = Rp 1.000
    `
  }

  const capaianPembelajaran = [
    {
      title: "Mengenal Konsep SPLDV",
      items: [
        "Menjelaskan pengertian sistem persamaan linear dua variabel",
        "Mengidentifikasi bentuk umum SPLDV",
        "Membedakan antara persamaan linear satu variabel dan dua variabel"
      ]
    },
    {
      title: "Menentukan Penyelesaian SPLDV",
      items: [
        "Menentukan nilai variabel x dan y yang memenuhi dua persamaan linear secara bersamaan",
        "Menyelesaikan SPLDV menggunakan metode substitusi",
        "Menyelesaikan SPLDV menggunakan metode eliminasi"
      ]
    },
    {
      title: "Menerapkan SPLDV dalam Masalah Kontekstual",
      items: [
        "Menerjemahkan soal cerita ke dalam model matematika berupa SPLDV",
        "Menyelesaikan masalah sehari-hari dengan SPLDV",
        "Menafsirkan hasil penyelesaian SPLDV dalam konteks soal"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Selamat Datang, {user.name}!</h1>
            <p className="text-gray-600">Kelas: {user.class} | Mata Pelajaran: {user.subject}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleStartGame} className="bg-green-600 hover:bg-green-700">
              <Play className="h-4 w-4 mr-2" />
              Mulai Game
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="materi" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="materi" onClick={playClickSound}>
              <BookOpen className="h-4 w-4 mr-2" />
              Materi SPLDV
            </TabsTrigger>
            <TabsTrigger value="pengembang" onClick={playClickSound}>
              <User className="h-4 w-4 mr-2" />
              Tentang Pengembang
            </TabsTrigger>
            <TabsTrigger value="kuesioner" onClick={playClickSound}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Kuesioner
            </TabsTrigger>
            <TabsTrigger value="cp" onClick={playClickSound}>
              <Trophy className="h-4 w-4 mr-2" />
              Capaian Pembelajaran
            </TabsTrigger>
          </TabsList>

          <TabsContent value="materi">
            <Card>
              <CardHeader>
                <CardTitle>Materi Sistem Persamaan Linear Dua Variabel (SPLDV)</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pengertian">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="pengertian">Pengertian</TabsTrigger>
                    <TabsTrigger value="substitusi">Substitusi</TabsTrigger>
                    <TabsTrigger value="eliminasi">Eliminasi</TabsTrigger>
                    <TabsTrigger value="gabungan">Gabungan</TabsTrigger>
                    <TabsTrigger value="manfaat">Manfaat</TabsTrigger>
                    <TabsTrigger value="contoh">Contoh Soal</TabsTrigger>
                  </TabsList>
                  
                  {Object.entries(spldvMaterial).map(([key, content]) => (
                    <TabsContent key={key} value={key}>
                      <Card>
                        <CardContent className="pt-6">
                          <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                            {content}
                          </pre>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pengembang">
            <Card>
              <CardHeader>
                <CardTitle>Tentang Pengembang</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Kebutuhan Pengembangan</h3>
                  <p className="text-gray-700">
                    Game pembelajaran interaktif ini dikembangkan untuk memenuhi kebutuhan skripsi 
                    dalam bidang pendidikan matematika, khususnya untuk materi Sistem Persamaan Linear Dua Variabel (SPLDV).
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Kontak Pengembang</h3>
                  <p className="text-gray-700">
                    Email: <a href="mailto:clarysadevira2297@gmail.com" className="text-blue-600 hover:underline">
                      clarysadevira2297@gmail.com
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Tujuan Pengembangan</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Meningkatkan minat belajar siswa terhadap matematika</li>
                    <li>Menyediakan media pembelajaran yang interaktif dan menyenangkan</li>
                    <li>Membantu siswa memahami konsep SPLDV melalui permainan</li>
                    <li>Mendukung pembelajaran matematika di era digital</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kuesioner">
            <Card>
              <CardHeader>
                <CardTitle>Kuesioner Pengembangan Game</CardTitle>
              </CardHeader>
              <CardContent>
                {!surveySubmitted ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-center">
                        Berikan penilaian Anda terhadap game ini
                      </h3>
                      {renderStarRating()}
                      <p className="text-center text-sm text-gray-600">
                        Skala Likert: 1 (Sangat Buruk) - 5 (Sangat Baik)
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Saran dan Masukan (Opsional)
                      </label>
                      <Textarea
                        value={surveyFeedback}
                        onChange={(e) => setSurveyFeedback(e.target.value)}
                        placeholder="Berikan saran atau masukan Anda untuk pengembangan game ini..."
                        rows={4}
                      />
                    </div>

                    <Button 
                      onClick={handleSurveySubmit}
                      disabled={surveyRating === 0}
                      className="w-full"
                    >
                      Kirim Penilaian
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-green-600 mb-4">
                      <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Terima kasih atas penilaian Anda!
                    </h3>
                    <p className="text-gray-600">
                      Masukan Anda sangat berharga untuk pengembangan game ini.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cp">
            <Card>
              <CardHeader>
                <CardTitle>Capaian Pembelajaran (CP)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {capaianPembelajaran.map((cp, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">
                        {index + 1}. {cp.title}
                      </h3>
                      <ul className="space-y-2">
                        {cp.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default MenuPage

