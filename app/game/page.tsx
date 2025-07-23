"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Trophy, Palette, Download, Send } from "lucide-react"
import GameCanvas from "@/components/game-canvas"
import GameBoard from "@/components/game-board"

interface User {
  id: number
  nama: string
  kelas: string
  guru_id: number
}

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
}

interface GameSession {
  id: number
  skor: number
  total_jawaban: number
  total_benar: number
  current_position: number
}

const BOARD_SIZE = 100

export default function GamePage() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<GameSession | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)
  const [gameTime, setGameTime] = useState(1800) // 30 minutes
  const [diceValue, setDiceValue] = useState(1)
  const [isRolling, setIsRolling] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)
  const [canvasImage, setCanvasImage] = useState<string | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const router = useRouter()
  const canvasRef = useRef<any>(null)

  // Add these state variables after the existing ones:
  const [spldvStep, setSpldvStep] = useState<1 | 2>(1) // Step 1: equation, Step 2: multiple choice
  const [spldvEquation, setSpldvEquation] = useState<string>("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login-siswa")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "siswa") {
      router.push("/")
      return
    }

    setUser(parsedUser)
    initializeSession(parsedUser)
  }, [])

  useEffect(() => {
    if (gameStarted && gameTime > 0) {
      const timer = setInterval(() => {
        setGameTime((prev) => {
          if (prev <= 1) {
            endGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameStarted, gameTime])

  useEffect(() => {
    if (timeLeft > 0 && showQuestion) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft, showQuestion])

  const initializeSession = async (userData: User) => {
    try {
      const response = await fetch("/api/session/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userData.id,
          guru_id: userData.guru_id,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setSession(data.session)
        setGameStarted(true)
      }
    } catch (error) {
      console.error("Error creating session:", error)
    }
  }

  const rollDice = async () => {
    if (!session || isRolling) return

    setIsRolling(true)

    // Animate dice roll
    const rollAnimation = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1)
    }, 100)

    setTimeout(async () => {
      clearInterval(rollAnimation)
      const finalValue = Math.floor(Math.random() * 6) + 1
      setDiceValue(finalValue)
      setIsRolling(false)

      // Play dice sound
      playSound("https://www.soundjay.com/misc/sounds/bell-ringing-05.wav")

      // Move player
      const newPosition = Math.min(session.current_position + finalValue, BOARD_SIZE - 1)
      const tileType = getTileType(newPosition)

      // Update position
      await updatePosition(newPosition)

      // Check if reached finish
      if (newPosition === BOARD_SIZE - 1) {
        alert("🎉 Selamat! Anda telah mencapai FINISH!")
        endGame()
        return
      }

      // Handle tile action
      if (tileType === "SPLDV" || tileType === "MatDas") {
        await loadQuestion(tileType)
      } else if (tileType === "Bonus") {
        handleBonusTile()
      }
    }, 1000)
  }

  // Helper function to determine tile type based on position
  const getTileType = (position: number) => {
    if (position === 0) return "START"
    if (position === BOARD_SIZE - 1) return "FINISH"

    // Deterministic pattern based on position
    const pattern = position % 5
    if (pattern === 1 || pattern === 2) return "SPLDV"
    if (pattern === 3) return "MatDas"
    if (pattern === 4) return "Bonus"
    return "Empty"
  }

  const updatePosition = async (position: number) => {
    try {
      const response = await fetch("/api/session/update-position", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: session?.id,
          position,
        }),
      })

      if (response.ok) {
        setSession((prev) => (prev ? { ...prev, current_position: position } : null))
      }
    } catch (error) {
      console.error("Error updating position:", error)
    }
  }

  const loadQuestion = async (category: string) => {
    try {
      const response = await fetch(`/api/questions/random?category=${category}&guru_id=${user?.guru_id}`)
      if (response.ok) {
        const data = await response.json()
        setCurrentQuestion(data.question)

        if (category === "SPLDV") {
          // For SPLDV, start with step 1 (show equation only)
          setSpldvStep(1)
          setSpldvEquation(data.question.question)
          setTimeLeft(data.question.time_limit)
          setShowQuestion(true)
          setSelectedAnswer("")
          setCanvasImage(null)
        } else {
          // For MatDas, show normal multiple choice
          setTimeLeft(data.question.time_limit)
          setShowQuestion(true)
          setSelectedAnswer("")
          setCanvasImage(null)
        }
      }
    } catch (error) {
      console.error("Error loading question:", error)
    }
  }

  const handleBonusTile = () => {
    const bonusActions = [
      { text: "Maju 2 langkah!", move: 2 },
      { text: "Mundur 1 langkah!", move: -1 },
      { text: "Bonus +5 poin!", score: 5 },
      { text: "Maju 3 langkah!", move: 3 },
    ]

    const bonus = bonusActions[Math.floor(Math.random() * bonusActions.length)]

    if (bonus.move) {
      const newPos = Math.max(0, Math.min(session!.current_position + bonus.move, BOARD_SIZE - 1))
      updatePosition(newPos)
    }

    if (bonus.score) {
      updateScore(bonus.score)
    }

    alert(bonus.text)
  }

  const handleAnswerSubmit = async () => {
    if (!currentQuestion || !session) return

    playSound("https://www.soundjay.com/misc/sounds/bell-ringing-05.wav")

    // For SPLDV Step 1, just move to step 2
    if (currentQuestion.category === "SPLDV" && spldvStep === 1) {
      // Save canvas if exists
      if (canvasImage) {
        await saveCanvas()
      }

      // Move to step 2 (multiple choice)
      setSpldvStep(2)
      setTimeLeft(30) // Give 30 seconds for multiple choice
      return
    }

    // For SPLDV Step 2 or MatDas, process the answer
    if (!selectedAnswer) return

    const isCorrect = selectedAnswer === currentQuestion.correct_answer
    const scoreChange = currentQuestion.category === "SPLDV" ? (isCorrect ? 10 : -5) : isCorrect ? 5 : -3

    // Update score and stats
    await updateScore(scoreChange)
    await updateStats(isCorrect)

    setShowQuestion(false)
    setCurrentQuestion(null)
    setSpldvStep(1) // Reset for next question

    // Check if game should end
    if (session.total_jawaban >= 20 || session.current_position >= BOARD_SIZE - 1) {
      endGame()
    }
  }

  const handleTimeUp = () => {
    if (currentQuestion?.category === "SPLDV") {
      updateScore(-5)
    } else {
      updateScore(-3)
    }
    updateStats(false)
    setShowQuestion(false)
    setCurrentQuestion(null)
  }

  const updateScore = async (change: number) => {
    try {
      const response = await fetch("/api/session/update-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: session?.id,
          score_change: change,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setSession((prev) => (prev ? { ...prev, skor: data.new_score } : null))
      }
    } catch (error) {
      console.error("Error updating score:", error)
    }
  }

  const updateStats = async (isCorrect: boolean) => {
    try {
      await fetch("/api/session/update-stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: session?.id,
          is_correct: isCorrect,
        }),
      })

      setSession((prev) =>
        prev
          ? {
              ...prev,
              total_jawaban: prev.total_jawaban + 1,
              total_benar: prev.total_benar + (isCorrect ? 1 : 0),
            }
          : null,
      )
    } catch (error) {
      console.error("Error updating stats:", error)
    }
  }

  const saveCanvas = async () => {
    if (!canvasImage || !session || !currentQuestion) return

    try {
      await fetch("/api/canvas/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: session.id,
          question_id: currentQuestion.id,
          image_data: canvasImage,
        }),
      })
    } catch (error) {
      console.error("Error saving canvas:", error)
    }
  }

  const exportCanvas = () => {
    if (canvasRef.current) {
      const imageData = canvasRef.current.exportCanvas()
      setCanvasImage(imageData)

      // Download the image
      const link = document.createElement("a")
      link.download = `soal-${currentQuestion?.id}-${Date.now()}.png`
      link.href = imageData
      link.click()
    }
  }

  const endGame = async () => {
    try {
      await fetch("/api/session/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: session?.id,
        }),
      })

      router.push("/feedback")
    } catch (error) {
      console.error("Error ending game:", error)
    }
  }

  const playSound = (src: string) => {
    const audio = new Audio(src)
    audio.play().catch(() => {
      // Ignore audio play errors
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!user || !session) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Game Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-white/20 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Game SPLDV
            </h1>
            <p className="text-gray-600 mt-1">Selamat bermain, {user.nama}! 🎮</p>
          </div>

          <div className="flex gap-3">
            <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 text-base">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="font-mono">{formatTime(gameTime)}</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 text-base">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-bold">{session.skor} poin</span>
            </Badge>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span className="font-medium">Progress: {session.total_jawaban}/20 soal</span>
            <span className="font-medium">
              Benar: {session.total_benar} | Akurasi:{" "}
              {session.total_jawaban > 0 ? Math.round((session.total_benar / session.total_jawaban) * 100) : 0}%
            </span>
          </div>
          <Progress value={(session.total_jawaban / 20) * 100} className="h-3 bg-gray-200" />
        </div>
      </div>

      {/* Game Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Board */}
        <div className="lg:col-span-2">
          <GameBoard
            boardSize={BOARD_SIZE}
            currentPosition={session.current_position}
            isRolling={isRolling}
            diceValue={diceValue}
            onRollDice={rollDice}
            disabled={showQuestion}
          />
        </div>

        {/* Question/Stats Panel */}
        <div className="space-y-6">
          {showQuestion && currentQuestion ? (
            <div className="bg-white rounded-xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1">
                    {currentQuestion.category}
                  </Badge>
                  {currentQuestion.category === "SPLDV" && <Badge variant="outline">Step {spldvStep}/2</Badge>}
                </div>
                <Badge variant="destructive" className="flex items-center gap-1 px-3 py-1">
                  <Clock className="h-4 w-4" />
                  {formatTime(timeLeft)}
                </Badge>
              </div>

              {/* Question Display */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
                {currentQuestion.category === "SPLDV" && spldvStep === 1 ? (
                  <div>
                    <p className="font-medium mb-3 text-gray-800">Selesaikan sistem persamaan berikut:</p>
                    <div className="bg-white p-4 rounded-lg border-2 border-dashed border-blue-300">
                      <p className="font-mono text-lg text-center text-gray-800">{spldvEquation}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      💡 Gunakan canvas di bawah untuk menyelesaikan persamaan, lalu klik "Lanjut ke Pilihan Jawaban"
                    </p>
                  </div>
                ) : (
                  <p className="font-medium text-gray-800">
                    {currentQuestion.category === "SPLDV"
                      ? "Pilih jawaban yang benar berdasarkan perhitungan Anda:"
                      : currentQuestion.question}
                  </p>
                )}
              </div>

              {/* Canvas */}
              {(currentQuestion.category === "SPLDV" || currentQuestion.category === "MatDas") && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <Palette className="h-4 w-4" />
                      Canvas Coret-Coret
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={exportCanvas}
                      className="flex items-center gap-1 bg-transparent"
                    >
                      <Download className="h-4 w-4" />
                      Ekspor PNG
                    </Button>
                  </div>
                  <GameCanvas ref={canvasRef} />
                </div>
              )}

              {/* Answer Options */}
              {(currentQuestion.category === "MatDas" || (currentQuestion.category === "SPLDV" && spldvStep === 2)) && (
                <div className="space-y-3 mb-4">
                  {["A", "B", "C", "D"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedAnswer(option)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswer === option
                          ? "border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="font-bold mr-3 text-lg">{option}.</span>
                      <span className="text-gray-800">
                        {currentQuestion[`option_${option.toLowerCase()}` as keyof Question] as string}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <Button
                onClick={handleAnswerSubmit}
                disabled={
                  (currentQuestion.category === "SPLDV" && spldvStep === 2 && !selectedAnswer) ||
                  (currentQuestion.category === "MatDas" && !selectedAnswer)
                }
                className="w-full game-button text-lg py-3 flex items-center gap-2"
              >
                <Send className="h-5 w-5" />
                {currentQuestion.category === "SPLDV" && spldvStep === 1
                  ? "Lanjut ke Pilihan Jawaban"
                  : "Kirim Jawaban"}
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 shadow-lg border border-white/20 text-center">
              <div className="text-gray-500">
                <div className="text-6xl mb-4">🎲</div>
                <h3 className="text-lg font-semibold mb-2">Lempar Dadu!</h3>
                <p className="text-gray-400">Klik tombol "Lempar Dadu" untuk melanjutkan permainan</p>
              </div>
            </div>
          )}

          {/* Game Stats */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-white/20">
            <h3 className="font-bold text-lg mb-4 text-gray-800">📊 Statistik Permainan</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
                <div className="text-sm text-blue-600 font-medium">Posisi</div>
                <div className="text-xl font-bold text-blue-800">{session.current_position + 1}/100</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
                <div className="text-sm text-green-600 font-medium">Skor</div>
                <div className="text-xl font-bold text-green-800">{session.skor}</div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg">
                <div className="text-sm text-purple-600 font-medium">Soal</div>
                <div className="text-xl font-bold text-purple-800">{session.total_jawaban}/20</div>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 rounded-lg">
                <div className="text-sm text-yellow-600 font-medium">Akurasi</div>
                <div className="text-xl font-bold text-yellow-800">
                  {session.total_jawaban > 0 ? Math.round((session.total_benar / session.total_jawaban) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
