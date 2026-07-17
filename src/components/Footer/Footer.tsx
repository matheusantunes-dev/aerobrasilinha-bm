import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Aerobrasilinha</h3>
          <p className="footer-text">
            Clube de aeromodelismo em ascensão. Voamos juntos!
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Navegação</h4>
          <div className="footer-links">
            <Link to="/eventos">Eventos</Link>
            <Link to="/galeria">Galeria</Link>
            <Link to="/videos">Vídeos</Link>
            <Link to="/localizacao">Localização</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Links</h4>
          <div className="footer-links">
            <a href="https://www.youtube.com/@aerobrasilinhabr" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2c-.3-1-1-1.8-2-2-1.8-.5-9-.5-9-.5s-7.2 0-9 .5c-.7.2-1.5 1-2 2-.5 1.8-.5 5.5-.5 5.5s0 3.7.5 5.5c.3 1 1 1.8 2 2 1.8.5 9 .5 9 .5s7.2 0 9-.5c.7-.2 1.5-1 2-2 .5-1.8.5-5.5.5-5.5s0-3.7-.5-5.5zM9.5 15.5V8.5l6 3.5-6 3.5z"/></svg>
              YouTube
            </a>
            <a href="https://www.google.com/maps/place/Pista+de+Aeromodelismo+AEROBRASILINHA/" target="_blank" rel="noopener noreferrer">
              <MapPin size={16} /> Google Maps
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Aerobrasilinha Aeromodelismo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
