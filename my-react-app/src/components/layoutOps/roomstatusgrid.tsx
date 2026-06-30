import type { Room, RoomStatus } from '../../types'

const statusConfig: Record<RoomStatus, { bg: string; dot: string; label: string }> = {
  available:    { bg: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100', dot: 'bg-emerald-500', label: 'Available' },
  occupied:     { bg: 'bg-red-50 border-red-200 hover:bg-red-100',             dot: 'bg-red-500',    label: 'Occupied' },
  dirty:        { bg: 'bg-amber-50 border-amber-200 hover:bg-amber-100',       dot: 'bg-amber-500',  label: 'Dirty' },
  cleaning:     { bg: 'bg-blue-50 border-blue-200 hover:bg-blue-100',          dot: 'bg-blue-500',   label: 'Cleaning' },
  inspected:    { bg: 'bg-teal-50 border-teal-200 hover:bg-teal-100',          dot: 'bg-teal-500',   label: 'Inspected' },
  maintenance:  { bg: 'bg-gray-100 border-gray-300 hover:bg-gray-200',         dot: 'bg-gray-400',   label: 'Maintenance' },
  blocked:      { bg: 'bg-gray-100 border-gray-300 hover:bg-gray-200',         dot: 'bg-gray-400',   label: 'Blocked' },
}

export function RoomStatusGrid({ rooms, onRoomClick, filter }: {
  rooms: Room[]
  onRoomClick?: (room: Room) => void
  filter?: RoomStatus
}) {
  const filtered = filter ? rooms.filter(r => r.status === filter) : rooms

  const floors = [...new Set(filtered.map(r => r.floor))].sort()

  return (
    <div className="space-y-6">
      {floors.map(floor => {
        const floorRooms = filtered.filter(r => r.floor === floor)
        return (
          <div key={floor}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Floor {floor}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
              {floorRooms.map(room => {
                const cfg = statusConfig[room.status]
                return (
                  <button
                    key={room.id}
                    onClick={() => onRoomClick?.(room)}
                    className={`relative flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-colors min-h-[70px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${cfg.bg} ${onRoomClick ? 'cursor-pointer' : 'cursor-default'}`}
                    title={`${room.room_number} - ${cfg.label}`}
                  >
                    <span className="text-xs font-bold text-gray-700 leading-none">
                      {room.room_number}
                    </span>
                    <span className="text-[10px] text-gray-500 mt-1 leading-none truncate max-w-full">
                      {room.room_type}
                    </span>
                    {room.guest_name && (
                      <span className="text-[8px] text-gray-400 mt-0.5 leading-none truncate max-w-full">
                        {room.guest_name}
                      </span>
                    )}
                    <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">No rooms found.</p>
      )}
    </div>
  )
}
