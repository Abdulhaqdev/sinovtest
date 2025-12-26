"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Clock, Pause, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { use, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useSearchParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { testApi, type Question } from "@/lib/test-api"
import Image from "next/image"

// Base URL for images
const IMAGE_BASE_URL = "https://v1.backend.sinovtest.uz"

// Helper function to get full image URL
const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return null
  if (imagePath.startsWith("http")) return imagePath
  return `${IMAGE_BASE_URL}${imagePath}`
}

export default function TakeTestPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const testId = Number.parseInt(resolvedParams.id)
  const blockId = Number.parseInt(searchParams.get("block_id") || "0")
  const subjectIds = searchParams.get("subject_ids")?.split(",").map(Number) || []

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showQuestionNav, setShowQuestionNav] = useState(false)

  const { data: testData, isLoading, error } = useQuery({
    queryKey: ["test", "questions", testId, blockId, subjectIds],
    queryFn: async () => {
      const response = await testApi.startTest({
        type_id: testId,
        block_id: blockId,
        subject_id: subjectIds,
      })
      return response
    },
    enabled: !!testId && !!blockId && subjectIds.length > 0,
  })

  // Use total_time from API response
  useEffect(() => {
    if (testData?.total_time) {
      setTimeRemaining(testData.total_time * 60)
    }
  }, [testData])

  // Timer
  useEffect(() => {
    if (isPaused || timeRemaining === 0) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleFinish()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPaused, timeRemaining])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Flatten all questions
  const allQuestions: Array<{ question: Question; blockName: string; subjectName: string }> = []
  testData?.blocks.forEach((block) => {
    block.subjects.forEach((subject) => {
      subject.questions.forEach((question) => {
        allQuestions.push({
          question,
          blockName: block.block_name,
          subjectName: subject.subject_name,
        })
      })
    })
  })

  const currentQuestionData = allQuestions[currentQuestion]

  const handleAnswerSelect = (answerId: number) => {
    if (currentQuestionData) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestionData.question.id]: answerId,
      }))
    }
  }

  const handleNext = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleFinish = () => {
    // TODO: Submit test results
    router.push(`/test/${testId}/results`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    )
  }

  if (error || !testData || allQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-red-600 dark:text-red-400">Xatolik yuz berdi</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {error instanceof Error ? error.message : "Savollarni yuklashda xatolik"}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const totalSeconds = testData.total_time * 60
  const isTimeWarning = timeRemaining <= totalSeconds * 0.1 && timeRemaining > 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Main Content */}
          <div className="flex-1 order-2 lg:order-1">
            {/* Header */}
            <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                  {currentQuestionData?.blockName}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {currentQuestionData?.subjectName} • Savol {currentQuestion + 1}/{allQuestions.length}
                </p>
              </div>
              <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-full bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4" />
                  E'tiroz
                </Button>
                <div className="flex items-center gap-2">
                  <Clock className={cn(
                    "h-4 w-4 md:h-5 md:w-5",
                    isTimeWarning 
                      ? "text-red-600 dark:text-red-400 animate-pulse" 
                      : "text-gray-600 dark:text-gray-400"
                  )} />
                  <div className="text-right">
                    <div className={cn(
                      "text-base md:text-xl font-bold",
                      isTimeWarning 
                        ? "text-red-600 dark:text-red-400" 
                        : "text-gray-900 dark:text-white"
                    )}>
                      {formatTime(timeRemaining)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Qolgan vaqt
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Warning Alert */}
            {isTimeWarning && (
              <div className="mb-4 rounded-lg border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 p-4">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm font-medium">
                    Diqqat! Vaqt tugash arafasida. Iltimos, javoblaringizni tekshiring.
                  </p>
                </div>
              </div>
            )}

            {/* Question Content */}
            <Card>
              <CardContent className="p-4 md:p-8">
                <div className="mb-4 md:mb-6">
                  <span className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                    {currentQuestion + 1}.
                  </span>
                  {currentQuestionData?.question.question_image && (
                    <div className="mt-4 mb-4">
                      <Image
                        src={getImageUrl(currentQuestionData.question.question_image) || ""}
                        alt="Question"
                        width={600}
                        height={400}
                        className="rounded-lg max-w-full h-auto"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="mt-3 md:mt-4 whitespace-pre-line text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {currentQuestionData?.question.question_text}
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3 md:space-y-4">
                  {currentQuestionData?.question.answers.map((answer, index) => (
                    <label
                      key={answer.id}
                      className={cn(
                        "flex cursor-pointer items-start gap-2 md:gap-3 rounded-xl border-2 p-3 md:p-4 transition-colors",
                        selectedAnswers[currentQuestionData.question.id] === answer.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-400"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      )}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestionData.question.id}`}
                        value={answer.id}
                        checked={selectedAnswers[currentQuestionData.question.id] === answer.id}
                        onChange={() => handleAnswerSelect(answer.id)}
                        className="mt-0.5 md:mt-1 h-4 w-4 md:h-5 md:w-5 cursor-pointer flex-shrink-0"
                      />
                      <div className="flex-1">
                        {answer.answer_image && (
                          <div className="mb-2">
                            <Image
                              src={getImageUrl(answer.answer_image) || ""}
                              alt={`Answer ${index + 1}`}
                              width={300}
                              height={200}
                              className="rounded-lg max-w-full h-auto"
                              unoptimized
                            />
                          </div>
                        )}
                        <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                          {answer.answer_text}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Navigation */}
                <div className="mt-6 md:mt-8 flex items-center justify-between gap-3">
                  <Button
                    variant="outline"
                    className="rounded-full px-6 md:px-8 text-sm md:text-base"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    Ortga
                  </Button>
                  {currentQuestion === allQuestions.length - 1 ? (
                    <Button
                      className="rounded-full bg-green-600 hover:bg-green-700 px-6 md:px-8 text-sm md:text-base"
                      onClick={handleFinish}
                    >
                      Yakunlash
                    </Button>
                  ) : (
                    <Button
                      className="rounded-full bg-gray-800 dark:bg-white px-6 md:px-8 text-sm md:text-base hover:bg-gray-700 dark:hover:bg-gray-200 text-white dark:text-gray-900"
                      onClick={handleNext}
                    >
                      Keyingi
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[380px] order-1 lg:order-2">
            <div className="lg:sticky lg:top-4 space-y-4">
              {/* Controls */}
              <Card>
                <CardContent className="p-3 md:p-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 gap-2 rounded-full text-xs md:text-sm"
                      onClick={() => setIsPaused(!isPaused)}
                    >
                      <Pause className="h-3 w-3 md:h-4 md:w-4" />
                      {isPaused ? "Davom ettirish" : "To'xtatish"}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-full text-xs md:text-sm"
                      onClick={handleFinish}
                    >
                      Yakunlash
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Questions Navigation */}
              <Card className="overflow-hidden">
                <button
                  onClick={() => setShowQuestionNav(!showQuestionNav)}
                  className="lg:hidden w-full flex items-center justify-between p-4 text-left font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <span>Savollar ro'yxati</span>
                  {showQuestionNav ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>

                <CardContent className={cn("p-4 md:p-6", "lg:block", showQuestionNav ? "block" : "hidden")}>
                  {testData.blocks.map((block) => (
                    <div key={block.block_id} className="mb-4 md:mb-6 last:mb-0">
                      <div className="mb-2 md:mb-3 rounded-full border-2 border-gray-200 dark:border-gray-700 px-3 md:px-4 py-1.5 md:py-2 text-center text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                        {block.block_name}
                      </div>
                      {block.subjects.map((subject) => {
                        return (
                          <div key={subject.subject_id} className="mb-4">
                            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                              {subject.subject_name}
                            </div>
                            <div className="grid grid-cols-6 gap-1.5 md:gap-2">
                              {subject.questions.map((question) => {
                                const questionIndex = allQuestions.findIndex((q) => q.question.id === question.id)
                                const isAnswered = !!selectedAnswers[question.id]
                                
                                return (
                                  <button
                                    key={question.id}
                                    onClick={() => {
                                      setCurrentQuestion(questionIndex)
                                      setShowQuestionNav(false)
                                    }}
                                    className={cn(
                                      "flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg border-2 text-xs md:text-sm font-semibold transition-colors",
                                      currentQuestion === questionIndex
                                        ? "border-gray-800 dark:border-white bg-gray-800 dark:bg-white text-white dark:text-gray-900"
                                        : isAnswered
                                          ? "border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300"
                                          : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                                    )}
                                  >
                                    {questionIndex + 1}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Progress */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Umumiy vaqt:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {testData.total_time} daqiqa
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jami savollar:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{allQuestions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Javob berilgan:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {Object.keys(selectedAnswers).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Qolgan:</span>
                      <span className="font-medium text-orange-600 dark:text-orange-400">
                        {allQuestions.length - Object.keys(selectedAnswers).length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}