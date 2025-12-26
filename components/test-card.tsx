import { Badge } from "@/components/ui/badge"
import { ClockIcon, HelpCircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { Test } from "@/lib/test-api"
import Image from "next/image"

interface TestCardProps extends Test {}

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
  block_id,
  subject_id,
  subject_name,
  icon,
  category,
  backgroundColor,
  darkBackgroundColor,
  is_payable,
  price,
  description,
  time,
  questions_count,
  difficulty,
}: TestCardProps) {
  return (
    <Link href={`/test/${test_id}?block_id=${block_id}&subject_id=${subject_id}`}>
      <div
        className="relative overflow-hidden rounded-3xl p-6 transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer"
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        {/* Background Icon - Large decorative */}
        {icon && (
          <div className="absolute -right-8 -bottom-8 opacity-10 dark:opacity-20">
            <Image 
              src={icon} 
              alt={category}
              width={200}
              height={200}
              className="w-48 h-48 rotate-12"
            />
          </div>
        )}

        {/* Content - with relative positioning to stay above background */}
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {icon && (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <Image 
                    src={icon} 
                    alt={category}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </div>
              )}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {subject_name}
              </span>
            </div>
            <Badge
              variant="secondary"
              className={cn(
                "rounded-full px-4 py-1 text-sm font-medium backdrop-blur-sm",
                is_payable 
                  ? "bg-blue-100/80 text-blue-700 dark:bg-blue-900/80 dark:text-blue-300" 
                  : "bg-green-100/80 text-green-700 dark:bg-green-900/80 dark:text-green-300"
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
      </div>
    </Link>
  )
}