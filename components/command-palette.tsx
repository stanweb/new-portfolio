"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  FolderKanban, User, Wrench, Briefcase, Mail, Newspaper, FileText,
  Moon, Sun, Copy, Calendar, ArrowUp,
} from "lucide-react"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command"
import { SOCIALS } from "@/lib/social"
import { toast } from "sonner"

const SECTION_ITEMS = [
  { name: "Projects", href: "/#projects", icon: FolderKanban },
  { name: "About", href: "/#about", icon: User },
  { name: "Skills", href: "/#skills", icon: Wrench },
  { name: "Experience", href: "/#experience", icon: Briefcase },
  { name: "Contact", href: "/#contact", icon: Mail },
  { name: "Blog", href: "/blog", icon: Newspaper },
  { name: "Resume", href: "/resume", icon: FileText },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Allow other components (e.g. a navbar hint button) to open the palette.
  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener("open-command-palette", onOpen)
    return () => window.removeEventListener("open-command-palette", onOpen)
  }, [])

  const run = useCallback((fn: () => void) => {
    setOpen(false)
    fn()
  }, [])

  const navigate = (href: string) => run(() => router.push(href))

  const copyEmail = () =>
    run(() => {
      const email = SOCIALS.email.href.replace(/^mailto:/, "")
      navigator.clipboard
        .writeText(email)
        .then(() => toast.success("Email address copied", { description: email }))
        .catch(() => toast.error("Couldn't copy to clipboard"))
    })

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command palette"
      description="Jump to a section or run an action"
    >
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {SECTION_ITEMS.map((item) => (
            <CommandItem key={item.name} onSelect={() => navigate(item.href)}>
              <item.icon aria-hidden="true" />
              <span>{item.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => run(() => setTheme(theme === "dark" ? "light" : "dark"))}>
            {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            <span>Toggle theme</span>
          </CommandItem>
          <CommandItem onSelect={copyEmail}>
            <Copy aria-hidden="true" />
            <span>Copy email address</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => window.open(SOCIALS.calendar.href, "_blank", "noopener,noreferrer"))}>
            <Calendar aria-hidden="true" />
            <span>Book a call</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => window.scrollTo({ top: 0, behavior: "smooth" }))}>
            <ArrowUp aria-hidden="true" />
            <span>Back to top</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />
        <div className="px-2 py-2 text-right text-xs text-muted-foreground">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px]">
            ⌘K
          </kbd>{" "}
          to toggle ·{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px]">
            Esc
          </kbd>{" "}
          to close
        </div>
      </CommandList>
    </CommandDialog>
  )
}
