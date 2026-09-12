import { cn } from '@/lib/utils'
import { formatNumber } from '@/lib/format'

export interface RankBarItem {
  label: string
  value: number
}

export function RankBarList({
  items,
  color = 'var(--color-primary)',
  unit,
  className,
}: {
  items: RankBarItem[]
  color?: string
  unit?: string
  className?: string
}) {
  const max = Math.max(...items.map((i) => i.value), 1)

  return (
    <ul className={cn('flex flex-col gap-3.5', className)}>
      {items.map((item, i) => (
        <li key={item.label} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="flex min-w-0 items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="truncate text-foreground">{item.label}</span>
            </span>
            <span className="shrink-0 font-mono font-medium tabular-nums text-foreground">
              {formatNumber(item.value)}
              {unit}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: color,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
