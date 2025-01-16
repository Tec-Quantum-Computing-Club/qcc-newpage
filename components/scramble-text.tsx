'use client'

import { useState, useEffect } from 'react'

interface ScrambleTextProps {
  text: string
  className?: string
}

export default function ScrambleText({ text, className }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('')
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'

  useEffect(() => {
    let currentIndex = 0
    let iterations = 0
    const maxIterations = 8 // Changed from 15

    const interval = setInterval(() => {
      setDisplayText(() => {
        const scrambled = text.split('').map((char, index) => {
          if (index < currentIndex) {
            return text[index]
          }
          if (char === ' ') {
            return ' '
          }
          return characters[Math.floor(Math.random() * characters.length)]
        }).join('')

        if (iterations >= maxIterations) {
          iterations = 0
          currentIndex++
        } else {
          iterations++
        }

        if (currentIndex >= text.length) {
          clearInterval(interval)
          return text
        }

        return scrambled
      })
    }, 30) // Changed from 50

    return () => clearInterval(interval)
  }, [text])

  return <span className={className}>{displayText}</span>
}

