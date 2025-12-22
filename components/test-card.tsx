import { Badge } from "@/components/ui/badge"
import { StarIcon, MessageCircleIcon, BookOpenIcon, LanguagesIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface TestCardProps {
  id: number
  title: string
  participants: number
  duration: number
  questions: number
  badge: string
  rating: number
  comments: number
  color: "mint" | "yellow" | "lime" | "peach" | "sage"
  icon: "book" | "language"
}

const colorClasses = {
  mint: "bg-[#D4F4E7]",
  yellow: "bg-[#F4F0D4]",
  lime: "bg-[#E8F4D4]",
  peach: "bg-[#F4E8D4]",
  sage: "bg-[#D4F4E0]",
}

export function TestCard({
  id,
  title,
  participants,
  duration,
  questions,
  badge,
  rating,
  comments,
  color,
  icon,
}: TestCardProps) {
  const Icon = icon === "book" ? BookOpenIcon : LanguagesIcon

  return (
    <Link href={`/test/${id}`}>
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl p-6 transition-shadow hover:shadow-md cursor-pointer",
          colorClasses[color],
        )}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <Icon className="h-5 w-5 text-gray-700" />
            </div>
            <span className="text-sm font-medium text-gray-700">Demo test</span>
          </div>
          <Badge
            variant="secondary"
            className="rounded-full bg-white px-4 py-1 text-sm font-medium text-gray-900 hover:bg-white"
          >
            Bepul
          </Badge>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-lg font-bold leading-tight text-gray-900">{title}</h3>

        {/* Stats */}
        <div className="mb-4 space-y-1 text-sm text-gray-700">
          <p>Ishtirokchi soni: {participants.toLocaleString()} ta</p>
          <p>Berilgan vaqt: {duration} minutes</p>
          <p>Savollar soni: {questions} ta</p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 text-sm text-gray-900">
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 2h4v4H2V2zm0 6h4v4H2V8zm6-6h4v4H8V2zm0 6h4v4H8V8z" />
            </svg>
            <span className="font-medium">{badge}</span>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="h-4 w-4 fill-gray-900" />
            <span className="font-medium">{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircleIcon className="h-4 w-4" />
            <span className="font-medium">{comments}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
