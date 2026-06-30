import { useNavigate } from 'react-router-dom'
import { Building2, Mail, Phone, Calendar, DollarSign, Activity, Users, ChevronLeft } from 'lucide-react'
import { PageHdr } from '../../../components/layoutSA/PageHdr'
import { Btn } from '../../../components/common/Button'
import { Badge } from '../../../components/ui/Badge'
import { Card, CardHead, CardBody } from '../../../components/common/Card'
import { tenantData } from '../_data/mockData'

export default function TenantDetails() {
  const navigate = useNavigate()
  const tenant = tenantData[0]

  return (
    <div className="space-y-5">
      <PageHdr
        title={tenant.name}
        subtitle={`${tenant.id} · Joined ${tenant.joined}`}
        action={
          <div className="flex gap-2">
            <Btn variant="outline" size="sm" onClick={() => navigate('/superadmin/tenants')}>
              <ChevronLeft className="w-3.5 h-3.5" /> Back
            </Btn>
            <Btn variant="primary" size="sm">Edit Tenant</Btn>
          </div>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        <Card className="xl:col-span-1 p-5">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#1A3C5E] flex items-center justify-center mb-3">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">{tenant.name}</h3>
            <Badge variant={tenant.status === 'Active' ? 'success' : tenant.status === 'Trial' ? 'warning' : 'danger'} className="mt-1">{tenant.status}</Badge>
            <div className="mt-4 w-full space-y-2 text-left">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Mail className="w-3.5 h-3.5" /> info@{tenant.domain}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Phone className="w-3.5 h-3.5" /> +९७७-१-४५२८७९</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="w-3.5 h-3.5" /> Joined {tenant.joined}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Users className="w-3.5 h-3.5" /> {tenant.rooms} rooms</div>
            </div>
          </div>
        </Card>

        <div className="xl:col-span-3 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Subscription</p>
              <p className="text-sm font-semibold text-foreground mt-1">{tenant.plan}</p>
              <p className="text-xs text-emerald-600 mt-0.5">{tenant.arr}/yr</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Rooms</p>
              <p className="text-sm font-semibold text-foreground mt-1">{tenant.rooms}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{tenant.owner}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">API Calls (30d)</p>
              <p className="text-sm font-semibold text-foreground mt-1">२८४.७K</p>
              <p className="text-xs text-emerald-600 mt-0.5">↑ १२.३%</p>
            </Card>
          </div>

          <Card>
            <CardHead><h3 className="text-sm font-semibold text-foreground">Recent Activity</h3></CardHead>
            <CardBody>
              <div className="space-y-3">
                {[
                  { action: 'Channel manager sync completed', time: '२ घण्टा अघि' },
                  { action: 'गर्मीको लागि मूल्य योजना अपडेट', time: '१ दिन अघि' },
                  { action: 'नयाँ बुकिङ: ५ कोठा - डिलक्स सुइट', time: '२ दिन अघि' },
                  { action: 'इनभ्वाइस #INV-4521 जेनरेट', time: '३ दिन अघि' },
                  { action: 'Rs. ५,२८,००० भुक्तानी प्राप्त', time: '५ दिन अघि' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-[#2E86AB] flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-foreground">{item.action}</p>
                      <p className="text-[10px] text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
