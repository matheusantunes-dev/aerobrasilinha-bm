import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Loading } from '../Loading/Loading'

interface AdminRouteProps {
  children: React.ReactNode
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading, isAdmin } = useAuth()

  if (loading) return <Loading />
  if (!user || !isAdmin) return <Navigate to="/admin" replace />

  return <>{children}</>
}
