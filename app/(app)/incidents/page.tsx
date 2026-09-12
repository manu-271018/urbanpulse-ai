'use client'

import { useMemo, useState } from 'react'
import { ShieldAlert } from 'lucide-react'
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
import { INCIDENTS } from '@/lib/mock-data/incidents'
import { formatDateTime } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Severity, EventStatus, IncidentType } from '@/lib/types'

const TYPES: Array<IncidentType | 'All'> = ['All', 'Rash Driving', 'Hit-and-Run', 'Pedestrian Risk', 'Road Hazard', 'Waterlogging', 'Traffic Obstruction']
const SEVERITIES: Array<Severity | 'All'> = ['All', 'Critical', 'High', 'Medium', 'Low']
const STATUSES: Array<EventStatus | 'All'> = ['All', 'New', 'Verified', 'In Progress', 'Resolved', 'Dismissed']

const SEVERITY_ORDER: Severity[] = ['Critical', 'High', 'Medium', 'Low']

export default function IncidentsPage() {
  const [type, setType] = useState<IncidentType | 'All'>('All')
  const [severity, setSeverity] = useState<Severity | 'All'>('All')
  const [status, setStatus] = useState<EventStatus | 'All'>('All')

  const filtered = useMemo(
    () =>
      INCIDENTS.filter(
        (i) =>
          (type === 'All' || i.type === type) &&
          (severity === 'All' || i.severity === severity) &&
          (status === 'All' || i.status === status),
      ),
    [type, severity, status],
  )

  const counts = useMemo(() => {
    const c: Record<Severity, number> = { Critical: 0, High: 0, Medium: 0, Low: 0 }
    for (const i of INCIDENTS) c[i.severity] += 1
    return c
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Incidents"
        description="AI-generated safety and road incidents flagged from live bus camera analysis across the city."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {SEVERITY_ORDER.map((s) => (
          <div key={s} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{s}</p>
              <span
                className={cn(
                  'size-2 rounded-full',
                  s === 'Critical' && 'bg-critical',
                  s === 'High' && 'bg-high',
                  s === 'Medium' && 'bg-medium',
                  s === 'Low' && 'bg-low',
                )}
              />
            </div>
            <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-foreground">
              {counts[s]}
            </p>
          </div>
        ))}
      </div>

      <SectionCard
        title="Incident Log"
        description={`${filtered.length} of ${INCIDENTS.length} incidents shown`}
        bodyClassName="p-0"
        action={
          <div className="flex flex-wrap items-center gap-2">
            <FilterSelect label="Type" value={type} onChange={(v) => setType(v as IncidentType | 'All')} options={TYPES} />
            <FilterSelect label="Severity" value={severity} onChange={(v) => setSeverity(v as Severity | 'All')} options={SEVERITIES} />
            <FilterSelect label="Status" value={status} onChange={(v) => setStatus(v as EventStatus | 'All')} options={STATUSES} />
          </div>
        }
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Incident ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Bus ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="font-mono text-xs font-medium text-foreground">
                    {i.id}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2 text-sm text-foreground">
                      <ShieldAlert className="size-3.5 text-safety" />
                      {i.type}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-foreground">
                    {i.busId}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {i.location}
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-mono text-xs text-muted-foreground">
                    {formatDateTime(i.timestamp)}
                  </TableCell>
                  <TableCell>
                    <SeverityBadge severity={i.severity} />
                  </TableCell>
                  <TableCell>
                    <ConfidenceMeter value={i.confidence} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={i.status} />
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center text-sm text-muted-foreground">
                    No incidents match your filters.
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
      <SelectTrigger className="h-9 w-40">
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
