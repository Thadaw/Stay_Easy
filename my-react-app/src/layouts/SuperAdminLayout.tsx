import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Building2, Eye, CreditCard, Receipt,
  ToggleLeft, BarChart2, FileText, Download, Ticket, Megaphone,
  Activity, ClipboardList, Shield, Settings, LogOut, Bell, Search,
  ChevronRight, ChevronLeft, Menu,
} from 'lucide-react'
import logo1 from '../assets/logos/logo1.png'

type NavItem = { id: string; label: string; icon: typeof LayoutDashboard; href: string }
type NavGroup = { label: string; items: NavItem[] }

const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/superadmin' }],
  },
  {
    label: 'Tenants',
    items: [
      { id: 'tenants', label: 'Tenant Management', icon: Building2, href: '/superadmin/tenants' },
      { id: 'tenant-details', label: 'Tenant Details', icon: Eye, href: '/superadmin/tenants/details' },
    ],
  },
  {
    label: 'Commerce',
    items: [
      { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard, href: '/superadmin/subscriptions' },
      { id: 'billing', label: 'Billing', icon: Receipt, href: '/superadmin/billing' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { id: 'feature-flags', label: 'Feature Flags', icon: ToggleLeft, href: '/superadmin/flags' },
      { id: 'analytics', label: 'Analytics', icon: BarChart2, href: '/superadmin/analytics' },
      { id: 'reports', label: 'Reports', icon: FileText, href: '/superadmin/reports' },
      { id: 'exports', label: 'Exports', icon: Download, href: '/superadmin/exports' },
    ],
  },
  {
    label: 'Support',
    items: [
      { id: 'tickets', label: 'Tickets', icon: Ticket, href: '/superadmin/tickets' },
      { id: 'announcements', label: 'Announcements', icon: Megaphone, href: '/superadmin/announcements' },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'health-monitor', label: 'Health Monitor', icon: Activity, href: '/superadmin/health' },
      { id: 'audit-logs', label: 'Audit Logs', icon: ClipboardList, href: '/superadmin/audit' },
    ],
  },
  {
    label: 'Admin',
    items: [
      { id: 'roles', label: 'Roles & Permissions', icon: Shield, href: '/superadmin/roles' },
      { id: 'settings', label: 'Settings', icon: Settings, href: '/superadmin/settings' },
    ],
  },
]

export default function SuperAdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const saUser = JSON.parse(localStorage.getItem('superadmin') || '{}')
  const handleLogout = () => {
    localStorage.removeItem('superadmin')
    navigate('/superadmin/login')
  }

  const activeGroup = navGroups
    .flatMap(g => g.items)
    .find(i => {
      if (i.href === '/superadmin') return location.pathname === '/superadmin'
      return location.pathname.startsWith(i.href)
    })

  const pageTitle = activeGroup?.label || 'SuperAdmin'

  const sidebar = (closeMobile?: () => void) => (
    <>
      <div className="h-16 flex items-center px-4 border-b border-white/10 flex-shrink-0 bg-[#132842]">
        <div className="flex items-center gap-5 flex-1 min-w-0">
          <img src={logo1} alt="StayEasy" className="h-8 w-auto flex-shrink-0" />
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-white text-[13px] font-bold uppercase tracking-wider leading-tight">SuperAdmin</div>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(v => !v)}
          className="hidden md:flex ml-auto p-1 text-white/40 hover:text-white transition-colors rounded flex-shrink-0"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 py-3 px-2 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {navGroups.map(group => (
          <div key={group.label} className="mb-1">
            {!collapsed && (
              <p className="px-3 py-1.5 text-[10px] font-semibold text-white/30 uppercase tracking-widest">
                {group.label}
              </p>
            )}
            {collapsed && <div className="h-px bg-white/10 my-2 mx-1" />}
            {group.items.map(item => {
              const Icon = item.icon
              const isActive = location.pathname === item.href ||
                (item.href !== '/superadmin' && location.pathname.startsWith(item.href))
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.href)
                    closeMobile?.()
                  }}
                  title={collapsed ? item.label : undefined}
                  className={
                    `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 mb-0.5 ` +
                    (collapsed ? 'justify-center ' : '') +
                    (isActive
                      ? 'bg-[#2E86AB] text-white shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/10')
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="px-2 py-3 border-t border-white/10 flex-shrink-0">
        {!collapsed ? (
          <div
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-[#2E86AB] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {saUser.firstname?.[0] || 'Super'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{saUser.lastname || 'Admin'}</p>
              <p className="text-white/35 text-[10px] truncate">{saUser.email || 'superadmin@example.com'}</p>
            </div>
            <button onClick={handleLogout} className="w-3.5 h-3.5 text-white/30 group-hover:text-white/70 transition-colors flex-shrink-0">
              <LogOut className="w-3.5 h-3.5 text-white/30 group-hover:text-white/70 transition-colors flex-shrink-0" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-7 h-7 rounded-full bg-[#2E86AB] flex items-center justify-center text-white text-xs font-bold">
              {saUser.firstname?.[0] || 'Super'}
            </div>
          </div>
        )}
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-background flex font-sans" style={{ fontFamily: 'var(--font-sans)' }}>
      <div className="hidden md:block">
        <aside className={
          'fixed inset-y-0 left-0 bg-[#1A3C5E] flex flex-col transition-all duration-300 z-40 ' +
          (collapsed ? 'w-16' : 'w-60')
        }>
          {sidebar()}
        </aside>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-60 z-10">
            <aside className="fixed inset-y-0 left-0 w-60 bg-[#1A3C5E] flex flex-col z-40">
              {sidebar(() => setMobileOpen(false))}
            </aside>
          </div>
        </div>
      )}

      <div className={
        'flex-1 flex flex-col min-w-0 transition-all duration-300 ' +
        (collapsed ? 'md:ml-16' : 'md:ml-60')
      }>
        <header className="h-16 bg-white border-b border-border flex items-center px-5 gap-4 flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="md:hidden p-1 text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-[15px] font-semibold text-foreground hidden sm:block">{pageTitle}</h2>
          </div>
          <div className="relative hidden md:block w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              placeholder="Search tenants, tickets..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 py-1.5 pr-3 text-xs bg-white border border-border rounded-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 focus:border-[#2E86AB] transition-colors"
            />
          </div>
          <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#2E86AB] rounded-full" />
          </button>
          <button className="flex items-center gap-2 pl-3 border-l border-border hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-[#1A3C5E] flex items-center justify-center text-white text-xs font-bold">
              {saUser.firstname?.[0] || 'Super'}
            </div>
          </button>
        </header>

        <main className="flex-1 p-5 lg:p-6 overflow-auto bg-[#F2F3F4]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
