import { useEvents } from '../../hooks/useEvents'
import { EventCard } from '../../components/EventCard/EventCard'
import { LoadingGrid } from '../../components/Loading/Loading'
import './Eventos.css'

export function Eventos() {
  const { events, loading } = useEvents()

  const upcoming = events.filter(e => new Date(e.date + 'T12:00:00') >= new Date())
  const past = events.filter(e => new Date(e.date + 'T12:00:00') < new Date())

  return (
    <div className="eventos-page section">
      <div className="container">
        <h1 className="section-title">Eventos</h1>
        <p className="section-subtitle">
          Confira nossas revoadas e encontros de aeromodelismo
        </p>

        {loading ? (
          <LoadingGrid count={4} />
        ) : (
          <>
            {upcoming.length > 0 && (
              <>
                <h2 className="eventos-subtitle">Próximos Eventos</h2>
                <div className="eventos-grid">
                  {upcoming.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </>
            )}

            {past.length > 0 && (
              <>
                <h2 className="eventos-subtitle">Eventos Realizados</h2>
                <div className="eventos-grid">
                  {past.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </>
            )}

            {events.length === 0 && (
              <div className="eventos-empty">
                <p>Nenhum evento cadastrado ainda.</p>
                <p>Acompanhe o clube para saber dos próximos encontros!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
