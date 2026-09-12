'use client'

import { useEffect, useState } from 'react'
import { Menu, Radio } from 'lucide-react'

export function AppHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const dateStr = now
    ? now.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : ''
  const timeStr = now
    ? now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
    : '--:--:--'

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </button>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="truncate text-base font-semibold text-foreground">
            UrbanPulse AI
          </h1>
          <span className="hidden rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary sm:inline">
            Prototype
          </span>
        </div>
        <p className="truncate text-xs text-muted-foreground">
          Urban Intelligence Command Center
        </p>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 md:flex">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          <span className="text-xs font-medium text-success">
            System Operational
          </span>
        </div>

        <div className="hidden items-center gap-2 text-right sm:flex">
          <Radio className="size-4 text-primary" />
          <div>
            <p className="font-mono text-sm font-medium tabular-nums text-foreground">
              {timeStr}
            </p>
            <p className="text-[11px] text-muted-foreground">{dateStr || '—'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
