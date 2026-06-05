import { Navbar } from "@/components/navbar"
import { PrintButton } from "@/components/print-button"
import { ResumeLive } from "@/components/resume-live"
import { getResume } from "@/lib/api"
import { LIVE_SOURCES } from "@/lib/config"
import { SITE_URL } from "@/lib/constants"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume",
  description: "Stanley Mutua — Fullstack Engineer resume and experience.",
  alternates: { canonical: `${SITE_URL}/resume` },
}

export default async function ResumePage() {
  const initialContent = await getResume()

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-end mb-4">
            <PrintButton />
          </div>
          <div className="bg-card p-8 md:p-12 rounded-lg border shadow-sm print:shadow-none print:border-0 print:p-0">
            <ResumeLive initialContent={initialContent} gistUrl={LIVE_SOURCES.resume.gistUrl} />
          </div>
        </div>
      </main>
    </div>
  )
}
