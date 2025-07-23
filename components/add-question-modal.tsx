"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Save } from "lucide-react"

interface AddQuestionModalProps {
  guruId?: number
  onQuestionAdded?: () => void
}

export function AddQuestionModal({ guruId, onQuestionAdded }: AddQuestionModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    category: "",
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_answer: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.category ||
      !formData.question ||
      !formData.option_a ||
      !formData.option_b ||
      !formData.option_c ||
      !formData.option_d ||
      !formData.correct_answer
    ) {
      setError("Semua field harus diisi")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/guru/questions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          time_limit: formData.category === "SPLDV" ? 60 : 20,
          created_by: guruId,
        }),
      })

      if (response.ok) {
        setOpen(false)
        setFormData({
          category: "",
          question: "",
          option_a: "",
          option_b: "",
          option_c: "",
          option_d: "",
          correct_answer: "",
        })
        onQuestionAdded?.()
      } else {
        const data = await response.json()
        setError(data.error || "Gagal menambah soal")
      }
    } catch (error) {
      setError("Terjadi kesalahan saat menambah soal")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tambah Soal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Soal Baru</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="category">Kategori Soal</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori soal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SPLDV">SPLDV (60 detik)</SelectItem>
                <SelectItem value="MatDas">MatDas (20 detik)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="question">Pertanyaan</Label>
            <Textarea
              id="question"
              value={formData.question}
              onChange={(e) => handleInputChange("question", e.target.value)}
              placeholder="Masukkan soal yang akan ditampilkan..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="option_a">Pilihan A</Label>
              <Input
                id="option_a"
                value={formData.option_a}
                onChange={(e) => handleInputChange("option_a", e.target.value)}
                placeholder="Pilihan jawaban A"
              />
            </div>

            <div>
              <Label htmlFor="option_b">Pilihan B</Label>
              <Input
                id="option_b"
                value={formData.option_b}
                onChange={(e) => handleInputChange("option_b", e.target.value)}
                placeholder="Pilihan jawaban B"
              />
            </div>

            <div>
              <Label htmlFor="option_c">Pilihan C</Label>
              <Input
                id="option_c"
                value={formData.option_c}
                onChange={(e) => handleInputChange("option_c", e.target.value)}
                placeholder="Pilihan jawaban C"
              />
            </div>

            <div>
              <Label htmlFor="option_d">Pilihan D</Label>
              <Input
                id="option_d"
                value={formData.option_d}
                onChange={(e) => handleInputChange("option_d", e.target.value)}
                placeholder="Pilihan jawaban D"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="correct_answer">Jawaban Benar</Label>
            <Select
              value={formData.correct_answer}
              onValueChange={(value) => handleInputChange("correct_answer", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih jawaban yang benar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="D">D</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 bg-transparent">
              Batal
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 flex items-center gap-2">
              <Save className="h-4 w-4" />
              {loading ? "Menyimpan..." : "Simpan Soal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
