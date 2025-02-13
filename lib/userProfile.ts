import { db } from "./firebase"
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, type FieldValue } from "firebase/firestore"

export interface UserProfile {
  email: string
  nickname: string
  educationLevel: "bachelor" | "master" | "other"
  description: string
  tags: string[]
  gender: "male" | "female" | "other" | "prefer not to say"
  hasTeam: boolean
  teamId?: string
  createdAt: FieldValue
  updatedAt: FieldValue
}

export interface Team {
  id: string
  teamId: string
  name: string
  description: string
  captain: string
  teammates: string[]
  driveLinks: string[]
  complete: boolean
  createdAt: FieldValue
}

export interface Notification {
  id: string
  type: "TEAM_INVITATION"
  from: string
  to: string
  teamId: string
  teamName: string
  status: "pending" | "accepted" | "rejected"
  createdAt: FieldValue
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const docRef = doc(db, "userProfiles", userId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data() as UserProfile
  } else {
    return null
  }
}

export async function createUserProfile(
  userId: string,
  profile: Omit<UserProfile, "createdAt" | "updatedAt" | "hasTeam">,
): Promise<void> {
  const docRef = doc(db, "userProfiles", userId)
  await setDoc(docRef, {
    ...profile,
    hasTeam: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateUserProfile(
  userId: string,
  profile: Partial<Omit<UserProfile, "email" | "createdAt" | "updatedAt">>,
): Promise<void> {
  const docRef = doc(db, "userProfiles", userId)
  await updateDoc(docRef, {
    ...profile,
    updatedAt: serverTimestamp(),
  })
}

