import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent'
type Size = 'sm' | 'md' | 'lg'

export function Btn({
  children, variant = 'primary', size = 'md', className = '',
  onClick, disabled = false,
}: {
  children: ReactNode; variant?: Variant; size?: Size;
  className?: string; onClick?: () => void; disabled?: boolean;
}) {
  const base = 'inline-flex items-center gap-1.5 font-medium rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap'
  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-sm',
  }
  const variants: Record<Variant, string> = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm',
    accent: 'bg-[#2E86AB] text-white hover:bg-[#256f8f] shadow-sm',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/70',
    outline: 'border border-border bg-white text-foreground hover:bg-secondary',
    ghost: 'bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground',
    danger: 'bg-destructive text-white hover:bg-destructive/90 shadow-sm',
  }
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
