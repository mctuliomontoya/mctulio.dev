'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import { ExternalLink, Linkedin, MoveUpRight, Settings2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { PROJECTS, Project } from '@/app/data/projects'
import ProjectInfoModal from './ProjectInfoModal'

const about =
  'Full Stack Developer with a strong foundation in frontend engineering and a track record of shipping real products — from\n' +
  'SaaS platforms and startup apps to industrial AI systems. Experienced working in remote, cross-functional teams with a sharp\n' +
  'eye for UI/UX detail and clean, maintainable code.'

const experiences = [
  {
    id: '01',
    company: 'Dondii',
    period: 'Apr 2026 - Present',
    role: 'Lead Frontend Developer',
  },
  {
    id: '02',
    company: 'Publisheds – Freelance',
    period: 'Aug 2025 - Present',
    role: 'Frontend Developer',
  },
  {
    id: '03',
    company: 'Outlier AI – Freelance',
    period: 'Mar 2024 - Present',
    role: 'AI Trainer',
  },
  {
    id: '04',
    company: 'Oriux',
    period: 'Aug 2024 - Dec 2024',
    role: 'Internship for Oriux System Development',
  },
]

const links = [
  { id: '01', name: 'LinkedIn', href: 'https://linkedin.com/in/mctulio-montoya' },
  { id: '02', name: 'Github', href: 'https://github.com/mctuliomontoya' },
  { id: '03', name: 'Mail', href: 'mailto:mctulio.dev@gmail.com' },
]

function ColHeader({ label }: { label: string }) {
  return (
    <div className="border-b-2 border-foreground/10 px-4 py-2">
      <span className="font-display text-white/30 text-sm tracking-wide">{label}</span>
    </div>
  )
}

function NumItem({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-row items-baseline border-b-2 border-foreground/10 gap-3 px-4 py-2">
      <span className="font-display text-white/30 text-xs shrink-0">{id}</span>
      <div className="flex flex-row items-center gap-2 pt-2 min-w-0 w-full">
        {children}
      </div>
    </div>
  )
}

function NumItemWide({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-row items-baseline border-b-2 border-foreground/10 gap-3 px-4 py-2">
      <span className="font-display text-white/30 text-xs shrink-0">{id}</span>
      <div className="flex flex-row items-center gap-2 w-full pt-2">
        {children}
      </div>
    </div>
  )
}

function MarqueeText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [overflow, setOverflow] = useState(0)
  const [hovered, setHovered] = useState(false)

  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current || !textRef.current) return
      const diff = textRef.current.scrollWidth - containerRef.current.offsetWidth
      setOverflow(Math.max(0, diff))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [text])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full min-w-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.span
        ref={textRef}
        className={`inline-block whitespace-nowrap ${className ?? ''}`}
        animate={{ x: hovered && overflow > 0 ? -overflow : 0 }}
        transition={
          hovered
            ? { duration: overflow / 60, ease: 'linear', delay: 0.25 }
            : { duration: 0.15, ease: 'easeOut' }
        }
      >
        {text}
      </motion.span>

      {overflow > 0 && (
        <motion.div
          className="absolute inset-y-0 right-0 w-6 pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent, var(--color-background))' }}
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.15 }}
        />
      )}
    </div>
  )
}

export default function Info() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const filteredProjects = PROJECTS.filter((p) => !p.hidden)

  return (
    <>
      <div className="bg-background border-b-2 border-foreground/10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1.1fr_3fr_1fr]">

          {/* ── About ── */}
          <div className="border-b-2 md:border-b-0 border-r-0 md:border-r-2 border-foreground/10">
            <ColHeader label="About" />
            <p className="font-display text-foreground/80 text-sm leading-relaxed px-4 py-4">
              {about}
            </p>
          </div>

          {/* ── Projects ── */}
          <div className="border-b-2 md:border-b-0 border-r-0 md:border-r-2 border-foreground/10">
            <ColHeader label="Projects" />
            <div>
              {filteredProjects.map((p, i) => (
                <NumItem key={p.id} id={String(i + 1).padStart(2, '0')}>
                  <button
                    onClick={() => setSelectedProject(p)}
                    className="w-full text-left font-display text-foreground/70 text-xs hover:text-foreground transition-colors cursor-pointer"
                  >
                    <MarqueeText text={p.title} />
                  </button>
                </NumItem>
              ))}
            </div>
          </div>

          {/* ── Experience ── */}
          <div className="border-b md:border-b-0 border-r-0 md:border-r border-foreground/10">
            <ColHeader label="Experience" />
            <div>
              {experiences.map(e => (
                <NumItemWide key={e.id} id={e.id}>
                  <div className="flex flex-wrap items-center gap-x-3 w-full gap-y-1 min-w-0">
                    <span className="font-display text-foreground/70 text-xs shrink-0">{e.company}</span>
                    <span className="font-display text-white/30 tracking-tight text-xs shrink-0">{e.period}</span>
                    <span className="font-display text-foreground/30 text-xs">—</span>
                    <span className="font-display text-foreground/70 text-xs">{e.role}</span>
                    <div className="flex items-center w-fill justify-end gap-2 ml-auto shrink-0">
                      <ExternalLink size={12} className="text-foreground/30 hover:text-foreground transition-colors cursor-pointer" />
                      <Linkedin size={12} className="text-foreground/30 hover:text-foreground transition-colors cursor-pointer" />
                      <Settings2 size={12} className="text-foreground/30 hover:text-foreground transition-colors cursor-pointer" />
                    </div>
                  </div>
                </NumItemWide>
              ))}
            </div>
          </div>

          {/* ── Links ── */}
          <div>
            <ColHeader label="Links" />
            <div>
              {links.map(l => (
                <NumItem key={l.id} id={l.id}>
                  <a
                    target="_blank"
                    href={l.href}
                    className="font-display text-foreground/80 text-xs hover:underline transition-colors"
                  >
                    {l.name}
                  </a>
                  <MoveUpRight className="size-4 text-foreground/80" />
                </NumItem>
              ))}
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectInfoModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
