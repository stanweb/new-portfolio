"use client"

import { useState } from "react"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface CaseStudySectionProps {
  problem?: string
  role?: string
  outcome?: string
  metrics?: { label: string; value: string }[]
}

export function CaseStudySection({ problem, role, outcome, metrics }: CaseStudySectionProps) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  const hasAny = Boolean(problem || role || outcome || (metrics && metrics.length > 0))
  if (!hasAny) return null

  return (
    <div className="pt-2">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="case-study-panel"
        className="px-2 -ml-2 text-muted-foreground hover:text-foreground"
      >
        <motion.span
          aria-hidden="true"
          animate={reduce ? undefined : { rotate: open ? 180 : 0 }}
          transition={reduce ? undefined : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
        <span className="ml-1">{open ? "Hide" : "View"} case study</span>
      </Button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="case-study-panel"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={reduce ? undefined : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-4 border-t border-border space-y-4 text-sm md:text-base">
              {(problem || role) && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {problem && (
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                        Problem
                      </div>
                      <p className="text-foreground/90 leading-relaxed">{problem}</p>
                    </div>
                  )}
                  {role && (
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                        My role
                      </div>
                      <p className="text-foreground/90 leading-relaxed">{role}</p>
                    </div>
                  )}
                </div>
              )}

              {outcome && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                    Outcome
                  </div>
                  <p className="text-foreground/90 leading-relaxed">{outcome}</p>
                </div>
              )}

              {metrics && metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {metrics.map((m) => (
                    <div key={m.label} className="text-center sm:text-left">
                      <div className="text-xl md:text-2xl font-bold text-primary leading-none">
                        {m.value}
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
