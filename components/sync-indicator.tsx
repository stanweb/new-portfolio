import { RefreshCw } from "lucide-react"

export type SyncState = "idle" | "syncing" | "synced" | "error"

interface SyncIndicatorProps {
  state: SyncState
  /** Copy used in the syncing state. Defaults to "Checking for updates…". */
  syncingLabel?: string
  /** Copy used in the synced state. Defaults to "Updated from latest version". */
  syncedLabel?: string
  /** Whether to center the indicator (true on full sections) or left-align (true on cards). */
  centered?: boolean
  className?: string
}

export function SyncIndicator({
  state,
  syncingLabel = "Checking for updates…",
  syncedLabel = "Updated from latest version",
  centered = false,
  className = "",
}: SyncIndicatorProps) {
  if (state === "idle" || state === "error") return null

  const layout = centered ? "justify-center" : ""

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center gap-2 text-xs text-muted-foreground ${layout} ${className}`}
    >
      {state === "syncing" ? (
        <>
          <RefreshCw className="h-3 w-3 animate-spin" aria-hidden="true" />
          <span>{syncingLabel}</span>
        </>
      ) : (
        <>
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          <span>{syncedLabel}</span>
        </>
      )}
    </div>
  )
}
