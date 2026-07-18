import { useState } from 'react'
import { useGallery } from '../../hooks/useGallery'
import { PhotoCard } from '../../components/PhotoCard/PhotoCard'
import { ImageModal } from '../../components/ImageModal/ImageModal'
import { LoadingGrid } from '../../components/Loading/Loading'
import { SEO } from '../../components/SEO/SEO'
import './Galeria.css'

export function Galeria() {
  const { items, loading } = useGallery()
  const [modalIndex, setModalIndex] = useState<number | null>(null)

  const images = items.map(item => ({ url: item.image_url, caption: item.caption }))

  return (
    <div className="galeria-page section">
      <div className="container">
        <SEO title="Galeria de Fotos" description="Fotos e registros do Aerobrasilinha, clube de aeromodelismo em Brasília de Minas - MG." />
        <h1 className="section-title">Galeria de Fotos</h1>
        <p className="section-subtitle">
          Momentos e registros do Aerobrasilinha
        </p>

        {loading ? (
          <LoadingGrid count={6} />
        ) : items.length > 0 ? (
          <div className="galeria-grid">
            {items.map((photo, idx) => (
              <div key={photo.id} onClick={() => setModalIndex(idx)} style={{ cursor: 'pointer' }}>
                <PhotoCard photo={photo} />
              </div>
            ))}
          </div>
        ) : (
          <div className="galeria-empty">
            <p>Nenhuma foto na galeria ainda.</p>
            <p>Em breve registros do clube!</p>
          </div>
        )}
      </div>

      {modalIndex !== null && (
        <ImageModal
          images={images}
          currentIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onChange={setModalIndex}
        />
      )}
    </div>
  )
}
