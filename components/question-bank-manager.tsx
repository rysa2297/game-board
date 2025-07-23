"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Trash2, Clock, CheckCircle } from "lucide-react"

interface Question {
  id: number
  category: string
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  time_limit: number
  created_by: number | null
  verified: boolean
}

interface QuestionBankManagerProps {
  guruId: number
}

export default function QuestionBankManager({ guruId }: QuestionBankManagerProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQuestions()
  }, [guruId])

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`/api/guru/questions?guru_id=${guruId}`)
      if (response.ok) {
        const data = await response.json()
        setQuestions(data.questions)
      }
    } catch (error) {
      console.error("Error fetching questions:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteQuestion = async (questionId: number) => {
    if (!confirm("Yakin ingin menghapus soal ini?")) return

    try {
      const response = await fetch(`/api/guru/questions/${questionId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setQuestions((prev) => prev.filter((q) => q.id !== questionId))
      }
    } catch (error) {
      console.error("Error deleting question:", error)
    }
  }

  const QuestionCard = ({ question }: { question: Question }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={question.category === "SPLDV" ? "default" : "secondary"}>{question.category}</Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {question.time_limit}s
              </Badge>
              {question.verified && (
                <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </Badge>
              )}
              {question.created_by === null && (
                <Badge variant="outline" className="text-blue-600">
                  Default
                </Badge>
              )}
            </div>
            <p className="text-sm font-medium text-gray-800">{question.question}</p>
          </div>

          {question.created_by === guruId && (
            <div className="flex gap-2 ml-4">
              <Button size="sm" variant="outline" className="bg-transparent">
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteQuestion(question.id)}
                className="text-red-600 hover:text-red-700 bg-transparent"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div
            className={`p-2 rounded ${question.correct_answer === "A" ? "bg-green-50 border border-green-200" : "bg-gray-50"}`}
          >
            <span className="font-medium">A.</span> {question.option_a}
          </div>
          <div
            className={`p-2 rounded ${question.correct_answer === "B" ? "bg-green-50 border border-green-200" : "bg-gray-50"}`}
          >
            <span className="font-medium">B.</span> {question.option_b}
          </div>
          <div
            className={`p-2 rounded ${question.correct_answer === "C" ? "bg-green-50 border border-green-200" : "bg-gray-50"}`}
          >
            <span className="font-medium">C.</span> {question.option_c}
          </div>
          <div
            className={`p-2 rounded ${question.correct_answer === "D" ? "bg-green-50 border border-green-200" : "bg-gray-50"}`}
          >
            <span className="font-medium">D.</span> {question.option_d}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const spldvQuestions = questions.filter((q) => q.category === "SPLDV")
  const matdasQuestions = questions.filter((q) => q.category === "MatDas")
  const customQuestions = questions.filter((q) => q.created_by === guruId)

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <TabsList>
        <TabsTrigger value="all">Semua ({questions.length})</TabsTrigger>
        <TabsTrigger value="spldv">SPLDV ({spldvQuestions.length})</TabsTrigger>
        <TabsTrigger value="matdas">MatDas ({matdasQuestions.length})</TabsTrigger>
        <TabsTrigger value="custom">Soal Saya ({customQuestions.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </TabsContent>

      <TabsContent value="spldv" className="space-y-4">
        {spldvQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </TabsContent>

      <TabsContent value="matdas" className="space-y-4">
        {matdasQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </TabsContent>

      <TabsContent value="custom" className="space-y-4">
        {customQuestions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Anda belum membuat soal custom.</p>
              <p className="text-sm text-gray-400 mt-1">Klik "Tambah Soal" untuk membuat soal baru.</p>
            </CardContent>
          </Card>
        ) : (
          customQuestions.map((question) => <QuestionCard key={question.id} question={question} />)
        )}
      </TabsContent>
    </Tabs>
  )
}
