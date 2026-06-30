import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Receipt, Plus } from 'lucide-react'
import { PageHeader } from '../../../components/ui/PageHeader'
import { Button } from '../../../components/ui/Button'
import { Table } from '../../../components/ui/Table'
import { Input } from '../../../components/ui/Input'
import { Modal } from '../../../components/ui/Modal'
import { SearchInput } from '../../../components/ui/SearchInput'
import { mockBookings, mockFolioCharges } from '../_data/mock'
import type { Booking } from '../../../types'
import toast from 'react-hot-toast'

export default function CheckOut() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [charges, setCharges] = useState([...mockFolioCharges])
  const [newCharge, setNewCharge] = useState({ description: '', amount: 0 })
  const [showConfirm, setShowConfirm] = useState(false)

  const checkedIn = mockBookings.filter(b => b.status === 'checked_in')

  const filtered = search
    ? checkedIn.filter(b =>
        b.guest_name.toLowerCase().includes(search.toLowerCase()) ||
        b.ref.toLowerCase().includes(search))
    : checkedIn

  const totalCharges = charges.reduce((sum, c) => sum + c.amount, 0)
  const grandTotal = (selectedBooking?.balance || 0) + totalCharges

  const handleAddCharge = () => {
    if (!newCharge.description || newCharge.amount <= 0) return
    setCharges(prev => [...prev, {
      id: `FC-${Date.now()}`,
      description: newCharge.description,
      amount: newCharge.amount,
      category: 'other' as const,
      posted_at: new Date().toLocaleString(),
      posted_by: 'Front Desk',
    }])
    setNewCharge({ description: '', amount: 0 })
    toast.success('Charge added.')
  }

  const handleCheckout = () => {
    setShowConfirm(false)
    toast.success(`Check-out complete for ${selectedBooking?.guest_name}. Total: Rs. ${grandTotal.toLocaleString()}`)
    setSelectedBooking(null)
    navigate('/ops/frontdesk')
  }

  const columns = [
    { key: 'ref', header: 'Ref', width: '100px', render: (b: Booking) => <span className="font-mono text-xs text-muted-foreground">{b.ref}</span> },
    { key: 'guest_name', header: 'Guest', render: (b: Booking) => <span className="font-medium">{b.guest_name}</span> },
    { key: 'room_number', header: 'Room', render: (b: Booking) => b.room_number || '-' },
    { key: 'balance', header: 'Balance', align: 'right' as const, render: (b: Booking) => <span className={b.balance > 0 ? 'text-destructive font-medium' : ''}>Rs. {b.balance.toLocaleString()}</span> },
  ]

  return (
    <div>
      <PageHeader
        title="Check-out"
        description="Review folio and settle outstanding balances"
        breadcrumb={[{ label: 'Front Desk', href: '/ops/frontdesk' }, { label: 'Check-out' }]}
        actions={
          <div className="w-64">
            <SearchInput value={search} onChange={setSearch} placeholder="Search checked-in guests..." />
          </div>
        }
      />

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-border shadow-sm">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-base font-semibold text-foreground">Checked-in Guests</h3>
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
                <Receipt className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">{selectedBooking.guest_name}</p>
                  <p className="text-xs text-muted-foreground">Room {selectedBooking.room_number} · {selectedBooking.checkin} → {selectedBooking.checkout}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Folio Charges</h4>
                {charges.length > 0 ? (
                  <div className="space-y-2">
                    {charges.map(c => (
                      <div key={c.id} className="flex justify-between text-sm py-2 border-b border-border/40 last:border-0">
                        <div>
                          <span className="text-foreground">{c.description}</span>
                          <span className="text-[10px] text-muted-foreground ml-2">{c.posted_at}</span>
                        </div>
                        <span className="font-medium">Rs. {c.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No additional charges.</p>
                )}
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Description"
                    value={newCharge.description}
                    onChange={e => setNewCharge(p => ({ ...p, description: e.target.value }))}
                  />
                </div>
                <div className="w-24">
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={newCharge.amount || ''}
                    onChange={e => setNewCharge(p => ({ ...p, amount: Number(e.target.value) }))}
                  />
                </div>
                <Button variant="secondary" size="sm" onClick={handleAddCharge} aria-label="Add charge">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Room Balance</span><span>Rs. {(selectedBooking.balance || 0).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Additional Charges</span><span>Rs. {totalCharges.toLocaleString()}</span></div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                  <span>Total Due</span><span>Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <Button variant="primary" className="w-full justify-center" onClick={() => setShowConfirm(true)}>
                Settle Bill — Rs. {grandTotal.toLocaleString()}
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col items-center justify-center text-center h-48">
              <Receipt className="w-8 h-8 text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">Select a guest to view their folio</p>
            </div>
          )}
        </div>
      </div>

      <Modal open={showConfirm} onClose={() => setShowConfirm(false)} title="Confirm Check-out">
        <p className="text-sm text-muted-foreground">
          Settle bill for <span className="font-medium text-foreground">{selectedBooking?.guest_name}</span>?
          <br />
          Total amount: <span className="font-semibold text-foreground">Rs. {grandTotal.toLocaleString()}</span>
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleCheckout}>Confirm Check-out</Button>
        </div>
      </Modal>
    </div>
  )
}
