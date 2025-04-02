import type { ReactNode } from 'react'
import type { TechCategory } from './tech-category'

interface TechCardProps {
  title: string
  icon: ReactNode
  color: string
  description: string
  category: TechCategory | TechCategory[]
}

export type { TechCardProps }