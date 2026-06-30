import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Printer, Banknote, CreditCard, Smartphone } from 'lucide-react'
import { PageHeader } from '../../../components/ui/PageHeader'
import { Button } from '../../../components/ui/Button'
import { Modal } from '../../../components/ui/Modal'
import { Badge } from '../../../components/ui/Badge'
import { mockOrders } from '../_data/mock'
import toast from 'react-hot-toast'

const paymentMethods = [
  { id: 'cash' as const, label: 'Cash', icon: Banknote },
  { id: 'card' as const, label: 'Card', icon: CreditCard },
  { id: 'upi' as const, label: 'UPI', icon: Smartphone },
]

export default function POSCheckout() {
  const navigate = useNavigate()
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'upi'>('cash')

  const billableOrders = mockOrders.filter(o => o.status === 'served' || o.status === 'billed')
  const selected = mockOrders.find(o => o.id === selectedOrderId)

  const handlePay = () => {
    setShowConfirm(false)
    toast.success(`Payment of Rs. ${selected?.total.toLocaleString()} collected via ${paymentMethod.toUpperCase()}`)
    setSelectedOrderId(null)
    navigate('/ops/pos')
  }

  return (
    <div>
      <PageHeader
        title="POS Checkout"
        description="Select a billed order to settle payment"
        breadcrumb={[{ label: 'Floor Plan', href: '/ops/pos' }, { label: 'Checkout' }]}
        actions={
          <Button variant="outline" onClick={() => navigate('/ops/pos')} icon={<ArrowLeft className="w-4 h-4" />}>
            Floor Plan
          </Button>
        }
      />

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-border shadow-sm">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-base font-semibold text-foreground">Ready to Bill</h3>
          </div>
          {billableOrders.length > 0 ? (
            <div className="divide-y divide-border">
              {billableOrders.map(o => (
                <button
                  key={o.id}
                  onClick={() => setSelectedOrderId(o.id)}
                  className={`w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors ${
                    selectedOrderId === o.id ? 'bg-primary/5' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">Table {o.table_number}</span>
                      <Badge variant="blue" size="sm">#{o.id}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{o.items.length} items · {o.waiter_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">Rs. {o.total.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">{o.created_at}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <p className="text-sm">No orders ready for billing</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <h3 className="text-base font-semibold text-foreground">Table {selected.table_number}</h3>
                  <p className="text-xs text-muted-foreground">Order #{selected.id}</p>
                </div>
                <Badge variant="blue">{selected.status}</Badge>
              </div>

              <div className="divide-y divide-border">
                {selected.items.map(item => (
                  <div key={item.id} className="flex justify-between py-2 text-sm">
                    <div>
                      <span className="text-foreground">{item.name}</span>
                      <span className="text-muted-foreground ml-1">x{item.quantity}</span>
                    </div>
                    <span className="font-medium">Rs. {(item.unit_price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>Rs. {selected.subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>Rs. {selected.tax.toLocaleString()}</span></div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                  <span>Total</span><span>Rs. {selected.total.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-3">Payment Method</p>
                <div className="grid grid-cols-3 gap-2">
                  {paymentMethods.map(m => {
                    const Icon = m.icon
                    return (
                      <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`flex flex-col items-center gap-1.5 py-3 rounded-xl text-xs font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                          paymentMethod === m.id
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-white border-border text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {m.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 justify-center" icon={<Printer className="w-4 h-4" />}>
                  Print
                </Button>
                <Button variant="primary" className="flex-1 justify-center" onClick={() => setShowConfirm(true)}>
                  Pay Rs. {selected.total.toLocaleString()}
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col items-center justify-center text-center h-48">
              <CreditCard className="w-8 h-8 text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">Select an order to process payment</p>
            </div>
          )}
        </div>
      </div>

      <Modal open={showConfirm} onClose={() => setShowConfirm(false)} title="Confirm Payment">
        <p className="text-sm text-muted-foreground">
          Collect <span className="font-semibold text-foreground">Rs. {selected?.total.toLocaleString()}</span> via <span className="font-medium text-foreground">{paymentMethod.toUpperCase()}</span> for Table {selected?.table_number}?
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancel</Button>
          <Button variant="primary" onClick={handlePay}>Confirm Payment</Button>
        </div>
      </Modal>
    </div>
  )
}
