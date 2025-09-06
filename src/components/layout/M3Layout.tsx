'use client'

import React, { useState, useEffect } from 'react'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  BottomNavigation, 
  BottomNavigationAction,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { 
  Menu as MenuIcon, 
  Home as HomeIcon, 
  Category as CategoryIcon,
  Settings as SettingsIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { useM3Theme } from '@/contexts/M3ThemeContext'
import { M3Button } from '@/components/m3/M3Button'

interface M3LayoutProps {
  children: React.ReactNode
  title?: string
  showBottomNav?: boolean
  onMenuClick?: () => void
  onAdminClick?: () => void
}

export function M3Layout({ 
  children, 
  title = 'RETRO',
  showBottomNav = true,
  onMenuClick,
  onAdminClick
}: M3LayoutProps) {
  const { theme, mode, toggleMode } = useM3Theme()
  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'))
  const [bottomNavValue, setBottomNavValue] = useState(0)

  // S23 Ultra safe area handling
  useEffect(() => {
    // Set CSS custom properties for safe areas
    const root = document.documentElement
    root.style.setProperty('--safe-area-top', 'env(safe-area-inset-top, 0px)')
    root.style.setProperty('--safe-area-bottom', 'env(safe-area-inset-bottom, 0px)')
    root.style.setProperty('--safe-area-left', 'env(safe-area-inset-left, 0px)')
    root.style.setProperty('--safe-area-right', 'env(safe-area-inset-right, 0px)')
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 17
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.colors.surface.default,
        color: theme.colors.neutral[10],
        // S23 Ultra optimizations
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden'
      }}
    >
      {/* Top App Bar */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          backgroundColor: theme.colors.surface.container.high,
          borderBottom: `1px solid ${theme.colors.outline.variant}`,
          paddingTop: 'var(--safe-area-top)',
          zIndex: 1000
        }}
      >
        <Toolbar 
          sx={{ 
            minHeight: '64px',
            paddingX: theme.spacing[4],
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2] }}>
            {onMenuClick && (
              <IconButton
                onClick={onMenuClick}
                sx={{
                  color: theme.colors.neutral[10],
                  padding: theme.spacing[1]
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography 
              variant="h6" 
              sx={{
                fontFamily: theme.typography.headline.medium.fontFamily,
                fontSize: theme.typography.headline.medium.fontSize,
                fontWeight: theme.typography.headline.medium.fontWeight,
                color: theme.colors.neutral[10]
              }}
            >
              {title}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing[2] }}>
            <M3Button
              variant="text"
              size="small"
              onClick={toggleMode}
              sx={{ minWidth: 'auto', padding: theme.spacing[1] }}
            >
              {mode === 'light' ? '🌙' : '☀️'}
            </M3Button>
            
            {onAdminClick && (
              <IconButton
                onClick={onAdminClick}
                sx={{
                  color: theme.colors.neutral[10],
                  padding: theme.spacing[1]
                }}
              >
                <AdminIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <motion.main
        variants={itemVariants}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: showBottomNav ? '80px' : '0px',
          // S23 Ultra content area optimization
          minHeight: 'calc(100vh - 64px - 80px)',
          maxWidth: '100%',
          overflowX: 'hidden'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              flex: 1,
              width: '100%',
              maxWidth: '100%'
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.main>

      {/* Bottom Navigation */}
      {showBottomNav && isMobile && (
        <motion.div
          variants={itemVariants}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            paddingBottom: 'var(--safe-area-bottom)'
          }}
        >
          <BottomNavigation
            value={bottomNavValue}
            onChange={(event, newValue) => setBottomNavValue(newValue)}
            sx={{
              backgroundColor: theme.colors.surface.container.high,
              borderTop: `1px solid ${theme.colors.outline.variant}`,
              height: '80px',
              paddingBottom: 'var(--safe-area-bottom)'
            }}
          >
            <BottomNavigationAction
              label="خانه"
              icon={<HomeIcon />}
              sx={{
                color: theme.colors.neutral[60],
                '&.Mui-selected': {
                  color: theme.colors.primary[40]
                }
              }}
            />
            <BottomNavigationAction
              label="دسته‌بندی"
              icon={<CategoryIcon />}
              sx={{
                color: theme.colors.neutral[60],
                '&.Mui-selected': {
                  color: theme.colors.primary[40]
                }
              }}
            />
            <BottomNavigationAction
              label="تنظیمات"
              icon={<SettingsIcon />}
              sx={{
                color: theme.colors.neutral[60],
                '&.Mui-selected': {
                  color: theme.colors.primary[40]
                }
              }}
            />
          </BottomNavigation>
        </motion.div>
      )}
    </motion.div>
  )
}



