import { useState } from 'react'
import type { VideoItem } from '../../types'
import { Play } from 'lucide-react'
import './VideoCard.css'

interface VideoCardProps {
  video: VideoItem
}

function getVideoId(url: string): string | null {
  const shortMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) return shortMatch[1]

  const watchMatch = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:[?&]|$)/)
  if (watchMatch) return watchMatch[1]

  const altMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (altMatch) return altMatch[1]

  return null
}

export function VideoCard({ video }: VideoCardProps) {
  const [playing, setPlaying] = useState(false)
  const videoId = getVideoId(video.url)

  if (!videoId) {
    return (
      <div className="video-card glass-card">
        <div className="video-card-body">
          <h3 className="video-card-title">{video.title}</h3>
        </div>
      </div>
    )
  }

  if (playing) {
    return (
      <div className="video-card glass-card">
        <div className="video-card-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={video.title}
            className="video-card-iframe"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
        <div className="video-card-body">
          <h3 className="video-card-title">{video.title}</h3>
          <span className={`video-card-badge ${video.type}`}>
            {video.type === 'short' ? 'Short' : 'Vídeo'}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="video-card glass-card">
      <button className="video-card-thumb" onClick={() => setPlaying(true)}>
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={video.title}
          className="video-card-thumb-img"
          loading="lazy"
        />
        <div className="video-card-play">
          <Play size={40} />
        </div>
      </button>
      <div className="video-card-body">
        <h3 className="video-card-title">{video.title}</h3>
        <span className={`video-card-badge ${video.type}`}>
          {video.type === 'short' ? 'Short' : 'Vídeo'}
        </span>
      </div>
    </div>
  )
}
