'use client'

import dynamic from 'next/dynamic'
import Landing from '@/app/sections/Landing'
import Hero from '@/app/sections/Hero'
import About from '@/app/sections/About'
import './globals.css'
import Head from 'next/head'
// Dynamically import larger components with loading fallbacks
const PortfolioGrid = dynamic(
  () => import('@/app/components/features/PortfolioGrid/PortfolioGrid'),
  {
    loading: () => (
      <div className='min-h-[400px] flex items-center justify-center'>
        Loading portfolio...
      </div>
    ),
    ssr: false,
  },
)

const TechStack = dynamic(() => import('@/app/sections/TechStack'), {
  loading: () => (
    <div className='min-h-[400px] flex items-center justify-center'>
      Loading tech stack...
    </div>
  ),
})

const FooterSection = dynamic(
  () => import('@/app/sections/Footer').then(mod => mod.FooterSection),
  {
    loading: () => (
      <div className='min-h-[200px] flex items-center justify-center'>
        Loading footer...
      </div>
    ),
  },
)

export default function Home() {
  return (
    <>
      <Head>
        <script
          src='https://analytics.ahrefs.com/analytics.js'
          data-key='fzO2hITsOnntA3h3XpEimg'
          async
        ></script>
      </Head>
      {/*<CustomCursor/>*/}
      <div id='background'></div>

      <Landing />

      <div className='container mx-auto'>
        <Hero />
        <About />
        <PortfolioGrid />
        <TechStack />
        <FooterSection />
      </div>
    </>
  )
}
