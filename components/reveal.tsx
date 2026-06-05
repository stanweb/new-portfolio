"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { type ReactNode } from "react"

interface RevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  delay?: number
}

export function Reveal({ children, delay = 0, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-80px" }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
