'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectModal from './../../ProjectModal'
import { twMerge } from 'tailwind-merge'
import { PROJECTS } from '@/app/data/projects'

export default function PortfolioGrid() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div className='border-b border-foreground/40 pb-4 pt-4 lg:pt-10 items-center justify-around lg:pb-36'>
      <div className='container mx-auto px-4 py-8'>
        <h4 className='my-10 md:my-16 text-center text-4xl'>Projects</h4>
        <motion.div
          className='md:w-1/2 mx-auto grid grid-cols-1 md:grid-cols-4 gap-4'
          initial='hidden'
          animate='visible'
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {PROJECTS.map(project => (
            <motion.div
              key={project.id}
              layoutId={`project-${project.id}`}
              onClick={() => setSelectedId(project.id)}
              className={twMerge(
                'cursor-pointer  overflow-hidden col-span-2 rounded-lg shadow-lg',
                project.id === 1 || project.id === 4
                  ? 'md:col-span-3'
                  : 'md:col-span-1',
              )}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <motion.div className='w-full h-full pb-[75%] md:pb-[100%] relative'>
                <Image
                  className='project-image-clicker cursor-pointer'
                  src={project.images[0] || '/placeholder.svg'}
                  alt={project.title}
                  layout='fill'
                  objectFit='cover'
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        <AnimatePresence>
          {selectedId && (
            <ProjectModal
              project={PROJECTS.find(p => p.id === selectedId)!}
              onClose={() => setSelectedId(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
