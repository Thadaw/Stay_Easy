import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Plus, Minus, Soup, Leaf } from 'lucide-react'
import { PageHeader } from '../../../components/ui/PageHeader'
import { Button } from '../../../components/ui/Button'
import { Badge } from '../../../components/ui/Badge'
import { SearchInput } from '../../../components/ui/SearchInput'
import { mockMenuItems, mockTables } from '../_data/mock'
import type { MenuItem } from '../../../types'
import toast from 'react-hot-toast'

interface CartItem {
  menuItem: MenuItem
  quantity: number
}

export default function TableOrder() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tableId = searchParams.get('table') || ''
  const table = mockTables.find(t => t.id === tableId)

  const [category, setCategory] = useState('Starters')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [vegOnly, setVegOnly] = useState(false)

  const categories = [...new Set(mockMenuItems.map(m => m.category))]

  const filtered = mockMenuItems.filter(m => {
    if (!m.is_available) return false
    if (category && m.category !== category) return false
    if (vegOnly && !m.is_veg) return false
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.menuItem.id === item.id)
      if (existing) return prev.map(c => c.menuItem.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)
      return [...prev, { menuItem: item, quantity: 1 }]
    })
    toast.success(`${item.name} added`, { position: 'bottom-left', duration: 1500 })
  }

  const updateQty = (itemId: string, delta: number) => {
    setCart(prev => prev.map(c =>
      c.menuItem.id === itemId ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c
    ).filter(c => c.quantity > 0))
  }

  const subtotal = cart.reduce((sum, c) => sum + c.menuItem.price * c.quantity, 0)
  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + tax

  const handleSubmit = () => {
    if (cart.length === 0) return
    toast.success(`Order submitted for Table ${table?.number || tableId}!`)
    setCart([])
  }

  return (
    <div>
      <PageHeader
        title={table ? `Table ${table.number}` : 'New Order'}
        description={table ? `${table.capacity} seats — ${table.section_id.replace('S-', 'Section ')}` : 'Select items to order'}
        breadcrumb={[{ label: 'Floor Plan', href: '/ops/pos' }, { label: table ? `Table ${table.number}` : 'New Order' }]}
        actions={
          <Button variant="outline" onClick={() => navigate('/ops/pos')} icon={<ArrowLeft className="w-4 h-4" />}>
            Floor Plan
          </Button>
        }
      />

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-3 space-y-1">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  category === c ? 'bg-primary text-primary-foreground shadow-sm' : 'text-foreground hover:bg-muted'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 max-w-xs">
              <SearchInput value={search} onChange={setSearch} placeholder="Search menu..." />
            </div>
            <button
              onClick={() => setVegOnly(!vegOnly)}
              aria-pressed={vegOnly}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                vegOnly ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-white border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              Veg Only
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map(item => (
              <button
                key={item.id}
                onClick={() => addToCart(item)}
                className="bg-white rounded-2xl border border-border p-4 text-left hover:border-primary/40 hover:shadow-sm transition-all min-h-[90px]"
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    {item.is_veg && <Leaf className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />}
                    <span className="text-sm font-medium text-foreground line-clamp-2">{item.name}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-foreground">Rs. {item.price}</span>
                  <span className="text-[10px] text-muted-foreground">{item.prep_time} min</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="gray" size="sm">{tag}</Badge>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col h-fit sticky top-6">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Current Order</h3>
              <p className="text-xs text-muted-foreground">{cart.length} items</p>
            </div>

            {cart.length > 0 ? (
              <>
                <div className="flex-1 divide-y divide-border max-h-[420px] overflow-y-auto">
                  {cart.map(c => (
                    <div key={c.menuItem.id} className="px-5 py-3">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate">{c.menuItem.name}</p>
                          <p className="text-xs text-muted-foreground">Rs. {c.menuItem.price}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-3">
                          <button
                            onClick={() => updateQty(c.menuItem.id, -1)}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">{c.quantity}</span>
                          <button
                            onClick={() => updateQty(c.menuItem.id, 1)}
                            aria-label="Increase quantity"
                            className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-right text-muted-foreground mt-1">
                        Rs. {(c.menuItem.price * c.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-4 border-t border-border space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Tax (10%)</span><span>Rs. {tax.toLocaleString()}</span></div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                    <span>Total</span><span>Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="px-5 py-4 border-t border-border">
                  <Button variant="primary" className="w-full justify-center" onClick={handleSubmit}>
                    Submit Order — Rs. {total.toLocaleString()}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Soup className="w-10 h-10 mb-3 opacity-30" />
                <p className="text-sm font-medium">Cart is empty</p>
                <p className="text-xs mt-1">Tap items from the menu</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
