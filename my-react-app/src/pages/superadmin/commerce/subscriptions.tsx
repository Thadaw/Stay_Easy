import { Check } from 'lucide-react'
import { PageHdr } from '../../../components/layoutSA/PageHdr'
import { Btn } from '../../../components/common/Button'
import { Badge } from '../../../components/ui/Badge'
import { Card, CardHead, CardBody } from '../../../components/common/Card'
import { Th, Td, TblWrap } from '../../../components/layoutSA/Table'
import { tenantData } from '../_data/mockData'

const plans = [
  { name: 'Starter', price: 'Rs. ३,१६,८००', period: '/yr', color: '#93C5FD', features: ['१०० कोठासम्म', 'आधारभूत रिपोर्टिङ', 'इमेल समर्थन', 'एकल सम्पत्ति'], popular: false },
  { name: 'Professional', price: 'Rs. २३,७६,०००', period: '/yr', color: '#2E86AB', features: ['५०० कोठासम्म', 'उन्नत एनालिटिक्स', 'प्राथमिकता समर्थन', 'बहु-सम्पत्ति', 'च्यानल म्यानेजर'], popular: true },
  { name: 'Enterprise', price: 'Rs. ६३,३६,०००', period: '/yr', color: '#1A3C5E', features: ['असीमित कोठा', 'AI दर अनुकूलन', 'समर्पित प्रबन्धक', 'व्हाइट-लेबल पोर्टल', 'SSO/SAML', 'अनुकूल एकीकरण'], popular: false },
]

export default function Subscriptions() {
  const counts = tenantData.reduce((acc, t) => {
    acc[t.plan] = (acc[t.plan] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-5">
      <PageHdr title="Subscriptions" subtitle="Manage plans and pricing across all tenants" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(plan => (
          <Card key={plan.name} className={`p-6 relative ${plan.popular ? 'ring-2 ring-[#2E86AB]' : ''}`}>
            {plan.popular && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#2E86AB] text-white text-[10px] font-semibold px-3 py-0.5 rounded-full">Most Popular</span>
            )}
            <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
            <div className="mt-2 flex items-baseline gap-0.5">
              <span className="text-3xl font-bold text-foreground">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{counts[plan.name] || 0} tenants on this plan</p>
            <ul className="mt-4 space-y-2.5">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-foreground">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Btn variant={plan.popular ? 'accent' : 'outline'} className="w-full mt-6 justify-center">Assign Plan</Btn>
          </Card>
        ))}
      </div>

      <Card>
        <CardHead><h3 className="text-sm font-semibold text-foreground">Active Plans</h3></CardHead>
        <TblWrap>
          <thead><tr><Th>Tenant</Th><Th>Plan</Th><Th>Status</Th><Th>ARR</Th><Th>Renewal</Th></tr></thead>
          <tbody>
            {tenantData.slice(0, 5).map(t => (
              <tr key={t.id}>
                <Td>
                  <div className="font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.domain}</div>
                </Td>
                <Td><Badge variant={t.plan === 'Enterprise' ? 'info' : t.plan === 'Professional' ? 'default' : 'muted'}>{t.plan}</Badge></Td>
                <Td><Badge variant={t.status === 'Active' ? 'success' : t.status === 'Trial' ? 'warning' : 'danger'}>{t.status}</Badge></Td>
                <Td><span className="font-semibold">{t.arr}</span></Td>
                <Td><span className="text-muted-foreground">Dec 31, 2024</span></Td>
              </tr>
            ))}
          </tbody>
        </TblWrap>
      </Card>
    </div>
  )
}
