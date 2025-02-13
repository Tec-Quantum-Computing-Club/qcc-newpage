"use client"

import { DashboardLayout } from "@/components/DashboardLayout"
import { useState, useEffect } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface BlogPost {
  id: string
  title: string
  content: string
  createdAt: Date
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      })) as BlogPost[]
      setBlogPosts(posts)
    }

    fetchBlogPosts()
  }, [])

  return (
    <DashboardLayout>
      <div className="mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Blog Posts
        </h1>
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-400 mb-4">{post.createdAt.toLocaleDateString()}</p>
              <p className="text-gray-300">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

