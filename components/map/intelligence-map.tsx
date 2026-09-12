'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip as LeafletTooltip,
  useMap,
} from 'react-leaflet'
import { HYDERABAD_CENTER } from '@/lib/mock-data/locations'
import type { MapEvent, MapEventType } from '@/lib/types'

export const MARKER_COLORS: Record<MapEventType, string> = {
  bus: '#22c1e6',
  pothole: '#ef4444',
  congestion: '#f97316',
  waterlogging: '#3b82f6',
  safety: '#a855f7',
}

function FlyToSelected({ event }: { event: MapEvent | null }) {
  const map = useMap()
  useEffect(() => {
    if (event) {
      map.flyTo([event.coordinates.lat, event.coordinates.lng], 14, {
        duration: 0.8,
      })
    }
  }, [event, map])
  return null
}

export default function IntelligenceMap({
  events,
  selected,
  onSelect,
}: {
  events: MapEvent[]
  selected: MapEvent | null
  onSelect: (event: MapEvent) => void
}) {
  return (
    <MapContainer
      center={[HYDERABAD_CENTER.lat, HYDERABAD_CENTER.lng]}
      zoom={12}
      scrollWheelZoom
      className="h-full w-full"
      style={{ minHeight: 480 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />
      <FlyToSelected event={selected} />

      {events.map((event) => {
        const color = MARKER_COLORS[event.type]
        const isBus = event.type === 'bus'
        const isSelected = selected?.id === event.id
        return (
          <CircleMarker
            key={event.id}
            center={[event.coordinates.lat, event.coordinates.lng]}
            radius={isBus ? 7 : 8}
            pathOptions={{
              color: isSelected ? '#ffffff' : color,
              weight: isSelected ? 3 : isBus ? 2 : 1.5,
              fillColor: color,
              fillOpacity: isBus ? 0.9 : 0.65,
            }}
            eventHandlers={{ click: () => onSelect(event) }}
          >
            <LeafletTooltip direction="top" offset={[0, -6]}>
              <span className="text-xs font-medium">
                {event.label} · {event.busId}
              </span>
            </LeafletTooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
