import { BusFront, ScanEye, TriangleAlert, Construction, TrafficCone } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { KpiCard } from '@/components/shared/kpi-card'
import { SectionCard } from '@/components/shared/section-card'
import { RecentDetectionsTable } from '@/components/tables/recent-detections-table'
import { DetectionTrendChart } from '@/components/charts/detection-trend-chart'
import { DonutChart } from '@/components/charts/donut-chart'
import { CriticalAlertsPanel } from '@/components/panels/critical-alerts-panel'
import { FleetStatusPanel } from '@/components/panels/fleet-status-panel'
import { KPIS } from '@/lib/mock-data/overview'
import { RECENT_DETECTIONS, DETECTION_TYPE_BREAKDOWN } from '@/lib/mock-data/detections'
import { formatNumber } from '@/lib/format'

const donutData = DETECTION_TYPE_BREAKDOWN.map((d) => ({
  label: d.type,
  value: d.value,
  token: d.token,
}))

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Command Center Overview"
        description="Live urban intelligence aggregated from the Hyderabad public transport fleet. AI models analyze onboard camera feeds to surface road, traffic and safety conditions in real time."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <KpiCard label="Active Buses" value={formatNumber(KPIS.activeBuses)} icon={BusFront} accent="primary" delta="18 on route · 6 in depot" />
        <KpiCard label="AI Detections Today" value={formatNumber(KPIS.aiDetectionsToday)} icon={ScanEye} accent="success" trend="up" delta="+16% vs yesterday" />
        <KpiCard label="Critical Alerts" value={formatNumber(KPIS.criticalAlerts)} icon={TriangleAlert} accent="critical" delta="Requires attention" />
        <KpiCard label="Road Defects" value={formatNumber(KPIS.roadDefects)} icon={Construction} accent="high" delta="Deduplicated across fleet" />
        <KpiCard label="Congestion Zones" value={formatNumber(KPIS.congestionZones)} icon={TrafficCone} accent="waterlogging" delta="Active right now" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SectionCard
          title="AI Detection Trend"
          description="Total detections over the last 7 days"
          className="lg:col-span-2"
        >
          <DetectionTrendChart />
        </SectionCard>

        <SectionCard
          title="Detection Types"
          description="Distribution of today's detections"
        >
          <DonutChart data={donutData} centerLabel="today" />
        </SectionCard>
      </div>

      <SectionCard
        title="Recent AI Detections"
        description="Latest events streamed from the fleet"
      >
        <RecentDetectionsTable rows={RECENT_DETECTIONS} />
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CriticalAlertsPanel />
        <FleetStatusPanel />
      </div>
    </div>
  )
}
