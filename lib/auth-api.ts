"use client"

import { apiService } from "./api-service"

const TOKENS_STORAGE_KEY = "auth_tokens"

export type SendOtpResponse = {
  detail: string
}

export type VerifyOtpResponse = {
  refresh: string
  access: string
  is_profile_complete: boolean
}

export type RefreshTokenResponse = {
  access: string
}

export async function sendOtp(phoneNumber: string): Promise<SendOtpResponse> {
  return apiService.post<SendOtpResponse>("users/auth/send-otp/", {
    phone_number: phoneNumber,
  })
}

export async function verifyOtp(phoneNumber: string, otpCode: string): Promise<VerifyOtpResponse> {
  return apiService.post<VerifyOtpResponse>("users/auth/verify-otp/", {
    phone_number: phoneNumber,
    otp_code: otpCode,
  })
}

export async function refreshToken(refresh: string): Promise<RefreshTokenResponse> {
  return apiService.post<RefreshTokenResponse>("users/auth/token/refresh/", {
    refresh,
  })
}

export const authUtils = {
  getTokens: () => {
    if (typeof window === "undefined") return null
    try {
      const tokens = localStorage.getItem(TOKENS_STORAGE_KEY)
      return tokens ? JSON.parse(tokens) : null
    } catch {
      return null
    }
  },

  setTokens: (tokens: VerifyOtpResponse) => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(TOKENS_STORAGE_KEY, JSON.stringify(tokens))
    } catch (error) {
      console.error("Failed to save tokens", error)
    }
  },

  updateAccessToken: (access: string) => {
    if (typeof window === "undefined") return
    try {
      const tokens = authUtils.getTokens()
      if (tokens) {
        localStorage.setItem(
          TOKENS_STORAGE_KEY,
          JSON.stringify({ ...tokens, access })
        )
      }
    } catch (error) {
      console.error("Failed to update access token", error)
    }
  },

  isAuthenticated: () => {
    return !!authUtils.getTokens()?.access
  },

  logout: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem(TOKENS_STORAGE_KEY)
    window.location.href = "/login"
  },
}