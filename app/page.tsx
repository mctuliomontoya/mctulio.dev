"use client";

import Landing from '@/app/sections/Landing';
import Hero from '@/app/sections/Hero';
import About from '@/app/sections/About';
import './globals.css';
import PortfolioGrid from '@/app/components/PortfolioGrid';
// import { Certificates } from '@/app/sections/Certificates'

export default function Home() {


  return (
    <>
      {/*<CustomCursor/>*/}
      <div id="background"></div>

      <Landing />

      <div className='container mx-auto'>

        <Hero />
        <About />
        <PortfolioGrid />
        {/*<Certificates />*/}
      </div>
    </>
  );
}