import type { ReactNode } from 'react'

export function Th({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return (
    <th className={`px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide border-b border-border bg-secondary/40 ${className}`}>
      {children}
    </th>
  )
}

export function Td({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return (
    <td className={`px-4 py-3.5 text-sm text-foreground border-b border-border/40 ${className}`}>
      {children}
    </td>
  )
}

export function TblWrap({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">{children}</table>
    </div>
  )
}
