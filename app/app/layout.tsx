
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Montreal Restaurant Guide - Your AI Dining Companion',
  description: 'Discover the best casual dining spots in Montreal under $50 with our AI-powered restaurant guide. Get personalized recommendations, restaurant details, and reservation info.',
  keywords: 'Montreal restaurants, dining guide, AI chatbot, casual dining, restaurant recommendations',
  openGraph: {
    title: 'Montreal Restaurant Guide - Your AI Dining Companion',
    description: 'Discover the best casual dining spots in Montreal under $50 with our AI-powered restaurant guide.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} light`}>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
