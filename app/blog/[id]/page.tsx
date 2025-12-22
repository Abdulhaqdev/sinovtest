import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Calendar, User, MessageCircle, Share2, ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  // Mock data - in real app, fetch based on params.id
  const post = {
    id: params.id,
    title: "Ta'lim tizimida yangi o'zgarishlar",
    author: "Sinov jamoasi",
    date: "10 Oktabr 2025",
    comments: 24,
    image: "/education-reform-uzbekistan.jpg",
    content: `
      <p>2025-yil ta'lim tizimida muhim o'zgarishlar yili bo'lmoqda. O'qituvchilar attestatsiyasi jarayoni yangi formatga o'tmoqda va bu barcha ta'lim xodimlari uchun muhim ahamiyatga ega.</p>

      <h2>Asosiy o'zgarishlar</h2>
      <p>Yangi attestatsiya tizimi quyidagi asosiy yo'nalishlarga e'tibor beradi:</p>
      <ul>
        <li>Kasbiy kompetensiyalarni baholash</li>
        <li>Zamonaviy pedagogik texnologiyalardan foydalanish ko'nikmalari</li>
        <li>Raqamli savodxonlik darajasi</li>
        <li>O'quvchilar bilan ishlash metodikasi</li>
      </ul>

      <h2>Tayyorgarlik bosqichlari</h2>
      <p>Attestatsiyaga muvaffaqiyatli tayyorgarlik ko'rish uchun quyidagi bosqichlarni amalga oshirish tavsiya etiladi:</p>
      <ol>
        <li>O'z sohangiz bo'yicha nazariy bilimlarni mustahkamlash</li>
        <li>Amaliy ko'nikmalarni rivojlantirish</li>
        <li>Sinov testlarini muntazam ishlash</li>
        <li>Zamonaviy ta'lim texnologiyalari bilan tanishish</li>
      </ol>

      <h2>Sinov platformasi imkoniyatlari</h2>
      <p>Bizning platformamiz o'qituvchilarga attestatsiyaga tayyorgarlik ko'rishda keng imkoniyatlar taqdim etadi. Siz bu yerda turli yo'nalishlardagi testlarni topishingiz, o'z bilimingizni sinab ko'rishingiz va natijalaringizni tahlil qilishingiz mumkin.</p>

      <p>Platformada mavjud testlar O'zbekiston Respublikasi Ta'lim vazirligi tomonidan tasdiqlangan dasturlar asosida tuzilgan va doimiy ravishda yangilanib boriladi.</p>

      <h2>Xulosa</h2>
      <p>Ta'lim tizimidagi o'zgarishlar o'qituvchilardan doimiy o'z-o'zini rivojlantirish va yangi bilimlarni egallashni talab qiladi. Sinov platformasi sizning bu yo'ldagi ishonchli yordamchingiz bo'ladi.</p>
    `,
  }

  const relatedPosts = [
    {
      id: 2,
      title: "Attestatsiyaga qanday tayyorlanish kerak?",
      image: "/teacher-preparation.jpg",
    },
    {
      id: 3,
      title: "Onlayn testlar: afzalliklari va imkoniyatlari",
      image: "/online-testing.jpg",
    },
    {
      id: 4,
      title: "Ingliz tili o'qituvchilari uchun yangi standartlar",
      image: "/english-standards.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="mx-auto max-w-[900px] px-6 py-8">
        {/* Breadcrumb */}
        <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ChevronLeft className="h-4 w-4" />
          Blogga qaytish
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments} izoh</span>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Ulashish
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 overflow-hidden rounded-3xl">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-auto w-full object-cover" />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Related Posts */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">O'xshash maqolalar</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.id}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={relatedPost.image || "/placeholder.svg"}
                    alt={relatedPost.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700">{relatedPost.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
