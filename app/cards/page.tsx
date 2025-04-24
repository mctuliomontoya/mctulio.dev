import Image from 'next/image'
import React from 'react'


export default function Home() {


  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <div className='text-lg mt-4'>
        <Image src={'/marco-image.webp'} alt={'se'} className={'size-25 size-40 w-full'} width={100}
               height={100} />
      </div>
      <div className='text-3xl font-bold  mb-5 text-center border-b-1 border-dashed border-foreground'>
        All My links
      </div>
      <ul className={'flex text-lg flex-col gap-5 text-center'}>
        <li>
          <a href="https://mctulio.dev">Page</a>
        </li>
        <li className="">
          <a href="https://www.linkedin.com/in/mctulio-montoya/" target="_blank">LinkedIn</a>
        </li>
        <li>
          <a href="https://github.com/mctuliomontoya" target="_blank">GitHub</a>
        </li>
        <li>
          <a href="mailto:mctulio.dev@gmail.com">Mail</a>
        </li>
        <li>
          <a href="/Resume.pdf" target="_blank">Résumé</a>
        </li>
      </ul>
    </div>
  )
    ;
}