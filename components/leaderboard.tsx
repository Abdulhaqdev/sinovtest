import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Award, Crown } from "lucide-react"
import type { LeaderboardUser } from "@/lib/leaderboard-api"

interface LeaderboardProps {
  users: LeaderboardUser[]
  totalUsers: number
  myRank?: LeaderboardUser
}

const rankColors = {
  1: "from-yellow-400 to-yellow-500",
  2: "from-gray-300 to-gray-400",
  3: "from-orange-400 to-orange-500",
}

const getMedalEmoji = (rank: number) => {
  if (rank === 1) return "🥇"
  if (rank === 2) return "🥈"
  if (rank === 3) return "🥉"
  return null
}

export function Leaderboard({ users, totalUsers, myRank }: LeaderboardProps) {
  const totalTests = users.reduce((acc, u) => acc + u.tests_count, 0)
  const totalCorrect = users.reduce((acc, u) => acc + u.correct_answers, 0)
  const avgScore = users.length > 0 
    ? users.reduce((acc, u) => acc + parseFloat(u.total_score), 0) / users.length 
    : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Peshqadamlar jadvali
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Top {users.length} eng yaxshi o'quvchilar
        </p>
      </div>

      {/* My Rank Card (if not in top 10) */}
      {myRank && !users.find((u) => u.user_id === myRank.user_id) && (
        <div className="rounded-2xl bg-linear-to-r from-blue-500 to-blue-600 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm font-bold text-xl">
                {myRank.rank}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{myRank.full_name}</h3>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Crown className="h-3 w-3 mr-1" />
                    Sizning o'rningiz
                  </Badge>
                </div>
                <p className="text-sm text-white/80 mt-1">
                  {myRank.tests_count} ta sinov • {myRank.correct_answers} ta to'g'ri
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{parseFloat(myRank.total_score).toFixed(1)}</div>
              <div className="text-sm text-white/80">ball</div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Container */}
      <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 bg-linear-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="col-span-1 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
            Rank
          </div>
          <div className="col-span-5 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
            Ism
          </div>
          <div className="col-span-2 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase text-center">
            Sinovlar
          </div>
          <div className="col-span-2 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase text-center">
            To'g'ri
          </div>
          <div className="col-span-2 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase text-right">
            Ball
          </div>
        </div>

        {/* Leaderboard Items */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => {
            const medalEmoji = getMedalEmoji(user.rank)
            const isTopThree = user.rank <= 3
            const score = parseFloat(user.total_score)
            const initials = user.full_name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)

            return (
              <div
                key={user.user_id}
                className={`grid md:grid-cols-12 gap-4 px-4 md:px-6 py-4 transition-colors ${
                  user.is_me
                    ? "bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-l-4 border-blue-500"
                    : isTopThree
                      ? "bg-linear-to-r from-yellow-50/50 to-orange-50/50 dark:from-yellow-950/10 dark:to-orange-950/10 border-l-4 border-yellow-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                {/* Rank */}
                <div className="col-span-1 flex items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full font-bold text-white ${
                      isTopThree
                        ? `bg-linear-to-br ${rankColors[user.rank as keyof typeof rankColors]}`
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    {medalEmoji ? <span className="text-lg">{medalEmoji}</span> : user.rank}
                  </div>
                </div>

                {/* User Info */}
                <div className="col-span-4 md:col-span-5 flex items-center gap-3 min-w-0">
                  <Avatar className="h-10 w-10 shrink-0 bg-linear-to-br from-blue-400 to-blue-600">
                    <AvatarFallback className="bg-linear-to-br from-blue-400 to-blue-600 text-white font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white truncate">
                        {user.full_name}
                      </h3>
                      {user.is_me && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                        >
                          Siz
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tests Count */}
                <div className="col-span-2 flex items-center md:justify-center">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.tests_count}
                  </span>
                </div>

                {/* Correct Answers */}
                <div className="col-span-2 flex items-center md:justify-center">
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.correct_answers}
                    </span>
                  </div>
                </div>

                {/* Score */}
                <div className="col-span-3 md:col-span-2 flex items-center md:justify-end">
                  <div
                    className={`px-3 py-1 rounded-lg ${
                      user.is_me
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : isTopThree
                          ? "bg-yellow-100 dark:bg-yellow-900/30"
                          : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    <span
                      className={`text-sm font-bold ${
                        user.is_me
                          ? "text-blue-700 dark:text-blue-400"
                          : isTopThree
                            ? "text-yellow-700 dark:text-yellow-400"
                            : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {score.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Jami foydalanuvchilar</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalUsers}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Jami sinovlar</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalTests}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">O'rtacha ball</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgScore.toFixed(1)}</p>
        </div>
      </div>
    </div>
  )
}