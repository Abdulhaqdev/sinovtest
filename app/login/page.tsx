"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useSendOtpMutation, useVerifyOtpMutation } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { ExternalLink } from "lucide-react"

const sanitizePhone = (value: string) => value.replace(/\D/g, "")

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [phoneNumber, setPhoneNumber] = useState("+998")
  const [otpCode, setOtpCode] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  const sendOtpMutation = useSendOtpMutation()
  const verifyOtpMutation = useVerifyOtpMutation()

  const normalizedPhone = useMemo(() => sanitizePhone(phoneNumber), [phoneNumber])
  const isSubmitting = sendOtpMutation.isPending || verifyOtpMutation.isPending

  const handleSendOtp = (event: React.FormEvent) => {
    event.preventDefault()

    if (normalizedPhone.length !== 12) {
      toast({
        title: "Telefon raqam noto'g'ri",
        description: "Iltimos, 998 bilan boshlanuvchi 12 xonali raqam kiriting",
        variant: "destructive",
      })
      return
    }

    sendOtpMutation.mutate(normalizedPhone, {
      onSuccess: () => {
        setOtpSent(true)
        // Telegram botni ochish
        window.open("https://t.me/Hisobotchi_Dacha_bot", "_blank")
      },
    })
  }

  const handleVerifyOtp = (event: React.FormEvent) => {
    event.preventDefault()

    if (otpCode.length !== 4) {
      toast({
        title: "Kod noto'g'ri",
        description: "4 xonali tasdiqlash kodini kiriting",
        variant: "destructive",
      })
      return
    }

    verifyOtpMutation.mutate(
      {
        phoneNumber: normalizedPhone,
        otpCode,
      },
      {
        onSuccess: () => {
          setOtpCode("")
          setOtpSent(false)
        },
      },
    )
  }

  const handleCancel = () => {
    setOtpSent(false)
    setOtpCode("")
    router.refresh()
  }

  const openTelegramBot = () => {
    window.open("https://t.me/Hisobotchi_Dacha_bot", "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-sm border border-gray-200 dark:border-gray-800">
            <h1 className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white">Tizimga kirish</h1>
            <p className="mb-8 text-center text-sm text-gray-600 dark:text-gray-400">
              Telefon raqamingizni kiriting va Telegram bot orqali yuborilgan kodni tasdiqlang
            </p>

            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                  Telefon raqam
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="+998 99 999 99 99"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  disabled={isSubmitting || otpSent}
                  className="h-12 rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Format: 998 99 999 99 99 (faqat raqamlar, + belgisisiz ham bo'ladi)
                </p>
              </div>

              {otpSent && (
                <>
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                        <div className="shrink-0">
                          <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                          Telegram botdan kodni oling
                        </h3>
                        <p className="mt-1 text-xs text-blue-700 dark:text-blue-400">
                          @Hisobotchi_Dacha_bot ga kirib, tasdiqlash kodini oling
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={openTelegramBot}
                          className="mt-2 h-8 text-xs"
                        >
                          <ExternalLink className="mr-1 h-3 w-3" />
                          Telegram botni ochish
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-gray-700 dark:text-gray-300">
                      Tasdiqlash kodi
                    </Label>
                    <InputOTP
                      id="otp"
                      maxLength={4}
                      value={otpCode}
                      onChange={setOtpCode}
                      containerClassName="w-full"
                      className="mx-auto w-full"
                      disabled={isSubmitting}
                    >
                      <InputOTPGroup className="w-full justify-between">
                        <InputOTPSlot index={0} className="h-12 w-14 text-lg" />
                        <InputOTPSlot index={1} className="h-12 w-14 text-lg" />
                        <InputOTPSlot index={2} className="h-12 w-14 text-lg" />
                        <InputOTPSlot index={3} className="h-12 w-14 text-lg" />
                      </InputOTPGroup>
                    </InputOTP>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Telegram bot orqali yuborilgan 4 xonali kodni kiriting
                    </p>
                  </div>
                </>
              )}

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-full bg-gray-800 dark:bg-white text-base font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200"
                >
                  {otpSent ? (verifyOtpMutation.isPending ? "Tasdiqlanmoqda..." : "Tasdiqlash") : sendOtpMutation.isPending ? "Kod yuborilmoqda..." : "Kodni olish"}
                </Button>

                {otpSent && (
                  <div className="flex items-center justify-between text-sm">
                    <Button
                      type="button"
                      variant="ghost"
                      disabled={sendOtpMutation.isPending || isSubmitting}
                      onClick={() => {
                        sendOtpMutation.mutate(normalizedPhone)
                        openTelegramBot()
                      }}
                    >
                      Kodni qayta yuborish
                    </Button>
                    <Button type="button" variant="ghost" onClick={handleCancel} disabled={isSubmitting}>
                      Telefon raqamni o&apos;zgartirish
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}