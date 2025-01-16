'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Cpu, Users, Trophy, Calendar, ArrowRight } from 'lucide-react'
import ParticleBackground from "@/components/particle-background"
import CountdownTimer from "@/components/countdown-timer"
import ScrambleText from "@/components/scramble-text"

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95 }}
          className="text-center z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            <ScrambleText text="TecQC Hackathon" />
          </h1>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            <ScrambleText text="2025" />
          </h1>

          <p className="text-xl md:text-2xl text-gray-300">
            First on-site Quantum Computing Hackathon in Mexico.
          </p>
          <p className="text-xl md:text-1xl text-gray-300">
          Join us for a weekend of innovation and learning!
          </p>
          <CountdownTimer targetDate="2025-06-05" />
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button size="lg" className="bg-gradient-to-r from-blue-600/50 to-purple-600/50 cursor-not-allowed opacity-50" disabled>
              Register Now
              <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-950">
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Why Join Our Quantum Revolution?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/50 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 mb-4 text-purple-500" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    title: "Quantum Workshops",
    description: "Learn from industry experts about quantum computing principles and practical applications.",
    icon: Cpu
  },
  {
    title: "Team Building",
    description: "Connect with like-minded innovators and form teams to tackle quantum challenges.",
    icon: Users
  },
  {
    title: "Amazing Prizes",
    description: "Win exciting prizes and opportunities to further your quantum computing journey.",
    icon: Trophy
  },
  {
    title: "48 Hour Sprint",
    description: "Two days of intensive coding, learning, and breakthrough moments.",
    icon: Calendar
  }
]

