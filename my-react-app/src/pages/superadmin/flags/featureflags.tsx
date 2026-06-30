import { useState } from 'react'
import { Search } from 'lucide-react'
import { PageHdr } from '../../../components/layoutSA/PageHdr'
import { Badge } from '../../../components/ui/Badge'
import { Card, CardHead, CardBody } from '../../../components/common/Card'
import { Toggle } from '../../../components/layoutSA/Toggle'
import { featureFlagData } from '../_data/mockData'

export default function FeatureFlags() {
  const [search, setSearch] = useState('')
  const [flags, setFlags] = useState(featureFlagData)

  const toggle = (name: string) => {
    setFlags(prev => prev.map(f => f.name === name ? { ...f, status: !f.status } : f))
  }

  const filtered = flags.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <PageHdr title="Feature Flags" subtitle="Enable or disable platform modules per tier" />

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          placeholder="Search flags..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-border rounded-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#2E86AB]/25 focus:border-[#2E86AB] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(flag => (
          <Card key={flag.name}>
            <CardHead>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground font-mono">{flag.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{flag.description}</p>
                </div>
                <Toggle checked={flag.status} onChange={() => toggle(flag.name)} />
              </div>
            </CardHead>
            <CardBody>
              <div className="flex items-center gap-3">
                <Badge variant={flag.tier === 'Enterprise' ? 'info' : 'default'}>{flag.tier}</Badge>
                <span className="text-xs text-muted-foreground">Rollout: {flag.rollout}</span>
                <span className="text-xs text-muted-foreground ml-auto">Modified {flag.modified}</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}
