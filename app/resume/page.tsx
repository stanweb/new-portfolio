import { Navbar } from "@/components/navbar"
import { PrintButton } from "@/components/print-button"
import { ResumeLive } from "@/components/resume-live"
import { getResume } from "@/lib/api"
import { LIVE_SOURCES } from "@/lib/config"
import { SITE_URL } from "@/lib/constants"
import { Metadata } from "next"
import { Mail, Phone, MapPin, Github, Linkedin, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Resume",
  description: "Stanley Kamau — Software Engineer resume and experience.",
  alternates: { canonical: `${SITE_URL}/resume` },
}

const resumeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Stanley Kamau",
    jobTitle: "Software Engineer — Frontend & Systems",
    email: "mailto:mutualstanley03@gmail.com",
    telephone: "+254748891859",
    address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
    url: `${SITE_URL}/resume`,
    sameAs: [
      "https://github.com/stanweb",
      "https://www.linkedin.com/in/stanleykamau9928/",
    ],
    knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "System Design", "Frontend Performance"],
  },
}

export default async function ResumePage() {
  const initialContent = await getResume()

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeJsonLd) }}
      />
      <Navbar />
      <main className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-end mb-4 print:hidden">
            <PrintButton />
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <aside className="resume-sidebar hidden lg:block space-y-6 print:hidden">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 rounded-xl border bg-card shadow-sm">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold mb-4">
                    SK
                  </div>
                  <h2 className="text-xl font-bold">Stanley Kamau</h2>
                  <p className="text-sm text-muted-foreground mt-1">Software Engineer — Frontend &amp; Systems</p>

                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      Nairobi, Kenya (Remote-friendly)
                    </div>
                    <a href="mailto:mutualstanley03@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      mutualstanley03@gmail.com
                    </a>
                    <a href="tel:+254748891859" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      +254 748 891 859
                    </a>
                  </div>
                </div>

                <div className="p-6 rounded-xl border bg-card shadow-sm">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Links</h3>
                  <div className="space-y-3">
                    <a href="https://github.com/stanweb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors">
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/stanleykamau9928/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </a>
                    <a href="https://cal.com/stan-mutua-k7ingl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors">
                      <Calendar className="h-4 w-4" /> Book a call
                    </a>
                  </div>
                </div>

                <div className="p-6 rounded-xl border bg-card shadow-sm">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Availability</h3>
                  <div className="text-sm">
                    <p className="text-foreground font-medium">Open immediately</p>
                    <p className="text-muted-foreground text-xs mt-1">Senior Frontend / Full-Stack roles in fintech &amp; high-growth startups</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main resume content */}
            <div className="resume-main">
              <div className="bg-card p-8 md:p-12 rounded-lg border shadow-sm print:shadow-none print:border-0 print:p-0">
                <div className="resume-print-links">
                  stanspace.uk · github.com/stanweb · linkedin.com/in/stanleykamau9928 · mutualstanley03@gmail.com
                </div>
                <ResumeLive initialContent={initialContent} gistUrl={LIVE_SOURCES.resume.gistUrl} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
