import { Badge } from "@/components/ui/badge"
import { StarIcon, MessageCircleIcon, BookOpenIcon, ClockIcon, HelpCircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Test } from "@/lib/test-api"

interface TestCardProps extends Test {
  color?: "mint" | "yellow" | "lime" | "peach" | "sage"
}

const colorClasses = {
  mint: "bg-[#D4F4E7] dark:bg-[#1a3a2e]",
  yellow: "bg-[#F4F0D4] dark:bg-[#3a3420]",
  lime: "bg-[#E8F4D4] dark:bg-[#2a3a20]",
  peach: "bg-[#F4E8D4] dark:bg-[#3a2e20]",
  sage: "bg-[#D4F4E0] dark:bg-[#203a2a]",
}

const difficultyLabels = {
  easy: "Oson",
  medium: "O'rta",
  hard: "Qiyin",
}

const difficultyColors = {
  easy: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  hard: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
}

export function TestCard({
  test_id,
  test_name,
  subject_name,
  is_payable,
  price,
  description,
  time,
  questions_count,
  difficulty,
  color = "mint",
}: TestCardProps) {
  // Random color if not provided
  const colors: Array<"mint" | "yellow" | "lime" | "peach" | "sage"> = ["mint", "yellow", "lime", "peach", "sage"]
  const cardColor = color || colors[test_id % colors.length]

  return (
    <Link href={`/test/${test_id}`}>
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl p-6 transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer",
          colorClasses[cardColor],
        )}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-gray-800">
              <BookOpenIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{subject_name}</span>
          </div>
          <Badge
            variant="secondary"
            className={cn(
              "rounded-full px-4 py-1 text-sm font-medium hover:bg-white dark:hover:bg-gray-800",
              is_payable 
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" 
                : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            )}
          >
            {is_payable ? `${price.toLocaleString()} so'm` : "Bepul"}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-lg font-bold leading-tight text-gray-900 dark:text-white line-clamp-2">
          {test_name}
        </h3>

        {/* Description */}
        {description && (
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        )}

        {/* Stats */}
        <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
          {time > 0 && (
            <div className="flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4" />
              <span>{time} daqiqa</span>
            </div>
          )}
          {questions_count > 0 && (
            <div className="flex items-center gap-1.5">
              <HelpCircleIcon className="h-4 w-4" />
              <span>{questions_count} ta savol</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium border-0",
              difficultyColors[difficulty]
            )}
          >
            {difficultyLabels[difficulty]}
          </Badge>
        </div>
      </div>
    </Link>
  )
}