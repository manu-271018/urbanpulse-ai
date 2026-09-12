// Shared domain types for UrbanPulse AI.
// These mirror the shape we expect from a future Supabase + Python AI backend,
// so mock data can be swapped for real queries with minimal changes.

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low'

export type BusStatus = 'Active' | 'Idle' | 'Alert'

export type DetectionType =
  | 'Pothole'
  | 'Congestion'
  | 'Waterlogging'
  | 'Safety Incident'

export type DefectType =
  | 'Pothole'
  | 'Crack'
  | 'Broken Manhole'
  | 'Faded Marking'
  | 'Debris'

export type IncidentType =
  | 'Rash Driving'
  | 'Hit-and-Run'
  | 'Pedestrian Risk'
  | 'Road Hazard'
  | 'Waterlogging'
  | 'Traffic Obstruction'

export type EventStatus =
  | 'New'
  | 'Verified'
  | 'In Progress'
  | 'Resolved'
  | 'Dismissed'

export interface GeoPoint {
  lat: number
  lng: number
}

export interface Bus {
  id: string
  route: string
  routeName: string
  status: BusStatus
  location: GeoPoint
  area: string
  lastUpdate: string // ISO timestamp
  detectionCount: number
  speedKmph: number
}

export interface Detection {
  id: string
  time: string // ISO timestamp
  busId: string
  type: DetectionType
  location: string
  confidence: number // 0-100
  severity: Severity
  status: EventStatus
}

export interface RoadDefect {
  id: string
  defectType: DefectType
  location: string
  area: string
  coordinates: GeoPoint
  observationCount: number
  reportingBuses: string[]
  confidence: number
  severity: Severity
  status: EventStatus
  firstDetected: string
  lastDetected: string
}

export interface Incident {
  id: string
  type: IncidentType
  busId: string
  location: string
  coordinates: GeoPoint
  timestamp: string
  severity: Severity
  confidence: number
  status: EventStatus
}

export type MapEventType =
  | 'bus'
  | 'pothole'
  | 'congestion'
  | 'waterlogging'
  | 'safety'

export interface MapEvent {
  id: string
  type: MapEventType
  label: string
  busId: string
  coordinates: GeoPoint
  timestamp: string
  confidence: number
  severity: Severity
  status: EventStatus
}
