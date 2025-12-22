"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { AlertCircle, Clock, Pause, ChevronDown, ChevronUp } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function TakeTestPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(5325) 
  const [isPaused, setIsPaused] = useState(false)
  const [showQuestionNav, setShowQuestionNav] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [isPaused])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const questions = {
    "Ingliz tili": Array.from({ length: 35 }, (_, i) => i + 1),
    "O'zbekcha": Array.from({ length: 5 }, (_, i) => i + 36),
    Qoraqalpoq: Array.from({ length: 5 }, (_, i) => i + 41),
  }

  const questionText = {
    title: "Ingliz tili",
    content: `A recent study by biologists at the University of Helsinki examined how different types of light affect the growth of tomato plants. Over six weeks, three groups of plants were grown under different conditions: natural sunlight, white LED light, and red-blue LED light.

The results showed that plants under natural sunlight grew the tallest, but those under red-blue LED light produced more leaves and had stronger stems. The group exposed to white LED light showed average growth but fewer leaves compared to the other groups.

Researchers concluded that while sunlight remains the best overall for plant growth, red-blue LED lighting could be a useful alternative for indoor farming, especially in regions with limited natural light.`,
    question: "What can be inferred about the usefulness of white LED light in farming?",
    options: [
      "It is less effective than both natural sunlight and red-blue LED light.",
      "It is the most effective type of light for all aspects of plant growth.",
      "It produces taller plants than natural sunlight",
      "It can completely replace natural sunlight in all farming conditions.",
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Main Content */}
          <div className="flex-1 order-2 lg:order-1">
            {/* Header */}
            <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">{questionText.title}</h1>
              <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                <div className="flex items-center gap-2 rounded-full bg-red-50 px-3 md:px-4 py-1.5 md:py-2 text-red-600">
                  <AlertCircle className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-xs md:text-sm font-medium">E'tiroz</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                  <div className="text-right">
                    <div className="text-base md:text-xl font-bold text-gray-900">{formatTime(timeRemaining)}</div>
                    <div className="text-xs text-gray-500">Qolgan vaqt</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Question Content */}
            <div className="rounded-2xl bg-white p-4 md:p-8 shadow-sm">
              <div className="mb-4 md:mb-6">
                <span className="text-base md:text-lg font-semibold text-gray-900">1.</span>
                <div className="mt-3 md:mt-4 whitespace-pre-line text-sm md:text-base text-gray-700 leading-relaxed">
                  {questionText.content}
                </div>
                <p className="mt-4 md:mt-6 font-semibold text-sm md:text-base text-gray-900">{questionText.question}</p>
              </div>

              {/* Options */}
              <div className="space-y-3 md:space-y-4">
                {questionText.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex cursor-pointer items-start gap-2 md:gap-3 rounded-xl border-2 border-gray-200 p-3 md:p-4 transition-colors hover:border-gray-300"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={index}
                      checked={selectedAnswer === index}
                      onChange={() => setSelectedAnswer(index)}
                      className="mt-0.5 md:mt-1 h-4 w-4 md:h-5 md:w-5 cursor-pointer flex-shrink-0"
                    />
                    <span className="flex-1 text-sm md:text-base text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              {/* Navigation */}
              <div className="mt-6 md:mt-8 flex items-center justify-between gap-3">
                <Button variant="outline" className="rounded-full px-6 md:px-8 text-sm md:text-base bg-transparent">
                  Ortga
                </Button>
                <Button className="rounded-full bg-gray-800 px-6 md:px-8 text-sm md:text-base hover:bg-gray-700">
                  Keyingi
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[380px] order-1 lg:order-2">
            <div className="lg:sticky lg:top-4 space-y-4">
              {/* Controls */}
              <div className="rounded-2xl bg-white p-3 md:p-4 shadow-sm">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 rounded-full text-xs md:text-sm bg-transparent"
                    onClick={() => setIsPaused(!isPaused)}
                  >
                    <Pause className="h-3 w-3 md:h-4 md:w-4" />
                    To'xtatish
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-full text-xs md:text-sm bg-transparent">
                    Yakunlash
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                <button
                  onClick={() => setShowQuestionNav(!showQuestionNav)}
                  className="lg:hidden w-full flex items-center justify-between p-4 text-left font-semibold text-gray-900 hover:bg-gray-50"
                >
                  <span>Savollar ro'yxati</span>
                  {showQuestionNav ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>

                <div className={cn("p-4 md:p-6", "lg:block", showQuestionNav ? "block" : "hidden")}>
                  {Object.entries(questions).map(([category, nums]) => (
                    <div key={category} className="mb-4 md:mb-6 last:mb-0">
                      <div className="mb-2 md:mb-3 rounded-full border-2 border-gray-200 px-3 md:px-4 py-1.5 md:py-2 text-center text-xs md:text-sm font-medium text-gray-700">
                        {category}
                      </div>
                      <div className="grid grid-cols-6 gap-1.5 md:gap-2">
                        {nums.map((num) => (
                          <button
                            key={num}
                            onClick={() => {
                              setCurrentQuestion(num)
                              setShowQuestionNav(false)
                            }}
                            className={cn(
                              "flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg border-2 text-xs md:text-sm font-semibold transition-colors",
                              currentQuestion === num
                                ? "border-gray-800 bg-gray-800 text-white"
                                : "border-gray-200 text-gray-700 hover:border-gray-300",
                            )}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Labels */}
              <div
                className={cn(
                  "space-y-2 rounded-2xl bg-white p-3 md:p-4 shadow-sm",
                  "lg:block",
                  showQuestionNav ? "block" : "hidden",
                )}
              >
                <div className="text-center text-xs md:text-sm font-medium text-gray-700">Kasbiy standart</div>
                <div className="text-center text-xs md:text-sm font-medium text-gray-700">Pedagogik mahorat</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
