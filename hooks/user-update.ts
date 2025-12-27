"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { profileApi, type UpdateProfileData } from "@/hooks/use-user-profile"

const PROFILE_QUERY_KEY = ["user", "profile"] as const

export const useProfile = () => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: profileApi.getProfile,
    retry: false,
  })
}

export const useUpdateProfile = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateProfileData) => profileApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY })
      toast({
        title: "Muvaffaqiyatli",
        description: "Profil ma'lumotlari yangilandi",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Xatolik",
        description: error.message,
        variant: "destructive",
      })
    },
  })
}