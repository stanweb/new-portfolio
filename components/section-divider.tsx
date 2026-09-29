"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"

interface SectionDividerProps {
  className?: string
}

/**
 * SVG divider whose path draws in as you scroll past it. Sits between
 * sections — its width spans the container, with a glowing dot at the head.
 */
export function SectionDivider({ className }: SectionDividerProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 30%"],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const dotX = useTransform(pathLength, (v) => `${v * 100}%`)
  const dotOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])

  return (
    <div
      ref={ref}
      className={`relative h-12 w-full max-w-3xl mx-auto px-4 ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 24"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="divider-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0 12 Q 150 0 300 12 T 600 12"
          fill="none"
          stroke="url(#divider-grad)"
          strokeWidth="1.2"
          strokeLinecap="round"
          style={{
            pathLength: reduce ? 1 : pathLength,
          }}
        />
      </svg>
      <motion.span
        style={{
          left: reduce ? "100%" : dotX,
          opacity: reduce ? 0.6 : dotOpacity,
        }}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_4px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
      />
    </div>
  )
}