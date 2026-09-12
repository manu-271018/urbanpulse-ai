import {
  LayoutDashboard,
  BusFront,
  Map,
  Construction,
  Gauge,
  ShieldAlert,
  FileBarChart,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  description: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/', icon: LayoutDashboard, description: 'Command center summary' },
  { label: 'Live Fleet', href: '/fleet', icon: BusFront, description: 'Real-time bus telemetry' },
  { label: 'Urban Intelligence Map', href: '/map', icon: Map, description: 'GIS event map' },
  { label: 'Road Defects', href: '/defects', icon: Construction, description: 'Deduplicated defects' },
  { label: 'Traffic Analytics', href: '/traffic', icon: Gauge, description: 'Congestion & flow' },
  { label: 'Incidents', href: '/incidents', icon: ShieldAlert, description: 'Safety incidents' },
  { label: 'Reports', href: '/reports', icon: FileBarChart, description: 'Intelligence reports' },
]
