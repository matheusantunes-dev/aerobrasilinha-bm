import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './hooks/useAuth'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { ChatBot } from './components/ChatBot/ChatBot'
import { AdminRoute } from './components/AdminRoute/AdminRoute'
import { Home } from './pages/Home/Home'
import { Eventos } from './pages/Eventos/Eventos'
import { Galeria } from './pages/Galeria/Galeria'
import { Videos } from './pages/Videos/Videos'
import { Localizacao } from './pages/Localizacao/Localizacao'
import { Login } from './pages/Admin/Login/Login'
import { Dashboard } from './pages/Admin/Dashboard/Dashboard'
import { EventForm } from './pages/Admin/EventForm/EventForm'
import { EventList } from './pages/Admin/EventList/EventList'
import { GalleryManager } from './pages/Admin/GalleryManager/GalleryManager'
import { Messages } from './pages/Admin/Messages/Messages'

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}

export default function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<AppLayout><Home /></AppLayout>} />
          <Route path="/eventos" element={<AppLayout><Eventos /></AppLayout>} />
          <Route path="/galeria" element={<AppLayout><Galeria /></AppLayout>} />
          <Route path="/videos" element={<AppLayout><Videos /></AppLayout>} />
          <Route path="/localizacao" element={<AppLayout><Localizacao /></AppLayout>} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout><Login /></AdminLayout>} />
          <Route path="/admin/dashboard" element={<AdminLayout><AdminRoute><Dashboard /></AdminRoute></AdminLayout>} />
          <Route path="/admin/eventos" element={<AdminLayout><AdminRoute><EventList /></AdminRoute></AdminLayout>} />
          <Route path="/admin/eventos/novo" element={<AdminLayout><AdminRoute><EventForm /></AdminRoute></AdminLayout>} />
          <Route path="/admin/eventos/editar/:id" element={<AdminLayout><AdminRoute><EventForm /></AdminRoute></AdminLayout>} />
          <Route path="/admin/galeria" element={<AdminLayout><AdminRoute><GalleryManager /></AdminRoute></AdminLayout>} />
          <Route path="/admin/mensagens" element={<AdminLayout><AdminRoute><Messages /></AdminRoute></AdminLayout>} />
        </Routes>
        <ChatBot />
      </AuthProvider>
    </BrowserRouter>
    </HelmetProvider>
  )
}
