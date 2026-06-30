import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCheck } from 'lucide-react'
import { PageHeader } from '../../../components/ui/PageHeader'
import { Button } from '../../../components/ui/Button'
import { Table } from '../../../components/ui/Table'
import { Select } from '../../../components/ui/Select'
import { Badge } from '../../../components/ui/Badge'
import { Modal } from '../../../components/ui/Modal'
import { SearchInput } from '../../../components/ui/SearchInput'
import { mockBookings, mockRooms } from '../_data/mock'
import type { Booking } from '../../../types'
import toast from 'react-hot-toast'

export default function CheckIn() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [assignedRoom, setAssignedRoom] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const pending = mockBookings.filter(b => b.status === 'confirmed')

  const filtered = search
    ? pending.filter(b =>
        b.guest_name.toLowerCase().includes(search.toLowerCase()) ||
        b.ref.toLowerCase().includes(search) ||
        b.phone.includes(search))
    : pending

  const availableRooms = selectedBooking
    ? mockRooms.filter(r => r.status === 'available' && r.room_type === selectedBooking.room_type)
    : []

  const handleConfirm = () => {
    setShowConfirm(false)
    toast.success(`Guest checked in to ${assignedRoom || 'assigned room'}!`)
    setSelectedBooking(null)
    setAssignedRoom('')
    navigate('/ops/frontdesk')
  }

  const columns = [
    { key: 'ref', header: 'Ref', width: '100px', render: (b: Booking) => <span className="font-mono text-xs text-muted-foreground">{b.ref}</span> },
    { key: 'guest_name', header: 'Guest', render: (b: Booking) => <span className="font-medium">{b.guest_name}</span> },
    { key: 'room_type', header: 'Room Type' },
    { key: 'checkin', header: 'Check-in' },
    {
      key: 'status', header: 'Status',
      render: () => <Badge variant="blue">Confirmed</Badge>,
    },
  ]

  return (
    <div>
      <PageHeader
        title="Check-in"
        description="Search confirmed bookings and assign rooms"
        breadcrumb={[{ label: 'Front Desk', href: '/ops/frontdesk' }, { label: 'Check-in' }]}
        actions={
          <div className="w-64">
            <SearchInput value={search} onChange={setSearch} placeholder="Search by name, ref, or phone..." />
          </div>
        }
      />

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-border shadow-sm">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-base font-semibold text-foreground">Confirmed Bookings</h3>
          </div>
          <div className="p-1">
            <Table
              columns={columns}
              data={filtered}
              keyExtractor={(b) => b.ref}
              pageSize={8}
              onRowClick={setSelectedBooking}
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedBooking ? (
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {selectedBooking.guest_name[0]}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{selectedBooking.guest_name}</p>
                  <p className="text-xs text-muted-foreground">{selectedBooking.ref}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{selectedBooking.phone}</span></div>
                <div><span className="text-muted-foreground">Email:</span> <span className="font-medium">{selectedBooking.email}</span></div>
                <div><span className="text-muted-foreground">Room Type:</span> <span className="font-medium">{selectedBooking.room_type}</span></div>
                <div><span className="text-muted-foreground">Check-in:</span> <span className="font-medium">{selectedBooking.checkin}</span></div>
                <div><span className="text-muted-foreground">Check-out:</span> <span className="font-medium">{selectedBooking.checkout}</span></div>
              </div>

              <div>
                <Select
                  label="Assign Room"
                  value={assignedRoom}
                  onChange={e => setAssignedRoom(e.target.value)}
                  options={availableRooms.map(r => ({ value: r.room_number, label: `${r.room_number} — ${r.room_type}` }))}
                  placeholder="Select room"
                />
                {availableRooms.length === 0 && (
                  <p className="text-xs text-destructive mt-1">No available rooms of this type.</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="ghost" onClick={() => { setSelectedBooking(null); setAssignedRoom('') }}>Cancel</Button>
                <Button variant="primary" disabled={!assignedRoom} onClick={() => setShowConfirm(true)}>
                  Confirm Check-in
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col items-center justify-center text-center h-48">
              <UserCheck className="w-8 h-8 text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">Select a booking to assign a room</p>
            </div>
          )}
        </div>
      </div>

      <Modal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirm Check-in"
      >
        <p className="text-sm text-muted-foreground">
          Check in <span className="font-medium text-foreground">{selectedBooking?.guest_name}</span> to room <span className="font-medium text-foreground">{assignedRoom}</span>?
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleConfirm}>Check In</Button>
        </div>
      </Modal>
    </div>
  )
}
