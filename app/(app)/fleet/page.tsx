'use client'

import { useMemo, useState } from 'react'
import { Search, BusFront, Gauge } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { SectionCard } from '@/components/shared/section-card'
import { BusStatusBadge } from '@/components/shared/status-badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { BUSES, FLEET_SUMMARY } from '@/lib/mock-data/fleet'
import { formatRelativeTime } from '@/lib/format'
import type { BusStatus } from '@/lib/types'

const STATUS_OPTIONS: Array<BusStatus | 'All'> = ['All', 'Active', 'Idle', 'Alert']

export default function FleetPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<BusStatus | 'All'>('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return BUSES.filter((bus) => {
      const matchesQuery =
        !q ||
        bus.id.toLowerCase().includes(q) ||
        bus.route.toLowerCase().includes(q) ||
        bus.routeName.toLowerCase().includes(q) ||
        bus.area.toLowerCase().includes(q)
      const matchesStatus = status === 'All' || bus.status === status
      return matchesQuery && matchesStatus
    })
  }, [query, status])

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Live Fleet"
        description="Real-time telemetry from intelligence-equipped buses across Hyderabad. Each bus streams GPS position and onboard AI detections to the command center."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatChip label="Total Buses" value={FLEET_SUMMARY.total} tone="text-foreground" />
        <StatChip label="Active" value={FLEET_SUMMARY.active} tone="text-success" />
        <StatChip label="Idle" value={FLEET_SUMMARY.idle} tone="text-muted-foreground" />
        <StatChip label="Alert" value={FLEET_SUMMARY.alert} tone="text-critical" />
      </div>

      <SectionCard
        title="Fleet Telemetry"
        description={`${filtered.length} of ${BUSES.length} buses shown`}
        bodyClassName="p-0"
        action={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bus, route, area…"
                className="h-9 w-40 pl-8 sm:w-56"
              />
            </div>
            <Select value={status} onValueChange={(v) => setStatus(v as BusStatus | 'All')}>
              <SelectTrigger className="h-9 w-28">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Bus ID</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Latitude</TableHead>
                <TableHead className="text-right">Longitude</TableHead>
                <TableHead className="text-right">Speed</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className="text-right">Detections</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <BusFront className="size-3.5" />
                      </span>
                      <span className="font-mono text-sm font-medium text-foreground">
                        {bus.id}
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-foreground">{bus.route}</div>
                    <div className="text-xs text-muted-foreground">{bus.routeName}</div>
                  </TableCell>
                  <TableCell>
                    <BusStatusBadge status={bus.status} />
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs tabular-nums text-muted-foreground">
                    {bus.location.lat.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs tabular-nums text-muted-foreground">
                    {bus.location.lng.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center gap-1 font-mono text-xs tabular-nums text-foreground">
                      <Gauge className="size-3 text-muted-foreground" />
                      {bus.speedKmph}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {formatRelativeTime(bus.lastUpdate)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-medium tabular-nums text-foreground">
                    {bus.detectionCount}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center text-sm text-muted-foreground">
                    No buses match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </div>
  )
}

function StatChip({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 font-mono text-2xl font-semibold tabular-nums ${tone}`}>
        {value}
      </p>
    </div>
  )
}
