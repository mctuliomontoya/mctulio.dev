'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, MoveUpRight } from 'lucide-react'
import { Project } from '@/app/data/projects'
import { COLORS } from '@/app/constants/tag-colors'

interface ProjectInfoModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectInfoModal({ project, onClose }: ProjectInfoModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const total = project.images.length

  const goNext = () => setCurrentSlide(i => (i + 1) % total)
  const goPrev = () => setCurrentSlide(i => (i - 1 + total) % total)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
          onClick={e => e.stopPropagation()}
          className="relative bg-background border border-foreground/30 w-full max-w-3xl  overflow-hidden"
        >
          {/* Carousel */}
          <div className="relative h-80 bg-black overflow-hidden">
            <Image
              src={project.images[currentSlide]}
              alt={`${project.title} - ${currentSlide + 1}`}
              fill
              className="object-contain"
              priority
            />

            {/* Nav arrows */}
            {total > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-1 transition-colors"
                >
                  <ChevronLeft size={18} className="text-foreground" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-1 transition-colors"
                >
                  <ChevronRight size={18} className="text-foreground" />
                </button>
              </>
            )}

            {/* Slide counter */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 px-2 py-0.5">
              <span className="font-display text-foreground/70 text-xs">
                {currentSlide + 1} / {total}
              </span>
            </div>

            {/* Dots */}
            {total > 1 && (
              <div className="absolute bottom-2 right-3 flex gap-1">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-1.5 h-1.5 transition-colors ${
                      i === currentSlide ? 'bg-foreground' : 'bg-foreground/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Title + link */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-display text-foreground/30 text-xs mb-1">{project.date}</p>
                <h2 className="font-instrument-italic text-2xl text-foreground leading-tight">
                  {project.title}
                </h2>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 mt-1 text-foreground/40 hover:text-foreground transition-colors"
                >
                  <MoveUpRight size={16} />
                </a>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className={`flex items-center gap-1 text-xs py-0.5 px-2 ${
                    COLORS[tech.code] || 'bg-foreground/10 text-foreground/70'
                  }`}
                >
                  <tech.icon className="size-3" />
                  {tech.name}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="text-sm text-foreground/70 max-h-36 overflow-y-auto">
              {project.description}
            </div>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 p-1 transition-colors"
          >
            <X size={16} className="text-foreground" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
