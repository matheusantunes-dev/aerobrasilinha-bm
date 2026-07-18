import { videos } from '../../data/videos'
import { VideoCard } from '../../components/VideoCard/VideoCard'
import { SEO } from '../../components/SEO/SEO'
import './Videos.css'

export function Videos() {
  const pistaVideos = videos.filter(v => v.id.startsWith('pista'))
  const outrosVideos = videos.filter(v => v.id.startsWith('div'))

  return (
    <div className="videos-page section">
      <div className="container">
        <SEO title="Vídeos" description="Vídeos de voos, revoadas e aeromodelismo do Aerobrasilinha em Brasília de Minas - MG." />
        <h1 className="section-title">Vídeos</h1>
        <p className="section-subtitle">
          Registros em vídeo do Aerobrasilinha
        </p>

        <h2 className="videos-subtitle">Voo na Pista</h2>
        <div className="videos-grid">
          {pistaVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        <h2 className="videos-subtitle">Outros Vôos do Clube</h2>
        <div className="videos-grid">
          {outrosVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  )
}
