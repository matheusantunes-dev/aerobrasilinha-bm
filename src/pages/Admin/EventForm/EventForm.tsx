import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEvents } from '../../../hooks/useEvents'
import { supabase } from '../../../services/supabase'
import { ArrowLeft, Upload } from 'lucide-react'
import type { Event } from '../../../types'
import './EventForm.css'

export function EventForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { events, createEvent, updateEvent } = useEvents()
  const isEditing = !!id

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [address, setAddress] = useState('')
  const [mapsUrl, setMapsUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (isEditing && events.length > 0) {
      const event = events.find(e => e.id === Number(id))
      if (event) {
        setTitle(event.title)
        setDescription(event.description)
        setDate(event.date)
        setTime(event.time)
        setLocation(event.location)
        setAddress(event.address)
        setMapsUrl(event.maps_url)
        setImageUrl(event.image_url)
      }
    }
  }, [isEditing, id, events])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const ext = file.name.split('.').pop()
    const fileName = `event-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { data, error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, file)

    if (uploadError || !data) {
      setError('Erro ao fazer upload da imagem')
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(data.path)

    setImageUrl(publicUrl)
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    const eventData = {
      title,
      description,
      date,
      time,
      location,
      address,
      maps_url: mapsUrl,
      image_url: imageUrl,
    }

    let err: string | null
    if (isEditing) {
      err = await updateEvent(Number(id), eventData)
    } else {
      err = await createEvent(eventData as Omit<Event, 'id' | 'created_at'>)
    }

    if (err) {
      setError(err)
      setSaving(false)
    } else {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="event-form-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
          <ArrowLeft size={18} />
          Voltar
        </button>

        <h1 className="form-title">{isEditing ? 'Editar Evento' : 'Novo Evento'}</h1>

        <form onSubmit={handleSubmit} className="event-form">
          {error && <div className="form-error">{error}</div>}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Título do Evento *</label>
              <input id="title" value={title} onChange={e => setTitle(e.target.value)} required placeholder="Ex: Revoada de Sábado" />
            </div>

            <div className="form-group">
              <label htmlFor="date">Data *</label>
              <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
            </div>

            <div className="form-group">
              <label htmlFor="time">Horário</label>
              <input id="time" value={time} onChange={e => setTime(e.target.value)} placeholder="Ex: 08:00 - 12:00" />
            </div>

            <div className="form-group">
              <label htmlFor="location">Local</label>
              <input id="location" value={location} onChange={e => setLocation(e.target.value)} placeholder="Ex: Pista Aerobrasilinha" />
            </div>

            <div className="form-group">
              <label htmlFor="address">Endereço</label>
              <input id="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Endereço completo" />
            </div>

            <div className="form-group">
              <label htmlFor="mapsUrl">Link do Google Maps</label>
              <input id="mapsUrl" value={mapsUrl} onChange={e => setMapsUrl(e.target.value)} placeholder="https://maps.app.goo.gl/..." />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              placeholder="Descreva o evento..."
            />
          </div>

          <div className="form-group">
            <label>Imagem do Evento</label>
            <div className="upload-area">
              {imageUrl ? (
                <div className="upload-preview">
                  <img src={imageUrl} alt="Preview" />
                  <button type="button" className="upload-remove" onClick={() => setImageUrl('')}>
                    Remover
                  </button>
                </div>
              ) : (
                <label className="upload-label">
                  <Upload size={24} />
                  <span>{uploading ? 'Enviando...' : 'Clique para fazer upload'}</span>
                  <input type="file" accept="image/*" onChange={handleUpload} hidden disabled={uploading} />
                </label>
              )}
            </div>
          </div>

          <button type="submit" className="btn-primary submit-btn" disabled={saving}>
            {saving ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Criar Evento'}
          </button>
        </form>
      </div>
    </div>
  )
}
