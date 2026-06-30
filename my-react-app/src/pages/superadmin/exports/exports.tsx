import { FileText, Download, Clock } from 'lucide-react'
import { PageHdr } from '../../../components/layoutSA/PageHdr'
import { Btn } from '../../../components/common/Button'
import { Badge } from '../../../components/ui/Badge'
import { Card, CardBody } from '../../../components/common/Card'
import { Th, Td, TblWrap } from '../../../components/layoutSA/Table'

const formats = [
  { label: 'Export as CSV', desc: 'Comma-separated values — works with Excel', icon: FileText, color: '#059669' },
  { label: 'Export as PDF', desc: 'Formatted document ready for printing', icon: FileText, color: '#DC2626' },
  { label: 'Export as JSON', desc: 'Raw data format for developers & APIs', icon: FileText, color: '#7C3AED' },
]

const history = [
  { id: 1, type: 'CSV', scope: 'All Tenants', requested: 'Jun 29, 2024 09:30', status: 'Completed', size: '12.4 MB' },
  { id: 2, type: 'PDF', scope: 'Revenue Report', requested: 'Jun 28, 2024 14:15', status: 'Completed', size: '4.2 MB' },
  { id: 3, type: 'JSON', scope: 'Audit Logs', requested: 'Jun 27, 2024 11:00', status: 'Failed', size: '—' },
]

export default function Exports() {
  return (
    <div className="space-y-5">
      <PageHdr title="Export Center" subtitle="Download platform data in your preferred format" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {formats.map(f => (
          <Card key={f.label} className="p-5 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${f.color}18` }}>
                <f.icon className="w-5 h-5" style={{ color: f.color }} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{f.label}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
            <Btn variant="outline" size="sm" className="w-full justify-center mt-2">
              <Download className="w-3.5 h-3.5" /> Export
            </Btn>
          </Card>
        ))}
      </div>

      <Card>
        <Th><span className="block px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-secondary/40 border-b border-border">Export History</span></Th>
        <TblWrap>
          <thead><tr><Th>Format</Th><Th>Scope</Th><Th>Requested</Th><Th>Status</Th><Th>Size</Th></tr></thead>
          <tbody>
            {history.map(h => (
              <tr key={h.id}>
                <Td><Badge variant="default">{h.type}</Badge></Td>
                <Td><span className="text-foreground">{h.scope}</span></Td>
                <Td><span className="text-muted-foreground">{h.requested}</span></Td>
                <Td><Badge variant={h.status === 'Completed' ? 'success' : 'danger'}>{h.status}</Badge></Td>
                <Td><span className="text-muted-foreground">{h.size}</span></Td>
              </tr>
            ))}
          </tbody>
        </TblWrap>
      </Card>
    </div>
  )
}
