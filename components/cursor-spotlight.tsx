"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion, useMotionTemplate } from "framer-motion"

export function CursorSpotlight() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  // Don't render on touch / coarse-pointer devices
  useEffect(() => {
    if (reduce) return
    const mq = window.matchMedia("(pointer: fine)")
    setEnabled(mq.matches)
    const onChange = () => setEnabled(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [reduce])

  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [enabled, x, y])

  const background = useMotionTemplate`radial-gradient(360px circle at ${sx}px ${sy}px, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)`

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-30 mix-blend-soft-light"
    />
  )
}