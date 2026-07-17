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

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="event-card glass-card">
      {event.image_url && (
        <div className="event-card-image-wrapper">
          <img src={event.image_url} alt={event.title} className="event-card-image" />
        </div>
      )}
      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>
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
