"use client"

import { motion, useReducedMotion } from "framer-motion"
import { type ElementType, type ReactNode } from "react"
import { ScrambleText } from "@/components/scramble-text"

interface TextRevealProps {
  children: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  duration?: number
}

const EXPO = [0.22, 1, 0.36, 1] as const

export function TextReveal({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.05,
  duration = 0.6,
}: TextRevealProps) {
  const reduce = useReducedMotion()
  const words = children.split(" ")

  if (reduce) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="word-mask" aria-hidden="true">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration,
              ease: EXPO,
              delay: delay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </Tag>
  )
}

interface HeadingRevealProps {
  children: ReactNode
  className?: string
  /** When true and children is a string, use the scramble/decode effect. */
  scramble?: boolean
}

export function HeadingReveal({ children, className, scramble }: HeadingRevealProps) {
  const reduce = useReducedMotion()
  if (reduce) return <span className={className}>{children}</span>
  if (scramble && typeof children === "string") {
    return <ScrambleText className={className}>{children}</ScrambleText>
  }
  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EXPO }}
      >
        {children}
      </motion.span>
    </span>
  )
}
