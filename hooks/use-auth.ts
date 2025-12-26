"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { sendOtp, verifyOtp, authUtils, type VerifyOtpResponse } from "@/lib/auth-api"
import { useToast } from "@/hooks/use-toast"

export const useSendOtpMutation = () => {
  const { toast } = useToast()

  return useMutation({
    mutationFn: (phoneNumber: string) => sendOtp(phoneNumber),
    onSuccess: (data) => {
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
      authUtils.setTokens(data)
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