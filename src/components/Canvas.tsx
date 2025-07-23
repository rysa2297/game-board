'use client';

import { useRef, useEffect, useState } from 'react';
import { Eraser, Undo, Download, Trash2 } from 'lucide-react';

interface CanvasProps {
  onExport: (imageData: string) => void;
  width?: number;
  height?: number;
}

export default function Canvas({ onExport, width = 600, height = 300 }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        
        // Set white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        setContext(ctx);
        saveToHistory(ctx);
      }
    }
  }, [width, height]);

  const saveToHistory = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const newHistory = history.slice(0, currentStep + 1);
      newHistory.push(imageData);
      setHistory(newHistory);
      setCurrentStep(newHistory.length - 1);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      context.beginPath();
      context.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing && context) {
      setIsDrawing(false);
      context.beginPath();
      saveToHistory(context);
    }
  };

  // Touch events for mobile
  const startDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!context) return;
    
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      context.beginPath();
      context.moveTo(x, y);
    }
  };

  const drawTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing || !context) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const stopDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (isDrawing && context) {
      setIsDrawing(false);
      context.beginPath();
      saveToHistory(context);
    }
  };

  const clearCanvas = () => {
    if (!context) return;
    
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
    saveToHistory(context);
  };

  const undo = () => {
    if (currentStep > 0 && context) {
      const canvas = canvasRef.current;
      if (canvas) {
        const previousStep = currentStep - 1;
        const imageData = history[previousStep];
        context.putImageData(imageData, 0, 0);
        setCurrentStep(previousStep);
      }
    }
  };

  const exportCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const imageData = canvas.toDataURL('image/png');
      onExport(imageData);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Canvas Coret-coret</h3>
        <div className="flex space-x-2">
          <button
            onClick={undo}
            disabled={currentStep <= 0}
            className="flex items-center space-x-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Undo className="w-4 h-4" />
            <span>Undo</span>
          </button>
          <button
            onClick={clearCanvas}
            className="flex items-center space-x-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
          <button
            onClick={exportCanvas}
            className="flex items-center space-x-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export PNG</span>
          </button>
        </div>
      </div>
      
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-200 rounded cursor-crosshair touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawingTouch}
        onTouchMove={drawTouch}
        onTouchEnd={stopDrawingTouch}
        style={{ touchAction: 'none' }}
      />
      
      <p className="text-xs text-gray-500 mt-2">
        Gunakan mouse atau sentuh layar untuk menggambar. Klik "Export PNG" untuk menyimpan hasil coretan.
      </p>
    </div>
  );
}

