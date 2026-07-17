import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEvents } from '../../../hooks/useEvents'
import { ArrowLeft, Edit3, Trash2, Plus } from 'lucide-react'
import { Loading } from '../../../components/Loading/Loading'
import './EventList.css'

export function EventList() {
  const navigate = useNavigate()
  const { events, loading, deleteEvent } = useEvents()
  const [deleting, setDeleting] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este evento?')) return
    setDeleting(id)
    await deleteEvent(id)
    setDeleting(null)
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr + 'T12:00:00')
    return date.toLocaleDateString('pt-BR')
  }

  return (
    <div className="event-list-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
          <ArrowLeft size={18} />
          Voltar
        </button>

        <div className="event-list-header">
          <h1 className="list-title">Gerenciar Eventos</h1>
          <button className="btn-primary" onClick={() => navigate('/admin/eventos/novo')}>
            <Plus size={16} />
            Novo Evento
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : events.length === 0 ? (
          <div className="list-empty">
            <p>Nenhum evento cadastrado.</p>
          </div>
        ) : (
          <div className="event-table">
            <div className="event-table-header">
              <span>Data</span>
              <span>Título</span>
              <span>Local</span>
              <span>Ações</span>
            </div>
            {events.map(event => (
              <div key={event.id} className="event-table-row">
                <span className="event-table-date">{formatDate(event.date)}</span>
                <span className="event-table-title">{event.title}</span>
                <span className="event-table-location">{event.location}</span>
                <div className="event-table-actions">
                  <button
                    className="btn-action edit"
                    onClick={() => navigate(`/admin/eventos/editar/${event.id}`)}
                    title="Editar"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    className="btn-action delete"
                    onClick={() => handleDelete(event.id)}
                    disabled={deleting === event.id}
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
