'use client'
import HeroAnimatedText from '../components/HeroAnimatedText'
import { MarcoPhoto } from '@/app/components/MarcoPhoto'
import Heart from '@/app/components/Heart'

export default function Hero() {
  return (
    <div className="border-b border-foreground/40 pb-4 pt-4 lg:pt-20 items-center justify-around lg:pb-36">
      <div className=" container flex flex-wrap items-center justify-around">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start text-justify">
            <span

              className="bg-gradient-to-r from-foreground via-foreground to-white bg-clip-text text-md tracking-tight text-transparent"
            >
              <HeroAnimatedText />
            </span>

            <span
              className="my-2 max-w-xl py-6 text-lg lg:text-xl md:mx-0 font-light tracking-tighter mx-4"
            >
              I&apos;m a passionate computer engineering student at Instituto Tecnológico y de Estudios Superiores de Monterrey
              , I&apos;m always trying to find new technologies and tools to help me
              develop new experiences for users, and expand my knowledge in the area.
              <br />

              I<Heart />web design & development, especially React.
            </span>
          </div>
        </div>
        <div className="w-full h-full lg:w-1/2 lg:p-8 ">
          <div

            className="flex justify-center md:justify-end content-center"
          >
            <div
              className="font-mono text-[6px] md:text-[8px] md:leading-[0.7rem] lg:text-[11px] lg:leading-[0.9rem] leading-[0.5rem]"
              dangerouslySetInnerHTML={{ __html: MarcoPhoto }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
