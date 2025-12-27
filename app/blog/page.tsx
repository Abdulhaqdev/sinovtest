import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Calendar, User, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Ta'lim tizimida yangi o'zgarishlar",
      excerpt:
        "2025-yilda ta'lim tizimida amalga oshiriladigan yangi o'zgarishlar va ularning o'qituvchilar attestatsiyasiga ta'siri haqida batafsil ma'lumot.",
      author: "Sinov jamoasi",
      date: "10 Oktabr 2025",
      comments: 24,
      image: "/education-reform.png",
      color: "mint",
    },
    {
      id: 2,
      title: "Attestatsiyaga qanday tayyorlanish kerak?",
      excerpt:
        "O'qituvchilar attestatsiyasiga samarali tayyorgarlik ko'rish bo'yicha amaliy maslahatlar va foydali tavsiyalar.",
      author: "Dilnoza Hasanova",
      date: "8 Oktabr 2025",
      comments: 18,
      image: "/teacher-preparation.jpg",
      color: "yellow",
    },
    {
      id: 3,
      title: "Onlayn testlar: afzalliklari va imkoniyatlari",
      excerpt:
        "Zamonaviy onlayn test platformalarining o'qituvchilar uchun qanday imkoniyatlar yaratishi va ulardan qanday foydalanish mumkinligi.",
      author: "Rustam Karimov",
      date: "5 Oktabr 2025",
      comments: 32,
      image: "/online-testing-platform.jpg",
      color: "lime",
    },
    {
      id: 4,
      title: "Ingliz tili o'qituvchilari uchun yangi standartlar",
      excerpt:
        "Chet tili o'qituvchilari uchun joriy etilgan yangi kasbiy standartlar va ularning talablari haqida to'liq ma'lumot.",
      author: "Malika Abdullayeva",
      date: "3 Oktabr 2025",
      comments: 15,
      image: "/english-teaching-standards.jpg",
      color: "peach",
    },
    {
      id: 5,
      title: "Maktabgacha ta'lim: zamonaviy yondashuvlar",
      excerpt: "Maktabgacha ta'lim muassasalarida qo'llaniladigan zamonaviy pedagogik texnologiyalar va metodlar.",
      author: "Nodira Rahimova",
      date: "1 Oktabr 2025",
      comments: 21,
      image: "/preschool-education-methods.jpg",
      color: "sage",
    },
    {
      id: 6,
      title: "Raqamli ta'lim: kelajak bugundan boshlanadi",
      excerpt: "Ta'lim jarayonida raqamli texnologiyalardan foydalanish va ularning samaradorligini oshirish yo'llari.",
      author: "Aziz Tursunov",
      date: "28 Sentyabr 2025",
      comments: 27,
      image: "/digital-education-technology.jpg",
      color: "mint",
    },
  ]

  const colorClasses = {
    mint: "bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 dark:hover:bg-emerald-900",
    yellow: "bg-amber-50 dark:bg-amber-950 hover:bg-amber-100 dark:hover:bg-amber-900",
    lime: "bg-lime-50 dark:bg-lime-950 hover:bg-lime-100 dark:hover:bg-lime-900",
    peach: "bg-orange-50 dark:bg-orange-950 hover:bg-orange-100 dark:hover:bg-orange-900",
    sage: "bg-teal-50 dark:bg-teal-950 hover:bg-teal-100 dark:hover:bg-teal-900",
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="mx-auto max-w-[1200px] px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Ta'lim sohasidagi so'nggi yangiliklar va foydali maqolalar</p>
        </div>

        {/* Blog Posts Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className={`group overflow-hidden rounded-3xl transition-all ${
                colorClasses[post.color as keyof typeof colorClasses]
              }`}
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300">{post.title}</h2>
                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{post.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="h-14 rounded-full bg-gray-800 dark:bg-white px-16 text-base font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200"
          >
            Yana ko'rsatish
          </Button>
        </div>
      </div>
    </div>
  )
}
