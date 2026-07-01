import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../../components/ui/PageHeader'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { Button } from '../../../components/ui/Button'
import { mockRooms } from '../_data/mock'
import type {Room} from '../../../types'
import toast from 'react-hot-toast'

export default function NewBooking() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    guestName: '', email: '', phone: '',
    roomType: '', checkin: '', checkout: '',
    adults: 2, children: 0, requests: '',
  })
  const [walkIn, setWalkIn] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'phone_pay' | ''>('')


  const [selectedRoomType, setSelectedRoomType] = useState('')

  const roomTypes = [...new Set(mockRooms.map(r => r.room_type))]
  const filteredRooms = useMemo(() => {
    if (!selectedRoomType) return mockRooms
    return mockRooms.filter(r => r.room_type === selectedRoomType)
  }, [selectedRoomType])
  const update = (field: string, value: string | number) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.guestName || !form.roomType || !form.checkin || !form.checkout) {
      toast.error('Please fill in all required fields.')
      return
    }
    toast.success(`Booking created for ${form.guestName}!`)
    navigate('/ops/frontdesk')
  }

  return (
    <div className="max-w-7xl">
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className="lg:col-span-2">
      <PageHeader
        title="New Booking"
        description="Create a new reservation"
        breadcrumb={[{ label: 'Front Desk', href: '/ops/frontdesk' }, { label: 'New Booking' }]}
        actions={
          <Button variant="ghost" onClick={() => navigate('/ops/frontdesk')}>
            Cancel
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-5">
          <h3 className="text-base font-semibold text-foreground">Guest Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Full Name" floatingLabel={false} value={form.guestName} onChange={e => update('guestName', e.target.value)} placeholder="Guest name" required />
            <Input label="Email" floatingLabel={false} type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="guest@email.com" />
            <Input label="Phone" floatingLabel={false} value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="9841XXXXXX" required />
            <div className="flex items-center gap-2 pt-2 sm:col-span-2">
              <input type="checkbox" checked={walkIn} onChange={e => setWalkIn(e.target.checked)} 
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary/40" />
              <label htmlFor="walkIn" className="text-sm text-muted-foreground cursor-pointer select-none">
                Walk-in guest (collect payment)
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-5">
          <h3 className="text-base font-semibold text-foreground">Booking Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select
              label="Room Type"
              floatingLabel={false}
              value={form.roomType}
              onChange={e => {update('roomType', e.target.value); setSelectedRoomType(e.target.value)}}
              options={roomTypes.map(rt => ({ value: rt, label: rt }))}
              placeholder="Select room type"
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Check-in" floatingLabel={false} type="date" value={form.checkin} onChange={e => update('checkin', e.target.value)} required />
              <Input label="Check-out" floatingLabel={false} type="date" value={form.checkout} onChange={e => update('checkout', e.target.value)} required />
            </div>
            <Input label="Adults" floatingLabel={false} type="number" min={1} max={10} value={form.adults} onChange={e => update('adults', parseInt(e.target.value) || 1)} />
            <Input label="Children" floatingLabel={false} type="number" min={0} max={10} value={form.children} onChange={e => update('children', parseInt(e.target.value) || 0)} />
          </div>        {walkIn && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
            <h4 className="text-sm font-semibold text-amber-800">Payment</h4>
            <div className="flex gap-2">
              {(['cash', 'card', 'phone_pay'] as const).map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                    paymentMethod === method
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-100'
                  }`}
                >
                  {method === 'cash' ? '💵 Cash' : method === 'card' ? '💳 Card' : '📱 Phone Pay'}
                </button>
              ))}
            </div>
            {paymentMethod && (
              <p className="text-xs text-amber-700">Payment method selected: {paymentMethod.toUpperCase()}</p>
            )}
          </div>
        )}
        
          <div>
            <Input label="Special Requests" floatingLabel={false} value={form.requests} onChange={e => update('requests', e.target.value)} placeholder="Any special requests..." />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => navigate('/ops/frontdesk')}>Cancel</Button>
          <Button variant="primary" type="submit">Create Booking</Button>
        </div>
      </form>
      </div>
<div className="lg:col-span-1">
  <div className="bg-white rounded-2xl border border-border shadow-sm p-5 sticky top-24 space-y-4">
    <h3 className="text-base font-semibold text-foreground">Room Visualization</h3>

    {(() => {
      const floors = [...new Set(filteredRooms.map(r => r.floor))].sort()
      return floors.map(floor => (
        <div key={floor}>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Floor {floor}</p>
          <div className="grid grid-cols-3 gap-2">
            {filteredRooms.filter(r => r.floor === floor).map(room => {
              const statusColors: Record<string, string> = {
                available: 'bg-emerald-100 border-emerald-300 text-emerald-700',
                occupied: 'bg-red-100 border-red-300 text-red-700',
                dirty: 'bg-amber-100 border-amber-300 text-amber-700',
                cleaning: 'bg-blue-100 border-blue-300 text-blue-700',
                maintenance: 'bg-gray-200 border-gray-400 text-gray-500',
                blocked: 'bg-gray-200 border-gray-400 text-gray-500',
                inspected: 'bg-teal-100 border-teal-300 text-teal-700',
              }
              return (
                <div
                  key={room.id}
                  className={`text-center p-1.5 rounded-lg border text-[10px] font-medium leading-tight ${statusColors[room.status] || 'bg-gray-100 border-gray-200 text-gray-500'}`}
                  title={`${room.room_number} - ${room.status}`}
                >
                  <span>{room.room_number}</span>
                  {room.status === 'occupied' && room.guest_name && (
                    <span className="block text-[8px] opacity-60 truncate">{room.guest_name}</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))
    })()}

    <div className="border-t border-border pt-3 space-y-1.5">
      <p className="text-xs font-medium text-muted-foreground mb-2">Legend</p>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        <span className="flex items-center gap-1.5 text-[10px]"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" /> Available</span>
        <span className="flex items-center gap-1.5 text-[10px]"><span className="w-2.5 h-2.5 rounded-sm bg-red-400" /> Occupied</span>
        <span className="flex items-center gap-1.5 text-[10px]"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400" /> Dirty</span>
        <span className="flex items-center gap-1.5 text-[10px]"><span className="w-2.5 h-2.5 rounded-sm bg-blue-400" /> Cleaning</span>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  )
}
