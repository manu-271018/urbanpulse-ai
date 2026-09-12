import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import type { LucideIcon } from 'lucide-react'

export interface KpiCardProps {
  label: string
  value: string
  icon: LucideIcon
  delta?: string
  trend?: 'up' | 'down' | 'flat'
  accent?: 'primary' | 'critical' | 'high' | 'success' | 'waterlogging'
}

const ACCENTS: Record<NonNullable<KpiCardProps['accent']>, string> = {
  primary: 'text-primary bg-primary/10',
  critical: 'text-critical bg-critical/10',
  high: 'text-high bg-high/10',
  success: 'text-success bg-success/10',
  waterlogging: 'text-waterlogging bg-waterlogging/10',
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  delta,
  trend = 'flat',
  accent = 'primary',
}: KpiCardProps) {
  return (
    <Card className="relative overflow-hidden p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-foreground tabular-nums">
            {value}
          </p>
          {delta && (
            <p
              className={cn(
                'mt-2 text-xs font-medium',
                trend === 'up' && 'text-success',
                trend === 'down' && 'text-critical',
                trend === 'flat' && 'text-muted-foreground',
              )}
            >
              {delta}
            </p>
          )}
        </div>
        <div
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-lg',
            ACCENTS[accent],
          )}
        >
          <Icon className="size-5" />
        </div>
      </div>
    </Card>
  )
}
