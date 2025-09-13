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
  
  // iOS sticky positioning fallback
  const [isIOS, setIsIOS] = useState(false)

  // تشخیص iOS و تنظیم fallback برای sticky positioning
  useEffect(() => {
    const checkIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    setIsIOS(checkIOS)
    
    if (checkIOS && navRef.current) {
      // برای iOS، از position: fixed استفاده می‌کنیم
      const nav = navRef.current.parentElement
      if (nav) {
        nav.style.position = 'fixed'
        nav.style.top = '0'
        nav.style.left = '0'
        nav.style.right = '0'
        nav.style.zIndex = '9999'
      }
    }
  }, [])

  // Scroll spy functionality is now handled by useScrollSync hook in the parent component
  // This component only handles click navigation and visual feedback

  // Center active nav item functionality
  const scrollActiveItemIntoView = useCallback((activeCategoryId: string) => {
    if (!navRef.current) return

    const activeButton = navRef.current.querySelector(`[data-category="${activeCategoryId}"]`) as HTMLElement
    if (!activeButton) return

    const navContainer = navRef.current
    const containerRect = navContainer.getBoundingClientRect()
    const buttonRect = activeButton.getBoundingClientRect()
    
    // Calculate the center position
    const containerCenter = containerRect.left + containerRect.width / 2
    const buttonCenter = buttonRect.left + buttonRect.width / 2
    
    // Calculate scroll distance to center the button
    const scrollDistance = buttonCenter - containerCenter
    
    // Dynamic tolerance based on screen width for better mobile experience
    const tolerance = Math.max(30, window.innerWidth * 0.1) // 10% of screen width, min 30px
    if (Math.abs(scrollDistance) > tolerance) {
      // Smooth scroll to center the active item
      navContainer.scrollBy({
        left: scrollDistance,
        behavior: 'smooth'
      })

      console.log('Centering active nav item:', {
        activeCategoryId,
        scrollDistance,
        containerCenter,
        buttonCenter,
        tolerance
      })
    }
  }, [])

  // Effect to center active item when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      // Small delay to ensure the DOM is updated
      const timeoutId = setTimeout(() => {
        scrollActiveItemIntoView(selectedCategory)
      }, 150) // افزایش delay برای موبایل

      return () => clearTimeout(timeoutId)
    }
  }, [selectedCategory, scrollActiveItemIntoView])

  // Additional effect for initial load to center the first active item
  useEffect(() => {
    if (selectedCategory && navRef.current) {
      // Wait for the component to be fully rendered
      const timeoutId = setTimeout(() => {
        scrollActiveItemIntoView(selectedCategory)
      }, 300)

      return () => clearTimeout(timeoutId)
    }
  }, [selectedCategory, scrollActiveItemIntoView])

  // Mobile-optimized scroll function with combined approach
  const performSmoothScroll = useCallback((targetPosition: number, categoryId: string) => {
    // Check if it's mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                    window.innerWidth <= 768 || 
                    'ontouchstart' in window
    
    console.log('Mobile Detection:', { 
      isMobile, 
      userAgent: navigator.userAgent, 
      innerWidth: window.innerWidth,
      categoryId,
      targetPosition
    })
    
    if (isMobile) {
      // Combined approach: CSS fallback + JavaScript precision
      const categorySection = document.getElementById(`category-${categoryId}`)
      if (categorySection) {
        // First try CSS scroll-padding (simple approach)
        const hasScrollPadding = getComputedStyle(document.documentElement).scrollPaddingTop !== 'auto'
        
        if (hasScrollPadding && !isIOS) {
          // Use CSS scroll-padding for simple cases
          console.log('Using CSS scroll-padding approach')
          categorySection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          })
        } else {
          // Use JavaScript for precise control (iOS or complex cases)
          console.log('Using JavaScript precise approach')
          const navbarHeight = navRef.current?.offsetHeight || 0
          const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top') || '0')
          const totalOffset = navbarHeight + safeAreaTop + 20 // 20px extra margin
          
          const sectionTop = categorySection.offsetTop
          const finalScrollPosition = Math.max(0, sectionTop - totalOffset)
          
          console.log('Mobile Scroll Calculation:', {
            sectionTop,
            navbarHeight,
            safeAreaTop,
            totalOffset,
            finalScrollPosition
          })
          
          // Use smooth scroll with proper position
          window.scrollTo({
            top: finalScrollPosition,
            behavior: 'smooth'
          })
        }
        
        // Fallback for devices that don't support smooth scrolling
        if (!hasScrollPadding || isIOS) {
          setTimeout(() => {
            const currentScrollY = window.scrollY
            const expectedPosition = categorySection.offsetTop - (navRef.current?.offsetHeight || 0) - 20
            if (Math.abs(currentScrollY - expectedPosition) > 50) {
              console.log('Using manual animation fallback')
              // Manual animation fallback
              const startPosition = window.pageYOffset
              const distance = expectedPosition - startPosition
              const duration = 600
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
          }, 100)
        }
      }
    } else {
      // For desktop, use the original method
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      })
      
      // Fallback for browsers that don't support smooth scrolling
      if (!('scrollBehavior' in document.documentElement.style)) {
        const startPosition = window.pageYOffset
        const distance = targetPosition - startPosition
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
  }, [])

  // Simplified click handler for category navigation
  const handleCategoryClick = useCallback((categoryId: string) => {
    const categorySection = document.getElementById(`category-${categoryId}`)
    if (categorySection) {
      const navHeight = navRef.current?.offsetHeight || 0
      const extraOffset = 20 // Small offset for better visibility
      const scrollPosition = categorySection.offsetTop - navHeight - extraOffset
      
      console.log('Category Click Debug:', {
        categoryId,
        categoryTop: categorySection.offsetTop,
        navHeight,
        extraOffset,
        calculatedScrollPosition: scrollPosition
      })
      
      // Use the mobile-optimized scroll function
      performSmoothScroll(scrollPosition, categoryId)
    }
    
    onCategoryChange(categoryId)
  }, [onCategoryChange, performSmoothScroll])

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

  // Handle wheel events for horizontal scrolling
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (navRef.current) {
      e.preventDefault()
      const scrollAmount = e.deltaY * 2 // Adjust scroll sensitivity
      navRef.current.scrollLeft += scrollAmount
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
    const isActive = selectedCategory === category.id
    
    switch (navbarStyle) {
      case 'text-only':
        return (
          <span className={`text-xs sm:text-sm md:text-base font-medium ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>
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
            <span className={`text-xs sm:text-sm md:text-sm font-medium text-center leading-tight ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>
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
    <nav className={`sticky-nav sticky-nav-backdrop top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border shadow-sm ${isIOS ? 'ios-fixed-nav' : ''}`}>
      <div className="mobile-container">
        <div 
          ref={navRef}
          className="flex gap-2 sm:gap-3 md:gap-4 py-2 sm:py-3 md:py-4 overflow-x-auto no-scrollbar cursor-grab select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
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
                  // Default text color
                  !isActive && "text-foreground font-medium font-body",
                  // Active state text color - must come after default
                  isActive && "text-primary-foreground font-semibold",
                  "hover:bg-secondary/70 hover:border-secondary/50 hover:scale-105",
                  "active:scale-95",
                  // Touch feedback styles
                  isTouched && [
                    "bg-secondary/70 border-secondary/50 scale-105",
                    "shadow-[0_0_12px_2px_hsl(var(--primary)/0.2)]"
                  ],
                  // Active state styles - better contrast
                  isActive && [
                    "bg-primary text-primary-foreground",
                    "border-primary/20 shadow-[0_0_12px_2px_hsl(var(--primary)/0.4)]",
                    "hover:bg-primary hover:text-primary-foreground hover:border-primary/20 hover:scale-100",
                    "font-semibold" // اضافه کردن font weight برای contrast بهتر
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