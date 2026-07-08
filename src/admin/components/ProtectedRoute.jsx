import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth.jsx'
import { PageLoader } from '../ui.jsx'

// Gates admin pages: shows a loader while the token is being verified,
// then either renders the children or redirects to the login screen.
export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <PageLoader />
      </div>
    )
  }

  if (!admin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}
