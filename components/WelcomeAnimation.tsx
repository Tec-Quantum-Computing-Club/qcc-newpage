"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface WelcomeAnimationProps {
  userName: string
  onComplete: () => void
}

export default function WelcomeAnimation({ userName, onComplete }: WelcomeAnimationProps) {
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true)
      onComplete()
    }, 3000) // Adjust timing as needed

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome, {userName}!
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Let's set up your profile for the TecQC Hackathon
        </motion.p>
        {!showForm && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

