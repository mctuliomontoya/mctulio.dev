"use client"
import {MarcoPhoto } from '@/app/components/MarcoPhoto'
import Landing from '@/app/sections/Landing'
import Hero from '@/app/sections/Hero'

export default function Home() {
  return (
    <>
      <Landing />
      <div id='background'>
      </div>
      <Hero />
      <div className='font-mono text-[6px] md:text-[8px] md:leading-[0.7rem] leading-[0.5rem]' dangerouslySetInnerHTML={{ __html: MarcoPhoto }}></div>
      <div className='font-mono text-[8px] leading-3' dangerouslySetInnerHTML={{ __html: MarcoPhoto }}></div>
      <div className='font-mono text-[8px] leading-3' dangerouslySetInnerHTML={{ __html: MarcoPhoto }}></div>
      <div className='font-mono text-[8px] leading-3' dangerouslySetInnerHTML={{ __html: MarcoPhoto }}></div>
    </>

  );
}
