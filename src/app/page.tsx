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
    <div className="min-h-screen bg-background">
      {/* Header - Dynamic based on theme settings */}
      <header className={`${currentTheme.header.showBackground ? 'bg-primary text-primary-foreground' : 'bg-transparent text-foreground'} py-4 sm:py-6`}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex justify-between items-center">
            {/* Admin Login - Top Left */}
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
            
            {/* Main Title/Logo - Center - Dynamic based on header type */}
            <div className="text-center flex-1">
              {currentTheme.header.type === 'text' && (
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-3" style={{ fontFamily: currentTheme.typography.headerTitleFontFamily }}>
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
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <img 
                      src={currentTheme.header.logoUrl || '/api/placeholder/200/80/cccccc/666666?text=RETRO'} 
                      alt="لوگو" 
                      className="h-16 sm:h-20 md:h-24 w-auto"
                    />
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-3" style={{ fontFamily: currentTheme.typography.headerTitleFontFamily }}>
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





      {/* Menu Content - All items in one continuous list */}
      <main className="py-4 sm:py-6 relative bg-background">
        {/* Enhanced background pattern for glass effect visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/99 to-background/97 pointer-events-none"></div>
        
        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col space-y-8 sm:space-y-12">
              {groupedItems.map(({ category, items }) => (
                <div key={category.id} id={`category-${category.id}`} data-category={category.id}>
                  {/* Category Header */}
                  <div className="mb-6 sm:mb-8 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground font-headline">
                      {category.name}
                    </h2>
                  </div>
                  
                  {/* Menu Items - Render based on selected template */}
                  {selectedTemplate === 'compact' ? (
                    // Compact template - 2 items per row
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {items.map((item, index) => (
                        <div
                          key={item.id}
                          className="animate-slide-up"
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
                  ) : selectedTemplate === 'square' ? (
                    // Square template - 4 items per row
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                      {items.map((item, index) => (
                        <div
                          key={item.id}
                          className="animate-slide-up flex justify-center"
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
                    // Other templates - vertical stack layout
                    <div className="flex flex-col space-y-9 sm:space-y-12">
                      {items.map((item, index) => (
                        <div
                          key={item.id}
                          className="animate-slide-up"
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

      {/* Footer - Reduced spacing */}
      <footer className="bg-foreground text-primary-foreground py-4 sm:py-6 mt-8 sm:mt-12">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <p className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 font-headline">کافه RETRO</p>
          <p className="opacity-80 text-xs sm:text-sm font-body">
            تجربه‌ای از ترکیب سنت و نوآوری
          </p>
        </div>
      </footer>
    </div>
  )
}
