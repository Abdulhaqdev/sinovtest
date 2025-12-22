import { TestCard } from "@/components/test-card"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

export default function Home() {
  const tests = [
    {
      id: 1,
      title: "Boshlang'ich ta'lim",
      participants: 23440,
      duration: 120,
      questions: 50,
      badge: "Attestatsiya",
      rating: 4.8,
      comments: 684,
      color: "mint",
      icon: "book",
    },
    {
      id: 2,
      title: "Ona tili va adabiyot (o'zbek sinflar uchun)",
      participants: 15161,
      duration: 90,
      questions: 50,
      badge: "Attestatsiya",
      rating: 4.8,
      comments: 323,
      color: "yellow",
      icon: "language",
    },
    {
      id: 3,
      title: "Maktabgacha ta'lim muassasalari tarbiyachisi",
      participants: 14836,
      duration: 90,
      questions: 50,
      badge: "Attestatsiya",
      rating: 4.7,
      comments: 204,
      color: "lime",
      icon: "book",
    },
    {
      id: 4,
      title: "Ingliz tili",
      participants: 12774,
      duration: 90,
      questions: 50,
      badge: "Attestatsiya",
      rating: 4.7,
      comments: 253,
      color: "peach",
      icon: "language",
    },
    {
      id: 5,
      title: "Rus tili (milliy maktablarda)",
      participants: 11556,
      duration: 90,
      questions: 50,
      badge: "Attestatsiya",
      rating: 4.7,
      comments: 170,
      color: "mint",
      icon: "language",
    },
    {
      id: 6,
      title: "Boshlang'ich ta'lim",
      participants: 6104,
      duration: 120,
      questions: 50,
      badge: "Kasbiy sertifikat",
      rating: 4.8,
      comments: 143,
      color: "sage",
      icon: "book",
    },
  ] as const

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-6 md:py-8 pb-20 md:pb-6">
        <h1 className="mb-4 md:mb-6 text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          Eng ommabop testlar
        </h1>

        <div className="mb-6 md:mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.map((test) => (
            <TestCard key={test.id} {...test} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            className="h-12 md:h-14 rounded-full bg-gray-800 dark:bg-white px-12 md:px-16 text-sm md:text-base font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200"
          >
            Yana ko'rsatish
          </Button>
        </div>
      </div>
    </div>
  )
}
