"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { checkUserProfile } from "@/lib/auth"
import UserProfileCreation from "@/components/UserProfileCreation"

export default function OnboardingPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const user = auth.currentUser
      if (!user) {
        router.push("/auth")
        return
      }

      const hasProfile = await checkUserProfile(user.uid)
      if (hasProfile) {
        router.push("/dashboard")
      } else {
        setLoading(false)
      }
    }

    checkUser()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    )
  }

  return <UserProfileCreation />
}

