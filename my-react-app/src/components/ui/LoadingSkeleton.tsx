interface LoadingSkeletonProps {
  variant?: 'table' | 'card' | 'stat' | 'custom'
  rows?: number
  className?: string
}

function Pulse({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-muted rounded-lg ${className}`} />
}

export function LoadingSkeleton({ variant = 'table', rows = 5, className = '' }: LoadingSkeletonProps) {
  if (variant === 'table') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex gap-4">
          <Pulse className="h-4 flex-1" />
          <Pulse className="h-4 flex-1" />
          <Pulse className="h-4 w-24" />
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Pulse className="h-3.5 flex-1" />
            <Pulse className="h-3.5 flex-1" />
            <Pulse className="h-3.5 w-24" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`space-y-3 ${className}`}>
        <Pulse className="h-5 w-3/4" />
        <Pulse className="h-3 w-full" />
        <Pulse className="h-3 w-5/6" />
        <Pulse className="h-3 w-2/3" />
      </div>
    )
  }

  if (variant === 'stat') {
    return (
      <div className={`space-y-2 ${className}`}>
        <Pulse className="h-3 w-16" />
        <Pulse className="h-7 w-20" />
      </div>
    )
  }

  return <Pulse className={`h-4 w-full ${className}`} />
}
