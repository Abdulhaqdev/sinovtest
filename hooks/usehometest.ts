"use client"

import { useQuery } from "@tanstack/react-query"
import { testApi } from "@/lib/test-api"

export const useHomeTests = () => {
  return useQuery({
    queryKey: ["tests", "home"],
    queryFn: testApi.getHomeTests,
  })
}

export const useTestDetail = (testId: number, blockId: number, subjectId: number) => {
  return useQuery({
    queryKey: ["test", "detail", testId, blockId, subjectId],
    queryFn: () => testApi.getTestDetail(testId, blockId, subjectId),
    enabled: !!testId && !!blockId && !!subjectId,
  })
}