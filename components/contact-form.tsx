"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SOCIALS } from "@/lib/social"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  })

  const onSubmit = async (values: ContactFormValues) => {
    // Mailto handoff: opens the visitor's mail client with a prefilled draft.
    // Swap for a form endpoint (Formspree/Resend/route handler) when available.
    const email = SOCIALS.email.href.replace(/^mailto:/, "")
    const subject = encodeURIComponent(`Portfolio contact — ${values.name}`)
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)

    // Small delay so the loading state is visible and the handoff feels deliberate.
    await new Promise((r) => setTimeout(r, 400))
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`

    setSent(true)
    toast.success("Opening your email client", {
      description: "A prefilled draft is ready — just hit send.",
    })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 text-left">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="contact-name">
            Name <span aria-hidden="true" className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="text-sm text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-email">
            Email <span aria-hidden="true" className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className="text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">
          Message <span aria-hidden="true" className="text-destructive">*</span>
        </Label>
        <Textarea
          id="contact-message"
          rows={5}
          placeholder="Tell me about the project or role…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-muted-foreground">
          This opens your email client with a prefilled draft — no data is stored.
        </p>
        <Button type="submit" disabled={isSubmitting} className="group">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              Preparing…
            </>
          ) : (
            <>
              {sent ? "Send another" : "Send message"}
              <Send className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
