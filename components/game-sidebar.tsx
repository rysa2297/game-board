"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Home, BookOpen, Trophy, PlayCircle, Info, LogOut, Gamepad, HelpCircle, BarChart2 } from "lucide-react"

interface GameSidebarUser {
  id: number
  nama: string
  kelas?: string
  sekolah?: string
  role: string
}

export default function GameSidebar() {
  const [user, setUser] = useState<GameSidebarUser | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const isActive = (path: string) => pathname === path

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="pb-2">
          <div className="flex items-center justify-center p-2">
            <div className="text-center">
              <h1 className="text-xl font-bold text-blue-600">SPLDV Game</h1>
              <p className="text-xs text-gray-500">Belajar Matematika Seru</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {user ? (
            <>
              <div className="px-3 py-2">
                <div className="flex items-center gap-2 mb-2 p-2 bg-blue-50 rounded-lg">
                  <Gamepad className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">{user.nama}</p>
                    <p className="text-xs text-gray-500">{user.role === "siswa" ? user.kelas : user.sekolah}</p>
                  </div>
                </div>
              </div>

              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/")}>
                    <Link href="/">
                      <Home className="h-4 w-4" />
                      <span>Beranda</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {user.role === "siswa" && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/game")}>
                        <Link href="/game">
                          <Gamepad className="h-4 w-4" />
                          <span>Main Game</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/leaderboard")}>
                        <Link href="/leaderboard">
                          <Trophy className="h-4 w-4" />
                          <span>Leaderboard</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}

                {user.role === "guru" && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard-guru")}>
                      <Link href="/dashboard-guru">
                        <BarChart2 className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/materi")}>
                    <Link href="/materi">
                      <BookOpen className="h-4 w-4" />
                      <span>Materi SPLDV</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/cara-bermain")}>
                    <Link href="/cara-bermain">
                      <HelpCircle className="h-4 w-4" />
                      <span>Cara Bermain</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/about")}>
                    <Link href="/about">
                      <Info className="h-4 w-4" />
                      <span>Tentang</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </>
          ) : (
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")}>
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span>Beranda</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/login-siswa")}>
                  <Link href="/login-siswa">
                    <Gamepad className="h-4 w-4" />
                    <span>Login Siswa</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/login-guru")}>
                  <Link href="/login-guru">
                    <Gamepad className="h-4 w-4" />
                    <span>Login Guru</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/materi")}>
                  <Link href="/materi">
                    <BookOpen className="h-4 w-4" />
                    <span>Materi SPLDV</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/cara-bermain")}>
                  <Link href="/cara-bermain">
                    <PlayCircle className="h-4 w-4" />
                    <span>Cara Bermain</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        </SidebarContent>

        <SidebarFooter>
          {user && (
            <div className="p-3">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 bg-transparent"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          )}
          <div className="p-3 text-center">
            <p className="text-xs text-gray-500">© 2023 SPLDV Game</p>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
