"use client"

import { TestCard } from "@/components/test-card"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useHomeTests } from "@/hooks/usehometest"

export default function Home() {
  const { data: testGroups, isLoading, error } = useHomeTests()
  const [visibleGroups, setVisibleGroups] = useState(2)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-red-600 dark:text-red-400">Xatolik yuz berdi</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {error instanceof Error ? error.message : "Ma'lumotlarni yuklashda xatolik"}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const hasMoreGroups = testGroups && visibleGroups < testGroups.length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-6 md:py-8 pb-20 md:pb-6">
        {testGroups?.slice(0, visibleGroups).map((group, groupIndex) => (
          <div key={groupIndex} className="mb-8">
            <div className="mb-4 md:mb-6 flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {group.type}
              </h2>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {group.tests.length} ta test
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.tests.map((test, testIndex) => (
                <TestCard 
                  key={`${test.test_id}-${test.subject_id}`} 
                  {...test}
                  color={
                    ["mint", "yellow", "lime", "peach", "sage"][
                      (groupIndex * group.tests.length + testIndex) % 5
                    ] as "mint" | "yellow" | "lime" | "peach" | "sage"
                  }
                />
              ))}
            </div>
          </div>
        ))}

        {hasMoreGroups && (
          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              onClick={() => setVisibleGroups((prev) => prev + 2)}
              className="h-12 md:h-14 rounded-full bg-gray-800 dark:bg-white px-12 md:px-16 text-sm md:text-base font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200"
            >
              Yana ko'rsatish
            </Button>
          </div>
        )}

        {!hasMoreGroups && testGroups && testGroups.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Barcha testlar ko'rsatildi
            </p>
          </div>
        )}
      </div>
    </div>
  )
}