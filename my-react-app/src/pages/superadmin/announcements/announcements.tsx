import { useState } from 'react'
import { Megaphone, Send } from 'lucide-react'
import { PageHdr } from '../../../components/layoutSA/PageHdr'
import { Btn } from '../../../components/common/Button'
import { Badge } from '../../../components/ui/Badge'
import { Card, CardHead, CardBody } from '../../../components/common/Card'
import { Th, Td, TblWrap } from '../../../components/layoutSA/Table'
import { announcementData } from '../_data/mockData'

export default function Announcements() {
  const [title, setTitle] = useState('')
  const [audience, setAudience] = useState('All Tenants')
  const [type, setType] = useState('General')

  return (
    <div className="space-y-5">
      <PageHdr title="Announcements" subtitle="Send platform-wide messages to tenants" />

      <Card>
        <CardHead><h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><Megaphone className="w-4 h-4 text-[#2E86AB]" /> New Announcement</h3></CardHead>
        <CardBody className="space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground block mb-1">Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 focus:border-[#2E86AB] transition-colors"
              placeholder="e.g. Scheduled Maintenance Notice"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 cursor-pointer"
              >
                <option>General</option>
                <option>Maintenance</option>
                <option>Feature Release</option>
                <option>Billing</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">Audience</label>
              <select
                value={audience}
                onChange={e => setAudience(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 cursor-pointer"
              >
                <option>All Tenants</option>
                <option>Enterprise</option>
                <option>Professional</option>
                <option>Starter</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-foreground block mb-1">Message</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 focus:border-[#2E86AB] transition-colors resize-none"
              placeholder="Write your announcement message..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <Btn variant="outline">Save as Draft</Btn>
            <Btn variant="accent"><Send className="w-3.5 h-3.5" /> Send Announcement</Btn>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHead><h3 className="text-sm font-semibold text-foreground">Announcement History</h3></CardHead>
        <TblWrap>
          <thead><tr><Th>Title</Th><Th>Type</Th><Th>Status</Th><Th>Audience</Th><Th>Sent</Th></tr></thead>
          <tbody>
            {announcementData.map(a => (
              <tr key={a.id}>
                <Td><span className="font-medium text-foreground">{a.title}</span></Td>
                <Td><Badge variant={a.type === 'Maintenance' ? 'warning' : a.type === 'Feature Release' ? 'info' : a.type === 'Billing' ? 'danger' : 'default'}>{a.type}</Badge></Td>
                <Td><Badge variant={a.status === 'Published' ? 'success' : a.status === 'Scheduled' ? 'info' : 'muted'}>{a.status}</Badge></Td>
                <Td><span className="text-muted-foreground">{a.audience}</span></Td>
                <Td><span className="text-muted-foreground">{a.sent}</span></Td>
              </tr>
            ))}
          </tbody>
        </TblWrap>
      </Card>
    </div>
  )
}
