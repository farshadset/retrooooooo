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
  metadataBase: new URL('https://retrocafebakery.ir'),
  title: 'RETRO - کافه و شیرینی‌فروشی رترو',
  description: 'منوی دیجیتال کافه RETRO - تجربه‌ای از ترکیب سنت و نوآوری. قهوه، کیک، دسر و نوشیدنی‌های خوشمزه',
  keywords: 'کافه رترو, قهوه, کیک, دسر, نوشیدنی, شیرینی, منوی دیجیتال',
  authors: [{ name: 'RETRO Cafe & Bakery' }],
  creator: 'RETRO Cafe & Bakery',
  publisher: 'RETRO Cafe & Bakery',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://retrocafebakery.ir',
    title: 'RETRO - کافه و شیرینی‌فروشی رترو',
    description: 'منوی دیجیتال کافه RETRO - تجربه‌ای از ترکیب سنت و نوآوری',
    siteName: 'RETRO Cafe & Bakery',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RETRO - کافه و شیرینی‌فروشی رترو',
    description: 'منوی دیجیتال کافه RETRO - تجربه‌ای از ترکیب سنت و نوآوری',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no, shrink-to-fit=no" />
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
