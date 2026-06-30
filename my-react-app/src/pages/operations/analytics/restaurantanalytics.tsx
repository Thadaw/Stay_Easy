import { TrendingUp, DollarSign, ShoppingCart, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { PageHeader } from '../../../components/ui/PageHeader'
import { mockOrders, mockMenuItems } from '../_data/mock'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts'

const colors = ['#1A3C5E', '#2E86AB', '#38BDF8', '#16A34A', '#F59E0B', '#8B5CF6', '#EC4899', '#F97316']

function StatCard({ label, value, icon: Icon, trend, positive }: { label: string; value: string; icon: any; trend?: string; positive?: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center">
          <Icon className="w-4.5 h-4.5 text-primary" />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      {trend && (
        <div className="flex items-center gap-1 mt-1.5">
          {positive ? (
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
          )}
          <span className={`text-xs font-medium ${positive ? 'text-emerald-600' : 'text-red-600'}`}>{trend}</span>
        </div>
      )}
    </div>
  )
}

export default function RestaurantAnalytics() {
  const totalRevenue = mockOrders.reduce((s, o) => s + o.total, 0)
  const avgOrder = mockOrders.length ? Math.round(totalRevenue / mockOrders.length) : 0
  const totalItems = mockOrders.reduce((s, o) => s + o.items.reduce((si, i) => si + i.quantity, 0), 0)

  const categorySales = mockMenuItems.reduce<Record<string, { revenue: number; count: number }>>((acc, item) => {
    const ordered = mockOrders.flatMap(o => o.items.filter(i => i.menu_item_id === item.id))
    const revenue = ordered.reduce((s, i) => s + i.unit_price * i.quantity, 0)
    const count = ordered.reduce((s, i) => s + i.quantity, 0)
    if (revenue > 0 || count > 0) {
      if (!acc[item.category]) acc[item.category] = { revenue: 0, count: 0 }
      acc[item.category].revenue += revenue
      acc[item.category].count += count
    }
    return acc
  }, {})

  const categoryChartData = Object.entries(categorySales).map(([name, data]) => ({ name, revenue: data.revenue }))

  const topItems = mockMenuItems
    .map(item => {
      const ordered = mockOrders.flatMap(o => o.items.filter(i => i.menu_item_id === item.id))
      const qty = ordered.reduce((s, i) => s + i.quantity, 0)
      return { name: item.name, qty }
    })
    .filter(i => i.qty > 0)
    .sort((a, b) => b.qty - a.qty)

  const peakSales = [
    { hour: '12-1 PM', orders: 4 },
    { hour: '1-2 PM', orders: 6 },
    { hour: '2-3 PM', orders: 3 },
    { hour: '6-7 PM', orders: 2 },
    { hour: '7-8 PM', orders: 5 },
    { hour: '8-9 PM', orders: 4 },
  ]

  const weeklyTrend = [
    { day: 'Mon', revenue: 4200 },
    { day: 'Tue', revenue: 3800 },
    { day: 'Wed', revenue: 5100 },
    { day: 'Thu', revenue: 4600 },
    { day: 'Fri', revenue: 7200 },
    { day: 'Sat', revenue: 8900 },
    { day: 'Sun', revenue: 6500 },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Restaurant sales performance and trends"
        breadcrumb={[{ label: 'Restaurant', href: '/ops/pos' }, { label: 'Analytics' }]}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={`Rs. ${totalRevenue.toLocaleString()}`} icon={DollarSign} trend="12.5% vs last week" positive />
        <StatCard label="Avg. Order Value" value={`Rs. ${avgOrder.toLocaleString()}`} icon={ShoppingCart} trend="3.2% vs last week" positive />
        <StatCard label="Items Sold" value={String(totalItems)} icon={TrendingUp} trend="8.1% vs last week" positive />
        <StatCard label="Total Orders" value={String(mockOrders.length)} icon={Users} trend="5.0% vs last week" positive />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={weeklyTrend}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} tickFormatter={v => `Rs.${v / 1000}k`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
              <Line type="monotone" dataKey="revenue" stroke="#1A3C5E" strokeWidth={2} dot={{ fill: '#1A3C5E', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Revenue by Category</h3>
          {categoryChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={categoryChartData}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} tickFormatter={v => `Rs.${v}`} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
                <Bar dataKey="revenue" fill="#2E86AB" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[260px] text-sm text-muted-foreground">
              No category data yet
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Item Popularity</h3>
          {topItems.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={topItems}
                  dataKey="qty"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={(entry: any) => `${entry.name} ${((entry.percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine
                >
                  {topItems.map((_, idx) => (
                    <Cell key={idx} fill={colors[idx % colors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[260px] text-sm text-muted-foreground">
              No item data yet
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Peak Hours</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={peakSales}>
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
              <Bar dataKey="orders" fill="#38BDF8" radius={[6, 6, 0, 0]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Top Items by Volume</h3>
        {topItems.length > 0 ? (
          <div className="space-y-4">
            {topItems.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-4">
                <span className="text-xs font-bold text-muted-foreground w-5 text-right">{idx + 1}.</span>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-foreground font-medium truncate">{item.name}</span>
                    <span className="text-muted-foreground tabular-nums">{item.qty} sold</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(item.qty / topItems[0].qty) * 100}%`,
                        backgroundColor: colors[idx % colors.length],
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">No items sold yet</p>
        )}
      </div>
    </div>
  )
}
