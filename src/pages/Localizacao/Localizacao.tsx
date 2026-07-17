import { MapView } from '../../components/MapView/MapView'
import { AlertTriangle, MapPin, Plane } from 'lucide-react'
import './Localizacao.css'

export function Localizacao() {
  return (
    <div className="localizacao-page section">
      <div className="container">
        <h1 className="section-title">Localização</h1>
        <p className="section-subtitle">
          Onde estamos e onde voamos
        </p>

        <div className="localizacao-alert glass-card">
          <AlertTriangle size={24} className="alert-icon" />
          <div className="alert-content">
            <h3>Aviso Importante</h3>
            <p>
              Nossa pista e sede estão <strong>em construção</strong> — somos um clube recém-nascido!
              Verifique sempre o endereço dos eventos para não haver mal-entendidos.
              Alguns eventos podem ocorrer em locais diferentes.
            </p>
          </div>
        </div>

        <div className="localizacao-grid">
          <div className="localizacao-card glass-card">
            <h2 className="card-title">
              <MapPin size={20} />
              Pista Aerobrasilinha
            </h2>
            <p className="card-address">
              Pista de Aeromodelismo Aerobrasilinha
            </p>
            <MapView
              center={[-16.1878, -44.4571]}
              zoom={15}
              label="Pista de Aeromodelismo AEROBRASILINHA"
              description="Nossa pista principal"
              icon="club"
            />
            <a
              href="https://www.google.com/maps/place/Pista+de+Aeromodelismo+AEROBRASILINHA/@-16.1957105,-44.4610585,2901m/data=!3m1!1e3!4m6!3m5!1s0x7551d0063218a95:0xb27ebb65c4280681!8m2!3d-16.1878388!4d-44.4570676!16s%2Fg%2F11yd0byh35"
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              Abrir no Google Maps
            </a>
          </div>

          <div className="localizacao-card glass-card">
            <h2 className="card-title">
              <Plane size={20} />
              Aeroporto Regional de Brasília de Minas
            </h2>
            <p className="card-address">
              Aeroporto Regional de Brasília de Minas - MG
            </p>
            <MapView
              center={[-16.1967, -44.4595]}
              zoom={14}
              label="Aeroporto Regional de Brasília de Minas"
              description="Voos também podem ser realizados aqui"
              icon="airport"
            />
            <a
              href="https://maps.app.goo.gl/3JyXSj6ZHdj7pr159"
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              Abrir no Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
