import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Download, Star, MessageSquare, BarChart3, LogOut, RefreshCw } from 'lucide-react'

const AdminDashboard = ({ user, onLogout }) => {
  const [surveys, setSurveys] = useState([])
  const [stats, setStats] = useState({
    totalSurveys: 0,
    averageRating: 0,
    ratingDistribution: [0, 0, 0, 0, 0]
  })
  const [loading, setLoading] = useState(true)
  const [exportLoading, setExportLoading] = useState(false)

  const playClickSound = () => {
    console.log('Click sound')
  }

  useEffect(() => {
    fetchSurveys()
  }, [])

  const fetchSurveys = async () => {
    try {
      const response = await fetch('/api/surveys')
      if (response.ok) {
        const data = await response.json()
        setSurveys(data.surveys)
        calculateStats(data.surveys)
      }
    } catch (error) {
      console.error('Error fetching surveys:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (surveyData) => {
    if (surveyData.length === 0) {
      setStats({
        totalSurveys: 0,
        averageRating: 0,
        ratingDistribution: [0, 0, 0, 0, 0]
      })
      return
    }

    const totalRating = surveyData.reduce((sum, survey) => sum + survey.rating, 0)
    const averageRating = totalRating / surveyData.length

    const distribution = [0, 0, 0, 0, 0]
    surveyData.forEach(survey => {
      distribution[survey.rating - 1]++
    })

    setStats({
      totalSurveys: surveyData.length,
      averageRating: averageRating.toFixed(1),
      ratingDistribution: distribution
    })
  }

  const exportSurveys = async () => {
    setExportLoading(true)
    playClickSound()
    
    try {
      const response = await fetch('/api/export-surveys', {
        method: 'GET'
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `survey_results_${new Date().toISOString().split('T')[0]}.xlsx`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setExportLoading(false)
    }
  }

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const renderRatingDistribution = () => {
    const maxCount = Math.max(...stats.ratingDistribution)
    
    return (
      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = stats.ratingDistribution[rating - 1]
          const percentage = stats.totalSurveys > 0 ? (count / stats.totalSurveys) * 100 : 0
          const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0
          
          return (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium">{rating}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              </div>
              
              <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              
              <div className="w-16 text-right">
                <span className="text-sm font-medium">{count}</span>
                <span className="text-xs text-gray-500 ml-1">({percentage.toFixed(1)}%)</span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderSurveyList = () => {
    if (loading) {
      return (
        <div className="text-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Memuat data kuesioner...</p>
        </div>
      )
    }

    if (surveys.length === 0) {
      return (
        <div className="text-center py-8">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Belum ada kuesioner yang masuk</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {surveys.map((survey) => (
          <Card key={survey.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{survey.user?.name || 'Anonim'}</h4>
                    <Badge variant="outline">
                      {survey.user?.class || 'Tidak diketahui'}
                    </Badge>
                    {renderStars(survey.rating)}
                  </div>
                  
                  {survey.feedback && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{survey.feedback}</p>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(survey.created_at).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderAnalysis = () => {
    const needsImprovement = parseFloat(stats.averageRating) < 3.5
    const isGood = parseFloat(stats.averageRating) >= 4.0
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analisis Hasil Kuesioner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{stats.averageRating}</p>
                <p className="text-sm text-gray-600">Rating Rata-rata</p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{stats.totalSurveys}</p>
                <p className="text-sm text-gray-600">Total Responden</p>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50">
              <h4 className="font-semibold text-blue-800 mb-2">Rekomendasi:</h4>
              {needsImprovement ? (
                <div className="space-y-2">
                  <p className="text-sm text-blue-700">
                    ⚠️ Game perlu perbaikan. Rating rata-rata di bawah 3.5 menunjukkan ada aspek yang perlu ditingkatkan.
                  </p>
                  <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                    <li>Periksa feedback dari pengguna untuk identifikasi masalah</li>
                    <li>Perbaiki aspek gameplay yang sering dikomplain</li>
                    <li>Tingkatkan user experience dan interface</li>
                  </ul>
                </div>
              ) : isGood ? (
                <div className="space-y-2">
                  <p className="text-sm text-blue-700">
                    ✅ Game sudah baik! Rating rata-rata di atas 4.0 menunjukkan pengguna puas.
                  </p>
                  <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                    <li>Pertahankan kualitas yang sudah ada</li>
                    <li>Pertimbangkan penambahan fitur baru</li>
                    <li>Terus monitor feedback untuk improvement</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-blue-700">
                    📊 Game cukup baik, masih ada ruang untuk improvement.
                  </p>
                  <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                    <li>Fokus pada aspek yang mendapat rating rendah</li>
                    <li>Tingkatkan engagement dan interaktivitas</li>
                    <li>Optimalkan performa dan stabilitas</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
            <p className="text-gray-600">Analisis Hasil Kuesioner Game SPLDV</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={exportSurveys}
              disabled={exportLoading || surveys.length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              {exportLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              Export Excel
            </Button>
            
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Kuesioner</span>
                <span className="text-2xl font-bold text-blue-600">{stats.totalSurveys}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rating Rata-rata</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-yellow-600">{stats.averageRating}</span>
                  <div className="flex justify-end mt-1">
                    {renderStars(Math.round(parseFloat(stats.averageRating)))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rating Tertinggi</span>
                <span className="text-2xl font-bold text-green-600">
                  {Math.max(...stats.ratingDistribution.map((count, index) => count > 0 ? index + 1 : 0)) || 0}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Dengan Feedback</span>
                <span className="text-2xl font-bold text-purple-600">
                  {surveys.filter(s => s.feedback && s.feedback.trim()).length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="surveys" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="surveys" onClick={playClickSound}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Daftar Kuesioner
            </TabsTrigger>
            <TabsTrigger value="statistics" onClick={playClickSound}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Statistik Rating
            </TabsTrigger>
            <TabsTrigger value="analysis" onClick={playClickSound}>
              <Star className="h-4 w-4 mr-2" />
              Analisis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="surveys">
            <Card>
              <CardHeader>
                <CardTitle>Semua Kuesioner</CardTitle>
              </CardHeader>
              <CardContent>
                {renderSurveyList()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics">
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Rating</CardTitle>
              </CardHeader>
              <CardContent>
                {renderRatingDistribution()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            {renderAnalysis()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AdminDashboard

