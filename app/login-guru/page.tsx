"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, GraduationCap, School, Lock } from "lucide-react"
import Link from "next/link"

export default function LoginGuruPage() {
  const [nama, setNama] = useState("")
  const [sekolah, setSekolah] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nama || !sekolah || !password) {
      setError("Semua field harus diisi")
      return
    }

    if (password !== "matematika") {
      setError("Password salah")
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
          sekolah,
          password,
          role: "guru",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user))
        router.push("/dashboard-guru")
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
              <GraduationCap className="h-6 w-6 text-purple-600" />
              Login Guru
            </CardTitle>
            <CardDescription>Masuk untuk mengelola soal dan melihat progress siswa</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nama">Nama Guru</Label>
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
                <Label htmlFor="sekolah">Nama Sekolah</Label>
                <div className="relative">
                  <School className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="sekolah"
                    type="text"
                    value={sekolah}
                    onChange={(e) => setSekolah(e.target.value)}
                    placeholder="Contoh: SMA Negeri 1 Jakarta"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password default: matematika"
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Password default: <code className="bg-gray-100 px-1 rounded">matematika</code>
                </p>
              </div>

              {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

              <Button type="submit" className="w-full game-button" disabled={loading}>
                {loading ? "Memproses..." : "Masuk Dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Fitur Dashboard Guru</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Tambah dan kelola soal custom</li>
              <li>• Lihat progress dan skor siswa</li>
              <li>• Analisis waktu pengerjaan</li>
              <li>• Download hasil canvas siswa</li>
              <li>• Kelola bank soal otomatis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
