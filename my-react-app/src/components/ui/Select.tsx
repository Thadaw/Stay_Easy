import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
  floatingLabel?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, id, className = '', value, floatingLabel = true, ...props }, ref) => {
    const hasValue = value !== undefined && value !== '' && value !== 0
    const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <div className="w-full">
        {label && !floatingLabel && (
          <label htmlFor={selectId} className="block text-sm font-medium text-foreground mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            value={value}
            className={`
              w-full h-11 px-3.5 bg-white border rounded-xl text-sm text-foreground appearance-none
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring
              disabled:opacity-50 disabled:bg-muted disabled:cursor-not-allowed
              ${error ? 'border-destructive focus:ring-destructive/40' : 'border-border hover:border-muted-foreground/30'}
              ${label && floatingLabel ? 'pt-5 pb-1.5' : ''}
              pr-10
              ${className}
            `}
            {...props}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
            <ChevronDown className="w-4 h-4" />
          </div>
          {label && floatingLabel && (
            <label
              htmlFor={selectId}
              className={`
                absolute left-3.5 pointer-events-none transition-all duration-200
                ${hasValue || value
                  ? 'top-1.5 text-[10px] text-muted-foreground'
                  : 'top-1/2 -translate-y-1/2 text-sm text-muted-foreground/70'}
              `}
            >
              {label}
            </label>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
      </div>
    )
  },
)

Select.displayName = 'Select'
