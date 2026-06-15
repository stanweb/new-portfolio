import { Github, Linkedin, Mail, Twitter, Instagram, Calendar, type LucideIcon } from "lucide-react"

export type SocialId = "github" | "linkedin" | "twitter" | "instagram" | "email" | "calendar"

export interface SocialLink {
  id: SocialId
  label: string
  href: string
  icon: LucideIcon
  external: boolean
}

export const SOCIALS: Record<SocialId, SocialLink> = {
  github: {
    id: "github",
    label: "GitHub",
    href: "https://github.com/stanweb",
    icon: Github,
    external: true,
  },
  linkedin: {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/stanleykamau9928/",
    icon: Linkedin,
    external: true,
  },
  twitter: {
    id: "twitter",
    label: "Twitter",
    href: "https://x.com/mutua_kamau",
    icon: Twitter,
    external: true,
  },
  instagram: {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/mutua_kamau/",
    icon: Instagram,
    external: true,
  },
  email: {
    id: "email",
    label: "Email",
    href: "mailto:mutualstanley03@gmail.com",
    icon: Mail,
    external: false,
  },
  calendar: {
    id: "calendar",
    label: "Book a Call",
    href: "https://cal.com/stan-mutua-k7ingl",
    icon: Calendar,
    external: true,
  },
}

export const SOCIAL_BAR_IDS: SocialId[] = ["github", "linkedin", "twitter", "instagram", "email"]
export const HERO_SOCIAL_IDS: SocialId[] = ["github", "linkedin", "email"]
export const CONTACT_SECTION_IDS: SocialId[] = ["calendar", "email", "github", "linkedin"]
