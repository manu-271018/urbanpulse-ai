import { Construction, TrafficCone, Droplets, ShieldAlert } from 'lucide-react'
import type { DetectionType } from '@/lib/types'
import type { LucideIcon } from 'lucide-react'

const CONFIG: Record<DetectionType, { icon: LucideIcon; token: string }> = {
  Pothole: { icon: Construction, token: 'var(--color-pothole)' },
  Congestion: { icon: TrafficCone, token: 'var(--color-congestion)' },
  Waterlogging: { icon: Droplets, token: 'var(--color-waterlogging)' },
  'Safety Incident': { icon: ShieldAlert, token: 'var(--color-safety)' },
}

export function DetectionTypeLabel({ type }: { type: DetectionType }) {
  const { icon: Icon, token } = CONFIG[type]
  return (
    <span className="inline-flex items-center gap-2 text-sm text-foreground">
      <span
        className="flex size-6 items-center justify-center rounded-md"
        style={{ backgroundColor: `color-mix(in oklch, ${token} 18%, transparent)` }}
      >
        <Icon className="size-3.5" style={{ color: token }} />
      </span>
      {type}
    </span>
  )
}
