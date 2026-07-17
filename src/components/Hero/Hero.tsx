import './Hero.css'

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div
        className="hero-bg"
        style={{ backgroundImage: 'url(/images/banner/channels4_banner.jpg)' }}
      />
      <div className="hero-content container">
        <div className="hero-logo-wrapper">
          <img
            src="/images/logo/channels4_profile (1).jpg"
            alt="Aerobrasilinha"
            className="hero-logo"
          />
        </div>
        <h1 className="hero-title">AEROBRASILINHA</h1>
        <p className="hero-subtitle">Clube de Aeromodelismo em Brasília de Minas - MG</p>
        <p className="hero-description">
          Um clube recém-nascido com a missão de unir apaixonados por aeromodelismo.
          Voamos juntos!
        </p>
        <div className="hero-actions">
          <a href="#sobre" className="btn-primary">Conheça o Clube</a>
          <a href="/eventos" className="btn-secondary">Próximos Eventos</a>
        </div>
      </div>
    </section>
  )
}
