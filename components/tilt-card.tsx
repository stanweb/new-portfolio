"use client"

import { useRef, type ReactNode } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring, useReducedMotion } from "framer-motion"

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max rotation in degrees. */
  max?: number
}

/**
 * Wraps a card with 3D tilt + a glow that tracks the cursor.
 * Children should render the card surface itself (with its own background).
 */
export function TiltCard({ children, className, max = 8 }: TiltCardProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const glow = useMotionValue(0)

  const srx = useSpring(rx, { stiffness: 180, damping: 18, mass: 0.4 })
  const sry = useSpring(ry, { stiffness: 180, damping: 18, mass: 0.4 })
  const sglow = useSpring(glow, { stiffness: 120, damping: 20 })

  const background = useMotionTemplate`radial-gradient(280px circle at ${mx}% ${my}%, color-mix(in oklab, var(--primary) 45%, transparent), transparent 70%)`

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width
        const py = (e.clientY - rect.top) / rect.height
        ry.set((px - 0.5) * max * 2)
        rx.set(-(py - 0.5) * max * 2)
        mx.set(px * 100)
        my.set(py * 100)
        glow.set(1)
      }}
      onMouseLeave={() => {
        rx.set(0)
        ry.set(0)
        glow.set(0)
      }}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className ?? ""}`}
    >
      {/* Conic neon edge that brightens on hover */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: sglow }}
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0"
      >
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, color-mix(in oklab, var(--primary) 60%, transparent), transparent 25%, color-mix(in oklab, var(--primary) 60%, transparent) 50%, transparent 75%, color-mix(in oklab, var(--primary) 60%, transparent))",
            filter: "blur(14px)",
          }}
        />
      </motion.div>

      {/* The actual card */}
      <div style={{ transform: "translateZ(20px)" }} className="relative">
        {children}
      </div>

      {/* Cursor-tracked highlight on top of the card */}
      <motion.div
        aria-hidden="true"
        style={{ background, opacity: sglow }}
        className="pointer-events-none absolute inset-0 rounded-xl mix-blend-overlay"
      />
    </motion.div>
  )
}