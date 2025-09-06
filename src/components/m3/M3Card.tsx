'use client'

import React from 'react'
import { Card, CardProps, CardContent, CardContentProps, CardActions, CardActionsProps } from '@mui/material'
import { motion, MotionProps } from 'framer-motion'
import { useM3Theme } from '@/contexts/M3ThemeContext'

interface M3CardProps extends Omit<CardProps, 'variant'> {
  variant?: 'filled' | 'outlined' | 'elevated'
  elevation?: 0 | 1 | 2 | 3 | 4 | 5
  motionProps?: MotionProps
}

interface M3CardContentProps extends CardContentProps {
  padding?: 'none' | 'small' | 'medium' | 'large'
}

interface M3CardActionsProps extends CardActionsProps {
  padding?: 'none' | 'small' | 'medium' | 'large'
}

export function M3Card({ 
  variant = 'filled', 
  elevation = 1,
  motionProps,
  children,
  sx,
  ...props 
}: M3CardProps) {
  const { theme } = useM3Theme()

  const getVariantProps = () => {
    switch (variant) {
      case 'filled':
        return {
          sx: {
            backgroundColor: theme.colors.surface.container.default,
            border: 'none',
            boxShadow: theme.elevation[elevation].boxShadow,
            ...sx
          }
        }
      case 'outlined':
        return {
          sx: {
            backgroundColor: theme.colors.surface.container.default,
            border: `1px solid ${theme.colors.outline.variant}`,
            boxShadow: 'none',
            ...sx
          }
        }
      case 'elevated':
        return {
          sx: {
            backgroundColor: theme.colors.surface.container.default,
            border: 'none',
            boxShadow: theme.elevation[elevation].boxShadow,
            ...sx
          }
        }
      default:
        return { sx }
    }
  }

  const variantProps = getVariantProps()
  return (
    <Card
      {...props}
      {...variantProps}
      className={`m3-card ${props.className || ''}`}
      style={{
        ...props.style,
        transition: 'all 0.2s ease-in-out',
        transform: 'translateY(0)',
        ...(props.style?.transform && { transform: props.style.transform })
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        const newElevation = Math.min(elevation + 1, 5) as keyof typeof theme.elevation
        e.currentTarget.style.boxShadow = theme.elevation[newElevation].boxShadow
        props.onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        const currentElevation = elevation as keyof typeof theme.elevation
        e.currentTarget.style.boxShadow = theme.elevation[currentElevation].boxShadow
        props.onMouseLeave?.(e)
      }}
    >
      {children}
    </Card>
  )
}

export function M3CardContent({ 
  padding = 'medium',
  children,
  sx,
  ...props 
}: M3CardContentProps) {
  const { theme } = useM3Theme()

  const getPaddingProps = () => {
    switch (padding) {
      case 'none':
        return { sx: { padding: 0, ...sx } }
      case 'small':
        return { sx: { padding: theme.spacing[2], ...sx } }
      case 'large':
        return { sx: { padding: theme.spacing[6], ...sx } }
      default:
        return { sx: { padding: theme.spacing[4], ...sx } }
    }
  }

  const paddingProps = getPaddingProps()

  return (
    <CardContent {...props} {...paddingProps}>
      {children}
    </CardContent>
  )
}

export function M3CardActions({ 
  padding = 'medium',
  children,
  sx,
  ...props 
}: M3CardActionsProps) {
  const { theme } = useM3Theme()

  const getPaddingProps = () => {
    switch (padding) {
      case 'none':
        return { sx: { padding: 0, ...sx } }
      case 'small':
        return { sx: { padding: theme.spacing[2], ...sx } }
      case 'large':
        return { sx: { padding: theme.spacing[6], ...sx } }
      default:
        return { sx: { padding: theme.spacing[4], ...sx } }
    }
  }

  const paddingProps = getPaddingProps()

  return (
    <CardActions {...props} {...paddingProps}>
      {children}
    </CardActions>
  )
}



