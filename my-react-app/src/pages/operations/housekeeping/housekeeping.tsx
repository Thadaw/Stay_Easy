import { useState } from 'react'
import { AlertTriangle, Sparkles } from 'lucide-react'
import { PageHeader } from '../../../components/ui/PageHeader'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { Tabs } from '../../../components/ui/Tabs'
import { RoomStatusGrid } from '../../../components/layoutOps/roomstatusgrid'
import { mockTasks, mockRooms } from '../_data/mock'
import toast from 'react-hot-toast'


const statusBadge = (s: string) => {
  const map: Record<string, { variant: 'navy' | 'blue' | 'emerald' | 'gray'; label: string }> = {
    pending: { variant: 'navy', label: 'Pending' },
    cleaning: { variant: 'blue', label: 'Cleaning' },
    inspected: { variant: 'emerald', label: 'Inspected' },
  }
  const m = map[s]
  return m ? <Badge variant={m.variant}>{m.label}</Badge> : <Badge>{s}</Badge>
}

const priorityBadge = (p: string) => {
  const map: Record<string, { variant: 'red' | 'amber' | 'gray'; label: string }> = {
    high: { variant: 'red', label: 'High' },
    medium: { variant: 'amber', label: 'Medium' },
    low: { variant: 'gray', label: 'Low' },
  }
  const m = map[p]
  return m ? <Badge variant={m.variant} size="sm">{m.label}</Badge> : null
}

export default function HousekeepingPage() {
  const [tasks, setTasks] = useState(mockTasks)
  const [tab, setTab] = useState('all')

  const filtered = tab === 'all' ? tasks : tasks.filter(t => t.status === tab)

  const dirtyCount = mockRooms.filter(r => r.status === 'dirty').length
  const cleaningCount = tasks.filter(t => t.status === 'cleaning').length
  const pendingCount = tasks.filter(t => t.status === 'pending').length

  const updateTaskStatus = (taskId: string, newStatus: 'cleaning' | 'inspected') => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus, updated_at: new Date().toLocaleString() } : t))
    toast.success(newStatus === 'cleaning' ? 'Started cleaning' : 'Marked as inspected')
  }

  const tabs = [
    { id: 'all', label: 'All', count: tasks.length },
    { id: 'pending', label: 'Pending', count: pendingCount },
    { id: 'cleaning', label: 'Cleaning', count: cleaningCount },
    { id: 'inspected', label: 'Inspected', count: tasks.filter(t => t.status === 'inspected').length },
  ]

  return (
    <div>
      <PageHeader
        title="Housekeeping"
        description="Manage room cleaning tasks and schedules"
        breadcrumb={[{ label: 'Housekeeping' }]}
      />

      <div className="flex items-center gap-4 mb-6">
        <StatPill label="Dirty Rooms" value={String(dirtyCount)} color="amber" />
        <StatPill label="In Progress" value={String(cleaningCount)} color="blue" />
        <StatPill label="Pending Tasks" value={String(pendingCount)} color="navy" />
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-border shadow-sm">
            <div className="px-6 py-4 border-b border-border">
              <Tabs tabs={tabs} active={tab} onChange={setTab} variant="pills" />
            </div>
            {filtered.length > 0 ? (
              <div className="divide-y divide-border">
                {filtered.map(task => (
                  <div key={task.id} className="px-6 py-4 flex items-start justify-between gap-4 border-l-4 transition-colors hover:bg-muted/30 ${priorityBorder[task.priority]}">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">Room {task.room_number}</span>
                        {statusBadge(task.status)}
                        {priorityBadge(task.priority)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {task.room_type} — Floor {task.floor}
                        {task.assigned_to && ` — ${task.assigned_to}`}
                      </p>
                      {task.notes && (
                        <p className="text-xs text-warning mt-1 italic flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> {task.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {task.status === 'pending' && (
                        <Button size="sm" variant="primary" onClick={() => updateTaskStatus(task.id, 'cleaning')}>
                          Start Cleaning
                        </Button>
                      )}
                      {task.status === 'cleaning' && (
                        <Button size="sm" variant="secondary" onClick={() => updateTaskStatus(task.id, 'inspected')}>
                          Mark Inspected
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Sparkles className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-sm">All tasks completed</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Room Status</h3>
            <RoomStatusGrid rooms={mockRooms.filter(r => r.status === 'dirty' || r.status === 'cleaning')} />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatPill({ label, value, color }: { label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    navy: 'bg-primary/10 text-primary border-primary/20',
  }

  return (
    <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border ${colors[color] || colors.navy}`}>
      <span className="text-xs font-medium">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  )
}
