'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { DETECTION_TREND } from '@/lib/mock-data/detections'
import { ChartTooltip } from './chart-tooltip'

export function DetectionTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={DETECTION_TREND} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
          width={48}
        />
        <Tooltip content={<ChartTooltip unit=" detections" />} cursor={{ stroke: 'var(--color-border)' }} />
        <Area
          type="monotone"
          dataKey="detections"
          stroke="var(--color-primary)"
          strokeWidth={2}
          fill="url(#trendFill)"
          dot={false}
          activeDot={{ r: 4, fill: 'var(--color-primary)' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
