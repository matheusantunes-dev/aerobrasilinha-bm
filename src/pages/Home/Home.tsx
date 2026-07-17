import { Link } from 'react-router-dom'
import { Hero } from '../../components/Hero/Hero'
import { EventCard } from '../../components/EventCard/EventCard'
import { useEvents } from '../../hooks/useEvents'
import { LoadingGrid } from '../../components/Loading/Loading'
import './Home.css'

export function Home() {
  const { events, loading } = useEvents()
  const upcoming = events.filter(e => new Date(e.date + 'T12:00:00') >= new Date()).slice(0, 3)

  return (
    <>
      <Hero />

      <section id="sobre" className="section about-section">
        <div className="container">
          <h2 className="section-title">Sobre o Clube</h2>
          <p className="section-subtitle">
            Um novo clube de aeromodelismo nascendo com muita energia
          </p>

          <div className="about-content">
            <div className="about-card glass-card">
              <h3>Quem Somos</h3>
              <p>
                O Aerobrasilinha é um clube de aeromodelismo recém-nascido, idealizado por apaixonados
                pela aviação em miniatura. Estamos construindo nossa estrutura na pista de aeromodelismo
                e convidamos todos os entusiastas a fazerem parte dessa história desde o início.
              </p>
            </div>

            <div className="about-card glass-card">
              <h3>🚧 Em Construção</h3>
              <p>
                Nossa pista e sede estão em fase de desenvolvimento. Estamos trabalhando para oferecer
                a melhor estrutura para nossos membros. Acompanhe nosso progresso e venha voar conosco!
              </p>
            </div>

            <div className="about-card glass-card">
              <h3>📍 Voo no Aeroporto Regional</h3>
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
            Fique por dentro das nossas revoadas e encontros
          </p>

          {loading ? (
            <LoadingGrid count={3} />
          ) : upcoming.length > 0 ? (
            <div className="events-preview-grid">
              {upcoming.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="events-empty">
              <p>Nenhum evento agendado no momento.</p>
              <p>Fique ligado nas redes sociais para novidades!</p>
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
              Entre em contato e venha conhecer o Aerobrasilinha. Todos são bem-vindos!
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
