import { forwardRef, useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  debounce?: number
  className?: string
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, placeholder = 'Search...', debounce = 300, className = '' }, ref) => {
    const [local, setLocal] = useState(value)
    const timer = useRef<ReturnType<typeof setTimeout>>()

    useEffect(() => {
      setLocal(value)
    }, [value])

    const handleChange = (val: string) => {
      setLocal(val)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => onChange(val), debounce)
    }

    return (
      <div className={`relative ${className}`}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          ref={ref}
          type="text"
          value={local}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-10 pl-9 pr-8 text-sm bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring hover:border-muted-foreground/30"
        />
        {local && (
          <button
            onClick={() => { setLocal(''); onChange('') }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'
