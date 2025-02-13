"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc, collection, query, where, getDocs, limit } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/DashboardLayout"
import CountdownTimer from "@/components/countdown-timer"
import { Plus } from "lucide-react"
import Link from "next/link"

interface UserProfile {
  nickname: string
  educationLevel: string
  description: string
  tags: string[]
  gender: string
  hasTeam: boolean
  teamId?: string
}

interface BlogPost {
  id: string
  title: string
  content: string
  createdAt: any
}

interface Team {
  id: string
  name: string
  description: string
  teammates: string[]
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])
  const [team, setTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const auth = getAuth()

  useEffect(() => {
    console.log("Dashboard component mounted")
    const fetchData = async (user: any) => {
      try {
        console.log("Starting data fetch for user:", user.uid)

        // Fetch user profile
        console.log("Fetching user profile...")
        const userProfileDoc = await getDoc(doc(db, "userProfiles", user.uid))
        if (!userProfileDoc.exists()) {
          console.log("User profile not found, redirecting to onboarding")
          router.push("/onboarding")
          return
        }
        const userProfileData = userProfileDoc.data() as UserProfile
        setProfile(userProfileData)
        console.log("User profile fetched successfully:", userProfileData)

        // Fetch team data if user has a team
        if (userProfileData.hasTeam && userProfileData.teamId) {
          console.log("Fetching team data...")
          const teamDoc = await getDoc(doc(db, "teamsCreated", userProfileData.teamId))
          if (teamDoc.exists()) {
            setTeam(teamDoc.data() as Team)
            console.log("Team data fetched successfully:", teamDoc.data())
          } else {
            console.log("Team document does not exist")
          }
        }

        // Fetch blog posts
        console.log("Fetching blog posts...")
        const postsQuery = query(collection(db, "blogPosts"), where("published", "==", true), limit(3))
        const postsSnap = await getDocs(postsQuery)
        const posts = postsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BlogPost[]
        setLatestPosts(posts)
        console.log("Blog posts fetched successfully:", posts)
      } catch (err: any) {
        console.error("Error fetching data:", err)
        setError(`An error occurred while fetching data: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated:", user.uid)
        fetchData(user)
      } else {
        console.log("No authenticated user, redirecting to auth page")
        router.push("/auth")
      }
    })

    return () => {
      console.log("Dashboard component unmounting")
      unsubscribe()
    }
  }, [router, auth])

  console.log("Rendering dashboard. Profile:", profile, "Team:", team, "Posts:", latestPosts)

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="w-16 h-16 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Time Left Card */}
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Time left:</CardTitle>
            </CardHeader>
            <CardContent>
              <CountdownTimer targetDate="2025-06-05" />
            </CardContent>
          </Card>

          {/* Current Team Card */}
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Current team</CardTitle>
            </CardHeader>
            <CardContent>
              {team ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">{team.name}</h3>
                  <p>{team.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {team.teammates.map((teammate, index) => (
                      <span key={index} className="px-3 py-1 text-sm rounded-full bg-primary text-primary-foreground">
                        {teammate}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="mb-4">You are not part of a team yet.</p>
                  <Button asChild>
                    <Link href="/dashboard/teams">Join or Create a Team</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Latest Updates Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Latest updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <Card key={post.id} className="bg-secondary">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3">{post.content}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-secondary col-span-3">
                <CardContent>
                  <p className="text-center py-4">No blog posts available at the moment.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {profile && !profile.hasTeam && (
          <Card className="bg-secondary text-center p-6">
            <CardContent className="space-y-4">
              <Plus className="w-12 h-12 mx-auto text-primary" />
              <p className="text-lg">It seems you don't have a team, create or join to a team!</p>
              <Button asChild>
                <Link href="/dashboard/teams">Find Your Team</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Logout Button */}
        <div className="flex justify-center">
          <Button onClick={() => auth.signOut()}>Logout</Button>
        </div>
      </div>
    </DashboardLayout>
  )
}

