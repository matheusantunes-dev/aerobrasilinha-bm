import { videos } from '../../data/videos'
import { VideoCard } from '../../components/VideoCard/VideoCard'
import './Videos.css'

const pistaIds = ['pista-1', 'pista-2']

export function Videos() {
  const pistaVideos = videos.filter(v => pistaIds.includes(v.id))
  const outrosVideos = videos.filter(v => !pistaIds.includes(v.id))

  return (
    <div className="videos-page section">
      <div className="container">
        <h1 className="section-title">Vídeos</h1>
        <p className="section-subtitle">
          Vídeos e shorts do nosso canal no YouTube
        </p>

        {pistaVideos.length > 0 && (
          <>
            <h2 className="videos-subtitle">Voo na Pista</h2>
            <div className="videos-grid">
              {pistaVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </>
        )}

        {outrosVideos.length > 0 && (
          <>
            <h2 className="videos-subtitle">Outros Vôos do Clube!</h2>
            <div className="videos-grid">
              {outrosVideos.map(video => (
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
