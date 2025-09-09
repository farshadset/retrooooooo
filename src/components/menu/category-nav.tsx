'use client'

import React, { useCallback, useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Category, NavbarStyle } from '@/types/menu'
import { cn } from '@/lib/utils'
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
  Grape
} from 'lucide-react'

// Icon mapping for categories - size based on navbar style
const getCategoryIcons = (iconSize: number): Record<string, React.ReactNode> => ({
  'coffee': <Coffee size={iconSize} />,
  'tea': <Coffee size={iconSize} />,
  'pizza': <Pizza size={iconSize} />,
  'burger': <Utensils size={iconSize} />,
  'dessert': <Cake size={iconSize} />,
  'cold-drinks': <GlassWater size={iconSize} />,
  'sandwich': <Sandwich size={iconSize} />,
  'salad': <Salad size={iconSize} />,
  'breakfast': <Sun size={iconSize} />,
  'special': <Star size={iconSize} />,
  'offers': <Gift size={iconSize} />,
  'hot': <Flame size={iconSize} />,
  'favorite': <Heart size={iconSize} />,
  'ice-cream': <IceCream size={iconSize} />,
  'seafood': <Fish size={iconSize} />,
  'meat': <Beef size={iconSize} />,
  'juice': <Grape size={iconSize} />
})

interface CategoryNavProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
  navbarStyle?: NavbarStyle
}

export default function CategoryNav({ categories, selectedCategory, onCategoryChange, navbarStyle = 'icon-with-text' }: CategoryNavProps) {
  const navRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  
  // Touch interaction states for mobile
  const [touchedButton, setTouchedButton] = useState<string | null>(null)
  const [touchStartTime, setTouchStartTime] = useState(0)

  // Two separate functions for different scenarios
  const getActiveCategoryWithoutDesserts = useCallback(() => {
    const navHeight = navRef.current?.offsetHeight || 0
    const extraOffset = 0 // Reduced to 0px to show first two items properly
    const currentScrollPosition = window.scrollY + navHeight + extraOffset
    
    // Find which category section is currently in view
    for (const category of categories) {
      const categorySection = document.getElementById(`category-${category.id}`)
      if (categorySection) {
        const sectionTop = categorySection.offsetTop
        const sectionBottom = sectionTop + categorySection.offsetHeight
        
        if (currentScrollPosition >= sectionTop && currentScrollPosition < sectionBottom) {
          return category.id
        }
      }
    }
    
    return selectedCategory
  }, [categories, selectedCategory])

  const getActiveCategoryWithDesserts = useCallback(() => {
    const navHeight = navRef.current?.offsetHeight || 0
    const extraOffset = 0 // Reduced to 0px to show first two items properly
    // Much lower detection point when desserts are visible
    const dessertsOffset = -450
    const currentScrollPosition = window.scrollY + navHeight + extraOffset + dessertsOffset
    
    console.log('Scroll Detection with Desserts Debug:', {
      windowScrollY: window.scrollY,
      navHeight,
      extraOffset,
      dessertsOffset,
      currentScrollPosition
    })
    
    // Find which category section is currently in view
    for (const category of categories) {
      const categorySection = document.getElementById(`category-${category.id}`)
      if (categorySection) {
        const sectionTop = categorySection.offsetTop
        const sectionBottom = sectionTop + categorySection.offsetHeight
        
        // Debug logging for first category
        if (category.id === categories[0]?.id) {
          console.log('Category Check with Desserts:', {
            categoryId: category.id,
            sectionTop,
            sectionBottom,
            currentScrollPosition,
            isInView: currentScrollPosition >= sectionTop && currentScrollPosition < sectionBottom
          })
        }
        
        if (currentScrollPosition >= sectionTop && currentScrollPosition < sectionBottom) {
          return category.id
        }
      }
    }
    
    return selectedCategory
  }, [categories, selectedCategory])

  // Main function that chooses the appropriate logic
  const getActiveCategoryFromScroll = useCallback(() => {
    // Check if desserts section is visible
    const dessertsSection = document.querySelector('section[class*="py-6 border-b border-gray-200"]')
    const dessertsHeight = dessertsSection ? dessertsSection.getBoundingClientRect().height : 0
    
    if (dessertsHeight > 0) {
      return getActiveCategoryWithDesserts()
    } else {
      return getActiveCategoryWithoutDesserts()
    }
  }, [getActiveCategoryWithDesserts, getActiveCategoryWithoutDesserts])

  // Handle scroll events to automatically update active category
  useEffect(() => {
    const handleScroll = () => {
      const newActiveCategory = getActiveCategoryFromScroll()
      if (newActiveCategory !== selectedCategory) {
        onCategoryChange(newActiveCategory)
      }
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScrollHandler, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler)
    }
  }, [getActiveCategoryFromScroll, selectedCategory, onCategoryChange])

  // Two separate click handlers for different scenarios
  const handleCategoryClickWithoutDesserts = useCallback((categoryId: string) => {
    const categorySection = document.getElementById(`category-${categoryId}`)
    if (categorySection) {
      const navHeight = navRef.current?.offsetHeight || 0
      const extraOffset = 0 // Reduced to 0px to show first two items properly
      const scrollPosition = categorySection.offsetTop - navHeight - extraOffset
      
      console.log('Category Click without Desserts Debug:', {
        categoryId,
        categoryTop: categorySection.offsetTop,
        navHeight,
        extraOffset,
        calculatedScrollPosition: scrollPosition
      })
      
      // Enhanced smooth scrolling for both mobile and desktop
      window.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: 'smooth'
      })
      
      // Fallback for browsers that don't support smooth scrolling
      if (!('scrollBehavior' in document.documentElement.style)) {
        const startPosition = window.pageYOffset
        const distance = scrollPosition - startPosition
        const duration = 500
        let start: number | null = null
        
        const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
          t /= d / 2
          if (t < 1) return c / 2 * t * t + b
          t--
          return -c / 2 * (t * (t - 2) - 1) + b
        }
        
        const animation = (currentTime: number) => {
          if (start === null) start = currentTime
          const timeElapsed = currentTime - start
          const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
          window.scrollTo(0, run)
          if (timeElapsed < duration) requestAnimationFrame(animation)
        }
        
        requestAnimationFrame(animation)
      }
    }
    
    onCategoryChange(categoryId)
  }, [onCategoryChange])

  const handleCategoryClickWithDesserts = useCallback((categoryId: string) => {
    const categorySection = document.getElementById(`category-${categoryId}`)
    if (categorySection) {
      const navHeight = navRef.current?.offsetHeight || 0
      const extraOffset = 0 // Reduced to 0px to show first two items properly
      // Much higher scroll position when desserts are visible
      const dessertsOffset = 450
      const scrollPosition = categorySection.offsetTop - navHeight - extraOffset + dessertsOffset
      
      console.log('Category Click with Desserts Debug:', {
        categoryId,
        categoryTop: categorySection.offsetTop,
        navHeight,
        extraOffset,
        dessertsOffset,
        calculatedScrollPosition: scrollPosition
      })
      
      // Enhanced smooth scrolling for both mobile and desktop
      window.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: 'smooth'
      })
      
      // Fallback for browsers that don't support smooth scrolling
      if (!('scrollBehavior' in document.documentElement.style)) {
        const startPosition = window.pageYOffset
        const distance = scrollPosition - startPosition
        const duration = 500
        let start: number | null = null
        
        const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
          t /= d / 2
          if (t < 1) return c / 2 * t * t + b
          t--
          return -c / 2 * (t * (t - 2) - 1) + b
        }
        
        const animation = (currentTime: number) => {
          if (start === null) start = currentTime
          const timeElapsed = currentTime - start
          const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
          window.scrollTo(0, run)
          if (timeElapsed < duration) requestAnimationFrame(animation)
        }
        
        requestAnimationFrame(animation)
      }
    }
    
    onCategoryChange(categoryId)
  }, [onCategoryChange])

  // Main click handler that chooses the appropriate logic
  const handleCategoryClick = useCallback((categoryId: string) => {
    // Check if desserts section is visible
    const dessertsSection = document.querySelector('section[class*="py-6 border-b border-gray-200"]')
    const dessertsHeight = dessertsSection ? dessertsSection.getBoundingClientRect().height : 0
    
    if (dessertsHeight > 0) {
      handleCategoryClickWithDesserts(categoryId)
    } else {
      handleCategoryClickWithoutDesserts(categoryId)
    }
  }, [handleCategoryClickWithDesserts, handleCategoryClickWithoutDesserts])

  // Mouse drag-to-scroll functionality
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!navRef.current) return
    
    setIsDragging(true)
    setStartX(e.pageX - navRef.current.offsetLeft)
    setScrollLeft(navRef.current.scrollLeft)
    navRef.current.style.cursor = 'grabbing'
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !navRef.current) return
    
    e.preventDefault()
    const x = e.pageX - navRef.current.offsetLeft
    const walk = (x - startX) * 2
    navRef.current.scrollLeft = scrollLeft - walk
  }, [isDragging, startX, scrollLeft])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    if (navRef.current) {
      navRef.current.style.cursor = 'grab'
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
    if (navRef.current) {
      navRef.current.style.cursor = 'grab'
    }
  }, [])

  // Touch event handlers for mobile interaction
  const handleButtonTouchStart = useCallback((categoryId: string) => {
    setTouchedButton(categoryId)
    setTouchStartTime(Date.now())
  }, [])

  const handleButtonTouchEnd = useCallback((categoryId: string) => {
    const touchDuration = Date.now() - touchStartTime
    
    // Only trigger click if touch was brief (not a scroll)
    if (touchDuration < 200) {
      // Add visual feedback
      setTimeout(() => {
        setTouchedButton(null)
        handleCategoryClick(categoryId)
      }, 100)
    } else {
      setTouchedButton(null)
    }
  }, [touchStartTime, handleCategoryClick])

  const handleButtonTouchCancel = useCallback(() => {
    setTouchedButton(null)
  }, [])

  // Get category icon with appropriate size based on navbar style
  const getCategoryIcon = (iconKey: string) => {
    const iconSize = getIconSize()
    const icons = getCategoryIcons(iconSize)
    return icons[iconKey] || <Coffee size={iconSize} />
  }

  // Get icon size based on navbar style - Mobile optimized
  const getIconSize = () => {
    switch (navbarStyle) {
      case 'icon-only':
        return 20 // Smaller for mobile, larger for desktop
      case 'icon-with-text':
        return 18 // Medium size for combined view
      case 'text-only':
      default:
        return 16 // Default size (not used in text-only)
    }
  }

  // Render category content based on navbar style - Mobile optimized
  const renderCategoryContent = (category: Category) => {
    switch (navbarStyle) {
      case 'text-only':
        return (
          <span className="text-xs sm:text-sm md:text-base font-medium">
            {category.name}
          </span>
        )
      
      case 'icon-only':
        return (
          <div className="flex items-center justify-center">
            {getCategoryIcon(category.icon)}
          </div>
        )
      
      case 'icon-with-text':
      default:
        return (
          <div className="flex flex-col items-center space-y-1 sm:space-y-1.5 md:space-y-2">
            <div className="flex items-center justify-center">
              {getCategoryIcon(category.icon)}
            </div>
            <span className="text-xs sm:text-sm md:text-sm font-medium text-center leading-tight">
              {category.name}
            </span>
          </div>
        )
    }
  }

  // Get dynamic sizing based on navbar style - Mobile optimized
  const getButtonClasses = () => {
    switch (navbarStyle) {
      case 'text-only':
        return "min-w-[70px] sm:min-w-[90px] md:min-w-[110px] px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 h-auto"
      
      case 'icon-only':
        return "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 p-1.5 sm:p-2"
      
      case 'icon-with-text':
      default:
        return "min-w-[75px] sm:min-w-[95px] md:min-w-[115px] px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 h-auto"
    }
  }

  return (
    <nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="mobile-container">
        <div 
          ref={navRef}
          className="flex gap-2 sm:gap-3 md:gap-4 py-2 sm:py-3 md:py-4 overflow-x-auto no-scrollbar cursor-grab select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category.id
            const isTouched = touchedButton === category.id
            return (
              <Button
                key={category.id}
                data-category={category.id}
                variant="ghost"
                size="sm"
                onClick={() => handleCategoryClick(category.id)}
                onTouchStart={() => handleButtonTouchStart(category.id)}
                onTouchEnd={() => handleButtonTouchEnd(category.id)}
                onTouchCancel={handleButtonTouchCancel}
                className={cn(
                  "flex-shrink-0",
                  getButtonClasses(),
                  "rounded-lg sm:rounded-xl border-2 transition-all duration-300 ease-in-out",
                  "bg-transparent backdrop-blur-md border-transparent",
                  "text-foreground font-medium font-body",
                  "hover:bg-secondary/70 hover:border-gold/50 hover:scale-105",
                  "active:scale-95",
                  // Touch feedback styles
                  isTouched && [
                    "bg-secondary/70 border-gold/50 scale-105",
                    "shadow-[0_0_12px_2px_hsl(var(--primary)/0.2)]"
                  ],
                  // Active state styles
                  isActive && [
                    "bg-primary text-primary-foreground",
                    "border-gold shadow-[0_0_12px_2px_hsl(var(--primary)/0.4)]",
                    "hover:bg-primary hover:border-gold hover:scale-100"
                  ]
                )}
              >
                {renderCategoryContent(category)}
              </Button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
