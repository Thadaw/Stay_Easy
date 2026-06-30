import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Utensils, Users, Clock } from 'lucide-react'
import { PageHeader } from '../../../components/ui/PageHeader'
import { mockSections, mockTables } from '../_data/mock'
import type { TableItem } from '../../../types'

const statusStyle: Record<string, string> = {
  available: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
  occupied: 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100',
  reserved: 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100',
  cleaning: 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100',
}

const statusDot: Record<string, string> = {
  available: 'bg-emerald-500',
  occupied: 'bg-red-500',
  reserved: 'bg-amber-500',
  cleaning: 'bg-blue-500',
}

export default function POSPage() {
  const navigate = useNavigate()
  const [selectedSection, setSelectedSection] = useState(mockSections[0].id)

  const section = mockSections.find(s => s.id === selectedSection)
  const tables = mockTables.filter(t => t.section_id === selectedSection)

  const handleTableClick = (table: TableItem) => {
    if (table.status === 'available' || table.status === 'occupied') {
      navigate(`/ops/pos/table?table=${table.id}`)
    }
  }

  return (
    <div>
      <PageHeader
        title="Floor Plan"
        description="Select a table to take or view an order"
        breadcrumb={[{ label: 'Restaurant', href: '/ops/pos' }, { label: 'Floor Plan' }]}
      />

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {mockSections.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedSection(s.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              selectedSection === s.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-white border border-border text-foreground hover:bg-muted'
            }`}
          >
            <Utensils className="w-4 h-4" />
            {s.name}
            {s.floor && <span className="text-xs opacity-60">Floor {s.floor}</span>}
          </button>
        ))}
      </div>

      {section && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              {section.name} — {tables.length} tables
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tables.map(table => (
              <button
                key={table.id}
                onClick={() => handleTableClick(table)}
                disabled={table.status === 'reserved' || table.status === 'cleaning'}
                aria-label={`Table ${table.number} - ${table.status}`}
                className={`relative flex flex-col items-center justify-center p-5 rounded-xl border-2 transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:opacity-50 disabled:cursor-not-allowed ${
                  statusStyle[table.status] || 'border-border bg-white'
                }`}
              >
                <span className={`absolute top-2.5 right-2.5 w-2 h-2 rounded-full ${statusDot[table.status]}`} />
                <span className="text-2xl font-bold leading-none">T{table.number}</span>
                <div className="flex items-center gap-1.5 mt-2 text-xs opacity-70">
                  <Users className="w-3.5 h-3.5" />
                  {table.capacity}
                </div>
                {table.status === 'occupied' && table.elapsed_minutes && (
                  <div className="flex items-center gap-1 mt-1 text-xs opacity-70">
                    <Clock className="w-3.5 h-3.5" />
                    {table.elapsed_minutes}m
                  </div>
                )}
                {table.waiter_name && (
                  <span className="mt-1 text-[10px] opacity-50">{table.waiter_name}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-5 mt-6 text-xs text-muted-foreground">
        {Object.entries(statusDot).map(([status, dot]) => (
          <div key={status} className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
            <span className="capitalize">{status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
