"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ParticleBackground from "@/components/particle-background"
import { FaGoogle, FaGithub } from "react-icons/fa"
import { registerUser, loginUser, signInWithGoogle, signInWithGithub, checkUserProfile } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleAuth = async (userId: string) => {
    const hasProfile = await checkUserProfile(userId)
    if (hasProfile) {
      router.push("/dashboard")
    } else {
      router.push("/onboarding")
    }
  }

  const handleSubmit = async (e: React.FormEvent, action: "login" | "register") => {
    e.preventDefault()
    setError("")
    try {
      let user
      if (action === "login") {
        user = await loginUser(email, password)
      } else {
        user = await registerUser(email, password)
      }
      await handleAuth(user.uid)
    } catch (err) {
      setError("Failed to authenticate. Please check your credentials.")
    }
  }

  const handleOAuthLogin = async (provider: "Google" | "GitHub") => {
    try {
      let user
      if (provider === "Google") {
        user = await signInWithGoogle()
      } else {
        user = await signInWithGithub()
      }
      await handleAuth(user.uid)
    } catch (err) {
      setError(`Failed to sign in with ${provider}.`)
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await handleAuth(user.uid)
      }
    })
    return () => unsubscribe()
  }, [handleAuth]) // Added handleAuth to dependencies

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      <ParticleBackground />
      <Card className="w-full max-w-md bg-black/50 border-purple-500/20 backdrop-blur-sm z-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Welcome to TecQC Hackathon
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black/30 border-purple-500/50"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-black/30 border-purple-500/50"
                />
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600/50 to-purple-600/50">
                  Log In
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={(e) => handleSubmit(e, "register")} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black/30 border-purple-500/50"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-black/30 border-purple-500/50"
                />
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600/50 to-purple-600/50">
                  Register
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleOAuthLogin("Google")}
                className="border-purple-500/50 hover:bg-purple-950"
              >
                <FaGoogle className="mr-2" /> Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleOAuthLogin("GitHub")}
                className="border-purple-500/50 hover:bg-purple-950"
              >
                <FaGithub className="mr-2" /> GitHub
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

