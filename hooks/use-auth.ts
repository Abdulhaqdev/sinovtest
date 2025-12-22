"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { sendOtp, verifyOtp, type VerifyOtpResponse } from "@/lib/auth-api"
import { useToast } from "@/hooks/use-toast"

const TOKENS_STORAGE_KEY = "auth_tokens"

type PersistedTokens = VerifyOtpResponse

const persistTokens = (tokens: PersistedTokens) => {
  try {
    localStorage.setItem(TOKENS_STORAGE_KEY, JSON.stringify(tokens))
  } catch (error) {
    console.error("Failed to persist tokens", error)
  }
}

export const useSendOtpMutation = () => {
  const { toast } = useToast()

  return useMutation({
    mutationFn: (phoneNumber: string) => sendOtp(phoneNumber),
    onSuccess: (data: { detail: string }) => {
      toast({
        title: "SMS yuborildi",
        description: data.detail,
      })
    },
    onError: (error: Error) => {
      toast({
        title: "SMS yuborilmadi",
        description: error.message,
        variant: "destructive",
      })
    },
  })
}

export const useVerifyOtpMutation = () => {
  const { toast } = useToast()
  const router = useRouter()

  return useMutation({
    mutationFn: ({ phoneNumber, otpCode }: { phoneNumber: string; otpCode: string }) =>
      verifyOtp(phoneNumber, otpCode),
    onSuccess: (data: VerifyOtpResponse) => {
      persistTokens(data)
      toast({
        title: "Muvaffaqiyatli",
        description: "Siz tizimga kirdingiz",
      })

      if (data.is_profile_complete) {
        router.replace("/")
      } else {
        router.replace("/profile")
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Tasdiqlanmadi",
        description: error.message,
        variant: "destructive",
      })
    },
  })
}

