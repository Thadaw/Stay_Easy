import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../../components/ui/PageHeader'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { Button } from '../../../components/ui/Button'
import { mockRooms } from '../_data/mock'
import toast from 'react-hot-toast'

export default function NewBooking() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    guestName: '', email: '', phone: '',
    roomType: '', checkin: '', checkout: '',
    adults: 2, children: 0, requests: '',
  })

  const roomTypes = [...new Set(mockRooms.map(r => r.room_type))]
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
    <div className="max-w-2xl">
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
            <Input label="Full Name" value={form.guestName} onChange={e => update('guestName', e.target.value)} placeholder="Guest name" required />
            <Input label="Email" type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="guest@email.com" />
            <Input label="Phone" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="9841XXXXXX" required />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-5">
          <h3 className="text-base font-semibold text-foreground">Booking Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select
              label="Room Type"
              value={form.roomType}
              onChange={e => update('roomType', e.target.value)}
              options={roomTypes.map(rt => ({ value: rt, label: rt }))}
              placeholder="Select room type"
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Check-in" type="date" value={form.checkin} onChange={e => update('checkin', e.target.value)} required />
              <Input label="Check-out" type="date" value={form.checkout} onChange={e => update('checkout', e.target.value)} required />
            </div>
            <Input label="Adults" type="number" min={1} max={10} value={form.adults} onChange={e => update('adults', parseInt(e.target.value) || 1)} />
            <Input label="Children" type="number" min={0} max={10} value={form.children} onChange={e => update('children', parseInt(e.target.value) || 0)} />
          </div>
          <div>
            <Input label="Special Requests" value={form.requests} onChange={e => update('requests', e.target.value)} placeholder="Any special requests..." />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => navigate('/ops/frontdesk')}>Cancel</Button>
          <Button variant="primary" type="submit">Create Booking</Button>
        </div>
      </form>
    </div>
  )
}
