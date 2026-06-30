import { FileText, Download } from 'lucide-react'
import { PageHdr } from '../../../components/layoutSA/PageHdr'
import { Btn } from '../../../components/common/Button'
import { Badge } from '../../../components/ui/Badge'
import { Card, CardHead, CardBody } from '../../../components/common/Card'
import { Th, Td, TblWrap } from '../../../components/layoutSA/Table'

const reports = [
  { name: 'Monthly Revenue Report', type: 'Financial', generated: 'Jun 1, 2024', status: 'Ready', size: '2.4 MB' },
  { name: 'Tenant Activity Summary', type: 'Operations', generated: 'Jun 1, 2024', status: 'Ready', size: '1.8 MB' },
  { name: 'Booking Trends Q2 2024', type: 'Analytics', generated: 'May 31, 2024', status: 'Ready', size: '4.2 MB' },
  { name: 'API Usage Report', type: 'Technical', generated: 'May 30, 2024', status: 'Generating', size: '—' },
  { name: 'Churn Analysis', type: 'Analytics', generated: 'May 28, 2024', status: 'Ready', size: '1.1 MB' },
]

export default function Reports() {
  return (
    <div className="space-y-5">
      <PageHdr
        title="Reports"
        subtitle="Generate and download platform reports"
        action={<Btn variant="accent" size="sm"><FileText className="w-3.5 h-3.5" /> Generate Report</Btn>}
      />

      <Card>
        <CardHead><h3 className="text-sm font-semibold text-foreground">Available Reports</h3></CardHead>
        <TblWrap>
          <thead><tr><Th>Report</Th><Th>Type</Th><Th>Generated</Th><Th>Status</Th><Th>Size</Th><Th></Th></tr></thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.name}>
                <Td><span className="font-medium text-foreground">{r.name}</span></Td>
                <Td><span className="text-muted-foreground">{r.type}</span></Td>
                <Td><span className="text-muted-foreground">{r.generated}</span></Td>
                <Td><Badge variant={r.status === 'Ready' ? 'success' : 'warning'}>{r.status}</Badge></Td>
                <Td><span className="text-muted-foreground">{r.size}</span></Td>
                <Td>
                  <Btn variant="ghost" size="sm" disabled={r.status !== 'Ready'}>
                    <Download className="w-3.5 h-3.5" />
                  </Btn>
                </Td>
              </tr>
            ))}
          </tbody>
        </TblWrap>
      </Card>
    </div>
  )
}
