import { cn } from "@/lib/utils"

interface SectionAnchorProps {
  number: string
  label: string
  className?: string
}

export function SectionAnchor({ number, label, className }: SectionAnchorProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 justify-center text-xs font-mono tracking-widest text-muted-foreground",
        className
      )}
    >
      <span className="text-primary">{number}</span>
      <span aria-hidden="true" className="h-px w-8 bg-border" />
      <span>{label}</span>
    </div>
  )
}
