'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react'
import CategoryNav from '@/components/menu/category-nav'
import { MenuCard } from '@/components/menu/menu-card'
import { AdminLogin } from '@/components/admin/admin-login'

import { TemplateRenderer } from '@/components/menu/template-renderer'

import { DessertsHorizontal } from '@/components/menu/desserts-horizontal'
import { menuData } from '@/data/menu-data'
import { useScrollSync } from '@/hooks/useScrollSync'
import { useTheme } from '@/contexts/ThemeContext'
import { useMenuData } from '@/contexts/MenuDataContext'

import { Category, MenuItem, TemplateType, NavbarStyle, DessertsSectionConfig } from '@/types/menu'


export default function HomePage() {
  const { currentTheme } = useTheme()

  // Menu data management
  const {
    menuItems,
    categories,
    selectedTemplate,
    navbarStyle,
    dessertsConfig,
    categoryDiscounts,
    hasUnsavedChanges,
    isAdmin,
    setIsAdmin,
    updateMenuItems,
    updateCategories,
    updateNavbarStyle,
    updateTemplate,
    updateDessertsConfig,
    confirmChanges,
    cancelChanges
  } = useMenuData()

  // Ref and state for measuring desserts section height
  const dessertsSectionRef = useRef<HTMLElement>(null)
  const [dessertsSectionHeight, setDessertsSectionHeight] = useState(0)

  // Get category IDs for scroll sync (excluding desserts - they have their own horizontal section)
  const categoryIds = useMemo(() => 
    categories.filter(cat => cat.id !== 'desserts').map(cat => cat.id), 
    [categories]
  )

  // Measure desserts section height when it changes
  useEffect(() => {
    if (dessertsSectionRef.current && dessertsConfig.isVisible) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const height = entry.contentRect.height
          setDessertsSectionHeight(height)
          console.log('Desserts section height measured:', height)
        }
      })
      
      resizeObserver.observe(dessertsSectionRef.current)
      
      return () => resizeObserver.disconnect()
    } else {
      setDessertsSectionHeight(0)
      console.log('Desserts section hidden, height set to 0')
    }
  }, [dessertsConfig.isVisible])

  // Reset template to original when user is not admin
  useEffect(() => {
    if (!isAdmin) {
      // Load the original template from localStorage when user is not admin
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('retro-menu-data')
        if (saved) {
          try {
            const parsedData = JSON.parse(saved)
            if (parsedData.selectedTemplate && parsedData.selectedTemplate !== selectedTemplate) {
              updateTemplate(parsedData.selectedTemplate)
            }
          } catch (error) {
            console.error('Error loading saved template:', error)
          }
        }
      }
    }
  }, [isAdmin, selectedTemplate, updateTemplate])

  // Use scroll synchronization hook with improved settings
  const { activeCategory, setActiveCategory } = useScrollSync({
    categories: categoryIds,
    offset: 150, // Increased offset for more stable detection
    threshold: 0.4, // Higher threshold to prevent flickering
    dessertsSectionHeight: dessertsSectionHeight
  })

  // Group items by category for display (excluding desserts - they have their own horizontal section)
  const groupedItems = useMemo(() => {
    const grouped: { category: Category; items: MenuItem[] }[] = []
    
    categories.forEach(category => {
      // Skip desserts category - it has its own horizontal section
      if (category.id === 'desserts') {
        return
      }
      
      const categoryItems = menuItems.filter(item => item.category === category.id)
      if (categoryItems.length > 0) {
        grouped.push({ category, items: categoryItems })
      }
    })
    
    return grouped
  }, [menuItems, categories])



  const handleAdminLogin = (isAdmin: boolean) => {
    setIsAdmin(isAdmin)
    if (isAdmin) {
      // Store original values when admin logs in
      confirmChanges()
    }
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
  }

  const handleUpdateMenuItem = (id: number, newTitle: string, newDescription: string, newImage: string) => {
    const updatedItems = menuItems.map(item => 
      item.id === id ? { ...item, title: newTitle, description: newDescription, image: newImage } : item
    )
    updateMenuItems(updatedItems)
  }

  const handleEditMenuItem = (updatedItem: MenuItem) => {
    const updatedItems = menuItems.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    )
    updateMenuItems(updatedItems)
  }

  const handleUpdateCategories = (updatedCategories: Category[]) => {
    updateCategories(updatedCategories)
  }

  const handleUpdateItems = (updatedItems: MenuItem[]) => {
    updateMenuItems(updatedItems)
  }

  const handleNavbarStyleChange = (style: NavbarStyle) => {
    updateNavbarStyle(style)
  }

  const handleTemplateChange = (template: TemplateType) => {
    updateTemplate(template)
  }

  const handleDessertsConfigChange = (config: DessertsSectionConfig) => {
    updateDessertsConfig(config)
  }

  return (
    <div className="min-h-screen bg-md-background mobile-portrait">
      {/* Header - Material Design 3 optimized */}
      <header className={`${currentTheme.header.showBackground ? 'md-primary' : 'md-surface'} safe-area-top`}>
        <div className="mobile-container py-md-lg">
          <div className="flex justify-between items-center">
            {/* Admin Login - Top Left */}
            <div className="md-touch-target">
              <AdminLogin
                onLogin={handleAdminLogin}
                isLoggedIn={isAdmin}
                onLogout={handleAdminLogout}
                onUpdateMenuItem={handleUpdateMenuItem}
                onUpdateCategories={handleUpdateCategories}
                onUpdateItems={handleUpdateItems}
                onNavbarStyleChange={handleNavbarStyleChange}
                onTemplateChange={handleTemplateChange}
                onDessertsConfigChange={handleDessertsConfigChange}
              />
            </div>
            
            {/* Main Title/Logo - Center - Material Design 3 Typography */}
            <div className="text-center flex-1">
              {currentTheme.header.type === 'text' && (
                <h1 className="md-display-small mobile-headline" style={{ fontFamily: currentTheme.typography.headerTitleFontFamily }}>
                  {currentTheme.header.title}
                </h1>
              )}
              {currentTheme.header.type === 'logo' && (
                <div className="flex justify-center">
                  <img 
                    src={currentTheme.header.logoUrl || '/api/placeholder/200/80/cccccc/666666?text=RETRO'} 
                    alt="لوگو" 
                    className="h-16 sm:h-20 md:h-24 w-auto"
                  />
                </div>
              )}
              {currentTheme.header.type === 'textAndLogo' && (
                <div className="space-y-md-md">
                  <div className="flex justify-center">
                    <img 
                      src={currentTheme.header.logoUrl || '/api/placeholder/200/80/cccccc/666666?text=RETRO'} 
                      alt="لوگو" 
                      className="h-16 sm:h-20 md:h-24 w-auto"
                    />
                  </div>
                  <h1 className="md-display-small mobile-headline" style={{ fontFamily: currentTheme.typography.headerTitleFontFamily }}>
                    {currentTheme.header.title}
                  </h1>
                </div>
              )}
            </div>
            
            {/* Spacer for balance */}
            <div className="w-24"></div>
          </div>
        </div>
      </header>



      {/* Category Navigation */}
      <CategoryNav
        categories={categories.filter(cat => cat.id !== 'desserts')}
        selectedCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        navbarStyle={navbarStyle}
      />

      {/* Desserts Horizontal Section - بالای بخش نوشیدنی بر پایه اسپرسو */}
      {dessertsConfig.isVisible && (
        <DessertsHorizontal 
          ref={dessertsSectionRef}
          config={dessertsConfig}
          items={menuItems}
        />
      )}





      {/* Menu Content - Material Design 3 optimized for mobile */}
      <main className="content-section relative bg-md-background">
        <div className="mobile-container relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col space-y-md-2xl">
              {groupedItems.map(({ category, items }) => (
                <div key={category.id} id={`category-${category.id}`} data-category={category.id}>
                  {/* Category Header - Material Design 3 Typography */}
                  <div className="mb-md-lg text-center">
                    <h2 className="md-headline-medium mobile-headline text-md-on-background">
                      {category.name}
                    </h2>
                  </div>
                  
                  {/* Menu Items - Mobile-optimized layouts */}
                  {selectedTemplate === 'square' ? (
                    // Square template - Mobile: 2 columns, Tablet: 3 columns, Desktop: 4 columns
                    <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-md-md">
                      {items.map((item, index) => (
                        <div
                          key={item.id}
                          className="animate-md-scale-in flex justify-center"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <TemplateRenderer
                            template={selectedTemplate}
                            item={item}
                            isAdmin={false}
                            onEditItem={null}
                            categoryDiscounts={categoryDiscounts}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Default template - Single column for mobile
                    <div className="flex flex-col space-y-md-xl">
                      {items.map((item, index) => (
                        <div
                          key={item.id}
                          className="animate-md-slide-in mobile-card"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <TemplateRenderer
                            template={selectedTemplate}
                            item={item}
                            isAdmin={false}
                            onEditItem={null}
                            categoryDiscounts={categoryDiscounts}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Material Design 3 optimized */}
      <footer className="md-surface-container safe-area-bottom">
        <div className="mobile-container py-md-lg text-center">
          <p className="md-title-medium mobile-title text-md-on-surface mb-md-sm">کافه RETRO</p>
          <p className="md-body-medium mobile-body text-md-on-surface-variant">
            تجربه‌ای از ترکیب سنت و نوآوری
          </p>
        </div>
      </footer>
    </div>
  )
}
