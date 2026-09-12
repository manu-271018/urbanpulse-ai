const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000).toISOString()

export const KPIS = {
  activeBuses: 24,
  aiDetectionsToday: 1284,
  criticalAlerts: 7,
  roadDefects: 86,
  congestionZones: 12,
}

export interface CriticalAlert {
  id: string
  title: string
  location: string
  busId: string
  timestamp: string
  severity: 'Critical' | 'High'
}

export const CRITICAL_ALERTS: CriticalAlert[] = [
  { id: 'INC-3301', title: 'Hit-and-Run detected', location: 'Miyapur X Roads', busId: 'BUS-518', timestamp: minutesAgo(3), severity: 'Critical' },
  { id: 'INC-3294', title: 'Pedestrian at high risk', location: 'Mehdipatnam Rd', busId: 'BUS-205', timestamp: minutesAgo(64), severity: 'Critical' },
  { id: 'RD-001', title: 'Critical pothole cluster', location: 'Madhapur Road', busId: 'BUS-101', timestamp: minutesAgo(6), severity: 'Critical' },
  { id: 'RD-002', title: 'Broken manhole on flyover', location: 'Gachibowli Flyover', busId: 'BUS-205', timestamp: minutesAgo(19), severity: 'Critical' },
  { id: 'INC-3300', title: 'Rash driving flagged', location: 'Gachibowli Flyover', busId: 'BUS-205', timestamp: minutesAgo(11), severity: 'High' },
]

// Most affected roads (aggregated detections).
export const MOST_AFFECTED_ROADS = [
  { road: 'Gachibowli Flyover', detections: 214 },
  { road: 'Madhapur Road', detections: 187 },
  { road: 'Ameerpet Flyover', detections: 163 },
  { road: 'Miyapur X Roads', detections: 141 },
  { road: 'Panjagutta Circle', detections: 118 },
]

// Most active buses by detection volume.
export const MOST_ACTIVE_BUSES = [
  { busId: 'BUS-518', detections: 74 },
  { busId: 'BUS-205', detections: 67 },
  { busId: 'BUS-217', detections: 51 },
  { busId: 'BUS-101', detections: 42 },
  { busId: 'BUS-404', detections: 38 },
]

export const REPORT_SUMMARY = {
  totalDetections: 8426,
  roadDefects: 86,
  trafficIncidents: 214,
  criticalAlerts: 7,
  reportPeriod: 'Last 7 days',
  generatedFor: 'Greater Hyderabad Municipal Corporation',
}
