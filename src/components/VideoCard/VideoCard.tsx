import type { VideoItem } from '../../types'
import './VideoCard.css'

interface VideoCardProps {
  video: VideoItem
}

function getYouTubeEmbedUrl(url: string): string {
  const shortMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`

  const watchMatch = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:[?&]|$)/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`

  return url
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="video-card glass-card">
      <div className="video-card-wrapper">
        <iframe
          src={getYouTubeEmbedUrl(video.url)}
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
