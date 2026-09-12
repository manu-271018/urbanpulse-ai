import type { Incident } from '@/lib/types'

const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000).toISOString()

export const INCIDENTS: Incident[] = [
  { id: 'INC-3301', type: 'Hit-and-Run', busId: 'BUS-518', location: 'Miyapur X Roads', coordinates: { lat: 17.4968, lng: 78.3608 }, timestamp: minutesAgo(3), severity: 'Critical', confidence: 96, status: 'New' },
  { id: 'INC-3300', type: 'Rash Driving', busId: 'BUS-205', location: 'Gachibowli Flyover', coordinates: { lat: 17.4401, lng: 78.3489 }, timestamp: minutesAgo(11), severity: 'High', confidence: 92, status: 'Verified' },
  { id: 'INC-3299', type: 'Pedestrian Risk', busId: 'BUS-101', location: 'Madhapur Road', coordinates: { lat: 17.4483, lng: 78.3915 }, timestamp: minutesAgo(17), severity: 'High', confidence: 89, status: 'In Progress' },
  { id: 'INC-3298', type: 'Waterlogging', busId: 'BUS-404', location: 'Panjagutta Circle', coordinates: { lat: 17.4256, lng: 78.4527 }, timestamp: minutesAgo(24), severity: 'Medium', confidence: 84, status: 'Verified' },
  { id: 'INC-3297', type: 'Road Hazard', busId: 'BUS-312', location: 'Uppal Ring Road', coordinates: { lat: 17.4058, lng: 78.5591 }, timestamp: minutesAgo(33), severity: 'Medium', confidence: 78, status: 'New' },
  { id: 'INC-3296', type: 'Traffic Obstruction', busId: 'BUS-217', location: 'KPHB Main Road', coordinates: { lat: 17.4948, lng: 78.3996 }, timestamp: minutesAgo(41), severity: 'Medium', confidence: 81, status: 'In Progress' },
  { id: 'INC-3295', type: 'Rash Driving', busId: 'BUS-518', location: 'Kondapur Junction', coordinates: { lat: 17.4615, lng: 78.3645 }, timestamp: minutesAgo(52), severity: 'High', confidence: 87, status: 'Resolved' },
  { id: 'INC-3294', type: 'Pedestrian Risk', busId: 'BUS-205', location: 'Mehdipatnam Rd', coordinates: { lat: 17.3949, lng: 78.4381 }, timestamp: minutesAgo(64), severity: 'Critical', confidence: 93, status: 'Verified' },
  { id: 'INC-3293', type: 'Road Hazard', busId: 'BUS-101', location: 'HITEC City Main Rd', coordinates: { lat: 17.4435, lng: 78.3772 }, timestamp: minutesAgo(78), severity: 'Low', confidence: 71, status: 'Dismissed' },
  { id: 'INC-3292', type: 'Traffic Obstruction', busId: 'BUS-404', location: 'Banjara Hills Rd No. 12', coordinates: { lat: 17.4156, lng: 78.4347 }, timestamp: minutesAgo(96), severity: 'Low', confidence: 68, status: 'Resolved' },
]
