"use client"

import { Header } from "@/components/header"
import { Leaderboard } from "@/components/leaderboard"

export default function LeaderboardPage() {
  const leaderboardUsers = [
    {
      rank: 1,
      name: "Алим Рефатович Рамазанов",
      attempts: 160,
      correctAnswers: 3282,
      status: "active",
      score: 3282,
    },
    {
      rank: 2,
      name: "Ruzimaxamat Aripjanovich Rejapov",
      attempts: 156,
      correctAnswers: 2757,
      status: "active",
      score: 2757,
    },
    {
      rank: 3,
      name: "Zulayho Shermamat qizi Maxmudova",
      attempts: 877,
      correctAnswers: 2033,
      status: "active",
      score: 2033,
    },
    {
      rank: 4,
      name: "Dildora Maqsud Rózimova",
      attempts: 160,
      correctAnswers: 1502,
      status: "idle",
      score: 1502,
      hasPhoto: true,
    },
    {
      rank: 5,
      name: "Одина Рахмоновна Якубова",
      attempts: 298,
      correctAnswers: 1393,
      status: "active",
      score: 1393,
    },
    {
      rank: 6,
      name: "Таджиддин Хакимович Хакимов",
      attempts: 245,
      correctAnswers: 1250,
      status: "active",
      score: 1250,
    },
    {
      rank: 7,
      name: "Салима Абдуллаевна Ахмедова",
      attempts: 189,
      correctAnswers: 1120,
      status: "idle",
      score: 1120,
    },
    {
      rank: 8,
      name: "Махмуд Рашидович Рахимов",
      attempts: 234,
      correctAnswers: 995,
      status: "active",
      score: 995,
    },
    {
      rank: 9,
      name: "Фарида Ильдаровна Сафина",
      attempts: 156,
      correctAnswers: 890,
      status: "active",
      score: 890,
    },
    {
      rank: 10,
      name: "Вазир Камилович Камилов",
      attempts: 143,
      correctAnswers: 756,
      status: "idle",
      score: 756,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="mx-auto max-w-4xl px-4 md:px-6 py-6 md:py-8 pb-20 md:pb-6">
        <Leaderboard users={leaderboardUsers} />
      </div>
    </div>
  )
}
