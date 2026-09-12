import { Car, Gauge, TrafficCone, Timer, Clock } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { KpiCard } from '@/components/shared/kpi-card'
import { SectionCard } from '@/components/shared/section-card'
import { RankBarList } from '@/components/shared/rank-bar-list'
import { SimpleBarChart } from '@/components/charts/bar-chart'
import { SimpleAreaChart } from '@/components/charts/area-chart'
import { DonutChart } from '@/components/charts/donut-chart'
import {
  TRAFFIC_SUMMARY,
  VEHICLE_COUNTS_BY_HOUR,
  TRAFFIC_DENSITY_BY_HOUR,
  CONGESTION_HOTSPOTS,
  VEHICLE_CLASSIFICATION,
} from '@/lib/mock-data/traffic'
import { formatNumber } from '@/lib/format'

const classificationData = VEHICLE_CLASSIFICATION.map((v) => ({
  label: v.class,
  value: v.value,
  token: v.token,
}))

const hotspotItems = CONGESTION_HOTSPOTS.map((h) => ({
  label: h.location,
  value: h.density,
}))

export default function TrafficPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Traffic Analytics"
        description="Vehicle flow and congestion intelligence derived from AI object detection on the moving bus fleet across Hyderabad."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <KpiCard label="Total Vehicles Detected" value={formatNumber(TRAFFIC_SUMMARY.totalVehicles)} icon={Car} accent="primary" delta="Today" />
        <KpiCard label="Traffic Density" value={`${TRAFFIC_SUMMARY.densityPercent}%`} icon={Gauge} accent="high" delta={TRAFFIC_SUMMARY.trafficDensity} />
        <KpiCard label="Congestion Zones" value={String(TRAFFIC_SUMMARY.congestionZones)} icon={TrafficCone} accent="critical" delta="Active now" />
        <KpiCard label="Peak Congestion" value={TRAFFIC_SUMMARY.peakCongestionTime.split(' ')[0]} icon={Clock} accent="waterlogging" delta={TRAFFIC_SUMMARY.peakCongestionTime} />
        <KpiCard label="Avg Route Delay" value={TRAFFIC_SUMMARY.avgRouteDelay} icon={Timer} accent="high" delta="vs scheduled" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SectionCard
          title="Vehicle Counts by Hour"
          description="Vehicles detected across the fleet"
          className="lg:col-span-2"
        >
          <SimpleBarChart
            data={VEHICLE_COUNTS_BY_HOUR}
            xKey="hour"
            yKey="vehicles"
            color="var(--color-chart-1)"
            unit=" vehicles"
          />
        </SectionCard>

        <SectionCard
          title="Vehicle Classification"
          description="AI-classified vehicle mix"
        >
          <DonutChart data={classificationData} centerLabel="vehicles" />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SectionCard
          title="Traffic Density by Hour"
          description="Road saturation level (0–100)"
          className="lg:col-span-2"
        >
          <SimpleAreaChart
            data={TRAFFIC_DENSITY_BY_HOUR}
            xKey="hour"
            yKey="density"
            color="var(--color-chart-2)"
            unit="%"
          />
        </SectionCard>

        <SectionCard
          title="Congestion Hotspots"
          description="Highest density locations"
        >
          <RankBarList items={hotspotItems} color="var(--color-congestion)" unit="%" />
        </SectionCard>
      </div>
    </div>
  )
}
