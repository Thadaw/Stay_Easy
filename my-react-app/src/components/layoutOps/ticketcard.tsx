import { Clock, ChefHat } from 'lucide-react'
import type { KdsTicket } from '../../types'

function formatElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m >= 60) return `${Math.floor(m / 60)}h ${m % 60}m`
  return `${m}m ${s}s`
}

function urgencyColor(seconds: number): string {
  if (seconds < 300) return 'border-l-emerald-400'    // < 5 min
  if (seconds < 600) return 'border-l-amber-400'       // 5-10 min
  return 'border-l-red-500'                             // > 10 min
}

function urgencyBg(seconds: number): string {
  if (seconds < 300) return 'bg-emerald-50'
  if (seconds < 600) return 'bg-amber-50'
  return 'bg-red-50'
}

export function TicketCard({ ticket, onItemReady }: {
  ticket: KdsTicket
  onItemReady?: (orderId: string, itemId: string) => void
}) {
  return (
    <div className={`rounded-xl border border-border shadow-sm p-5 border-l-4 ${urgencyColor(ticket.elapsed_seconds)} ${urgencyBg(ticket.elapsed_seconds)}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-lg font-bold text-foreground">Table {ticket.table_number}</span>
          <span className="text-xs text-muted-foreground ml-2">#{ticket.order_id}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          {formatElapsed(ticket.elapsed_seconds)}
        </div>
      </div>

      <div className="space-y-1.5">
        {ticket.items.map(item => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                item.item_status === 'ready' ? 'bg-emerald-500' :
                item.item_status === 'in_progress' ? 'bg-amber-500' : 'bg-gray-300'
              }`} />
              <span className="font-medium text-foreground truncate">{item.name}</span>
              <span className="text-muted-foreground flex-shrink-0">x{item.quantity}</span>
              {item.modifiers && (
                <span className="text-[10px] text-muted-foreground truncate">{item.modifiers}</span>
              )}
            </div>
            <button
              onClick={() => onItemReady?.(ticket.order_id, item.id)}
              disabled={item.item_status === 'ready'}
              aria-label={item.item_status === 'ready' ? `${item.name} is ready` : `Mark ${item.name} ready`}
              className={`flex-shrink-0 ml-2 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                item.item_status === 'ready'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-white border border-border text-foreground hover:bg-primary hover:text-white'
              }`}
            >
              {item.item_status === 'ready' ? 'Ready' : 'Mark Ready'}
            </button>
          </div>
        ))}
      </div>

      {ticket.status === 'pending' && (
        <div className="mt-3 flex justify-end">
          <button aria-label="Start Preparing" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
            <ChefHat className="w-3.5 h-3.5" />
            Start Preparing
          </button>
        </div>
      )}
    </div>
  )
}
