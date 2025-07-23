"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye, Download, Calendar, BookOpen } from "lucide-react"

interface PhotoSubmission {
  id: number
  student_name: string
  student_class: string
  equation_1: string
  equation_2: string
  solution_x: number
  solution_y: number
  photo_data: string
  is_completed: boolean
  created_at_wib: string
}

export function StudentPhotoGallery() {
  const [submissions, setSubmissions] = useState<PhotoSubmission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/guru/spldv-submissions")
      const data = await response.json()
      setSubmissions(data)
    } catch (error) {
      console.error("Error fetching submissions:", error)
    } finally {
      setLoading(false)
    }
  }

  const downloadPhoto = (photoData: string, studentName: string, timestamp: string) => {
    const link = document.createElement("a")
    link.href = photoData
    link.download = `SPLDV_${studentName}_${new Date(timestamp).toISOString().split("T")[0]}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return <div className="text-center py-8">Memuat foto jawaban...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.map((submission) => (
          <Card key={submission.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{submission.student_name}</CardTitle>
                  <p className="text-sm text-gray-600">{submission.student_class}</p>
                </div>
                <Badge variant={submission.is_completed ? "default" : "secondary"}>
                  {submission.is_completed ? "Selesai" : "Tidak Selesai"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Equation Display */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm font-medium">Persamaan SPLDV:</span>
                </div>
                <div className="font-mono text-sm">
                  <div>{submission.equation_1}</div>
                  <div>{submission.equation_2}</div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Solusi: x = {submission.solution_x}, y = {submission.solution_y}
                </div>
              </div>

              {/* Photo Preview */}
              <div className="relative">
                <img
                  src={submission.photo_data || "/placeholder.svg"}
                  alt={`Jawaban ${submission.student_name}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat Detail
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>
                          Jawaban SPLDV - {submission.student_name} ({submission.student_class})
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Persamaan yang diselesaikan:</h4>
                          <div className="font-mono">
                            <div>{submission.equation_1}</div>
                            <div>{submission.equation_2}</div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            Solusi yang benar: x = {submission.solution_x}, y = {submission.solution_y}
                          </div>
                        </div>
                        <img
                          src={submission.photo_data || "/placeholder.svg"}
                          alt={`Jawaban ${submission.student_name}`}
                          className="w-full max-h-96 object-contain rounded-lg"
                        />
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(submission.created_at_wib).toLocaleString("id-ID", {
                              timeZone: "Asia/Jakarta",
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            WIB
                          </div>
                          <Button
                            onClick={() =>
                              downloadPhoto(submission.photo_data, submission.student_name, submission.created_at_wib)
                            }
                            size="sm"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(submission.created_at_wib).toLocaleDateString("id-ID")}
                </div>
                <div>
                  {new Date(submission.created_at_wib).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  WIB
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="w-4 h-4 mr-2" />
                      Lihat
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Jawaban {submission.student_name}</DialogTitle>
                    </DialogHeader>
                    <img
                      src={submission.photo_data || "/placeholder.svg"}
                      alt={`Jawaban ${submission.student_name}`}
                      className="w-full max-h-96 object-contain rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    downloadPhoto(submission.photo_data, submission.student_name, submission.created_at_wib)
                  }
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {submissions.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Foto Jawaban</h3>
          <p className="text-gray-600">Foto jawaban SPLDV dari siswa akan muncul di sini</p>
        </div>
      )}
    </div>
  )
}
