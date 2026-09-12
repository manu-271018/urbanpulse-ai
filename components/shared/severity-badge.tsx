import { cn } from '@/lib/utils'
import type { Severity } from '@/lib/types'

const STYLES: Record<Severity, string> = {
  Critical: 'bg-critical/15 text-critical border-critical/30',
  High: 'bg-high/15 text-high border-high/30',
  Medium: 'bg-medium/15 text-medium border-medium/30',
  Low: 'bg-low/15 text-low border-low/30',
}

export function SeverityBadge({
  severity,
  className,
}: {
  severity: Severity
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        STYLES[severity],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {severity}
    </span>
  )
}
