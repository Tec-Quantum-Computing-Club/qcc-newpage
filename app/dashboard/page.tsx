"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { getAuth, signOut } from "firebase/auth"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"

interface UserProfile {
  nickname: string
  educationLevel: string
  description: string
  tags: string[]
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const auth = getAuth()

  useEffect(() => {
    const checkUserAndProfile = async () => {
      const user = auth.currentUser
      if (!user) {
        router.push("/auth")
        return
      }

      const docRef = doc(db, "userProfiles", user.uid)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        router.push("/onboarding")
        return
      }

      setProfile(docSnap.data() as UserProfile)
    }

    checkUserAndProfile()
  }, [router])

  const handleSignOut = async () => {
    await signOut(auth)
    router.push("/")
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)] mt-16">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white pt-24 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Welcome, {profile.nickname}!
        </h1>
        <div className="space-y-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Education Level</h2>
            <p className="text-gray-300">{profile.educationLevel}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">About Me</h2>
            <p className="text-gray-300">{profile.description}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-purple-900 text-purple-100 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="border-purple-500 text-purple-500 hover:bg-purple-950"
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}

