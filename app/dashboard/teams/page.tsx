"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAvailableUsers, createTeam } from "@/lib/teams"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DashboardLayout } from "@/components/DashboardLayout"
import { UserPlus, Users, CheckCircle2, Search } from "lucide-react"
import { auth } from "@/lib/firebase"

type View = "options" | "create" | "join"

interface User {
  id: string
  profile: {
    nickname: string
    educationLevel: string
    description: string
    tags: string[]
    email: string
  }
}

export default function TeamsPage() {
  const [view, setView] = useState<View>("options")
  const [availableUsers, setAvailableUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [teamName, setTeamName] = useState("")
  const [teamDescription, setTeamDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      if (view === "create") {
        setIsLoading(true)
        setError(null)
        try {
          const currentUser = auth.currentUser
          if (!currentUser) {
            throw new Error("No authenticated user found")
          }
          const users = await getAvailableUsers(currentUser.uid)
          setAvailableUsers(users)
          setFilteredUsers(users)
        } catch (err) {
          setError("Failed to fetch available users. Please try again.")
          console.error("Error fetching users:", err)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchUsers()
  }, [view])

  useEffect(() => {
    const filtered = availableUsers.filter((user) =>
      user.profile.nickname.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredUsers(filtered)
  }, [searchQuery, availableUsers])

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = auth.currentUser
    if (!user || !user.email) return

    setIsLoading(true)
    setError(null)
    try {
      const teammateEmails = selectedUsers
        .map((userId) => {
          const user = availableUsers.find((u) => u.id === userId)
          return user ? user.profile.email : ""
        })
        .filter((email) => email !== "")

      await createTeam(teamName, teamDescription, user.uid, user.email, teammateEmails)
      router.push("/dashboard")
    } catch (err) {
      setError("Failed to create team. Please try again.")
      console.error("Error creating team:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  if (view === "options") {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold">Teams</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="bg-secondary cursor-pointer hover:bg-secondary/80 transition-colors"
              onClick={() => setView("create")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-6 w-6" />
                  Create Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Start your own team and invite others to join you.</p>
              </CardContent>
            </Card>
            <Card
              className="bg-secondary cursor-pointer hover:bg-secondary/80 transition-colors"
              onClick={() => setView("join")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  Join Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Browse available teams and request to join them.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (view === "create") {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          <Button onClick={() => setView("options")} variant="ghost">
            ← Back to options
          </Button>

          <h1 className="text-4xl font-bold">Create a Team</h1>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleCreateTeam} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="teamName" className="text-sm font-medium">
                Team Name
              </label>
              <Input
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="bg-secondary"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="teamDescription" className="text-sm font-medium">
                Team Description
              </label>
              <Textarea
                id="teamDescription"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                className="bg-secondary"
                required
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Available Members</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by nickname"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary"
                />
              </div>
              {isLoading ? (
                <p>Loading available users...</p>
              ) : filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredUsers.map((user) => (
                    <Card
                      key={user.id}
                      className={`bg-secondary cursor-pointer transition-colors ${
                        selectedUsers.includes(user.id) ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => toggleUserSelection(user.id)}
                    >
                      <CardContent className="p-4 relative">
                        {selectedUsers.includes(user.id) && (
                          <CheckCircle2 className="absolute top-2 right-2 text-primary" />
                        )}
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-primary/20" />
                          <div>
                            <h3 className="font-medium">{user.profile.nickname}</h3>
                            <p className="text-sm text-muted-foreground">{user.profile.educationLevel}</p>
                          </div>
                        </div>
                        <p className="mt-2 text-sm line-clamp-2">{user.profile.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {user.profile.tags.map((tag: string) => (
                            <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p>No available users found.</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Team..." : "Create Team"}
            </Button>
          </form>
        </div>
      </DashboardLayout>
    )
  }

  // Join team view (to be implemented)
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <Button onClick={() => setView("options")} variant="ghost">
          ← Back to options
        </Button>
        <h1 className="text-4xl font-bold">Join a Team</h1>
        {/* Implementation for joining teams will go here */}
      </div>
    </DashboardLayout>
  )
}

