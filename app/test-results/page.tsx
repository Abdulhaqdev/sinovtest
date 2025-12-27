"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  Clock, 
  BarChart3,
  Home,
  RefreshCw,
  Share2,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { use, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

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

function TestResultsContent({ testId }: { testId: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [expandedBlocks, setExpandedBlocks] = useState<Record<number, boolean>>({})
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({})

  // Parse results from URL or show error
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
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 dark:text-red-400">Natijalar topilmadi</p>
          <Button
            onClick={() => router.push("/")}
            className="mt-4"
          >
            Bosh sahifaga qaytish
          </Button>
        </div>
      </div>
    )
  }

  const toggleBlock = (blockId: number) => {
    setExpandedBlocks(prev => ({ ...prev, [blockId]: !prev[blockId] }))
  }

  const toggleSubject = (key: string) => {
    setExpandedSubjects(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const percentage = ((results.total_correct / results.total_questions) * 100).toFixed(1)
  const isGoodScore = Number(percentage) >= 70
  const isMediumScore = Number(percentage) >= 50 && Number(percentage) < 70

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Test natijalari
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{results.test_name}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 rounded-full">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Ulashish</span>
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-full"
              onClick={() => router.push(`/test/${testId}`)}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Qayta topshirish</span>
            </Button>
          </div>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-6 overflow-hidden">
          <div className={cn(
            "p-6 md:p-8",
            isGoodScore && "bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950",
            isMediumScore && "bg-linear-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950",
            !isGoodScore && !isMediumScore && "bg-linear-to-br from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950"
          )}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full",
                  isGoodScore && "bg-green-100 dark:bg-green-900",
                  isMediumScore && "bg-yellow-100 dark:bg-yellow-900",
                  !isGoodScore && !isMediumScore && "bg-red-100 dark:bg-red-900"
                )}>
                  <Award className={cn(
                    "h-8 w-8 md:h-10 md:w-10",
                    isGoodScore && "text-green-600 dark:text-green-400",
                    isMediumScore && "text-yellow-600 dark:text-yellow-400",
                    !isGoodScore && !isMediumScore && "text-red-600 dark:text-red-400"
                  )} />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    {results.total_score.toFixed(1)} ball
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
                    {results.total_questions} savoldan {results.total_correct} ta to'g'ri ({percentage}%)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 md:gap-6 w-full md:w-auto">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {results.total_correct}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">To'g'ri</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {results.total_wrong}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Noto'g'ri</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {percentage}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Natija</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Blocks Details */}
        <div className="space-y-4">
          {results.blocks.map((block) => {
            const blockPercentage = ((block.correct_answers / block.questions_count) * 100).toFixed(1)
            const isExpanded = expandedBlocks[block.block_id]

            return (
              <Card key={block.block_id}>
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  onClick={() => toggleBlock(block.block_id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div>
                        <CardTitle className="text-lg md:text-xl">{block.block_name}</CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {block.time_block} daqiqa
                          </div>
                          <div>
                            {block.questions_count} ta savol
                          </div>
                          <div>
                            {block.ball_block} ball/savol
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {block.score.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {block.correct_answers}/{block.questions_count} ({blockPercentage}%)
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {block.subjects.map((subject) => {
                        const subjectKey = `${block.block_id}-${subject.subject_id}`
                        const isSubjectExpanded = expandedSubjects[subjectKey]
                        const correctCount = subject.questions.filter(q => q.is_correct).length
                        const subjectPercentage = ((correctCount / subject.questions.length) * 100).toFixed(1)

                        return (
                          <div key={subjectKey} className="border-t border-gray-200 dark:border-gray-800 pt-4 first:border-t-0 first:pt-0">
                            <button
                              onClick={() => toggleSubject(subjectKey)}
                              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {subject.subject_name}
                                </h4>
                                <Badge variant="outline" className={cn(
                                  "text-xs",
                                  Number(subjectPercentage) >= 70 && "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-300",
                                  Number(subjectPercentage) >= 50 && Number(subjectPercentage) < 70 && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-300",
                                  Number(subjectPercentage) < 50 && "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border-red-300"
                                )}>
                                  {correctCount}/{subject.questions.length} ({subjectPercentage}%)
                                </Badge>
                              </div>
                              {isSubjectExpanded ? (
                                <ChevronUp className="h-4 w-4 text-gray-400" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                              )}
                            </button>

                            {isSubjectExpanded && (
                              <div className="mt-3 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 px-3">
                                {subject.questions.map((question, index) => (
                                  <div
                                    key={question.question_id}
                                    className={cn(
                                      "flex h-10 w-10 items-center justify-center rounded-lg border-2 text-sm font-semibold",
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
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="gap-2 rounded-full w-full sm:w-auto"
            onClick={() => router.push(`/test/${testId}`)}
          >
            <RefreshCw className="h-4 w-4" />
            Qayta topshirish
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 rounded-full w-full sm:w-auto"
            asChild
          >
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

export default function TestResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const testId = resolvedParams.id

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <Suspense fallback={
        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">Yuklanmoqda...</p>
          </div>
        </div>
      }>
        <TestResultsContent testId={testId} />
      </Suspense>
    </div>
  )
}