'use client'

import React from 'react'
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps, styled } from '@mui/material'
import { designTokens } from '@/design-tokens'

// Material Design 3 Typography variants
export interface M3TypographyProps extends Omit<MuiTypographyProps, 'variant'> {
  variant?: 'display-large' | 'display-medium' | 'display-small' |
           'headline-large' | 'headline-medium' | 'headline-small' |
           'title-large' | 'title-medium' | 'title-small' |
           'body-large' | 'body-medium' | 'body-small' |
           'label-large' | 'label-medium' | 'label-small'
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'on-surface' | 'on-surface-variant'
}

const StyledTypography = styled(MuiTypography, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'color',
})<M3TypographyProps>(({ theme, variant = 'body-large', color = 'on-surface' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'display-large':
        return {
          fontFamily: designTokens.typography.display.large.fontFamily,
          fontSize: designTokens.typography.display.large.fontSize,
          fontWeight: designTokens.typography.display.large.fontWeight,
          lineHeight: designTokens.typography.display.large.lineHeight,
          letterSpacing: designTokens.typography.display.large.letterSpacing,
        }
      case 'display-medium':
        return {
          fontFamily: designTokens.typography.display.medium.fontFamily,
          fontSize: designTokens.typography.display.medium.fontSize,
          fontWeight: designTokens.typography.display.medium.fontWeight,
          lineHeight: designTokens.typography.display.medium.lineHeight,
          letterSpacing: designTokens.typography.display.medium.letterSpacing,
        }
      case 'display-small':
        return {
          fontFamily: designTokens.typography.display.small.fontFamily,
          fontSize: designTokens.typography.display.small.fontSize,
          fontWeight: designTokens.typography.display.small.fontWeight,
          lineHeight: designTokens.typography.display.small.lineHeight,
          letterSpacing: designTokens.typography.display.small.letterSpacing,
        }
      case 'headline-large':
        return {
          fontFamily: designTokens.typography.headline.large.fontFamily,
          fontSize: designTokens.typography.headline.large.fontSize,
          fontWeight: designTokens.typography.headline.large.fontWeight,
          lineHeight: designTokens.typography.headline.large.lineHeight,
          letterSpacing: designTokens.typography.headline.large.letterSpacing,
        }
      case 'headline-medium':
        return {
          fontFamily: designTokens.typography.headline.medium.fontFamily,
          fontSize: designTokens.typography.headline.medium.fontSize,
          fontWeight: designTokens.typography.headline.medium.fontWeight,
          lineHeight: designTokens.typography.headline.medium.lineHeight,
          letterSpacing: designTokens.typography.headline.medium.letterSpacing,
        }
      case 'headline-small':
        return {
          fontFamily: designTokens.typography.headline.small.fontFamily,
          fontSize: designTokens.typography.headline.small.fontSize,
          fontWeight: designTokens.typography.headline.small.fontWeight,
          lineHeight: designTokens.typography.headline.small.lineHeight,
          letterSpacing: designTokens.typography.headline.small.letterSpacing,
        }
      case 'title-large':
        return {
          fontFamily: designTokens.typography.title.large.fontFamily,
          fontSize: designTokens.typography.title.large.fontSize,
          fontWeight: designTokens.typography.title.large.fontWeight,
          lineHeight: designTokens.typography.title.large.lineHeight,
          letterSpacing: designTokens.typography.title.large.letterSpacing,
        }
      case 'title-medium':
        return {
          fontFamily: designTokens.typography.title.medium.fontFamily,
          fontSize: designTokens.typography.title.medium.fontSize,
          fontWeight: designTokens.typography.title.medium.fontWeight,
          lineHeight: designTokens.typography.title.medium.lineHeight,
          letterSpacing: designTokens.typography.title.medium.letterSpacing,
        }
      case 'title-small':
        return {
          fontFamily: designTokens.typography.title.small.fontFamily,
          fontSize: designTokens.typography.title.small.fontSize,
          fontWeight: designTokens.typography.title.small.fontWeight,
          lineHeight: designTokens.typography.title.small.lineHeight,
          letterSpacing: designTokens.typography.title.small.letterSpacing,
        }
      case 'body-large':
        return {
          fontFamily: designTokens.typography.body.large.fontFamily,
          fontSize: designTokens.typography.body.large.fontSize,
          fontWeight: designTokens.typography.body.large.fontWeight,
          lineHeight: designTokens.typography.body.large.lineHeight,
          letterSpacing: designTokens.typography.body.large.letterSpacing,
        }
      case 'body-medium':
        return {
          fontFamily: designTokens.typography.body.medium.fontFamily,
          fontSize: designTokens.typography.body.medium.fontSize,
          fontWeight: designTokens.typography.body.medium.fontWeight,
          lineHeight: designTokens.typography.body.medium.lineHeight,
          letterSpacing: designTokens.typography.body.medium.letterSpacing,
        }
      case 'body-small':
        return {
          fontFamily: designTokens.typography.body.small.fontFamily,
          fontSize: designTokens.typography.body.small.fontSize,
          fontWeight: designTokens.typography.body.small.fontWeight,
          lineHeight: designTokens.typography.body.small.lineHeight,
          letterSpacing: designTokens.typography.body.small.letterSpacing,
        }
      case 'label-large':
        return {
          fontFamily: designTokens.typography.label.large.fontFamily,
          fontSize: designTokens.typography.label.large.fontSize,
          fontWeight: designTokens.typography.label.large.fontWeight,
          lineHeight: designTokens.typography.label.large.lineHeight,
          letterSpacing: designTokens.typography.label.large.letterSpacing,
        }
      case 'label-medium':
        return {
          fontFamily: designTokens.typography.label.medium.fontFamily,
          fontSize: designTokens.typography.label.medium.fontSize,
          fontWeight: designTokens.typography.label.medium.fontWeight,
          lineHeight: designTokens.typography.label.medium.lineHeight,
          letterSpacing: designTokens.typography.label.medium.letterSpacing,
        }
      case 'label-small':
        return {
          fontFamily: designTokens.typography.label.small.fontFamily,
          fontSize: designTokens.typography.label.small.fontSize,
          fontWeight: designTokens.typography.label.small.fontWeight,
          lineHeight: designTokens.typography.label.small.lineHeight,
          letterSpacing: designTokens.typography.label.small.letterSpacing,
        }
      default:
        return {}
    }
  }

  const getColorStyles = () => {
    switch (color) {
      case 'primary':
        return { color: designTokens.colors.primary[40] }
      case 'secondary':
        return { color: designTokens.colors.secondary[40] }
      case 'tertiary':
        return { color: designTokens.colors.tertiary[40] }
      case 'error':
        return { color: designTokens.colors.error[40] }
      case 'on-surface':
        return { color: designTokens.colors.neutral[10] }
      case 'on-surface-variant':
        return { color: designTokens.colors.neutral[50] }
      default:
        return {}
    }
  }

  return {
    ...getVariantStyles(),
    ...getColorStyles(),
  }
})

export function M3Typography({ children, variant = 'body-large', color = 'on-surface', ...props }: M3TypographyProps) {
  return (
    <StyledTypography variant={variant} color={color} {...props}>
      {children}
    </StyledTypography>
  )
}
