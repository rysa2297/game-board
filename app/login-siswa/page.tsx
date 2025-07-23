"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, User, School } from "lucide-react"
import Link from "next/link"

interface Guru {
  id: number
  nama: string
  sekolah: string
}

export default function LoginSiswaPage() {
  const [nama, setNama] = useState("")
  const [kelas, setKelas] = useState("")
  const [guruId, setGuruId] = useState("")
  const [guruList, setGuruList] = useState<Guru[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchGuruList()
  }, [])

  const fetchGuruList = async () => {
    try {
      const response = await fetch("/api/guru/list")
      if (response.ok) {
        const data = await response.json()
        setGuruList(data.guru)
      }
    } catch (error) {
      console.error("Error fetching guru list:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nama || !kelas || !guruId) {
      setError("Semua field harus diisi")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama,
          kelas,
          guru_id: Number.parseInt(guruId),
          role: "siswa",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user))
        router.push("/game")
      } else {
        setError(data.error || "Login gagal")
      }
    } catch (error) {
      setError("Terjadi kesalahan saat login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <User className="h-6 w-6 text-blue-600" />
              Login Siswa
            </CardTitle>
            <CardDescription>Masukkan data diri untuk mulai bermain</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input
                  id="nama"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div>
                <Label htmlFor="kelas">Kelas</Label>
                <Input
                  id="kelas"
                  type="text"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  placeholder="Contoh: X IPA 1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="guru">Pilih Guru</Label>
                <Select value={guruId} onValueChange={setGuruId} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih nama guru" />
                  </SelectTrigger>
                  <SelectContent>
                    {guruList.map((guru) => (
                      <SelectItem key={guru.id} value={guru.id.toString()}>
                        <div className="flex items-center gap-2">
                          <School className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{guru.nama}</div>
                            <div className="text-sm text-gray-500">{guru.sekolah}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

              <Button type="submit" className="w-full game-button" disabled={loading}>
                {loading ? "Memproses..." : "Mulai Bermain"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Informasi Game</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Durasi maksimal: 30 menit</li>
              <li>• Minimal 15 soal untuk menyelesaikan game</li>
              <li>• Gunakan canvas untuk coret-coret</li>
              <li>• Skor: SPLDV (+10/-5), MatDas (+5/-3)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
