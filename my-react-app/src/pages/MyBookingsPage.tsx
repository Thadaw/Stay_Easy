import { useNavigate } from 'react-router-dom'
import { useBookings } from '../context/BookingContext'
import { Calendar, MapPin } from 'lucide-react'

export default function MyBookingsPage() {
  const navigate = useNavigate()
  const { bookings, cancelBooking } = useBookings()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#e8e8e8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 20px',
        gap: 16,
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: 700,
          maxWidth: '100%',
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 8px 40px rgba(0,0,0,0.13)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '24px 28px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Calendar size={16} />
            My Booking
          </h3>

          {bookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <Calendar size={48} color="#ddd" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111', margin: '0 0 6px' }}>
                No bookings yet
              </h3>
              <p style={{ fontSize: 13, color: '#999', margin: '0 0 20px', maxWidth: 320, marginLeft: 'auto', marginRight: 'auto' }}>
                When you book a stay, you'll see your upcoming trips and reservation details here.
              </p>
              <button
                onClick={() => navigate('/')}
                style={{
                  padding: '10px 24px',
                  background: '#111',
                  border: 'none',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Browse stays
              </button>
            </div>
          ) : (
            <>
              {bookings.filter(b => b.status === 'upcoming').length > 0 && (
                <>
                  <p style={{ fontSize: 12, color: '#999', margin: '0 0 10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    Upcoming bookings
                  </p>
                  {bookings.filter(b => b.status === 'upcoming').map(b => (
                    <div
                      key={b.id}
                      style={{
                        display: 'flex',
                        gap: 14,
                        padding: 12,
                        borderRadius: 12,
                        border: '1px solid #eee',
                        marginBottom: 10,
                      }}
                    >
                      <img
                        src={b.hotelImage}
                        alt={b.hotelName}
                        style={{
                          width: 90,
                          height: 90,
                          borderRadius: 10,
                          objectFit: 'cover',
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <h4 style={{ fontSize: 14, fontWeight: 600, color: '#111', margin: 0 }}>
                              {b.hotelName}
                            </h4>
                            <p style={{ fontSize: 12, color: '#777', margin: '2px 0', display: 'flex', alignItems: 'center', gap: 3 }}>
                              <MapPin size={11} />
                              {b.hotelCity}, {b.hotelCountry}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to cancel this booking?')) {
                                cancelBooking(b.id)
                              }
                            }}
                            style={{
                              padding: '6px 14px',
                              background: 'none',
                              border: '1px solid #e94560',
                              borderRadius: 6,
                              color: '#e94560',
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                        <p style={{ fontSize: 12, color: '#555', margin: '4px 0' }}>
                          {new Date(b.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(b.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p style={{ fontSize: 12, color: '#777', margin: '2px 0' }}>
                          {b.roomTypeName} · {b.guests} guest{b.guests !== 1 ? 's' : ''}
                        </p>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#111', margin: '6px 0 0' }}>
                          ${b.totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {bookings.filter(b => b.status === 'completed' || b.status === 'cancelled').length > 0 && (
                <>
                  <p style={{ fontSize: 12, color: '#999', margin: '16px 0 10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    Past bookings
                  </p>
                  {bookings.filter(b => b.status === 'completed' || b.status === 'cancelled').map(b => (
                    <div
                      key={b.id}
                      style={{
                        display: 'flex',
                        gap: 14,
                        padding: 12,
                        borderRadius: 12,
                        border: '1px solid #eee',
                        opacity: 0.6,
                        marginBottom: 10,
                      }}
                    >
                      <img
                        src={b.hotelImage}
                        alt={b.hotelName}
                        style={{
                          width: 90,
                          height: 90,
                          borderRadius: 10,
                          objectFit: 'cover',
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <h4 style={{ fontSize: 14, fontWeight: 600, color: '#111', margin: 0 }}>
                              {b.hotelName}
                            </h4>
                            <p style={{ fontSize: 12, color: '#777', margin: '2px 0', display: 'flex', alignItems: 'center', gap: 3 }}>
                              <MapPin size={11} />
                              {b.hotelCity}, {b.hotelCountry}
                            </p>
                          </div>
                          <span
                            style={{
                              padding: '3px 10px',
                              borderRadius: 6,
                              fontSize: 11,
                              fontWeight: 600,
                              backgroundColor: b.status === 'completed' ? '#e8f5e9' : '#fce4ec',
                              color: b.status === 'completed' ? '#2e7d32' : '#c62828',
                            }}
                          >
                            {b.status === 'completed' ? 'Completed' : 'Cancelled'}
                          </span>
                        </div>
                        <p style={{ fontSize: 12, color: '#555', margin: '4px 0' }}>
                          {new Date(b.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(b.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p style={{ fontSize: 12, color: '#777', margin: '2px 0' }}>
                          {b.roomTypeName} · {b.guests} guest{b.guests !== 1 ? 's' : ''}
                        </p>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#111', margin: '6px 0 0' }}>
                          ${b.totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
