import { Calendar, Clock, MapPin } from 'lucide-react'
import type { Event } from '../../types'
import './EventCard.css'

interface EventCardProps {
  event: Event
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function getEventStatus(dateStr: string): { label: string; className: string } {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const eventDate = new Date(dateStr + 'T12:00:00')
  const diffDays = Math.floor((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const diffMs = eventDate.getTime() - today.getTime()

  if (diffMs < 0) {
    if (diffDays === -1) return { label: '✅ Voo Realizado Ontem', className: 'badge-passado' }
    return { label: '✅ Voo Realizado', className: 'badge-passado' }
  }
  if (diffDays === 0) return { label: '🔥 É HOJE!', className: 'badge-hoje' }
  if (diffDays === 1) return { label: '⏰ Véspera de Voo', className: 'badge-amanha' }
  if (diffDays <= 7) return { label: '📅 Em Breve', className: 'badge-semana' }
  return { label: '✈️ Próximo Voo', className: 'badge-futuro' }
}

export function isEventExpired(dateStr: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const eventDate = new Date(dateStr + 'T12:00:00')
  const diffMs = eventDate.getTime() - today.getTime()
  return diffMs < -1 * 24 * 60 * 60 * 1000
}

export function sortEvents(events: Event[]): Event[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return [...events].sort((a, b) => {
    const aDate = new Date(a.date + 'T12:00:00')
    const bDate = new Date(b.date + 'T12:00:00')
    const aDiff = Math.floor((aDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    const bDiff = Math.floor((bDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (aDiff < 0 && bDiff < 0) return bDate.getTime() - aDate.getTime()
    if (aDiff < 0) return 1
    if (bDiff < 0) return -1
    if (aDiff === 0) return -1
    if (bDiff === 0) return 1
    if (aDiff === 1) return -1
    if (bDiff === 1) return 1
    return aDate.getTime() - bDate.getTime()
  })
}

export function EventCard({ event }: EventCardProps) {
  const status = getEventStatus(event.date)
  const expired = event.date && isEventExpired(event.date)

  return (
    <article className={`event-card glass-card ${status.className} ${expired ? 'event-expired' : ''}`}>
      {event.image_url && (
        <div className="event-card-image-wrapper">
          <img src={event.image_url} alt={event.title} className="event-card-image" />
        </div>
      )}
      <div className="event-card-body">
        <div className="event-card-title-row">
          <h3 className="event-card-title">{event.title}</h3>
          <span className={`event-status-badge ${status.className}`}>{status.label}</span>
        </div>
        <p className="event-card-description">{event.description}</p>
        <div className="event-card-details">
          <div className="event-card-detail">
            <Calendar size={16} />
            <span>{formatDate(event.date)}</span>
          </div>
          {event.time && (
            <div className="event-card-detail">
              <Clock size={16} />
              <span>{event.time}</span>
            </div>
          )}
          <div className="event-card-detail">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
        </div>
        {event.maps_url && /^https:\/\/(www\.)?(google|maps)/.test(event.maps_url) && (
          <a
            href={event.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="event-card-map-link"
          >
            Ver no mapa
          </a>
        )}
      </div>
    </article>
  )
}
