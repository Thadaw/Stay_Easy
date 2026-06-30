import type { ReactNode } from 'react'

const variants = {
  navy: 'bg-primary/10 text-primary',
  blue: 'bg-blue-50 text-blue-700',
  amber: 'bg-amber-50 text-amber-700',
  emerald: 'bg-emerald-50 text-emerald-700',
  red: 'bg-red-50 text-red-700',
  gray: 'bg-muted text-muted-foreground',
  slate: 'bg-slate-100 text-slate-700',
} as const

const sizes = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
} as const

type Variant = keyof typeof variants
type Size = keyof typeof sizes

interface BadgeProps {
  variant?: Variant
  size?: Size
  dot?: boolean
  children: ReactNode
  className?: string
}

export function Badge({ variant = 'gray', size = 'md', dot, children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full leading-none ${variants[variant]} ${sizes[size]} ${className}`}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />}
      {children}
    </span>
  )
}
