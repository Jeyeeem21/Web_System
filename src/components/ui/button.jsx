import React from 'react'
import { cn } from '../../lib/utils'

export const Button = React.forwardRef(({ 
  children, 
  className, 
  variant = 'default', 
  size = 'default',
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    default: 'bg-gradient-to-r from-[#D4AF37] to-[#C4A030] text-black hover:shadow-lg hover:-translate-y-0.5 focus:ring-[#D4AF37]',
    primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 hover:shadow-md focus:ring-gray-400',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-[#D4AF37] focus:ring-[#D4AF37]',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    success: 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-md focus:ring-red-500',
    warning: 'bg-yellow-500 text-black hover:bg-yellow-600 hover:shadow-md focus:ring-yellow-400',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1',
    default: 'px-4 py-2 text-sm gap-2',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  }
  
  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'
