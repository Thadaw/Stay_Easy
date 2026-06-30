import { forwardRef, useState } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
  rightIcon?: ReactNode
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, rightIcon, helperText, id, className = '', placeholder, value, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const hasValue = value !== undefined && value !== '' && value !== 0
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <div className="w-full">
        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            value={value}
            placeholder={label && focused ? placeholder : placeholder || ' '}
            onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
            onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
            className={`
              w-full h-11 px-3.5 bg-white border rounded-xl text-sm text-foreground
              placeholder:text-muted-foreground/50
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring
              disabled:opacity-50 disabled:bg-muted disabled:cursor-not-allowed
              ${error ? 'border-destructive focus:ring-destructive/40 focus:border-destructive' : 'border-border hover:border-muted-foreground/30'}
              ${label ? 'pt-5 pb-1.5' : ''}
              ${icon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${className}
            `}
            {...props}
          />
          {label && (
            <label
              htmlFor={inputId}
              className={`
                absolute left-0 pointer-events-none transition-all duration-200
                ${icon ? 'left-10' : 'left-3.5'}
                ${hasValue || focused
                  ? 'top-1.5 text-[10px] text-muted-foreground'
                  : 'top-1/2 -translate-y-1/2 text-sm text-muted-foreground/70'}
              `}
            >
              {label}
            </label>
          )}
          {rightIcon && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-xs text-muted-foreground">{helperText}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'
