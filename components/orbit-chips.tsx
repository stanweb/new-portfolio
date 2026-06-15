"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion"

interface OrbitChip {
  label: string
  /** Normalised position on an elliptical orbit (rx, ry as fractions of viewport). */
  rx: number
  ry: number
  /** Phase offset in seconds so chips don't move in lockstep. */
  phase: number
  /** Orbit duration in seconds. */
  duration: number
  /** Optional rotation in degrees. */
  tilt?: number
}

const CHIPS: OrbitChip[] = [
  { label: "React",       rx: 0.42, ry: 0.18, phase: 0,   duration: 32, tilt: -4 },
  { label: "Next.js",     rx: 0.38, ry: 0.22, phase: 4,   duration: 36, tilt: 6 },
  { label: "Node.js",     rx: 0.45, ry: 0.16, phase: 9,   duration: 28, tilt: -8 },
  { label: "Spring Boot", rx: 0.40, ry: 0.20, phase: 14,  duration: 40, tilt: 3 },
  { label: "TypeScript",  rx: 0.44, ry: 0.15, phase: 19,  duration: 34, tilt: -2 },
  { label: "WordPress",   rx: 0.36, ry: 0.24, phase: 23,  duration: 38, tilt: 5 },
  { label: "CloudWatch",  rx: 0.46, ry: 0.17, phase: 6,   duration: 30, tilt: -6 },
  { label: "RAG",         rx: 0.41, ry: 0.19, phase: 11,  duration: 42, tilt: 4 },
]

/**
 * Sparse field of keyword chips that orbit the hero on independent elliptical
 * paths. Each chip uses two springs: one driven by a slow cyclic time value
 * (the orbit angle) and the other mapping that angle through cos/sin to x/y.
 * Reduced motion freezes each chip at its initial position.
 */
export function OrbitChips() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const size = useRef({ w: 1200, h: 800 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      size.current = { w: el.offsetWidth, h: el.offsetHeight }
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  if (reduce) {
    // Static fallback: a tasteful arc of chips in the upper portion of the hero.
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        {CHIPS.slice(0, 6).map((chip, i) => (
          <span
            key={chip.label}
            className="orbit-chip"
            style={{
              top: `${10 + (i % 3) * 14}%`,
              left: `${8 + i * 14}%`,
              opacity: 0.6,
            }}
          >
            {chip.label}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
    >
      {CHIPS.map((chip) => (
        <OrbitingChip key={chip.label} chip={chip} sizeRef={size} />
      ))}
    </div>
  )
}

function OrbitingChip({ chip, sizeRef }: { chip: OrbitChip; sizeRef: React.MutableRefObject<{ w: number; h: number }> }) {
  // A single time value driving the orbit; cos/sin map it to x/y.
  const t = useMotionValue(0)
  const start = useRef<number | null>(null)

  useEffect(() => {
    let raf = 0
    const tick = (now: number) => {
      if (start.current === null) start.current = now
      const elapsed = ((now - start.current) / 1000 + chip.phase) % chip.duration
      const angle = (elapsed / chip.duration) * Math.PI * 2
      t.set(angle)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [chip.duration, chip.phase, t])

  // Centre of the orbit is the centre of the hero; chips orbit around it.
  const x = useTransform(t, (a) => Math.cos(a) * chip.rx * sizeRef.current.w)
  const y = useTransform(t, (a) => Math.sin(a) * chip.ry * sizeRef.current.h)
  const opacity = useTransform(t, (a) => 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(a + chip.phase)))

  return (
    <motion.span
      className="orbit-chip"
      style={{
        x,
        y,
        opacity,
        left: "50%",
        top: "50%",
        rotate: chip.tilt ?? 0,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {chip.label}
    </motion.span>
  )
}
