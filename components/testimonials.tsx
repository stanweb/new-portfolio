import { Card } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"
import { SectionAnchor } from "@/components/section-anchor"
import { ScrambleText } from "@/components/scramble-text"
import { getTestimonials } from "@/lib/api"

export async function Testimonials() {
  const testimonials = await getTestimonials()

  return (
    <section id="testimonials" className="py-16 md:py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <Reveal className="space-y-4 mb-12 text-center">
          <SectionAnchor number="06" label="TESTIMONIALS" />
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            <ScrambleText>What people say</ScrambleText>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Feedback from people I&apos;ve shipped with. (Placeholders — swap with real quotes when you have them.)
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <Reveal key={`${t.author}-${index}`} delay={index * 0.15}>
              <Card className="p-6 md:p-8 border-2 bg-background/80 backdrop-blur-sm h-full flex flex-col">
                <span
                  aria-hidden="true"
                  className="block text-5xl leading-none text-primary/30 font-serif mb-2 select-none"
                >
                  &ldquo;
                </span>
                <blockquote className="text-base md:text-lg leading-relaxed text-foreground/90 flex-1">
                  {t.quote}
                </blockquote>
                <footer className="mt-6 pt-4 border-t border-border">
                  <div className="font-semibold text-sm">{t.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {t.role} · {t.company}
                  </div>
                </footer>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
