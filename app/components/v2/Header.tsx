'use client'

import React from 'react'
import FloatingText from '@assets/html/FloatingText'
import { ArrowRight } from 'lucide-react'

export default function Header() {
  return (
    <div className="bg-background border-b-2 border-t-2  border-foreground/10">

      {/* ── Desktop ── */}
      <div className="hidden md:flex flex-row items-stretch">
        <div className="shrink-0 border-r-2 border-foreground/10 p-2">
          <FloatingText className='w-50' rows={11} cols={20}  />
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 py-6">
          <h1 className="font-instrument-italic text-foreground md:text-6xxl lg:text-7xl text-5xl leading-tight">
            Marco Montoya
          </h1>
          <p className="font-display text-foreground/60 text-lg ">
            Frontend developer
          </p>
        </div>

        <div className="shrink-0 flex items-center px-8">
          <span className="font-display text-white/60 hover:text-white hover:scale-105 transition-all flex flex-row items-center gap-3  tracking-wide">
            mctulio.dev@gmail.com
          <ArrowRight />
          </span>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex md:hidden flex-row">
        <div className="border-r flex justify-center  border-foreground/10 p-2">
          <FloatingText className='w-50' rows={6} cols={30} />
        </div>

        <div className="flex flex-col px-6 py-4">
          <h1 className="font-instrument-italic text-foreground text-4xl leading-tight">
            Marco Montoya
          </h1>
          <p className="font-display text-foreground/60 text-base mt-1">
            Frontend developer
          </p>
        </div>
      </div>

    </div>
  )
}
