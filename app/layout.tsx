import type { Metadata } from 'next'

import { Geist, Geist_Mono } from 'next/font/google'
import { FooterSection } from '@/app/sections/Footer'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-display',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Marco Montoya',
  description: 'Marco Montoya web portfolio',
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <meta
        name="theme-color"
        content="#AAF731"
        media="(prefers-color-scheme: light)"
      />
      <meta
        name="theme-color"
        content="#0a0a0a"
        media="(prefers-color-scheme: dark)"
      />
    </head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-foreground selection:text-contrast`}
    >
    <div className="container mx-auto mt-24 overscroll-x-none">

      {children}
    <FooterSection></FooterSection>
    </div>
    </body>
    </html>
  )
}
