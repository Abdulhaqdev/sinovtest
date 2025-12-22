import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronRight, Share2, Star, MessageCircle, Users, List, StarIcon } from "lucide-react"
import Link from "next/link"

export default function TestDetailPage({ params }: { params: { id: string } }) {
  const testData = {
    id: params.id,
    title: "Maktabgacha ta'lim muassasalari tarbiyachisi",
    description:
      "Ushbu sinov Malaka toifasi test tanlovlariga tayyorgarlik ko'rish maqsadida tuzilgan. Sinovda ishtirok etish pedagoglar uchun mo'ljallangan. Sinovlarda qatnashib o'z bilimingizni sinab ko'ring.",
    participants: 14836,
    questions: 50,
    rating: 4.7,
    comments: 204,
    categories: [
      {
        title: "Maktabgacha ta'lim muassasalari tarbiyachisi",
        questions: 35,
        topics: "O'zbekcha, Ruscha, Qoraqalpoq",
      },
      {
        title: "Kasbiy standart",
        questions: 5,
        topics: "O'zbekcha, Ruscha, Qoraqalpoq",
      },
      {
        title: "Pedagogik mahorat",
        questions: 10,
        topics: "O'zbekcha, Ruscha, Qoraqalpoq",
      },
    ],
    reviews: [
      {
        name: "Dilnoza Hasanova Fazliddin qizi",
        date: "13 oktabr 2025",
        rating: 5,
        comment: "Juda ajoyib",
      },
      {
        name: "Mehrinigor Majidova Tursunovna",
        date: "13 oktabr 2025",
        rating: 5,
        comment: "Har kirganda testlar yangilanib boshqa xil bo'lsa juda yaxshi bo'lardi.",
      },
      {
        name: "Nargiza Suvorova Abdugayulovna",
        date: "13 oktabr 2025",
        rating: 5,
        comment: "",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="mx-auto max-w-[1400px] px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Chiqish
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>Asosiy oyna</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">{testData.title}</span>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Title and Share */}
            <div className="mb-6 flex items-start justify-between">
              <h1 className="text-3xl font-bold text-gray-900">{testData.title}</h1>
              <Button variant="outline" className="gap-2 rounded-full bg-transparent">
                <Share2 className="h-4 w-4" />
                Ulashish
              </Button>
            </div>

            {/* Description */}
            <p className="mb-8 text-gray-600 leading-relaxed">{testData.description}</p>

            {/* Categories */}
            <div className="mb-12 grid gap-6 md:grid-cols-3">
              {testData.categories.map((category, index) => (
                <div key={index} className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="mb-3 font-bold text-gray-900">{category.title}</h3>
                  <p className="mb-2 text-sm text-gray-500">Jami savollar: {category.questions}</p>
                  <p className="text-sm text-gray-500">Tillar: {category.topics}</p>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {testData.reviews.map((review, index) => (
                <div key={index} className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-start gap-4">
                    <Avatar className="h-12 w-12 bg-gray-300">
                      <AvatarFallback className="bg-gray-300">
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      {review.comment && <p className="mt-3 text-gray-700">{review.comment}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-[380px]">
            <div className="sticky top-8 rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-6 text-center">
                <span className="text-sm text-gray-500">Narxi</span>
                <h2 className="text-3xl font-bold text-gray-900">Bepul</h2>
              </div>

              <Link href={`/test/${params.id}/take`}>
                <Button className="mb-6 h-14 w-full rounded-full bg-gray-800 text-base font-medium hover:bg-gray-700">
                  Boshlash
                </Button>
              </Link>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">Izohlar: {testData.comments}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Ishtirokchilar soni: {testData.participants}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <List className="h-5 w-5" />
                  <span className="text-sm">Savollar soni: {testData.questions}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">Reyting: {testData.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
