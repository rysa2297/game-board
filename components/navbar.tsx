"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Home, BookOpen, Trophy, Info, LogOut, Gamepad, HelpCircle, BarChart2, Menu, User } from "lucide-react"

interface NavbarUser {
  id: number
  nama: string
  kelas?: string
  sekolah?: string
  role: string
}

export default function Navbar() {
  const [user, setUser] = useState<NavbarUser | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/materi", label: "Materi SPLDV", icon: BookOpen },
    { href: "/cara-bermain", label: "Cara Bermain", icon: HelpCircle },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/about", label: "Tentang", icon: Info },
  ]

  const userNavItems =
    user?.role === "siswa"
      ? [{ href: "/game", label: "Main Game", icon: Gamepad }]
      : user?.role === "guru"
        ? [{ href: "/dashboard-guru", label: "Dashboard", icon: BarChart2 }]
        : []

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <Gamepad className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SPLDV Game
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Belajar Matematika Seru</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center gap-2 ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "hover:bg-blue-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}

            {userNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center gap-2 ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "hover:bg-blue-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.nama}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium">{user.nama}</div>
                    <div className="text-gray-500">{user.role === "siswa" ? user.kelas : user.sekolah}</div>
                  </div>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/login-siswa">
                  <Button size="sm" variant="outline">
                    Login Siswa
                  </Button>
                </Link>
                <Link href="/login-guru">
                  <Button size="sm" className="game-button">
                    Login Guru
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                  {userNavItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                  {!user && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/login-siswa" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Login Siswa
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/login-guru" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Login Guru
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
