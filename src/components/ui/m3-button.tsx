'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface M3ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal'
  size?: 'small' | 'medium' | 'large'
  icon?: React.ReactNode
  iconPosition?: 'leading' | 'trailing'
  fullWidth?: boolean
  loading?: boolean
}

export function M3Button({
  children,
  className,
  variant = 'filled',
  size = 'medium',
  icon,
  iconPosition = 'leading',
  fullWidth = false,
  loading = false,
  disabled,
  ...props
}: M3ButtonProps) {
  const baseClasses = [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-full',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-38 disabled:cursor-not-allowed',
    'relative overflow-hidden',
    fullWidth && 'w-full'
  ]

  const variantClasses = {
    filled: [
      'bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]',
      'hover:bg-[var(--md-sys-color-primary)]/90',
      'focus:ring-[var(--md-sys-color-primary)]',
      'shadow-[var(--md-sys-elevation-level1)]'
    ],
    outlined: [
      'border border-[var(--md-sys-color-outline)]',
      'text-[var(--md-sys-color-primary)]',
      'hover:bg-[var(--md-sys-color-primary)]/8',
      'focus:ring-[var(--md-sys-color-primary)]'
    ],
    text: [
      'text-[var(--md-sys-color-primary)]',
      'hover:bg-[var(--md-sys-color-primary)]/8',
      'focus:ring-[var(--md-sys-color-primary)]'
    ],
    elevated: [
      'bg-[var(--md-sys-color-surface-container-low)] text-[var(--md-sys-color-primary)]',
      'hover:bg-[var(--md-sys-color-primary)]/8',
      'focus:ring-[var(--md-sys-color-primary)]',
      'shadow-[var(--md-sys-elevation-level1)]'
    ],
    tonal: [
      'bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]',
      'hover:bg-[var(--md-sys-color-secondary-container)]/80',
      'focus:ring-[var(--md-sys-color-secondary)]'
    ]
  }

  const sizeClasses = {
    small: [
      'h-8 px-12 py-0',
      'text-[var(--md-sys-typescale-label-large-size)]',
      'leading-[var(--md-sys-typescale-label-large-line-height)]'
    ],
    medium: [
      'h-10 px-16 py-0',
      'text-[var(--md-sys-typescale-label-large-size)]',
      'leading-[var(--md-sys-typescale-label-large-line-height)]'
    ],
    large: [
      'h-12 px-20 py-0',
      'text-[var(--md-sys-typescale-label-large-size)]',
      'leading-[var(--md-sys-typescale-label-large-line-height)]'
    ]
  }

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {/* State layer for hover/press effects */}
      <div className="absolute inset-0 bg-current opacity-0 hover:opacity-[var(--md-sys-state-hover)] active:opacity-[var(--md-sys-state-pressed)] transition-opacity duration-150" />
      
      {/* Content */}
      <div className="relative flex items-center gap-2">
        {icon && iconPosition === 'leading' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
        
        {icon && iconPosition === 'trailing' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </div>
    </button>
  )
}
