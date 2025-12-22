"use client"
import { Suspense } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckIcon, ClipboardList, BookOpen, Info, Moon, Sun, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authUtils } from "@/lib/auth-api"

function HeaderContent() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsLoggedIn(authUtils.isAuthenticated())
  }, [])

  const handleLogout = () => {
    authUtils.logout()
    setIsLoggedIn(false)
    router.push("/login")
    router.refresh()
  }

  const isActive = (path: string) =>
    pathname === path ? "text-primary" : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"

  return (
    <>
      {/* Top Header */}
      <header className="border-b border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800">
        <div className="mx-auto flex h-16 md:h-24 max-w-[1400px] items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <div className="flex h-10 md:h-12 w-10 md:w-12 items-center justify-center rounded-xl bg-gray-300 dark:bg-gray-700">
              <CheckIcon className="h-6 md:h-7 text-white" strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Sinov</h1>
              <p className="hidden md:block text-sm text-gray-600 dark:text-gray-400">test</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Testlar
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Biz haqimizda
            </Link>
            <Link
              href="/leaderboard"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Peshqadamlar
            </Link>
            {!isLoggedIn && (
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-gray-900 dark:hover:text-white"
              >
                Kirish
              </Link>
            )}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="h-6 w-6 text-yellow-500" />
                ) : (
                  <Moon className="h-6 w-6 text-gray-600" />
                )}
              </button>
            )}

            {/* User Avatar - only show if logged in */}
            {isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none">
                    <Avatar className="h-10 md:h-12 w-10 md:w-12 cursor-pointer bg-gray-300 dark:bg-gray-700 transition-opacity hover:opacity-80">
                      <AvatarFallback className="bg-gray-300 dark:bg-gray-700">
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    Chiqish
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 md:hidden">
        <div className={`grid h-16 ${isLoggedIn ? 'grid-cols-5' : 'grid-cols-5'}`}>
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${isActive("/")}`}
          >
            <ClipboardList className="h-6 w-6" />
            <span className="text-xs">Testlar</span>
          </Link>
          <Link
            href="/blog"
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${isActive("/blog")}`}
          >
            <BookOpen className="h-6 w-6" />
            <span className="text-xs">Blog</span>
          </Link>
          <Link
            href="/leaderboard"
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${isActive("/leaderboard")}`}
          >
            <ClipboardList className="h-6 w-6" />
            <span className="text-xs">Peshqa.</span>
          </Link>
          <Link
            href="/about"
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${isActive("/about")}`}
          >
            <Info className="h-6 w-6" />
            <span className="text-xs">Haqimizda</span>
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center gap-1 transition-colors text-red-600 dark:text-red-400"
            >
              <LogOut className="h-6 w-6" />
              <span className="text-xs">Chiqish</span>
            </button>
          ) : (
            <Link
              href="/login"
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${isActive("/login")}`}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="text-xs">Kirish</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  )
}

export function Header() {
  return (
    <Suspense
      fallback={
        <header className="border-b border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800">
          <div className="mx-auto flex h-16 md:h-24 max-w-[1400px] items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex h-10 md:h-12 w-10 md:w-12 items-center justify-center rounded-xl bg-gray-300 dark:bg-gray-700">
                <CheckIcon className="h-6 md:h-7 text-white" strokeWidth={3} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Sinov</h1>
                <p className="hidden md:block text-sm text-gray-600 dark:text-gray-400">test</p>
              </div>
            </div>
          </div>
        </header>
      }
    >
      <HeaderContent />
    </Suspense>
  )
}