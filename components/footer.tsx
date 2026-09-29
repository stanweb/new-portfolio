import Link from "next/link"
import { SOCIALS, SOCIAL_BAR_IDS } from "@/lib/social"

const SITEMAP = [
  { name: "About", href: "/#about" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Skills", href: "/#skills" },
  { name: "Contact", href: "/#contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center text-primary text-xs font-bold ring-1 ring-primary/20">
                SK
              </div>
              <span className="font-semibold">Stanley Kamau</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Software Engineer shipping production systems with React, Next.js, and Spring Boot.
            </p>
          </div>

          <nav aria-label="Footer">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              Sitemap
            </div>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
              {SITEMAP.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              Elsewhere
            </div>
            <ul className="space-y-2">
              {SOCIAL_BAR_IDS.map((id) => {
                const social = SOCIALS[id]
                const Icon = social.icon
                return (
                  <li key={id}>
                    <a
                      href={social.href}
                      target={social.external ? "_blank" : undefined}
                      rel={social.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {social.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Stanley Kamau. All rights reserved.
          </p>
          <p className="text-xs font-mono text-muted-foreground/70">
            Lighthouse 98+ · Core Web Vitals · Next.js 16 · Tailwind CSS 4 · Nairobi, Kenya
          </p>
        </div>
      </div>
    </footer>
  )
}
