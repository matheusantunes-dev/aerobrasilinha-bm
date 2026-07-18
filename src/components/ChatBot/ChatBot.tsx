import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, ChevronRight } from 'lucide-react'
import { useMessages } from '../../hooks/useMessages'
import './ChatBot.css'

interface Option {
  id: string
  label: string
  response: string | null
  options?: Option[]
}

const options: Option[] = [
  {
    id: 'socio',
    label: 'Quero ser sócio / participar',
    response: 'Ótimo! Mande seu nome e um contato (WhatsApp ou email) que entraremos em contato.',
  },
  {
    id: 'eventos',
    label: 'Próximos eventos',
    response: 'Acesse a página de Eventos no menu do site para ver todas as revoadas e encontros agendados.',
  },
  {
    id: 'fotos',
    label: 'Fotos e vídeos do clube',
    response: 'Confira nossa Galeria e a página de Vídeos no menu do site para ver os registros do clube.',
  },
  {
    id: 'pista',
    label: 'Onde é a pista?',
    response: 'Nossa pista fica em Brasília de Minas - MG. Acesse a página Localização no menu para ver os mapas e endereços.',
  },
  {
    id: 'assistente',
    label: 'Falar com um assistente',
    response: null,
  },
]

type Step = 'menu' | 'response' | 'form' | 'sent'

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('menu')
  const [selected, setSelected] = useState<Option | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')
  const { sendMessage } = useMessages()
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setStep('menu')
      setSelected(null)
      setName('')
      setEmail('')
      setMessage('')
      setStatus('idle')
      setError('')
    }
  }, [open])

  useEffect(() => {
    if (step === 'form' && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [step])

  const handleSelect = (opt: Option) => {
    setSelected(opt)
    if (opt.id === 'assistente') {
      setStep('form')
    } else {
      setStep('response')
    }
  }

  const handleSend = async () => {
    if (!name.trim() || !message.trim()) {
      setError('Preencha nome e mensagem.')
      return
    }
    setStatus('sending')
    setError('')
    const err = await sendMessage(name.trim(), email.trim(), message.trim())
    if (err) {
      setError(err)
      setStatus('idle')
    } else {
      setStep('sent')
      setStatus('sent')
    }
  }

  const handleBack = () => {
    setStep('menu')
    setSelected(null)
  }

  return (
    <>
      <button
        className={`chatbot-toggle ${open ? 'chatbot-toggle--open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Abrir chat"
      >
        {open ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {open && (
        <div className="chatbot-panel glass-card">
          <div className="chatbot-header">
            <MessageSquare size={18} />
            <span>Chat Aerobrasilinha</span>
          </div>

          <div className="chatbot-body">
            {step === 'menu' && (
              <div className="chatbot-menu">
                <p className="chatbot-greeting">Olá! Como podemos ajudar?</p>
                <div className="chatbot-options">
                  {options.map(opt => (
                    <button
                      key={opt.id}
                      className="chatbot-option"
                      onClick={() => handleSelect(opt)}
                    >
                      <span>{opt.label}</span>
                      <ChevronRight size={16} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'response' && selected && (
              <div className="chatbot-response">
                <div className="chatbot-bubble">{selected.response}</div>
                <button className="chatbot-back" onClick={handleBack}>
                  Voltar ao menu
                </button>
              </div>
            )}

            {step === 'form' && (
              <div className="chatbot-form" ref={formRef}>
                <p className="chatbot-form-title">Deixe sua mensagem</p>
                <input
                  type="text"
                  placeholder="Seu nome *"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="chatbot-input"
                />
                <input
                  type="email"
                  placeholder="Seu email (opcional)"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="chatbot-input"
                />
                <textarea
                  placeholder="Sua mensagem *"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="chatbot-textarea"
                  rows={4}
                />
                {error && <p className="chatbot-error">{error}</p>}
                <button
                  className="chatbot-send"
                  onClick={handleSend}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Enviando...' : (
                    <>
                      <Send size={16} />
                      Enviar
                    </>
                  )}
                </button>
                <button className="chatbot-back" onClick={handleBack}>
                  Voltar
                </button>
              </div>
            )}

            {step === 'sent' && (
              <div className="chatbot-sent">
                <p className="chatbot-sent-msg">Mensagem enviada com sucesso!</p>
                <p className="chatbot-sent-sub">Em breve entraremos em contato.</p>
                <button className="chatbot-back" onClick={() => setOpen(false)}>
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
