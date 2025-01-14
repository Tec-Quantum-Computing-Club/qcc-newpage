'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface CountdownTimerProps {
  targetDate: string
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <Card key={unit} className="bg-black/50 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <motion.div
              key={value}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-purple-500">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-400 capitalize">{unit}</div>
            </motion.div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

