import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapView.css'

const clubIcon = L.divIcon({
  className: 'custom-marker',
  html: '<div style="background:#FF6B00;width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(255,107,0,0.5);"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

const airportIcon = L.divIcon({
  className: 'custom-marker',
  html: '<div style="background:#4488FF;width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(68,136,255,0.5);"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

interface MapViewProps {
  center: [number, number]
  zoom?: number
  label: string
  description?: string
  icon?: 'club' | 'airport'
}

export function MapView({ center, zoom = 15, label, description, icon = 'club' }: MapViewProps) {
  return (
    <div className="map-view">
      <MapContainer center={center} zoom={zoom} className="map-container" scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={icon === 'club' ? clubIcon : airportIcon}>
          <Popup>
            <strong>{label}</strong>
            {description && <br />}
            {description && <span>{description}</span>}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
