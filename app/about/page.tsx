import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Target, Users, Award, TrendingUp, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { label: "Faol foydalanuvchilar", value: "50,000+", color: "mint" },
    { label: "Mavjud testlar", value: "200+", color: "yellow" },
    { label: "O'tkazilgan testlar", value: "500,000+", color: "lime" },
    { label: "Muvaffaqiyat darajasi", value: "94%", color: "peach" },
  ]

  const team = [
    {
      name: "Aziza Karimova",
      role: "Loyiha rahbari",
      image: "/professional-woman-portrait.png",
    },
    {
      name: "Rustam Tursunov",
      role: "Texnik direktor",
      image: "/professional-man-portrait.png",
    },
    {
      name: "Dilnoza Hasanova",
      role: "Ta'lim bo'yicha mutaxassis",
      image: "/professional-woman-teacher.png",
    },
    {
      name: "Jasur Rahimov",
      role: "Dasturchi",
      image: "/professional-developer.png",
    },
  ]

  const values = [
    {
      icon: Target,
      title: "Maqsadimiz",
      description:
        "O'qituvchilarning kasbiy tayyorgarligini oshirish va attestatsiya jarayonini soddalashtirishga yordam berish.",
      color: "mint",
    },
    {
      icon: Users,
      title: "Jamoamiz",
      description:
        "Ta'lim va texnologiya sohasidagi tajribali mutaxassislar jamoasi sizning muvaffaqiyatingiz uchun ishlaydi.",
      color: "yellow",
    },
    {
      icon: Award,
      title: "Sifat",
      description: "Barcha testlar Ta'lim vazirligi standartlariga muvofiq tayyorlanadi va doimiy yangilanib boriladi.",
      color: "lime",
    },
    {
      icon: TrendingUp,
      title: "Rivojlanish",
      description: "Platformamiz doimiy ravishda yangi funksiyalar va imkoniyatlar bilan boyitilmoqda.",
      color: "peach",
    },
  ]

  const colorClasses = {
    mint: "bg-emerald-50 dark:bg-emerald-950",
    yellow: "bg-amber-50 dark:bg-amber-950",
    lime: "bg-lime-50 dark:bg-lime-950",
    peach: "bg-orange-50 dark:bg-orange-950",
    sage: "bg-teal-50 dark:bg-teal-950",
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="mx-auto max-w-[1200px] px-6 py-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Biz haqimizda</h1>
          <p className="mx-auto max-w-[700px] text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            Sinov - O'zbekistondagi o'qituvchilar uchun zamonaviy onlayn test platformasi. Biz ta'lim xodimlarining
            kasbiy rivojlanishiga hissa qo'shamiz.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-3xl p-6 text-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}
            >
              <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Bizning qadriyatlarimiz</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className={`rounded-3xl p-6 ${colorClasses[value.color as keyof typeof colorClasses]}`}>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-gray-800">
                  <value.icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Bizning jamoa</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div key={index} className="overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="rounded-3xl bg-emerald-50 dark:bg-emerald-950 p-8 md:p-12">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Biz bilan bog'laning</h2>
            <p className="mb-8 text-gray-600 dark:text-gray-400">Savollaringiz bormi? Biz bilan bog'lanishdan tortinmang!</p>
            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300">
                <Mail className="h-5 w-5" />
                <span>info@sinov.uz</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300">
                <Phone className="h-5 w-5" />
                <span>+998 71 123 45 67</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300">
                <MapPin className="h-5 w-5" />
                <span>Toshkent, O'zbekiston</span>
              </div>
            </div>
            <Link href="/login">
              <Button
                size="lg"
                className="h-14 rounded-full bg-gray-800 dark:bg-white px-12 text-base font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200"
              >
                Ro'yxatdan o'tish
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
