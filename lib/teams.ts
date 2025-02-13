import { db } from "./firebase"
import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import type { Team, Notification, UserProfile } from "./userProfile"

function generateTeamId(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export async function createTeam(
  name: string,
  description: string,
  captainId: string,
  captainEmail: string,
  teammateEmails: string[],
): Promise<string> {
  const teamId = generateTeamId()

  const teamData = {
    teamId: teamId,
    name,
    description,
    captain: captainEmail,
    teammates: teammateEmails,
    driveLinks: [],
    complete: false,
    createdAt: serverTimestamp(),
  }

  const teamRef = await addDoc(collection(db, "teamsCreated"), teamData)

  // Update captain's profile
  const userRef = doc(db, "userProfiles", captainId)
  await updateDoc(userRef, {
    hasTeam: true,
    teamId: teamRef.id,
    updatedAt: serverTimestamp(),
  })

  // Update teammates' profiles
  for (const email of teammateEmails) {
    const q = query(collection(db, "userProfiles"), where("email", "==", email))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (document) => {
      await updateDoc(doc(db, "userProfiles", document.id), {
        hasTeam: true,
        teamId: teamRef.id,
        updatedAt: serverTimestamp(),
      })
    })
  }

  return teamRef.id
}

export async function getAvailableUsers(currentUserId: string): Promise<Array<{ id: string; profile: UserProfile }>> {
  try {
    const q = query(
      collection(db, "userProfiles"),
      where("hasTeam", "==", false),
      where("__name__", "!=", currentUserId),
    )
    const querySnapshot = await getDocs(q)
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      profile: doc.data() as UserProfile,
    }))
    console.log("Available users:", users)
    return users
  } catch (error) {
    console.error("Error fetching available users:", error)
    throw error
  }
}

export async function getTeam(teamId: string): Promise<Team | null> {
  const docRef = doc(db, "teamsCreated", teamId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Team
  }
  return null
}

export async function createNotification(
  fromUserId: string,
  toUserId: string,
  teamId: string,
  teamName: string,
): Promise<void> {
  await addDoc(collection(db, "notifications"), {
    type: "TEAM_INVITATION",
    from: fromUserId,
    to: toUserId,
    teamId,
    teamName,
    status: "pending",
    createdAt: serverTimestamp(),
  })
}

export async function getNotifications(userId: string): Promise<Notification[]> {
  const q = query(collection(db, "notifications"), where("to", "==", userId), where("status", "==", "pending"))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Notification[]
}

