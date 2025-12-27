import { Suspense } from "react"
import { TestResultsContent } from "@/components/test-result"

export default function TestResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
    </div>}>
      <TestResultsContent testId="" />
    </Suspense>
  )
}