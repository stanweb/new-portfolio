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
import { NavClock } from "@/components/nav-clock"

const navigation = [
  { name: "About", href: "/#about", sectionId: "about", number: "01" },
  { name: "Skills", href: "/#skills", sectionId: "skills", number: "02" },
  { name: "Projects", href: "/#projects", sectionId: "projects", number: "03" },
  { name: "Experience", href: "/#experience", sectionId: "experience", number: "04" },
  { name: "Contact", href: "/#contact", sectionId: "contact", number: "05" },
  { name: "Blog", href: "/blog", sectionId: null, number: "06" },
]

type NavItem = (typeof navigation)[number]

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const reduce = useReducedMotion()

  const isHome = pathname === "/"
  const sectionIds = navigation
    .map((n) => n.sectionId)
    .filter((id): id is string => typeof id === "string")
  const activeSection = useActiveSection(isHome ? sectionIds : [])

  // Shrink-on-scroll
  const { scrollY, scrollYProgress } = useScroll()
  const shrinkMv = useTransform(scrollY, [0, 80], [0, 1])
  const shrink = useSpring(shrinkMv, { stiffness: 200, damping: 30 })
  const navHeight = useTransform(shrink, [0, 1], [64, 52])
  const blurPx = useTransform(shrink, [0, 1], [8, 16])
  const blurFilter = useTransform(blurPx, (v) => `blur(${v}px)`)
  const borderOpacity = useTransform(shrink, [0, 1], [0, 1])

  // Scroll progress rail
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.4 })
  const progressScale = useTransform(progress, (v) => v)

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

    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>("a")
    firstLink?.focus()

    return () => {
      document.body.style.overflow = original
      window.removeEventListener("keydown", onKey)
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileMenuOpen) triggerRef.current?.focus({ preventScroll: true })
  }, [mobileMenuOpen])

  const isActive = (item: NavItem) => {
    if (isHome && item.sectionId) return activeSection === item.sectionId
    if (pathname === item.href) return true
    // Match subroutes (e.g. /blog/my-post highlights "Blog").
    if (item.href !== "/" && pathname.startsWith(item.href + "/")) return true
    return false
  }

  const currentPageName = (() => {
    if (pathname === "/") return "Home"
    if (pathname.startsWith("/blog")) return "Blog"
    if (pathname.startsWith("/resume")) return "Resume"
    return null
  })()

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

      {/* Scroll progress rail */}
      <motion.div
        aria-hidden="true"
        style={{
          scaleX: reduce ? 0 : progressScale,
          transformOrigin: "0% 50%",
        }}
        className="absolute inset-x-0 bottom-0 h-[2px] bg-primary shadow-[0_0_10px_2px_color-mix(in_oklab,var(--primary)_45%,transparent)] z-10"
      />

      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <LogoMark onClick={() => setMobileMenuOpen(false)} reduce={!!reduce} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <NavLink key={item.name} item={item} active={isActive(item)} reduce={!!reduce} />
            ))}
            <div className="ml-2 flex items-center gap-2">
              {mounted && <ThemeToggle theme={theme} setTheme={setTheme} />}
              <NavClock />
            </div>
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
          <nav className="container mx-auto px-4 py-4" aria-label="Primary">
            {currentPageName && currentPageName !== "Home" && (
              <div className="px-3 pb-3 mb-2 border-b border-border/60 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Currently viewing
                </span>
                <span className="text-xs font-mono text-primary font-semibold">{currentPageName}</span>
              </div>
            )}
            <ul className="flex flex-col gap-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item) ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 py-2.5 px-3 text-base font-medium rounded-md transition-colors",
                      isActive(item)
                        ? "text-primary bg-primary/10"
                        : "text-foreground/80 hover:bg-muted"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-xs font-mono text-muted-foreground w-6">{item.number}</span>
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

function NavLink({ item, active, reduce }: { item: NavItem; active: boolean; reduce: boolean }) {
  const [hover, setHover] = useState(false)
  const showNumber = hover || active

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className={cn(
        "relative inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors",
        active
          ? "text-primary bg-primary/10 hover:bg-primary/15"
          : "text-foreground/80 hover:text-foreground hover:bg-muted/60"
      )}
    >
      <motion.span
        aria-hidden="true"
        className="font-mono text-[10px] tracking-wider text-muted-foreground/70 select-none overflow-hidden inline-block"
        initial={false}
        animate={
          reduce
            ? { width: showNumber ? "1.1em" : 0, opacity: showNumber ? 1 : 0 }
            : { width: showNumber ? "1.1em" : 0, opacity: showNumber ? 1 : 0 }
        }
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {item.number}
      </motion.span>
      <span className={cn("transition-colors", active && "font-semibold")}>{item.name}</span>
    </Link>
  )
}

function LogoMark({ onClick, reduce }: { onClick: () => void; reduce: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 hover:opacity-90 transition-opacity"
      onClick={onClick}
    >
      <div className="relative h-8 w-8">
        {/* Rotating conic ring */}
        <motion.span
          aria-hidden="true"
          className="absolute -inset-px rounded-md opacity-50 group-hover:opacity-100 transition-opacity"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, var(--primary) 60deg, transparent 120deg, transparent 240deg, color-mix(in oklab, var(--primary) 60%, transparent) 300deg, transparent 360deg)",
            mask: "radial-gradient(circle, transparent 55%, black 56%)",
            WebkitMask: "radial-gradient(circle, transparent 55%, black 56%)",
          }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={
            reduce
              ? undefined
              : { duration: 8, ease: "linear", repeat: Infinity }
          }
        />
        <div className="relative h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary text-sm font-bold ring-1 ring-primary/20">
          SM
        </div>
      </div>
      <span className="text-lg font-semibold">Stanley Mutua</span>
    </Link>
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
