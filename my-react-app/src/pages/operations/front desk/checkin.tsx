import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCheck, CheckCircle, Circle } from 'lucide-react'
import { PageHeader } from '../../../components/ui/PageHeader'
import { Button } from '../../../components/ui/Button'
import { Table } from '../../../components/ui/Table'
import { Badge } from '../../../components/ui/Badge'
import { Modal } from '../../../components/ui/Modal'
import { SearchInput } from '../../../components/ui/SearchInput'
import { mockBookings, mockRooms } from '../_data/mock'
import type { Booking } from '../../../types'
import toast from 'react-hot-toast'

const STEPS = [
  {num: 1, label: 'Select Guest'},
  {num: 2, label: 'Verify ID'},
  {num: 3, label: 'Assign Room'},
  {num: 4, label: 'Confirm'},
] as const

const statusColors : Record<string, string> = {
  available : 'bg-emerald-100 border-emerald-300 text-emerald-600',
  occupied : 'bg-red-100 border-red-300 text-red-600',
  dirty : 'bg-amber-100 border-amber-300 text-amber-600',
  cleaning : 'bg-blue-100 border-blue-300 text-blue-600',
  maintenance : 'bg-gray-100 border-gray-300 text-gray-600',
  blocked : "bg-gray-100 border-gray-300 text-gray-600",
  inspected : 'bg-teal-100 border-teal-300 text-teal-600',
}

export default function CheckIn() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [assignedRoom, setAssignedRoom] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)
  const [idVerified, setIdVerified] = useState(false)
  const [paymentOption, setPaymentOption] = useState<'full' | 'advance'>('full')
  const [advanceAmount, setAdvanceAmount] = useState(0)
  const [checkinMethod, setCheckinMethod] = useState<'cash' | 'card' | 'phone_pay' | ''>('')

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

  const suggestedRoom = availableRooms[0]?.room_number || ''

  const handleSelectBooking = (booking: Booking) => {
    setSelectedBooking(booking)
    setCurrentStep(2)
  }

  const handleVerify = () => {
    setIdVerified(true)
    setCurrentStep(3)
  }

  const handleRoomSelect = (roomNumber: string) => {
    setAssignedRoom(roomNumber)
    setCurrentStep(4)
  }

  const handleConfirm = () => {
    setShowConfirm(false)
    const collected = paymentOption === 'full' ? selectedBooking!.balance : advanceAmount
    toast.success(`Guest checked in to ${assignedRoom}! Rs. ${collected.toLocaleString()} collected via ${checkinMethod.replace('_', ' ')}.`)
    setSelectedBooking(null)
    setAssignedRoom('')
    setIdVerified(false)
    setPaymentOption('full')
    setAdvanceAmount(0)
    setCheckinMethod('')
    setCurrentStep(1)
    navigate('/ops/frontdesk')
  }

  const handleBack = () => {
    if (currentStep === 2) { setSelectedBooking(null); setCurrentStep(1) }
    else if (currentStep === 3) { setCurrentStep(2) }
    else if (currentStep === 4) { setCurrentStep(3) }
  }

  const columns = [
    { key: 'ref', header: 'Ref', width: '100px', render: (b: Booking) => <span className="font-mono text-xs text-muted-foreground">{b.ref}</span> },
    { key: 'guest_name', header: 'Guest', render: (b: Booking) => <span className="font-medium">{b.guest_name}</span> },
    { key: 'room_type', header: 'Room Type' },
    { key: 'checkin', header: 'Check-in' },
    { key: 'status', header: 'Status', render: () => <Badge variant="blue">Confirmed</Badge> },
  ]

  return (
    <div>
      <PageHeader
        title="Check-in"
        description="Search confirmed bookings and assign rooms"
        breadcrumb={[{ label: 'Front Desk', href: '/ops/frontdesk' }, { label: 'Check-in' }]}
        actions={
          <div className="w-full lg:w-64">
            <SearchInput value={search} onChange={setSearch} placeholder="Search by name, ref, or phone..." />
          </div>
        }
      />

      <div className="grid lg:grid-cols-5 gap-6">

        <div className="lg:col-span-3">

          {currentStep === 1 && (
            <div className="bg-white rounded-2xl border border-border shadow-sm">
              <div className="px-4 sm:px-6 py-4 border-b border-border">
                <h3 className="text-base font-semibold text-foreground">Confirmed Bookings</h3>
              </div>
              <div className="p-1">
                <Table
                  columns={columns}
                  data={filtered}
                  keyExtractor={(b) => b.ref}
                  pageSize={8}
                  onRowClick={handleSelectBooking}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && selectedBooking && (
            <div className="bg-white rounded-2xl border border-border shadow-sm p-4 sm:p-6 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {selectedBooking.guest_name[0]}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{selectedBooking.guest_name}</p>
                  <p className="text-xs text-muted-foreground">{selectedBooking.ref}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{selectedBooking.phone}</span></div>
                <div><span className="text-muted-foreground">Email:</span> <span className="font-medium">{selectedBooking.email}</span></div>
                <div><span className="text-muted-foreground">Room Type:</span> <span className="font-medium">{selectedBooking.room_type}</span></div>
                <div><span className="text-muted-foreground">Check-in:</span> <span className="font-medium">{selectedBooking.checkin}</span></div>
                <div><span className="text-muted-foreground">Check-out:</span> <span className="font-medium">{selectedBooking.checkout}</span></div>
                <div><span className="text-muted-foreground">Balance:</span> <span className="font-medium">Rs. {selectedBooking.balance?.toLocaleString() || 0}</span></div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-semibold text-blue-800">Identity Verification</h4>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={idVerified}
                    onChange={(e) => setIdVerified(e.target.checked)}
                    className="w-4 h-4 rounded border-blue-300 text-blue-600 focus:ring-blue-400/40"
                  />
                  <span className="text-sm text-blue-700">ID verified — guest has provided valid identification</span>
                </label>
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button variant="primary" disabled={!idVerified} onClick={handleVerify}>
                  Proceed to Room Assignment
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && selectedBooking && (
            <div className="bg-white rounded-2xl border border-border shadow-sm p-4 sm:p-6 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {selectedBooking.guest_name[0]}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{selectedBooking.guest_name}</p>
                  <p className="text-xs text-muted-foreground">{selectedBooking.ref} · {selectedBooking.room_type}</p>
                </div>
              </div>

              {suggestedRoom ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-xs text-emerald-700 font-medium">Suggested Room</p>
                  <p className="text-lg font-bold text-emerald-800 mt-1">Room {suggestedRoom}</p>
                  <p className="text-xs text-emerald-600">Available now and matches your booking type.</p>
                  <Button variant="primary" className="mt-3" onClick={() => handleRoomSelect(suggestedRoom)}>
                    Assign Room {suggestedRoom}
                  </Button>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm font-medium text-amber-800">No available rooms of this type.</p>
                  <p className="text-xs text-amber-600 mt-1">Choose a different room type or contact housekeeping.</p>
                </div>
              )}

              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
              </div>
            </div>
          )}

          {currentStep === 4 && selectedBooking && (
            <div className="bg-white rounded-2xl border border-border shadow-sm p-4 sm:p-6 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{selectedBooking.guest_name}</p>
                  <p className="text-xs text-muted-foreground">{selectedBooking.ref}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room</span>
                  <span className="font-semibold">{assignedRoom}</span>
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
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="text-muted-foreground">Total Due</span>
                  <span className="font-semibold">Rs. {selectedBooking.balance?.toLocaleString() || 0}</span>
                </div>
              </div>

              {/* Collect Payment */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-4">
                <h4 className="text-sm font-semibold text-blue-800">Collect Payment</h4>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => setPaymentOption('full')}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-medium border transition-all ${
                      paymentOption === 'full'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-100'
                    }`}
                  >
                    Pay Full — Rs. {selectedBooking.balance?.toLocaleString() || 0}
                  </button>
                  <button
                    onClick={() => setPaymentOption('advance')}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-medium border transition-all ${
                      paymentOption === 'advance'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-100'
                    }`}
                  >
                    Advance
                  </button>
                </div>

                {paymentOption === 'advance' && (
                  <div className="space-y-2">
                    <input
                      type="number"
                      placeholder="Enter advance amount"
                      value={advanceAmount || ''}
                      onChange={e => setAdvanceAmount(Number(e.target.value))}
                      className="w-full h-11 px-3.5 bg-white border border-blue-300 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-500"
                    />
                    {advanceAmount > 0 && (
                      <p className="text-xs text-blue-600">
                        Remaining at check-out: Rs. {(selectedBooking.balance - advanceAmount).toLocaleString()}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-blue-700 mb-2">Payment Method</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {(['cash', 'card', 'phone_pay'] as const).map(method => (
                      <button
                        key={method}
                        onClick={() => setCheckinMethod(method)}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-medium border transition-all ${
                          checkinMethod === method
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-100'
                        }`}
                      >
                        {method === 'cash' ? '💵 Cash' : method === 'card' ? '💳 Card' : '📱 Phone Pay'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button
                  variant="primary"
                  disabled={
                    !checkinMethod ||
                    (paymentOption === 'advance' && (!advanceAmount || advanceAmount <= 0))
                  }
                  onClick={() => setShowConfirm(true)}
                >
                  {paymentOption === 'full'
                    ? `Collect Rs. ${selectedBooking.balance?.toLocaleString() || 0} & Check-in`
                    : `Collect Rs. ${(advanceAmount || 0).toLocaleString()} & Check-in`}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Progress</h3>
            <div className="space-y-0">
              {STEPS.map((step, i) => {
                const isActive = currentStep === step.num
                const isDone = currentStep > step.num
                return (
                  <div key={step.num} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      {isDone ? (
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                          <Circle className="w-4 h-4 text-white fill-white" />
                        </div>
                      ) : isActive ? (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{step.num}</span>
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">{step.num}</span>
                        </div>
                      )}
                      {i < STEPS.length - 1 && (
                        <div className={`w-0.5 h-6 ${isDone ? 'bg-green-300' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <div className="pt-1.5">
                      <p className={`text-sm font-medium ${isActive ? 'text-foreground' : isDone ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {step.label}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          {currentStep === 3 && selectedBooking && (
            <div className="bg-white rounded-2xl border border-border shadow-sm p-4 sm:p-5 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Available Rooms — {selectedBooking.room_type}</h3>
              {(() => {
                const floors = [...new Set(availableRooms.map(r => r.floor))].sort()
                return floors.length > 0 ? (
                  floors.map(floor => (
                    <div key={floor}>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Floor {floor}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {availableRooms.filter(r => r.floor === floor).map(room => {
                          const isSelected = assignedRoom === room.room_number
                          return (
                            <button
                              key={room.id}
                              onClick={() => handleRoomSelect(room.room_number)}
                              className={`text-center p-2 rounded-lg border text-xs font-medium leading-tight transition-all
                                ${statusColors[room.status] || 'bg-gray-100 border-gray-200 text-gray-500'}
                                ${isSelected ? 'ring-2 ring-primary ring-offset-2 scale-105' : 'hover:shadow-md'}
                                cursor-pointer`}
                              title={`${room.room_number} — ${room.status}`}
                            >
                              {room.room_number}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No rooms available.</p>
                )
              })()}

              <div className="border-t border-border pt-3">
                <p className="text-xs font-medium text-muted-foreground mb-2">Legend</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <span className="flex items-center gap-1.5 text-[10px]"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" /> Available</span>
                  <span className="flex items-center gap-1.5 text-[10px]"><span className="w-2.5 h-2.5 rounded-sm bg-red-400" /> Occupied</span>
                  <span className="flex items-center gap-1.5 text-[10px]"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400" /> Dirty</span>
                  <span className="flex items-center gap-1.5 text-[10px]"><span className="w-2.5 h-2.5 rounded-sm bg-blue-400" /> Cleaning</span>
                </div>
              </div>
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
        <div className="bg-gray-50 rounded-xl p-4 mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Room</span><span className="font-semibold">{assignedRoom}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Total Due</span><span>Rs. {selectedBooking?.balance?.toLocaleString() || 0}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Collecting</span><span className="font-semibold">Rs. {((paymentOption === 'full' ? selectedBooking?.balance : advanceAmount) || 0).toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Method</span><span className="font-semibold capitalize">{checkinMethod.replace('_', ' ')}</span></div>
          {paymentOption === 'advance' && advanceAmount > 0 && selectedBooking && (
            <div className="flex justify-between"><span className="text-muted-foreground">Remaining</span><span>Rs. {(selectedBooking.balance - advanceAmount).toLocaleString()}</span></div>
          )}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleConfirm}>Check In</Button>
        </div>
      </Modal>
    </div>
  )
}