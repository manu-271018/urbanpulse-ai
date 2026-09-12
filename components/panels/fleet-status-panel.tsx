import { BusFront } from 'lucide-react'
import { SectionCard } from '@/components/shared/section-card'
import { BusStatusBadge } from '@/components/shared/status-badge'
import { BUSES, FLEET_SUMMARY } from '@/lib/mock-data/fleet'
import { formatRelativeTime } from '@/lib/format'

export function FleetStatusPanel() {
  return (
    <SectionCard
      title="Fleet Status"
      description="Live status of intelligence-equipped buses"
      bodyClassName="p-0"
      action={
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-success">
            <span className="size-1.5 rounded-full bg-success" />
            {FLEET_SUMMARY.active}
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-muted-foreground" />
            {FLEET_SUMMARY.idle}
          </span>
          <span className="flex items-center gap-1.5 text-critical">
            <span className="size-1.5 rounded-full bg-critical" />
            {FLEET_SUMMARY.alert}
          </span>
        </div>
      }
    >
      <ul className="divide-y divide-border">
        {BUSES.map((bus) => (
          <li
            key={bus.id}
            className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-accent/40"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BusFront className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-medium text-foreground">
                  {bus.id}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Route {bus.route} · {bus.area}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {bus.detectionCount} detections · updated{' '}
                {formatRelativeTime(bus.lastUpdate)}
              </p>
            </div>
            <BusStatusBadge status={bus.status} />
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}
