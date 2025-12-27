import { TestResultsContent } from "@/components/test-result"
import { Suspense } from "react"


export default function TestResultsPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={null}>
      <TestResultsPageContent params={params} />
    </Suspense>
  )
}

async function TestResultsPageContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <TestResultsContent testId={id} />
}
