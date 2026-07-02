'use client'

// import dynamic from 'next/dynamic'
import { GradientLanding } from '@/app/pages/gradient/GradientLanding'
// import About from '@/app/sections/About'
import './globals.css'
// import { Quote } from '@components/text/Quote'
// import Header from '@components/v2/Header'
import Content from '@components/v2/Content'
import BentoGrid from '@components/v2/BentoGrid'
// Dynamically import larger components with loading fallbacks
// const PortfolioGrid = dynamic(
//   () => import('@/app/components/features/PortfolioGrid/PortfolioGrid'),
//   {
//     loading: () => (
//       <div className='min-h-[400px] flex items-center justify-center'>
//         Loading portfolio...
//       </div>
//     ),
//     ssr: false,
//   },
// )

// const TechStack = dynamic(() => import('@/app/sections/TechStack'), {
//   loading: () => (
//     <div className='min-h-[400px] flex items-center justify-center'>
//       Loading tech stack...
//     </div>
//   ),
// })

// const FooterSection = dynamic(
//   () => import('@/app/sections/Footer').then(mod => mod.FooterSection),
//   {
//     loading: () => (
//       <div className='min-h-[200px] flex items-center justify-center'>
//         Loading footer...
//       </div>
//     ),
//   },
// )

export default function Home() {
  return (
    <>
      <div id='background' style={{ opacity: 0 }}></div>

      <GradientLanding />
      <Content />
      <BentoGrid />
      {/*<Quote></Quote>*/}

      {/*<div className='container mx-auto'>*/}
      {/*  <About />*/}
      {/*  <PortfolioGrid />*/}
      {/*  <TechStack />*/}
      {/*  <FooterSection />*/}
      {/*</div>*/}
    </>
  )
}
