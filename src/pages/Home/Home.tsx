import { Link } from 'react-router-dom'
import { Hero } from '../../components/Hero/Hero'
import { SEO } from '../../components/SEO/SEO'
import { EventCard, sortEvents, getEventStatus } from '../../components/EventCard/EventCard'
import { useEvents } from '../../hooks/useEvents'
import { HardHat, MapPin } from 'lucide-react'
import { LoadingGrid } from '../../components/Loading/Loading'
import './Home.css'

export function Home() {
  const { events, loading } = useEvents()
  const hoje = sortEvents(events).filter(e => getEventStatus(e.date).className === 'badge-hoje').slice(0, 3)
  const upcoming = sortEvents(events).filter(e => getEventStatus(e.date).className !== 'badge-hoje').slice(0, 3)
  const preview = hoje.length > 0 ? hoje : upcoming

  return (
    <>
      <SEO />
      <Hero />

      <section id="sobre" className="section about-section">
        <div className="container">
          <h2 className="section-title">Sobre o Clube</h2>
          <p className="section-subtitle">
            Um movimento que só cresce no aeromodelismo mineiro
          </p>

          <div className="about-content">
            <div className="about-card glass-card">
              <h3>Quem Somos</h3>
              <p>
                O Aerobrasilinha é um clube de aeromodelismo em plena atividade, idealizado por entusiastas
                da aviação em miniatura. Estamos estruturando nossa pista e convidamos todos os pilotos
                a fazerem parte dessa história.
              </p>
            </div>

            <div className="about-card glass-card">
              <h3><HardHat size={20} /> Estrutura em Desenvolvimento</h3>
              <p>
                Nossa pista e sede estão em fase de desenvolvimento. Estamos trabalhando para oferecer
                a melhor estrutura para nossos membros. Acompanhe nosso progresso e venha voar conosco!
              </p>
            </div>

            <div className="about-card glass-card">
              <h3><MapPin size={20} /> Voo no Aeroporto Regional</h3>
              <p>
                Além da nossa pista, voos também podem ser realizados no Aeroporto Regional de Brasília
                de Minas. Consulte sempre o endereço dos eventos para não haver mal-entendidos.
              </p>
              <Link to="/localizacao" className="about-link">
                Ver mapas e endereços
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section events-preview-section">
        <div className="container">
          <h2 className="section-title">Próximos Eventos</h2>
          <p className="section-subtitle">
            Confira as revoadas e encontros programados
          </p>

          {loading ? (
            <LoadingGrid count={3} />
          ) : preview.length > 0 ? (
            <div className="events-preview-grid">
              {preview.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="events-empty">
              <p>Nenhum evento agendado no momento.</p>
              <p>Acompanhe o clube para saber dos próximos encontros!</p>
            </div>
          )}

          <div className="events-preview-cta">
            <Link to="/eventos" className="btn-primary">
              Ver Todos os Eventos
            </Link>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-content glass-card">
            <h2 className="cta-title">Quer fazer parte?</h2>
            <p className="cta-text">
              Entre em contato e venha conhecer o Aerobrasilinha. Todos os pilotos são bem-vindos!
            </p>
            <a
              href="https://www.youtube.com/@aerobrasilinhabr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Acesse nosso YouTube
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
