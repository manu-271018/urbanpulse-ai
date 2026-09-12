import type { MapEvent } from '@/lib/types'
import { BUSES } from './fleet'

const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000).toISOString()

// Bus markers derived from the live fleet.
const busEvents: MapEvent[] = BUSES.map((bus) => ({
  id: bus.id,
  type: 'bus',
  label: `${bus.id} · Route ${bus.route}`,
  busId: bus.id,
  coordinates: bus.location,
  timestamp: bus.lastUpdate,
  confidence: 100,
  severity: bus.status === 'Alert' ? 'High' : 'Low',
  status: 'Verified',
}))

// AI-detected intelligence markers across Hyderabad.
const intelligenceEvents: MapEvent[] = [
  { id: 'MAP-P01', type: 'pothole', label: 'Pothole cluster', busId: 'BUS-101', coordinates: { lat: 17.4479, lng: 78.392 }, timestamp: minutesAgo(6), confidence: 94, severity: 'Critical', status: 'In Progress' },
  { id: 'MAP-P02', type: 'pothole', label: 'Pothole', busId: 'BUS-217', coordinates: { lat: 17.4952, lng: 78.4001 }, timestamp: minutesAgo(12), confidence: 79, severity: 'Medium', status: 'New' },
  { id: 'MAP-P03', type: 'pothole', label: 'Pothole', busId: 'BUS-518', coordinates: { lat: 17.4961, lng: 78.3612 }, timestamp: minutesAgo(38), confidence: 88, severity: 'High', status: 'In Progress' },
  { id: 'MAP-C01', type: 'congestion', label: 'Heavy congestion', busId: 'BUS-205', coordinates: { lat: 17.4405, lng: 78.3492 }, timestamp: minutesAgo(4), confidence: 91, severity: 'High', status: 'Verified' },
  { id: 'MAP-C02', type: 'congestion', label: 'Congestion', busId: 'BUS-312', coordinates: { lat: 17.4378, lng: 78.4489 }, timestamp: minutesAgo(18), confidence: 86, severity: 'High', status: 'Resolved' },
  { id: 'MAP-C03', type: 'congestion', label: 'Congestion', busId: 'BUS-518', coordinates: { lat: 17.4618, lng: 78.3648 }, timestamp: minutesAgo(31), confidence: 84, severity: 'Medium', status: 'In Progress' },
  { id: 'MAP-W01', type: 'waterlogging', label: 'Waterlogging', busId: 'BUS-404', coordinates: { lat: 17.4159, lng: 78.4349 }, timestamp: minutesAgo(9), confidence: 82, severity: 'Medium', status: 'In Progress' },
  { id: 'MAP-W02', type: 'waterlogging', label: 'Waterlogging', busId: 'BUS-404', coordinates: { lat: 17.4259, lng: 78.4531 }, timestamp: minutesAgo(27), confidence: 90, severity: 'High', status: 'Verified' },
  { id: 'MAP-S01', type: 'safety', label: 'Safety incident', busId: 'BUS-518', coordinates: { lat: 17.4965, lng: 78.3605 }, timestamp: minutesAgo(3), confidence: 96, severity: 'Critical', status: 'New' },
  { id: 'MAP-S02', type: 'safety', label: 'Safety incident', busId: 'BUS-205', coordinates: { lat: 17.3952, lng: 78.4384 }, timestamp: minutesAgo(15), confidence: 94, severity: 'Critical', status: 'Verified' },
  { id: 'MAP-S03', type: 'safety', label: 'Safety incident', busId: 'BUS-312', coordinates: { lat: 17.4062, lng: 78.5594 }, timestamp: minutesAgo(44), confidence: 92, severity: 'Critical', status: 'Verified' },
]

export const MAP_EVENTS: MapEvent[] = [...busEvents, ...intelligenceEvents]

export const MAP_LEGEND: { type: MapEvent['type']; label: string; token: string }[] = [
  { type: 'bus', label: 'Active Bus', token: 'var(--color-primary)' },
  { type: 'pothole', label: 'Pothole', token: 'var(--color-pothole)' },
  { type: 'congestion', label: 'Congestion', token: 'var(--color-congestion)' },
  { type: 'waterlogging', label: 'Waterlogging', token: 'var(--color-waterlogging)' },
  { type: 'safety', label: 'Safety Incident', token: 'var(--color-safety)' },
]
