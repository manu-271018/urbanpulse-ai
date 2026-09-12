export const TRAFFIC_SUMMARY = {
  totalVehicles: 48213,
  trafficDensity: 'High',
  densityPercent: 78,
  congestionZones: 12,
  peakCongestionTime: '18:30 – 19:30',
  avgRouteDelay: '14 min',
}

// Vehicles detected per hour across the fleet (24h).
export const VEHICLE_COUNTS_BY_HOUR = [
  { hour: '06', vehicles: 1120 },
  { hour: '07', vehicles: 2340 },
  { hour: '08', vehicles: 3980 },
  { hour: '09', vehicles: 4520 },
  { hour: '10', vehicles: 3110 },
  { hour: '11', vehicles: 2640 },
  { hour: '12', vehicles: 2890 },
  { hour: '13', vehicles: 2750 },
  { hour: '14', vehicles: 2480 },
  { hour: '15', vehicles: 2920 },
  { hour: '16', vehicles: 3460 },
  { hour: '17', vehicles: 4310 },
  { hour: '18', vehicles: 5240 },
  { hour: '19', vehicles: 4870 },
  { hour: '20', vehicles: 3320 },
  { hour: '21', vehicles: 2010 },
]

// Traffic density (0-100) by hour.
export const TRAFFIC_DENSITY_BY_HOUR = [
  { hour: '06', density: 22 },
  { hour: '08', density: 68 },
  { hour: '10', density: 54 },
  { hour: '12', density: 49 },
  { hour: '14', density: 44 },
  { hour: '16', density: 61 },
  { hour: '18', density: 92 },
  { hour: '20', density: 57 },
  { hour: '22', density: 28 },
]

export const CONGESTION_HOTSPOTS = [
  { location: 'Gachibowli Flyover', density: 94 },
  { location: 'Ameerpet Flyover', density: 88 },
  { location: 'Panjagutta Circle', density: 83 },
  { location: 'Miyapur X Roads', density: 79 },
  { location: 'LB Nagar Junction', density: 74 },
  { location: 'Mehdipatnam Rd', density: 69 },
]

export const VEHICLE_CLASSIFICATION = [
  { class: 'Cars', value: 21460, token: 'var(--color-chart-1)' },
  { class: 'Motorcycles', value: 14820, token: 'var(--color-chart-2)' },
  { class: 'Auto-rickshaws', value: 6340, token: 'var(--color-chart-3)' },
  { class: 'Buses', value: 3210, token: 'var(--color-chart-4)' },
  { class: 'Trucks', value: 2383, token: 'var(--color-chart-5)' },
]
