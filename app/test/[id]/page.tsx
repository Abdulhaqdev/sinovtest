"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ChevronRight, 
  Share2, 
  Clock, 
  FileQuestion, 
  Target,
  Loader2,
  AlertCircle 
} from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { use, useEffect, useState } from "react"
import { authUtils } from "@/lib/auth-api"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTestDetail } from "@/hooks/usehometest"
import { useProfile } from "@/hooks/user-update"

export default function TestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const testId = Number.parseInt(resolvedParams.id)
  
  const blockIdParam = searchParams.get("block_id")
  const subjectIdParam = searchParams.get("subject_id")
  
  const [selectedBlock, setSelectedBlock] = useState<number>(blockIdParam ? Number.parseInt(blockIdParam) : 0)
  const [selectedSubject, setSelectedSubject] = useState<number>(subjectIdParam ? Number.parseInt(subjectIdParam) : 0)

  const { data: testDetail, isLoading, error } = useTestDetail(testId, selectedBlock, selectedSubject)
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

    if (!selectedBlock || !selectedSubject) {
      return
    }

    router.push(`/test/${testId}/take?block_id=${selectedBlock}&subject_id=${selectedSubject}`)
  }

  const handleBlockSelect = (blockId: number) => {
    setSelectedBlock(blockId)
    router.push(`/test/${testId}?block_id=${blockId}&subject_id=${selectedSubject}`, { scroll: false })
  }

  const handleSubjectSelect = (subjectId: number) => {
    setSelectedSubject(subjectId)
    router.push(`/test/${testId}?block_id=${selectedBlock}&subject_id=${subjectId}`, { scroll: false })
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

  const canStartTest = isAuthenticated && profile?.name && profile?.surname && selectedBlock && selectedSubject

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

            {/* Selection Tabs */}
            <Tabs defaultValue="blocks" className="mb-8">
              <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-100 dark:bg-gray-900 p-1">
                <TabsTrigger value="blocks" className="rounded-lg">
                  Bloklar
                </TabsTrigger>
                <TabsTrigger value="subjects" className="rounded-lg">
                  Fanlar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="blocks" className="space-y-4 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Blokni tanlang
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {testDetail.blocks.map((block) => (
                    <Card
                      key={block.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedBlock === block.id
                          ? "ring-2 ring-blue-500 dark:ring-blue-400"
                          : ""
                      }`}
                      onClick={() => handleBlockSelect(block.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-bold text-gray-900 dark:text-white">{block.name}</h4>
                          <Badge
                            variant="outline"
                            className={`
                              ${block.difficulty === "easy" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0" : ""}
                              ${block.difficulty === "medium" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 border-0" : ""}
                              ${block.difficulty === "hard" ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border-0" : ""}
                            `}
                          >
                            {block.difficulty === "easy" && "Oson"}
                            {block.difficulty === "medium" && "O'rta"}
                            {block.difficulty === "hard" && "Qiyin"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {block.description}
                        </p>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{block.time_block} daqiqa</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileQuestion className="h-4 w-4" />
                            <span>{block.questions_limit} ta savol</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            <span>{block.ball_block} ball har bir savol uchun</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="subjects" className="space-y-4 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Fanni tanlang ({testDetail.subject.length} ta)
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {testDetail.subject.map((subject) => (
                    <Button
                      key={subject.id}
                      variant={selectedSubject === subject.id ? "default" : "outline"}
                      className="justify-start h-auto py-3 px-4 text-left"
                      onClick={() => handleSubjectSelect(subject.id)}
                    >
                      {subject.name}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
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
                      {selectedBlock
                        ? testDetail.blocks.find((b) => b.id === selectedBlock)?.name
                        : "Tanlanmagan"}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Fan</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {selectedSubject
                        ? testDetail.subject.find((s) => s.id === selectedSubject)?.name
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
                    : !selectedBlock || !selectedSubject
                      ? "Blok va fanni tanlang"
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