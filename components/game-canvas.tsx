"use client"

import type React from "react"

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { Eraser, RotateCcw, Palette } from "lucide-react"

interface GameCanvasProps {
  width?: number
  height?: number
}

const GameCanvas = forwardRef<any, GameCanvasProps>(({ width = 400, height = 200 }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [strokeColor, setStrokeColor] = useState("#000000")
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [isErasing, setIsErasing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        setContext(ctx)
      }
    }
  }, [])

  useImperativeHandle(ref, () => ({
    exportCanvas: () => {
      if (canvasRef.current) {
        return canvasRef.current.toDataURL("image/png")
      }
      return null
    },
    clearCanvas: () => {
      clearCanvas()
    },
  }))

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!context) return

    setIsDrawing(true)
    const rect = canvasRef.current!.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    const x = clientX - rect.left
    const y = clientY - rect.top

    context.beginPath()
    context.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return

    const rect = canvasRef.current!.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    const x = clientX - rect.left
    const y = clientY - rect.top

    if (isErasing) {
      context.globalCompositeOperation = "destination-out"
      context.lineWidth = strokeWidth * 3
    } else {
      context.globalCompositeOperation = "source-over"
      context.strokeStyle = strokeColor
      context.lineWidth = strokeWidth
    }

    context.lineTo(x, y)
    context.stroke()
  }

  const stopDrawing = () => {
    if (!context) return
    setIsDrawing(false)
    context.beginPath()
  }

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    context.fillStyle = "white"
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  const undoLastStroke = () => {
    // Simple implementation - just clear for now
    // In a more complex implementation, you'd store drawing history
    clearCanvas()
  }

  return (
    <div className="space-y-2">
      {/* Canvas Controls */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Warna:</label>
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="w-8 h-8 rounded border"
            disabled={isErasing}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Ukuran:</label>
          <input
            type="range"
            min="1"
            max="10"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number.parseInt(e.target.value))}
            className="w-16"
          />
          <span className="text-sm w-4">{strokeWidth}</span>
        </div>

        <Button
          size="sm"
          variant={isErasing ? "default" : "outline"}
          onClick={() => setIsErasing(!isErasing)}
          className="flex items-center gap-1"
        >
          <Eraser className="h-4 w-4" />
          Hapus
        </Button>

        <Button size="sm" variant="outline" onClick={undoLastStroke} className="flex items-center gap-1 bg-transparent">
          <RotateCcw className="h-4 w-4" />
          Undo
        </Button>

        <Button size="sm" variant="outline" onClick={clearCanvas} className="flex items-center gap-1 bg-transparent">
          <Palette className="h-4 w-4" />
          Bersihkan
        </Button>
      </div>

      {/* Canvas */}
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="block cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <p className="text-xs text-gray-500 text-center">
        Gunakan mouse atau sentuh layar untuk menggambar. Klik "Ekspor PNG" untuk menyimpan hasil.
      </p>
    </div>
  )
})

GameCanvas.displayName = "GameCanvas"

export default GameCanvas
