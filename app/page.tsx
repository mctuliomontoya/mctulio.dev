"use client"
import {MarcoPhoto } from '@/app/components/MarcoPhoto'
import Landing from '@/app/sections/Landing'

export default function Home() {
  return (
    <>
      <Landing />
      <div id='background'>
      </div>
      <div className='font-mono text-[8px] leading-3' dangerouslySetInnerHTML={{ __html: MarcoPhoto }}></div>
      <div className='font-mono text-[8px] leading-3' dangerouslySetInnerHTML={{ __html: MarcoPhoto }}></div>
      <div className='font-mono text-[8px] leading-3' dangerouslySetInnerHTML={{ __html: MarcoPhoto }}></div>
      <div className='font-mono text-[8px] leading-3' dangerouslySetInnerHTML={{ __html: MarcoPhoto }}></div>
    </>

  );
}
