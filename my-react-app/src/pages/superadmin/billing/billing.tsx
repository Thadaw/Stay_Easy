import { PageHdr } from '../../../components/layoutSA/PageHdr'
import { Badge } from '../../../components/ui/Badge'
import { Card, CardHead, CardBody } from '../../../components/common/Card'
import { Th, Td, TblWrap } from '../../../components/layoutSA/Table'

const invoices = [
  { id: 'INV-4521', tenant: 'Hotel Himalaya Pvt. Ltd.', amount: 'Rs. ५,२८,०००', status: 'Paid', date: 'असार २८, २०८१' },
  { id: 'INV-4520', tenant: 'Pokhara Lakeview Resort', amount: 'Rs. १,९८,०००', status: 'Paid', date: 'असार २५, २०८१' },
  { id: 'INV-4519', tenant: 'Nagarkot Heights Hotel', amount: 'Rs. १,९८,०००', status: 'Pending', date: 'असार २२, २०८१' },
  { id: 'INV-4518', tenant: 'Everest View Suites', amount: 'Rs. ५,२८,०००', status: 'Overdue', date: 'असार १५, २०८१' },
  { id: 'INV-4517', tenant: 'Bardia Jungle Resort', amount: 'Rs. १,९८,०००', status: 'Paid', date: 'असार १०, २०८१' },
]

export default function Billing() {
  return (
    <div className="space-y-5">
      <PageHdr title="Billing" subtitle="Invoices and revenue summary" />

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue (MTD)', value: 'Rs. १,११,३०,०००', change: '+९.४%', color: 'text-emerald-600' },
          { label: 'Pending Invoices', value: 'Rs. ५,९४,०००', change: '३ invoices', color: 'text-amber-600' },
          { label: 'Overdue', value: 'Rs. ५,२८,०००', change: '१ invoice', color: 'text-red-600' },
        ].map(item => (
          <Card key={item.label} className="p-4">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-xl font-semibold text-foreground mt-1">{item.value}</p>
            <p className={`text-xs mt-1 ${item.color}`}>{item.change}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHead><h3 className="text-sm font-semibold text-foreground">Recent Invoices</h3></CardHead>
        <TblWrap>
          <thead><tr><Th>Invoice</Th><Th>Tenant</Th><Th>Amount</Th><Th>Status</Th><Th>Date</Th></tr></thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id}>
                <Td><span className="font-medium text-foreground">{inv.id}</span></Td>
                <Td><span className="text-foreground">{inv.tenant}</span></Td>
                <Td><span className="font-semibold">{inv.amount}</span></Td>
                <Td><Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Pending' ? 'warning' : 'danger'}>{inv.status}</Badge></Td>
                <Td><span className="text-muted-foreground">{inv.date}</span></Td>
              </tr>
            ))}
          </tbody>
        </TblWrap>
      </Card>
    </div>
  )
}
