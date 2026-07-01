import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { hotels } from '../data/hotels'
import { Heart, MapPin, Star } from 'lucide-react'

export default function MyWishlistPage() {
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useFavorites()

  const favoriteHotels = hotels.filter(h => favorites.has(h.id))

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
            <Heart size={16} />
            My Wishlist
          </h3>
          {favoriteHotels.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <Heart size={48} color="#ddd" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111', margin: '0 0 6px' }}>
                Your wishlist is empty
              </h3>
              <p style={{ fontSize: 13, color: '#999', margin: '0 0 20px', maxWidth: 320, marginLeft: 'auto', marginRight: 'auto' }}>
                Save your favorite properties by tapping the heart icon and find them here later.
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
                Explore properties
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ fontSize: 12, color: '#999', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Saved properties ({favoriteHotels.length})
              </p>
              {favoriteHotels.map(hotel => (
                <div
                  key={hotel.id}
                  style={{
                    display: 'flex',
                    gap: 14,
                    padding: 12,
                    borderRadius: 12,
                    border: '1px solid #eee',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.15s',
                  }}
                  onClick={() => navigate(`/hotel/${hotel.id}`)}
                  onMouseOver={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'}
                  onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
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
                          {hotel.name}
                        </h4>
                        <p style={{ fontSize: 12, color: '#777', margin: '2px 0', display: 'flex', alignItems: 'center', gap: 3 }}>
                          <MapPin size={11} />
                          {hotel.city}, {hotel.country}
                        </p>
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          toggleFavorite(hotel.id)
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 4,
                          color: '#e94560',
                        }}
                        aria-label={`Remove ${hotel.name} from wishlist`}
                      >
                        <Heart size={16} fill="#e94560" />
                      </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                      <Star size={12} fill="#f5a623" stroke="#f5a623" />
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#111' }}>{hotel.rating}</span>
                      <span style={{ fontSize: 11, color: '#999' }}>({hotel.reviews})</span>
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#111', margin: '6px 0 0' }}>
                      ${hotel.price}
                      <span style={{ fontSize: 11, fontWeight: 400, color: '#999' }}> / night</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
