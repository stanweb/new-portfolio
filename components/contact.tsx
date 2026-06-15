import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { SectionAnchor } from "@/components/section-anchor"
import { ScrambleText } from "@/components/scramble-text"
import { SOCIALS, CONTACT_SECTION_IDS } from "@/lib/social"

export function Contact() {
  const contacts = CONTACT_SECTION_IDS.map((id) => SOCIALS[id])

  return (
    <section id="contact" className="py-16 md:py-20 px-4 bg-muted/30">
      <div className="container max-w-4xl mx-auto">
        <div className="space-y-12">
          <Reveal className="text-center space-y-4">
            <SectionAnchor number="04" label="CONTACT" />
            <h2 className="text-3xl md:text-4xl font-bold">
              <ScrambleText>Get In Touch</ScrambleText>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interested in collaborating or discussing opportunities? Feel free to reach out.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4">
            {contacts.map((contact, index) => {
              const Icon = contact.icon
              return (
                <Reveal key={contact.id} delay={index * 0.1}>
                  <Card className="p-6 text-center hover:border-primary transition-colors group h-full">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mx-auto mb-4 h-12 w-12 group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                      asChild
                    >
                      <a
                        href={contact.href}
                        target={contact.external ? "_blank" : undefined}
                        rel={contact.external ? "noopener noreferrer" : undefined}
                        aria-label={contact.label}
                      >
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </a>
                    </Button>
                    <h3 className="font-semibold mb-2">{contact.label}</h3>
                    <p className="text-sm text-muted-foreground break-all">{contact.href.replace(/^https?:\/\//, "").replace(/^mailto:/, "")}</p>
                  </Card>
                </Reveal>
              )
            })}
          </div>

          <div className="text-center pt-8">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Stanley Mutua. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
