"use client"

import { useState, useEffect } from "react"
import type { User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { checkUserProfile } from "@/lib/auth"

interface AuthState {
  user: User | null
  loading: boolean
  hasProfile: boolean | null
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    hasProfile: null,
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const hasProfile = await checkUserProfile(user.uid)
        setState({ user, loading: false, hasProfile })
      } else {
        setState({ user: null, loading: false, hasProfile: null })
      }
    })

    return () => unsubscribe()
  }, [])

  return state
}

