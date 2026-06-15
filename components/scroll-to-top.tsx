"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollToTopProps {
  /** Pixels scrolled before the button appears. */
  threshold?: number
  className?: string
}

export function ScrollToTop({ threshold = 400, className }: ScrollToTopProps) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Scroll to top"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduce ? undefined : { y: -2 }}
          whileTap={reduce ? undefined : { scale: 0.92 }}
          className={cn(
            "fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full",
            "bg-primary text-primary-foreground",
            "shadow-lg shadow-primary/30",
            "ring-1 ring-primary/40",
            "flex items-center justify-center",
            "hover:shadow-xl hover:shadow-primary/40 transition-shadow",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
