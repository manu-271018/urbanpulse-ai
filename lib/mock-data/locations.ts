import type { GeoPoint } from '@/lib/types'

// Hyderabad demo city — realistic areas with approximate coordinates.
export const HYDERABAD_CENTER: GeoPoint = { lat: 17.4239, lng: 78.4483 }

export interface CityLocation {
  name: string
  road: string
  coordinates: GeoPoint
}

export const HYDERABAD_LOCATIONS: CityLocation[] = [
  { name: 'Madhapur', road: 'Madhapur Road', coordinates: { lat: 17.4483, lng: 78.3915 } },
  { name: 'HITEC City', road: 'HITEC City Main Rd', coordinates: { lat: 17.4435, lng: 78.3772 } },
  { name: 'Gachibowli', road: 'Gachibowli Flyover', coordinates: { lat: 17.4401, lng: 78.3489 } },
  { name: 'Kondapur', road: 'Kondapur Junction', coordinates: { lat: 17.4615, lng: 78.3645 } },
  { name: 'Kukatpally', road: 'KPHB Main Road', coordinates: { lat: 17.4948, lng: 78.3996 } },
  { name: 'Miyapur', road: 'Miyapur X Roads', coordinates: { lat: 17.4968, lng: 78.3608 } },
  { name: 'Ameerpet', road: 'Ameerpet Flyover', coordinates: { lat: 17.4374, lng: 78.4487 } },
  { name: 'Begumpet', road: 'Begumpet Main Rd', coordinates: { lat: 17.444, lng: 78.4735 } },
  { name: 'Banjara Hills', road: 'Road No. 12', coordinates: { lat: 17.4156, lng: 78.4347 } },
  { name: 'Jubilee Hills', road: 'Jubilee Hills Rd', coordinates: { lat: 17.4319, lng: 78.4073 } },
  { name: 'Secunderabad', road: 'SP Road', coordinates: { lat: 17.4399, lng: 78.4983 } },
  { name: 'Uppal', road: 'Uppal Ring Road', coordinates: { lat: 17.4058, lng: 78.5591 } },
  { name: 'LB Nagar', road: 'LB Nagar Junction', coordinates: { lat: 17.3457, lng: 78.5522 } },
  { name: 'Mehdipatnam', road: 'Mehdipatnam Rd', coordinates: { lat: 17.3949, lng: 78.4381 } },
  { name: 'Charminar', road: 'Charminar Rd', coordinates: { lat: 17.3616, lng: 78.4747 } },
  { name: 'Panjagutta', road: 'Panjagutta Circle', coordinates: { lat: 17.4256, lng: 78.4527 } },
]
