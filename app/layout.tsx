import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import type { ReactNode } from 'react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'
import ThemeProvider from '@/components/ThemeProvider'
import { siteMeta } from '@/lib/constants'
import './globals.css'

const display = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: siteMeta.title,
    template: `%s — ${siteMeta.name}`,
  },
  description: siteMeta.description,
  openGraph: {
    type: 'website',
    title: siteMeta.title,
    description: siteMeta.description,
    siteName: siteMeta.name,
    url: siteMeta.url,
    images: [
      {
        url: '/og-image.png',
        width: 1500,
        height: 500,
        alt: 'Forest Road Vault — real-world credit on Ethereum L1',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteMeta.handle,
    title: siteMeta.title,
    description: siteMeta.description,
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0f1a2e',
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="main-offset flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
