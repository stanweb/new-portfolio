"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"

interface ScrambleTextProps {
  children: string
  className?: string
  /** Characters per second the scramble cycles through. */
  speed?: number
  /** How long (ms) each character takes to settle. */
  settleMs?: number
  /** Trigger when the element enters the viewport. */
  triggerOnView?: boolean
}

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________ΣΩΞΠΛΔ░▒▓01"

export function ScrambleText({
  children,
  className,
  speed = 30,
  settleMs = 700,
  triggerOnView = true,
}: ScrambleTextProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(triggerOnView ? "" : children)
  const [started, setStarted] = useState(!triggerOnView)

  // Trigger on viewport intersection
  useEffect(() => {
    if (!triggerOnView || started || reduce) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStarted(true)
            io.disconnect()
            break
          }
        }
      },
      { rootMargin: "-10% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [triggerOnView, started, reduce])

  // Run the scramble
  useEffect(() => {
    if (reduce) {
      setDisplay(children)
      return
    }
    if (!started) return

    const target = children
    const startTime = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const elapsed = now - startTime
      let out = ""
      let done = true
      for (let i = 0; i < target.length; i++) {
        const ch = target[i]
        if (ch === " " || ch === "\n") {
          out += ch
          continue
        }
        const charStart = i * (1000 / speed)
        const charEnd = charStart + settleMs
        if (elapsed >= charEnd) {
          out += ch
        } else if (elapsed >= charStart) {
          done = false
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        } else {
          done = false
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }
      }
      setDisplay(out)
      if (!done) raf = requestAnimationFrame(tick)
      else setDisplay(target)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [children, started, reduce, speed, settleMs])

  return (
    <span ref={ref} className={className} aria-label={children}>
      <span aria-hidden="true">{display || " ".repeat(children.length)}</span>
    </span>
  )
}