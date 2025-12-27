"use client"

import { useQuery } from "@tanstack/react-query"
import { resultsApi } from "@/lib/results-api"
import { leaderboardApi } from "@/lib/leaderboard-api"

export const useMyResults = () => {
  return useQuery({
    queryKey: ["my-results"],
    queryFn: () => resultsApi.getMyResults(),
  })
}

export const useMyStats = () => {
  return useQuery({
    queryKey: ["my-stats"],
    queryFn: () => resultsApi.getMyStats(),
  })
}
export const useLeaderboard = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => leaderboardApi.getLeaderboard(),
  })
}