import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Calendar, Image, Video, MapPin, Shield } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import './Header.css'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuth()

  const links = [
    { to: '/', label: 'Início' },
    { to: '/eventos', label: 'Eventos', icon: Calendar },
    { to: '/galeria', label: 'Galeria', icon: Image },
    { to: '/videos', label: 'Vídeos', icon: Video },
    { to: '/localizacao', label: 'Localização', icon: MapPin },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="header">
      <div className="header-container container">
        <Link to="/" className="header-logo">
          <img src="/images/logo/channels4_profile (1).jpg" alt="Aerobrasilinha" className="header-logo-img" />
          <span className="header-logo-text">AEROBRASILINHA</span>
        </Link>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`header-link ${isActive(to) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {Icon && <Icon size={16} />}
              {label}
            </Link>
          ))}
          {user && (
            <Link
              to="/admin/dashboard"
              className={`header-link admin-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <Shield size={16} />
              Admin
            </Link>
          )}
        </nav>

        <button className="header-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}
