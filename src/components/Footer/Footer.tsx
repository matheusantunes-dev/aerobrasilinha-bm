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
            Clube de aeromodelismo em Brasília de Minas - MG
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
