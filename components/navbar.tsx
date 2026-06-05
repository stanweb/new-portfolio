"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useActiveSection } from "@/hooks/use-active-section"

const navigation = [
  { name: "About", href: "/#about", sectionId: "about" },
  { name: "Skills", href: "/#skills", sectionId: "skills" },
  { name: "Projects", href: "/#projects", sectionId: "projects" },
  { name: "Blog", href: "/blog", sectionId: null },
  { name: "Resume", href: "/resume", sectionId: null },
  { name: "Contact", href: "/#contact", sectionId: "contact" },
]

type NavItem = (typeof navigation)[number]

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const reduce = useReducedMotion()

  // Active section only applies on the home page where the section IDs exist.
  const isHome = pathname === "/"
  const sectionIds = navigation
    .map((n) => n.sectionId)
    .filter((id): id is string => typeof id === "string")
  const activeSection = useActiveSection(isHome ? sectionIds : [])

  // Shrink-on-scroll
  const { scrollY } = useScroll()
  const shrinkMv = useTransform(scrollY, [0, 80], [0, 1])
  const shrink = useSpring(shrinkMv, { stiffness: 200, damping: 30 })
  const navHeight = useTransform(shrink, [0, 1], [64, 52])
  const blurPx = useTransform(shrink, [0, 1], [8, 16])
  const blurFilter = useTransform(blurPx, (v) => `blur(${v}px)`)
  const borderOpacity = useTransform(shrink, [0, 1], [0, 1])

  // Mobile menu side effects
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)

    // Focus the first link
    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>("a")
    firstLink?.focus()

    return () => {
      document.body.style.overflow = original
      window.removeEventListener("keydown", onKey)
    }
  }, [mobileMenuOpen])

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Restore focus to trigger when menu closes
  useEffect(() => {
    if (!mobileMenuOpen) triggerRef.current?.focus({ preventScroll: true })
  }, [mobileMenuOpen])

  // Helper: is a nav item "active"?
  const isActive = (item: NavItem) => {
    if (isHome && item.sectionId) return activeSection === item.sectionId
    return pathname === item.href
  }

  return (
    <motion.nav
      style={{ height: reduce ? 64 : navHeight }}
      className="fixed top-0 w-full bg-background/70 border-b border-border/0 z-50"
    >
      <motion.div
        aria-hidden="true"
        style={{
          backdropFilter: reduce ? "blur(8px)" : blurFilter,
          WebkitBackdropFilter: reduce ? "blur(8px)" : blurFilter,
        }}
        className="absolute inset-0 bg-background/70 -z-10"
      />
      <motion.div
        aria-hidden="true"
        style={{ opacity: reduce ? 1 : borderOpacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-border"
      />

      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
              SM
            </div>
            <span className="text-lg font-semibold">Stanley Mutua</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive(item) ? "page" : undefined}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive(item) ? "text-primary" : "text-foreground/80"
                )}
              >
                {item.name}
                {isActive(item) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            {mounted && <ThemeToggle theme={theme} setTheme={setTheme} />}
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && <ThemeToggle theme={theme} setTheme={setTheme} />}
            <Button
              ref={triggerRef}
              variant="ghost"
              size="icon"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden absolute inset-x-0 top-full bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
        >
          <nav className="container mx-auto px-4 py-4">
            <ul className="flex flex-col gap-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item) ? "page" : undefined}
                    className={cn(
                      "block py-2.5 px-3 text-base font-medium rounded-md transition-colors hover:bg-muted",
                      isActive(item) ? "text-primary bg-primary/5" : "text-foreground/80"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </motion.nav>
  )
}

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: string | undefined
  setTheme: (t: string) => void
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="ml-1"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
