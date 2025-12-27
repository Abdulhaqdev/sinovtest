"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, RotateCcw, Home, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { AnimatedParticles } from "@/components/animated-particles"
import { use } from "react"

type QuestionResult = {
  question_id: number
  is_correct: boolean
}

type SubjectResult = {
  subject_id: number
  subject_name: string
  questions: QuestionResult[]
}

type BlockResult = {
  block_id: number
  block_name: string
  time_block: number
  ball_block: number
  subjects: SubjectResult[]
  questions_count: number
  correct_answers: number
  score: number
}

type TestResult = {
  status: string
  test_id: number
  test_name: string
  total_questions: number
  total_correct: number
  total_wrong: number
  total_score: number
  blocks: BlockResult[]
}

export default function TestResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const searchParams = useSearchParams()
  const router = useRouter()

  const [expandedBlocks, setExpandedBlocks] = useState<Record<number, boolean>>({})
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({})

  const resultsData = searchParams.get("data")
  let results: TestResult | null = null

  try {
    if (resultsData) {
      results = JSON.parse(decodeURIComponent(resultsData))
    }
  } catch (error) {
    console.error("Failed to parse results:", error)
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-red-600 dark:text-red-400">Natijalar topilmadi</p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Bosh sahifaga qaytish
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const toggleBlock = (blockId: number) => {
    setExpandedBlocks((prev) => ({ ...prev, [blockId]: !prev[blockId] }))
  }

  const toggleSubject = (key: string) => {
    setExpandedSubjects((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const percentage = ((results.total_correct / results.total_questions) * 100).toFixed(1)
  const testId = resolvedParams.id || results.test_id.toString()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section with Animated Background */}
      <div className="relative min-h-[600px] bg-white dark:bg-gray-950 overflow-hidden">
        <AnimatedParticles />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Tabriklayimiz sinoyni tugatdingiz!
          </h1>

          {/* Central Score Display */}
          <div className="mb-12">
            <div className="flex flex-col items-center justify-center">
              <div className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">
                {results.total_score.toFixed(0)}
              </div>
              <div className="text-lg md:text-xl text-gray-600 dark:text-gray-400">ball</div>
            </div>
          </div>

          {/* Time Info */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
              <Clock className="h-5 w-5" />
              <span>Sarflangan vaqt</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {Math.floor(results.blocks.reduce((acc, b) => acc + b.time_block, 0) / 60)}:
              {String(results.blocks.reduce((acc, b) => acc + b.time_block, 0) % 60).padStart(2, "0")}:05 daqiqada
            </div>
          </div>

          {/* Three Stat Circles */}
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            <div className="flex flex-col items-center">
              <div className="relative h-24 w-24 md:h-32 md:w-32 mb-4">
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray={`${(results.total_correct / results.total_questions) * 339.3} 339.3`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
                    {results.total_correct}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">To'g'ri javoblar</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative h-24 w-24 md:h-32 md:w-32 mb-4">
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="8"
                    strokeDasharray={`${(results.total_wrong / results.total_questions) * 339.3} 339.3`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-bold text-red-600 dark:text-red-400">
                    {results.total_wrong}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Noto'g'ri javoblar</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative h-24 w-24 md:h-32 md:w-32 mb-4">
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#1f2937"
                    strokeWidth="8"
                    strokeDasharray={`${(Number(percentage) / 100) * 339.3} 339.3`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{percentage}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Umumiy natija</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Details Section */}
      <div className="mx-auto max-w-4xl px-4 md:px-6 py-12">
        {/* Test Name Header */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{results.test_name}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{results.total_questions} ta savol</p>

        {/* Blocks */}
        <div className="space-y-4">
          {results.blocks.map((block) => {
            const blockPercentage = ((block.correct_answers / block.questions_count) * 100).toFixed(1)
            const isExpanded = expandedBlocks[block.block_id]

            return (
              <div
                key={block.block_id}
                className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  onClick={() => toggleBlock(block.block_id)}
                >
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{block.block_name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{block.questions_count} ta savol</span>
                      <span>{block.ball_block} ball/savol</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{block.score.toFixed(1)}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {block.correct_answers}/{block.questions_count}
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900/50">
                    <div className="space-y-3">
                      {block.subjects.map((subject) => {
                        const subjectKey = `${block.block_id}-${subject.subject_id}`
                        const isSubjectExpanded = expandedSubjects[subjectKey]
                        const correctCount = subject.questions.filter((q) => q.is_correct).length

                        return (
                          <div key={subjectKey}>
                            <button
                              onClick={() => toggleSubject(subjectKey)}
                              className="w-full flex items-center justify-between p-3 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <h4 className="font-medium text-gray-900 dark:text-white">{subject.subject_name}</h4>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-xs",
                                    correctCount >= subject.questions.length * 0.7
                                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-300 dark:border-green-700"
                                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border-red-300 dark:border-red-700"
                                  )}
                                >
                                  {correctCount}/{subject.questions.length}
                                </Badge>
                              </div>
                              {isSubjectExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </button>

                            {isSubjectExpanded && (
                              <div className="mt-3 grid grid-cols-6 sm:grid-cols-8 gap-2 ml-3">
                                {subject.questions.map((question, index) => (
                                  <div
                                    key={question.question_id}
                                    className={cn(
                                      "flex h-10 w-10 items-center justify-center rounded border-2 text-sm font-semibold",
                                      question.is_correct
                                        ? "border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300"
                                        : "border-red-500 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300"
                                    )}
                                  >
                                    {index + 1}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="gap-2 w-full sm:w-auto" onClick={() => router.push(`/test/${testId}`)}>
            <RotateCcw className="h-4 w-4" />
            Qayta topshirish
          </Button>
          <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto bg-transparent" asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Bosh sahifaga qaytish
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}