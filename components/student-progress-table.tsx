"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Download, Clock, Trophy, Target } from "lucide-react"

interface StudentProgress {
  id: number
  nama: string
  kelas: string
  skor: number
  total_jawaban: number
  total_benar: number
  waktu_mulai: string
  waktu_selesai: string | null
  is_completed: boolean
}

interface StudentProgressTableProps {
  guruId?: number
}

export function StudentProgressTable({ guruId }: StudentProgressTableProps) {
  const [students, setStudents] = useState<StudentProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStudentProgress()
  }, [guruId])

  const fetchStudentProgress = async () => {
    try {
      const url = guruId ? `/api/guru/students?guru_id=${guruId}` : "/api/guru/students"
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setStudents(data.students || data)
      }
    } catch (error) {
      console.error("Error fetching student progress:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateDuration = (start: string, end: string | null) => {
    if (!end) return "Belum selesai"
    const startTime = new Date(start)
    const endTime = new Date(end)
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000 / 60)
    return `${duration} menit`
  }

  const calculateAccuracy = (correct: number, total: number) => {
    if (total === 0) return 0
    return Math.round((correct / total) * 100)
  }

  const getStatusBadge = (isCompleted: boolean, score: number) => {
    if (!isCompleted) {
      return <Badge variant="secondary">Sedang Bermain</Badge>
    }

    if (score >= 80) {
      return <Badge className="bg-green-500">Excellent</Badge>
    } else if (score >= 60) {
      return <Badge className="bg-blue-500">Good</Badge>
    } else if (score >= 40) {
      return <Badge className="bg-yellow-500">Fair</Badge>
    } else {
      return <Badge variant="destructive">Needs Improvement</Badge>
    }
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

  if (students.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Siswa</h3>
          <p className="text-gray-500">Belum ada siswa yang bermain dengan akun Anda.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Siswa</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Skor</TableHead>
              <TableHead>Akurasi</TableHead>
              <TableHead>Durasi</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.nama}</TableCell>
                <TableCell>{student.kelas}</TableCell>
                <TableCell>{getStatusBadge(student.is_completed, student.skor)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold">{student.skor}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    <span>{calculateAccuracy(student.total_benar, student.total_jawaban)}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{calculateDuration(student.waktu_mulai, student.waktu_selesai)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Eye className="h-3 w-3 mr-1" />
                      Detail
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Download className="h-3 w-3 mr-1" />
                      Canvas
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Skor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(students.reduce((acc, s) => acc + s.skor, 0) / students.length) || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Selesai Bermain</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter((s) => s.is_completed).length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
