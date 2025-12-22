"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Link from "next/link"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Register attempt:", { email, password, fullName })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-sm border border-gray-200 dark:border-gray-800">
            <h1 className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white">Ro'yxatdan o'tish</h1>
            <p className="mb-8 text-center text-sm text-gray-600 dark:text-gray-400">
              Yangi akkaunt yaratish uchun ma'lumotlaringizni kiriting
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-gray-700 dark:text-gray-300">
                  To'liq ism
                </Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Sizning ismingiz"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-12 rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                  Parol
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-gray-700 dark:text-gray-300">
                  Parolni tasdiqlang
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="h-4 w-4 rounded mt-1" required />
                <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                  Men{" "}
                  <Link href="#" className="text-gray-900 dark:text-white hover:underline font-semibold">
                    shartlar va sharoitlarga
                  </Link>{" "}
                  roziman
                </label>
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-gray-800 dark:bg-white text-base font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200"
              >
                Ro'yxatdan o'tish
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Sizda akkaunt bormi?{" "}
              <Link href="/login" className="font-semibold text-gray-900 dark:text-white hover:underline">
                Kirish
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
