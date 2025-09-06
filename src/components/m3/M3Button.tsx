'use client'

import React from 'react'
import { Button, ButtonProps, Fab, FabProps } from '@mui/material'
import { motion, MotionProps } from 'framer-motion'
import { useM3Theme } from '@/contexts/M3ThemeContext'

interface M3ButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal'
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  motionProps?: MotionProps
}

interface M3FabProps extends Omit<FabProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'surface'
  size?: 'small' | 'medium' | 'large'
  motionProps?: MotionProps
}

export function M3Button({ 
  variant = 'filled', 
  size = 'medium', 
  loading = false,
  motionProps,
  children,
  sx,
  ...props 
}: M3ButtonProps) {
  const { theme } = useM3Theme()

  const getVariantProps = () => {
    switch (variant) {
      case 'filled':
        return {
          variant: 'contained' as const,
          sx: {
            backgroundColor: theme.colors.primary[40],
            color: theme.colors.primary[99],
            '&:hover': {
              backgroundColor: theme.colors.primary[30],
              boxShadow: theme.elevation[1].boxShadow
            },
            '&:active': {
              backgroundColor: theme.colors.primary[20]
            },
            ...sx
          }
        }
      case 'outlined':
        return {
          variant: 'outlined' as const,
          sx: {
            borderColor: theme.colors.outline.default,
            color: theme.colors.primary[40],
            '&:hover': {
              backgroundColor: theme.colors.primary[10],
              borderColor: theme.colors.primary[40]
            },
            ...sx
          }
        }
      case 'text':
        return {
          variant: 'text' as const,
          sx: {
            color: theme.colors.primary[40],
            '&:hover': {
              backgroundColor: theme.colors.primary[10]
            },
            ...sx
          }
        }
      case 'elevated':
        return {
          variant: 'contained' as const,
          sx: {
            backgroundColor: theme.colors.surface.container.low,
            color: theme.colors.primary[40],
            boxShadow: theme.elevation[1].boxShadow,
            '&:hover': {
              backgroundColor: theme.colors.surface.container.default,
              boxShadow: theme.elevation[2].boxShadow
            },
            ...sx
          }
        }
      case 'tonal':
        return {
          variant: 'contained' as const,
          sx: {
            backgroundColor: theme.colors.secondary[20],
            color: theme.colors.secondary[99],
            '&:hover': {
              backgroundColor: theme.colors.secondary[30]
            },
            ...sx
          }
        }
      default:
        return { variant: 'contained' as const, sx }
    }
  }

  const getSizeProps = () => {
    switch (size) {
      case 'small':
        return {
          size: 'small' as const,
          sx: {
            minHeight: '32px',
            padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
            fontSize: theme.typography.label.medium.fontSize,
            ...sx
          }
        }
      case 'large':
        return {
          size: 'large' as const,
          sx: {
            minHeight: '48px',
            padding: `${theme.spacing[3]} ${theme.spacing[5]}`,
            fontSize: theme.typography.label.large.fontSize,
            ...sx
          }
        }
      default:
        return {
          size: 'medium' as const,
          sx: {
            minHeight: '40px',
            padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
            fontSize: theme.typography.label.large.fontSize,
            ...sx
          }
        }
    }
  }

  const variantProps = getVariantProps()
  const sizeProps = getSizeProps()

  return (
    <Button
      {...props}
      {...variantProps}
      {...sizeProps}
      disabled={loading || props.disabled}
      className={`m3-button ${props.className || ''}`}
      style={{
        ...props.style,
        transition: 'all 0.2s ease-in-out',
        transform: 'scale(1)',
        ...(props.style?.transform && { transform: props.style.transform })
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)'
        props.onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        props.onMouseLeave?.(e)
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.98)'
        props.onMouseDown?.(e)
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)'
        props.onMouseUp?.(e)
      }}
    >
      {loading ? '...' : children}
    </Button>
  )
}

export function M3Fab({ 
  variant = 'primary', 
  size = 'medium',
  motionProps,
  children,
  sx,
  ...props 
}: M3FabProps) {
  const { theme } = useM3Theme()

  const getVariantProps = () => {
    switch (variant) {
      case 'primary':
        return {
          sx: {
            backgroundColor: theme.colors.primary[40],
            color: theme.colors.primary[99],
            '&:hover': {
              backgroundColor: theme.colors.primary[30]
            },
            ...sx
          }
        }
      case 'secondary':
        return {
          sx: {
            backgroundColor: theme.colors.secondary[40],
            color: theme.colors.secondary[99],
            '&:hover': {
              backgroundColor: theme.colors.secondary[30]
            },
            ...sx
          }
        }
      case 'tertiary':
        return {
          sx: {
            backgroundColor: theme.colors.tertiary[40],
            color: theme.colors.tertiary[99],
            '&:hover': {
              backgroundColor: theme.colors.tertiary[30]
            },
            ...sx
          }
        }
      case 'surface':
        return {
          sx: {
            backgroundColor: theme.colors.surface.container.high,
            color: theme.colors.primary[40],
            '&:hover': {
              backgroundColor: theme.colors.surface.container.highest
            },
            ...sx
          }
        }
      default:
        return { sx }
    }
  }

  const getSizeProps = () => {
    switch (size) {
      case 'small':
        return {
          size: 'small' as const,
          sx: {
            width: '40px',
            height: '40px',
            ...sx
          }
        }
      case 'large':
        return {
          size: 'large' as const,
          sx: {
            width: '64px',
            height: '64px',
            ...sx
          }
        }
      default:
        return {
          size: 'medium' as const,
          sx: {
            width: '56px',
            height: '56px',
            ...sx
          }
        }
    }
  }

  const variantProps = getVariantProps()
  const sizeProps = getSizeProps()

  return (
    <Fab
      {...props}
      {...variantProps}
      {...sizeProps}
      className={`m3-button ${props.className || ''}`}
      style={{
        ...props.style,
        transition: 'all 0.2s ease-in-out',
        transform: 'scale(1)',
        ...(props.style?.transform && { transform: props.style.transform })
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
        props.onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        props.onMouseLeave?.(e)
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)'
        props.onMouseDown?.(e)
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
        props.onMouseUp?.(e)
      }}
    >
      {children}
    </Fab>
  )
}



