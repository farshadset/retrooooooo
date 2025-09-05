'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface M3CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'filled' | 'outlined' | 'elevated'
  elevation?: 0 | 1 | 2 | 3 | 4 | 5
  interactive?: boolean
}

export function M3Card({
  children,
  className,
  variant = 'filled',
  elevation = 1,
  interactive = false,
  ...props
}: M3CardProps) {
  const baseClasses = [
    'rounded-[var(--md-sys-shape-corner-large)]',
    'transition-all duration-200 ease-in-out',
    'overflow-hidden'
  ]

  const variantClasses = {
    filled: [
      'bg-[var(--md-sys-color-surface-container)]',
      'text-[var(--md-sys-color-on-surface)]'
    ],
    outlined: [
      'bg-[var(--md-sys-color-surface)]',
      'text-[var(--md-sys-color-on-surface)]',
      'border border-[var(--md-sys-color-outline-variant)]'
    ],
    elevated: [
      'bg-[var(--md-sys-color-surface-container-low)]',
      'text-[var(--md-sys-color-on-surface)]'
    ]
  }

  const elevationClasses = {
    0: 'shadow-none',
    1: 'shadow-[var(--md-sys-elevation-level1)]',
    2: 'shadow-[var(--md-sys-elevation-level2)]',
    3: 'shadow-[var(--md-sys-elevation-level3)]',
    4: 'shadow-[var(--md-sys-elevation-level4)]',
    5: 'shadow-[var(--md-sys-elevation-level5)]'
  }

  const interactiveClasses = interactive ? [
    'cursor-pointer',
    'hover:shadow-[var(--md-sys-elevation-level2)]',
    'active:shadow-[var(--md-sys-elevation-level1)]',
    'focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)] focus:ring-offset-2'
  ] : []

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    elevationClasses[elevation],
    interactiveClasses,
    className
  )

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

interface M3CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'small' | 'medium' | 'large'
}

export function M3CardContent({
  children,
  className,
  padding = 'medium',
  ...props
}: M3CardContentProps) {
  const paddingClasses = {
    none: 'p-0',
    small: 'p-[var(--md-sys-spacing-sm)]',
    medium: 'p-[var(--md-sys-spacing-md)]',
    large: 'p-[var(--md-sys-spacing-lg)]'
  }

  const classes = cn(paddingClasses[padding], className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

interface M3CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export function M3CardHeader({
  children,
  className,
  title,
  subtitle,
  action,
  ...props
}: M3CardHeaderProps) {
  const classes = cn(
    'flex items-start justify-between p-[var(--md-sys-spacing-md)]',
    className
  )

  return (
    <div className={classes} {...props}>
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className="text-[var(--md-sys-typescale-title-large-size)] font-[var(--md-sys-typescale-title-large-weight)] leading-[var(--md-sys-typescale-title-large-line-height)] text-[var(--md-sys-color-on-surface)]">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="mt-1 text-[var(--md-sys-typescale-body-medium-size)] font-[var(--md-sys-typescale-body-medium-weight)] leading-[var(--md-sys-typescale-body-medium-line-height)] text-[var(--md-sys-color-on-surface-variant)]">
            {subtitle}
          </p>
        )}
        {children}
      </div>
      {action && (
        <div className="ml-[var(--md-sys-spacing-sm)] flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  )
}
