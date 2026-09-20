import type { Metadata, Viewport } from 'next'
import { DM_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import type { ReactNode } from 'react'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PageTransition from '@/components/PageTransition'
import ThemeProvider from '@/components/ThemeProvider'
import { siteMeta, siteUrl } from '@/lib/constants'
import './globals.css'

const heading = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
})

const body = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteMeta.title,
    template: `%s — ${siteMeta.name}`,
  },
  description: siteMeta.description,
  openGraph: {
    type: 'website',
    title: siteMeta.title,
    description: siteMeta.ogDescription,
    siteName: siteMeta.siteName,
    url: siteUrl,
    images: [
      {
        url: '/images/og-default.png',
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
    description: siteMeta.ogDescription,
    images: ['/images/og-default.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#F5F1EA',
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${heading.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
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
