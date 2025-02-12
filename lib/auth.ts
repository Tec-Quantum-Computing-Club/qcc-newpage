import { auth } from "./firebase"
import { getUserProfile, createUserProfile } from "./userProfile"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  type User,
} from "firebase/auth"

export const registerUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // Create an empty user profile
    await createUserProfile(userCredential.user.uid, {
      email: email,
      nickname: "",
      educationLevel: "bachelor",
      description: "",
      tags: [],
    })
    return userCredential.user
  } catch (error) {
    console.error("Error registering user:", error)
    throw error
  }
}

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error("Error logging in:", error)
    throw error
  }
}

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth)
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

const signInWithProvider = async (provider: GoogleAuthProvider | GithubAuthProvider): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, provider)
    const userProfile = await getUserProfile(result.user.uid)
    if (!userProfile) {
      // Create an empty user profile if it doesn't exist
      await createUserProfile(result.user.uid, {
        email: result.user.email || "",
        nickname: "",
        educationLevel: "bachelor",
        description: "",
        tags: [],
      })
    }
    return result.user
  } catch (error) {
    console.error("Error signing in:", error)
    throw error
  }
}

export const signInWithGoogle = () => signInWithProvider(googleProvider)
export const signInWithGithub = () => signInWithProvider(githubProvider)

export const checkUserProfile = async (userId: string): Promise<boolean> => {
  const profile = await getUserProfile(userId)
  return profile !== null && profile.nickname !== ""
}

