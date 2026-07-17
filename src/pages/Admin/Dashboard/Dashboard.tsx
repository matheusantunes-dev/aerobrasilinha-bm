import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { LogOut, Plus, Edit3, Image } from 'lucide-react'
import './Dashboard.css'

export function Dashboard() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/admin')
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Painel Admin</h1>
            <p className="dashboard-subtitle">Gerencie eventos e galeria do Aerobrasilinha</p>
          </div>
          <button onClick={handleLogout} className="btn-danger">
            <LogOut size={16} />
            Sair
          </button>
        </div>

        <div className="dashboard-grid">
          <Link to="/admin/eventos/novo" className="dashboard-card glass-card">
            <Plus size={32} className="card-icon" />
            <h3>Criar Evento</h3>
            <p>Adicione um novo evento ao calendário</p>
          </Link>

          <Link to="/admin/eventos" className="dashboard-card glass-card">
            <Edit3 size={32} className="card-icon" />
            <h3>Gerenciar Eventos</h3>
            <p>Edite ou remova eventos existentes</p>
          </Link>

          <Link to="/admin/galeria" className="dashboard-card glass-card">
            <Image size={32} className="card-icon" />
            <h3>Gerenciar Galeria</h3>
            <p>Adicione, edite legendas ou remova fotos</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
