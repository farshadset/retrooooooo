import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import '../src/styles/design-tokens.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { MenuDataProvider } from '@/contexts/MenuDataContext'


const vazirmatn = Vazirmatn({ 
  subsets: ['arabic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'کافه RETRO - منوی دیجیتال',
  description: 'منوی دیجیتال کافه RETRO - تجربه‌ای از ترکیب سنت و نوآوری با طراحی Material Design 3',
  keywords: 'کافه، منوی دیجیتال، RETRO، قهوه، دسر، غذا',
  authors: [{ name: 'RETRO Cafe' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover'
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#6750A4' },
    { media: '(prefers-color-scheme: dark)', color: '#D0BCFF' }
  ],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'RETRO Cafe'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#DC2626" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
      </head>
      <body className={`${vazirmatn.variable} font-body antialiased bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]`}>
        <div className="min-h-screen w-full max-w-[var(--s23-ultra-width)] mx-auto bg-[var(--md-sys-color-surface)]">
          <ThemeProvider>
            <MenuDataProvider>
              {children}
            </MenuDataProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
