import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { MenuDataProvider } from '@/contexts/MenuDataContext'
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material'
import { designTokens } from '@/design-tokens'

const vazirmatn = Vazirmatn({ 
  subsets: ['arabic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

// Create Material Design 3 theme
const muiTheme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Vazirmatn, Roboto, sans-serif',
    h1: designTokens.typography.display.large,
    h2: designTokens.typography.display.medium,
    h3: designTokens.typography.display.small,
    h4: designTokens.typography.headline.large,
    h5: designTokens.typography.headline.medium,
    h6: designTokens.typography.headline.small,
    subtitle1: designTokens.typography.title.large,
    subtitle2: designTokens.typography.title.medium,
    body1: designTokens.typography.body.large,
    body2: designTokens.typography.body.medium,
    button: designTokens.typography.label.large,
    caption: designTokens.typography.body.small,
    overline: designTokens.typography.label.small,
  },
  palette: {
    mode: 'light',
    primary: {
      main: designTokens.colors.primary[40],
      light: designTokens.colors.primary[80],
      dark: designTokens.colors.primary[20],
      contrastText: designTokens.colors.primary[100],
    },
    secondary: {
      main: designTokens.colors.secondary[40],
      light: designTokens.colors.secondary[80],
      dark: designTokens.colors.secondary[20],
      contrastText: designTokens.colors.secondary[100],
    },
    error: {
      main: designTokens.colors.error[40],
      light: designTokens.colors.error[80],
      dark: designTokens.colors.error[20],
      contrastText: designTokens.colors.error[100],
    },
    background: {
      default: designTokens.colors.surface.default,
      paper: designTokens.colors.surface.container.default,
    },
    text: {
      primary: designTokens.colors.neutral[10],
      secondary: designTokens.colors.neutral[50],
    },
  },
  shape: {
    borderRadius: parseInt(designTokens.radius.md),
  },
  spacing: (factor: number) => `${factor * 8}px`,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'Vazirmatn, Roboto, sans-serif',
          direction: 'rtl',
          textAlign: 'right',
        },
      },
    },
  },
})

export const metadata: Metadata = {
  title: 'RETRO - منوی دیجیتال کافه',
  description: 'منوی دیجیتال کافه RETRO - تجربه‌ای از ترکیب سنت و نوآوری با Material Design 3',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: designTokens.colors.primary[40],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'RETRO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" />
        <meta name="theme-color" content={designTokens.colors.primary[40]} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content={designTokens.colors.primary[40]} />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${vazirmatn.variable} font-body antialiased`}>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          <ThemeProvider>
            <MenuDataProvider>
              <div 
                className="mobile-container"
                style={{
                  width: '100vw',
                  height: '100vh',
                  maxWidth: '1080px',
                  maxHeight: '1920px',
                  margin: '0 auto',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: designTokens.colors.surface.default,
                }}
              >
                {children}
              </div>
            </MenuDataProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </body>
    </html>
  )
}
