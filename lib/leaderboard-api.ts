"use client"

import { apiService } from "./api-service"

export type LeaderboardUser = {
  rank: number
  user_id: number
  full_name: string
  tests_count: number
  correct_answers: number
  total_score: string
  is_me: boolean
}

export type LeaderboardResponse = {
  top_10: LeaderboardUser[]
  my_rank: LeaderboardUser
  total_users: number
}

export const leaderboardApi = {
  getLeaderboard: () => apiService.get<LeaderboardResponse>("users/leaderboard/", true),
}