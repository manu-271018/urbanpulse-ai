import { cn } from '@/lib/utils'

export function ConfidenceMeter({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const color =
    value >= 90
      ? 'var(--color-success)'
      : value >= 80
        ? 'var(--color-primary)'
        : value >= 70
          ? 'var(--color-medium)'
          : 'var(--color-muted-foreground)'

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="font-mono text-xs tabular-nums text-muted-foreground">
        {value}%
      </span>
    </div>
  )
}
