"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, Plus, BarChart3, Clock, Trophy, Download, Eye, LogOut, School } from "lucide-react"
import Link from "next/link"
import AddQuestionModal from "@/components/add-question-modal"
import StudentProgressTable from "@/components/student-progress-table"
import QuestionBankManager from "@/components/question-bank-manager"

interface User {
  id: number
  nama: string
  sekolah: string
  role: string
}

interface DashboardStats {
  total_students: number
  total_sessions: number
  avg_score: number
  total_questions: number
  completed_sessions: number
}

export default function DashboardGuruPage() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [showAddQuestion, setShowAddQuestion] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login-guru")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "guru") {
      router.push("/")
      return
    }

    setUser(parsedUser)
    fetchDashboardStats(parsedUser.id)
  }, [])

  const fetchDashboardStats = async (guruId: number) => {
    try {
      const response = await fetch(`/api/guru/stats?guru_id=${guruId}`)
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Guru</h1>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <School className="h-4 w-4" />
            <span>
              {user.nama} - {user.sekolah}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href="/">
            <Button variant="outline" className="bg-transparent">
              Ke Beranda
            </Button>
          </Link>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Siswa</p>
                  <p className="text-3xl font-bold text-blue-600">{stats?.total_students || 0}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sesi Selesai</p>
                  <p className="text-3xl font-bold text-green-600">{stats?.completed_sessions || 0}</p>
                </div>
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rata-rata Skor</p>
                  <p className="text-3xl font-bold text-purple-600">{Math.round(stats?.avg_score || 0)}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bank Soal</p>
                  <p className="text-3xl font-bold text-orange-600">{stats?.total_questions || 0}</p>
                </div>
                <BookOpen className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="students" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="students">Data Siswa</TabsTrigger>
          <TabsTrigger value="questions">Bank Soal</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Progress Siswa
              </CardTitle>
              <CardDescription>Lihat progress dan hasil belajar siswa Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentProgressTable guruId={user.id} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Bank Soal</h2>
              <p className="text-gray-600">Kelola soal SPLDV dan MatDas</p>
            </div>
            <Button onClick={() => setShowAddQuestion(true)} className="game-button flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tambah Soal
            </Button>
          </div>

          <QuestionBankManager guruId={user.id} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistik Pembelajaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tingkat Keberhasilan</span>
                    <Badge variant="outline">
                      {stats ? Math.round((stats.completed_sessions / Math.max(stats.total_sessions, 1)) * 100) : 0}%
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Rata-rata Waktu Bermain</span>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      25 menit
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Soal Paling Sulit</span>
                    <Badge variant="destructive">SPLDV Substitusi</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data Siswa
                </Button>

                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  Lihat Canvas Siswa
                </Button>

                <Link href="/leaderboard" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Trophy className="h-4 w-4 mr-2" />
                    Lihat Leaderboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Question Modal */}
      {showAddQuestion && (
        <AddQuestionModal
          guruId={user.id}
          onClose={() => setShowAddQuestion(false)}
          onSuccess={() => {
            setShowAddQuestion(false)
            fetchDashboardStats(user.id)
          }}
        />
      )}
    </div>
  )
}
