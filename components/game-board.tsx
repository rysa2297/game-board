"use client"
import { useState, useEffect } from "react"
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface GameBoardProps {
  boardSize: number
  currentPosition: number
  isRolling: boolean
  diceValue: number
  onRollDice: () => void
  disabled: boolean
}

const DICE_ICONS = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]

export default function GameBoard({
  boardSize,
  currentPosition,
  isRolling,
  diceValue,
  onRollDice,
  disabled,
}: GameBoardProps) {
  const [board, setBoard] = useState<string[]>([])

  // Generate board tiles with start and finish
  useEffect(() => {
    const tiles = []

    // First tile is START
    tiles.push("START")

    // Generate middle tiles
    for (let i = 1; i < boardSize - 1; i++) {
      const rand = Math.random()
      if (rand < 0.35) tiles.push("SPLDV")
      else if (rand < 0.65) tiles.push("MatDas")
      else if (rand < 0.8) tiles.push("Bonus")
      else tiles.push("Empty")
    }

    // Last tile is FINISH
    tiles.push("FINISH")

    setBoard(tiles)
  }, [boardSize])

  const DiceIcon = DICE_ICONS[diceValue - 1]

  const getTileColor = (tile: string, index: number) => {
    const baseClasses =
      "w-8 h-8 border-2 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 relative"

    if (index === currentPosition) {
      return `${baseClasses} ring-4 ring-red-400 ring-opacity-75 scale-110 z-10`
    }

    switch (tile) {
      case "START":
        return `${baseClasses} bg-green-200 border-green-400 text-green-800 shadow-md`
      case "FINISH":
        return `${baseClasses} bg-red-200 border-red-400 text-red-800 shadow-md`
      case "SPLDV":
        return `${baseClasses} bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200 shadow-sm`
      case "MatDas":
        return `${baseClasses} bg-green-100 border-green-300 text-green-800 hover:bg-green-200 shadow-sm`
      case "Bonus":
        return `${baseClasses} bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200 shadow-sm`
      default:
        return `${baseClasses} bg-gray-50 border-gray-300 text-gray-600`
    }
  }

  const getTileIcon = (tile: string, index: number) => {
    switch (tile) {
      case "START":
        return "🏁"
      case "FINISH":
        return "🏆"
      case "SPLDV":
        return "S"
      case "MatDas":
        return "M"
      case "Bonus":
        return "★"
      default:
        return `${index + 1}`
    }
  }

  return (
    <div className="space-y-6">
      {/* Board */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-white/20">
        <div className="max-h-[400px] overflow-y-auto">
          <div className="grid grid-cols-10 gap-1 mb-6">
            {board.map((tile, index) => (
              <div key={index} className={getTileColor(tile, index)} title={`${tile} (${index + 1})`}>
                <span>{getTileIcon(tile, index)}</span>
                {index === currentPosition && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-red-700 animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
          <div className="flex items-center gap-2 bg-green-50 p-2 rounded-lg">
            <div className="w-4 h-4 bg-green-200 border border-green-400 rounded"></div>
            <span className="text-xs font-medium">Start</span>
          </div>
          <div className="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
            <div className="w-4 h-4 bg-red-200 border border-red-400 rounded"></div>
            <span className="text-xs font-medium">Finish</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
            <span className="text-xs font-medium">SPLDV</span>
          </div>
          <div className="flex items-center gap-2 bg-green-50 p-2 rounded-lg">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span className="text-xs font-medium">MatDas</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-50 p-2 rounded-lg">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span className="text-xs font-medium">Bonus</span>
          </div>
        </div>
      </div>

      {/* Dice Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-white/20">
        <div className="text-center">
          <div className="mb-4">
            <div
              className={`inline-block bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-2xl shadow-lg ${isRolling ? "animate-bounce" : ""}`}
            >
              <DiceIcon className="h-16 w-16 text-blue-600" />
            </div>
            <div className="mt-3">
              <Badge variant="outline" className="text-lg px-4 py-1">
                {isRolling ? "Mengocok..." : `Dadu: ${diceValue}`}
              </Badge>
            </div>
          </div>

          <Button onClick={onRollDice} disabled={disabled || isRolling} className="game-button text-lg px-8 py-3">
            <span className="mr-2">🎲</span>
            {isRolling ? "Mengocok..." : "Lempar Dadu"}
          </Button>
        </div>
      </div>
    </div>
  )
}
