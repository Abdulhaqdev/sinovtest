"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TestCard } from "@/components/test-card"
import { 
  ChevronRight, 
  Share2, 
  Clock, 
  FileQuestion, 
  Target,
  Loader2,
  AlertCircle,
  Check
} from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { use, useEffect, useState } from "react"
import { authUtils } from "@/lib/auth-api"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTestDetail } from "@/hooks/usehometest"
import { useProfile } from "@/hooks/user-update"
import { cn } from "@/lib/utils"

export default function TestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const testId = Number.parseInt(resolvedParams.id)
  
  const blockIdParam = searchParams.get("block_id")
  const subjectIdParam = searchParams.get("subject_id")
  
  const selectedBlock = blockIdParam ? Number.parseInt(blockIdParam) : 0
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>(
    subjectIdParam ? [Number.parseInt(subjectIdParam)] : []
  )

  const { data: testDetail, isLoading, error } = useTestDetail(testId, selectedBlock, selectedSubjects[0] || 0)
  const { data: profile, isLoading: profileLoading } = useProfile()

  const isAuthenticated = authUtils.isAuthenticated()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleStartTest = () => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (!profile || !profile.name || !profile.surname) {
      router.push("/profile")
      return
    }

    if (!selectedBlock || selectedSubjects.length === 0) {
      return
    }

    // Navigate to test with selected subjects
    const subjectIds = selectedSubjects.join(",")
    router.push(`/test/${testId}/take?block_id=${selectedBlock}&subject_ids=${subjectIds}`)
  }

  const toggleSubject = (subjectId: number) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subjectId)) {
        return prev.filter(id => id !== subjectId)
      } else {
        return [...prev, subjectId]
      }
    })
  }

  if (isLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    )
  }

  if (error || !testDetail) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-red-600 dark:text-red-400">Test topilmadi</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {error instanceof Error ? error.message : "Ma'lumotlarni yuklashda xatolik"}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const canStartTest = isAuthenticated && profile?.name && profile?.surname && selectedBlock && selectedSubjects.length > 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-6 md:py-8 pb-20 md:pb-6">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100">
            Bosh sahifa
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-white">{testDetail.info.test_name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 flex items-start justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {testDetail.info.test_name}
              </h1>
              <Button variant="outline" className="gap-2 rounded-full bg-transparent hidden md:flex">
                <Share2 className="h-4 w-4" />
                Ulashish
              </Button>
            </div>

            <p className="mb-8 text-gray-600 dark:text-gray-400 leading-relaxed">
              {testDetail.info.test_description}
            </p>

            {/* Profile Warning */}
            {isAuthenticated && (!profile?.name || !profile?.surname) && (
              <Alert className="mb-6 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950">
                <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <AlertDescription className="text-yellow-800 dark:text-yellow-300">
                  Testni boshlash uchun profilingizni to'ldiring.{" "}
                  <Link href="/profile" className="font-medium underline">
                    Profilni to'ldirish
                  </Link>
                </AlertDescription>
              </Alert>
            )}

            {/* All Blocks - Display Only */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Bloklar haqida ma'lumot
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {testDetail.blocks.map((block) => (
                  <Card 
                    key={block.id}
                    
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900 dark:text-white">{block.name}</h4>
                          {block.id === selectedBlock && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs">
                              Tanlangan
                            </Badge>
                          )}
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "border-0",
                            block.difficulty === "easy" && "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
                            block.difficulty === "medium" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
                            block.difficulty === "hard" && "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                          )}
                        >
                          {block.difficulty === "easy" && "Oson"}
                          {block.difficulty === "medium" && "O'rta"}
                          {block.difficulty === "hard" && "Qiyin"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {block.description}
                      </p>
                      <div className="grid grid-cols-3 gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex flex-col items-start gap-1">
                          <Clock className="h-4 w-4" />
                          <span className="text-xs">{block.time_block} daqiqa</span>
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <FileQuestion className="h-4 w-4" />
                          <span className="text-xs">{block.questions_limit} ta</span>
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <Target className="h-4 w-4" />
                          <span className="text-xs">{block.ball_block} ball</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Multi-Select Subjects */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Fanlarni tanlang ({selectedSubjects.length}/{testDetail.subject.length} tanlandi)
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {testDetail.subject.map((subject) => {
                  const isSelected = selectedSubjects.includes(subject.id)
                  return (
                    <button
                      key={subject.id}
                      onClick={() => toggleSubject(subject.id)}
                      className={cn(
                        "relative flex items-center justify-between h-auto py-3 px-4 text-left rounded-lg border-2 transition-all",
                        isSelected 
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-400" 
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      )}
                    >
                      <span className={cn(
                        "text-sm font-medium",
                        isSelected 
                          ? "text-blue-900 dark:text-blue-100" 
                          : "text-gray-900 dark:text-white"
                      )}>
                        {subject.name}
                      </span>
                      {isSelected && (
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 ml-2" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Suggestions */}
            {testDetail.suggestion && testDetail.suggestion.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  O'xshash testlar
                </h2>
                {testDetail.suggestion.map((group, groupIndex) => (
                  <div key={groupIndex} className="mb-8">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {group.type}
                      </h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {group.tests.length} ta test
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.tests.map((test) => (
                        <TestCard 
                          key={`${test.test_id}-${test.block_id}-${test.subject_id}`} 
                          {...test}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[380px]">
            <div className="sticky top-8 rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                  Tanlangan ma'lumotlar
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Blok</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {testDetail.blocks.find(b => b.id === selectedBlock)?.name || "Tanlanmagan"}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Fanlar ({selectedSubjects.length} ta)
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {selectedSubjects.length > 0
                        ? selectedSubjects
                            .map(id => testDetail.subject.find(s => s.id === id)?.name)
                            .filter(Boolean)
                            .join(", ")
                        : "Tanlanmagan"}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="h-12 md:h-14 w-full rounded-full bg-gray-800 dark:bg-white text-base font-medium hover:bg-gray-700 dark:hover:bg-gray-200 text-white dark:text-gray-900"
                disabled={!canStartTest}
                onClick={handleStartTest}
              >
                {!isAuthenticated
                  ? "Kirish kerak"
                  : !profile?.name || !profile?.surname
                    ? "Profilni to'ldiring"
                    : selectedSubjects.length === 0
                      ? "Fanni tanlang"
                      : "Testni boshlash"}
              </Button>

              {!isAuthenticated && (
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  Testni boshlash uchun{" "}
                  <Link href="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    tizimga kiring
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}