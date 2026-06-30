import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/guest/LandingPage'
import Login from './pages/guest/Login'
import Signup from './pages/guest/Signup'
import HostLandingPage from './pages/host/HostLandingPage'
import HostLogin from './pages/host/HostLogin'
import HostSignup from './pages/host/HostSignup'
import HostPortalPage from './pages/host/HostPortalPage'
import CountryPage from './pages/guest/CountryPage'
import HotelDetailPage from './pages/guest/HotelDetailPage'
import SuperAdminLayout from './layouts/SuperAdminLayout'
import { ProtectedRoute } from './routes/ProtectedRoute'
import Superadmindashboard from './pages/superadmin/dashboard/superadmindashboard'
import TenantManagement from './pages/superadmin/tenant/tenantmanagement'
import TenantDetails from './pages/superadmin/tenant/tenantdetails'
import Subscriptions from './pages/superadmin/commerce/subscriptions'
import Billing from './pages/superadmin/billing/billing'
import FeatureFlags from './pages/superadmin/flags/featureflags'
import Analytics from './pages/superadmin/analytics/analytics'
import Reports from './pages/superadmin/reports/reports'
import Exports from './pages/superadmin/exports/exports'
import SupportTickets from './pages/superadmin/tickets/supporttickets'
import Announcements from './pages/superadmin/announcements/announcements'
import SystemHealth from './pages/superadmin/health/systemhealth'
import AuditLogs from './pages/superadmin/audit/auditlogs'
import RolesPermissions from './pages/superadmin/roles/rolespermissions'
import Settings from './pages/superadmin/settings/settings'
import Superadminlogin from './pages/superadmin/superadminlogin'
import { Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/become-a-host" element={<HostLandingPage />} />
        <Route path="/host/login" element={<HostLogin />} />
        <Route path="/host/signup" element={<HostSignup />} />
        <Route path="/host" element={<HostLandingPage />} />
        <Route path="/host/portal" element={<HostPortalPage />} />
        <Route path="/country/:code" element={<CountryPage />} />
        <Route path="/hotel/:id" element={<HotelDetailPage />} />
        <Route path="/superadmin/login" element={<Superadminlogin />} />	

        <Route path="/superadmin" element={<ProtectedRoute />}>
          <Route element={<SuperAdminLayout />}>
            <Route path="dashboard" element={<Superadmindashboard />} />
            <Route index element={<Navigate to="/superadmin/dashboard" replace />} />
            <Route path="tenants" element={<TenantManagement />} />
            <Route path="tenants/details" element={<TenantDetails />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="billing" element={<Billing />} />
            <Route path="flags" element={<FeatureFlags />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
            <Route path="exports" element={<Exports />} />
            <Route path="tickets" element={<SupportTickets />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="health" element={<SystemHealth />} />
            <Route path="audit" element={<AuditLogs />} />
            <Route path="roles" element={<RolesPermissions />} />
            <Route path="settings" element={<Settings />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
