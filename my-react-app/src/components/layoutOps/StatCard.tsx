import type { ElementType } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '../common/Card'

export function StatCard({ label, value, change, trend, icon: Icon, iconColor = '#2E86AB' }: {
  label: string; value: string; change?: string; trend?: 'up' | 'down' | 'neutral'
  icon: ElementType; iconColor?: string
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-semibold text-foreground mt-1 leading-none">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-500" />}
              {trend === 'down' && <TrendingDown className="w-3 h-3 text-red-500" />}
              <span className={`text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ml-3"
          style={{ backgroundColor: `${iconColor}18` }}
        >
          <Icon className="w-5 h-5" style={{ color: iconColor }} />
        </div>
      </div>
    </Card>
  )
}
