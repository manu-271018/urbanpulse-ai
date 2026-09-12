'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { ChartTooltip } from './chart-tooltip'
import { formatNumber } from '@/lib/format'

export interface DonutDatum {
  label: string
  value: number
  token: string
}

export function DonutChart({
  data,
  centerLabel,
  unit = '',
}: {
  data: DonutDatum[]
  centerLabel?: string
  unit?: string
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="relative h-[180px] w-[180px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={2}
              stroke="var(--color-card)"
              strokeWidth={2}
            >
              {data.map((d, i) => (
                <Cell key={i} fill={d.token} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip unit={unit} />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-semibold tabular-nums text-foreground">
            {formatNumber(total)}
          </span>
          {centerLabel && (
            <span className="text-[11px] text-muted-foreground">{centerLabel}</span>
          )}
        </div>
      </div>

      <ul className="flex w-full flex-1 flex-col gap-2.5">
        {data.map((d) => {
          const pct = total ? Math.round((d.value / total) * 100) : 0
          return (
            <li key={d.label} className="flex items-center gap-3 text-sm">
              <span
                className="size-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: d.token }}
              />
              <span className="truncate text-muted-foreground">{d.label}</span>
              <span className="ml-auto font-mono font-medium tabular-nums text-foreground">
                {formatNumber(d.value)}
              </span>
              <span className="w-9 text-right font-mono text-xs tabular-nums text-muted-foreground">
                {pct}%
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
