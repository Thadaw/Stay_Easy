import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Receipt, Plus, Printer } from 'lucide-react'
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
  const [showReceipt, setShowReceipt] = useState(false)

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'phone_pay' | ''>('')
  const [splitBill, setSplitBill] = useState(false)
  const [splitMethod2, setSplitMethod2] = useState<'cash' | 'card' | 'phone_pay' | ''>('')
  const [splitAmount, setSplitAmount] = useState(0)

  const checkedIn = mockBookings.filter(b => b.status === 'checked_in')

  const filtered = search
    ? checkedIn.filter(b =>
        b.guest_name.toLowerCase().includes(search.toLowerCase()) ||
        b.ref.toLowerCase().includes(search))
    : checkedIn

  const totalCharges = charges.reduce((sum, c) => sum + c.amount, 0)
  const grandTotal = (selectedBooking?.balance || 0) + totalCharges
  const splitRemaining = grandTotal - splitAmount

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

  const handleSettle = () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method.')
      return
    }
    if (splitBill && (!splitMethod2 || splitAmount <= 0 || splitAmount >= grandTotal)) {
      toast.error('Enter a valid split amount and second payment method.')
      return
    }
    setShowConfirm(true)
  }

  const handleCheckout = () => {
    setShowConfirm(false)
    setShowReceipt(true)
  }

  const handleCloseReceipt = () => {
    setShowReceipt(false)
    toast.success(`Check-out complete for ${selectedBooking?.guest_name}.`)
    setSelectedBooking(null)
    setCharges([...mockFolioCharges])
    setPaymentMethod('')
    setSplitBill(false)
    setSplitMethod2('')
    setSplitAmount(0)
    navigate('/ops/frontdesk')
  }

  const columns = [
    { key: 'ref', header: 'Ref', width: '100px', render: (b: Booking) => <span className="font-mono text-xs text-muted-foreground">{b.ref}</span> },
    { key: 'guest_name', header: 'Guest', render: (b: Booking) => <span className="font-medium">{b.guest_name}</span> },
    { key: 'room_number', header: 'Room', render: (b: Booking) => b.room_number || '-' },
    { key: 'balance', header: 'Balance', align: 'right' as const, render: (b: Booking) => <span className={b.balance > 0 ? 'text-destructive font-medium' : ''}>Rs. {b.balance.toLocaleString()}</span> },
  ]

  const paymentOptions = [
    { value: 'cash' as const, label: '💵 Cash' },
    { value: 'card' as const, label: '💳 Card' },
    { value: 'phone_pay' as const, label: '📱 Phone Pay' },
  ]

  return (
    <div>
      <PageHeader
        title="Check-out"
        description="Review folio, settle bill, and print receipt"
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
              onRowClick={(b) => { setSelectedBooking(b); setPaymentMethod(''); setSplitBill(false); setSplitMethod2(''); setSplitAmount(0) }}
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

              {/* Folio Charges */}
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

              {/* Add Charge */}
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

              {/* Total */}
              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Room Balance</span><span>Rs. {(selectedBooking.balance || 0).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Additional Charges</span><span>Rs. {totalCharges.toLocaleString()}</span></div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                  <span>Total Due</span><span>Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Payment Method</h4>
                <div className="flex gap-2">
                  {paymentOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setPaymentMethod(opt.value)}
                      className={`flex-1 py-2.5 rounded-lg text-xs font-medium border transition-all ${
                        paymentMethod === opt.value
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-foreground border-border hover:border-primary/40'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Split Bill */}
                <label className="flex items-center gap-2.5 pt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={splitBill}
                    onChange={e => setSplitBill(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/40"
                  />
                  <span className="text-sm text-muted-foreground">Split bill across methods</span>
                </label>

                {splitBill && (
                  <div className="space-y-3 pt-2 border-t border-border">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-[10px] text-muted-foreground mb-1">Amount on {paymentMethod || 'main'}</label>
                        <Input
                          type="number"
                          placeholder="Amount"
                          value={splitAmount || ''}
                          onChange={e => setSplitAmount(Number(e.target.value))}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[10px] text-muted-foreground mb-1">Remaining: Rs. {splitRemaining.toLocaleString()}</label>
                        <div className="h-11 flex items-center text-sm font-medium text-foreground bg-white border border-border rounded-xl px-3">
                          Rs. {splitRemaining.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-muted-foreground mb-1">Second Method</label>
                      <div className="flex gap-2">
                        {paymentOptions.filter(o => o.value !== paymentMethod).map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => setSplitMethod2(opt.value)}
                            className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                              splitMethod2 === opt.value
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-foreground border-border hover:border-primary/40'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="primary"
                className="w-full justify-center"
                onClick={handleSettle}
              >
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

      {/* Confirm Modal */}
      <Modal open={showConfirm} onClose={() => setShowConfirm(false)} title="Confirm Check-out">
        <p className="text-sm text-muted-foreground">
          Settle bill for <span className="font-medium text-foreground">{selectedBooking?.guest_name}</span>?
        </p>
        <div className="bg-gray-50 rounded-xl p-4 mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><span>Total</span><span className="font-semibold">Rs. {grandTotal.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>Method</span><span className="font-semibold capitalize">{paymentMethod.replace('_', ' ')}</span></div>
          {splitBill && splitMethod2 && (
            <div className="flex justify-between">
              <span>Split: Rs. {splitAmount.toLocaleString()} ({splitMethod2.replace('_', ' ')})</span>
              <span className="font-semibold">+ Rs. {splitRemaining.toLocaleString()}</span>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleCheckout}>Confirm Check-out</Button>
        </div>
      </Modal>

      {/* Receipt Modal */}
      <Modal open={showReceipt} onClose={handleCloseReceipt} title="Check-out Complete">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <Receipt className="w-7 h-7 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Receipt</h3>
            <p className="text-xs text-muted-foreground">Hotel Himalaya</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Guest</span>
              <span className="font-medium">{selectedBooking?.guest_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Room</span>
              <span>{selectedBooking?.room_number} · {selectedBooking?.room_type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-in</span>
              <span>{selectedBooking?.checkin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-out</span>
              <span>{selectedBooking?.checkout}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="text-muted-foreground">Room Charges</span>
              <span>Rs. {selectedBooking?.total?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Additional Charges</span>
              <span>Rs. {totalCharges.toLocaleString()}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>Rs. {grandTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Paid via</span>
              <span className="font-medium capitalize">{paymentMethod.replace('_', ' ')}{splitBill && splitMethod2 ? ` + ${splitMethod2.replace('_', ' ')}` : ''}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 justify-center" onClick={() => toast.success('Receipt printed!')}>
              <Printer className="w-4 h-4 mr-1.5" /> Print
            </Button>
            <Button variant="primary" className="flex-1 justify-center" onClick={handleCloseReceipt}>
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}