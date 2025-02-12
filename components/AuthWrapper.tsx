"use client"

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"
import { checkUserProfile } from "@/lib/auth"

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [hasProfile, setHasProfile] = useState<boolean | null>(null)

  useEffect(() => {
    const checkProfile = async () => {
      if (user) {
        const profileExists = await checkUserProfile(user.uid)
        setHasProfile(profileExists)
        if (!profileExists) {
          router.push("/onboarding")
        }
      } else {
        router.push("/auth")
      }
    }

    if (!loading) {
      checkProfile()
    }
  }, [user, loading, router])

  if (loading || hasProfile === null) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!user || !hasProfile) {
    return null
  }

  return <>{children}</>
}

