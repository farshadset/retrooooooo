'use client'

import React from 'react'
import { Card as MuiCard, CardProps as MuiCardProps, styled } from '@mui/material'
import { designTokens } from '@/design-tokens'

// Material Design 3 Card variants
export interface M3CardProps extends Omit<MuiCardProps, 'variant'> {
  variant?: 'elevated' | 'filled' | 'outlined'
  size?: 'small' | 'medium' | 'large'
}

const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size',
})<M3CardProps>(({ theme, variant = 'elevated', size = 'medium' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: designTokens.colors.surface.container.lowest,
          border: 'none',
          boxShadow: designTokens.elevation[1],
          '&:hover': {
            boxShadow: designTokens.elevation[2],
          },
        }
      case 'filled':
        return {
          backgroundColor: designTokens.colors.surface.container.default,
          border: 'none',
          boxShadow: designTokens.elevation[0],
          '&:hover': {
            backgroundColor: designTokens.colors.surface.container.high,
          },
        }
      case 'outlined':
        return {
          backgroundColor: designTokens.colors.surface.container.lowest,
          border: `1px solid ${designTokens.colors.outline.variant}`,
          boxShadow: designTokens.elevation[0],
          '&:hover': {
            borderColor: designTokens.colors.outline.default,
            boxShadow: designTokens.elevation[1],
          },
        }
      default:
        return {}
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          borderRadius: designTokens.radius.sm,
          padding: designTokens.spacing[3],
        }
      case 'medium':
        return {
          borderRadius: designTokens.radius.md,
          padding: designTokens.spacing[4],
        }
      case 'large':
        return {
          borderRadius: designTokens.radius.lg,
          padding: designTokens.spacing[6],
        }
      default:
        return {}
    }
  }

  return {
    transition: `all ${designTokens.motion.duration.medium2} ${designTokens.motion.easing.standard}`,
    ...getVariantStyles(),
    ...getSizeStyles(),
  }
})

export function M3Card({ children, variant = 'elevated', size = 'medium', ...props }: M3CardProps) {
  return (
    <StyledCard variant={variant} size={size} {...props}>
      {children}
    </StyledCard>
  )
}
