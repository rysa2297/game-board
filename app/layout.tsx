import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SPLDV Game - Belajar Matematika dengan Menyenangkan",
  description: "Game edukasi untuk belajar Sistem Persamaan Linear Dua Variabel (SPLDV) dengan cara yang menyenangkan",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
