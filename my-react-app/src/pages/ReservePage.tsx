import { useState, useRef, useEffect } from "react"
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom"
import { Star, ChevronDown, Plus, Minus, Check, Circle } from "lucide-react"
import { hotels } from "../data/hotels"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

type PaymentMethod = "stripe" | "razorpay"

const paymentOptions: { key: PaymentMethod; label: string; sub: string; logo: JSX.Element }[] = [
  {
    key: "stripe",
    label: "Stripe",
    sub: "Pay via Credit / Debit Card",
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="4" fill="#635bff" />
        <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">S</text>
      </svg>
    ),
  },
  {
    key: "razorpay",
    label: "Razorpay",
    sub: "Pay via UPI, Card, Net Banking & more",
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="4" fill="#3399ff" />
        <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">R</text>
      </svg>
    ),
  },
]

interface GuestCount {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export default function ReservePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const hotel = hotels.find((h) => h.id === Number(id))
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null)
  const [showBreakdown, setShowBreakdown] = useState(false)

  const resRoomTypeId = searchParams.get('roomTypeId') || ''

  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '')
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '')
  const [guestCount, setGuestCount] = useState<GuestCount>({
    adults: Number(searchParams.get('adults')) || 1,
    children: Number(searchParams.get('children')) || 0,
    infants: Number(searchParams.get('infants')) || 0,
    pets: Number(searchParams.get('pets')) || 0,
  })
  const [showGuestPicker, setShowGuestPicker] = useState(false)
  const guestRef = useRef<HTMLDivElement>(null)
  const tripRef = useRef<HTMLDivElement>(null)

  const formatDate = (d: string) => {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatShortDate = (d: string) => {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (guestRef.current && !guestRef.current.contains(e.target as Node)) {
        setShowGuestPicker(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <p className="text-2xl">🏨</p>
        <p className="text-lg font-semibold text-[#111827]">Property not found</p>
        <Link to="/" className="px-5 py-2.5 bg-[#111827] text-white rounded-full text-sm font-medium hover:opacity-90">
          Back to home
        </Link>
      </div>
    )
  }

  const selectedRoom = hotel.roomTypes.find((rt) => rt.id === resRoomTypeId)
  const currentPrice = selectedRoom?.price ?? hotel.price
  const maxRoomGuests = selectedRoom?.maxGuests ?? hotel.maxGuests
  const totalGuests = guestCount.adults + guestCount.children

  const nights = checkIn && checkOut
    ? Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 5
  const subtotal = currentPrice * nights
  const taxesAndFees = Math.round(subtotal * 0.10)
  const resortFee = Math.round(currentPrice * 0.06)
  const total = subtotal + taxesAndFees + resortFee
  const dueToday = subtotal + taxesAndFees
  const dueAtProperty = resortFee

  const adjustGuest = (key: keyof GuestCount, delta: number) => {
    setGuestCount(prev => {
      const min = key === 'adults' ? 1 : 0
      const next = { ...prev, [key]: Math.max(min, prev[key] + delta) }
      if (key !== 'pets') {
        const guestTotal = next.adults + next.children
        if (guestTotal > maxRoomGuests) return prev
      }
      return next
    })
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] mb-6 transition-colors">
          <ChevronDown size={15} className="rotate-90" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">
          {/* Left — interactive content */}
          <div>
            {/* Trip details — editable */}
            <div ref={tripRef} className="bg-white border border-[#E5E7EB] rounded-2xl p-4 mb-5">
              <h2 className="text-sm font-bold text-[#111827] mb-3">Trip details</h2>
              <div className="border border-[#E5E7EB] rounded-lg">
                <div className="grid grid-cols-2 divide-x divide-[#E5E7EB] rounded-t-lg overflow-hidden">
                  <div className="p-2">
                    <label className="block text-[10px] font-semibold uppercase tracking-wide text-[#374151] mb-0.5">Check-in</label>
                    <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full text-xs bg-transparent outline-none text-[#111827]" />
                  </div>
                  <div className="p-2">
                    <label className="block text-[10px] font-semibold uppercase tracking-wide text-[#374151] mb-0.5">Checkout</label>
                    <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full text-xs bg-transparent outline-none text-[#111827]" />
                  </div>
                </div>
                <div ref={guestRef} className="border-t border-[#E5E7EB] p-2 relative rounded-b-lg">
                  <label className="block text-[10px] font-semibold uppercase tracking-wide text-[#374151] mb-0.5">Guests</label>
                  <button
                    onClick={() => setShowGuestPicker(v => !v)}
                    className="flex items-center justify-between w-full text-xs text-[#111827]"
                  >
                    <span>{totalGuests} guest{totalGuests !== 1 ? 's' : ''}{guestCount.infants > 0 ? `, ${guestCount.infants} infant${guestCount.infants > 1 ? 's' : ''}` : ''}{guestCount.pets > 0 ? `, ${guestCount.pets} pet${guestCount.pets > 1 ? 's' : ''}` : ''}</span>
                    <ChevronDown size={12} className={`transition-transform duration-200 ${showGuestPicker ? 'rotate-180' : ''}`} />
                  </button>
                  {showGuestPicker && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-xl z-50 p-3">
                      {([
                        { key: 'adults' as keyof GuestCount, label: 'Adults', sub: 'Ages 13 or above' },
                        { key: 'children' as keyof GuestCount, label: 'Children', sub: 'Ages 2–12' },
                        { key: 'infants' as keyof GuestCount, label: 'Infants', sub: 'Under 2' },
                        { key: 'pets' as keyof GuestCount, label: 'Pets', sub: 'Bringing a service animal?' },
                      ]).map(({ key, label, sub }) => (
                        <div key={key} className="flex items-center justify-between py-2 border-b border-[#E5E7EB] last:border-0">
                          <div>
                            <p className="text-xs font-semibold text-[#111827]">{label}</p>
                            <p className="text-[11px] text-[#6B7280]">{sub}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => adjustGuest(key, -1)}
                              disabled={guestCount[key] <= (key === 'adults' ? 1 : 0)}
                              className="w-6 h-6 rounded-full border-2 border-[#E5E7EB] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#111827] hover:bg-[#F3F4F6] transition-all"
                            >
                              <Minus size={8} />
                            </button>
                            <span className="w-4 text-center text-xs font-bold tabular-nums text-[#111827]">{guestCount[key]}</span>
                            <button
                              onClick={() => adjustGuest(key, 1)}
                              className="w-6 h-6 rounded-full border-2 border-[#E5E7EB] flex items-center justify-center hover:border-[#111827] hover:bg-[#F3F4F6] transition-all"
                            >
                              <Plus size={8} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>


            {/* Payment Method */}
            <h2 className="text-xl font-bold text-[#111827] mb-5">Payment Method</h2>
            <div className="space-y-3">
              {paymentOptions.map(({ key, label, sub, logo }) => (
                <button
                  key={key}
                  onClick={() => setSelectedPayment(key)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                    selectedPayment === key
                      ? "border-[#111827] bg-[#F9FAFB] shadow-md"
                      : "border-[#E5E7EB] hover:border-[#9CA3AF] hover:bg-[#F3F4F6]"
                  }`}
                >
                  {logo}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111827]">{label}</p>
                    <p className="text-xs text-[#6B7280] truncate">{sub}</p>
                  </div>
                  {selectedPayment === key ? (
                    <span className="w-5 h-5 rounded-full bg-[#111827] flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </span>
                  ) : (
                    <Circle size={18} className="text-[#9CA3AF]" />
                  )}
                </button>
              ))}
            </div>

            {selectedPayment && (
              <div className="mt-6 p-5 bg-white border border-[#E5E7EB] rounded-xl">
                <p className="text-sm font-semibold text-[#111827] mb-3">
                  {selectedPayment === "stripe" && "Pay with Stripe"}
                  {selectedPayment === "razorpay" && "Pay with Razorpay"}
                </p>
                <div className="space-y-3">
                  <input type="text" placeholder="Card number" className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#111827] transition-colors text-[#111827]" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="MM/YY" className="border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#111827] transition-colors text-[#111827]" />
                    <input type="text" placeholder="CVC" className="border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#111827] transition-colors text-[#111827]" />
                  </div>
                  <input type="text" placeholder="Cardholder name" className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#111827] transition-colors text-[#111827]" />
                </div>
                {selectedPayment === "razorpay" && (
                  <p className="text-xs text-[#6B7280] mt-3">Razorpay also supports UPI, Net Banking, and Wallets.</p>
                )}
              </div>
            )}
          </div>

          {/* Right — Booking Summary Card */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              {/* 1. Hotel Information */}
              <div className="pb-[18px] border-b border-[#E5E7EB]">
                <div className="flex gap-4">
                  <img src={hotel.images[0]} alt={hotel.name} className="w-16 h-16 rounded-[10px] object-cover shrink-0" />
                  <div className="flex flex-col gap-[4px] min-w-0">
                    <h3 className="text-lg font-bold text-[#111827] truncate leading-tight">{hotel.name} – {hotel.city}</h3>
                    <p className="text-[13px] text-[#6B7280]">{selectedRoom?.name || hotel.category}</p>
                    <div className="flex items-center gap-1">
                      <Star size={11} className="fill-[#111827] stroke-[#111827]" />
                      <span className="text-[13px] font-medium text-[#111827]">{hotel.rating}</span>
                      <span className="text-[13px] text-[#6B7280]">({hotel.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Cancellation Policy */}
              <div className="py-[18px] border-b border-[#E5E7EB]">
                <p className="text-[13px] text-[#4B5563] leading-5">
                  Cancel before check-in on {checkIn ? formatDate(checkIn) : 'check-in date'} for a partial refund.
                </p>
                <button className="text-[13px] font-medium text-[#111827] underline mt-1 cursor-pointer">Full policy</button>
              </div>

              {/* 3. Dates */}
              <div className="py-[18px] border-b border-[#E5E7EB]">
                <span className="text-[13px] font-medium text-[#374151]">Dates</span>
                <p className="text-[14px] text-[#111827] mt-1">
                  {checkIn && checkOut
                    ? `${formatShortDate(checkIn)} – ${formatShortDate(checkOut)}, ${new Date(checkOut).getFullYear()}`
                    : 'Select dates'}
                </p>
              </div>

              {/* 4. Guests */}
              <div className="py-[18px] border-b border-[#E5E7EB]">
                <span className="text-[13px] font-medium text-[#374151]">Guests</span>
                <p className="text-[14px] text-[#111827] mt-1">{totalGuests} guest{totalGuests !== 1 ? 's' : ''}</p>
              </div>

              {/* 5. Location */}
              <div className="py-[18px] border-b border-[#E5E7EB]">
                <p className="text-[13px] font-medium text-[#374151] mb-1">Location</p>
                <p className="text-[14px] text-[#4B5563]">{hotel.location}</p>
                <p className="text-[14px] text-[#4B5563]">{hotel.city}, {hotel.country}</p>
              </div>

              {/* 6. Price Details */}
              <div className="py-[18px] border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[14px] font-semibold text-[#111827]">Price details</p>
                  <button
                    onClick={() => setShowBreakdown(v => !v)}
                    className="text-[13px] font-medium text-[#111827] underline cursor-pointer"
                  >
                    {showBreakdown ? 'Hide breakdown' : 'Price breakdown'}
                  </button>
                </div>
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-[#4B5563]">${currentPrice} × {nights} night{nights > 1 ? 's' : ''}</span>
                  <span className="text-[#111827]">${subtotal.toFixed(2)}</span>
                </div>
                {showBreakdown && (
                  <div className="mt-3 space-y-[10px] pt-3 border-t border-[#E5E7EB]">
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-[#4B5563]">Taxes and fees</span>
                      <span className="text-[#111827]">${taxesAndFees.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-[#4B5563]">Resort fee</span>
                      <span className="text-[#111827]">${resortFee.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 7. Total */}
              <div className="py-[18px] border-b border-[#E5E7EB]">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-[#111827]">Total USD</span>
                  <span className="text-base font-bold text-[#111827]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* 8. Due Today */}
              <div className="pt-[18px]">
                <div className="flex justify-between items-center">
                  <span className="text-[15px] font-semibold text-[#111827]">Due today</span>
                  <span className="text-[15px] font-semibold text-[#111827]">${dueToday.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[13px] text-[#6B7280]">Due to host at property</span>
                  <span className="text-[13px] text-[#6B7280]">${dueAtProperty.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Confirm button below card */}
            <button
              disabled={!selectedPayment}
              className="w-full mt-6 py-3.5 rounded-xl bg-[#111827] text-white font-semibold text-sm hover:bg-black transition-all disabled:bg-[#D1D5DB] disabled:cursor-not-allowed"
            >
              {selectedPayment ? "Confirm reservation" : "Select a payment method"}
            </button>
            <p className="text-center text-xs text-[#6B7280] mt-3">You won't be charged yet</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
