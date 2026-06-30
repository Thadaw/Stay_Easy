export interface User {
  id?: number
  first_name: string
  last_name: string
  full_name?: string
  email: string
  firstName?: string
  lastName?: string
  name?: string
  role?: string
  avatar?: string
  countryFlag?: string
  country?: string
  phone?: string
  joinedDate?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
}

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface SearchFormData {
  destination: string
  checkIn: string
  checkOut: string
  guests: number
}

export interface Destination {
  id: number
  name: string
  country: string
  image: string
  reviews: number
}

export interface Testimonial {
  id: number
  name: string
  location: string
  avatar: string
  rating: number
  quote: string
}

export type OperatorRole = 'front_desk' | 'housekeeping' | 'kds' | 'pos' | 'manager'
export interface Operator {
  id: number
  name: string
  email: string
  role: OperatorRole
  property_id: number
  property_name?: string
  avatar?: string
}

export type RoomStatus = 'available' | 'occupied' | 'dirty' | 'cleaning' | 'inspected' | 'maintenance' | 'blocked'

export interface Room {
  id: string
  room_number: string
  room_type: string
  floor: number
  status: RoomStatus
  smoking: boolean
  accessible: boolean
  guest_name?: string
  booking_ref?: string
  checkin_date?: string
  checkout_date?: string
}

export interface Booking {
  ref: string
  guest_name: string
  phone: string
  email: string
  room_type: string
  room_number?: string
  checkin: string
  checkout: string
  adults: number
  children: number
  status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
  total: number
  balance: number
  special_requests?: string
}

export interface FolioCharge {
  id: string
  description: string
  amount: number
  category: 'room' | 'minibar' | 'laundry' | 'restaurant' | 'service' | 'other'
  posted_at: string
  posted_by: string
}

export interface Folio {
  booking_ref: string
  guest_name: string
  room_number: string
  charges: FolioCharge[]
  subtotal: number
  tax: number
  discount: number
  total: number
  settled: boolean
}

export interface HousekeepingTask {
  id: string
  room_number: string
  room_type: string
  floor: number
  status: 'pending' | 'cleaning' | 'inspected'
  priority: 'low' | 'medium' | 'high'
  assigned_to?: string
  notes?: string
  updated_at: string
}

export interface TableSection {
  id: string
  name: string
  floor: number
}

export interface TableItem {
  id: string
  number: number
  capacity: number
  shape: 'round' | 'square' | 'rectangle'
  status: 'available' | 'occupied' | 'reserved' | 'cleaning'
  section_id: string
  waiter_name?: string
  guest_count?: number
  elapsed_minutes?: number
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  is_veg: boolean
  is_available: boolean
  prep_time: number
  tags: string[]
  modifiers?: MenuModifier[]
}

export interface MenuModifier {
  id: string
  name: string
  options: { label: string; price: number }[]
}

export interface OrderItem {
  id: string
  menu_item_id: string
  name: string
  quantity: number
  unit_price: number
  modifiers: string
  item_status: 'pending' | 'in_progress' | 'ready' | 'served' | 'cancelled'
}

export interface Order {
  id: string
  table_id: string
  table_number: number
  waiter_id: string
  waiter_name: string
  items: OrderItem[]
  status: 'open' | 'submitted' | 'in_progress' | 'ready' | 'served' | 'billed' | 'paid' | 'voided'
  subtotal: number
  tax: number
  total: number
  created_at: string
  paid_at?: string
}

export interface KdsTicket {
  id: string
  order_id: string
  table_number: number
  items: OrderItem[]
  elapsed_seconds: number
  status: 'pending' | 'in_progress' | 'ready'
}
