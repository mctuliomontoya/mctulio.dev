"use client"
// import dynamic from 'next/dynamic'
import Landing from '@/app/sections/Landing'
import Hero from '@/app/sections/Hero'
import About from '@/app/sections/About'
import './globals.css'
import PortfolioGrid from '@/app/components/PortfolioGrid'

// Dynamically import the router components with SSR disabled
// const RouterComponent = dynamic(() => import('@/app/components/RouterComponent'), {
//   ssr: false
// })

export default function Home() {
  return (
    <>
      <div id='background'></div>
      <Landing />
      <Hero />
      {/*<RouterComponent />*/}
      <About />
      <PortfolioGrid />
    </>
  )
}
