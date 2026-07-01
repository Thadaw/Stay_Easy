export interface RoomType {
  id: string;
  name: string;
  price: number;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  description: string;
  totalRooms: number;
  availableRooms: number;
  roomNumbers: string[];
  bedType: string;
  areaSqFt: number;
  image: string;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  price: number;
  imageUrl: string;
  images: string[];
  tag?: string;
  isSuperhost?: boolean;
  category: string;
  description: string;
  amenities: string[];
  hostName: string;
  hostAvatar: string;
  hostJoined: string;
  hostReviews: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  maxGuests: number;
  roomTypes: RoomType[];
}

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Serenity Beachfront Villa",
    location: "Maldives, South Malé Atoll",
    city: "South Malé Atoll",
    country: "Maldives",
    lat: 3.8,
    lng: 73.5,
    rating: 4.97,
    reviews: 312,
    price: 420,
    imageUrl: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=600&h=450&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1596178067639-5c6e68aea6dc?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1605538108568-7f0d77a214c1?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1578898886225-c7c894047899?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1543489822-c49534f3271f?w=1200&h=800&fit=crop&auto=format",
    ],
    tag: "Guest favourite",
    isSuperhost: true,
    category: "beachfront",
    description: "Wake up to the sound of gentle waves in this stunning overwater villa perched above the crystal-clear lagoon. This exclusive retreat blends natural Maldivian craftsmanship with modern luxury — think handwoven rattan ceilings, a private infinity pool, and a direct-access ladder into the Indian Ocean. Ideal for couples seeking seclusion and unforgettable sunsets.",
    amenities: ["Private pool", "Ocean view", "Free WiFi", "Air conditioning", "Kitchen", "Spa bath", "Beach access", "Snorkelling gear", "Kayaks", "Room service", "Parking", "Breakfast included"],
    hostName: "Aisha Rasheed",
    hostAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
    hostJoined: "March 2018",
    hostReviews: 289,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    maxGuests: 4,
    roomTypes: [
      { id: "std", name: "Standard Villa", price: 420, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1, description: "Overwater villa with lagoon views", totalRooms: 5, availableRooms: 3, roomNumbers: ["101", "102", "103"], bedType: "King", areaSqFt: 480, image: "https://images.unsplash.com/photo-1605538108568-7f0d77a214c1?w=600&h=450&fit=crop&auto=format" },
      { id: "dlx", name: "Deluxe Villa", price: 620, maxGuests: 4, bedrooms: 2, beds: 2, bathrooms: 2, description: "Premium overwater villa with private pool", totalRooms: 3, availableRooms: 2, roomNumbers: ["201", "202"], bedType: "King + Twin", areaSqFt: 720, image: "https://images.unsplash.com/photo-1578898886225-c7c894047899?w=600&h=450&fit=crop&auto=format" },
      { id: "prem", name: "Premier Suite", price: 890, maxGuests: 4, bedrooms: 2, beds: 2, bathrooms: 2, description: "Top-floor suite with panoramic ocean views", totalRooms: 2, availableRooms: 0, roomNumbers: [], bedType: "Emperor", areaSqFt: 1100, image: "https://images.unsplash.com/photo-1543489822-c49534f3271f?w=600&h=450&fit=crop&auto=format" },
    ],
  },
  {
    id: 2,
    name: "The Grand Alpine Chalet",
    location: "Zermatt, Switzerland",
    city: "Zermatt",
    country: "Switzerland",
    lat: 46.02,
    lng: 7.75,
    rating: 4.89,
    reviews: 204,
    price: 580,
    imageUrl: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&h=450&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1590675560125-0d832b9d719e?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1578898886225-c7c894047899?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1731336478850-6bce7235e320?w=1200&h=800&fit=crop&auto=format",
    ],
    isSuperhost: true,
    category: "skiing",
    description: "Nestled at the foot of the iconic Matterhorn, this traditional Swiss chalet offers panoramic mountain views, a wood-panelled interior with a roaring fireplace, and direct ski-in/ski-out access. After a day on the slopes, unwind in the outdoor hot tub with the Alps stretching endlessly before you.",
    amenities: ["Ski-in/ski-out", "Hot tub", "Fireplace", "Mountain view", "Free WiFi", "Kitchen", "Heated floors", "Sauna", "Ski storage", "Parking", "Air conditioning", "Pet friendly"],
    hostName: "Hans Müller",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    hostJoined: "January 2016",
    hostReviews: 198,
    bedrooms: 4,
    beds: 6,
    bathrooms: 3,
    maxGuests: 8,
    roomTypes: [
      { id: "std", name: "Standard Chalet", price: 580, maxGuests: 4, bedrooms: 2, beds: 3, bathrooms: 2, description: "Cosy mountain-view room", totalRooms: 8, availableRooms: 5, roomNumbers: ["101", "102", "103", "104", "105"], bedType: "Queen + Single", areaSqFt: 550, image: "https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=600&h=450&fit=crop&auto=format" },
      { id: "dlx", name: "Deluxe Chalet", price: 780, maxGuests: 6, bedrooms: 3, beds: 4, bathrooms: 2, description: "Spacious suite with hot tub access", totalRooms: 4, availableRooms: 2, roomNumbers: ["201", "202"], bedType: "King + 2 Single", areaSqFt: 850, image: "https://images.unsplash.com/photo-1578898886225-c7c894047899?w=600&h=450&fit=crop&auto=format" },
      { id: "prem", name: "Grand Suite", price: 1200, maxGuests: 8, bedrooms: 4, beds: 6, bathrooms: 3, description: "Entire top floor with private sauna", totalRooms: 2, availableRooms: 1, roomNumbers: ["301"], bedType: "Emperor + Queen", areaSqFt: 1500, image: "https://images.unsplash.com/photo-1731336478850-6bce7235e320?w=600&h=450&fit=crop&auto=format" },
    ],
  },
  {
    id: 3,
    name: "Santorini Cliffside Suite",
    location: "Oia, Santorini, Greece",
    city: "Oia",
    country: "Greece",
    lat: 36.46,
    lng: 25.38,
    rating: 4.95,
    reviews: 178,
    price: 340,
    imageUrl: "https://images.unsplash.com/photo-1578898886225-c7c894047899?w=600&h=450&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1578898886225-c7c894047899?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1605538108568-7f0d77a214c1?w=1200&h=800&fit=crop&auto=format",
    ],
    tag: "Rare find",
    category: "luxury",
    description: "Carved into the volcanic cliffs of Oia, this iconic blue-domed suite delivers Santorini's most celebrated views — the caldera, the Aegean Sea, and sunsets that seem painted by hand. White-washed walls, vaulted ceilings, and hand-picked Cycladic antiques create an intimate, timeless atmosphere. A private terrace with a plunge pool completes the picture.",
    amenities: ["Caldera view", "Plunge pool", "Free WiFi", "Air conditioning", "Terrace", "Espresso machine", "Concierge", "Breakfast included", "Wine cellar", "Daily housekeeping", "Airport transfer", "Turndown service"],
    hostName: "Elena Papadopoulos",
    hostAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
    hostJoined: "June 2019",
    hostReviews: 162,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    roomTypes: [
      { id: "std", name: "Cliffside Room", price: 340, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1, description: "Cozy room with caldera view", totalRooms: 6, availableRooms: 4, roomNumbers: ["C1", "C2", "C3", "C4"], bedType: "Queen", areaSqFt: 320, image: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&h=450&fit=crop&auto=format" },
      { id: "dlx", name: "Suite with Plunge Pool", price: 520, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1, description: "Spacious suite with private plunge pool", totalRooms: 3, availableRooms: 1, roomNumbers: ["P1"], bedType: "King", areaSqFt: 480, image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&h=450&fit=crop&auto=format" },
      { id: "prem", name: "Honeymoon Penthouse", price: 750, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1, description: "Penthouse with panoramic terrace", totalRooms: 1, availableRooms: 1, roomNumbers: ["H1"], bedType: "Emperor", areaSqFt: 650, image: "https://images.unsplash.com/photo-1605538108568-7f0d77a214c1?w=600&h=450&fit=crop&auto=format" },
    ],
  },
  {
    id: 4,
    name: "Bali Jungle Pool Villa",
    location: "Ubud, Bali, Indonesia",
    city: "Ubud",
    country: "Indonesia",
    lat: -8.52,
    lng: 115.27,
    rating: 4.93,
    reviews: 451,
    price: 195,
    imageUrl: "https://images.unsplash.com/photo-1596178067639-5c6e68aea6dc?w=600&h=450&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1596178067639-5c6e68aea6dc?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1543489822-c49534f3271f?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1578898886225-c7c894047899?w=1200&h=800&fit=crop&auto=format",
    ],
    isSuperhost: true,
    category: "villa",
    description: "Hidden within Ubud's lush rice-paddy terraces, this open-air villa channels traditional Balinese architecture — teak pavilions, hand-carved stone altars, and alang-alang thatch roofs. The 12-metre infinity pool seemingly merges with the jungle canopy below. A private chef, resident butler, and daily Balinese offerings make every moment feel ceremonial.",
    amenities: ["Infinity pool", "Jungle view", "Private chef", "Free WiFi", "Air conditioning", "Butler service", "Rice paddy view", "Yoga deck", "Outdoor shower", "Bicycle rental", "Spa treatments", "Airport transfer"],
    hostName: "Wayan Suartha",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
    hostJoined: "April 2017",
    hostReviews: 430,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    maxGuests: 6,
    roomTypes: [
      { id: "std", name: "Jungle Room", price: 195, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1, description: "Garden-view room with outdoor shower", totalRooms: 5, availableRooms: 3, roomNumbers: ["101", "102", "105"], bedType: "Queen", areaSqFt: 380, image: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&h=450&fit=crop&auto=format" },
      { id: "dlx", name: "Pool Villa", price: 350, maxGuests: 4, bedrooms: 2, beds: 2, bathrooms: 2, description: "Villa with private infinity pool", totalRooms: 3, availableRooms: 2, roomNumbers: ["201", "203"], bedType: "King + Single", areaSqFt: 680, image: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=600&h=450&fit=crop&auto=format" },
      { id: "prem", name: "Royal Villa", price: 550, maxGuests: 6, bedrooms: 3, beds: 4, bathrooms: 3, description: "Master villa with butler service", totalRooms: 2, availableRooms: 1, roomNumbers: ["301"], bedType: "Emperor + Queen", areaSqFt: 1050, image: "https://images.unsplash.com/photo-1578898886225-c7c894047899?w=600&h=450&fit=crop&auto=format" },
    ],
  },
  {
    id: 5,
    name: "Tokyo Tower-View Penthouse",
    location: "Minato, Tokyo, Japan",
    city: "Tokyo",
    country: "Japan",
    lat: 35.66,
    lng: 139.75,
    rating: 4.88,
    reviews: 267,
    price: 475,
    imageUrl: "https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=600&h=450&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1590675560125-0d832b9d719e?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1731336478850-6bce7235e320?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1578898886225-c7c894047899?w=1200&h=800&fit=crop&auto=format",
    ],
    category: "city",
    description: "On the 38th floor of a glass tower in Minato, this minimalist penthouse frames Tokyo Tower in every window. Polished concrete, bespoke Japanese joinery, and a 180° city panorama define this space. Walk to Roppongi's galleries and restaurants, or spend an evening watching the city lights from the wraparound terrace.",
    amenities: ["City view", "Tokyo Tower view", "Free WiFi", "Air conditioning", "Full kitchen", "Rooftop terrace", "Concierge", "Gym access", "Smart home", "Washer/dryer", "Workspace", "EV parking"],
    hostName: "Yuki Tanaka",
    hostAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format",
    hostJoined: "September 2020",
    hostReviews: 241,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    maxGuests: 4,
    roomTypes: [
      { id: "std", name: "City Room", price: 475, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1, description: "Elegant room with Tokyo Tower view", totalRooms: 6, availableRooms: 4, roomNumbers: ["38A", "38B", "38C", "38D"], bedType: "Queen", areaSqFt: 420, image: "https://images.unsplash.com/photo-1590675560125-0d832b9d719e?w=600&h=450&fit=crop&auto=format" },
      { id: "dlx", name: "Penthouse Suite", price: 720, maxGuests: 4, bedrooms: 2, beds: 2, bathrooms: 2, description: "Corner suite with wraparound views", totalRooms: 2, availableRooms: 1, roomNumbers: ["39A"], bedType: "King", areaSqFt: 720, image: "https://images.unsplash.com/photo-1731336478850-6bce7235e320?w=600&h=450&fit=crop&auto=format" },
    ],
  },
  {
    id: 6,
    name: "Amalfi Coastal Retreat",
    location: "Positano, Italy",
    city: "Positano",
    country: "Italy",
    lat: 40.63,
    lng: 14.49,
    rating: 4.91,
    reviews: 389,
    price: 290,
    imageUrl: "https://images.unsplash.com/photo-1543489822-c49534f3271f?w=600&h=450&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1543489822-c49534f3271f?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1596178067639-5c6e68aea6dc?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1605538108568-7f0d77a214c1?w=1200&h=800&fit=crop&auto=format",
    ],
    tag: "Guest favourite",
    category: "beachfront",
    description: "Terraced into the ochre-and-white cliffs of Positano, this sun-drenched retreat offers an al-fresco dining terrace, a saltwater pool, and direct steps down to a private beach cove. Hand-painted majolica tiles, lemon groves, and the scent of bougainvillea set the unmistakable Amalfi mood.",
    amenities: ["Private beach", "Sea view", "Saltwater pool", "Free WiFi", "Air conditioning", "Lemon grove", "Outdoor dining", "Vespa rental", "Boat tours", "Breakfast included", "Daily cleaning", "Wine cellar"],
    hostName: "Marco Esposito",
    hostAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
    hostJoined: "May 2015",
    hostReviews: 367,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    maxGuests: 6,
    roomTypes: [
      { id: "std", name: "Sea-View Room", price: 290, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1, description: "Bright room with sea views", totalRooms: 5, availableRooms: 3, roomNumbers: ["101", "102", "104"], bedType: "Queen", areaSqFt: 350, image: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&h=450&fit=crop&auto=format" },
      { id: "dlx", name: "Terrace Suite", price: 450, maxGuests: 4, bedrooms: 2, beds: 2, bathrooms: 1, description: "Suite with private al-fresco terrace", totalRooms: 3, availableRooms: 2, roomNumbers: ["201", "202"], bedType: "King", areaSqFt: 520, image: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=600&h=450&fit=crop&auto=format" },
      { id: "prem", name: "Amalfi Penthouse", price: 680, maxGuests: 6, bedrooms: 3, beds: 4, bathrooms: 2, description: "Penthouse with panoramic coastline views", totalRooms: 2, availableRooms: 0, roomNumbers: [], bedType: "Emperor", areaSqFt: 900, image: "https://images.unsplash.com/photo-1605538108568-7f0d77a214c1?w=600&h=450&fit=crop&auto=format" },
    ],
  },
  {
    id: 7,
    name: "Tuscany Countryside Estate",
    location: "Siena, Tuscany, Italy",
    city: "Siena",
    country: "Italy",
    lat: 43.32,
    lng: 11.33,
    rating: 4.96,
    reviews: 143,
    price: 350,
    imageUrl: "https://images.unsplash.com/photo-1590675560125-0d832b9d719e?w=600&h=450&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1590675560125-0d832b9d719e?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1543489822-c49534f3271f?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=1200&h=800&fit=crop&auto=format",
    ],
    isSuperhost: true,
    category: "countryside",
    description: "A restored 16th-century farmhouse surrounded by 20 acres of olive groves and vineyards between Siena and San Gimignano. Stone-vaulted ceilings, original terracotta floors, and a frescoed dining hall recall Tuscany's Renaissance grandeur. The heated outdoor pool, truffle-hunting excursions, and private wine cellar ensure a stay beyond the ordinary.",
    amenities: ["Vineyard view", "Heated pool", "Free WiFi", "Air conditioning", "Full kitchen", "Wine cellar", "Truffle hunting", "Olive grove", "BBQ", "Parking", "Fireplace", "Pet friendly"],
    hostName: "Giulia Bianchi",
    hostAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
    hostJoined: "February 2014",
    hostReviews: 139,
    bedrooms: 5,
    beds: 7,
    bathrooms: 4,
    maxGuests: 10,
    roomTypes: [
      { id: "std", name: "Countryside Room", price: 350, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1, description: "Charming room with vineyard views", totalRooms: 4, availableRooms: 3, roomNumbers: ["C1", "C2", "C4"], bedType: "Queen", areaSqFt: 400, image: "https://images.unsplash.com/photo-1543489822-c49534f3271f?w=600&h=450&fit=crop&auto=format" },
      { id: "dlx", name: "Estate Suite", price: 550, maxGuests: 6, bedrooms: 3, beds: 4, bathrooms: 2, description: "Suite with olive grove access", totalRooms: 3, availableRooms: 2, roomNumbers: ["E1", "E2"], bedType: "King", areaSqFt: 680, image: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&h=450&fit=crop&auto=format" },
      { id: "prem", name: "Villa Magnifica", price: 900, maxGuests: 10, bedrooms: 5, beds: 7, bathrooms: 4, description: "Entire farmhouse with private pool", totalRooms: 1, availableRooms: 1, roomNumbers: ["V1"], bedType: "Emperor", areaSqFt: 1800, image: "https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=600&h=450&fit=crop&auto=format" },
    ],
  },
  {
    id: 8,
    name: "Parisian Haussmann Apartment",
    location: "7th Arrondissement, Paris",
    city: "Paris",
    country: "France",
    lat: 48.86,
    lng: 2.32,
    rating: 4.85,
    reviews: 521,
    price: 220,
    imageUrl: "https://images.unsplash.com/photo-1731336478850-6bce7235e320?w=600&h=450&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1731336478850-6bce7235e320?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1578898886225-c7c894047899?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1590675560125-0d832b9d719e?w=1200&h=800&fit=crop&auto=format",
    ],
    category: "city",
    description: "On the third floor of a classic Haussmann building in the 7th arrondissement, this elegantly proportioned apartment features parquet herringbone floors, ornate plasterwork cornices, and tall French windows with Juliet balconies overlooking a tree-lined boulevard. The Eiffel Tower is a 12-minute walk; Musée d'Orsay is just around the corner.",
    amenities: ["City view", "Eiffel Tower nearby", "Free WiFi", "Air conditioning", "Full kitchen", "Washer/dryer", "Workspace", "Espresso machine", "Elevator", "Secure entry", "Metro nearby", "Daily baguette delivery"],
    hostName: "Claire Dubois",
    hostAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
    hostJoined: "October 2013",
    hostReviews: 498,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    maxGuests: 4,
    roomTypes: [
      { id: "std", name: "Classic Room", price: 220, maxGuests: 2, bedrooms: 1, beds: 1, bathrooms: 1, description: "Elegant Parisian room with city views", totalRooms: 4, availableRooms: 2, roomNumbers: ["3A", "3B"], bedType: "Queen", areaSqFt: 320, image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&h=450&fit=crop&auto=format" },
      { id: "dlx", name: "Family Suite", price: 380, maxGuests: 4, bedrooms: 2, beds: 3, bathrooms: 1, description: "Spacious suite with separate living area", totalRooms: 2, availableRooms: 1, roomNumbers: ["5A"], bedType: "King", areaSqFt: 580, image: "https://images.unsplash.com/photo-1578898886225-c7c894047899?w=600&h=450&fit=crop&auto=format" },
    ],
  },
];

export const reviewSamples = [
  { id: 1, author: "James R.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&auto=format", date: "May 2026", rating: 5, text: "Absolutely incredible stay. The views were even better than the photos. Our host was responsive and welcoming from day one. Would return every year if I could." },
  { id: 2, author: "Priya M.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&auto=format", date: "April 2026", rating: 5, text: "One of the best travel experiences of my life. The property is immaculate, the amenities are top-tier, and the location is unbeatable. Already recommended to all my friends." },
  { id: 3, author: "Thomas H.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&auto=format", date: "March 2026", rating: 4, text: "Beautiful place with great character. Check-in was smooth and the host gave us great local tips. Only minor note: the WiFi dipped occasionally, but everything else was excellent." },
  { id: 4, author: "Yuki S.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=48&h=48&fit=crop&auto=format", date: "February 2026", rating: 5, text: "Magical. We stayed for our anniversary and every detail was perfect — from the welcome champagne to the sunset views. We didn't want to leave." },
];
