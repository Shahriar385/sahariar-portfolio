import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/ThemeProvider'
import MouseFollower from '@/components/MouseFollower'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sahariar Hossain - Software Engineer',
  description: 'Mobile app developer & blockchain enthusiast. Building high-quality applications with native Android, Flutter, and exploring Web3 technologies.',
  generator: 'v0.app',
  keywords: ['mobile developer', 'Android', 'Flutter', 'blockchain', 'Web3', 'Sahariar Hossain'],
  authors: [{ name: 'Sahariar Hossain' }],
  openGraph: {
    title: 'Sahariar Hossain - Software Engineer',
    description: 'Mobile app developer & blockchain enthusiast from Bangladesh',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
        {/* Custom cursor — outside ThemeProvider so it's always rendered */}
        <MouseFollower />
      </body>
    </html>
  )
}
