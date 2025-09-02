'use client'

import React from 'react'
import { Button as MuiButton, ButtonProps as MuiButtonProps, styled } from '@mui/material'
import { designTokens } from '@/design-tokens'

// Material Design 3 Button variants
export interface M3ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal'
  size?: 'small' | 'medium' | 'large'
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size',
})<M3ButtonProps>(({ theme, variant = 'filled', size = 'medium' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: designTokens.colors.primary[40],
          color: designTokens.colors.primary[100],
          border: 'none',
          boxShadow: designTokens.elevation[0],
          '&:hover': {
            backgroundColor: designTokens.colors.primary[30],
            boxShadow: designTokens.elevation[1],
          },
          '&:active': {
            backgroundColor: designTokens.colors.primary[20],
            boxShadow: designTokens.elevation[0],
          },
          '&:disabled': {
            backgroundColor: designTokens.colors.neutral[90],
            color: designTokens.colors.neutral[60],
          },
        }
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          color: designTokens.colors.primary[40],
          border: `1px solid ${designTokens.colors.outline.default}`,
          boxShadow: designTokens.elevation[0],
          '&:hover': {
            backgroundColor: designTokens.colors.primary[95],
            borderColor: designTokens.colors.primary[40],
            boxShadow: designTokens.elevation[1],
          },
          '&:active': {
            backgroundColor: designTokens.colors.primary[90],
            boxShadow: designTokens.elevation[0],
          },
          '&:disabled': {
            backgroundColor: 'transparent',
            color: designTokens.colors.neutral[60],
            borderColor: designTokens.colors.neutral[80],
          },
        }
      case 'text':
        return {
          backgroundColor: 'transparent',
          color: designTokens.colors.primary[40],
          border: 'none',
          boxShadow: designTokens.elevation[0],
          '&:hover': {
            backgroundColor: designTokens.colors.primary[95],
            boxShadow: designTokens.elevation[0],
          },
          '&:active': {
            backgroundColor: designTokens.colors.primary[90],
            boxShadow: designTokens.elevation[0],
          },
          '&:disabled': {
            backgroundColor: 'transparent',
            color: designTokens.colors.neutral[60],
          },
        }
      case 'elevated':
        return {
          backgroundColor: designTokens.colors.surface.container.lowest,
          color: designTokens.colors.primary[40],
          border: 'none',
          boxShadow: designTokens.elevation[1],
          '&:hover': {
            backgroundColor: designTokens.colors.surface.container.low,
            boxShadow: designTokens.elevation[2],
          },
          '&:active': {
            backgroundColor: designTokens.colors.surface.container.default,
            boxShadow: designTokens.elevation[1],
          },
          '&:disabled': {
            backgroundColor: designTokens.colors.surface.container.lowest,
            color: designTokens.colors.neutral[60],
            boxShadow: designTokens.elevation[0],
          },
        }
      case 'tonal':
        return {
          backgroundColor: designTokens.colors.secondary[90],
          color: designTokens.colors.secondary[10],
          border: 'none',
          boxShadow: designTokens.elevation[0],
          '&:hover': {
            backgroundColor: designTokens.colors.secondary[80],
            boxShadow: designTokens.elevation[1],
          },
          '&:active': {
            backgroundColor: designTokens.colors.secondary[70],
            boxShadow: designTokens.elevation[0],
          },
          '&:disabled': {
            backgroundColor: designTokens.colors.neutral[90],
            color: designTokens.colors.neutral[60],
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
          minHeight: designTokens.mobile.touchTarget.min,
          padding: `${designTokens.spacing[2]} ${designTokens.spacing[4]}`,
          fontSize: designTokens.typography.label.medium.fontSize,
          fontWeight: designTokens.typography.label.medium.fontWeight,
          lineHeight: designTokens.typography.label.medium.lineHeight,
          borderRadius: designTokens.radius.full,
        }
      case 'medium':
        return {
          minHeight: designTokens.mobile.touchTarget.recommended,
          padding: `${designTokens.spacing[3]} ${designTokens.spacing[6]}`,
          fontSize: designTokens.typography.label.large.fontSize,
          fontWeight: designTokens.typography.label.large.fontWeight,
          lineHeight: designTokens.typography.label.large.lineHeight,
          borderRadius: designTokens.radius.full,
        }
      case 'large':
        return {
          minHeight: '64px',
          padding: `${designTokens.spacing[4]} ${designTokens.spacing[8]}`,
          fontSize: designTokens.typography.title.medium.fontSize,
          fontWeight: designTokens.typography.title.medium.fontWeight,
          lineHeight: designTokens.typography.title.medium.lineHeight,
          borderRadius: designTokens.radius.full,
        }
      default:
        return {}
    }
  }

  return {
    fontFamily: 'Vazirmatn, Roboto, sans-serif',
    textTransform: 'none',
    transition: `all ${designTokens.motion.duration.medium2} ${designTokens.motion.easing.standard}`,
    ...getVariantStyles(),
    ...getSizeStyles(),
  }
})

export function M3Button({ children, variant = 'filled', size = 'medium', ...props }: M3ButtonProps) {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  )
}
