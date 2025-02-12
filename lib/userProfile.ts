import { db } from "./firebase"
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore"

export interface UserProfile {
  email: string
  nickname: string
  educationLevel: "bachelor" | "master" | "other"
  description: string
  tags: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
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
  profile: Omit<UserProfile, "createdAt" | "updatedAt">,
): Promise<void> {
  const docRef = doc(db, "userProfiles", userId)
  const now = Timestamp.now()
  await setDoc(docRef, {
    ...profile,
    createdAt: now,
    updatedAt: now,
  })
}

export async function updateUserProfile(
  userId: string,
  profile: Partial<Omit<UserProfile, "email" | "createdAt" | "updatedAt">>,
): Promise<void> {
  const docRef = doc(db, "userProfiles", userId)
  await updateDoc(docRef, {
    ...profile,
    updatedAt: Timestamp.now(),
  })
}

