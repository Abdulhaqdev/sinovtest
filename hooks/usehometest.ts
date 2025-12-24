"use client"

import { useQuery } from "@tanstack/react-query"
import { testApi } from "@/lib/test-api"

export const useHomeTests = () => {
  return useQuery({
    queryKey: ["tests", "home"],
    queryFn: testApi.getHomeTests,
  })
}