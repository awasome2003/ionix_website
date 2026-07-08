import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth.jsx'
import { ToastProvider } from './ui.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Leads from './pages/Leads.jsx'
import Registrations from './pages/Registrations.jsx'
import Subscribers from './pages/Subscribers.jsx'
import Gallery from './pages/Gallery.jsx'
import Testimonials from './pages/Testimonials.jsx'
import Events from './pages/Events.jsx'

export default function AdminApp() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
            <Route path="registrations" element={<Registrations />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="events" element={<Events />} />
          </Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  )
}
