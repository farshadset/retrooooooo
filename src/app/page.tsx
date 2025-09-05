'use client'

import React, { useState, useEffect } from 'react'
import { M3Card, M3CardContent, M3CardHeader } from '@/components/ui/m3-card'
import { M3Button } from '@/components/ui/m3-button'
import { M3Typography } from '@/components/ui/m3-typography'
import { MenuSection } from '@/components/menu/menu-section'
// import { CategoryNav } from '@/components/menu/category-nav'
import { AdminLogin } from '@/components/admin/admin-login'
import { MenuDataProvider, useMenuData } from '@/contexts/MenuDataContext'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'
import { Menu, Settings, Coffee, Cake, IceCream } from 'lucide-react'
import { cn } from '@/lib/utils'

function MainContent() {
    const { 
    menuItems, 
    categories, 
    selectedTemplate, 
    navbarStyle,
    dessertsConfig,
    updateMenuItems,
    updateCategories,
    updateNavbarStyle,
    updateTemplate,
    updateDessertsConfig
  } = useMenuData()

  const { currentTheme, setTheme } = useTheme()
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter items by selected category
  const filteredItems = selectedCategory 
    ? menuItems.filter(item => item.category === selectedCategory)
    : menuItems

  // Group items by category
  const itemsByCategory = categories.reduce((acc, category) => {
    acc[category.id] = menuItems.filter(item => item.category === category.id)
    return acc
  }, {} as Record<string, typeof menuItems>)

  const handleLogin = () => {
    setIsAdminLoggedIn(true)
  }

  const handleLogout = () => {
    setIsAdminLoggedIn(false)
  }

  const handleUpdateMenuItem = (id: number, newTitle: string, newDescription: string, newImage: string) => {
    const updatedItems = menuItems.map(item => 
      item.id === id 
        ? { ...item, title: newTitle, description: newDescription, image: newImage }
        : item
    )
    updateMenuItems(updatedItems)
  }

  return (
    <div className="min-h-screen bg-[var(--md-sys-color-surface)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--md-sys-color-surface-container)] border-b border-[var(--md-sys-color-outline-variant)]">
        <div className="px-[var(--md-sys-spacing-md)] py-[var(--md-sys-spacing-sm)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[var(--md-sys-spacing-sm)]">
              <div className="w-10 h-10 rounded-full bg-[var(--md-sys-color-primary)] flex items-center justify-center">
                <Coffee className="w-6 h-6 text-[var(--md-sys-color-on-primary)]" />
                </div>
              <div>
                <M3Typography variant="title-large" color="on-surface">
                  کافه RETRO
                </M3Typography>
                <M3Typography variant="body-small" color="on-surface-variant">
                  منوی دیجیتال
                </M3Typography>
                </div>
            </div>
            
            <div className="flex items-center gap-[var(--md-sys-spacing-xs)]">
              <M3Button
                variant="text"
                size="small"
                icon={<Settings className="w-4 h-4" />}
                onClick={() => setIsAdminLoggedIn(true)}
              >
                تنظیمات
              </M3Button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="sticky top-[73px] z-40 bg-[var(--md-sys-color-surface)] border-b border-[var(--md-sys-color-outline-variant)]">
        <div className="px-[var(--md-sys-spacing-md)] py-[var(--md-sys-spacing-sm)]">
          <div className="flex gap-[var(--md-sys-spacing-xs)] overflow-x-auto scrollbar-hide">
            <M3Button
              variant={selectedCategory === null ? 'filled' : 'outlined'}
              size="small"
              onClick={() => setSelectedCategory(null)}
            >
              همه
            </M3Button>
            {categories.map((category) => (
              <M3Button
                key={category.id}
                variant={selectedCategory === category.id ? 'filled' : 'outlined'}
                size="small"
                onClick={() => setSelectedCategory(category.id)}
              >
                      {category.name}
              </M3Button>
                      ))}
                    </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-[var(--md-sys-spacing-md)] py-[var(--md-sys-spacing-md)]">
        {selectedCategory ? (
          // Single category view
          <div className="space-y-[var(--md-sys-spacing-md)]">
            <M3Card variant="elevated" elevation={1}>
              <M3CardHeader
                title={categories.find(c => c.id === selectedCategory)?.name}
                subtitle={`${filteredItems.length} آیتم`}
              />
            </M3Card>
            
            <div className="grid grid-cols-1 gap-[var(--md-sys-spacing-md)]">
              {filteredItems.map((item) => (
                <MenuSection
                          key={item.id}
                  category={categories.find(c => c.id === item.category)!}
                  items={[item]}
                />
              ))}
            </div>
          </div>
        ) : (
          // All categories view
          <div className="space-y-[var(--md-sys-spacing-lg)]">
            {categories.map((category) => {
              const categoryItems = itemsByCategory[category.id] || []
              if (categoryItems.length === 0) return null
              
              return (
                <MenuSection
                  key={category.id}
                  category={category}
                  items={categoryItems}
                />
              )
            })}
        </div>
        )}
      </main>

      {/* Admin Login Modal */}
      {isAdminLoggedIn && (
        <AdminLogin
          onLogin={handleLogin}
          isLoggedIn={isAdminLoggedIn}
          onLogout={handleLogout}
          onUpdateMenuItem={handleUpdateMenuItem}
          onUpdateCategories={updateCategories}
          onUpdateItems={updateMenuItems}
          onNavbarStyleChange={updateNavbarStyle}
          onTemplateChange={updateTemplate}
          onDessertsConfigChange={updateDessertsConfig}
        />
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <ThemeProvider>
      <MenuDataProvider>
        <MainContent />
      </MenuDataProvider>
    </ThemeProvider>
  )
}