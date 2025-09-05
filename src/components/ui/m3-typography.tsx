'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface M3TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 
    | 'display-large' | 'display-medium' | 'display-small'
    | 'headline-large' | 'headline-medium' | 'headline-small'
    | 'title-large' | 'title-medium' | 'title-small'
    | 'body-large' | 'body-medium' | 'body-small'
    | 'label-large' | 'label-medium' | 'label-small'
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'on-surface' | 'on-surface-variant'
  align?: 'left' | 'center' | 'right' | 'justify'
  as?: keyof JSX.IntrinsicElements
}

export function M3Typography({
  children,
  className,
  variant = 'body-medium',
  color = 'on-surface',
  align = 'left',
  as: Component = 'p',
  ...props
}: M3TypographyProps) {
  const variantClasses = {
    'display-large': [
      'text-[var(--md-sys-typescale-display-large-size)]',
      'font-[var(--md-sys-typescale-display-large-weight)]',
      'leading-[var(--md-sys-typescale-display-large-line-height)]',
      'font-[var(--md-sys-typescale-display-large-font)]'
    ],
    'display-medium': [
      'text-[var(--md-sys-typescale-display-medium-size)]',
      'font-[var(--md-sys-typescale-display-medium-weight)]',
      'leading-[var(--md-sys-typescale-display-medium-line-height)]',
      'font-[var(--md-sys-typescale-display-medium-font)]'
    ],
    'display-small': [
      'text-[var(--md-sys-typescale-display-small-size)]',
      'font-[var(--md-sys-typescale-display-small-weight)]',
      'leading-[var(--md-sys-typescale-display-small-line-height)]',
      'font-[var(--md-sys-typescale-display-small-font)]'
    ],
    'headline-large': [
      'text-[var(--md-sys-typescale-headline-large-size)]',
      'font-[var(--md-sys-typescale-headline-large-weight)]',
      'leading-[var(--md-sys-typescale-headline-large-line-height)]',
      'font-[var(--md-sys-typescale-headline-large-font)]'
    ],
    'headline-medium': [
      'text-[var(--md-sys-typescale-headline-medium-size)]',
      'font-[var(--md-sys-typescale-headline-medium-weight)]',
      'leading-[var(--md-sys-typescale-headline-medium-line-height)]',
      'font-[var(--md-sys-typescale-headline-medium-font)]'
    ],
    'headline-small': [
      'text-[var(--md-sys-typescale-headline-small-size)]',
      'font-[var(--md-sys-typescale-headline-small-weight)]',
      'leading-[var(--md-sys-typescale-headline-small-line-height)]',
      'font-[var(--md-sys-typescale-headline-small-font)]'
    ],
    'title-large': [
      'text-[var(--md-sys-typescale-title-large-size)]',
      'font-[var(--md-sys-typescale-title-large-weight)]',
      'leading-[var(--md-sys-typescale-title-large-line-height)]',
      'font-[var(--md-sys-typescale-title-large-font)]'
    ],
    'title-medium': [
      'text-[var(--md-sys-typescale-title-medium-size)]',
      'font-[var(--md-sys-typescale-title-medium-weight)]',
      'leading-[var(--md-sys-typescale-title-medium-line-height)]',
      'font-[var(--md-sys-typescale-title-medium-font)]'
    ],
    'title-small': [
      'text-[var(--md-sys-typescale-title-small-size)]',
      'font-[var(--md-sys-typescale-title-small-weight)]',
      'leading-[var(--md-sys-typescale-title-small-line-height)]',
      'font-[var(--md-sys-typescale-title-small-font)]'
    ],
    'body-large': [
      'text-[var(--md-sys-typescale-body-large-size)]',
      'font-[var(--md-sys-typescale-body-large-weight)]',
      'leading-[var(--md-sys-typescale-body-large-line-height)]',
      'font-[var(--md-sys-typescale-body-large-font)]'
    ],
    'body-medium': [
      'text-[var(--md-sys-typescale-body-medium-size)]',
      'font-[var(--md-sys-typescale-body-medium-weight)]',
      'leading-[var(--md-sys-typescale-body-medium-line-height)]',
      'font-[var(--md-sys-typescale-body-medium-font)]'
    ],
    'body-small': [
      'text-[var(--md-sys-typescale-body-small-size)]',
      'font-[var(--md-sys-typescale-body-small-weight)]',
      'leading-[var(--md-sys-typescale-body-small-line-height)]',
      'font-[var(--md-sys-typescale-body-small-font)]'
    ],
    'label-large': [
      'text-[var(--md-sys-typescale-label-large-size)]',
      'font-[var(--md-sys-typescale-label-large-weight)]',
      'leading-[var(--md-sys-typescale-label-large-line-height)]',
      'font-[var(--md-sys-typescale-label-large-font)]'
    ],
    'label-medium': [
      'text-[var(--md-sys-typescale-label-medium-size)]',
      'font-[var(--md-sys-typescale-label-medium-weight)]',
      'leading-[var(--md-sys-typescale-label-medium-line-height)]',
      'font-[var(--md-sys-typescale-label-medium-font)]'
    ],
    'label-small': [
      'text-[var(--md-sys-typescale-label-small-size)]',
      'font-[var(--md-sys-typescale-label-small-weight)]',
      'leading-[var(--md-sys-typescale-label-small-line-height)]',
      'font-[var(--md-sys-typescale-label-small-font)]'
    ]
  }

  const colorClasses = {
    primary: 'text-[var(--md-sys-color-primary)]',
    secondary: 'text-[var(--md-sys-color-secondary)]',
    tertiary: 'text-[var(--md-sys-color-tertiary)]',
    error: 'text-[var(--md-sys-color-error)]',
    'on-surface': 'text-[var(--md-sys-color-on-surface)]',
    'on-surface-variant': 'text-[var(--md-sys-color-on-surface-variant)]'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  }

  const classes = cn(
    variantClasses[variant],
    colorClasses[color],
    alignClasses[align],
    className
  )

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
