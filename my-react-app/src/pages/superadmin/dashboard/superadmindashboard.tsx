import { useNavigate } from 'react-router-dom'
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Building2, CheckCircle, DollarSign, Activity, Zap, Database, Wifi, HardDrive, RefreshCw, Download, ChevronRight } from 'lucide-react'
import { PageHdr } from '../../../components/layoutSA/PageHdr'
import { Btn } from '../../../components/common/Button'
import { StatCard } from '../../../components/layoutSA/StatCard'
import { Card, CardHead, CardBody } from '../../../components/common/Card'
import { Badge } from '../../../components/ui/Badge'
import { Th, Td, TblWrap } from '../../../components/layoutSA/Table'
import { revenueData, tenantsByPlan, tenantData, ticketData, kpiData } from '../_data/mockData'

export default function Superadmindashboard() {
  const navigate = useNavigate()

  return (
    <div className="space-y-5">
      <PageHdr
        title="Platform Overview"
        subtitle="Welcome back — here's your portfolio at a glance."
        action={
          <div className="flex gap-2">
            <Btn variant="outline" size="sm"><RefreshCw className="w-3.5 h-3.5" /> Refresh</Btn>
            <Btn variant="accent" size="sm"><Download className="w-3.5 h-3.5" /> Export</Btn>
          </div>
        }
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Tenants" value="247" change="+12 this month" trend="up" icon={Building2} iconColor="#2E86AB" />
        <StatCard label="Active Tenants" value="198" change="80.2% active rate" trend="up" icon={CheckCircle} iconColor="#059669" />
        <StatCard label="Monthly Recurring Revenue" value={kpiData.mrr} change={kpiData.mrrChange + ' vs last month'} trend="up" icon={DollarSign} iconColor="#7C3AED" />
        <StatCard label="Platform Uptime" value="99.87%" change="Last 30 days" trend="neutral" icon={Activity} iconColor="#F59E0B" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHead>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Revenue Trend</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Total revenue vs MRR — last 6 months</p>
              </div>
              <select className="text-xs py-1.5 px-3 bg-white border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25">
                <option>Last 6 months</option>
                <option>Last 12 months</option>
              </select>
            </div>
          </CardHead>
          <CardBody>
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={revenueData} margin={{ top: 4, right: 0, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="gRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E86AB" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#2E86AB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gMRR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A3C5E" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#1A3C5E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8eef4" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `Rs. ${(v / 100000).toFixed(0)}L`} />
                <Tooltip formatter={(v: string | number) => [`Rs. ${Number(v).toLocaleString('en-IN')}`, '']} contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)' }} />
                <Area type="monotone" dataKey="revenue" name="Total Revenue" stroke="#2E86AB" strokeWidth={2} fill="url(#gRevenue)" />
                <Area type="monotone" dataKey="mrr" name="MRR" stroke="#1A3C5E" strokeWidth={2} fill="url(#gMRR)" strokeDasharray="5 3" />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHead>
            <h3 className="text-sm font-semibold text-foreground">Tenants by Plan</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Current distribution</p>
          </CardHead>
          <CardBody>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={tenantsByPlan} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="value">
                  {tenantsByPlan.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-2">
              {tenantsByPlan.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHead>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Recent Tenants</h3>
              <Btn variant="ghost" size="sm" onClick={() => navigate('/superadmin/tenants')}>View all <ChevronRight className="w-3 h-3" /></Btn>
            </div>
          </CardHead>
          <TblWrap>
            <thead><tr><Th>Tenant</Th><Th>Plan</Th><Th>Status</Th><Th>ARR</Th></tr></thead>
            <tbody>
              {tenantData.slice(0, 5).map(t => (
                <tr key={t.id} className="hover:bg-secondary/40 transition-colors cursor-pointer" onClick={() => navigate('/superadmin/tenants/details')}>
                  <Td>
                    <div className="font-medium text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.domain}</div>
                  </Td>
                  <Td><Badge variant={t.plan === 'Enterprise' ? 'info' : t.plan === 'Professional' ? 'default' : 'muted'}>{t.plan}</Badge></Td>
                  <Td><Badge variant={t.status === 'Active' ? 'success' : t.status === 'Trial' ? 'warning' : 'danger'}>{t.status}</Badge></Td>
                  <Td><span className="font-semibold">{t.arr}</span></Td>
                </tr>
              ))}
            </tbody>
          </TblWrap>
        </Card>

        <Card>
          <CardHead>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Open Tickets</h3>
              <Badge variant="danger">{ticketData.filter(t => t.status !== 'Resolved').length} open</Badge>
            </div>
          </CardHead>
          <div className="divide-y divide-border/50">
            {ticketData.filter(t => t.status !== 'Resolved').slice(0, 4).map(t => (
              <div key={t.id} className="px-5 py-3 hover:bg-secondary/40 cursor-pointer">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-xs font-medium text-foreground leading-snug">{t.subject}</p>
                  <Badge variant={t.priority === 'Critical' ? 'critical' : t.priority === 'High' ? 'danger' : t.priority === 'Medium' ? 'warning' : 'muted'} className="flex-shrink-0">{t.priority}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{t.tenant} · {t.created}</p>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-border">
            <Btn variant="ghost" size="sm" className="w-full justify-center" onClick={() => navigate('/superadmin/tickets')}>View all tickets <ChevronRight className="w-3 h-3" /></Btn>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'API Response', value: '142ms', ok: true, icon: Zap },
          { label: 'DB Queries/s', value: '2,847', ok: true, icon: Database },
          { label: 'Active Sessions', value: '1,293', ok: true, icon: Wifi },
          { label: 'Disk Usage', value: '67%', ok: false, icon: HardDrive },
        ].map(item => (
          <Card key={item.label} className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.ok ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                <item.icon className={`w-4 h-4 ${item.ok ? 'text-emerald-600' : 'text-amber-600'}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-semibold text-foreground">{item.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
