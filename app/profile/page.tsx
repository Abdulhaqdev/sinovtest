"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Trophy, Clock, CheckCircle2, Loader2, Award } from "lucide-react"
import { useState, useEffect } from "react"


import { format } from "date-fns"
import { uz } from "date-fns/locale"
import { useMyResults, useMyStats } from "@/hooks/use-my-results"
import { useProfile, useUpdateProfile } from "@/hooks/user-update"

export default function ProfilePage() {
  const { data: profile, isLoading: profileLoading } = useProfile()
  const { data: results, isLoading: resultsLoading } = useMyResults()
  const { data: stats, isLoading: statsLoading } = useMyStats()
  const updateProfile = useUpdateProfile()

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    father_name: "",
    birth_date: "",
    jshshir: "",
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        surname: profile.surname || "",
        father_name: profile.father_name || "",
        birth_date: profile.birth_date || "",
        jshshir: profile.jshshir || "",
      })
    }
  }, [profile])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile.mutate(formData)
  }

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        surname: profile.surname || "",
        father_name: profile.father_name || "",
        birth_date: profile.birth_date || "",
        jshshir: profile.jshshir || "",
      })
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "d MMMM yyyy", { locale: uz })
    } catch {
      return dateString
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-400"
    if (score >= 50) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 70) return "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800"
    if (score >= 50) return "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800"
    return "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800"
  }

  if (profileLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    )
  }

  const displayName = profile?.name && profile?.surname 
    ? `${profile.name} ${profile.surname}` 
    : "Foydalanuvchi"

  const initials = profile?.name && profile?.surname
    ? `${profile.name[0]}${profile.surname[0]}`.toUpperCase()
    : "FN"

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <div className="mx-auto max-w-[1200px] px-6 py-8">
        {/* Profile Header */}
        <div className="mb-8 rounded-2xl bg-gray-50 dark:bg-gray-900 p-8 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 bg-gray-300 dark:bg-gray-700">
              <AvatarFallback className="bg-gray-300 dark:bg-gray-700 text-white text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{displayName}</h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Telegram ID: {profile?.telegram_id}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900 px-4 py-2 border border-blue-200 dark:border-blue-800">
                  <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold text-blue-700 dark:text-blue-300">
                   {stats?.rank ? `Reyting: ${stats.rank}` : "Reyting mavjud emas"}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="rounded-xl bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
                  <div className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                    {stats?.total_tests || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Jami sinovlar</div>
                </div>
                <div className="rounded-xl bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
                  <div className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                    {stats?.total_correct || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">To'g'ri javoblar</div>
                </div>
                <div className="rounded-xl bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
                  <div className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                    {stats?.average_score?.toFixed(1) || 0}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">O'rtacha ball</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-100 dark:bg-gray-900 p-1 border border-gray-200 dark:border-gray-800">
            <TabsTrigger
              value="tests"
              className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 text-gray-900 dark:text-white"
            >
              Testlar tarixi
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 text-gray-900 dark:text-white"
            >
              Sozlamalar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="space-y-4">
            {resultsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : results && results.length > 0 ? (
              results.map((test) => {
                const scoreNum = parseFloat(test.score)
                return (
                  <div
                    key={test.id}
                    className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                            {test.test_name}
                          </h3>
                          <Badge
                            variant="outline"
                            className={getScoreBgColor(scoreNum)}
                          >
                            {test.correct} ta to'g'ri
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>{formatDate(test.created_at)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4" />
                            <span>{test.blocks.join(", ")}</span>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {test.subjects.map((subject, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <div className={`text-3xl font-bold ${getScoreColor(scoreNum)}`}>
                          {scoreNum.toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">ball</div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-12">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  Hali birorta test topshirmadingiz
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="settings"
            className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-8 shadow-sm border border-gray-200 dark:border-gray-800"
          >
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Shaxsiy ma'lumotlar</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                  Ism
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ismingizni kiriting"
                  className="h-12 rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="surname" className="text-gray-700 dark:text-gray-300">
                  Familiya
                </Label>
                <Input
                  id="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  placeholder="Familiyangizni kiriting"
                  className="h-12 rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="father_name" className="text-gray-700 dark:text-gray-300">
                  Otasining ismi
                </Label>
                <Input
                  id="father_name"
                  value={formData.father_name}
                  onChange={handleInputChange}
                  placeholder="Otangizning ismini kiriting"
                  className="h-12 rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birth_date" className="text-gray-700 dark:text-gray-300">
                  Tug'ilgan sana
                </Label>
                <Input
                  id="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={handleInputChange}
                  className="h-12 rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jshshir" className="text-gray-700 dark:text-gray-300">
                  JSHSHIR
                </Label>
                <Input
                  id="jshshir"
                  value={formData.jshshir}
                  onChange={handleInputChange}
                  placeholder="JSHSHIR raqamini kiriting"
                  maxLength={14}
                  className="h-12 rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={updateProfile.isPending}
                  className="h-12 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 px-8 text-white"
                >
                  {updateProfile.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saqlanmoqda...
                    </>
                  ) : (
                    "Saqlash"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={updateProfile.isPending}
                  className="h-12 rounded-full px-8 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 bg-transparent"
                >
                  Bekor qilish
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}