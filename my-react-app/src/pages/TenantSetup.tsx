import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import api from '../api'
import type { Tenant } from '../types'

export default function TenantSetup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await api.get<Tenant[]>('/tenants/')
        if (res.data.length > 0) {
          navigate('/host/portal', { replace: true })
          return
        }
      } catch {
        // no tenant yet — show form
      }
      setChecking(false)
    })()
  }, [navigate])

  const handleSubmit = async () => {
    setError('')
    if (!name.trim()) { setError('Tenant / brand name is required.'); return }
    setLoading(true)
    try {
      await api.post('/tenants/', { name: name.trim() })
      navigate('/host/portal')
    } catch (err) {
      let msg = 'Could not create tenant. Please try again.'
      if (err instanceof AxiosError && err.response?.data) {
        const data = err.response.data as Record<string, unknown>
        if (typeof data.detail === 'string') msg = data.detail
        else if (typeof data.message === 'string') msg = data.message
      }
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', background: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 14, color: '#999' }}>Checking account…</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ width: 420, background: '#fff', borderRadius: 16, padding: '36px 32px 42px', boxShadow: '0 8px 40px rgba(0,0,0,0.13)' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#111', marginBottom: 3 }}>
          Name your brand
        </div>
        <div style={{ fontSize: 12, color: '#999', marginBottom: 20 }}>
          This will be your tenant name for managing properties
        </div>

        <div style={{ marginBottom: 13 }}>
          <label style={{ fontSize: 11, color: '#666', marginBottom: 3, display: 'block', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            Tenant / Brand name
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Sunset Hospitality"
            autoComplete="off"
            style={{
              width: '100%', border: 'none', borderBottom: '1.5px solid #ddd',
              padding: '7px 4px 7px 0', fontSize: 14, color: '#111', outline: 'none', background: 'transparent',
            }}
          />
        </div>

        {error && (
          <p style={{ color: '#e94560', fontSize: 12, marginBottom: 10 }}>{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%', padding: 11, background: '#111', border: 'none', borderRadius: 8,
            color: '#fff', fontSize: 14, fontWeight: 600, cursor: loading ? 'default' : 'pointer',
            marginTop: 2, opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Setting up…' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
