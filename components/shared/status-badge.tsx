import { cn } from '@/lib/utils'
import type { EventStatus, BusStatus } from '@/lib/types'

const EVENT_STYLES: Record<EventStatus, string> = {
  New: 'bg-primary/15 text-primary border-primary/30',
  Verified: 'bg-success/15 text-success border-success/30',
  'In Progress': 'bg-high/15 text-high border-high/30',
  Resolved: 'bg-muted text-muted-foreground border-border',
  Dismissed: 'bg-muted text-muted-foreground border-border',
}

export function StatusBadge({
  status,
  className,
}: {
  status: EventStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
        EVENT_STYLES[status],
        className,
      )}
    >
      {status}
    </span>
  )
}

const BUS_STYLES: Record<BusStatus, { dot: string; text: string; bg: string }> = {
  Active: { dot: 'bg-success', text: 'text-success', bg: 'bg-success/15 border-success/30' },
  Idle: { dot: 'bg-muted-foreground', text: 'text-muted-foreground', bg: 'bg-muted border-border' },
  Alert: { dot: 'bg-critical', text: 'text-critical', bg: 'bg-critical/15 border-critical/30' },
}

export function BusStatusBadge({
  status,
  className,
}: {
  status: BusStatus
  className?: string
}) {
  const s = BUS_STYLES[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        s.bg,
        s.text,
        className,
      )}
    >
      <span
        className={cn(
          'size-1.5 rounded-full',
          s.dot,
          status === 'Alert' && 'animate-pulse',
        )}
        aria-hidden
      />
      {status}
    </span>
  )
}
