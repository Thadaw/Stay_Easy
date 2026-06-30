import { Navigate, Outlet } from 'react-router-dom'

export function OperationsRoute() {
  const raw = localStorage.getItem('operator')
  if (!raw) {
    return <Navigate to="/operations/login" replace />
  }
  return <Outlet />
}