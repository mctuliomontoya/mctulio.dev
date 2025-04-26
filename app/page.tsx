"use client";

import Landing from '@/app/sections/Landing';
import Hero from '@/app/sections/Hero';
import About from '@/app/sections/About';
import './globals.css';
import PortfolioGrid from '@/app/components/PortfolioGrid';

import TechStack from '@/app/sections/TechStack'
// import WebCertificates from '@/app/sections/styles/WebCertificates'
import { FooterSection } from '@/app/sections/Footer'
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
        {/*<WebCertificates />*/}
        {/*<WebCertificates />*/}
        <TechStack />
        <FooterSection></FooterSection>
      </div>

    </>
  );
}