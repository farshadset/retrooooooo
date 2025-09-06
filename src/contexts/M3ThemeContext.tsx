'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import { useTheme } from './ThemeContext'

interface M3ThemeContextType {
  theme: any
  mode: 'light' | 'dark'
  toggleMode: () => void
}

const M3ThemeContext = createContext<M3ThemeContextType | undefined>(undefined)

export function useM3Theme() {
  const context = useContext(M3ThemeContext)
  if (!context) {
    throw new Error('useM3Theme must be used within M3ThemeProvider')
  }
  return context
}

export function M3ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  // Create simple MUI theme
  const muiTheme = createTheme({
    direction: 'rtl',
    palette: {
      mode: mode,
      primary: {
        main: '#6750A4',
        light: '#9A82DB',
        dark: '#4F378B',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#625B71',
        light: '#958DA5',
        dark: '#4A4458',
        contrastText: '#FFFFFF'
      },
      error: {
        main: '#f44336',
        light: '#e57373',
        dark: '#d32f2f',
        contrastText: '#ffffff'
      },
      background: {
        default: '#FFFBFE',
        paper: '#FFFFFF'
      },
      text: {
        primary: '#1C1B1F',
        secondary: '#49454F',
        disabled: '#CAC4D0'
      }
    },
    typography: {
      fontFamily: 'Vazirmatn, Tahoma, Arial, sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 400,
        lineHeight: 1.2
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 400,
        lineHeight: 1.3
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 400,
        lineHeight: 1.4
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 400,
        lineHeight: 1.5
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: 400,
        lineHeight: 1.5
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.5
      }
    },
    shape: {
      borderRadius: 12
    },
    spacing: 8
  })

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light')
  }

  const contextValue = {
    theme: muiTheme,
    mode,
    toggleMode
  }

  return (
    <M3ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={muiTheme}>
        {children}
      </MUIThemeProvider>
    </M3ThemeContext.Provider>
  )
}