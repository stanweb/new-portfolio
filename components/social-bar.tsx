"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter, Instagram } from "lucide-react"
import { motion } from "framer-motion"

export function SocialBar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-50 "
    >
      <Button variant="ghost" size="icon" asChild>
        <a href="https://github.com/stanweb/" target="_blank" rel="noopener noreferrer">
          <Github className="h-5 w-5" />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a href="https://www.linkedin.com/in/stanleykamau9928/" target="_blank" rel="noopener noreferrer">
          <Linkedin className="h-5 w-5" />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a href="https://x.com/mutua_kamau" target="_blank" rel="noopener noreferrer">
          <Twitter className="h-5 w-5" />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a href="https://www.instagram.com/mutua_kamau/" target="_blank" rel="noopener noreferrer">
          <Instagram className="h-5 w-5" />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a href="mailto:mutuastanley03@gmail.com" target="_blank" rel="noopener noreferrer">
          <Mail className="h-5 w-5" />
        </a>
      </Button>
    </motion.div>
  )
}
