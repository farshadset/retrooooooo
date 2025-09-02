'use client'

import React, { useCallback, useRef, useEffect, useState } from 'react'
import { 
  Box, 
  Chip, 
  Container, 
  IconButton, 
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { 
  Coffee,
  Pizza,
  Utensils,
  Cake,
  GlassWater,
  Sandwich,
  Salad,
  Sun,
  Star,
  Gift,
  Flame,
  Heart,
  IceCream,
  Fish,
  Beef,
  Grape,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Category, NavbarStyle } from '@/types/menu'
import { designTokens } from '@/design-tokens'

// Icon mapping for categories
const getCategoryIcons = (): Record<string, React.ReactNode> => ({
  'coffee': <Coffee size={20} />,
  'tea': <Coffee size={20} />,
  'pizza': <Pizza size={20} />,
  'burger': <Utensils size={20} />,
  'dessert': <Cake size={20} />,
  'cold-drinks': <GlassWater size={20} />,
  'sandwich': <Sandwich size={20} />,
  'salad': <Salad size={20} />,
  'breakfast': <Sun size={20} />,
  'special': <Star size={20} />,
  'offers': <Gift size={20} />,
  'hot': <Flame size={20} />,
  'favorite': <Heart size={20} />,
  'ice-cream': <IceCream size={20} />,
  'seafood': <Fish size={20} />,
  'meat': <Beef size={20} />,
  'juice': <Grape size={20} />
})

interface M3CategoryNavProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
  navbarStyle?: NavbarStyle
}

export function M3CategoryNav({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  navbarStyle = 'default' 
}: M3CategoryNavProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // Check scroll position
  const checkScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }, [])

  // Scroll functions
  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }, [])

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }, [])

  // Handle category click
  const handleCategoryClick = useCallback((categoryId: string) => {
    onCategoryChange(categoryId)
  }, [onCategoryChange])

  // Check scroll position on mount and when categories change
  useEffect(() => {
    checkScrollPosition()
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition)
      return () => scrollContainer.removeEventListener('scroll', checkScrollPosition)
    }
  }, [checkScrollPosition, categories])

  // Auto-scroll to selected category
  useEffect(() => {
    if (scrollContainerRef.current && selectedCategory !== 'all') {
      const selectedElement = scrollContainerRef.current.querySelector(`[data-category="${selectedCategory}"]`)
      if (selectedElement) {
        selectedElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', 
          inline: 'center' 
        })
      }
    }
  }, [selectedCategory])

  if (isMobile) {
    // Mobile: Horizontal scrollable chips
    return (
      <Box
        sx={{
          backgroundColor: designTokens.colors.surface.container.default,
          borderBottom: `1px solid ${designTokens.colors.outline.variant}`,
          paddingY: designTokens.spacing[3],
          position: 'relative'
        }}
      >
        <Container maxWidth={false} sx={{ paddingX: designTokens.spacing[4] }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: designTokens.spacing[2] }}>
            {/* Scroll Left Button */}
            {canScrollLeft && (
              <IconButton
                onClick={scrollLeft}
                sx={{
                  minWidth: designTokens.mobile.touchTarget.min,
                  minHeight: designTokens.mobile.touchTarget.min,
                  backgroundColor: designTokens.colors.surface.container.high,
                  color: designTokens.colors.neutral[50],
                  '&:hover': {
                    backgroundColor: designTokens.colors.surface.container.highest,
                  }
                }}
              >
                <ChevronRight size={20} />
              </IconButton>
            )}

            {/* Categories */}
            <Box
              ref={scrollContainerRef}
              sx={{
                display: 'flex',
                gap: designTokens.spacing[2],
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none'
                },
                flex: 1
              }}
            >
              {/* All Categories Chip */}
              <Chip
                label="همه"
                onClick={() => handleCategoryClick('all')}
                variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
                sx={{
                  backgroundColor: selectedCategory === 'all' 
                    ? designTokens.colors.primary[40] 
                    : 'transparent',
                  color: selectedCategory === 'all' 
                    ? designTokens.colors.primary[100] 
                    : designTokens.colors.neutral[50],
                  borderColor: designTokens.colors.outline.default,
                  fontFamily: 'Vazirmatn, Roboto, sans-serif',
                  fontSize: designTokens.typography.label.medium.fontSize,
                  fontWeight: designTokens.typography.label.medium.fontWeight,
                  minHeight: designTokens.mobile.touchTarget.min,
                  '&:hover': {
                    backgroundColor: selectedCategory === 'all' 
                      ? designTokens.colors.primary[30] 
                      : designTokens.colors.surface.container.high,
                  }
                }}
              />

              {/* Category Chips */}
              {categories.map((category) => {
                const isSelected = selectedCategory === category.id
                const icon = getCategoryIcons()[category.id] || <Utensils size={20} />
                
                return (
                  <Chip
                    key={category.id}
                    data-category={category.id}
                    label={category.name}
                    icon={icon}
                    onClick={() => handleCategoryClick(category.id)}
                    variant={isSelected ? 'filled' : 'outlined'}
                    sx={{
                      backgroundColor: isSelected 
                        ? designTokens.colors.primary[40] 
                        : 'transparent',
                      color: isSelected 
                        ? designTokens.colors.primary[100] 
                        : designTokens.colors.neutral[50],
                      borderColor: designTokens.colors.outline.default,
                      fontFamily: 'Vazirmatn, Roboto, sans-serif',
                      fontSize: designTokens.typography.label.medium.fontSize,
                      fontWeight: designTokens.typography.label.medium.fontWeight,
                      minHeight: designTokens.mobile.touchTarget.min,
                      '& .MuiChip-icon': {
                        color: isSelected 
                          ? designTokens.colors.primary[100] 
                          : designTokens.colors.neutral[50],
                      },
                      '&:hover': {
                        backgroundColor: isSelected 
                          ? designTokens.colors.primary[30] 
                          : designTokens.colors.surface.container.high,
                      }
                    }}
                  />
                )
              })}
            </Box>

            {/* Scroll Right Button */}
            {canScrollRight && (
              <IconButton
                onClick={scrollRight}
                sx={{
                  minWidth: designTokens.mobile.touchTarget.min,
                  minHeight: designTokens.mobile.touchTarget.min,
                  backgroundColor: designTokens.colors.surface.container.high,
                  color: designTokens.colors.neutral[50],
                  '&:hover': {
                    backgroundColor: designTokens.colors.surface.container.highest,
                  }
                }}
              >
                <ChevronLeft size={20} />
              </IconButton>
            )}
          </Box>
        </Container>
      </Box>
    )
  }

  // Desktop: Full width with centered layout
  return (
    <Box
      sx={{
        backgroundColor: designTokens.colors.surface.container.default,
        borderBottom: `1px solid ${designTokens.colors.outline.variant}`,
        paddingY: designTokens.spacing[4]
      }}
    >
      <Container maxWidth="lg" sx={{ paddingX: designTokens.spacing[4] }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: designTokens.spacing[3],
            flexWrap: 'wrap'
          }}
        >
          {/* All Categories Chip */}
          <Chip
            label="همه"
            onClick={() => handleCategoryClick('all')}
            variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: selectedCategory === 'all' 
                ? designTokens.colors.primary[40] 
                : 'transparent',
              color: selectedCategory === 'all' 
                ? designTokens.colors.primary[100] 
                : designTokens.colors.neutral[50],
              borderColor: designTokens.colors.outline.default,
              fontFamily: 'Vazirmatn, Roboto, sans-serif',
              fontSize: designTokens.typography.label.large.fontSize,
              fontWeight: designTokens.typography.label.large.fontWeight,
              minHeight: designTokens.mobile.touchTarget.recommended,
              paddingX: designTokens.spacing[4],
              '&:hover': {
                backgroundColor: selectedCategory === 'all' 
                  ? designTokens.colors.primary[30] 
                  : designTokens.colors.surface.container.high,
              }
            }}
          />

          {/* Category Chips */}
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id
            const icon = getCategoryIcons()[category.id] || <Utensils size={20} />
            
            return (
              <Chip
                key={category.id}
                data-category={category.id}
                label={category.name}
                icon={icon}
                onClick={() => handleCategoryClick(category.id)}
                variant={isSelected ? 'filled' : 'outlined'}
                sx={{
                  backgroundColor: isSelected 
                    ? designTokens.colors.primary[40] 
                    : 'transparent',
                  color: isSelected 
                    ? designTokens.colors.primary[100] 
                    : designTokens.colors.neutral[50],
                  borderColor: designTokens.colors.outline.default,
                  fontFamily: 'Vazirmatn, Roboto, sans-serif',
                  fontSize: designTokens.typography.label.large.fontSize,
                  fontWeight: designTokens.typography.label.large.fontWeight,
                  minHeight: designTokens.mobile.touchTarget.recommended,
                  paddingX: designTokens.spacing[4],
                  '& .MuiChip-icon': {
                    color: isSelected 
                      ? designTokens.colors.primary[100] 
                      : designTokens.colors.neutral[50],
                  },
                  '&:hover': {
                    backgroundColor: isSelected 
                      ? designTokens.colors.primary[30] 
                      : designTokens.colors.surface.container.high,
                  }
                }}
              />
            )
          })}
        </Box>
      </Container>
    </Box>
  )
}
