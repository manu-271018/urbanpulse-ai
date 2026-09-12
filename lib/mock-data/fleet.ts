import type { Bus } from '@/lib/types'

// Fleet snapshot for the demo city. Timestamps are relative to "now" at render
// via the formatRelativeTime helper, so we store minutes-ago offsets baked into ISO.
const now = () => new Date()
const minutesAgo = (m: number) => new Date(now().getTime() - m * 60_000).toISOString()

export const BUSES: Bus[] = [
  {
    id: 'BUS-101',
    route: '10K',
    routeName: 'Secunderabad ↔ HITEC City',
    status: 'Active',
    location: { lat: 17.4483, lng: 78.3915 },
    area: 'Madhapur',
    lastUpdate: minutesAgo(1),
    detectionCount: 42,
    speedKmph: 34,
  },
  {
    id: 'BUS-205',
    route: '218',
    routeName: 'Mehdipatnam ↔ Gachibowli',
    status: 'Alert',
    location: { lat: 17.4401, lng: 78.3489 },
    area: 'Gachibowli',
    lastUpdate: minutesAgo(0),
    detectionCount: 67,
    speedKmph: 8,
  },
  {
    id: 'BUS-217',
    route: '49M',
    routeName: 'Charminar ↔ Kukatpally',
    status: 'Active',
    location: { lat: 17.4948, lng: 78.3996 },
    area: 'Kukatpally',
    lastUpdate: minutesAgo(2),
    detectionCount: 51,
    speedKmph: 41,
  },
  {
    id: 'BUS-312',
    route: '5K',
    routeName: 'Ameerpet ↔ Uppal',
    status: 'Idle',
    location: { lat: 17.4374, lng: 78.4487 },
    area: 'Ameerpet',
    lastUpdate: minutesAgo(7),
    detectionCount: 29,
    speedKmph: 0,
  },
  {
    id: 'BUS-404',
    route: '90U',
    routeName: 'Banjara Hills ↔ LB Nagar',
    status: 'Active',
    location: { lat: 17.4156, lng: 78.4347 },
    area: 'Banjara Hills',
    lastUpdate: minutesAgo(1),
    detectionCount: 38,
    speedKmph: 27,
  },
  {
    id: 'BUS-518',
    route: '127',
    routeName: 'Begumpet ↔ Miyapur',
    status: 'Alert',
    location: { lat: 17.4968, lng: 78.3608 },
    area: 'Miyapur',
    lastUpdate: minutesAgo(0),
    detectionCount: 74,
    speedKmph: 12,
  },
]

export const FLEET_SUMMARY = {
  total: BUSES.length,
  active: BUSES.filter((b) => b.status === 'Active').length,
  idle: BUSES.filter((b) => b.status === 'Idle').length,
  alert: BUSES.filter((b) => b.status === 'Alert').length,
}
