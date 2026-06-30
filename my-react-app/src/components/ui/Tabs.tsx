import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Tab {
  id: string
  label: string
  count?: number
  icon?: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
  variant?: 'underline' | 'pills'
  className?: string
}

export function Tabs({ tabs, active, onChange, variant = 'underline', className = '' }: TabsProps) {
  if (variant === 'pills') {
    return (
      <div className={`flex gap-1.5 ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              active === tab.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <span className="flex items-center gap-1.5">
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-[10px] ${active === tab.id ? 'opacity-70' : 'text-muted-foreground/60'}`}>
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex gap-0 border-b border-border ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
            active === tab.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <span className="flex items-center gap-1.5">
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className={`text-xs ${active === tab.id ? 'text-primary' : 'text-muted-foreground/60'}`}>
                {tab.count}
              </span>
            )}
          </span>
          {active === tab.id && (
            <motion.div
              layoutId="tab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
