import type { ReactNode } from 'react'

const sizes = {
  sm: 'w-7 h-7 text-[10px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-11 h-11 text-sm',
} as const

interface AvatarProps {
  src?: string
  initials?: string
  alt?: string
  size?: keyof typeof sizes
  online?: boolean
  children?: ReactNode
  className?: string
}

export function Avatar({ src, initials, alt = '', size = 'md', online, children, className = '' }: AvatarProps) {
  return (
    <div className={`relative inline-flex flex-shrink-0 ${className}`}>
      {src ? (
        <img src={src} alt={alt} className={`rounded-full object-cover ${sizes[size]}`} />
      ) : (
        <div className={`rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold ${sizes[size]}`}>
          {children || initials?.[0] || '?'}
        </div>
      )}
      {online && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success border-2 border-white rounded-full" />
      )}
    </div>
  )
}
