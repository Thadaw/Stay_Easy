import type { ReactNode } from 'react'

type Variant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted' | 'critical'

export function Badge({ children, variant = 'default', className = '' }: {
  children: ReactNode; variant?: Variant; className?: string;
}) {
  const variants: Record<Variant, string> = {
    default: 'bg-secondary text-secondary-foreground',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-red-50 text-red-600 border border-red-200',
    critical: 'bg-red-100 text-red-800 border border-red-300 font-semibold',
    info: 'bg-blue-50 text-[#2E86AB] border border-blue-200',
    muted: 'bg-muted text-muted-foreground',
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
