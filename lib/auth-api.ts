"use client"

import { apiService } from "./api-service"


export async function sendOtp(phoneNumber: string) {
  return apiService.post<{ detail: string }>("users/auth/send-otp/", {
    phone_number: phoneNumber,
  })
}

export type VerifyOtpResponse = {
  refresh: string
  access: string
  is_profile_complete: boolean
}

export async function verifyOtp(phoneNumber: string, otpCode: string) {
  return apiService.post<VerifyOtpResponse>("users/auth/verify-otp/", {
    phone_number: phoneNumber,
    otp_code: otpCode,
  })
}

const TOKENS_STORAGE_KEY = "auth_tokens"

export const authUtils = {
  getTokens: () => {
    try {
      const tokens = localStorage.getItem(TOKENS_STORAGE_KEY)
      return tokens ? JSON.parse(tokens) : null
    } catch {
      return null
    }
  },

  isAuthenticated: () => {
    return !!authUtils.getTokens()
  },

  logout: () => {
    localStorage.removeItem(TOKENS_STORAGE_KEY)
  },
}