import type { Metadata } from 'next'

import { Geist, Geist_Mono } from 'next/font/google'

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
    <head title={'Marco Montoya'}>
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
    <div className=" mx-auto overscroll-x-none">

      {children}
    </div>
    </body>
    </html>
  )
}
