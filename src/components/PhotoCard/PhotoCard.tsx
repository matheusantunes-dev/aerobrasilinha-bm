import type { GalleryItem } from '../../types'
import './PhotoCard.css'

interface PhotoCardProps {
  photo: GalleryItem
}

export function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <div className="photo-card glass-card">
      <div className="photo-card-image-wrapper">
        <img src={photo.image_url} alt={photo.caption || 'Foto do clube'} className="photo-card-image" />
      </div>
      {photo.caption && (
        <p className="photo-card-caption">{photo.caption}</p>
      )}
    </div>
  )
}
