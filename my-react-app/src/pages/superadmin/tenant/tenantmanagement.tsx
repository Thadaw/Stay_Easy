import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { PageHdr } from '../../../components/layoutSA/PageHdr'
import { Btn } from '../../../components/common/Button'
import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/common/Card'
import { Th, Td, TblWrap } from '../../../components/layoutSA/Table'
import { tenantData } from '../_data/mockData'

export default function TenantManagement() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [plan, setPlan] = useState('All')
  const [status, setStatus] = useState('All')

  const filtered = tenantData.filter(t => {
    const q = search.toLowerCase()
    return (
      (t.name.toLowerCase().includes(q) || t.domain.toLowerCase().includes(q)) &&
      (plan === 'All' || t.plan === plan) &&
      (status === 'All' || t.status === status)
    )
  })

  return (
    <div className="space-y-5">
      <PageHdr
        title="Tenant Management"
        subtitle={`${tenantData.length} tenants registered across all plans`}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            placeholder="Search by name or domain..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 focus:border-[#2E86AB] transition-colors"
          />
        </div>
        <select
          value={plan}
          onChange={e => setPlan(e.target.value)}
          className="px-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 cursor-pointer"
        >
          <option value="All">All Plans</option>
          <option value="Enterprise">Enterprise</option>
          <option value="Professional">Professional</option>
          <option value="Starter">Starter</option>
        </select>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="px-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Trial">Trial</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      <Card>
        <TblWrap>
          <thead>
            <tr>
              <Th>Tenant</Th>
              <Th>Plan</Th>
              <Th>Status</Th>
              <Th>Rooms</Th>
              <Th>ARR</Th>
              <Th>Joined</Th>
              <Th><span className="sr-only">Actions</span></Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} className="hover:bg-secondary/40 transition-colors">
                <Td>
                  <div className="font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.domain}</div>
                </Td>
                <Td><Badge variant={t.plan === 'Enterprise' ? 'info' : t.plan === 'Professional' ? 'default' : 'muted'}>{t.plan}</Badge></Td>
                <Td><Badge variant={t.status === 'Active' ? 'success' : t.status === 'Trial' ? 'warning' : 'danger'}>{t.status}</Badge></Td>
                <Td><span className="font-medium">{t.rooms}</span></Td>
                <Td><span className="font-semibold">{t.arr}</span></Td>
                <Td><span className="text-muted-foreground">{t.joined}</span></Td>
                <Td>
                  <div className="flex items-center gap-1">
                    <Btn variant="ghost" size="sm" onClick={() => navigate('/superadmin/tenants/details')}>View</Btn>
                    <Btn variant="ghost" size="sm">Edit</Btn>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TblWrap>
        <div className="px-5 py-3 border-t border-border text-xs text-muted-foreground">
          Showing {filtered.length} of {tenantData.length} tenants
        </div>
      </Card>
    </div>
  )
}
