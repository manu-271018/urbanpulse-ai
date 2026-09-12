'use client'

// Shared dark tooltip used across all recharts visualizations.
export function ChartTooltip({
  active,
  payload,
  label,
  unit = '',
}: {
  active?: boolean
  payload?: Array<{ name?: string; value?: number | string; color?: string; payload?: Record<string, unknown> }>
  label?: string | number
  unit?: string
}) {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-xl">
      {label !== undefined && (
        <p className="mb-1 font-medium text-foreground">{label}</p>
      )}
      <div className="flex flex-col gap-1">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="capitalize text-muted-foreground">
              {entry.name}
            </span>
            <span className="ml-auto font-mono font-medium tabular-nums text-foreground">
              {typeof entry.value === 'number'
                ? new Intl.NumberFormat('en-IN').format(entry.value)
                : entry.value}
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
