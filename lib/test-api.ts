"use client"

import { apiService } from "./api-service"

export type TestDifficulty = "easy" | "medium" | "hard"

export type Test = {
  test_id: number
  test_name: string
  subject_id: number
  subject_name: string
  is_payable: boolean
  price: number
  description: string
  time: number
  questions_count: number
  difficulty: TestDifficulty
}

export type TestGroup = {
  type: string
  tests: Test[]
}

export type TestHomeResponse = TestGroup[]

export const testApi = {
  getHomeTests: () => apiService.get<TestHomeResponse>("test/test-home/"),
}