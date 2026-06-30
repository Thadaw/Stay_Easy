import { Card, CardHead, CardBody } from '../../../components/common/Card'
import { PageHdr } from '../../../components/layoutSA/PageHdr'
import { Badge } from '../../../components/ui/Badge'
import { Th, Td, TblWrap } from '../../../components/layoutSA/Table'

const services = [
  { name: 'API Gateway', status: 'Operational', uptime: '99.98%', color: 'bg-emerald-500' },
  { name: 'Database Cluster', status: 'Operational', uptime: '99.95%', color: 'bg-emerald-500' },
  { name: 'Cache (Redis)', status: 'Operational', uptime: '99.99%', color: 'bg-emerald-500' },
  { name: 'Queue (RabbitMQ)', status: 'Operational', uptime: '99.87%', color: 'bg-emerald-500' },
  { name: 'File Storage (S3)', status: 'Degraded', uptime: '98.21%', color: 'bg-amber-500' },
  { name: 'Email Service', status: 'Operational', uptime: '99.92%', color: 'bg-emerald-500' },
]

const usage = [
  { label: 'CPU', used: 62, total: '16 Cores', color: '#2E86AB' },
  { label: 'Memory', used: 74, total: '32 GB', color: '#059669' },
  { label: 'Disk', used: 67, total: '500 GB', color: '#D97706' },
  { label: 'Network', used: 38, total: '10 Gbps', color: '#7C3AED' },
]

const logs = [
  { time: '14:32:11', level: 'INFO', message: 'Health check passed — all services OK', source: 'monitor' },
  { time: '14:28:03', level: 'WARN', message: 'Disk usage on node-3 above 80% threshold', source: 'node-3' },
  { time: '14:25:47', level: 'ERROR', message: 'S3 upload timeout after 30s — retrying', source: 'storage' },
  { time: '14:20:00', level: 'INFO', message: 'Queue depth normalized to 124 messages', source: 'queue' },
  { time: '14:15:22', level: 'INFO', message: 'Cache hit ratio at 87%', source: 'redis' },
]

export default function SystemHealth() {
  return (
    <div className="space-y-5">
      <PageHdr title="Health Monitor" subtitle="Real-time platform service status and resource usage" />

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {services.map(s => (
          <Card key={s.name} className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${s.color} flex-shrink-0`} />
              <span className="text-xs font-semibold text-foreground">{s.name}</span>
            </div>
            <p className="text-[11px] text-muted-foreground">{s.status}</p>
            <p className="text-xs font-medium text-foreground">{s.uptime}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card>
          <CardHead><h3 className="text-sm font-semibold text-foreground">Server Usage</h3></CardHead>
          <CardBody className="space-y-4">
            {usage.map(u => (
              <div key={u.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">{u.label}</span>
                  <span className="text-xs font-medium text-foreground">{u.used}% of {u.total}</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${u.used}%`, backgroundColor: u.color }} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHead><h3 className="text-sm font-semibold text-foreground">Recent Logs</h3></CardHead>
          <div className="divide-y divide-border/50 max-h-[240px] overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className="px-5 py-2.5 text-xs">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-muted-foreground font-mono">{log.time}</span>
                  <Badge variant={log.level === 'ERROR' ? 'danger' : log.level === 'WARN' ? 'warning' : 'muted'}>{log.level}</Badge>
                </div>
                <p className="text-foreground">{log.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
