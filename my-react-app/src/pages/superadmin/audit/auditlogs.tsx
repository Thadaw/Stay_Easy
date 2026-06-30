import { useState } from 'react'
import { Search } from 'lucide-react'
import { PageHdr } from '../../../components/layoutSA/PageHdr'
import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/common/Card'
import { Th, Td, TblWrap } from '../../../components/layoutSA/Table'
import { auditData } from '../_data/mockData'

export default function AuditLogs() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = auditData.filter(a => {
    const q = search.toLowerCase()
    return (
      (a.action.toLowerCase().includes(q) || a.user.toLowerCase().includes(q) || a.resource.toLowerCase().includes(q)) &&
      (statusFilter === 'All' || a.status === statusFilter)
    )
  })

  return (
    <div className="space-y-5">
      <PageHdr title="Audit Logs" subtitle="Track all administrative actions across the platform" />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            placeholder="Search actions, users, resources..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 focus:border-[#2E86AB] transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      <Card>
        <TblWrap>
          <thead><tr><Th>Action</Th><Th>User</Th><Th>Resource</Th><Th>Timestamp</Th><Th>IP</Th><Th>Status</Th></tr></thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="hover:bg-secondary/40 transition-colors">
                <Td><span className="font-medium text-foreground">{a.action}</span></Td>
                <Td><span className="text-muted-foreground text-xs">{a.user}</span></Td>
                <Td><span className="text-foreground text-xs">{a.resource}</span></Td>
                <Td><span className="text-muted-foreground text-xs font-mono">{a.timestamp}</span></Td>
                <Td><span className="text-muted-foreground text-xs font-mono">{a.ip}</span></Td>
                <Td><Badge variant={a.status === 'Success' ? 'success' : 'danger'}>{a.status}</Badge></Td>
              </tr>
            ))}
          </tbody>
        </TblWrap>
      </Card>
    </div>
  )
}
