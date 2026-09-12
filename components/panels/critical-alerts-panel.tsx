import { TriangleAlert, MapPin } from 'lucide-react'
import { SectionCard } from '@/components/shared/section-card'
import { CRITICAL_ALERTS } from '@/lib/mock-data/overview'
import { formatRelativeTime } from '@/lib/format'
import { cn } from '@/lib/utils'

export function CriticalAlertsPanel() {
  return (
    <SectionCard
      title="Critical Alerts"
      description="High-priority events needing action"
      bodyClassName="p-0"
      action={
        <span className="flex items-center gap-1.5 rounded-full bg-critical/15 px-2.5 py-0.5 text-xs font-medium text-critical">
          <TriangleAlert className="size-3.5" />
          {CRITICAL_ALERTS.length} active
        </span>
      }
    >
      <ul className="divide-y divide-border">
        {CRITICAL_ALERTS.map((alert) => (
          <li
            key={alert.id}
            className="flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-accent/40"
          >
            <span
              className={cn(
                'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg',
                alert.severity === 'Critical'
                  ? 'bg-critical/15 text-critical'
                  : 'bg-high/15 text-high',
              )}
            >
              <TriangleAlert className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-foreground">
                  {alert.title}
                </p>
                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                  {formatRelativeTime(alert.timestamp)}
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3" />
                  {alert.location}
                </span>
                <span className="font-mono">{alert.busId}</span>
                <span className="font-mono">{alert.id}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}
