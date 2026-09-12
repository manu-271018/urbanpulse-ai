'use client'

import { FileText, Printer, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  REPORT_SUMMARY,
  MOST_AFFECTED_ROADS,
  MOST_ACTIVE_BUSES,
} from '@/lib/mock-data/overview'
import { DETECTION_TYPE_BREAKDOWN } from '@/lib/mock-data/detections'
import { formatNumber } from '@/lib/format'

export function ReportDialog() {
  const generatedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <FileText className="size-4" />
          Generate Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Urban Intelligence Report</DialogTitle>
          <DialogDescription>
            Auto-generated summary from fleet AI · {REPORT_SUMMARY.reportPeriod}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-5">
          {/* Report letterhead */}
          <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Activity className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">UrbanPulse AI</p>
                <p className="text-xs text-muted-foreground">
                  Every Bus. Every Road. One Intelligent City.
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <p>Generated {generatedAt}</p>
              <p>City: Hyderabad</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Prepared for</p>
            <p className="text-sm font-medium text-foreground">
              {REPORT_SUMMARY.generatedFor}
            </p>
          </div>

          {/* Summary metrics */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ReportStat label="Total Detections" value={formatNumber(REPORT_SUMMARY.totalDetections)} />
            <ReportStat label="Road Defects" value={formatNumber(REPORT_SUMMARY.roadDefects)} />
            <ReportStat label="Traffic Incidents" value={formatNumber(REPORT_SUMMARY.trafficIncidents)} />
            <ReportStat label="Critical Alerts" value={formatNumber(REPORT_SUMMARY.criticalAlerts)} />
          </div>

          {/* Detection breakdown */}
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Detection Breakdown
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {DETECTION_TYPE_BREAKDOWN.map((d) => (
                <li
                  key={d.type}
                  className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm"
                >
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className="size-2 rounded-full" style={{ backgroundColor: d.token }} />
                    {d.type}
                  </span>
                  <span className="font-mono font-medium text-foreground">
                    {formatNumber(d.value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <ReportList
              title="Most Affected Roads"
              items={MOST_AFFECTED_ROADS.map((r) => ({ label: r.road, value: r.detections }))}
            />
            <ReportList
              title="Most Active Buses"
              items={MOST_ACTIVE_BUSES.map((b) => ({ label: b.busId, value: b.detections }))}
            />
          </div>

          <p className="border-t border-border pt-3 text-[11px] text-muted-foreground">
            This report is generated from prototype mock data for demonstration
            purposes. Figures represent AI-inferred detections from the public
            transport fleet.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="size-4" />
            Print / Save PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ReportStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/50 p-3">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-foreground">
        {value}
      </p>
    </div>
  )
}

function ReportList({
  title,
  items,
}: {
  title: string
  items: { label: string; value: number }[]
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <ul className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-foreground">
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.label}
            </span>
            <span className="font-mono font-medium tabular-nums text-foreground">
              {formatNumber(item.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
