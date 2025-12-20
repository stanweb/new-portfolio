"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin } from "lucide-react"

export function Contact() {
  const contacts = [
    {
      icon: Mail,
      label: "Email",
      value: "mutuastanley03@gmail.com",
      href: "mailto:mutuastanley03@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "https://github.com/stanweb/",
      href: "https://github.com/stanweb",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "https://www.linkedin.com/in/stanleykamau9928/",
      href: "https://www.linkedin.com/in/stanleykamau9928/",
    },
  ]

  return (
    <section id="contact" className="py-24 md:py-32 px-4 bg-muted/30">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interested in collaborating or discussing opportunities? Feel free to reach out.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:border-primary transition-colors group">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mx-auto mb-4 h-12 w-12 group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                    asChild
                  >
                    <a href={contact.href} target="_blank" rel="noopener noreferrer">
                      <contact.icon className="h-6 w-6" />
                    </a>
                  </Button>
                  <h3 className="font-semibold mb-2">{contact.label}</h3>
                  <p className="text-sm text-muted-foreground break-all">{contact.value}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-8">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Stanley Mutua. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
