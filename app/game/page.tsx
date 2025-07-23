"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GameBoard } from "@/components/game-board"
import { Navbar } from "@/components/navbar"
import { Camera, Upload, Clock, Star, Trophy, Target } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Question {
  id: number
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  type: "pilihan_ganda" | "spldv"
  difficulty: "mudah" | "sedang" | "sulit"
}

interface SPLDVEquation {
  equation1: string
  equation2: string
  solutionX: number
  solutionY: number
}

export default function GamePage() {
  const router = useRouter()
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [currentPosition, setCurrentPosition] = useState(1)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)
  const [gamePhase, setGamePhase] = useState<"rolling" | "question" | "spldv_equation" | "spldv_photo" | "completed">(
    "rolling",
  )
  const [studentName, setStudentName] = useState("")
  const [studentClass, setStudentClass] = useState("")
  const [spldvEquation, setSPLDVEquation] = useState<SPLDVEquation | null>(null)
  const [spldvStep, setSPLDVStep] = useState<"equation" | "photo">("equation")
  const [photoTaken, setPhotoTaken] = useState(false)
  const [canvasData, setCanvasData] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Sound effects
  const playSound = (soundFile: string) => {
    const audio = new Audio(`/sounds/${soundFile}`)
    audio.play().catch((e) => console.log("Sound play failed:", e))
  }

  // Generate SPLDV equation based on difficulty
  const generateSPLDVEquation = (difficulty: string): SPLDVEquation => {
    let a1, b1, c1, a2, b2, c2, x, y

    switch (difficulty) {
      case "mudah":
        // Simple coefficients
        x = Math.floor(Math.random() * 5) + 1
        y = Math.floor(Math.random() * 5) + 1
        a1 = Math.floor(Math.random() * 3) + 1
        b1 = Math.floor(Math.random() * 3) + 1
        a2 = Math.floor(Math.random() * 3) + 1
        b2 = Math.floor(Math.random() * 3) + 1
        break
      case "sedang":
        // Medium coefficients
        x = Math.floor(Math.random() * 8) + 1
        y = Math.floor(Math.random() * 8) + 1
        a1 = Math.floor(Math.random() * 5) + 1
        b1 = Math.floor(Math.random() * 5) + 1
        a2 = Math.floor(Math.random() * 5) + 1
        b2 = Math.floor(Math.random() * 5) + 1
        break
      case "sulit":
        // Complex coefficients
        x = Math.floor(Math.random() * 10) + 1
        y = Math.floor(Math.random() * 10) + 1
        a1 = Math.floor(Math.random() * 7) + 2
        b1 = Math.floor(Math.random() * 7) + 2
        a2 = Math.floor(Math.random() * 7) + 2
        b2 = Math.floor(Math.random() * 7) + 2
        break
      default:
        x = 2
        y = 3
        a1 = 1
        b1 = 1
        a2 = 1
        b2 = 1
    }

    c1 = a1 * x + b1 * y
    c2 = a2 * x + b2 * y

    return {
      equation1: `${a1}x + ${b1}y = ${c1}`,
      equation2: `${a2}x + ${b2}y = ${c2}`,
      solutionX: x,
      solutionY: y,
    }
  }

  useEffect(() => {
    const name = localStorage.getItem("studentName")
    const kelas = localStorage.getItem("studentClass")
    if (!name || !kelas) {
      router.push("/login-siswa")
      return
    }
    setStudentName(name)
    setStudentClass(kelas)
    createGameSession(name, kelas)
  }, [])

  useEffect(() => {
    if (gamePhase === "question" || gamePhase === "spldv_photo") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      timerRef.current = timer
      return () => clearInterval(timer)
    }
  }, [gamePhase])

  const createGameSession = async (name: string, kelas: string) => {
    try {
      const response = await fetch("/api/session/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentName: name, studentClass: kelas }),
      })
      const data = await response.json()
      setSessionId(data.sessionId)
    } catch (error) {
      console.error("Error creating session:", error)
    }
  }

  const rollDice = () => {
    playSound("dice.mp3")
    const roll = Math.floor(Math.random() * 6) + 1
    const newPosition = Math.min(currentPosition + roll, 100)
    setCurrentPosition(newPosition)

    if (newPosition === 100) {
      completeGame()
      return
    }

    fetchQuestion()
    updatePosition(newPosition)
  }

  const fetchQuestion = async () => {
    try {
      const response = await fetch("/api/questions/random")
      const question = await response.json()
      setCurrentQuestion(question)

      if (question.type === "spldv") {
        const equation = generateSPLDVEquation(question.difficulty)
        setSPLDVEquation(equation)
        setGamePhase("spldv_equation")
        setSPLDVStep("equation")
        setTimeLeft(60) // 1 minute for SPLDV
      } else {
        setGamePhase("question")
        setTimeLeft(30) // 30 seconds for multiple choice
      }
      setSelectedAnswer("")
    } catch (error) {
      console.error("Error fetching question:", error)
    }
  }

  const handleAnswer = async (answer: string) => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    setSelectedAnswer(answer)
    const isCorrect = answer === currentQuestion?.correct_answer

    if (isCorrect) {
      playSound("correct.mp3")
      const newScore = score + 10
      setScore(newScore)
      updateScore(newScore)

      // Bonus for quick answer
      if (timeLeft > 20) {
        playSound("bonus.mp3")
        const bonusScore = newScore + 5
        setScore(bonusScore)
        updateScore(bonusScore)
      }
    } else {
      playSound("wrong.mp3")
    }

    updateStats(isCorrect)
    setTimeout(() => {
      setGamePhase("rolling")
    }, 2000)
  }

  const handleSPLDVNext = () => {
    if (spldvStep === "equation") {
      setSPLDVStep("photo")
      setGamePhase("spldv_photo")
      setTimeLeft(120) // 2 minutes for photo
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Tidak dapat mengakses kamera. Pastikan izin kamera telah diberikan.")
    }
  }

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context?.drawImage(video, 0, 0)

      const photoData = canvas.toDataURL("image/jpeg", 0.8)
      setCanvasData(photoData)
      setPhotoTaken(true)
      playSound("upload.mp3")

      // Stop camera
      const stream = video.srcObject as MediaStream
      stream?.getTracks().forEach((track) => track.stop())
      setCameraActive(false)
    }
  }

  const submitSPLDVAnswer = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    if (!photoTaken || !canvasData) {
      playSound("wrong.mp3")
      updateStats(false)
      setTimeout(() => {
        setGamePhase("rolling")
        resetSPLDVState()
      }, 2000)
      return
    }

    try {
      // Save photo submission
      await fetch("/api/canvas/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          studentName,
          studentClass,
          questionText: `${spldvEquation?.equation1}, ${spldvEquation?.equation2}`,
          difficulty: currentQuestion?.difficulty,
          canvasData,
          equation1: spldvEquation?.equation1,
          equation2: spldvEquation?.equation2,
          solutionX: spldvEquation?.solutionX,
          solutionY: spldvEquation?.solutionY,
        }),
      })

      playSound("correct.mp3")
      const newScore = score + 15 // Higher score for SPLDV
      setScore(newScore)
      updateScore(newScore)
      updateStats(true)

      setTimeout(() => {
        setGamePhase("rolling")
        resetSPLDVState()
      }, 2000)
    } catch (error) {
      console.error("Error submitting SPLDV answer:", error)
      playSound("wrong.mp3")
      updateStats(false)
      setTimeout(() => {
        setGamePhase("rolling")
        resetSPLDVState()
      }, 2000)
    }
  }

  const resetSPLDVState = () => {
    setSPLDVEquation(null)
    setSPLDVStep("equation")
    setPhotoTaken(false)
    setCanvasData(null)
    setCameraActive(false)
  }

  const handleTimeUp = () => {
    playSound("timeout.mp3")
    if (gamePhase === "spldv_photo") {
      // Mark as incomplete/wrong for SPLDV
      updateStats(false)
      setTimeout(() => {
        setGamePhase("rolling")
        resetSPLDVState()
      }, 1000)
    } else {
      updateStats(false)
      setTimeout(() => {
        setGamePhase("rolling")
      }, 1000)
    }
  }

  const updatePosition = async (position: number) => {
    if (!sessionId) return
    try {
      await fetch("/api/session/update-position", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, position }),
      })
    } catch (error) {
      console.error("Error updating position:", error)
    }
  }

  const updateScore = async (newScore: number) => {
    if (!sessionId) return
    try {
      await fetch("/api/session/update-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, score: newScore }),
      })
    } catch (error) {
      console.error("Error updating score:", error)
    }
  }

  const updateStats = async (isCorrect: boolean) => {
    if (!sessionId) return
    try {
      await fetch("/api/session/update-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, isCorrect }),
      })
    } catch (error) {
      console.error("Error updating stats:", error)
    }
  }

  const completeGame = async () => {
    if (!sessionId) return
    try {
      await fetch("/api/session/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
      playSound("success.mp3")
      setGamePhase("completed")
    } catch (error) {
      console.error("Error completing game:", error)
    }
  }

  if (gamePhase === "completed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-600">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">Selamat!</h1>
            <p className="text-xl text-white mb-4">Kamu telah menyelesaikan permainan!</p>
            <p className="text-2xl font-bold text-yellow-300 mb-8">Skor Akhir: {score}</p>
            <Button onClick={() => router.push("/leaderboard")} className="mr-4">
              Lihat Leaderboard
            </Button>
            <Button onClick={() => router.push("/")} variant="outline">
              Kembali ke Beranda
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Posisi</p>
              <p className="text-2xl font-bold">{currentPosition}/100</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Skor</p>
              <p className="text-2xl font-bold">{score}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Waktu</p>
              <p className="text-2xl font-bold">{timeLeft}s</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Progress</p>
              <Progress value={currentPosition} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Game Board */}
        <div className="mb-8">
          <GameBoard currentPosition={currentPosition} />
        </div>

        {/* Game Content */}
        <AnimatePresence mode="wait">
          {gamePhase === "rolling" && (
            <motion.div
              key="rolling"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <Card className="max-w-md mx-auto">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Lempar Dadu!</h2>
                  <Button onClick={rollDice} size="lg" className="w-full">
                    🎲 Lempar Dadu
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {gamePhase === "question" && currentQuestion && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Soal Pilihan Ganda</CardTitle>
                    <Badge
                      variant={
                        currentQuestion.difficulty === "mudah"
                          ? "default"
                          : currentQuestion.difficulty === "sedang"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {currentQuestion.difficulty.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Waktu tersisa: {timeLeft} detik</span>
                    <Progress value={(timeLeft / 30) * 100} className="w-32" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-6">{currentQuestion.question_text}</p>
                  <div className="space-y-3">
                    {["A", "B", "C", "D"].map((option) => (
                      <Button
                        key={option}
                        variant={selectedAnswer === option ? "default" : "outline"}
                        className="w-full text-left justify-start"
                        onClick={() => handleAnswer(option)}
                      >
                        {option}. {currentQuestion[`option_${option.toLowerCase()}` as keyof Question]}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {gamePhase === "spldv_equation" && spldvEquation && (
            <motion.div
              key="spldv_equation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Soal SPLDV - Langkah 1</CardTitle>
                    <Badge variant="secondary">SPLDV</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-4">Selesaikan sistem persamaan berikut:</h3>
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <p className="text-2xl font-mono mb-2">{spldvEquation.equation1}</p>
                      <p className="text-2xl font-mono">{spldvEquation.equation2}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">Selesaikan di kertas, lalu foto hasil pekerjaanmu!</p>
                  </div>
                  <Button onClick={handleSPLDVNext} className="w-full" size="lg">
                    Lanjut ke Foto Jawaban
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {gamePhase === "spldv_photo" && (
            <motion.div
              key="spldv_photo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Soal SPLDV - Langkah 2</CardTitle>
                    <Badge variant="secondary">FOTO JAWABAN</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Waktu tersisa: {timeLeft} detik</span>
                    <Progress value={(timeLeft / 120) * 100} className="w-32" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    {!cameraActive && !photoTaken && (
                      <div>
                        <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="mb-4">Foto hasil pekerjaanmu di kertas</p>
                        <Button onClick={startCamera} size="lg">
                          <Camera className="w-4 h-4 mr-2" />
                          Buka Kamera
                        </Button>
                      </div>
                    )}

                    {cameraActive && !photoTaken && (
                      <div>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full max-w-md mx-auto rounded-lg mb-4"
                        />
                        <Button onClick={takePhoto} size="lg">
                          <Camera className="w-4 h-4 mr-2" />
                          Ambil Foto
                        </Button>
                      </div>
                    )}

                    {photoTaken && canvasData && (
                      <div>
                        <img
                          src={canvasData || "/placeholder.svg"}
                          alt="Foto jawaban"
                          className="w-full max-w-md mx-auto rounded-lg mb-4"
                        />
                        <div className="space-x-4">
                          <Button onClick={submitSPLDVAnswer} size="lg">
                            <Upload className="w-4 h-4 mr-2" />
                            Kirim Jawaban
                          </Button>
                          <Button
                            onClick={() => {
                              setPhotoTaken(false)
                              setCanvasData(null)
                            }}
                            variant="outline"
                          >
                            Foto Ulang
                          </Button>
                        </div>
                      </div>
                    )}

                    <canvas ref={canvasRef} style={{ display: "none" }} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
