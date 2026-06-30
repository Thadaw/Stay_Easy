import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { PageHdr } from '../../../components/layoutSA/PageHdr'
import { Btn } from '../../../components/common/Button'
import { StatCard } from '../../../components/layoutSA/StatCard'
import { Card, CardHead, CardBody } from '../../../components/common/Card'
import { BarChart2, Users, BookOpen, DollarSign } from 'lucide-react'
import { ticketVolumeData } from '../_data/mockData'

export default function Analytics() {
  return (
    <div className="space-y-5">
      <PageHdr
        title="Analytics"
        subtitle="Platform-wide usage and performance metrics"
        action={
          <div className="flex gap-2">
            <select className="px-3 py-1.5 text-xs bg-white border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 cursor-pointer">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last quarter</option>
            </select>
            <Btn variant="outline" size="sm">Apply</Btn>
          </div>
        }
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total API Calls" value="2.1M" change="+18.3% vs last month" trend="up" icon={BarChart2} iconColor="#2E86AB" />
        <StatCard label="Active Users" value="1,293" change="+7.2% vs last month" trend="up" icon={Users} iconColor="#059669" />
        <StatCard label="Total Bookings" value="3,847" change="+12.1% vs last month" trend="up" icon={BookOpen} iconColor="#7C3AED" />
        <StatCard label="Avg. Revenue/Booking" value="Rs. ४१,१८४" change="+३.४% vs last month" trend="up" icon={DollarSign} iconColor="#F59E0B" />
      </div>

      <Card>
        <CardHead>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Ticket Volume</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Opened vs resolved tickets this week</p>
            </div>
          </div>
        </CardHead>
        <CardBody>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ticketVolumeData} margin={{ top: 4, right: 0, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8eef4" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              <Bar dataKey="open" name="Opened" fill="#2E86AB" radius={[4, 4, 0, 0]} barSize={24} />
              <Bar dataKey="resolved" name="Resolved" fill="#059669" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  )
}
