import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Award, Flame } from "lucide-react"

interface LeaderboardUser {
  rank: number
  name: string
  attempts: number
  correctAnswers: number
  status?: "active" | "idle"
  score?: number
  hasPhoto?: boolean
}

interface LeaderboardProps {
  users: LeaderboardUser[]
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

export function Leaderboard({ users }: LeaderboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Peshqadamlar jadvali</h1>
        <p className="text-gray-600 dark:text-gray-400">{users.length} eng yaxshi o'quvchilar</p>
      </div>

      {/* Leaderboard Container */}
      <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="col-span-1 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Rank</div>
          <div className="col-span-5 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Ism</div>
          <div className="col-span-2 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase text-center">
            Sinovlar
          </div>
          <div className="col-span-2 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase text-center">
            To'g'ri
          </div>
          <div className="col-span-2 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase text-right">Ball</div>
        </div>

        {/* Leaderboard Items */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user, index) => {
            const medalEmoji = getMedalEmoji(user.rank)
            const isTopThree = user.rank <= 3

            return (
              <div
                key={user.rank}
                className={`grid md:grid-cols-12 gap-4 px-4 md:px-6 py-4 transition-colors ${
                  isTopThree
                    ? "bg-gradient-to-r from-blue-50 to-blue-50 dark:from-blue-950/20 dark:to-blue-900/20 border-l-4 border-blue-400"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                {/* Rank */}
                <div className="col-span-1 flex items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full font-bold text-white ${
                      isTopThree
                        ? `bg-gradient-to-br ${rankColors[user.rank as keyof typeof rankColors]}`
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    {medalEmoji ? <span className="text-lg">{medalEmoji}</span> : user.rank}
                  </div>
                </div>

                {/* User Info */}
                <div className="col-span-4 md:col-span-5 flex items-center gap-3 min-w-0">
                  <Avatar className="h-10 w-10 flex-shrink-0 bg-gray-300 dark:bg-gray-600">
                    {user.hasPhoto ? (
                      <AvatarImage src="/placeholder.svg?height=48&width=48" alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600">
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white truncate">
                      {user.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          user.status === "active"
                            ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                            : "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600"
                        }`}
                      >
                        {user.status === "active" ? (
                          <span className="flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            Faol
                          </span>
                        ) : (
                          "Oyin yo'q"
                        )}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Attempts */}
                <div className="col-span-2 flex items-center md:justify-center">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{user.attempts}</span>
                </div>

                {/* Correct Answers */}
                <div className="col-span-2 flex items-center md:justify-center">
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{user.correctAnswers}</span>
                  </div>
                </div>

                {/* Score */}
                <div className="col-span-3 md:col-span-2 flex items-center md:justify-end">
                  <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <span className="text-sm font-bold text-blue-700 dark:text-blue-400">{user.score}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Jami foydalanuvchilar</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Jami sinovlar</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {users.reduce((acc, u) => acc + u.attempts, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">O'rtacha ball</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(users.reduce((acc, u) => acc + (u.score || 0), 0) / users.length)}
          </p>
        </div>
      </div>
    </div>
  )
}
