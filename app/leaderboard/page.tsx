"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, Clock, Target, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface LeaderboardEntry {
  id: number
  nama: string
  kelas: string
  skor: number
  total_jawaban: number
  total_benar: number
  waktu_mulai: string
  waktu_selesai: string
  guru_nama: string
}

interface Guru {
  id: number
  nama: string
  sekolah: string
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [guruList, setGuruList] = useState<Guru[]>([])
  const [selectedGuru, setSelectedGuru] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGuruList()
  }, [])

  useEffect(() => {
    if (selectedGuru) {
      fetchLeaderboard(selectedGuru)
    }
  }, [selectedGuru])

  const fetchGuruList = async () => {
    try {
      const response = await fetch("/api/guru/list")
      if (response.ok) {
        const data = await response.json()
        setGuruList(data.guru)
        if (data.guru.length > 0) {
          setSelectedGuru(data.guru[0].id.toString())
        }
      }
    } catch (error) {
      console.error("Error fetching guru list:", error)
    }
  }

  const fetchLeaderboard = async (guruId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/leaderboard?guru_id=${guruId}`)
      if (response.ok) {
        const data = await response.json()
        setLeaderboard(data.leaderboard)
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-yellow-500 text-white">🥇 Juara 1</Badge>
      case 2:
        return <Badge className="bg-gray-400 text-white">🥈 Juara 2</Badge>
      case 3:
        return <Badge className="bg-amber-600 text-white">🥉 Juara 3</Badge>
      default:
        return <Badge variant="outline">Peringkat {rank}</Badge>
    }
  }

  const calculateDuration = (start: string, end: string) => {
    const startTime = new Date(start)
    const endTime = new Date(end)
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000 / 60)
    return `${duration} menit`
  }

  const calculateAccuracy = (correct: number, total: number) => {
    if (total === 0) return 0
    return Math.round((correct / total) * 100)
  }

  const selectedGuruData = guruList.find((g) => g.id.toString() === selectedGuru)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🏆 Leaderboard</h1>
          <p className="text-gray-600">Top 10 skor tertinggi siswa</p>
        </div>

        {guruList.length > 0 && (
          <div className="max-w-md mx-auto mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Guru:</label>
            <Select value={selectedGuru} onValueChange={setSelectedGuru}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih guru untuk melihat leaderboard" />
              </SelectTrigger>
              <SelectContent>
                {guruList.map((guru) => (
                  <SelectItem key={guru.id} value={guru.id.toString()}>
                    <div>
                      <div className="font-medium">{guru.nama}</div>
                      <div className="text-sm text-gray-500">{guru.sekolah}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {selectedGuruData && (
        <div className="text-center mb-6">
          <Card className="max-w-md mx-auto">
            <CardContent className="py-4">
              <h2 className="font-semibold text-lg">{selectedGuruData.nama}</h2>
              <p className="text-gray-600">{selectedGuruData.sekolah}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat leaderboard...</p>
        </div>
      ) : leaderboard.length === 0 ? (
        <div className="text-center py-8">
          <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum Ada Data</h3>
          <p className="text-gray-500">Belum ada siswa yang menyelesaikan game untuk guru ini.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leaderboard.map((entry, index) => {
            const rank = index + 1
            const accuracy = calculateAccuracy(entry.total_benar, entry.total_jawaban)

            return (
              <Card
                key={entry.id}
                className={`${rank <= 3 ? "ring-2 ring-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50" : ""}`}
              >
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">{getRankIcon(rank)}</div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{entry.nama}</h3>
                          {getRankBadge(rank)}
                        </div>
                        <p className="text-gray-600 text-sm">{entry.kelas}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{entry.skor} poin</div>
                      <div className="flex gap-2 text-xs">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {accuracy}% akurasi
                        </Badge>
                        {entry.waktu_selesai && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {calculateDuration(entry.waktu_mulai, entry.waktu_selesai)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className="font-semibold text-gray-800">{entry.total_jawaban}</div>
                        <div className="text-gray-500">Total Soal</div>
                      </div>
                      <div>
                        <div className="font-semibold text-green-600">{entry.total_benar}</div>
                        <div className="text-gray-500">Benar</div>
                      </div>
                      <div>
                        <div className="font-semibold text-red-600">{entry.total_jawaban - entry.total_benar}</div>
                        <div className="text-gray-500">Salah</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <div className="mt-8 text-center">
        <div className="bg-blue-50 p-6 rounded-lg max-w-2xl mx-auto">
          <h3 className="font-semibold text-blue-800 mb-3">Sistem Penilaian</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-2">SPLDV (1 menit)</h4>
              <p>✅ Benar: +10 poin</p>
              <p>❌ Salah: -5 poin</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">MatDas (20 detik)</h4>
              <p>✅ Benar: +5 poin</p>
              <p>❌ Salah: -3 poin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
