import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGallery } from '../../../hooks/useGallery'
import { ArrowLeft, Trash2, Upload, Save } from 'lucide-react'
import { Loading } from '../../../components/Loading/Loading'
import './GalleryManager.css'

export function GalleryManager() {
  const navigate = useNavigate()
  const { items, loading, addItem, updateItem, deleteItem, uploadImage } = useGallery()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingCaption, setEditingCaption] = useState<{ id: number; caption: string } | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)
    const url = await uploadImage(file)
    if (!url) {
      setError('Erro ao fazer upload da imagem')
      setUploading(false)
      return
    }

    const maxOrder = items.reduce((max, item) => Math.max(max, item.sort_order), 0)
    const err = await addItem({ image_url: url, caption: '', sort_order: maxOrder + 1 })
    if (err) setError(err)
    setUploading(false)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Excluir esta foto?')) return
    const err = await deleteItem(id)
    if (err) setError(err)
  }

  const handleSaveCaption = async () => {
    if (!editingCaption) return
    const err = await updateItem(editingCaption.id, { caption: editingCaption.caption })
    if (err) setError(err)
    setEditingCaption(null)
  }

  return (
    <div className="gallery-manager-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
          <ArrowLeft size={18} />
          Voltar
        </button>

        <div className="gm-header">
          <h1 className="gm-title">Gerenciar Galeria</h1>
          <label className="btn-primary upload-btn">
            <Upload size={16} />
            {uploading ? 'Enviando...' : 'Adicionar Foto'}
            <input type="file" accept="image/*" onChange={handleUpload} hidden disabled={uploading} />
          </label>
        </div>

        {error && <div className="gm-error">{error}</div>}

        {loading ? (
          <Loading />
        ) : items.length === 0 ? (
          <div className="gm-empty">
            <p>Nenhuma foto na galeria. Clique em "Adicionar Foto" para começar.</p>
          </div>
        ) : (
          <div className="gm-grid">
            {items.map(photo => (
              <div key={photo.id} className="gm-card glass-card">
                <div className="gm-card-image">
                  <img src={photo.image_url} alt={photo.caption || 'Foto'} />
                </div>
                <div className="gm-card-body">
                  {editingCaption?.id === photo.id ? (
                    <div className="gm-caption-edit">
                      <textarea
                        value={editingCaption.caption}
                        onChange={e => setEditingCaption({ ...editingCaption, caption: e.target.value })}
                        rows={2}
                      />
                      <button className="btn-primary gm-save-btn" onClick={handleSaveCaption}>
                        <Save size={14} />
                        Salvar
                      </button>
                    </div>
                  ) : (
                    <div className="gm-caption-display">
                      <p onClick={() => setEditingCaption({ id: photo.id, caption: photo.caption })}>
                        {photo.caption || 'Clique para adicionar legenda'}
                      </p>
                      <button className="btn-action delete" onClick={() => handleDelete(photo.id)} title="Excluir">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
