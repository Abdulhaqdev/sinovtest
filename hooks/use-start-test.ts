"use client"

import { useMutation } from "@tanstack/react-query"
import { CheckAnswersRequest, testApi, type StartTestRequest } from "@/lib/test-api"
import { useToast } from "@/hooks/use-toast"

export const useStartTest = () => {
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: StartTestRequest) => testApi.startTest(data),
    onError: (error: Error) => {
      toast({
        title: "Xatolik",
        description: error.message,
        variant: "destructive",
      })
    },
  })
}
export const useCheckAnswers = () => {
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: CheckAnswersRequest) => testApi.checkAnswers(data),
    onError: (error: Error) => {
      toast({
        title: "Xatolik",
        description: error.message,
        variant: "destructive",
      })
    },
  })
}