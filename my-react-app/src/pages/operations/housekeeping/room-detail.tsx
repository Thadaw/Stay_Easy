import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera } from 'lucide-react'
import { PageHeader } from '../../../components/ui/PageHeader'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { mockRooms, mockTasks } from '../_data/mock'
import toast from 'react-hot-toast'

const statusConfig: Record<string, { label: string; color: string }> = {
  available: { label: 'Available', color: 'emerald' },
  occupied: { label: 'Occupied', color: 'blue' },
  dirty: { label: 'Dirty', color: 'amber' },
  cleaning: { label: 'Cleaning', color: 'navy' },
  inspected: { label: 'Inspected', color: 'emerald' },
  maintenance: { label: 'Maintenance', color: 'red' },
  blocked: { label: 'Blocked', color: 'gray' },
}

export default function RoomDetail() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const roomId = searchParams.get('id') || 'R-101'
  const [room, setRoom] = useState(mockRooms.find(r => r.id === roomId) || mockRooms[0])

  const tasks = mockTasks.filter(t => t.room_number === room.room_number)

  const changeStatus = (status: string) => {
    setRoom(prev => ({ ...prev, status: status as typeof room.status }))
    toast.success(`Room ${room.room_number} marked as ${status}`)
  }

  const cfg = statusConfig[room.status] || { label: room.status, color: 'gray' }

  return (
    <div>
      <PageHeader
        title={`Room ${room.room_number}`}
        description={`Floor ${room.floor} · ${room.room_type}`}
        breadcrumb={[{ label: 'Housekeeping', href: '/ops/housekeeping' }, { label: `Room ${room.room_number}` }]}
        actions={
          <Button variant="ghost" onClick={() => navigate('/ops/housekeeping')} icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Tasks
          </Button>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold text-foreground">Room Information</h3>
                <p className="text-xs text-muted-foreground mt-0.5">ID: {room.id}</p>
              </div>
              <Badge variant={cfg.color as 'emerald' | 'blue' | 'amber' | 'navy' | 'red' | 'gray'} size="md">
                {cfg.label}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Room Number</span><p className="font-medium">{room.room_number}</p></div>
              <div><span className="text-muted-foreground">Room Type</span><p className="font-medium">{room.room_type}</p></div>
              <div><span className="text-muted-foreground">Floor</span><p className="font-medium">{room.floor}</p></div>
              <div><span className="text-muted-foreground">Status</span><p className="font-medium">{cfg.label}</p></div>
              <div><span className="text-muted-foreground">Smoking</span><p className="font-medium">{room.smoking ? 'Yes' : 'No'}</p></div>
              <div><span className="text-muted-foreground">Accessible</span><p className="font-medium">{room.accessible ? 'Yes' : 'No'}</p></div>
              {room.guest_name && (
                <>
                  <div><span className="text-muted-foreground">Guest</span><p className="font-medium">{room.guest_name}</p></div>
                  <div><span className="text-muted-foreground">Check-out</span><p className="font-medium">{room.checkout_date || '-'}</p></div>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <h3 className="text-base font-semibold text-foreground mb-4">Update Status</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(statusConfig).map(([key, val]) => (
                <Button
                  key={key}
                  size="sm"
                  variant={room.status === key ? 'primary' : 'outline'}
                  onClick={() => changeStatus(key)}
                  disabled={room.status === key}
                >
                  {val.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <h3 className="text-base font-semibold text-foreground mb-4">Photo Upload</h3>
            <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-muted-foreground/30 transition-colors cursor-pointer">
              <Camera className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload room photos</p>
              <p className="text-xs text-muted-foreground/60 mt-1">PNG, JPG up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Task History</h3>
            {tasks.length > 0 ? (
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className="text-sm p-3 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={task.status === 'inspected' ? 'emerald' : task.status === 'cleaning' ? 'blue' : 'navy'} size="sm">
                        {task.status}
                      </Badge>
                      <Badge variant={task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'amber' : 'gray'} size="sm">
                        {task.priority}
                      </Badge>
                    </div>
                    {task.assigned_to && <p className="text-xs text-muted-foreground">Assigned to {task.assigned_to}</p>}
                    {task.notes && <p className="text-xs text-warning mt-1">{task.notes}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <p className="text-xs">No tasks for this room</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
