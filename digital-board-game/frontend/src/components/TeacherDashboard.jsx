import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Download, Users, Trophy, Eye, LogOut, RefreshCw } from 'lucide-react'

const TeacherDashboard = ({ user, socket, onLogout }) => {
  const [gameState, setGameState] = useState({
    players: [],
    gameStarted: false,
    gameEnded: false,
    timeLeft: 1800,
    currentPlayer: null,
    currentQuestion: null,
    leaderboard: [],
    gameHistory: []
  })
  
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [playerAnswers, setPlayerAnswers] = useState([])
  const [exportLoading, setExportLoading] = useState(false)

  const playClickSound = () => {
    console.log('Click sound')
  }

  useEffect(() => {
    if (!socket) return

    // Join as teacher observer
    socket.emit('join_teacher_room')

    // Socket event listeners
    socket.on('game_state_update', (state) => {
      setGameState(state)
    })

    socket.on('player_answer', (answerData) => {
      setPlayerAnswers(prev => [...prev, answerData])
    })

    socket.on('player_interaction', (interaction) => {
      console.log('Player interaction:', interaction)
    })

    return () => {
      socket.off('game_state_update')
      socket.off('player_answer')
      socket.off('player_interaction')
    }
  }, [socket])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const exportToExcel = async () => {
    setExportLoading(true)
    playClickSound()
    
    try {
      const response = await fetch(`/api/export-results/teacher-room`, {
        method: 'GET'
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `game_results_${new Date().toISOString().split('T')[0]}.xlsx`
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

  const getPlayerColor = (playerId) => {
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#f97316']
    return colors[playerId % colors.length]
  }

  const renderGameBoard = () => {
    const board = []
    const totalCells = 40
    
    for (let i = 0; i < totalCells; i++) {
      let position = { row: 0, col: 0 }
      
      if (i < 10) {
        position = { row: 0, col: i }
      } else if (i < 20) {
        position = { row: i - 10, col: 9 }
      } else if (i < 30) {
        position = { row: 9, col: 9 - (i - 20) }
      } else {
        position = { row: 9 - (i - 30), col: 0 }
      }
      
      board.push({
        id: i,
        position,
        players: gameState.players.filter(p => p.position === i)
      })
    }
    
    return (
      <div className="game-board">
        {board.map((cell) => (
          <div
            key={cell.id}
            className="board-cell"
            style={{
              gridRow: cell.position.row + 1,
              gridColumn: cell.position.col + 1
            }}
          >
            <span className="text-xs">{cell.id + 1}</span>
            {cell.players.map((player, index) => (
              <div
                key={player.id}
                className="player-piece"
                style={{
                  backgroundColor: getPlayerColor(player.id),
                  transform: `translate(-50%, -50%) translate(${index * 4}px, ${index * 4}px)`
                }}
                title={player.name}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  const renderPlayerList = () => {
    return (
      <div className="space-y-2">
        {gameState.players.map((player) => (
          <Card key={player.id} className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: getPlayerColor(player.id) }}
                />
                <div>
                  <p className="font-medium">{player.name}</p>
                  <p className="text-sm text-gray-500">{player.class}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant={player.id === gameState.currentPlayer ? 'default' : 'secondary'}>
                  Posisi {(player.position || 0) + 1}
                </Badge>
                <Badge variant="outline">
                  {player.correctAnswers || 0}/{player.totalAnswers || 0}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedPlayer(player)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  const renderLeaderboard = () => {
    const sortedPlayers = [...gameState.players].sort((a, b) => {
      const aScore = (a.correctAnswers || 0) / Math.max(a.totalAnswers || 1, 1)
      const bScore = (b.correctAnswers || 0) / Math.max(b.totalAnswers || 1, 1)
      return bScore - aScore || (b.correctAnswers || 0) - (a.correctAnswers || 0)
    })

    return (
      <div className="space-y-2">
        {sortedPlayers.map((player, index) => (
          <div key={player.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold">
                {index + 1}
              </div>
              <div>
                <p className="font-medium">{player.name}</p>
                <p className="text-sm text-gray-500">{player.class}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-bold text-green-600">{player.correctAnswers || 0} benar</p>
              <p className="text-sm text-gray-500">dari {player.totalAnswers || 0} soal</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderCurrentQuestion = () => {
    if (!gameState.currentQuestion) {
      return (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            Tidak ada soal yang sedang aktif
          </CardContent>
        </Card>
      )
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Soal Saat Ini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="font-medium">{gameState.currentQuestion.question}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Jawaban yang benar:</span>
                <p>x = {gameState.currentQuestion.answer?.x}</p>
                <p>y = {gameState.currentQuestion.answer?.y}</p>
              </div>
              <div>
                <span className="font-medium">Konteks:</span>
                <p>{gameState.currentQuestion.context}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderPlayerAnswers = () => {
    const recentAnswers = playerAnswers.slice(-10).reverse()
    
    return (
      <div className="space-y-2">
        {recentAnswers.map((answer, index) => (
          <Card key={index} className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{answer.playerName}</p>
                <p className="text-sm text-gray-500">
                  Metode: {answer.method} | {answer.equation}
                </p>
                {answer.contextual && (
                  <p className="text-sm text-gray-500">Jawaban: {answer.contextual}</p>
                )}
              </div>
              
              <Badge variant={answer.isCorrect ? 'default' : 'destructive'}>
                {answer.isCorrect ? 'Benar' : 'Salah'}
              </Badge>
            </div>
          </Card>
        ))}
        
        {recentAnswers.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              Belum ada jawaban dari siswa
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Guru</h1>
            <p className="text-gray-600">Monitoring Real-time Game SPLDV</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Waktu tersisa</p>
              <p className="text-xl font-bold text-red-600">{formatTime(gameState.timeLeft)}</p>
            </div>
            
            <Button 
              onClick={exportToExcel}
              disabled={exportLoading}
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

        {/* Game Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Pemain</span>
                <span className="text-2xl font-bold text-blue-600">{gameState.players.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status Game</span>
                <Badge variant={gameState.gameStarted ? 'default' : 'secondary'}>
                  {gameState.gameStarted ? 'Berlangsung' : 'Menunggu'}
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pemain Aktif</span>
                <span className="text-2xl font-bold text-green-600">
                  {gameState.players.filter(p => p.online).length}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Jawaban</span>
                <span className="text-2xl font-bold text-purple-600">{playerAnswers.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Papan Permainan Real-time</CardTitle>
              </CardHeader>
              <CardContent>
                {renderGameBoard()}
              </CardContent>
            </Card>
          </div>
          
          {/* Side Panel */}
          <div>
            <Tabs defaultValue="players" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="players" onClick={playClickSound}>
                  <Users className="h-4 w-4 mr-2" />
                  Pemain
                </TabsTrigger>
                <TabsTrigger value="leaderboard" onClick={playClickSound}>
                  <Trophy className="h-4 w-4 mr-2" />
                  Ranking
                </TabsTrigger>
                <TabsTrigger value="answers" onClick={playClickSound}>
                  <Eye className="h-4 w-4 mr-2" />
                  Jawaban
                </TabsTrigger>
              </TabsList>

              <TabsContent value="players">
                <Card>
                  <CardHeader>
                    <CardTitle>Daftar Pemain</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderPlayerList()}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="leaderboard">
                <Card>
                  <CardHeader>
                    <CardTitle>Leaderboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderLeaderboard()}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="answers">
                <Card>
                  <CardHeader>
                    <CardTitle>Jawaban Terbaru</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderPlayerAnswers()}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Current Question */}
        <div className="mt-6">
          {renderCurrentQuestion()}
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard

