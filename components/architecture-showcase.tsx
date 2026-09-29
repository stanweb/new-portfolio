"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"
import { SectionAnchor } from "@/components/section-anchor"
import {
  Activity,
  ArrowDown,
  Database,
  GitBranch,
  Globe,
  HardDrive,
  KeyRound,
  Layers,
  MessageSquare,
  Plus,
  Server,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react"

/* ================================================================
   DIAGRAM MODEL  —  coordinates live in a 1000 x 720 viewBox
   ================================================================ */
interface ArchNode {
  id: string
  label: string
  sublabel: string
  icon: LucideIcon
  color: string
  x: number // center, viewBox units
  y: number // center, viewBox units
}

const NODES: ArchNode[] = [
  { id: "client",    label: "Client",      sublabel: "browser / mobile", icon: Globe,         color: "#22d3ee", x: 500, y: 76  },
  { id: "gateway",   label: "API Gateway", sublabel: "tls · rate-limit", icon: Shield,        color: "#fb7185", x: 500, y: 208 },
  { id: "backend",   label: "Backend",     sublabel: "rest api · logic", icon: Server,        color: "#34d399", x: 500, y: 348 },
  { id: "keycloak",  label: "Keycloak",    sublabel: "authn / authz",    icon: KeyRound,      color: "#fbbf24", x: 778, y: 348 },
  { id: "redis",     label: "Redis",       sublabel: "cache / sessions", icon: Layers,        color: "#a78bfa", x: 168, y: 500 },
  { id: "postgres",  label: "PostgreSQL",  sublabel: "primary db",       icon: Database,      color: "#a78bfa", x: 470, y: 500 },
  { id: "kafka",     label: "Kafka",       sublabel: "event bus",        icon: MessageSquare, color: "#fb923c", x: 772, y: 500 },
  { id: "mysql",     label: "MySQL",       sublabel: "read replica",     icon: Database,      color: "#a78bfa", x: 470, y: 644 },
  { id: "consumers", label: "Consumers",   sublabel: "bg workers",       icon: HardDrive,     color: "#34d399", x: 772, y: 644 },
]

const KIND_COLOR = {
  sync: "#22d3ee",
  auth: "#fbbf24",
  event: "#fb923c",
  data: "#a78bfa",
} as const

type EdgeKind = keyof typeof KIND_COLOR

interface ArchEdge {
  id: string
  from: string
  to: string
  kind: EdgeKind
  flow?: boolean       // animated dashes → async / directional traffic
  d: string            // svg path in viewBox units
  label?: string
  lx?: number          // label center, viewBox units
  ly?: number
}

const EDGES: ArchEdge[] = [
  { id: "e1", from: "client",   to: "gateway",   kind: "sync",  d: "M500 116 V168",           label: "https",          lx: 514, ly: 142 },
  { id: "e2", from: "gateway",  to: "backend",   kind: "sync",  d: "M500 248 V308",           label: "jwt · routed",   lx: 514, ly: 274 },
  { id: "e3", from: "keycloak", to: "backend",   kind: "auth",  d: "M703 348 H577", flow: true, label: "verify token",  lx: 630, ly: 332 },
  { id: "e4", from: "backend",  to: "redis",     kind: "data",  d: "M448 388 V412 H168 V460", label: "cache / session", lx: 308, ly: 404 },
  { id: "e5", from: "backend",  to: "postgres",  kind: "data",  d: "M470 388 V460",           label: "sql",            lx: 458, ly: 424 },
  { id: "e6", from: "backend",  to: "kafka",     kind: "event", d: "M552 388 V412 H772 V460", flow: true, label: "publish events", lx: 662, ly: 404 },
  { id: "e7", from: "postgres", to: "mysql",     kind: "data",  d: "M470 540 V604", flow: true, label: "replication",   lx: 480, ly: 572 },
  { id: "e8", from: "kafka",    to: "consumers", kind: "event", d: "M772 540 V604", flow: true, label: "subscribe",     lx: 782, ly: 572 },
]

const ZONE_TAGS = [
  { label: "ingress",        top: "19.4%" },
  { label: "core",           top: "48.3%" },
  { label: "state · events", top: "69.4%" },
  { label: "scale out",      top: "89.4%" },
]

const LEGEND: { kind: EdgeKind; label: string; dashed?: boolean }[] = [
  { kind: "sync",  label: "sync request" },
  { kind: "event", label: "async events",  dashed: true },
  { kind: "auth",  label: "authn handshake", dashed: true },
  { kind: "data",  label: "data plane" },
]

const PRINCIPLES = [
  { icon: Zap,       label: "Design principle",   value: "Fail fast, observe everything, degrade gracefully" },
  { icon: Activity,  label: "Observability stack", value: "Prometheus + Grafana + Jaeger + structured logs" },
  { icon: GitBranch, label: "Deployment model",    value: "Docker Compose → GitHub Actions → versioned images" },
]

/* ================================================================
   SECTION
   ================================================================ */
export function ArchitectureShowcase() {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const isConnected = (e: ArchEdge) =>
    activeNode !== null && (e.from === activeNode || e.to === activeNode)

  // nodes touched by any edge of the active node
  const connectedIds = new Set<string>()
  if (activeNode) {
    EDGES.forEach((e) => {
      if (isConnected(e)) {
        connectedIds.add(e.from)
        connectedIds.add(e.to)
      }
    })
  }

  return (
    <section id="systems" className="py-16 md:py-20 px-4">
      {/* animated flow dashes for async edges */}
      <style>{`
        @keyframes edge-flow { to { stroke-dashoffset: -26; } }
        .edge-flow { animation: edge-flow 1.1s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .edge-flow { animation: none; } }
      `}</style>

      <div className="container max-w-5xl mx-auto">
        <Reveal className="space-y-4 mb-12 text-center">
          <SectionAnchor number="05" label="SYSTEMS" />
          <h2 className="text-3xl md:text-4xl font-bold text-balance">System Design Snapshot</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            How I think about building resilient, observable systems at scale.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-4 md:p-6 border-2 bg-background/80 backdrop-blur-sm">
            {/* ---------- full diagram (md+) ---------- */}
            <div
              className="hidden md:block relative aspect-[1000/720]"
              onMouseLeave={() => setActiveNode(null)}
            >
              {/* blueprint corner marks */}
              {["-top-1.5 -left-1.5", "-top-1.5 -right-1.5", "-bottom-1.5 -left-1.5", "-bottom-1.5 -right-1.5"].map((pos) => (
                <Plus key={pos} aria-hidden className={`absolute ${pos} z-20 h-3 w-3 text-muted-foreground/40`} />
              ))}

              {/* zone tags */}
              {ZONE_TAGS.map((z) => (
                <span
                  key={z.label}
                  style={{ top: z.top }}
                  className="absolute left-0 z-10 -translate-y-1/2 -rotate-90 origin-center text-[9px] font-mono uppercase tracking-widest text-muted-foreground/45 whitespace-nowrap"
                >
                  {z.label}
                </span>
              ))}

              {/* edges */}
              <svg
                viewBox="0 0 1000 720"
                preserveAspectRatio="none"
                aria-hidden
                className="absolute inset-0 h-full w-full"
              >
                <defs>
                  {Object.entries(KIND_COLOR).map(([kind, color]) => (
                    <marker
                      key={kind}
                      id={`arrow-${kind}`}
                      viewBox="0 0 8 8"
                      refX="7"
                      refY="4"
                      markerWidth="6.5"
                      markerHeight="6.5"
                      orient="auto-start-reverse"
                    >
                      <path d="M0 0 L8 4 L0 8 z" fill={color} />
                    </marker>
                  ))}
                </defs>

                {EDGES.map((e) => {
                  const color = KIND_COLOR[e.kind]
                  const highlighted = isConnected(e)
                  const dimmed = activeNode !== null && !highlighted
                  return (
                    <path
                      key={e.id}
                      d={e.d}
                      fill="none"
                      stroke={color}
                      strokeWidth={highlighted ? 2.4 : 1.6}
                      strokeOpacity={dimmed ? 0.12 : highlighted ? 1 : 0.65}
                      strokeDasharray={e.flow ? "7 6" : undefined}
                      markerEnd={`url(#arrow-${e.kind})`}
                      className={e.flow ? "edge-flow" : undefined}
                      style={{ transition: "stroke-opacity .25s, stroke-width .25s" }}
                    />
                  )
                })}
              </svg>

              {/* edge labels */}
              {EDGES.map((e) =>
                e.label ? (
                  <span
                    key={`${e.id}-label`}
                    aria-hidden
                    style={{
                      left: `${(e.lx! / 1000) * 100}%`,
                      top: `${(e.ly! / 720) * 100}%`,
                      borderColor: `${KIND_COLOR[e.kind]}40`,
                      color: KIND_COLOR[e.kind],
                      opacity: activeNode !== null && !isConnected(e) ? 0.15 : 1,
                    }}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded border bg-background/90 px-1.5 py-0.5 text-[9px] font-mono leading-none whitespace-nowrap transition-opacity duration-200"
                  >
                    {e.label}
                  </span>
                ) : null
              )}

              {/* nodes */}
              {NODES.map((node) => (
                <DiagramNode
                  key={node.id}
                  node={node}
                  dimmed={activeNode !== null && !connectedIds.has(node.id)}
                  ring={activeNode !== null && connectedIds.has(node.id)}
                  onEnter={() => setActiveNode(node.id)}
                  onLeave={() => setActiveNode(null)}
                />
              ))}
            </div>

            {/* ---------- compact flow (<md) ---------- */}
            <CompactFlow />

            {/* ---------- legend ---------- */}
            <div className="mt-4 hidden md:flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-dashed border-border/70 pt-4">
              {LEGEND.map((l) => (
                <span key={l.kind} className="inline-flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                  <svg width="30" height="8" viewBox="0 0 30 8" aria-hidden>
                    <line
                      x1="1"
                      y1="4"
                      x2="26"
                      y2="4"
                      stroke={KIND_COLOR[l.kind]}
                      strokeWidth="1.6"
                      strokeDasharray={l.dashed ? "5 4" : undefined}
                    />
                    <path d="M24 1 L29 4 L24 7 z" fill={KIND_COLOR[l.kind]} />
                  </svg>
                  {l.label}
                </span>
              ))}
            </div>

            {/* ---------- observability plane ---------- */}
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-dashed border-border/80 bg-muted/40 px-4 py-2.5">
              <Activity className="h-4 w-4 shrink-0 text-primary" />
              <p className="text-[10px] md:text-xs font-mono text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">observability plane</span>
                {" — every component ships OTel traces · Prometheus metrics · structured logs"}
              </p>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {PRINCIPLES.map((item) => (
              <Card key={item.label} className="p-4 border-2 bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1.5 text-muted-foreground">
                  <item.icon className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">{item.label}</span>
                </div>
                <div className="text-sm font-medium text-foreground">{item.value}</div>
              </Card>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ================================================================
   DIAGRAM NODE  —  absolutely positioned inside the viewBox plane
   ================================================================ */
function DiagramNode({
  node,
  dimmed,
  ring,
  onEnter,
  onLeave,
}: {
  node: ArchNode
  dimmed: boolean
  ring: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const Icon = node.icon

  return (
    <div
      tabIndex={0}
      aria-label={`${node.label} — ${node.sublabel}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      style={{
        left: `${(node.x / 1000) * 100}%`,
        top: `${(node.y / 720) * 100}%`,
        backgroundColor: `${node.color}12`,
        borderColor: ring ? node.color : `${node.color}45`,
        boxShadow: ring ? `0 0 0 1px ${node.color}40` : `inset 0 1px 0 ${node.color}10`,
        opacity: dimmed ? 0.35 : 1,
      }}
      className="absolute z-10 w-[14.5%] aspect-[2/1] -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 px-2 flex flex-col items-center justify-center gap-1 cursor-default outline-none transition-all duration-200 hover:scale-[1.05] focus-visible:scale-[1.05]"
    >
      <span
        className="flex items-center justify-center rounded-md p-1"
        style={{ backgroundColor: `${node.color}18`, color: node.color }}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="space-y-px text-center leading-none">
        <span className="block text-[11px] font-semibold text-foreground whitespace-nowrap">{node.label}</span>
        <span className="block text-[8px] font-mono uppercase tracking-wide text-muted-foreground whitespace-nowrap">
          {node.sublabel}
        </span>
      </span>
    </div>
  )
}

/* ================================================================
   COMPACT FLOW  —  vertical pipeline for small screens
   ================================================================ */
const PIPELINE: { id: string; edgeLabel?: string }[] = [
  { id: "client", edgeLabel: "https" },
  { id: "gateway", edgeLabel: "jwt · routed" },
  { id: "backend" },
]

const DOWNSTREAM: { icon: LucideIcon; color: string; name: string; note: string; dashed?: boolean }[] = [
  { icon: KeyRound,      color: "#fbbf24", name: "Keycloak",              note: "verify tokens",        dashed: true },
  { icon: Layers,        color: "#a78bfa", name: "Redis",                 note: "cache · sessions" },
  { icon: Database,      color: "#a78bfa", name: "PostgreSQL → MySQL",    note: "sql · replication" },
  { icon: MessageSquare, color: "#fb923c", name: "Kafka → Consumers",     note: "async events",         dashed: true },
]

function CompactFlow() {
  return (
    <div className="md:hidden">
      <div className="flex flex-col items-center gap-1.5">
        {PIPELINE.map((step, i) => {
          const node = NODES.find((n) => n.id === step.id)!
          const Icon = node.icon
          return (
            <div key={node.id} className="flex w-full flex-col items-center gap-1.5">
              <div
                className="flex w-full items-center gap-3 rounded-lg border-2 px-3.5 py-2.5"
                style={{ backgroundColor: `${node.color}12`, borderColor: `${node.color}45` }}
              >
                <span className="rounded-md p-1.5" style={{ backgroundColor: `${node.color}18`, color: node.color }}>
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">{node.label}</span>
                  <span className="block text-[9px] font-mono uppercase tracking-wide text-muted-foreground">
                    {node.sublabel}
                  </span>
                </span>
              </div>
              {i < PIPELINE.length - 1 && (
                <span className="flex flex-col items-center gap-0.5 py-0.5 text-muted-foreground/50">
                  <ArrowDown className="h-3.5 w-3.5" />
                  <span className="text-[9px] font-mono">{step.edgeLabel}</span>
                </span>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-3 rounded-lg border border-dashed border-border/80 p-3">
        <p className="mb-2 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60">
          backend integrates
        </p>
        <div className="grid grid-cols-1 gap-1.5">
          {DOWNSTREAM.map((row) => (
            <div key={row.name} className="flex items-center gap-2.5 rounded-md bg-muted/40 px-2.5 py-2">
              <span
                className="rounded p-1"
                style={{ backgroundColor: `${row.color}15`, color: row.color }}
              >
                <row.icon className="h-3.5 w-3.5" />
              </span>
              <span className="flex-1 text-xs font-medium text-foreground">{row.name}</span>
              <span
                className="rounded border px-1.5 py-0.5 text-[8px] font-mono whitespace-nowrap"
                style={{
                  color: row.color,
                  borderColor: `${row.color}40`,
                  borderStyle: row.dashed ? "dashed" : "solid",
                }}
              >
                {row.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
