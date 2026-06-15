"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

/**
 * Small mono clock + locale chip for the navbar. Updates every second.
 * Renders nothing on the server to avoid hydration jitter, and respects reduced motion.
 */
export function NavClock() {
  const reduce = useReducedMotion()
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    if (reduce) return
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [reduce])

  if (!now) return null

  const hh = String(now.getHours()).padStart(2, "0")
  const mm = String(now.getMinutes()).padStart(2, "0")
  const ss = String(now.getSeconds()).padStart(2, "0")

  return (
    <div
      className="hidden xl:flex items-center gap-2 text-[10px] font-mono tracking-widest text-muted-foreground/80 pl-3 ml-1 border-l border-border/60"
      aria-hidden="true"
    >
      <span className="text-primary/80">●</span>
      <span>
        {hh}:{mm}
        <span className="text-muted-foreground/40">:{ss}</span>
      </span>
      <span className="text-muted-foreground/40">/</span>
      <span>NBO</span>
    </div>
  )
}
