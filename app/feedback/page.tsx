"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, Send, Trophy } from "lucide-react"

interface User {
  id: number
  nama: string
}

const FEEDBACK_QUESTIONS = [
  "Seberapa mudah game ini dimainkan?",
  "Seberapa membantu fitur canvas coret-coret?",
  "Seberapa jelas soal-soal yang diberikan?",
  "Seberapa menarik tampilan game ini?",
  "Seberapa puas Anda dengan game ini secara keseluruhan?",
]

export default function FeedbackPage() {
  const [user, setUser] = useState<User | null>(null)
  const [ratings, setRatings] = useState<number[]>([0, 0, 0, 0, 0])
  const [feedbackText, setFeedbackText] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login-siswa")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
  }, [])

  const handleRatingChange = (questionIndex: number, rating: number) => {
    const newRatings = [...ratings]
    newRatings[questionIndex] = rating
    setRatings(newRatings)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (ratings.some((rating) => rating === 0)) {
      alert("Mohon berikan rating untuk semua pertanyaan")
      return
    }

    setLoading(true)

    try {
      // Get the latest session for this user
      const sessionResponse = await fetch(`/api/session/latest?user_id=${user?.id}`)
      const sessionData = await sessionResponse.json()

      if (!sessionData.session) {
        throw new Error("Session not found")
      }

      const response = await fetch("/api/feedback/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionData.session.id,
          rating1: ratings[0],
          rating2: ratings[1],
          rating3: ratings[2],
          rating4: ratings[3],
          rating5: ratings[4],
          feedback_text: feedbackText,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          router.push("/leaderboard")
        }, 3000)
      } else {
        throw new Error("Failed to submit feedback")
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim feedback")
    } finally {
      setLoading(false)
    }
  }

  const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`p-1 transition-colors ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            } hover:text-yellow-400`}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        ))}
      </div>
    )
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <Card>
            <CardContent className="py-8">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-600 mb-2">Terima Kasih!</h2>
              <p className="text-gray-600 mb-4">
                Feedback Anda telah berhasil dikirim. Anda akan diarahkan ke leaderboard dalam beberapa detik.
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Feedback Game</CardTitle>
            <CardDescription>Berikan penilaian Anda tentang pengalaman bermain game SPLDV</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {FEEDBACK_QUESTIONS.map((question, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {index + 1}. {question}
                  </label>
                  <div className="flex items-center justify-between">
                    <StarRating
                      rating={ratings[index]}
                      onRatingChange={(rating) => handleRatingChange(index, rating)}
                    />
                    <span className="text-sm text-gray-500 ml-4">
                      {ratings[index] > 0 ? `${ratings[index]}/5` : "Belum dinilai"}
                    </span>
                  </div>
                </div>
              ))}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Apa yang perlu diperbaiki dari game ini?
                </label>
                <Textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Tuliskan saran dan kritik Anda..."
                  rows={4}
                  className="w-full"
                />
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => router.push("/leaderboard")} className="flex-1">
                  Lewati Feedback
                </Button>
                <Button type="submit" disabled={loading} className="flex-1 game-button flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  {loading ? "Mengirim..." : "Kirim Feedback"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Terima kasih telah bermain!</h3>
            <p className="text-sm text-blue-700">
              Feedback Anda sangat berharga untuk pengembangan game ini ke depannya.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
