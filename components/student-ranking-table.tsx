"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Medal, Award, Calendar } from "lucide-react"

interface StudentRanking {
  rank: number
  student_name: string
  student_class: string
  highest_score: number
  total_sessions: number
  average_score: number
  last_played_wib: string
}

export function StudentRankingTable() {
  const [rankings, setRankings] = useState<StudentRanking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRankings()
  }, [])

  const fetchRankings = async () => {
    try {
      const response = await fetch("/api/guru/rankings")
      const data = await response.json()
      setRankings(data)
    } catch (error) {
      console.error("Error fetching rankings:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-yellow-500">🥇 Juara 1</Badge>
    if (rank === 2) return <Badge className="bg-gray-400">🥈 Juara 2</Badge>
    if (rank === 3) return <Badge className="bg-amber-600">🥉 Juara 3</Badge>
    return <Badge variant="outline">Peringkat {rank}</Badge>
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (rankings.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Data Ranking</h3>
          <p className="text-gray-500">Ranking akan muncul setelah siswa menyelesaikan permainan.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rankings.slice(0, 3).map((student, index) => (
          <Card key={student.rank} className={`${index === 0 ? "ring-2 ring-yellow-400" : ""}`}>
            <CardContent className="p-6 text-center">
              <div className="mb-4">{getRankIcon(student.rank)}</div>
              <h3 className="font-bold text-lg">{student.student_name}</h3>
              <p className="text-gray-600 text-sm">{student.student_class}</p>
              <div className="mt-4">{getRankBadge(student.rank)}</div>
              <div className="mt-4 space-y-2">
                <div className="text-2xl font-bold text-blue-600">{student.highest_score}</div>
                <div className="text-xs text-gray-500">Skor Tertinggi</div>
                <div className="text-sm text-gray-600">
                  Rata-rata: {student.average_score.toFixed(1)} | {student.total_sessions} sesi
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Ranking Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Nama Siswa</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Skor Tertinggi</TableHead>
              <TableHead>Rata-rata</TableHead>
              <TableHead>Total Sesi</TableHead>
              <TableHead>Terakhir Main</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankings.map((student) => (
              <TableRow key={`${student.student_name}-${student.student_class}`}>
                <TableCell>
                  <div className="flex items-center justify-center">{getRankIcon(student.rank)}</div>
                </TableCell>
                <TableCell className="font-medium">{student.student_name}</TableCell>
                <TableCell>{student.student_class}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold text-lg">{student.highest_score}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{student.average_score.toFixed(1)}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{student.total_sessions} sesi</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="h-3 w-3" />
                    {new Date(student.last_played_wib).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{rankings.length}</div>
            <div className="text-sm text-gray-600">Total Siswa</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {rankings.length > 0 ? Math.max(...rankings.map((r) => r.highest_score)) : 0}
            </div>
            <div className="text-sm text-gray-600">Skor Tertinggi</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {rankings.length > 0
                ? (rankings.reduce((acc, r) => acc + r.average_score, 0) / rankings.length).toFixed(1)
                : 0}
            </div>
            <div className="text-sm text-gray-600">Rata-rata Kelas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {rankings.reduce((acc, r) => acc + r.total_sessions, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Sesi</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
