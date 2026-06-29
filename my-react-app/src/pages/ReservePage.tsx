import { useState } from "react"
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom"
import { Star, MapPin, ArrowLeft, ShieldCheck, Users, BedDouble, Bath, Building2, CreditCard, Check, Circle } from "lucide-react"
import { hotels } from "../data/hotels"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

type PaymentMethod = "bank" | "esewa" | "khalti" | "visa" | "paypal"

const paymentOptions: { key: PaymentMethod; label: string; sub: string; color: string }[] = [
  { key: "bank", label: "Bank Transfer", sub: "Nepal Investment Bank · NMB · Prabhu", color: "#1a73e8" },
  { key: "esewa", label: "eSewa", sub: "Pay via eSewa wallet", color: "#00a651" },
  { key: "khalti", label: "Khalti", sub: "Pay via Khalti digital wallet", color: "#5a2d82" },
  { key: "visa", label: "Credit / Debit Card", sub: "Visa · Mastercard · Amex", color: "#1434cb" },
  { key: "paypal", label: "PayPal", sub: "Pay with your PayPal account", color: "#003087" },
]

function PaymentIcon({ method, color }: { method: PaymentMethod; color: string }) {
  switch (method) {
    case "bank":
      return <Building2 size={22} style={{ color }} />
    case "visa":
      return <CreditCard size={22} style={{ color }} />
    case "esewa":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="20" height="16" rx="4" fill={color} />
          <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">E</text>
        </svg>
      )
    case "khalti":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="20" height="16" rx="4" fill={color} />
          <text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">K</text>
        </svg>
      )
    case "paypal":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="20" height="16" rx="4" fill={color} />
          <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">P</text>
        </svg>
      )
  }
}

export default function ReservePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const hotel = hotels.find((h) => h.id === Number(id))
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null)
  const [searchParams] = useSearchParams()
  const resCheckIn = searchParams.get('checkIn') || ''
  const resCheckOut = searchParams.get('checkOut') || ''
  const resGuests = Number(searchParams.get('adults')) + Number(searchParams.get('children')) || 1
  const resInfants = Number(searchParams.get('infants')) || 0
  const resPets = Number(searchParams.get('pets')) || 0

  const formatDate = (d: string) => d
    ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : ''

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <p className="text-2xl">🏨</p>
        <p className="text-lg font-semibold text-foreground">Property not found</p>
        <Link to="/" className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:opacity-90">
          Back to home
        </Link>
      </div>
    )
  }

  const nights = resCheckIn && resCheckOut
    ? Math.max(1, Math.round((new Date(resCheckOut).getTime() - new Date(resCheckIn).getTime()) / 86400000))
    : 5
  const subtotal = hotel.price * nights
  const cleaningFee = Math.round(hotel.price * 0.15)
  const serviceFee = Math.round(subtotal * 0.12)
  const total = subtotal + cleaningFee + serviceFee

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={15} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
          {/* Left side — Payment methods */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-5">Payment Method</h2>
            <div className="space-y-3">
              {paymentOptions.map(({ key, label, sub, color }) => (
                <button
                  key={key}
                  onClick={() => setSelectedPayment(key)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                    selectedPayment === key
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-muted-foreground/30 hover:bg-accent/50"
                  }`}
                >
                  <PaymentIcon method={key} color={color} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground truncate">{sub}</p>
                  </div>
                  {selectedPayment === key ? (
                    <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </span>
                  ) : (
                    <Circle size={18} className="text-muted-foreground/40" />
                  )}
                </button>
              ))}
            </div>

            {selectedPayment && (
              <div className="mt-6 p-5 bg-white border border-border rounded-xl animate-slide-down">
                <p className="text-sm font-semibold text-foreground mb-3">
                  {selectedPayment === "bank" && "Bank Transfer Details"}
                  {selectedPayment === "esewa" && "eSewa Payment"}
                  {selectedPayment === "khalti" && "Khalti Payment"}
                  {selectedPayment === "visa" && "Card Details"}
                  {selectedPayment === "paypal" && "PayPal Payment"}
                </p>
                {selectedPayment === "bank" && (
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Account: <strong className="text-foreground">StayEasy Pvt. Ltd.</strong></p>
                    <p>Bank: <strong className="text-foreground">Nepal Investment Bank</strong></p>
                    <p>Account No: <strong className="text-foreground">1234 5678 9012</strong></p>
                    <p>Branch: <strong className="text-foreground">Kamaladi, Kathmandu</strong></p>
                  </div>
                )}
                {selectedPayment === "visa" && (
                  <div className="space-y-3">
                    <input type="text" placeholder="Card number" className="w-full border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors text-foreground" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="MM/YY" className="border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors text-foreground" />
                      <input type="text" placeholder="CVC" className="border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors text-foreground" />
                    </div>
                    <input type="text" placeholder="Cardholder name" className="w-full border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors text-foreground" />
                  </div>
                )}
                {(selectedPayment === "esewa" || selectedPayment === "khalti" || selectedPayment === "paypal") && (
                  <p className="text-sm text-muted-foreground">You will be redirected to the payment gateway to complete this transaction.</p>
                )}
              </div>
            )}
          </div>

          {/* Right side — Booking summary */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="border border-border rounded-2xl shadow-xl p-6 bg-white">
              <div className="flex gap-4 mb-5 pb-5 border-b border-border">
                <img src={hotel.images[0]} alt={hotel.name} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{hotel.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin size={10} /> {hotel.location}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={11} className="fill-foreground stroke-foreground" />
                    <span className="text-xs font-semibold text-foreground">{hotel.rating}</span>
                    <span className="text-xs text-muted-foreground">({hotel.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span><BedDouble size={10} className="inline" /> {hotel.bedrooms} bed</span>
                    <span><Bath size={10} className="inline" /> {hotel.bathrooms} bath</span>
                    <span><Users size={10} className="inline" /> {hotel.maxGuests} guests</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-5 pb-5 border-b border-border">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Check-in</p>
                    <p className="text-sm font-medium text-foreground">{formatDate(resCheckIn) || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Checkout</p>
                    <p className="text-sm font-medium text-foreground">{formatDate(resCheckOut) || '—'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Guests</p>
                  <p className="text-sm font-medium text-foreground">{resGuests} guest{resGuests > 1 ? 's' : ''}{resInfants > 0 ? `, ${resInfants} infant${resInfants > 1 ? 's' : ''}` : ''}{resPets > 0 ? `, ${resPets} pet${resPets > 1 ? 's' : ''}` : ''}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-sm mb-5 pb-5 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">${hotel.price} × {nights} night{nights > 1 ? 's' : ''}</span>
                  <span className="text-foreground">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cleaning fee</span>
                  <span className="text-foreground">${cleaningFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee</span>
                  <span className="text-foreground">${serviceFee}</span>
                </div>
              </div>

              <div className="flex justify-between font-semibold text-foreground text-base mb-5">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>

              <button
                disabled={!selectedPayment}
                className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:opacity-90 transition-all hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {selectedPayment ? "Confirm reservation" : "Select a payment method"}
              </button>
              <p className="text-center text-xs text-muted-foreground mt-3">You won't be charged yet</p>
            </div>

            {hotel.isSuperhost && (
              <div className="flex items-center gap-2 text-sm text-foreground bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 mt-4">
                <ShieldCheck size={16} className="text-primary shrink-0" />
                <span>Hosted by a <strong>Verified Host</strong></span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
