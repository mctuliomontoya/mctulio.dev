"use client"
import Landing from '@/app/sections/Landing'
import Hero from '@/app/sections/Hero'
import About from '@/app/sections/About'
import './globals.css'
import PortfolioGrid from '@/app/components/PortfolioGrid'

export default function Home() {
  return (
    <>
      <div id='background'>
      </div>
      <Landing />
      <Hero />
      <PortfolioGrid />
      <About />
    </>

  );
}
