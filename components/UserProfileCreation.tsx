"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUserProfile, type UserProfile } from "@/lib/userProfile"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import WelcomeAnimation from "./WelcomeAnimation"

const AVAILABLE_TAGS = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "Machine Learning",
  "Data Science",
  "Quantum Computing",
  "Cybersecurity",
  "Cloud Computing",
  "Artificial Intelligence",
  "Blockchain",
  "IoT",
  "Mobile Development",
  "Web Development",
  "DevOps",
]

export default function UserProfileCreation() {
  const [showForm, setShowForm] = useState(false)
  const [nickname, setNickname] = useState("")
  const [educationLevel, setEducationLevel] = useState<"bachelor" | "master" | "other">("bachelor")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [gender, setGender] = useState<"male" | "female" | "other" | "prefer not to say">("prefer not to say")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!nickname || !educationLevel || !description || tags.length === 0) {
      setError("Please fill in all fields and select at least one tag.")
      return
    }

    try {
      const user = auth.currentUser
      if (!user) {
        setError("No user found. Please try logging in again.")
        return
      }

      const profile: Omit<UserProfile, "createdAt" | "updatedAt"> = {
        email: user.email || "",
        nickname,
        educationLevel,
        description,
        tags,
        gender,
      }

      await createUserProfile(user.uid, profile)
      router.push("/dashboard")
    } catch (err) {
      console.error("Error saving user profile:", err)
      setError("Failed to save profile. Please try again. If the problem persists, contact support.")
    }
  }

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag))
    } else if (tags.length < 7) {
      setTags([...tags, tag])
    }
  }

  if (!showForm) {
    return (
      <WelcomeAnimation userName={auth.currentUser?.displayName || "Hacker"} onComplete={() => setShowForm(true)} />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white pt-24 pb-8 px-4"
    >
      <Card className="w-full max-w-md mx-auto bg-gray-900 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Complete Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-300">
                Nickname
              </label>
              <Input
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="bg-gray-800 border-purple-500/50"
                placeholder="How would you like to be called?"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-300">
                Education Level
              </label>
              <Select onValueChange={(value: "bachelor" | "master" | "other") => setEducationLevel(value)}>
                <SelectTrigger className="bg-gray-800 border-purple-500/50">
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bachelor">Bachelor Student</SelectItem>
                  <SelectItem value="master">Master Student</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
                Gender
              </label>
              <Select onValueChange={(value: "male" | "female" | "other" | "prefer not to say") => setGender(value)}>
                <SelectTrigger className="bg-gray-800 border-purple-500/50">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer not to say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-800 border-purple-500/50"
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <label className="block text-sm font-medium text-gray-300 mb-2">Skills (max 7)</label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                  >
                    <Button
                      type="button"
                      variant={tags.includes(tag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTag(tag)}
                      className={tags.includes(tag) ? "bg-purple-500" : "border-purple-500/50"}
                    >
                      {tag}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600/50 to-purple-600/50">
                Save Profile
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

