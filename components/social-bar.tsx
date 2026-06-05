"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SOCIALS, SOCIAL_BAR_IDS, type SocialId } from "@/lib/social"
import { useActiveSection } from "@/hooks/use-active-section"

export function SocialBar() {
  const reduce = useReducedMotion()
  const activeSection = useActiveSection(["contact"])
  const hidden = activeSection === "contact"

  return (
    <motion.aside
      aria-label="Social links"
      initial={reduce ? false : { opacity: 0, x: -20 }}
      animate={{
        opacity: hidden ? 0 : 1,
        x: hidden ? -20 : 0,
      }}
      transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 1 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 z-50"
    >
      <span
        aria-hidden="true"
        className="text-[10px] font-semibold tracking-[0.3em] text-muted-foreground select-none"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        CONNECT
      </span>

      <motion.span
        aria-hidden="true"
        initial={reduce ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: reduce ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top" }}
        className="block h-12 w-px bg-border"
      />

      <ul className="flex flex-col gap-4">
        {SOCIAL_BAR_IDS.map((id: SocialId) => {
          const social = SOCIALS[id]
          const Icon = social.icon
          return (
            <li key={id} className="group relative">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="transition-transform group-hover:-translate-y-0.5"
              >
                <a
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              </Button>

              <span
                role="tooltip"
                className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
              >
                {social.label}
              </span>
            </li>
          )
        })}
      </ul>
    </motion.aside>
  )
}
