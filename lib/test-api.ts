"use client"

import { apiService } from "./api-service"

export type TestDifficulty = "easy" | "medium" | "hard"

export type Test = {
  test_id: number
  test_name: string
  block: string
  block_id: number
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

export type Subject = {
  id: number
  name: string
}

export type Block = {
  id: number
  name: string
  description: string
  time_block: number
  questions_limit: number
  difficulty: TestDifficulty
  ball_block: number
}

export type TestDetailResponse = {
  info: {
    test_id: number
    test_name: string
    test_description: string
  }
  subject: Subject[]
  blocks: Block[]
}

export const testApi = {
  getHomeTests: () => apiService.get<TestHomeResponse>("test/test-home/"),
  
  getTestDetail: (testId: number, blockId: number, subjectId: number) => {
    const params = new URLSearchParams({
      test_id: testId.toString(),
      block_id: blockId.toString(),
      subject_id: subjectId.toString(),
    })
    
    return apiService.get<TestDetailResponse>(
      `test/test/choose/?${params.toString()}`,
      true
    )
  },
}