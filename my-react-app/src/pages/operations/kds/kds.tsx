import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChefHat, Clock, CookingPot, CheckCircle2 } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Badge } from '../../../components/ui/Badge'
import { mockKdsTickets } from '../_data/mock'
import toast from 'react-hot-toast'

type TicketStatus = 'pending' | 'in_progress' | 'ready'

const statusConfig: Record<TicketStatus, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  in_progress: { label: 'In Progress', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  ready: { label: 'Ready', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
}

function Timer({ seconds }: { seconds: number }) {
  const [elapsed, setElapsed] = useState(seconds)

  useEffect(() => {
    const interval = setInterval(() => setElapsed(s => s + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60
  const urgent = elapsed > 600

  return (
    <span className={`font-mono tabular-nums ${urgent ? 'text-red-400 animate-pulse' : 'text-slate-300'}`}>
      {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
    </span>
  )
}

export default function KDSPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TicketStatus | 'all'>('all')
  const [tickets, setTickets] = useState(mockKdsTickets)

  const filtered = activeTab === 'all' ? tickets : tickets.filter(t => t.status === activeTab)

  const handleAction = (ticketId: string, action: 'start' | 'complete' | 'void') => {
    setTickets(prev => prev.map(t => {
      if (t.id !== ticketId) return t
      if (action === 'start') return { ...t, status: 'in_progress' as const }
      if (action === 'complete') return { ...t, status: 'ready' as const }
      return t
    }))
    const verb = { start: 'started', complete: 'completed', void: 'voided' } [action]
    toast.success(`Ticket ${ticketId} ${verb}`)
  }

  const tabs = [
    { id: 'all' as const, label: `All (${tickets.length})` },
    { id: 'pending' as const, label: `Pending (${tickets.filter(t => t.status === 'pending').length})` },
    { id: 'in_progress' as const, label: `Cooking (${tickets.filter(t => t.status === 'in_progress').length})` },
    { id: 'ready' as const, label: `Ready (${tickets.filter(t => t.status === 'ready').length})` },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-full px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">Kitchen Display</h1>
              <p className="text-[11px] text-slate-400">StayEasy — Restaurant Operations</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                  activeTab === t.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {t.label}
              </button>
            ))}
            <div className="w-px h-6 bg-slate-700 mx-1" />
            <Button variant="outline" size="sm" onClick={() => navigate('/ops/pos')}>
              POS
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(ticket => {
              const cfg = statusConfig[ticket.status]
              const totalQty = ticket.items.reduce((s, i) => s + i.quantity, 0)

              return (
                <div
                  key={ticket.id}
                  className={`bg-slate-800/60 border rounded-2xl p-5 space-y-4 transition-all hover:border-slate-600 ${
                    ticket.status === 'ready' ? 'border-emerald-500/40' : ticket.status === 'in_progress' ? 'border-blue-500/40' : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">Table {ticket.table_number}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {ticket.id} · {totalQty} items
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm bg-slate-900/60 px-3 py-1.5 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <Timer seconds={ticket.elapsed_seconds} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {ticket.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-900/40">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            item.item_status === 'pending' ? 'bg-amber-400' :
                            item.item_status === 'ready' ? 'bg-emerald-400' :
                            'bg-blue-400'
                          }`} />
                          <span className="text-sm text-slate-200 truncate">{item.name}</span>
                          {item.modifiers && (
                            <span className="text-[10px] text-slate-500">({item.modifiers})</span>
                          )}
                        </div>
                        <span className="text-sm font-medium text-slate-300 ml-2">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-1">
                    {ticket.status === 'pending' && (
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1 justify-center"
                        icon={<CookingPot className="w-3.5 h-3.5" />}
                        onClick={() => handleAction(ticket.id, 'start')}
                      >
                        Start Cooking
                      </Button>
                    )}
                    {ticket.status === 'in_progress' && (
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1 justify-center bg-emerald-600 hover:bg-emerald-500"
                        icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                        onClick={() => handleAction(ticket.id, 'complete')}
                      >
                        Mark Ready
                      </Button>
                    )}
                    {ticket.status === 'ready' && (
                      <Badge variant="emerald" dot className="text-xs">Awaiting Pickup</Badge>
                    )}
                    {ticket.status !== 'ready' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAction(ticket.id, 'void')}
                        className="text-slate-400 border-slate-700"
                      >
                        Void
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <ChefHat className="w-14 h-14 mb-4 opacity-20" />
            <p className="text-lg font-medium">All tickets cleared</p>
            <p className="text-sm mt-1">Waiting for new orders...</p>
          </div>
        )}
      </main>
    </div>
  )
}
