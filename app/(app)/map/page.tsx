'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, Radio, Crosshair } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { Card } from '@/components/ui/card'
import { SeverityBadge } from '@/components/shared/severity-badge'
import { StatusBadge } from '@/components/shared/status-badge'
import { MAP_EVENTS, MAP_LEGEND } from '@/lib/mock-data/map-events'
import { formatDateTime, formatCoords } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { MapEvent, MapEventType } from '@/lib/types'

const IntelligenceMap = dynamic(
  () => import('@/components/map/intelligence-map'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[480px] w-full items-center justify-center bg-card text-sm text-muted-foreground">
        Loading map…
      </div>
    ),
  },
)

export default function MapPage() {
  const [selected, setSelected] = useState<MapEvent | null>(null)
  const [visible, setVisible] = useState<Set<MapEventType>>(
    new Set(MAP_LEGEND.map((l) => l.type)),
  )

  const events = useMemo(
    () => MAP_EVENTS.filter((e) => visible.has(e.type)),
    [visible],
  )

  const counts = useMemo(() => {
    const map = new Map<MapEventType, number>()
    for (const e of MAP_EVENTS) map.set(e.type, (map.get(e.type) ?? 0) + 1)
    return map
  }, [])

  function toggle(type: MapEventType) {
    setVisible((prev) => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Urban Intelligence Map"
        description="Geospatial view of AI detections across Hyderabad, plotted live from the moving bus fleet. Select any marker to inspect the underlying event."
        actions={
          <span className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <Radio className="size-3.5" />
            {events.length} live markers
          </span>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <Card className="relative overflow-hidden p-0">
          <div className="h-[62vh] min-h-[480px] w-full">
            <IntelligenceMap
              events={events}
              selected={selected}
              onSelect={setSelected}
            />
          </div>

          {/* Legend overlay */}
          <div className="absolute bottom-4 left-4 z-[500] rounded-xl border border-border bg-popover/90 p-3 backdrop-blur-md">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Map Legend · click to toggle
            </p>
            <ul className="flex flex-col gap-1.5">
              {MAP_LEGEND.map((item) => {
                const active = visible.has(item.type)
                return (
                  <li key={item.type}>
                    <button
                      type="button"
                      onClick={() => toggle(item.type)}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-md px-1.5 py-1 text-xs transition-opacity',
                        !active && 'opacity-40',
                      )}
                    >
                      <span
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: item.token }}
                      />
                      <span className="text-foreground">{item.label}</span>
                      <span className="ml-auto font-mono text-muted-foreground">
                        {counts.get(item.type) ?? 0}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </Card>

        <EventDetails selected={selected} onClear={() => setSelected(null)} />
      </div>
    </div>
  )
}

function EventDetails({
  selected,
  onClear,
}: {
  selected: MapEvent | null
  onClear: () => void
}) {
  return (
    <Card className="flex flex-col gap-0 overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Event Details</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Inspect a selected marker
          </p>
        </div>
        {selected && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      {!selected ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Crosshair className="size-6" />
          </span>
          <p className="text-sm font-medium text-foreground">No event selected</p>
          <p className="max-w-[220px] text-xs text-muted-foreground">
            Click any marker on the map to view its AI-generated intelligence.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm font-semibold text-foreground">
              {selected.id}
            </span>
            <SeverityBadge severity={selected.severity} />
          </div>

          <dl className="flex flex-col divide-y divide-border rounded-lg border border-border">
            <DetailRow label="Event Type" value={selected.label} />
            <DetailRow label="Bus ID" value={selected.busId} mono />
            <DetailRow
              label="GPS Coordinates"
              value={formatCoords(selected.coordinates)}
              mono
            />
            <DetailRow label="Timestamp" value={formatDateTime(selected.timestamp)} />
            <DetailRow label="AI Confidence" value={`${selected.confidence}%`} mono />
          </dl>

          <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2.5">
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="size-3.5" />
              Status
            </span>
            <StatusBadge status={selected.status} />
          </div>
        </div>
      )}
    </Card>
  )
}

function DetailRow({
  label,
  value,
  mono,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2.5">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          'text-right text-sm text-foreground',
          mono && 'font-mono text-xs',
        )}
      >
        {value}
      </dd>
    </div>
  )
}
