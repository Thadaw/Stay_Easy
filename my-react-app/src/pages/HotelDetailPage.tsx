import { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, Heart, Share2, ChevronLeft, ChevronRight, ChevronDown, Wifi, Car, Utensils, Waves, Mountain, Dumbbell, ShieldCheck, ArrowLeft, Users, BedDouble, Bath, Plus, Minus } from "lucide-react";
import { hotels, reviewSamples } from "../data/hotels";
import { HotelCard } from "../components/HotelCard";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";

const amenityIcons: Record<string, typeof Wifi> = {
  "Free WiFi": Wifi,
  "Parking": Car,
  "Kitchen": Utensils,
  "Beach access": Waves,
  "Mountain view": Mountain,
  "Gym access": Dumbbell,
};

interface GuestCount {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export default function HotelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = hotels.find((h) => h.id === Number(id));
  const [currentImg, setCurrentImg] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(Number(id));
  const [checkOut, setCheckOut] = useState("");
  const [guestCount, setGuestCount] = useState<GuestCount>({ adults: 1, children: 0, infants: 0, pets: 0 });
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [detailRoomId, setDetailRoomId] = useState<string | null>(null);
  const [roomQuantities, setRoomQuantities] = useState<Record<string, number>>({});
  const guestRef = useRef<HTMLDivElement>(null);

  const handleQtyChange = (roomId: string, delta: number) => {
    setRoomQuantities(prev => {
      const current = prev[roomId] || 0;
      const nextVal = current + delta;
      if (nextVal < 0) return prev;
      const room = hotel?.roomTypes.find(r => r.id === roomId);
      if (room && nextVal > room.availableRooms) return prev;
      return { ...prev, [roomId]: nextVal };
    });
  };

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <p className="text-2xl">🏨</p>
        <p className="text-lg font-semibold text-foreground">Property not found</p>
        <Link to="/" className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:opacity-90">
          Back to home
        </Link>
      </div>
    );
  }

  const nights = checkIn && checkOut
    ? Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 5;

  const related = hotels.filter((h) => h.id !== hotel.id && h.category === hotel.category).slice(0, 4);

  const hotelImages = hotel.images;
  function prevImg() {
    setCurrentImg((v) => (v === 0 ? hotelImages.length - 1 : v - 1));
  }
  function nextImg() {
    setCurrentImg((v) => (v === hotelImages.length - 1 ? 0 : v + 1));
  }


  const visibleAmenities = showAllAmenities ? hotel.amenities : hotel.amenities.slice(0, 8);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (guestRef.current && !guestRef.current.contains(e.target as Node)) {
        setShowGuestPicker(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const totalGuests = guestCount.adults + guestCount.children;
  const guestLabel = `${totalGuests} guest${totalGuests !== 1 ? 's' : ''}${guestCount.infants > 0 ? `, ${guestCount.infants} infant${guestCount.infants > 1 ? 's' : ''}` : ''}${guestCount.pets > 0 ? `, ${guestCount.pets} pet${guestCount.pets > 1 ? 's' : ''}` : ''}`;

  const adjustGuest = (key: keyof GuestCount, delta: number) => {
    setGuestCount(prev => {
      const min = key === 'adults' ? 1 : 0;
      const next = { ...prev, [key]: Math.max(min, prev[key] + delta) };
      if (key !== 'pets') {
        const guestTotal = next.adults + next.children;
        if (guestTotal > hotel.maxGuests) return prev;
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />

      <div className="max-w-[1280px] mx-auto px-6 py-6">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft size={15} /> All stays
        </button>

        <div className="flex items-start justify-between mb-4 gap-4">
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--foreground)", lineHeight: 1.2 }}>
              {hotel.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
              <span className="flex items-center gap-1">
                <Star size={13} className="fill-foreground stroke-foreground" />
                <span className="font-semibold">{hotel.rating}</span>
                <span className="text-muted-foreground">({hotel.reviews} reviews)</span>
              </span>
              {hotel.isSuperhost && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <ShieldCheck size={13} className="text-primary" />
                  Superhost
                </span>
              )}
              <span className="text-muted-foreground underline cursor-pointer">{hotel.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:bg-muted px-3 py-2 rounded-xl transition-colors">
              <Share2 size={15} /> Share
            </button>
            <button onClick={() => {
              if (!user) {
                navigate('/signup');
              } else {
                toggleFavorite(Number(id));
              }
            }} className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:bg-muted px-3 py-2 rounded-xl transition-colors">
              <Heart size={15} className={liked ? "fill-primary stroke-primary" : ""} /> Save
            </button>
          </div>
        </div>

        {showAllPhotos ? (
          <div className="mb-8">
            <button onClick={() => setShowAllPhotos(false)} className="flex items-center gap-1.5 text-sm font-medium mb-4 hover:underline">
              <ChevronLeft size={15} /> Back
            </button>
            <div className="columns-2 md:columns-3 gap-3 space-y-3">
              {hotel.images.map((img, i) => (
                <img key={i} src={img} alt={`${hotel.name} photo ${i + 1}`} className="w-full rounded-xl object-cover" />
              ))}
            </div>
          </div>
        ) : (
          <div className="relative mb-8 rounded-2xl overflow-hidden bg-muted">
            <div className="md:hidden relative aspect-[4/3]">
              <img src={hotel.images[currentImg]} alt={hotel.name} className="w-full h-full object-cover" />
              <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg"><ChevronLeft size={16} /></button>
              <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg"><ChevronRight size={16} /></button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                {hotel.images.map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white transition-opacity" style={{ opacity: i === currentImg ? 1 : 0.4 }} />
                ))}
              </div>
            </div>

            <div className="hidden md:grid grid-cols-3 gap-2 h-[400px]">
              <div className="col-span-2 row-span-2 overflow-hidden">
                <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" />
              </div>
              <div className="overflow-hidden">
                <img src={hotel.images[1]} alt={`${hotel.name} 2`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" />
              </div>
              <div className="overflow-hidden">
                <img src={hotel.images[2]} alt={`${hotel.name} 3`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" />
              </div>
            </div>

            <button
              onClick={() => setShowAllPhotos(true)}
              className="absolute bottom-4 right-4 bg-white text-foreground text-sm font-semibold px-4 py-2 rounded-xl border border-border shadow-md hover:shadow-lg transition-all"
            >
              Show all photos
            </button>
          </div>
        )}

        <div>
          <div className="flex flex-wrap gap-4 pb-6 border-b border-border mb-6">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <BedDouble size={18} className="text-muted-foreground" />
              <span><strong>{hotel.bedrooms}</strong> bedroom{hotel.bedrooms > 1 ? "s" : ""}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <BedDouble size={18} className="text-muted-foreground" />
              <span><strong>{hotel.beds}</strong> bed{hotel.beds > 1 ? "s" : ""}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Bath size={18} className="text-muted-foreground" />
              <span><strong>{hotel.bathrooms}</strong> bathroom{hotel.bathrooms > 1 ? "s" : ""}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Users size={18} className="text-muted-foreground" />
              <span>Up to <strong>{hotel.maxGuests}</strong> guests</span>
            </div>
          </div>

          <div className="flex items-center gap-4 pb-6 border-b border-border mb-6">
            <img src={hotel.hostAvatar} alt={hotel.hostName} className="w-14 h-14 rounded-full object-cover border border-border" />
            <div>
              <p className="font-semibold text-foreground">Hosted by {hotel.hostName}</p>
              <p className="text-sm text-muted-foreground">Joined {hotel.hostJoined} · {hotel.hostReviews} reviews</p>
            </div>
            {hotel.isSuperhost && (
              <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-primary border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
                <ShieldCheck size={12} /> Superhost
              </span>
            )}
          </div>

          <div className="pb-6 border-b border-border mb-6">
            <p className="text-foreground leading-relaxed text-sm">{hotel.description}</p>
          </div>

          <div className="pb-6 border-b border-border mb-6">
            <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "1.125rem" }}>What this place offers</h2>
            <div className="grid grid-cols-2 gap-3">
              {visibleAmenities.map((a) => {
                const Icon = amenityIcons[a];
                return (
                  <div key={a} className="flex items-center gap-3 text-sm text-foreground py-1">
                    {Icon ? <Icon size={18} className="text-muted-foreground shrink-0" /> : <div className="w-4 h-4 rounded-full bg-muted shrink-0" />}
                    {a}
                  </div>
                );
              })}
            </div>
            {hotel.amenities.length > 8 && (
              <button onClick={() => setShowAllAmenities((v) => !v)} className="mt-4 px-5 py-2.5 border border-foreground rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                {showAllAmenities ? "Show less" : `Show all ${hotel.amenities.length} amenities`}
              </button>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Star size={18} className="fill-foreground stroke-foreground" />
              <span className="font-semibold text-foreground">{hotel.rating} · {hotel.reviews} reviews</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviewSamples.map((r) => (
                <div key={r.id} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{r.author}</p>
                      <p className="text-xs text-muted-foreground">{r.date}</p>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(r.rating)].map((_, i) => <Star key={i} size={11} className="fill-foreground stroke-foreground" />)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pb-6 border-b border-border mb-6">
            <h2 className="font-semibold text-foreground mb-4" style={{ fontSize: "1.125rem" }}>Location</h2>
            <p className="text-sm text-muted-foreground mb-3">{hotel.location}, {hotel.city}, {hotel.country}</p>
            <div className="rounded-xl overflow-hidden border border-border h-[300px]">
              <iframe
                title="Property location"
                src={`https://maps.google.com/maps?q=${hotel.lat},${hotel.lng}&z=14&output=embed`}
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="border border-border rounded-2xl shadow-xl p-6 bg-white mb-10">
            <h2 className="font-semibold text-foreground mb-6" style={{ fontSize: "1.125rem" }}>Choose your room</h2>

            <div className="flex flex-wrap items-end gap-4 mb-8 pb-6 border-b border-border">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-foreground mb-1">Check-in</label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors text-foreground" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-foreground mb-1">Check-out</label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors text-foreground" />
              </div>
              <div ref={guestRef} className="relative">
                <label className="block text-xs font-semibold uppercase tracking-wide text-foreground mb-1">Guests</label>
                <button
                  onClick={() => setShowGuestPicker(v => !v)}
                  className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 text-sm text-foreground hover:border-muted-foreground/50 transition-colors"
                >
                  <span>{guestLabel}</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${showGuestPicker ? 'rotate-180' : ''}`} />
                </button>
                {showGuestPicker && (
                  <div className="absolute left-0 top-full mt-1 bg-white border border-border rounded-xl shadow-xl z-50 p-4 min-w-[280px]">
                    {([
                      { key: 'adults' as keyof GuestCount, label: 'Adults', sub: 'Ages 13 or above' },
                      { key: 'children' as keyof GuestCount, label: 'Children', sub: 'Ages 2–12' },
                      { key: 'infants' as keyof GuestCount, label: 'Infants', sub: 'Under 2' },
                      { key: 'pets' as keyof GuestCount, label: 'Pets', sub: 'Bringing a service animal?' },
                    ]).map(({ key, label, sub }) => (
                      <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{label}</p>
                          <p className="text-xs text-muted-foreground">{sub}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => adjustGuest(key, -1)}
                            disabled={guestCount[key] <= (key === 'adults' ? 1 : 0)}
                            className="w-7 h-7 rounded-full border-2 border-border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary hover:bg-primary/10 transition-all"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="w-5 text-center text-sm font-bold tabular-nums text-foreground">{guestCount[key]}</span>
                          <button
                            onClick={() => adjustGuest(key, 1)}
                            className="w-7 h-7 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {hotel.roomTypes.map((rt) => {
                const qty = roomQuantities[rt.id] || 0;
                const lineTotal = qty * rt.price * nights;
                return (
                  <div key={rt.id} className="flex items-stretch gap-4 p-4 rounded-xl border border-border hover:border-muted-foreground/30 transition-all">
                    <div className="flex gap-3 flex-1 min-w-0">
                      <img src={rt.image} alt={rt.name} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{rt.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{rt.bedType} · {rt.areaSqFt} sq ft</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{rt.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <span className="text-[11px] text-muted-foreground border border-border rounded-full px-2 py-0.5">Up to {rt.maxGuests} guests</span>
                          {rt.availableRooms > 0 ? (
                            <span className="text-[11px] text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">{rt.availableRooms} available</span>
                          ) : (
                            <span className="text-[11px] text-red-600 bg-red-50 border border-red-200 rounded-full px-2 py-0.5">Sold out</span>
                          )}
                        </div>
                        <button
                          onClick={() => setDetailRoomId(rt.id)}
                          className="mt-1.5 text-xs font-medium text-primary underline-offset-2 hover:underline"
                        >
                          View detail
                        </button>
                      </div>
                    </div>
                    <div className="text-right shrink-0 flex flex-col justify-center">
                      <p className="text-sm font-bold text-foreground">${rt.price}</p>
                      <p className="text-xs text-muted-foreground">/ night</p>
                    </div>
                    <div className="shrink-0 flex items-center">
                      <div className="flex items-center gap-2 border border-border rounded-lg px-2.5 py-1.5">
                        <button
                          onClick={() => handleQtyChange(rt.id, -1)}
                          disabled={qty <= 0}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary transition-all"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="w-6 text-center text-sm font-bold tabular-nums text-foreground">{qty}</span>
                        <button
                          onClick={() => handleQtyChange(rt.id, 1)}
                          disabled={qty >= rt.availableRooms}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary transition-all"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right shrink-0 flex flex-col justify-center min-w-[70px]">
                      <p className="text-sm font-bold text-foreground">${lineTotal.toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {Object.values(roomQuantities).some(q => q > 0) && (
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground mb-3">Your selection</h3>
                <div className="space-y-2">
                  {Object.entries(roomQuantities).map(([roomId, qty]) => {
                    if (qty <= 0) return null;
                    const room = hotel.roomTypes.find(r => r.id === roomId);
                    if (!room) return null;
                    const roomTotal = qty * room.price * nights;
                    return (
                      <div key={roomId} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{room.name} × {qty}</span>
                        <span className="text-foreground">${roomTotal.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground mt-4 pt-4 border-t border-border">
                  <span>Total</span>
                  <span>${Object.entries(roomQuantities)
                    .filter(([_, q]) => q > 0)
                    .reduce((sum, [roomId, qty]) => {
                      const room = hotel.roomTypes.find(r => r.id === roomId);
                      return sum + (room ? qty * room.price * nights : 0);
                    }, 0).toLocaleString()}</span>
                </div>
                <button
                  onClick={() => {
                    const selected = Object.entries(roomQuantities).filter(([_, q]) => q > 0);
                    if (selected.length === 0) return;
                    const params = new URLSearchParams();
                    if (checkIn) params.set('checkIn', checkIn);
                    if (checkOut) params.set('checkOut', checkOut);
                    params.set('adults', String(guestCount.adults));
                    params.set('children', String(guestCount.children));
                    params.set('infants', String(guestCount.infants));
                    params.set('pets', String(guestCount.pets));
                    params.set('roomTypeId', selected[0][0]);
                    params.set('rooms', JSON.stringify(Object.fromEntries(selected)));
                    const query = params.toString();
                    if (!user) {
                      navigate('/login?redirect=' + encodeURIComponent('/reserve/' + id + '?' + query));
                    } else {
                      navigate('/reserve/' + id + '?' + query);
                    }
                  }}
                  disabled={Object.values(roomQuantities).every(q => q === 0)}
                  className="w-full mt-4 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:opacity-90 transition-all hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Reserve
                </button>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <h2 className="font-semibold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>
              More places like this
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((h) => <HotelCard key={h.id} {...h} />)}
            </div>
          </section>
        )}
      </div>

      {detailRoomId && (() => {
        const room = hotel.roomTypes.find(rt => rt.id === detailRoomId);
        if (!room) return null;
        return (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDetailRoomId(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <img src={room.image} alt={room.name} className="w-full h-56 object-cover rounded-t-2xl" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{room.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{room.description}</p>
                  </div>
                  <button
                    onClick={() => setDetailRoomId(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors shrink-0 ml-4"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Bed type</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">{room.bedType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Area</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">{room.areaSqFt} sq ft</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Max guests</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">{room.maxGuests}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Available</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">{room.availableRooms} of {room.totalRooms} room{room.totalRooms > 1 ? 's' : ''}</p>
                  </div>
                </div>
                {room.roomNumbers.length > 0 && (
                  <div className="py-4 border-t border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">Room numbers</p>
                    <div className="flex flex-wrap gap-2">
                      {room.roomNumbers.map(rn => (
                        <span key={rn} className="px-3 py-1 bg-accent rounded-lg text-xs font-medium text-foreground">{rn}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">${room.price}</p>
                    <p className="text-xs text-muted-foreground">per night</p>
                  </div>
                  <button
                    onClick={() => setDetailRoomId(null)}
                    className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      <Footer />
    </div>
  );
}
