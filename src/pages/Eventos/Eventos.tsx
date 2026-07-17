import { useEvents } from '../../hooks/useEvents'
import { EventCard, sortEvents, isEventExpired, getEventStatus } from '../../components/EventCard/EventCard'
import { LoadingGrid } from '../../components/Loading/Loading'
import './Eventos.css'

export function Eventos() {
  const { events, loading } = useEvents()

  const active = events.filter(e => !isEventExpired(e.date))
  const past = events.filter(e => isEventExpired(e.date))

  const sortedActive = sortEvents(active)
  const sortedPast = sortEvents(past)

  const hoje = sortedActive.filter(e => getEventStatus(e.date).className === 'badge-hoje')
  const outros = sortedActive.filter(e => getEventStatus(e.date).className !== 'badge-hoje')

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
            {hoje.length > 0 && (
              <>
                <h2 className="eventos-subtitle hoje-subtitle">🔥 Voos de Hoje</h2>
                <div className="eventos-grid">
                  {hoje.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </>
            )}

            {outros.length > 0 && (
              <>
                <h2 className="eventos-subtitle">Próximos Eventos</h2>
                <div className="eventos-grid">
                  {outros.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </>
            )}

            {sortedPast.length > 0 && (
              <>
                <h2 className="eventos-subtitle">Eventos Realizados</h2>
                <div className="eventos-grid">
                  {sortedPast.map(event => (
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
