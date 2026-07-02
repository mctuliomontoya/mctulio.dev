'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Project, PROJECTS } from '@/app/data/projects'
import ProjectInfoModal from '@/app/components/v2/ProjectInfoModal'

// ─── Types ───────────────────────────────────────────────────────────────────

type TextCell = {
  type: 'text'
  number: string
  symbol: string
  name: string
  company: string
  description: string
}

type ImageCell = {
  type: 'image'
  src: string
  alt: string
  hoverText?: string
  project?: Project
}

type EmptyCell = {
  type: 'empty'
  number?: string
}

type GridCell = TextCell | ImageCell | EmptyCell

// ─── Data ────────────────────────────────────────────────────────────────────
// Edit this array to add, remove, or reorder grid cells.

const GRID_ITEMS: GridCell[] = [
  // Row 1
  {
    type: 'text',
    number: '01',
    symbol: 'Fl',
    name: 'Frontend Lead',
    company: 'Publisheds',
    description:
      'Led frontend development for a digital publishing platform. Built scalable UI architecture, design system components, and shipped features end-to-end.',
  },
  { type: 'image', src: '/images/projects/blockforge/00.webp', alt: 'BlockForge', hoverText: 'BlockForge' },
  { type: 'image', src: '/images/projects/te-ai-cup/01.webp', alt: 'TE AI Cup 2023', hoverText: 'TE AI Cup 2023' },
  {
    type: 'image',
    src: '/images/certificates/anthropic/anthropic_logo.png',
    alt: 'Anthropic Logo',
    hoverText: 'Anthropic Certificates',
    project: PROJECTS.find(p => p.id === 5),
  },
  { type: 'image', src: '/images/projects/te-ai-cup/02.webp', alt: 'TE AI Cup' },
  { type: 'image', src: '/images/projects/te-ai-cup/03.webp', alt: 'TE AI Cup' },
  { type: 'image', src: '/images/projects/te-ai-cup/04.webp', alt: 'TE AI Cup' },

  // Row 2
  { type: 'image', src: '/images/projects/bamx/01.webp', alt: 'BAMX', hoverText: 'BAMX App' },
  { type: 'image', src: '/images/projects/nasa/nasa_background.webp', alt: 'NASA', hoverText: 'NASA Hackathon' },
  {
    type: 'text',
    number: '02',
    symbol: 'Si',
    name: 'Software Intern',
    company: 'Oriux',
    description:
      'Developed internal tools and digitalized company processes at a tech startup using React Native, Expo, and TypeScript.',
  },
  { type: 'image', src: '/images/projects/nasa/nasa_door.webp', alt: 'NASA' },
  { type: 'image', src: '/images/projects/blockforge/01.webp', alt: 'BlockForge' },
  { type: 'image', src: '/images/projects/te-ai-cup/05.webp', alt: 'TE AI Cup' },

  // Row 3
  { type: 'image', src: '/images/projects/covid-alignments/01.webp', alt: 'COVID Research', hoverText: 'Genome Research' },
  { type: 'image', src: '/images/projects/covid-alignments/02.webp', alt: 'COVID Research' },
  { type: 'image', src: '/images/projects/bamx/02.webp', alt: 'BAMX' },
  {
    type: 'text',
    number: '03',
    symbol: 'Ait',
    name: 'AI Trainer',
    company: 'Outlier AI',
    description:
      'Trained and evaluated large language models, focusing on code generation quality, technical accuracy, and reasoning improvements.',
  },
  { type: 'image', src: '/images/projects/blockforge/02.webp', alt: 'BlockForge' },
  { type: 'image', src: '/images/projects/blockforge/03.webp', alt: 'BlockForge' },

  // Row 4
  { type: 'image', src: '/images/projects/nasa/nasa_team.webp', alt: 'NASA Team', hoverText: 'NASA Team' },
  { type: 'image', src: '/images/projects/te-ai-cup/06.webp', alt: 'TE AI Cup' },
  { type: 'image', src: '/images/projects/bamx/03.webp', alt: 'BAMX' },
  { type: 'image', src: '/images/projects/covid-alignments/03.webp', alt: 'COVID Research' },
  { type: 'empty', number: '23' },
  { type: 'empty', number: '24' },
]

// ─── Cell Components ──────────────────────────────────────────────────────────

function TextCellComponent({ cell }: { cell: TextCell }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative flex flex-col justify-end p-4 aspect-square bg-zinc-950 overflow-hidden cursor-default select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="absolute top-3 left-3 text-[10px] font-mono text-white/25 tracking-widest">
        {cell.number}
      </span>

      {/* Hover: description */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-5 bg-zinc-950 transition-opacity duration-300 ${
          hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <p className="text-white/70 text-xs leading-relaxed text-center">{cell.description}</p>
      </div>

      {/* Default: periodic table style */}
      <div className={`transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-5xl md:text-4xl lg:text-5xl text-white leading-none mb-2 font-[family-name:var(--font-instrument)]">
          {cell.symbol}
        </p>
        <p className="text-sm text-white/85 leading-tight">{cell.name}</p>
        <p className="text-[10px] text-white/35 uppercase tracking-widest mt-1">{cell.company}</p>
      </div>
    </div>
  )
}

function ImageCellComponent({ cell, onSelect }: { cell: ImageCell; onSelect: (project: Project) => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`relative aspect-square overflow-hidden bg-zinc-950 ${cell.project ? 'cursor-pointer' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => cell.project && onSelect(cell.project)}
    >
      <Image
        src={cell.src}
        alt={cell.alt}
        fill
        className={`object-cover transition-transform duration-500 ${hovered ? 'scale-105' : 'scale-100'}`}
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
      />

      {cell.hoverText && (
        <div
          className={`absolute inset-0 bg-black/55 flex items-end p-3 transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-white text-xs font-[family-name:var(--font-display)] tracking-wide">
            {cell.hoverText}
          </span>
        </div>
      )}
    </div>
  )
}

function EmptyCellComponent({ cell }: { cell: EmptyCell }) {
  return (
    <div className="relative aspect-square bg-zinc-950">
      {cell.number && (
        <span className="absolute top-3 left-3 text-[10px] font-mono text-white/15 tracking-widest">
          {cell.number}
        </span>
      )}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BentoGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section className="w-full bg-[#000000]">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 gap-px ">
        {GRID_ITEMS.map((cell, i) => {
          if (cell.type === 'text') return <TextCellComponent key={i} cell={cell} />
          if (cell.type === 'image') return <ImageCellComponent key={i} cell={cell} onSelect={setSelectedProject} />
          return <EmptyCellComponent key={i} cell={cell} />
        })}
      </div>

      {selectedProject && (
        <ProjectInfoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}
