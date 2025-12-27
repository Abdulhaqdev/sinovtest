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
  icon: string
  category: string
  backgroundColor: string
  darkBackgroundColor: string
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
    solved_users_count: number
  }
  subject: Subject[]
  blocks: Block[]
  suggestion: TestGroup[]
  can_choose_count: number
}

export type Answer = {
  id: number
  answer_text: string
  answer_image: string | null
}

export type Question = {
  id: number
  question_text: string
  question_image: string | null
  difficulty: TestDifficulty
  difficulty_display: string
  subject: number
  answers: Answer[]
}

export type SubjectQuestions = {
  subject_id: number
  subject_name: string
  questions: Question[]
}

export type BlockQuestions = {
  block_id: number
  block_name: string
  subjects: SubjectQuestions[]
}

export type TestQuestionsResponse = {
  test: string
  total_time: number
  blocks: BlockQuestions[]
}

export type StartTestRequest = {
  type_id: number
  block_id: number
  subject_id: number[]
}

export type CheckAnswersRequest = {
  test_id: number
  blocks: {
    block_id: number
    subjects: {
      subject_id: number
      questions: {
        question_id: number
        answer_id: number
      }[]
    }[]
  }[]
}

export type CheckAnswersResponse = {
  total_score: number
  correct_answers: number
  wrong_answers: number
  unanswered: number
  details: {
    block_id: number
    block_name: string
    subjects: {
      subject_id: number
      subject_name: string
      score: number
      correct: number
      wrong: number
      questions: {
        question_id: number
        is_correct: boolean
        user_answer_id: number
        correct_answer_id: number
      }[]
    }[]
  }[]
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

  startTest: (data: StartTestRequest) => {
    return apiService.post<TestQuestionsResponse>(
      "test/test/quesions/",
      data,
      true
    )
  },

  checkAnswers: (data: CheckAnswersRequest) => {
    return apiService.post<CheckAnswersResponse>(
      "test/test/check-answers/",
      data,
      true
    )
  },
}