"use client"

import { apiService } from "@/lib/api-service"


export type UserProfile = {
  name: string | null
  surname: string | null
  father_name: string | null
  birth_date: string | null
  jshshir: string | null
  photo: string | null
  telegram_id: number
}

export type UpdateProfileData = {
  name?: string
  surname?: string
  father_name?: string
  birth_date?: string
  jshshir?: string
  photo?: string
}

export const profileApi = {
  getProfile: () => apiService.get<UserProfile>("users/user/profile/", true),

  updateProfile: (data: UpdateProfileData) =>
    apiService.patch<UserProfile, UpdateProfileData>("users/user/profile/", data, true),
}