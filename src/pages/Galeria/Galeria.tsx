import { useGallery } from '../../hooks/useGallery'
import { PhotoCard } from '../../components/PhotoCard/PhotoCard'
import { LoadingGrid } from '../../components/Loading/Loading'
import './Galeria.css'

export function Galeria() {
  const { items, loading } = useGallery()

  return (
    <div className="galeria-page section">
      <div className="container">
        <h1 className="section-title">Galeria de Fotos</h1>
        <p className="section-subtitle">
          Momentos e registros do Aerobrasilinha
        </p>

        {loading ? (
          <LoadingGrid count={6} />
        ) : items.length > 0 ? (
          <div className="galeria-grid">
            {items.map(photo => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        ) : (
          <div className="galeria-empty">
            <p>Nenhuma foto na galeria ainda.</p>
            <p>Em breve registros do clube!</p>
          </div>
        )}
      </div>
    </div>
  )
}
