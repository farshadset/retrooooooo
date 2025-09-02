'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Fab,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Chip
} from '@mui/material'
import { 
  Menu as MenuIcon, 
  Home as HomeIcon, 
  Restaurant as RestaurantIcon,
  Cake as CakeIcon,
  Coffee as CoffeeIcon,
  Settings as SettingsIcon,
  AdminPanelSettings as AdminIcon,
  Close as CloseIcon
} from '@mui/icons-material'
import { AdminLogin } from '@/components/admin/admin-login'
import { M3CategoryNav } from '@/components/menu/m3-category-nav'
import { MenuSection } from '@/components/menu/menu-section'
import { SpecialItemsCarousel } from '@/components/menu/special-items-carousel'
import { DessertsHorizontal } from '@/components/menu/desserts-horizontal'
import { TemplateSelector } from '@/components/menu/template-selector'
import { TemplateRenderer } from '@/components/menu/template-renderer'
import { useMenuData } from '@/contexts/MenuDataContext'
import { useTheme as useCustomTheme } from '@/contexts/ThemeContext'
import { useScrollSync } from '@/hooks/useScrollSync'
import { MenuItem, Category, TemplateType, NavbarStyle, DessertsSectionConfig } from '@/types/menu'
import { designTokens } from '@/design-tokens'

export default function HomePage() {
  const { currentTheme } = useCustomTheme()
  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'))

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

  // State for mobile UI
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [bottomNavValue, setBottomNavValue] = useState(0)

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
        }
      })
      
      resizeObserver.observe(dessertsSectionRef.current)
      
      return () => resizeObserver.disconnect()
    } else {
      setDessertsSectionHeight(0)
    }
  }, [dessertsConfig.isVisible])

  // Reset template to original when user is not admin
  useEffect(() => {
    if (!isAdmin) {
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

  // Use scroll synchronization hook
  const { activeCategory, setActiveCategory } = useScrollSync({
    categories: categoryIds,
    offset: 150,
    threshold: 0.4,
    dessertsSectionHeight: dessertsSectionHeight
  })

  // Group items by category for display (excluding desserts)
  const groupedItems = useMemo(() => {
    const grouped: { category: Category; items: MenuItem[] }[] = []
    
    categories.forEach(category => {
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

  // Handle bottom navigation change
  const handleBottomNavChange = (event: React.SyntheticEvent, newValue: number) => {
    setBottomNavValue(newValue)
    switch (newValue) {
      case 0:
        setActiveCategory('all')
        break
      case 1:
        setActiveCategory('coffee')
        break
      case 2:
        setActiveCategory('desserts')
        break
      case 3:
        setActiveCategory('food')
        break
    }
  }

  const handleAdminLogin = (isAdmin: boolean) => {
    setIsAdmin(isAdmin)
    if (isAdmin) {
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
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100vh',
        maxHeight: '1920px',
        maxWidth: '1080px',
        margin: '0 auto',
        backgroundColor: designTokens.colors.surface.default,
        overflow: 'hidden'
      }}
    >
      {/* Admin Login Component */}
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

      {/* App Bar */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          backgroundColor: designTokens.colors.surface.container.high,
          color: designTokens.colors.neutral[10],
          borderBottom: `1px solid ${designTokens.colors.outline.variant}`,
          height: '64px'
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important', paddingX: designTokens.spacing[4] }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ 
              marginRight: designTokens.spacing[2],
              minWidth: designTokens.mobile.touchTarget.min,
              minHeight: designTokens.mobile.touchTarget.min
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontFamily: 'Vazirmatn, Roboto, sans-serif',
              fontSize: designTokens.typography.title.large.fontSize,
              fontWeight: designTokens.typography.title.large.fontWeight,
              lineHeight: designTokens.typography.title.large.lineHeight
            }}
          >
            {currentTheme.header.title}
          </Typography>

          {isAdmin && (
            <IconButton
              color="inherit"
              aria-label="admin"
              sx={{ 
                minWidth: designTokens.mobile.touchTarget.min,
                minHeight: designTokens.mobile.touchTarget.min
              }}
            >
              <AdminIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: designTokens.colors.surface.container.default,
            borderLeft: `1px solid ${designTokens.colors.outline.variant}`,
          },
        }}
      >
        <Box sx={{ padding: designTokens.spacing[4] }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: designTokens.spacing[4] }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'Vazirmatn, Roboto, sans-serif',
                fontSize: designTokens.typography.title.large.fontSize
              }}
            >
              منو
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        
        <List>
          <ListItem disablePadding>
            <ListItemButton 
              selected={activeCategory === 'all'}
              onClick={() => {
                setActiveCategory('all')
                setDrawerOpen(false)
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="همه" />
            </ListItemButton>
          </ListItem>
          
          {categories.map((category) => (
            <ListItem key={category.id} disablePadding>
              <ListItemButton 
                selected={activeCategory === category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                  setDrawerOpen(false)
                }}
              >
                <ListItemIcon>
                  {category.id === 'coffee' && <CoffeeIcon />}
                  {category.id === 'desserts' && <CakeIcon />}
                  {category.id === 'food' && <RestaurantIcon />}
                </ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          overflow: 'auto',
          paddingBottom: '80px', // Space for bottom navigation
          backgroundColor: designTokens.colors.surface.default
        }}
      >
        <Container 
          maxWidth={false} 
          sx={{ 
            paddingX: designTokens.spacing[4],
            paddingY: designTokens.spacing[6]
          }}
        >
          {/* Category Navigation - Hidden on mobile, shown in drawer */}
          {!isMobile && (
            <Box sx={{ marginBottom: designTokens.spacing[8] }}>
              <M3CategoryNav
                categories={categories.filter(cat => cat.id !== 'desserts')}
                selectedCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                navbarStyle={navbarStyle}
              />
            </Box>
          )}

          {/* Desserts Horizontal Section */}
          {dessertsConfig.isVisible && (
            <Box sx={{ marginBottom: designTokens.spacing[8] }}>
              <DessertsHorizontal 
                ref={dessertsSectionRef}
                config={dessertsConfig}
                items={menuItems}
              />
            </Box>
          )}

          {/* Menu Content */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing[8] }}>
            {groupedItems.map(({ category, items }) => (
              <Box key={category.id} id={`category-${category.id}`} data-category={category.id}>
                {/* Category Header */}
                <Box sx={{ textAlign: 'center', marginBottom: designTokens.spacing[6] }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontFamily: 'Vazirmatn, Roboto, sans-serif',
                      fontSize: designTokens.typography.headline.medium.fontSize,
                      fontWeight: designTokens.typography.headline.medium.fontWeight,
                      lineHeight: designTokens.typography.headline.medium.lineHeight,
                      color: designTokens.colors.neutral[10]
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
                
                {/* Menu Items - Render based on selected template */}
                {selectedTemplate === 'compact' ? (
                  // Compact template - 2 items per row
                  <Grid container spacing={3}>
                    {items.map((item, index) => (
                      <Grid item xs={12} md={6} key={item.id}>
                        <TemplateRenderer
                          template={selectedTemplate}
                          item={item}
                          isAdmin={false}
                          onEditItem={null}
                          categoryDiscounts={categoryDiscounts}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : selectedTemplate === 'square' ? (
                  // Square template - 4 items per row
                  <Grid container spacing={2}>
                    {items.map((item, index) => (
                      <Grid item xs={6} sm={4} md={3} lg={2.4} key={item.id}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <TemplateRenderer
                            template={selectedTemplate}
                            item={item}
                            isAdmin={false}
                            onEditItem={null}
                            categoryDiscounts={categoryDiscounts}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  // Default template - vertical stack layout
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing[6] }}>
                    {items.map((item, index) => (
                      <TemplateRenderer
                        key={item.id}
                        template={selectedTemplate}
                        item={item}
                        isAdmin={false}
                        onEditItem={null}
                        categoryDiscounts={categoryDiscounts}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Bottom Navigation */}
      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0,
          maxWidth: '1080px',
          margin: '0 auto',
          zIndex: 1000,
          backgroundColor: designTokens.colors.surface.container.high,
          borderTop: `1px solid ${designTokens.colors.outline.variant}`
        }} 
        elevation={3}
      >
        <BottomNavigation
          value={bottomNavValue}
          onChange={handleBottomNavChange}
          sx={{
            height: '80px',
            backgroundColor: 'transparent'
          }}
        >
          <BottomNavigationAction 
            label="همه" 
            icon={<HomeIcon />}
            sx={{
              color: designTokens.colors.neutral[50],
              '&.Mui-selected': {
                color: designTokens.colors.primary[40]
              }
            }}
          />
          <BottomNavigationAction 
            label="قهوه" 
            icon={<CoffeeIcon />}
            sx={{
              color: designTokens.colors.neutral[50],
              '&.Mui-selected': {
                color: designTokens.colors.primary[40]
              }
            }}
          />
          <BottomNavigationAction 
            label="دسر" 
            icon={<CakeIcon />}
            sx={{
              color: designTokens.colors.neutral[50],
              '&.Mui-selected': {
                color: designTokens.colors.primary[40]
              }
            }}
          />
          <BottomNavigationAction 
            label="غذا" 
            icon={<RestaurantIcon />}
            sx={{
              color: designTokens.colors.neutral[50],
              '&.Mui-selected': {
                color: designTokens.colors.primary[40]
              }
            }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}