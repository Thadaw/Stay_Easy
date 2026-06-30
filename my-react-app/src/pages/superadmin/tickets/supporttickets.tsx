import { useState } from 'react'
import { Search } from 'lucide-react'
import { PageHdr } from '../../../components/layoutSA/PageHdr'
import { Btn } from '../../../components/common/Button'
import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/common/Card'
import { Th, Td, TblWrap } from '../../../components/layoutSA/Table'
import { ticketData } from '../_data/mockData'

export default function SupportTickets() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = ticketData.filter(t => {
    const q = search.toLowerCase()
    return (
      (t.subject.toLowerCase().includes(q) || t.tenant.toLowerCase().includes(q) || t.id.includes(q)) &&
      (filter === 'All' || t.status === filter)
    )
  })

  return (
    <div className="space-y-5">
      <PageHdr
        title="Support Tickets"
        subtitle={`${ticketData.filter(t => t.status !== 'Resolved').length} unresolved tickets`}
        action={<Btn variant="accent" size="sm">+ New Ticket</Btn>}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            placeholder="Search tickets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 focus:border-[#2E86AB] transition-colors"
          />
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <Card>
        <TblWrap>
          <thead>
            <tr><Th>ID</Th><Th>Subject</Th><Th>Tenant</Th><Th>Priority</Th><Th>Status</Th><Th>Created</Th><Th>Assignee</Th></tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} className="hover:bg-secondary/40 transition-colors cursor-pointer">
                <Td><span className="font-mono text-xs text-muted-foreground">{t.id}</span></Td>
                <Td><span className="font-medium text-foreground">{t.subject}</span></Td>
                <Td><span className="text-foreground">{t.tenant}</span></Td>
                <Td>
                  <Badge variant={t.priority === 'Critical' ? 'critical' : t.priority === 'High' ? 'danger' : t.priority === 'Medium' ? 'warning' : 'muted'}>
                    {t.priority}
                  </Badge>
                </Td>
                <Td><Badge variant={t.status === 'Resolved' ? 'success' : t.status === 'In Progress' ? 'info' : 'warning'}>{t.status}</Badge></Td>
                <Td><span className="text-muted-foreground">{t.created}</span></Td>
                <Td><span className="text-muted-foreground">{t.assignee}</span></Td>
              </tr>
            ))}
          </tbody>
        </TblWrap>
      </Card>
    </div>
  )
}
