import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SeverityBadge } from '@/components/shared/severity-badge'
import { StatusBadge } from '@/components/shared/status-badge'
import { ConfidenceMeter } from '@/components/shared/confidence-meter'
import { DetectionTypeLabel } from '@/components/shared/detection-type-label'
import { formatTime } from '@/lib/format'
import type { Detection } from '@/lib/types'

export function RecentDetectionsTable({ rows }: { rows: Detection[] }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Time</TableHead>
            <TableHead>Bus ID</TableHead>
            <TableHead>Detection</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {formatTime(row.time)}
              </TableCell>
              <TableCell className="font-mono text-xs font-medium text-foreground">
                {row.busId}
              </TableCell>
              <TableCell>
                <DetectionTypeLabel type={row.type} />
              </TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                {row.location}
              </TableCell>
              <TableCell>
                <ConfidenceMeter value={row.confidence} />
              </TableCell>
              <TableCell>
                <SeverityBadge severity={row.severity} />
              </TableCell>
              <TableCell>
                <StatusBadge status={row.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
