import {Navigate, Outlet } from 'react-router-dom'; 

export function ProtectedRoute () {
  const raw = localStorage.getItem('superadmin');
  if (!raw) {
    return <Navigate to="/superadmin/login" replace />;
  }
  try {
    const user = JSON.parse(raw);
    if (user.role !== 'SUPER_ADMIN') {
      localStorage.removeItem('superadmin');
      return <Navigate to="/superadmin/login" replace />;
    }
  } catch{
    localStorage.removeItem('superadmin');
    return <Navigate to="/superadmin/login" replace />;
  }
  return <Outlet />;
};