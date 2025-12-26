"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const savedTheme = localStorage.getItem("app-theme") || "light"
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const theme = savedTheme === "system" ? (prefersDark ? "dark" : "light") : savedTheme

    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}

export function useTheme() {
  const [rawTheme, setRawTheme] = useState<string>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("app-theme") || "light"
    setRawTheme(savedTheme)

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const resolvedTheme = savedTheme === "system" ? (prefersDark ? "dark" : "light") : savedTheme

    // Apply theme to document
    if (resolvedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Listen for storage changes (theme changes in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "app-theme") {
        const newTheme = e.newValue || "light"
        setRawTheme(newTheme)
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const resolvedTheme = newTheme === "system" ? (prefersDark ? "dark" : "light") : newTheme
        if (resolvedTheme === "dark") {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemThemeChange = () => {
      const currentTheme = localStorage.getItem("app-theme") || "light"
      if (currentTheme === "system") {
        const prefersDark = mediaQuery.matches
        if (prefersDark) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange)
    window.addEventListener("storage", handleStorageChange)
    
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      mediaQuery.removeEventListener("change", handleSystemThemeChange)
    }
  }, [])

  const setTheme = (newTheme: string) => {
    setRawTheme(newTheme)
    localStorage.setItem("app-theme", newTheme)

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const resolvedTheme = newTheme === "system" ? (prefersDark ? "dark" : "light") : newTheme

    if (resolvedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Resolve theme for components
  const prefersDark = typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches : false
  const resolvedTheme = rawTheme === "system" ? (prefersDark ? "dark" : "light") : rawTheme

  return { theme: mounted ? resolvedTheme : "light", setTheme, rawTheme: mounted ? rawTheme : "light" }
}
