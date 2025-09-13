'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface UseScrollSyncProps {
  categories: string[]
  offset?: number
  threshold?: number
  dessertsSectionHeight?: number
}

export function useScrollSync({ 
  categories, 
  offset = 120, // بهتر برای موبایل
  threshold = 0.3, // کاهش threshold برای حساسیت بیشتر
  dessertsSectionHeight = 0
}: UseScrollSyncProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || '')
  const observerRef = useRef<IntersectionObserver | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastActiveCategoryRef = useRef<string>(categories[0] || '')
  const isUpdatingRef = useRef<boolean>(false)
  const sectionElementsRef = useRef<Map<string, HTMLElement>>(new Map())

  const updateActiveCategory = useCallback((categoryId: string) => {
    // Prevent rapid state updates that cause flickering
    if (isUpdatingRef.current || lastActiveCategoryRef.current === categoryId) {
      return
    }

    console.log('Updating active category:', categoryId)
    isUpdatingRef.current = true
    lastActiveCategoryRef.current = categoryId
    setActiveCategory(categoryId)

    // Reset the flag after a short delay
    setTimeout(() => {
      isUpdatingRef.current = false
    }, 50) // کاهش delay برای پاسخگویی بهتر
  }, [])

  // IntersectionObserver callback برای تشخیص دقیق‌تر بخش‌های فعال
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    // تشخیص موبایل برای الگوریتم بهتر
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window
    const viewportHeight = window.innerHeight
    const viewportCenter = viewportHeight / 2
    
    // پیدا کردن بخشی که بیشترین مقدار intersection را دارد
    let maxIntersectionRatio = 0
    let mostVisibleCategory = ''
    let closestToCenter = Infinity
    let closestCategory = ''

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const categoryId = entry.target.getAttribute('data-category')
        if (categoryId) {
          const element = entry.target as HTMLElement
          const elementHeight = element.offsetHeight
          const isShortSection = elementHeight < viewportHeight * 0.3
          
          // اگر بخش کوتاه است، threshold پایین‌تر اعمال کن
          const effectiveThreshold = isShortSection ? threshold * 0.5 : threshold
          
          // اگر intersection ratio بالاتر از threshold باشد
          if (entry.intersectionRatio > maxIntersectionRatio) {
            maxIntersectionRatio = entry.intersectionRatio
            mostVisibleCategory = categoryId
          }
          
          // در موبایل: بخشی که نزدیک‌تر به مرکز صفحه است را در نظر بگیر
          // در دسکتاپ: بخشی که نزدیک‌تر به بالای viewport است را در نظر بگیر
          const rect = entry.boundingClientRect
          const elementCenter = rect.top + (rect.height / 2)
          
          if (isMobile) {
            // موبایل: فاصله از مرکز صفحه
            const distanceFromCenter = Math.abs(elementCenter - viewportCenter)
            if (distanceFromCenter < closestToCenter) {
              closestToCenter = distanceFromCenter
              closestCategory = categoryId
            }
          } else {
            // دسکتاپ: فاصله از بالای viewport
            const distanceFromTop = Math.abs(rect.top - offset)
            if (distanceFromTop < closestToCenter) {
              closestToCenter = distanceFromTop
              closestCategory = categoryId
            }
          }
        }
      }
    })

    // در موبایل، اولویت با نزدیک‌ترین بخش به مرکز است
    // در دسکتاپ، اولویت با intersection ratio است
    const finalCategory = isMobile 
      ? (closestCategory || mostVisibleCategory)
      : (mostVisibleCategory && maxIntersectionRatio >= threshold) 
        ? mostVisibleCategory 
        : closestCategory

    if (finalCategory) {
      updateActiveCategory(finalCategory)
    }
  }, [threshold, updateActiveCategory, offset])

  // تنظیم IntersectionObserver
  useEffect(() => {
    if (categories.length === 0) return

    // پاک کردن observer قبلی
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // ایجاد observer جدید - بهینه‌سازی threshold برای performance بهتر
    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null, // viewport
      rootMargin: `-${offset}px 0px -50% 0px`, // تغییر به 50% برای مرکز صفحه
      threshold: [0, 0.25, 0.5, 0.75, 1.0] // کاهش threshold برای performance بهتر
    })

    // اضافه کردن تمام بخش‌ها به observer - بهینه‌سازی Map sync
    const newElementsMap = new Map<string, HTMLElement>()
    categories.forEach(categoryId => {
      const element = document.getElementById(`category-${categoryId}`)
      if (element) {
        element.setAttribute('data-category', categoryId)
        newElementsMap.set(categoryId, element)
        observerRef.current?.observe(element)
      }
    })
    
    // Update Map reference for better performance
    sectionElementsRef.current = newElementsMap

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [categories, offset, handleIntersection])

  // Fallback scroll listener با debounce برای performance بهتر
  const handleScroll = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // استفاده از requestAnimationFrame برای smooth performance
    const rafId = requestAnimationFrame(() => {
      timeoutRef.current = setTimeout(() => {
        const scrollPosition = window.scrollY + offset
        let foundCategory = ''

        console.log('Scroll Detection (Fallback):', {
          scrollY: window.scrollY,
          offset,
          scrollPosition,
          categories: categories.length
        })

        // تشخیص موبایل برای الگوریتم بهتر
        const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window
        const viewportHeight = window.innerHeight
        const viewportCenter = viewportHeight / 2
        
        if (isMobile) {
          // موبایل: پیدا کردن بخشی که نزدیک‌تر به مرکز صفحه است
          let closestDistance = Infinity
          let closestCategory = ''
          
          for (let i = categories.length - 1; i >= 0; i--) {
            const categoryId = categories[i]
            const element = sectionElementsRef.current.get(categoryId)
            
            if (element) {
              const elementTop = element.offsetTop
              const elementBottom = elementTop + element.offsetHeight
              const elementCenter = elementTop + (element.offsetHeight / 2)
              
              // محاسبه فاصله از مرکز viewport
              const distanceFromCenter = Math.abs(elementCenter - (scrollPosition + viewportCenter))
              
              console.log(`Category ${categoryId} (Mobile):`, {
                elementTop,
                elementBottom,
                elementCenter,
                scrollPosition,
                viewportCenter,
                distanceFromCenter,
                isInView: scrollPosition >= elementTop && scrollPosition < elementBottom
              })
              
              // اگر بخش در viewport است و نزدیک‌تر به مرکز است
              if (scrollPosition >= elementTop && scrollPosition < elementBottom && distanceFromCenter < closestDistance) {
                closestDistance = distanceFromCenter
                closestCategory = categoryId
              }
            }
          }
          
          foundCategory = closestCategory
        } else {
          // دسکتاپ: پیدا کردن بخشی که در viewport است
          for (let i = categories.length - 1; i >= 0; i--) {
            const categoryId = categories[i]
            const element = sectionElementsRef.current.get(categoryId)
            
            if (element) {
              const elementTop = element.offsetTop
              const elementBottom = elementTop + element.offsetHeight
              
              console.log(`Category ${categoryId} (Desktop):`, {
                elementTop,
                elementBottom,
                scrollPosition,
                isInView: scrollPosition >= elementTop && scrollPosition < elementBottom
              })
              
              if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                foundCategory = categoryId
                break
              }
            }
          }
        }
        
        // Only update if we found a different category
        if (foundCategory && foundCategory !== lastActiveCategoryRef.current) {
          updateActiveCategory(foundCategory)
        }
      }, 16) // کاهش timeout به 16ms برای 60fps
    })

    return () => cancelAnimationFrame(rafId)
  }, [categories, offset, updateActiveCategory])

  // Fallback scroll listener - همیشه فعال در موبایل برای دقت بیشتر
  useEffect(() => {
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window
    
    // در موبایل همیشه scroll listener فعال باشد برای دقت بیشتر
    // در دسکتاپ فقط اگر IntersectionObserver پشتیبانی نمی‌شود
    if (!window.IntersectionObserver || isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      
      // Initial check
      handleScroll()

      return () => {
        window.removeEventListener('scroll', handleScroll)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [handleScroll])

  // Cleanup
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { activeCategory, setActiveCategory }
}
