"use client"

import { Header } from "@/components/header"
import { Leaderboard } from "@/components/leaderboard"
import { useLeaderboard } from "@/hooks/use-my-results"

import { Loader2 } from "lucide-react"

export default function LeaderboardPage() {
  const { data, isLoading, error } = useLeaderboard()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-red-600 dark:text-red-400">
              Ma'lumotlarni yuklashda xatolik yuz berdi
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="mx-auto max-w-4xl px-4 md:px-6 py-6 md:py-8 pb-20 md:pb-6">
        <Leaderboard users={data.top_10} totalUsers={data.total_users} myRank={data.my_rank} />
      </div>
    </div>
  )
}