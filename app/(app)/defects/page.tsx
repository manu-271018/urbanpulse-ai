'use client'

import { useMemo, useState } from 'react'
import { Layers, BusFront } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { SectionCard } from '@/components/shared/section-card'
import { SeverityBadge } from '@/components/shared/severity-badge'
import { StatusBadge } from '@/components/shared/status-badge'
import { ConfidenceMeter } from '@/components/shared/confidence-meter'
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
import { ROAD_DEFECTS } from '@/lib/mock-data/defects'
import { formatRelativeTime } from '@/lib/format'
import type { Severity, EventStatus, DefectType } from '@/lib/types'

const SEVERITIES: Array<Severity | 'All'> = ['All', 'Critical', 'High', 'Medium', 'Low']
const STATUSES: Array<EventStatus | 'All'> = ['All', 'New', 'Verified', 'In Progress', 'Resolved', 'Dismissed']
const TYPES: Array<DefectType | 'All'> = ['All', 'Pothole', 'Crack', 'Broken Manhole', 'Faded Marking', 'Debris']

export default function DefectsPage() {
  const [severity, setSeverity] = useState<Severity | 'All'>('All')
  const [status, setStatus] = useState<EventStatus | 'All'>('All')
  const [type, setType] = useState<DefectType | 'All'>('All')

  const filtered = useMemo(
    () =>
      ROAD_DEFECTS.filter(
        (d) =>
          (severity === 'All' || d.severity === severity) &&
          (status === 'All' || d.status === status) &&
          (type === 'All' || d.defectType === type),
      ),
    [severity, status, type],
  )

  const totalObservations = ROAD_DEFECTS.reduce((s, d) => s + d.observationCount, 0)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Road Defects"
        description="Physical road problems detected by the fleet's onboard AI, deduplicated by location so repeated sightings become a single tracked defect."
      />

      <div className="flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/5 p-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Layers className="size-5" />
        </span>
        <div className="text-sm">
          <p className="font-medium text-foreground">Multi-bus deduplication</p>
          <p className="mt-0.5 text-muted-foreground">
            {ROAD_DEFECTS.length} unique defects consolidated from{' '}
            <span className="font-mono font-medium text-foreground">
              {totalObservations}
            </span>{' '}
            fleet observations. When several buses report the same location, the
            observation count increases instead of creating duplicates.
          </p>
        </div>
      </div>

      <SectionCard
        title="Detected Road Defects"
        description={`${filtered.length} of ${ROAD_DEFECTS.length} defects shown`}
        bodyClassName="p-0"
        action={
          <div className="flex flex-wrap items-center gap-2">
            <FilterSelect label="Severity" value={severity} onChange={(v) => setSeverity(v as Severity | 'All')} options={SEVERITIES} />
            <FilterSelect label="Status" value={status} onChange={(v) => setStatus(v as EventStatus | 'All')} options={STATUSES} />
            <FilterSelect label="Type" value={type} onChange={(v) => setType(v as DefectType | 'All')} options={TYPES} />
          </div>
        }
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Event ID</TableHead>
                <TableHead>Defect Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Observations</TableHead>
                <TableHead>Reporting Buses</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>First Detected</TableHead>
                <TableHead>Last Detected</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-mono text-xs font-medium text-foreground">
                    {d.id}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-foreground">
                    {d.defectType}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-foreground">{d.location}</div>
                    <div className="text-xs text-muted-foreground">{d.area}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center justify-center rounded-md bg-muted px-2 py-0.5 font-mono text-sm font-semibold tabular-nums text-foreground">
                      {d.observationCount}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <BusFront className="size-3.5 text-primary" />
                      {d.reportingBuses.length} buses
                    </span>
                  </TableCell>
                  <TableCell>
                    <ConfidenceMeter value={d.confidence} />
                  </TableCell>
                  <TableCell>
                    <SeverityBadge severity={d.severity} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={d.status} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {formatRelativeTime(d.firstDetected)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {formatRelativeTime(d.lastDetected)}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} className="py-10 text-center text-sm text-muted-foreground">
                    No defects match your filters.
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

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-9 w-36">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt === 'All' ? `All ${label}` : opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
