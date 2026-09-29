"use client"

import { motion, useReducedMotion } from "framer-motion"

interface OrbitChip {
  label: string
  /** Normalised final position (fractions of the hero container). */
  x: number
  y: number
  /** Optional rotation in degrees. */
  tilt?: number
  /** Entrance stagger offset. */
  delay: number
}

const CHIPS: OrbitChip[] = [
  { label: "React",       x: 0.14, y: 0.20, tilt: -4, delay: 0.0 },
  { label: "Next.js",     x: 0.80, y: 0.16, tilt: 6,  delay: 0.05 },
  { label: "Node.js",     x: 0.08, y: 0.62, tilt: -8, delay: 0.1 },
  { label: "Spring Boot", x: 0.86, y: 0.58, tilt: 3,  delay: 0.15 },
  { label: "TypeScript",  x: 0.22, y: 0.85, tilt: -2, delay: 0.2 },
  { label: "WordPress",   x: 0.72, y: 0.84, tilt: 5,  delay: 0.25 },
  { label: "CloudWatch",  x: 0.30, y: 0.08, tilt: -6, delay: 0.3 },
  { label: "RAG",         x: 0.64, y: 0.10, tilt: 4,  delay: 0.35 },
]

const EXPO = [0.22, 1, 0.36, 1] as const

/**
 * Static field of keyword chips positioned around the hero. Each chip gets a
 * single staggered entrance (fade + slight rise) — no perpetual motion, per
 * the motion budget (aurora is the only ambient animation in the hero).
 */
export function OrbitChips() {
  const reduce = useReducedMotion()

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      {CHIPS.map((chip) => (
        <motion.span
          key={chip.label}
          className="orbit-chip"
          style={{
            left: `${chip.x * 100}%`,
            top: `${chip.y * 100}%`,
            rotate: chip.tilt ?? 0,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={reduce ? { opacity: 0.55 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 0.55, y: 0 }}
          transition={
            reduce
              ? { duration: 0.01 }
              : { duration: 0.7, ease: EXPO, delay: 1.0 + chip.delay }
          }
        >
          {chip.label}
        </motion.span>
      ))}
    </div>
  )
}
