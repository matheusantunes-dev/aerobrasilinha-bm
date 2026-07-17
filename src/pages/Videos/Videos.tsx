import { videos } from '../../data/videos'
import { VideoCard } from '../../components/VideoCard/VideoCard'
import './Videos.css'

export function Videos() {
  const normalVideos = videos.filter(v => v.type === 'video')
  const shortVideos = videos.filter(v => v.type === 'short')

  return (
    <div className="videos-page section">
      <div className="container">
        <h1 className="section-title">Vídeos</h1>
        <p className="section-subtitle">
          Vídeos e shorts do nosso canal no YouTube
        </p>

        {normalVideos.length > 0 && (
          <>
            <h2 className="videos-subtitle">Vídeos da Pista</h2>
            <div className="videos-grid">
              {normalVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </>
        )}

        {shortVideos.length > 0 && (
          <>
            <h2 className="videos-subtitle">Shorts</h2>
            <div className="videos-grid shorts-grid">
              {shortVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </>
        )}

        {videos.length === 0 && (
          <div className="videos-empty">
            <p>Nenhum vídeo adicionado ainda.</p>
            <p>
              Enquanto isso, visite nosso{' '}
              <a href="https://www.youtube.com/@aerobrasilinhabr" target="_blank" rel="noopener noreferrer">
                canal no YouTube
              </a>
              !
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
