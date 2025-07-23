"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { StudentProgressTable } from "@/components/student-progress-table"
import { StudentRankingTable } from "@/components/student-ranking-table"
import { StudentPhotoGallery } from "@/components/student-photo-gallery"
import { QuestionBankManager } from "@/components/question-bank-manager"
import { AddQuestionModal } from "@/components/add-question-modal"
import { Users, Trophy, BookOpen, Camera, TrendingUp, Calendar } from "lucide-react"

interface DashboardStats {
  totalStudents: number
  totalSessions: number
  averageScore: number
  totalQuestions: number
  totalSPLDVSubmissions: number
}

export default function TeacherDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalSessions: 0,
    averageScore: 0,
    totalQuestions: 0,
    totalSPLDVSubmissions: 0,
  })
  const [teacherName, setTeacherName] = useState("")
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const teacher = localStorage.getItem("teacherName")
    if (!teacher) {
      router.push("/login-guru")
      return
    }
    setTeacherName(teacher)
    fetchStats()

    // Update Jakarta time every second
    const timeInterval = setInterval(() => {
      const jakartaTime = new Date().toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      setCurrentTime(jakartaTime)
    }, 1000)

    return () => clearInterval(timeInterval)
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/guru/stats")
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("teacherName")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Guru</h1>
            <p className="text-gray-600">Selamat datang, {teacherName}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{currentTime} WIB</span>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Siswa</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Sesi</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rata-rata Skor</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageScore.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Soal</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalQuestions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Camera className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Foto SPLDV</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalSPLDVSubmissions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="progress">Progress Siswa</TabsTrigger>
            <TabsTrigger value="ranking">Ranking & Nilai</TabsTrigger>
            <TabsTrigger value="photos">Foto SPLDV</TabsTrigger>
            <TabsTrigger value="questions">Bank Soal</TabsTrigger>
          </TabsList>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Progress Siswa</CardTitle>
              </CardHeader>
              <CardContent>
                <StudentProgressTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ranking">
            <Card>
              <CardHeader>
                <CardTitle>Ranking Siswa Berdasarkan Nilai Tertinggi</CardTitle>
              </CardHeader>
              <CardContent>
                <StudentRankingTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle>Galeri Foto Jawaban SPLDV</CardTitle>
              </CardHeader>
              <CardContent>
                <StudentPhotoGallery />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Bank Soal</CardTitle>
                  <AddQuestionModal onQuestionAdded={fetchStats} />
                </div>
              </CardHeader>
              <CardContent>
                <QuestionBankManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
