import { useState, useRef, useEffect } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import { X, ChevronRight } from "lucide-react"
import { hotels } from "../data/hotels"

export default function RoomSelectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const hotel = hotels.find((h) => h.id === Number(id))
  const [searchParams] = useSearchParams()
  const resCheckIn = searchParams.get('checkIn') || ''
  const resCheckOut = searchParams.get('checkOut') || ''
  const resAdults = Number(searchParams.get('adults')) || 1
  const resChildren = Number(searchParams.get('children')) || 0
  const resInfants = Number(searchParams.get('infants')) || 0
  const resPets = Number(searchParams.get('pets')) || 0

  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (overlayRef.current && e.target === overlayRef.current) {
        navigate(-1)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [navigate])

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
          <p className="text-2xl mb-3">🏨</p>
          <p className="text-lg font-semibold text-gray-900">Property not found</p>
          <button onClick={() => navigate(-1)} className="mt-4 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:opacity-90">
            Go back
          </button>
        </div>
      </div>
    )
  }

  const availableTypes = hotel.roomTypes.filter(rt => rt.availableRooms > 0)

  const nights = resCheckIn && resCheckOut
    ? Math.max(1, Math.round((new Date(resCheckOut).getTime() - new Date(resCheckIn).getTime()) / 86400000))
    : 1

  const selectedType = availableTypes.find(rt => rt.id === selectedTypeId)
  const totalPrice = selectedType ? selectedType.price * 1 * nights : 0

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  const goToReserve = () => {
    if (!selectedType) return
    const params = new URLSearchParams()
    if (resCheckIn) params.set('checkIn', resCheckIn)
    if (resCheckOut) params.set('checkOut', resCheckOut)
    params.set('adults', String(resAdults))
    params.set('children', String(resChildren))
    params.set('infants', String(resInfants))
    params.set('pets', String(resPets))
    params.set('roomTypeId', selectedType.id)
    const query = params.toString()
    navigate('/reserve/' + id + '?' + query)
  }

  return (
    <div
      ref={overlayRef}
      className="min-h-screen bg-black/50 flex items-center justify-center p-4"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-[680px] max-h-[90vh] flex flex-col overflow-hidden" style={{ animation: "fadeIn 0.2s ease" }}>
        {/* Header */}
        <div className="relative px-6 pt-5 pb-3 border-b border-gray-100 shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-700"
          >
            <X size={18} />
          </button>
          <h1 className="text-[26px] font-bold text-gray-900">Choose your room</h1>
        </div>

        {/* Scrollable room list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {availableTypes.map((rt, index) => {
            const isSelected = selectedTypeId === rt.id
            const imgSrc = hotel.images[index % hotel.images.length]
            return (
              <button
                key={rt.id}
                onClick={() => setSelectedTypeId(isSelected ? null : rt.id)}
                className={`w-full text-left flex gap-4 p-3 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? 'border-gray-900 bg-gray-50/50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'
                }`}
              >
                {/* Thumbnail */}
                <div className="relative w-[110px] h-[110px] shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={imgSrc}
                    alt={rt.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1.5 left-1.5 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                    <ChevronRight size={12} className="text-gray-700" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <h3 className="font-bold text-[16px] text-gray-900">{rt.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      1 {rt.bedType} · {rt.areaSqFt} sq ft
                    </p>
                  </div>
                  <div className="mt-1">
                    <span className="font-bold text-[15px] text-gray-900">${rt.price * 1 * nights}</span>
                    <span className="text-sm text-gray-500"> for {nights} night{nights > 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Selection indicator */}
                <div className="flex items-start pt-1 shrink-0">
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
                  }`}>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                  </span>
                </div>
              </button>
            )
          })}

          {availableTypes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No rooms available for this property.</p>
              <button onClick={() => navigate(-1)} className="mt-4 px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:opacity-90">
                Go back
              </button>
            </div>
          )}
        </div>

        {/* Sticky footer */}
        {selectedType && (
          <div className="shrink-0 border-t border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[22px] font-extrabold text-gray-900">${totalPrice.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  for {nights} night{nights > 1 ? 's' : ''}
                  {resCheckIn && resCheckOut && ` · ${formatDate(resCheckIn)} – ${formatDate(resCheckOut)}`}
                </p>
                <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-xl bg-green-50 text-green-800 text-xs font-medium border border-green-200">
                  +${Math.round(totalPrice * 0.1)} StayEasy credit
                </span>
              </div>
              <button
                onClick={goToReserve}
                className="shrink-0 px-8 py-3.5 rounded-full bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors shadow-md"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
