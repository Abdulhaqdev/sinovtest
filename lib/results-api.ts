"use client"

import { apiService } from "./api-service"

export type TestResult = {
  id: number
  test: number
  test_name: string
  score: string
  correct: number
  subjects: string[]
  blocks: string[]
  created_at: string
}

export type TestStats = {
  total_tests: number
  total_correct: number
  average_score: number
  rank: number
}

export const resultsApi = {
  getMyResults: () => apiService.get<TestResult[]>("users/my-results/", true),
  
  getMyStats: () => apiService.get<TestStats>("users/my-results/stats/", true),
}