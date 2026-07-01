import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, DoorOpen, ClipboardList, Utensils,
  ChefHat, BarChart3, Bell, Search, LogOut,
  ChevronRight, ChevronLeft, Menu, Settings, HelpCircle,
} from 'lucide-react'
import type { OperatorRole } from '../types'
import logo1 from '../assets/logos/logo1.png'
import { Avatar } from '../components/ui/Avatar'
import { DropdownMenu } from '../components/ui/DropdownMenu'
import { Clock } from 'lucide-react'

type NavItem = { id: string; label: string; icon: typeof LayoutDashboard; href: string; roles: OperatorRole[] }
type NavGroup = { label: string; items: NavItem[] }

const navGroups: NavGroup[] = [
  {
    label: 'Front Desk',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/ops/frontdesk', roles: ['front_desk', 'manager'] },
      { id: 'new-booking', label: 'New Booking', icon: DoorOpen, href: '/ops/new-booking', roles: ['front_desk', 'manager'] },
      { id: 'checkin', label: 'Check-in', icon: ClipboardList, href: '/ops/checkin', roles: ['front_desk', 'manager'] },
      { id: 'checkout', label: 'Check-out', icon: LogOut, href: '/ops/checkout', roles: ['front_desk', 'manager'] },
    ],
  },
  {
    label: 'Housekeeping',
    items: [
      { id: 'hk-queue', label: 'Task Queue', icon: ClipboardList, href: '/ops/housekeeping', roles: ['housekeeping', 'manager'] },
      { id: 'hk-room', label: 'Room Detail', icon: LayoutDashboard, href: '/ops/room', roles: ['housekeeping', 'manager'] },
    ],
  },
  {
    label: 'Restaurant',
    items: [
      { id: 'pos', label: 'Floor Plan', icon: Utensils, href: '/ops/pos', roles: ['pos', 'manager'] },
      { id: 'pos-order', label: 'Table Order', icon: ChefHat, href: '/ops/pos/table', roles: ['pos', 'manager'] },
      { id: 'pos-checkout', label: 'Checkout', icon: BarChart3, href: '/ops/pos/checkout', roles: ['pos', 'manager'] },
      { id: 'pos-analytics', label: 'Analytics', icon: BarChart3, href: '/ops/analytics', roles: ['pos', 'manager'] },
    ],
  },
  {
    label: 'Kitchen',
    items: [
      { id: 'kds', label: 'KDS Display', icon: ChefHat, href: '/ops/kds', roles: ['kds', 'manager'] },
    ],
  },
]

export default function OperationsLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  
  }, [])

  const operatorStr = typeof window !== 'undefined' ? localStorage.getItem('operator') || '{}' : '{}'
  let operator: { name?: string; role?: string; email?: string }
  try { operator = JSON.parse(operatorStr) } catch { operator = {} }
  const userRole: OperatorRole = (operator.role as OperatorRole) || 'front_desk'

  const handleLogout = () => {
    localStorage.removeItem('operator')
    navigate('/operations/login')
  }

  const isActivePath = (href: string) => {
    if (href === '/ops/frontdesk') return location.pathname === '/ops/frontdesk'
    return location.pathname.startsWith(href)
  }

  const sidebarContent = (closeMobile?: () => void) => (
    <>
      <div className={`h-14 flex items-center px-4 border-b border-sidebar-border flex-shrink-0 ${collapsed ? 'justify-center' : ''}`}>
        {!collapsed && (
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img src={logo1} alt="StayEasy" className="h-7 w-auto flex-shrink-0" />
            <span className="text-sm font-semibold text-sidebar-foreground tracking-tight">StayEasy</span>
          </div>
        )}
        {collapsed && <img src={logo1} alt="StayEasy" className="h-7 w-auto" />}
        <button
          onClick={() => setCollapsed(v => !v)}
          aria-label="Toggle sidebar"
          className="hidden md:flex ml-auto p-1 text-sidebar-foreground/30 hover:text-sidebar-foreground transition-colors rounded flex-shrink-0"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      <nav className="flex-1 py-4 px-2.5 overflow-y-auto scrollbar-hide space-y-4">
        {navGroups
          .filter(group => group.items.some(item => item.roles.includes(userRole)))
          .map(group => (
            <div key={group.label}>
              {!collapsed && (
                <p className="px-3 mb-1.5 text-[11px] font-semibold text-sidebar-foreground/30 uppercase tracking-[0.08em]">
                  {group.label}
                </p>
              )}
              {group.items
                .filter(item => item.roles.includes(userRole))
                .map(item => {
                  const Icon = item.icon
                  const isActive = isActivePath(item.href)
                  return (
                    <button
                      key={item.id}
                      onClick={() => { navigate(item.href); closeMobile?.() }}
                      title={collapsed ? item.label : undefined}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative
                        ${collapsed ? 'justify-center' : ''}
                        ${isActive
                          ? 'bg-sidebar-accent text-sidebar-foreground before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-5 before:bg-accent before:rounded-r-full'
                          : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-white/5'}
                      `}
                    >
                      <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </button>
                  )
                })}
            </div>
          ))}
      </nav>

      <div className="px-2.5 py-3 border-t border-sidebar-border flex-shrink-0">
        {!collapsed ? (
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            <Avatar size="sm" initials={operator.name?.[0]} className="bg-sidebar-muted text-sidebar-foreground">
              {operator.name?.[0] || 'O'}
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{operator.name || 'Staff'}</p>
              <p className="text-[11px] text-sidebar-foreground/40 truncate">{operator.role?.replace('_', ' ') || 'Staff'}</p>
            </div>
            <button onClick={handleLogout} aria-label="Log out" className="p-1 text-sidebar-foreground/30 hover:text-sidebar-foreground transition-colors flex-shrink-0">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <Avatar size="sm" initials={operator.name?.[0]} className="bg-sidebar-muted text-sidebar-foreground">
              {operator.name?.[0] || 'O'}
            </Avatar>
          </div>
        )}
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden md:block">
        <aside className={`fixed inset-y-0 left-0 bg-sidebar flex flex-col transition-all duration-300 z-40 ${collapsed ? 'w-14' : 'w-56'}`}>
          {sidebarContent()}
        </aside>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-56 z-10">
            <aside className="fixed inset-y-0 left-0 w-56 bg-sidebar flex flex-col z-40">
              {sidebarContent(() => setMobileOpen(false))}
            </aside>
          </div>
        </div>
      )}

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${collapsed ? 'md:ml-14' : 'md:ml-56'}`}>
        <header className="h-14 bg-white border-b border-border flex items-center px-6 gap-4 flex-shrink-0 sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="md:hidden p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1" />

          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              placeholder="Search bookings, rooms..."
              className="w-full h-9 pl-9 pr-3 text-xs bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring hover:border-muted-foreground/30"
            />
          </div>

          <div className= "flex-item-center gap-4 text-muted-foreground border-r border-border pr-4">
            <Clock className="w-4 h-4"/>
            <span className="text-sm font-mono tabular-nums">
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false})}
            </span>

            <span className="text=[11px] text-muted-foreground/60 hidden md:inline ml-3">
            {currentTime.toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'})}
            </span>
          </div>

          <button aria-label="Notifications" className="relative p-2 rounded-xl hover:bg-muted transition-colors">
            <Bell className="w-[18px] h-[18px] text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-white" />
          </button>

          <DropdownMenu
            align="right"
            trigger={
              <button aria-label="User menu" className="flex items-center gap-2 pl-3 border-l border-border hover:opacity-80 transition-opacity">
                <Avatar size="sm" initials={operator.name?.[0]} />
              </button>
            }
            items={[
              { label: 'Settings', icon: <Settings className="w-4 h-4" />, onClick: () => {} },
              { label: 'Help', icon: <HelpCircle className="w-4 h-4" />, onClick: () => {} },
              { label: 'Sign out', icon: <LogOut className="w-4 h-4" />, onClick: handleLogout, danger: true },
            ]}
          />
        </header>

        <main className="flex-1 bg-[#F7F9FC]">
          <div className="max-w-[1600px] mx-auto p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
