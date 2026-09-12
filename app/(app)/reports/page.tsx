import { ScanEye, Construction, ShieldAlert, TriangleAlert } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { KpiCard } from '@/components/shared/kpi-card'
import { SectionCard } from '@/components/shared/section-card'
import { RankBarList } from '@/components/shared/rank-bar-list'
import { SimpleBarChart } from '@/components/charts/bar-chart'
import { ReportDialog } from '@/components/reports/report-dialog'
import {
  REPORT_SUMMARY,
  MOST_AFFECTED_ROADS,
  MOST_ACTIVE_BUSES,
} from '@/lib/mock-data/overview'
import { DETECTION_TREND } from '@/lib/mock-data/detections'
import { formatNumber } from '@/lib/format'

const roadItems = MOST_AFFECTED_ROADS.map((r) => ({
  label: r.road,
  value: r.detections,
}))
const busItems = MOST_ACTIVE_BUSES.map((b) => ({
  label: b.busId,
  value: b.detections,
}))

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reports"
        description={`Urban intelligence reporting for ${REPORT_SUMMARY.generatedFor}. Consolidated fleet AI findings for the ${REPORT_SUMMARY.reportPeriod.toLowerCase()}.`}
        actions={<ReportDialog />}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label="Total Detections" value={formatNumber(REPORT_SUMMARY.totalDetections)} icon={ScanEye} accent="primary" delta={REPORT_SUMMARY.reportPeriod} />
        <KpiCard label="Road Defects" value={formatNumber(REPORT_SUMMARY.roadDefects)} icon={Construction} accent="high" delta="Deduplicated" />
        <KpiCard label="Traffic Incidents" value={formatNumber(REPORT_SUMMARY.trafficIncidents)} icon={ShieldAlert} accent="waterlogging" delta="Flagged by AI" />
        <KpiCard label="Critical Alerts" value={formatNumber(REPORT_SUMMARY.criticalAlerts)} icon={TriangleAlert} accent="critical" delta="Requires action" />
      </div>

      <SectionCard
        title="Detection Volume"
        description="Daily AI detections over the reporting period"
      >
        <SimpleBarChart
          data={DETECTION_TREND}
          xKey="day"
          yKey="detections"
          color="var(--color-chart-1)"
          unit=" detections"
        />
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard
          title="Most Affected Roads"
          description="Ranked by total AI detections"
        >
          <RankBarList items={roadItems} color="var(--color-primary)" />
        </SectionCard>

        <SectionCard
          title="Most Active Buses"
          description="Ranked by detection contribution"
        >
          <RankBarList items={busItems} color="var(--color-safety)" />
        </SectionCard>
      </div>
    </div>
  )
}
