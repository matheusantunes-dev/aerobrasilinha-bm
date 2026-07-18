import { useMessages } from '../../../hooks/useMessages'
import { Trash2, ArrowLeft, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LoadingGrid } from '../../../components/Loading/Loading'
import './Messages.css'

export function Messages() {
  const { messages, loading, deleteMessage } = useMessages()
  const navigate = useNavigate()

  const handleDelete = async (id: number) => {
    if (window.confirm('Excluir esta mensagem?')) {
      await deleteMessage(id)
    }
  }

  return (
    <div className="messages-page">
      <div className="container">
        <div className="messages-header">
          <div>
            <h1 className="messages-title">Mensagens</h1>
            <p className="messages-subtitle">Mensagens recebidas do ChatBot</p>
          </div>
          <button onClick={() => navigate('/admin/dashboard')} className="btn-secondary">
            <ArrowLeft size={18} />
            Voltar
          </button>
        </div>

        {loading ? (
          <LoadingGrid count={3} />
        ) : messages.length === 0 ? (
          <div className="messages-empty">
            <Mail size={40} />
            <p>Nenhuma mensagem recebida ainda.</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map(msg => (
              <div key={msg.id} className="messages-card glass-card">
                <div className="messages-card-header">
                  <strong>{msg.name}</strong>
                  {msg.email && <span className="messages-email">{msg.email}</span>}
                  <span className="messages-date">
                    {new Date(msg.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit', month: 'long', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="messages-text">{msg.message}</p>
                <button
                  className="messages-delete"
                  onClick={() => handleDelete(msg.id)}
                >
                  <Trash2 size={14} />
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
