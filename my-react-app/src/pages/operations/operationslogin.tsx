import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import logo1 from '../../assets/logos/logo1.png'

const demoAccounts: Record<string, { email: string; name: string }> = {
  front_desk: { email: 'frontdesk@stayeasy.io', name: 'Sita Sharma' },
  housekeeping: { email: 'housekeeping@stayeasy.io', name: 'Maya Gurung' },
  pos: { email: 'pos@stayeasy.io', name: 'Raj Thapa' },
  kds: { email: 'kds@stayeasy.io', name: 'Hari Poudel' },
  manager: { email: 'manager@stayeasy.io', name: 'Ramesh Adhikari' },
}

const redirectMap: Record<string, string> = {
  front_desk: '/ops/frontdesk',
  housekeeping: '/ops/housekeeping',
  pos: '/ops/pos',
  kds: '/ops/kds',
  manager: '/ops/frontdesk',
}

export default function OperationsLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [showDemo, setShowDemo] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    await new Promise<void>(r => setTimeout(r, 800))

    const entry = Object.entries(demoAccounts).find(([, acc]) => email === acc.email)

    if (entry && password === '123456') {
      const [role, acc] = entry
      localStorage.setItem('operator', JSON.stringify({
        id: 1, name: acc.name, email: acc.email, role,
        property_id: 1, property_name: 'Hotel Himalaya',
      }))
      navigate(redirectMap[role] || '/ops/frontdesk')
    } else {
      setError('Invalid email or password')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2 min-h-[600px]">

        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#0F172A] via-[#1A3C5E] to-[#2E86AB] text-white p-10">
          <div>
            <img src={logo1} alt="StayEasy" className="h-12 mb-6 brightness-0 invert" />
            <h1 className="text-3xl font-bold leading-tight">Operations Portal</h1>
            <p className="mt-3 text-blue-200/80 text-sm leading-relaxed">
              Manage front desk, housekeeping, POS, and kitchen operations — all in one place.
            </p>
          </div>
          <div className="space-y-4">
            {['Front Desk — Check-in / Check-out', 'Housekeeping — Room Status & Tasks', 'POS & KDS — Orders & Kitchen Display', 'Restaurant Analytics'].map(f => (
              <div key={f} className="flex items-center gap-3 text-sm text-blue-100/80">
                <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</div>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <div className="lg:hidden flex justify-center mb-6">
            <img src={logo1} alt="StayEasy" className="h-10" />
          </div>

          <h2 className="text-xl font-bold text-foreground">Welcome back</h2>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your dashboard</p>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-10 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} aria-label="Toggle password" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs">
              <label className="flex items-center gap-1.5 text-muted-foreground cursor-pointer">
                <input type="checkbox" className="rounded w-3.5 h-3.5 border-border accent-primary" /> Remember me
              </label>
              <button type="button" className="text-primary hover:underline">Forgot password?</button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm disabled:opacity-60"
            >
              {loading ? (
                <span className="flex justify-center">
                  <span className="h-4 w-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-5">
            <button
              type="button"
              onClick={() => setShowDemo(!showDemo)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              {showDemo ? 'Hide' : 'Use'} demo account
              <svg className={`w-3 h-3 transition-transform ${showDemo ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showDemo && (
              <div className="mt-3 rounded-xl border border-border bg-muted/30 p-4 text-xs space-y-2">
                <p className="font-semibold text-foreground">Demo credentials</p>
                <p className="text-muted-foreground">Password: <span className="font-mono text-foreground">123456</span></p>
                <div className="space-y-1 text-muted-foreground">
                  {Object.values(demoAccounts).map(a => (
                    <button
                      key={a.email}
                      type="button"
                      onClick={() => setEmail(a.email)}
                      className="block hover:text-foreground transition-colors"
                    >
                      {a.email}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
