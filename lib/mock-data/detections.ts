import type { Detection } from '@/lib/types'

const minutesAgo = (m: number) =>
  new Date(Date.now() - m * 60_000).toISOString()

export const RECENT_DETECTIONS: Detection[] = [
  { id: 'DET-9042', time: minutesAgo(2), busId: 'BUS-518', type: 'Safety Incident', location: 'Miyapur X Roads', confidence: 96, severity: 'Critical', status: 'New' },
  { id: 'DET-9041', time: minutesAgo(4), busId: 'BUS-205', type: 'Congestion', location: 'Gachibowli Flyover', confidence: 91, severity: 'High', status: 'Verified' },
  { id: 'DET-9040', time: minutesAgo(6), busId: 'BUS-101', type: 'Pothole', location: 'Madhapur Road', confidence: 88, severity: 'High', status: 'Verified' },
  { id: 'DET-9039', time: minutesAgo(9), busId: 'BUS-404', type: 'Waterlogging', location: 'Banjara Hills Rd No. 12', confidence: 82, severity: 'Medium', status: 'In Progress' },
  { id: 'DET-9038', time: minutesAgo(12), busId: 'BUS-217', type: 'Pothole', location: 'KPHB Main Road', confidence: 79, severity: 'Medium', status: 'New' },
  { id: 'DET-9037', time: minutesAgo(15), busId: 'BUS-205', type: 'Safety Incident', location: 'Mehdipatnam Rd', confidence: 94, severity: 'Critical', status: 'Verified' },
  { id: 'DET-9036', time: minutesAgo(18), busId: 'BUS-312', type: 'Congestion', location: 'Ameerpet Flyover', confidence: 86, severity: 'High', status: 'Resolved' },
  { id: 'DET-9035', time: minutesAgo(23), busId: 'BUS-101', type: 'Pothole', location: 'HITEC City Main Rd', confidence: 73, severity: 'Low', status: 'New' },
  { id: 'DET-9034', time: minutesAgo(27), busId: 'BUS-404', type: 'Waterlogging', location: 'Panjagutta Circle', confidence: 90, severity: 'High', status: 'Verified' },
  { id: 'DET-9033', time: minutesAgo(31), busId: 'BUS-518', type: 'Congestion', location: 'Kondapur Junction', confidence: 84, severity: 'Medium', status: 'In Progress' },
  { id: 'DET-9032', time: minutesAgo(38), busId: 'BUS-217', type: 'Pothole', location: 'Miyapur X Roads', confidence: 77, severity: 'Medium', status: 'Resolved' },
  { id: 'DET-9031', time: minutesAgo(44), busId: 'BUS-312', type: 'Safety Incident', location: 'Uppal Ring Road', confidence: 92, severity: 'Critical', status: 'Verified' },
]

// AI detection trend for the last 7 days (oldest -> newest).
export const DETECTION_TREND = [
  { day: 'Mon', detections: 942, potholes: 210, congestion: 380, waterlogging: 120, safety: 232 },
  { day: 'Tue', detections: 1088, potholes: 245, congestion: 430, waterlogging: 143, safety: 270 },
  { day: 'Wed', detections: 1012, potholes: 232, congestion: 401, waterlogging: 118, safety: 261 },
  { day: 'Thu', detections: 1176, potholes: 268, congestion: 470, waterlogging: 156, safety: 282 },
  { day: 'Fri', detections: 1320, potholes: 301, congestion: 522, waterlogging: 178, safety: 319 },
  { day: 'Sat', detections: 1104, potholes: 254, congestion: 441, waterlogging: 134, safety: 275 },
  { day: 'Sun', detections: 1284, potholes: 289, congestion: 498, waterlogging: 162, safety: 335 },
]

// Distribution of detections by type (today).
export const DETECTION_TYPE_BREAKDOWN = [
  { type: 'Congestion', value: 498, token: 'var(--color-congestion)' },
  { type: 'Safety Incidents', value: 335, token: 'var(--color-safety)' },
  { type: 'Potholes', value: 289, token: 'var(--color-pothole)' },
  { type: 'Waterlogging', value: 162, token: 'var(--color-waterlogging)' },
]
