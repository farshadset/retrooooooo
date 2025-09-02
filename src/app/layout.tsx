import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { MenuDataProvider } from '@/contexts/MenuDataContext'


const vazirmatn = Vazirmatn({ 
  subsets: ['arabic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RETRO -',
  description: 'منوی دیجیتال کافه RETRO - تجربه‌ای از ترکیب سنت و نوآوری',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#DC2626" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${vazirmatn.variable} font-body antialiased`}>
        <ThemeProvider>
          <MenuDataProvider>
            {children}
          </MenuDataProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
