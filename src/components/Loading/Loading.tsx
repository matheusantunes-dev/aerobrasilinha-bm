import './Loading.css'

export function Loading() {
  return (
    <div className="loading">
      <div className="loading-spinner" />
      <p className="loading-text">Carregando...</p>
    </div>
  )
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="loading-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="loading-card">
          <div className="skeleton" style={{ height: '200px', width: '100%' }} />
          <div className="skeleton" style={{ height: '16px', width: '70%', marginTop: '16px' }} />
          <div className="skeleton" style={{ height: '12px', width: '90%', marginTop: '8px' }} />
          <div className="skeleton" style={{ height: '12px', width: '50%', marginTop: '8px' }} />
        </div>
      ))}
    </div>
  )
}
