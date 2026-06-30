import type {
  Room, Booking, FolioCharge, HousekeepingTask, TableSection,
  TableItem, MenuItem, Order, KdsTicket,
} from '../../../types'

export const mockOperator = {
  id: 1,
  name: 'Ramesh Adhikari',
  email: 'frontdesk@stayeasy.io',
  role: 'manager' as const,
  property_id: 1,
  property_name: 'Hotel Himalaya',
}

export const mockRooms: Room[] = [
  { id: 'R-101', room_number: '101', room_type: 'Deluxe King', floor: 1, status: 'occupied', smoking: false, accessible: false, guest_name: 'Sita Sharma', booking_ref: 'BK-001', checkout_date: '2026-07-02' },
  { id: 'R-102', room_number: '102', room_type: 'Deluxe King', floor: 1, status: 'available', smoking: false, accessible: false },
  { id: 'R-103', room_number: '103', room_type: 'Standard Twin', floor: 1, status: 'dirty', smoking: false, accessible: false },
  { id: 'R-104', room_number: '104', room_type: 'Standard Twin', floor: 1, status: 'cleaning', smoking: false, accessible: false },
  { id: 'R-105', room_number: '105', room_type: 'Deluxe King', floor: 1, status: 'maintenance', smoking: false, accessible: false },
  { id: 'R-106', room_number: '106', room_type: 'Suite', floor: 1, status: 'available', smoking: false, accessible: true },
  { id: 'R-107', room_number: '107', room_type: 'Standard Twin', floor: 1, status: 'blocked', smoking: false, accessible: false },
  { id: 'R-108', room_number: '108', room_type: 'Deluxe King', floor: 1, status: 'inspected', smoking: false, accessible: false },
  { id: 'R-201', room_number: '201', room_type: 'Suite', floor: 2, status: 'occupied', smoking: false, accessible: false, guest_name: 'Binod Thapa', booking_ref: 'BK-002', checkout_date: '2026-06-30' },
  { id: 'R-202', room_number: '202', room_type: 'Deluxe King', floor: 2, status: 'occupied', smoking: false, accessible: false, guest_name: 'Prakash Neupane', booking_ref: 'BK-003', checkout_date: '2026-07-05' },
  { id: 'R-203', room_number: '203', room_type: 'Standard Twin', floor: 2, status: 'available', smoking: false, accessible: false },
  { id: 'R-204', room_number: '204', room_type: 'Deluxe King', floor: 2, status: 'dirty', smoking: false, accessible: false },
  { id: 'R-205', room_number: '205', room_type: 'Suite', floor: 2, status: 'available', smoking: false, accessible: true },
  { id: 'R-301', room_number: '301', room_type: 'Penthouse Suite', floor: 3, status: 'occupied', smoking: false, accessible: false, guest_name: 'Deepa Tamang', booking_ref: 'BK-004', checkout_date: '2026-07-01' },
  { id: 'R-302', room_number: '302', room_type: 'Penthouse Suite', floor: 3, status: 'available', smoking: false, accessible: false },
]

export const mockBookings: Booking[] = [
  { ref: 'BK-001', guest_name: 'Sita Sharma', phone: '9841234567', email: 'sita@email.com', room_type: 'Deluxe King', room_number: '101', checkin: '2026-06-28', checkout: '2026-07-02', adults: 2, children: 1, status: 'checked_in', total: 32000, balance: 0 },
  { ref: 'BK-002', guest_name: 'Binod Thapa', phone: '9859876543', email: 'binod@email.com', room_type: 'Suite', room_number: '201', checkin: '2026-06-25', checkout: '2026-06-30', adults: 2, children: 0, status: 'checked_in', total: 45000, balance: 8500 },
  { ref: 'BK-003', guest_name: 'Prakash Neupane', phone: '9865551212', email: 'prakash@email.com', room_type: 'Deluxe King', room_number: '202', checkin: '2026-06-29', checkout: '2026-07-05', adults: 1, children: 0, status: 'checked_in', total: 24000, balance: 0 },
  { ref: 'BK-004', guest_name: 'Deepa Tamang', phone: '9812345678', email: 'deepa@email.com', room_type: 'Penthouse Suite', room_number: '301', checkin: '2026-06-27', checkout: '2026-07-01', adults: 2, children: 2, status: 'checked_in', total: 75000, balance: 15000 },
  { ref: 'BK-005', guest_name: 'Rajendra Poudel', phone: '9801112233', email: 'rajendra@email.com', room_type: 'Deluxe King', checkin: '2026-06-30', checkout: '2026-07-03', adults: 2, children: 0, status: 'confirmed', total: 18000, balance: 18000 },
  { ref: 'BK-006', guest_name: 'Anita Gurung', phone: '9844445566', email: 'anita@email.com', room_type: 'Standard Twin', checkin: '2026-06-30', checkout: '2026-07-02', adults: 2, children: 1, status: 'confirmed', total: 12000, balance: 12000 },
  { ref: 'BK-007', guest_name: 'Kamala Devi', phone: '9857778899', email: 'kamala@email.com', room_type: 'Suite', checkin: '2026-07-01', checkout: '2026-07-04', adults: 2, children: 0, status: 'confirmed', total: 36000, balance: 36000 },
]

export const mockFolioCharges: FolioCharge[] = [
  { id: 'FC-001', description: 'Minibar - Coke', amount: 250, category: 'minibar', posted_at: '2026-06-29 18:30', posted_by: 'Ramesh' },
  { id: 'FC-002', description: 'Laundry - 3 shirts', amount: 600, category: 'laundry', posted_at: '2026-06-29 10:15', posted_by: 'Sita' },
  { id: 'FC-003', description: 'Room Service - Dinner', amount: 1800, category: 'restaurant', posted_at: '2026-06-28 20:45', posted_by: 'Ramesh' },
  { id: 'FC-004', description: 'Minibar - Beer', amount: 400, category: 'minibar', posted_at: '2026-06-30 14:00', posted_by: 'Ramesh' },
]

export const mockTasks: HousekeepingTask[] = [
  { id: 'T-001', room_number: '103', room_type: 'Standard Twin', floor: 1, status: 'pending', priority: 'high', notes: 'Guest checked out late, needs quick turnaround', updated_at: '2026-06-30 11:00' },
  { id: 'T-002', room_number: '204', room_type: 'Deluxe King', floor: 2, status: 'pending', priority: 'medium', updated_at: '2026-06-30 11:30' },
  { id: 'T-003', room_number: '104', room_type: 'Standard Twin', floor: 1, status: 'cleaning', priority: 'medium', assigned_to: 'Maya', updated_at: '2026-06-30 11:45' },
]

export const mockSections: TableSection[] = [
  { id: 'S-001', name: 'Main Dining', floor: 1 },
  { id: 'S-002', name: 'Rooftop', floor: 3 },
  { id: 'S-003', name: 'Bar', floor: 1 },
]

export const mockTables: TableItem[] = [
  { id: 'TBL-01', number: 1, capacity: 4, shape: 'square', status: 'occupied', section_id: 'S-001', waiter_name: 'Raj', guest_count: 3, elapsed_minutes: 45 },
  { id: 'TBL-02', number: 2, capacity: 4, shape: 'square', status: 'available', section_id: 'S-001' },
  { id: 'TBL-03', number: 3, capacity: 6, shape: 'rectangle', status: 'occupied', section_id: 'S-001', waiter_name: 'Raj', guest_count: 5, elapsed_minutes: 72 },
  { id: 'TBL-04', number: 4, capacity: 2, shape: 'round', status: 'available', section_id: 'S-001' },
  { id: 'TBL-05', number: 5, capacity: 4, shape: 'square', status: 'reserved', section_id: 'S-001' },
  { id: 'TBL-06', number: 6, capacity: 8, shape: 'rectangle', status: 'available', section_id: 'S-001' },
  { id: 'TBL-07', number: 7, capacity: 2, shape: 'round', status: 'cleaning', section_id: 'S-001' },
  { id: 'TBL-08', number: 8, capacity: 4, shape: 'square', status: 'occupied', section_id: 'S-001', waiter_name: 'Priya', guest_count: 2, elapsed_minutes: 30 },
  { id: 'TBL-R1', number: 1, capacity: 4, shape: 'square', status: 'available', section_id: 'S-002' },
  { id: 'TBL-R2', number: 2, capacity: 6, shape: 'rectangle', status: 'available', section_id: 'S-002' },
  { id: 'TBL-B1', number: 1, capacity: 2, shape: 'round', status: 'available', section_id: 'S-003' },
]

export const mockMenuItems: MenuItem[] = [
  { id: 'MI-001', name: 'Chicken Mo Mo', description: 'Steamed chicken dumplings with achar', price: 350, category: 'Starters', is_veg: false, is_available: true, prep_time: 15, tags: ['Popular', 'Nepali'], modifiers: [{ id: 'MOD-001', name: 'Preparation', options: [{ label: 'Steamed', price: 0 }, { label: 'Fried', price: 50 }, { label: 'Jhol', price: 30 }] }] },
  { id: 'MI-002', name: 'Vegetable Spring Roll', description: 'Crispy spring rolls with sweet chili dip', price: 280, category: 'Starters', is_veg: true, is_available: true, prep_time: 10, tags: ['Veg'] },
  { id: 'MI-003', name: 'Sekuwa (Mixed)', description: 'Grilled mixed meat sekowa', price: 450, category: 'Starters', is_veg: false, is_available: true, prep_time: 20, tags: ['Nepali', 'Popular'] },
  { id: 'MI-004', name: 'Dal Bhat Power Lunch', description: 'Rice, dal, tarkari, achar, and papad', price: 400, category: 'Mains', is_veg: true, is_available: true, prep_time: 15, tags: ['Nepali', 'Lunch'] },
  { id: 'MI-005', name: 'Chicken Chowmein', description: 'Wok-tossed noodles with vegetables and chicken', price: 320, category: 'Mains', is_veg: false, is_available: true, prep_time: 12, tags: ['Popular'] },
  { id: 'MI-006', name: 'Newari Khaja Set', description: 'Newari platter with baji, chhwela, and wo', price: 550, category: 'Mains', is_veg: false, is_available: true, prep_time: 20, tags: ['Nepali', 'Specialty'] },
  { id: 'MI-007', name: 'Butter Chicken with Naan', description: 'Creamy butter chicken with butter naan', price: 600, category: 'Mains', is_veg: false, is_available: true, prep_time: 25, tags: ['Popular', 'Indian'] },
  { id: 'MI-008', name: 'Gajar Ko Halwa', description: 'Warm carrot pudding with nuts', price: 250, category: 'Desserts', is_veg: true, is_available: true, prep_time: 10, tags: ['Dessert'] },
  { id: 'MI-009', name: 'Ice Cream Trio', description: 'Three scoops: vanilla, chocolate, strawberry', price: 200, category: 'Desserts', is_veg: true, is_available: true, prep_time: 3, tags: ['Dessert'] },
  { id: 'MI-010', name: 'Masala Chiya', description: 'Traditional Nepali spiced tea', price: 80, category: 'Drinks', is_veg: true, is_available: true, prep_time: 5, tags: ['Nepali', 'Hot'] },
  { id: 'MI-011', name: 'Black Coffee', description: 'Freshly brewed black coffee', price: 150, category: 'Drinks', is_veg: true, is_available: true, prep_time: 3, tags: ['Hot'] },
  { id: 'MI-012', name: 'Fresh Lime Soda', description: 'Fresh lime with soda (sweet/salt)', price: 120, category: 'Drinks', is_veg: true, is_available: true, prep_time: 3, tags: ['Cold'] },
  { id: 'MI-013', name: 'Mango Lassi', description: 'Thick yogurt mango shake', price: 180, category: 'Drinks', is_veg: true, is_available: true, prep_time: 5, tags: ['Popular'] },
  { id: 'MI-014', name: 'Chicken Sekuwa Sizzler', description: 'Sizzling chicken sekowa with fries and salad', price: 650, category: 'Mains', is_veg: false, is_available: false, prep_time: 25, tags: ['Popular', 'Out of Stock'] },
]

export const mockOrders: Order[] = [
  {
    id: 'ORD-001', table_id: 'TBL-03', table_number: 3, waiter_id: 'W-001', waiter_name: 'Raj',
    items: [
      { id: 'OI-001', menu_item_id: 'MI-001', name: 'Chicken Mo Mo', quantity: 2, unit_price: 350, modifiers: 'Steamed', item_status: 'served' },
      { id: 'OI-002', menu_item_id: 'MI-004', name: 'Dal Bhat Power Lunch', quantity: 1, unit_price: 400, modifiers: '', item_status: 'served' },
      { id: 'OI-003', menu_item_id: 'MI-011', name: 'Black Coffee', quantity: 2, unit_price: 150, modifiers: '', item_status: 'served' },
    ],
    status: 'served', subtotal: 1350, tax: 135, total: 1485,
    created_at: '2026-06-30 12:15',
  },
  {
    id: 'ORD-002', table_id: 'TBL-01', table_number: 1, waiter_id: 'W-001', waiter_name: 'Raj',
    items: [
      { id: 'OI-004', menu_item_id: 'MI-005', name: 'Chicken Chowmein', quantity: 1, unit_price: 320, modifiers: '', item_status: 'served' },
      { id: 'OI-005', menu_item_id: 'MI-013', name: 'Mango Lassi', quantity: 1, unit_price: 180, modifiers: '', item_status: 'ready' },
    ],
    status: 'in_progress', subtotal: 500, tax: 50, total: 550,
    created_at: '2026-06-30 12:45',
  },
  {
    id: 'ORD-003', table_id: 'TBL-08', table_number: 8, waiter_id: 'W-002', waiter_name: 'Priya',
    items: [
      { id: 'OI-006', menu_item_id: 'MI-007', name: 'Butter Chicken with Naan', quantity: 1, unit_price: 600, modifiers: '', item_status: 'pending' },
      { id: 'OI-007', menu_item_id: 'MI-010', name: 'Masala Chiya', quantity: 2, unit_price: 80, modifiers: '', item_status: 'pending' },
    ],
    status: 'submitted', subtotal: 760, tax: 76, total: 836,
    created_at: '2026-06-30 13:10',
  },
]

export const mockKdsTickets: KdsTicket[] = [
  {
    id: 'KDS-001', order_id: 'ORD-002', table_number: 1,
    items: [
      { id: 'OI-005', menu_item_id: 'MI-013', name: 'Mango Lassi', quantity: 1, unit_price: 180, modifiers: '', item_status: 'ready' },
    ],
    elapsed_seconds: 840, status: 'in_progress',
  },
  {
    id: 'KDS-002', order_id: 'ORD-003', table_number: 8,
    items: [
      { id: 'OI-006', menu_item_id: 'MI-007', name: 'Butter Chicken with Naan', quantity: 1, unit_price: 600, modifiers: '', item_status: 'pending' },
      { id: 'OI-007', menu_item_id: 'MI-010', name: 'Masala Chiya', quantity: 2, unit_price: 80, modifiers: '', item_status: 'pending' },
    ],
    elapsed_seconds: 180, status: 'pending',
  },
]