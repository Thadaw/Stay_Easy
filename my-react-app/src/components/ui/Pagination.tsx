import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
  pageSize?: number
}

export function Pagination({ page, totalPages, totalItems, onPageChange, pageSize = 25 }: PaginationProps) {
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages: (number | 'ellipsis')[] = []
    const delta = 2
    const left = Math.max(0, page - delta)
    const right = Math.min(totalPages - 1, page + delta)

    if (left > 0) { pages.push(0); if (left > 1) pages.push('ellipsis') }
    for (let i = left; i <= right; i++) pages.push(i)
    if (right < totalPages - 1) { if (right < totalPages - 2) pages.push('ellipsis'); pages.push(totalPages - 1) }

    return pages
  }

  return (
    <div className="flex items-center justify-between text-sm mt-4">
      <span className="text-xs text-muted-foreground">
        Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, totalItems)} of {totalItems}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          className="h-8 w-8 flex items-center justify-center rounded-lg border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {getPages().map((p, i) =>
          p === 'ellipsis' ? (
            <span key={`e${i}`} className="h-8 w-8 flex items-center justify-center text-xs text-muted-foreground">...</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`h-8 w-8 rounded-lg text-xs font-medium transition-colors ${
                p === page ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              {p + 1}
            </button>
          ),
        )}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
          className="h-8 w-8 flex items-center justify-center rounded-lg border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
