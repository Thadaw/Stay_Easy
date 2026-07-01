import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CalendarCheck, CalendarX, Building2, BedDouble,
  UserPlus, ClipboardCheck, ArrowRight, Clock, Calendar,
} from 'lucide-react'
import { PageHeader } from '../../../components/ui/PageHeader'
import { Table } from '../../../components/ui/Table'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { SearchInput } from '../../../components/ui/SearchInput'
import { RoomStatusGrid } from '../../../components/layoutOps/roomstatusgrid'
import { mockBookings, mockRooms, mockActivityLog } from '../_data/mock'
import type { Booking } from '../../../types'

const statusBadge = (status: string) => {
  const map: Record<string, { variant: 'navy' | 'blue' | 'emerald' | 'red' | 'gray'; label: string }> = {
    confirmed: { variant: 'blue', label: 'Confirmed' },
    checked_in: { variant: 'emerald', label: 'Checked in' },
    checked_out: { variant: 'gray', label: 'Checked out' },
    cancelled: { variant: 'red', label: 'Cancelled' },
    no_show: { variant: 'red', label: 'No show' },
  }
  const m = map[status] || { variant: 'gray' as const, label: status }
  return <Badge variant={m.variant as 'navy' | 'blue' | 'emerald' | 'red' | 'gray'}>{m.label}</Badge>
}

export default function FrontDesk() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const today = '2026-06-30'

  const arrivals = useMemo(() =>
    mockBookings.filter(b => b.checkin === today && b.status !== 'cancelled'), []
  )
  const departures = useMemo(() =>
    mockBookings.filter(b => b.checkout === today && b.status === 'checked_in'), []
  )
  const checkinsPending = useMemo(() =>
    mockBookings.filter(b => b.status === 'confirmed').length, []
  )
  const occupancyRate = useMemo(() => {
    const total = mockRooms.filter(r => r.status !== 'maintenance' && r.status !== 'blocked').length
    const occupied = mockRooms.filter(r => r.status === 'occupied').length
    return total ? Math.round((occupied / total) * 100) : 0
  }, [])
  const available = useMemo(() =>
    mockRooms.filter(r => r.status === 'available').length, []
  )

  const [activityFilter, setActivityFilter] = useState<'all' | 'bookings'>('all')
  const [activityDate, setActivityDate] = useState(today)

  const filteredActivity = useMemo(() => {
    let events = mockActivityLog
    if (activityFilter === 'bookings') {
      events = events.filter(e => e.type === 'booking')
    }
    return events
  }, [activityFilter])

  const filteredBookings = useMemo(() => {
    if (!searchQuery.trim()) return mockBookings
    const q = searchQuery.toLowerCase()
    return mockBookings.filter(b =>
      b.guest_name.toLowerCase().includes(q) ||
      b.ref.toLowerCase().includes(q) ||
      b.phone.includes(q)
    )
  }, [searchQuery])

  const columns = [
    { key: 'ref', header: 'Ref', sortable: true, width: '100px', render: (b: Booking) => <span className="font-mono text-xs text-muted-foreground">{b.ref}</span> },
    { key: 'guest_name', header: 'Guest', sortable: true, render: (b: Booking) => <span className="font-medium text-foreground">{b.guest_name}</span> },
    { key: 'room_type', header: 'Room Type', sortable: true },
    { key: 'checkin', header: 'Check-in', sortable: true },
    { key: 'checkout', header: 'Check-out', sortable: true },
    { key: 'status', header: 'Status', sortable: true, render: (b: Booking) => statusBadge(b.status) },
    {
      key: 'balance', header: 'Balance', sortable: true, align: 'right' as const,
      render: (b: Booking) => (
        <span className={b.balance > 0 ? 'text-destructive font-medium' : 'text-muted-foreground'}>
          Rs. {b.balance.toLocaleString()}
        </span>
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="Front Desk"
        description="Manage arrivals, departures, and room assignments"
        breadcrumb={[{ label: 'Front Desk' }]}
        actions={
          <Button variant="primary" onClick={() => navigate('/ops/new-booking')} icon={<UserPlus className="w-4 h-4" />}>
            New Booking
          </Button>
        }
      />

      <div className="bg-white rounded-2xl border border-border shadow-sm p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">Today's Activity</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivityFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activityFilter === 'all' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            >
              All
            </button>
            <button
              onClick={() => setActivityFilter('bookings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activityFilter === 'bookings' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            >
              Bookings Only
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {filteredActivity.map(event => (
            <div key={event.id} className="flex items-center gap-4 py-2 px-3 rounded-xl hover:bg-muted/30 transition-colors">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                event.type === 'booking' ? 'bg-blue-500' :
                event.type === 'checkin' ? 'bg-emerald-500' : 'bg-red-500'
              }`} />
              <span className="text-xs font-mono text-muted-foreground w-12 flex-shrink-0">{event.time}</span>
              <span className={`text-[10px] font-semibold uppercase tracking-wider w-16 flex-shrink-0 ${
                event.type === 'booking' ? 'text-blue-600' :
                event.type === 'checkin' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {event.type === 'booking' ? 'Booking' : event.type === 'checkin' ? 'Check-in' : 'Check-out'}
              </span>
              <span className="text-sm font-medium text-foreground flex-1 truncate">{event.guest_name}</span>
              <span className="text-xs text-muted-foreground font-mono">{event.ref}</span>
              {event.room_number && <span className="text-xs text-muted-foreground">→ Room {event.room_number}</span>}
              {event.amount && <span className="text-xs font-medium text-destructive">Rs. {event.amount.toLocaleString()}</span>}
            </div>
          ))}
          {filteredActivity.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No activity for this date.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        <StatCard label="Arrivals Today" value={String(arrivals.length)} icon={CalendarCheck} color="blue" trend="up" />
        <StatCard label="Departures Today" value={String(departures.length)} icon={CalendarX} color="amber" trend="up" />
        <StatCard label="Occupancy" value={`${occupancyRate}%`} icon={Building2} color="navy" trend={occupancyRate > 70 ? 'up' : 'down'} />
        <StatCard label="Available" value={String(available)} icon={BedDouble} color="emerald" trend={available > 3 ? 'up' : 'down'} />
        <StatCard label="Check-ins" value={String(checkinsPending)} icon={UserPlus} color="blue" trend="up" />
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => navigate('/ops/new-booking')}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted/30 hover:border-muted-foreground/30 transition-all shadow-sm"
        >
          <UserPlus className="w-4 h-4 text-primary" />
          New Booking
        </button>
        <button
          onClick={() => navigate('/ops/checkin')}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted/30 hover:border-muted-foreground/30 transition-all shadow-sm"
        >
          <ClipboardCheck className="w-4 h-4 text-emerald-600" />
          Check-in
        </button>
        <button
          onClick={() => navigate('/ops/checkout')}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted/30 hover:border-muted-foreground/30 transition-all shadow-sm"
        >
          <ArrowRight className="w-4 h-4 text-amber-600" />
          Check-out
        </button>
        <button
          onClick={() => navigate('/ops/frontdesk')}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted/30 hover:border-muted-foreground/30 transition-all shadow-sm"
        >
          <Building2 className="w-4 h-4 text-blue-600" />
          Room Status
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center gap-4">
          <h3 className="text-base font-semibold text-foreground">All Bookings</h3>
          <div className="sm:ml-auto w-full sm:w-64">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name, ref, or phone..."
            />
          </div>
        </div>
        <div className="p-1">
          <Table
            columns={columns}
            data={filteredBookings}
            keyExtractor={(b) => b.ref}
            pageSize={10}
            onRowClick={setSelectedBooking}
          />
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 z-40 flex justify-end" onClick={() => setSelectedBooking(null)}>
          <div className="fixed inset-0 bg-black/20" />
          <div
            className="relative w-96 bg-white h-full shadow-xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Guest Profile</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedBooking(null)}>Close</Button>
              </div>

              <div className="flex items-center gap-4 pb-4 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {selectedBooking.guest_name[0]}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{selectedBooking.guest_name}</p>
                  <p className="text-xs text-muted-foreground">{selectedBooking.email} · {selectedBooking.phone}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono text-xs">{selectedBooking.ref}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room Type</span>
                  <span>{selectedBooking.room_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in</span>
                  <span>{selectedBooking.checkin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out</span>
                  <span>{selectedBooking.checkout}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  {statusBadge(selectedBooking.status)}
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Balance</span>
                  <span className={selectedBooking.balance > 0 ? 'text-destructive font-medium' : ''}>
                    Rs. {selectedBooking.balance.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {selectedBooking.status === 'confirmed' && (
                  <Button variant="primary" className="w-full justify-center" onClick={() => navigate(`/ops/checkin`)} icon={<ClipboardCheck className="w-4 h-4" />}>
                    Check In
                  </Button>
                )}
                {selectedBooking.status === 'checked_in' && (
                  <Button variant="primary" className="w-full justify-center" onClick={() => navigate(`/ops/checkout`)} icon={<ArrowRight className="w-4 h-4" />}>
                    Check Out
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">Room Status Overview</h3>
        <RoomStatusGrid rooms={mockRooms} />
      </div>
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color, trend }: {
  label: string; value: string; icon: typeof CalendarCheck; color: string; trend?: 'up' | 'down'
}) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600', amber: 'bg-amber-50 text-amber-600',
    navy: 'bg-primary/10 text-primary', emerald: 'bg-emerald-50 text-emerald-600',
  }

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-4 flex items-center gap-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[color] || colorMap.blue}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <p className="text-lg font-bold text-foreground">{value}</p>
          {trend && (
            <span className={`text-[10px] font-semibold ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
              {trend === 'up' ? '↑' : '↓'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
