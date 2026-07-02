import { JSX } from 'react'
import { TAGS } from '@/app/constants/tags'
import { Tag } from '@/app/types/tag'

export interface Project {
  id: number
  hidden? : boolean
  title: string
  date: string
  description: JSX.Element
  images: string[]
  link?: string
  technologies: Tag[]
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'AI Sorting Process Optimization',
    date: 'Oct 2023 - Feb 2024',
    description: (
      <ul className='pl-5 space-y-3 list-disc marker:text-foreground text-white'>
        <li>
          Created several Machine Vision models to classify and filter defective
          parts in assembly plants.
        </li>
        <li>
          Using Python for data augmentation and segmentation to provide models
          with quality data.
        </li>
        <li>
          Set up and calibration of hardware tools such as cameras, lenses and
          lights for data acquisition, floor assembly and live data
          classification.
        </li>
        <li>
          The project was carried out as part of a hackathon, providing a
          valuable solution that will be used in the industry.
        </li>
      </ul>
    ),
    images: [
      '/images/projects/te-ai-cup/01.webp?height=300&width=300',
      '/images/projects/te-ai-cup/02.webp?height=300&width=300',
      '/images/projects/te-ai-cup/03.webp?height=300&width=300',
      '/images/projects/te-ai-cup/04.webp?height=300&width=300',
      '/images/projects/te-ai-cup/05.webp?height=300&width=300',
      '/images/projects/te-ai-cup/06.webp?height=300&width=300',
      '/images/projects/te-ai-cup/07.webp?height=300&width=300',
      '/images/projects/te-ai-cup/08.webp?height=300&width=300',
      '/images/projects/te-ai-cup/09.gif?height=300&width=300',
    ],
    technologies: [TAGS.MACHINE_VISION, TAGS.MERLIC, TAGS.PYTHON],
  },
  {
    id: 2,
    title: 'BlockForge - Blockchain Mockup Page',
    date: 'Nov 2024',
    description: (
      <ul className='pl-5 space-y-3 list-disc marker:text-foreground text-white'>
        <li>
          Collaborated with a team to digitalize a company's process into a
          React Native application.
        </li>
        <li>
          The app allows users to create and review logs depending on their
          role, and raise incident reports.
        </li>
        <li>Sent notifications when room temperatures were detected out of range.</li>
        <li>
          Used TailwindCSS to give the application a modern, compact and
          intuitive design.
        </li>
      </ul>
    ),
    images: [
      '/images/projects/blockforge/00.webp?height=300&width=300',
      '/images/projects/blockforge/01.webp?height=300&width=300',
      '/images/projects/blockforge/02.webp?height=300&width=300',
      '/images/projects/blockforge/03.webp?height=300&width=300',
      '/images/projects/blockforge/04.webp?height=300&width=300',
      '/images/projects/blockforge/05.webp?height=300&width=300',
      '/images/projects/blockforge/06.webp?height=300&width=300',
    ],
    link: 'https://frontend-saas.vercel.app/',
    technologies: [TAGS.NEXT, TAGS.TYPESCRIPT, TAGS.REACT, TAGS.TAILWIND],
  },
  {
    id: 3,
    title: 'Company incident and logs manager',
    date: 'Sep - Dec 2023',
    description: (
      <ul className='pl-5 space-y-3 list-disc marker:text-foreground text-white'>
        <li>
          Collaborated with a team to digitalize a company's process into a
          React Native application.
        </li>
        <li>
          The app allows users to create and review logs depending on their
          role, and raise incident reports.
        </li>
        <li>Sent notifications when room temperatures were detected out of range.</li>
        <li>
          Used TailwindCSS to give the application a modern, compact and
          intuitive design.
        </li>
      </ul>
    ),
    images: [
      '/images/projects/bamx/bamx.svg?height=300&width=300',
      '/images/projects/bamx/01.webp?height=300&width=300',
      '/images/projects/bamx/02.webp?height=300&width=300',
      '/images/projects/bamx/03.webp?height=300&width=300',
      '/images/projects/bamx/04.webp?height=300&width=300',
    ],
    technologies: [TAGS.TYPESCRIPT, TAGS.TAILWIND, TAGS.REACT_NATIVE, TAGS.EXPO],
  },
  {
    id: 4,
    title: 'Coronavirus variations database',
    date: 'Mar - Apr 2022',
    description: (
      <ul className='pl-5 space-y-3 list-disc marker:text-foreground text-white'>
        <li>
          Collaborated with a team to develop a Rstudio project that reads,
          orients, aligns and displays tables to compare different genomes
          deviated from SARS-CoV-2.
        </li>
        <li>Registration of data from different types of genome derived from Coronavirus.</li>
        <li>Reading and manipulation of 29,000+ character genome sequences.</li>
        <li>
          Interpretation of data through graphical resources created by an R
          script.
        </li>
      </ul>
    ),
    images: [
      '/images/projects/covid-alignments/01.webp?height=300&width=300',
      '/images/projects/covid-alignments/02.webp?height=300&width=300',
      '/images/projects/covid-alignments/03.webp?height=300&width=300',
    ],
    technologies: [TAGS.RSTUDIO],
  },
  {
    id: 5,
    hidden: true,
    title: 'Anthropic Certifications',
    date: '2026',
    description: (
      <ul className='pl-5 space-y-3 list-disc marker:text-foreground text-white'>
        <li>Completed Anthropic&apos;s official training courses on Claude.</li>
        <li>
          Covered prompt design, agentic workflows, and best practices for
          building with Claude models.
        </li>
      </ul>
    ),
    images: [
      '/images/certificates/anthropic/certificate-qd786onntgv9-1782688103_page-0001.jpg',
      '/images/certificates/anthropic/certificate-qdtoke7rsazs-1782518076_page-0001.jpg',
    ],
    technologies: [],
  },
]
