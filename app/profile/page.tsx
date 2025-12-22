"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Trophy, Clock, CheckCircle2, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useProfile, useUpdateProfile } from "@/hooks/user-update"

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfile()
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

  // Mock data for tests
  const mockStats = {
    testsCompleted: 160,
    correctAnswers: 3282,
    averageScore: 85,
    rank: 1,
  }

  const mockRecentTests = [
    {
      id: 1,
      title: "Boshlang'ich ta'lim",
      date: "12 oktabr 2025",
      score: 88,
      time: "1:45:23",
    },
    {
      id: 2,
      title: "Ingliz tili",
      date: "10 oktabr 2025",
      score: 92,
      time: "1:32:15",
    },
    {
      id: 3,
      title: "Maktabgacha ta'lim muassasalari tarbiyachisi",
      date: "8 oktabr 2025",
      score: 85,
      time: "1:28:45",
    },
  ]

  if (isLoading) {
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
                <div className="flex items-center gap-2 rounded-full bg-yellow-100 dark:bg-yellow-900 px-4 py-2">
                  <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  <span className="font-semibold text-yellow-700 dark:text-yellow-300">
                    #{mockStats.rank} o'rinda
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="rounded-xl bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
                  <div className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                    {mockStats.testsCompleted}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Jami sinovlar</div>
                </div>
                <div className="rounded-xl bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
                  <div className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                    {mockStats.correctAnswers}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">To'g'ri javoblar</div>
                </div>
                <div className="rounded-xl bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700">
                  <div className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                    {mockStats.averageScore}%
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
            {mockRecentTests.map((test) => (
              <div
                key={test.id}
                className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-6 shadow-sm border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{test.title}</h3>
                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{test.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{test.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">{test.score}%</div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(test.score / 20)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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