import { useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import './ImageModal.css'

interface ImageModalProps {
  images: { url: string; caption?: string }[]
  currentIndex: number
  onClose: () => void
  onChange: (index: number) => void
}

export function ImageModal({ images, currentIndex, onClose, onChange }: ImageModalProps) {
  const isFirst = currentIndex === 0
  const isLast = currentIndex === images.length - 1

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && !isFirst) onChange(currentIndex - 1)
      if (e.key === 'ArrowRight' && !isLast) onChange(currentIndex + 1)
    },
    [currentIndex, isFirst, isLast, onClose, onChange]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const current = images[currentIndex]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <button className="modal-close" onClick={onClose}>
        <X size={28} />
      </button>

      <button
        className={`modal-nav modal-prev ${isFirst ? 'disabled' : ''}`}
        onClick={e => { e.stopPropagation(); if (!isFirst) onChange(currentIndex - 1) }}
        disabled={isFirst}
      >
        <ChevronLeft size={36} />
      </button>

      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <img src={current.url} alt={current.caption || ''} className="modal-image" />
        {current.caption && <p className="modal-caption">{current.caption}</p>}
        <span className="modal-counter">{currentIndex + 1} / {images.length}</span>
      </div>

      <button
        className={`modal-nav modal-next ${isLast ? 'disabled' : ''}`}
        onClick={e => { e.stopPropagation(); if (!isLast) onChange(currentIndex + 1) }}
        disabled={isLast}
      >
        <ChevronRight size={36} />
      </button>
    </div>
  )
}
