import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { SectionAnchor } from "@/components/section-anchor"
import { SOCIALS, CONTACT_SECTION_IDS } from "@/lib/social"
import { cn } from "@/lib/utils"
import { ContactForm } from "@/components/contact-form"
import { ArrowRight, Clock, MapPin, Target } from "lucide-react"

export function Contact() {
  const contacts = CONTACT_SECTION_IDS.map((id) => SOCIALS[id])

  return (
    <section id="contact" className="py-16 md:py-20 px-4 bg-muted/30">
      <div className="container max-w-5xl mx-auto">
        <div className="space-y-12">
          <Reveal className="text-center space-y-4">
            <SectionAnchor number="07" label="CONTACT" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interested in collaborating or discussing opportunities? I typically respond within 24 hours.
            </p>
          </Reveal>

          {/* What I'm looking for */}
          <Reveal delay={0.05}>
            <Card className="p-6 md:p-8 border-2 bg-background/80 backdrop-blur-sm border-primary/20">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <Target className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-medium">What I&apos;m looking for</div>
                </div>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  Senior Frontend or Full-Stack roles in fintech, healthtech, or high-growth startups.
                  Open to remote within EMEA / APAC time zones. Currently based in Nairobi, Kenya.
                </p>
              </div>
            </Card>
          </Reveal>

          {/* Availability bar */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>Next availability: <span className="text-foreground font-medium">Open immediately</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>Location: <span className="text-foreground font-medium">Nairobi, Kenya (Remote-friendly)</span></span>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contacts.map((contact, index) => {
              const Icon = contact.icon
              const isCalendar = contact.id === "calendar"
              return (
                <Reveal key={contact.id} delay={index * 0.1}>
                  <Card
                    className={cn(
                      "p-6 text-center hover:border-primary transition-colors group h-full",
                      isCalendar && "border-primary/30 bg-primary/5"
                    )}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "mx-auto mb-4 h-12 w-12 transition-colors",
                        isCalendar
                          ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                          : "group-hover:bg-primary/10 group-hover:text-primary"
                      )}
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
                    <h3 className="font-semibold mb-1">{contact.label}</h3>
                    <p className="text-sm text-muted-foreground break-all mb-3">
                      {contact.href.replace(/^https?:\/\//, "").replace(/^mailto:/, "")}
                    </p>
                    {isCalendar && (
                      <Button size="sm" className="mt-1 group/btn" asChild>
                        <a href={contact.href} target="_blank" rel="noopener noreferrer">
                          Schedule 30 min
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </a>
                      </Button>
                    )}
                  </Card>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.15}>
            <Card className="p-6 md:p-8 border-2 bg-background/80 backdrop-blur-sm max-w-2xl mx-auto border-primary/10 shadow-sm">
              <h3 className="text-lg font-semibold mb-1">Send a message</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Prefer email? Your draft opens in your mail client — nothing passes through a server.
              </p>
              <ContactForm />
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
