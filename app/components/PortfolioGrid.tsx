'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectModal from './ProjectModal'

interface Project {
  id: number
  title: string
  description: string
  images: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Project 1",
    description: "This is a detailed description of Project 1. It was a challenging project that involved creating a responsive web application using React and Next.js. The main features include user authentication, real-time data updates, and integration with a third-party API. We faced several challenges during development, particularly in optimizing performance for mobile devices, but overcame them through careful code refactoring and the use of efficient data structures.",
    images: [
      "/im1.jpeg?height=300&width=300",
      "/im3.png?height=300&width=300",
      "/im4.png?height=300&width=300",
    ],
  },
  {
    id: 2,
    title: "Project 2",
    description: "Project 2 was an e-commerce platform built with a focus on user experience and performance. We implemented a custom shopping cart solution, integrated various payment gateways, and created a robust product management system for administrators. One of the key challenges was ensuring fast page load times despite having a large product catalog. We solved this by implementing efficient caching strategies and lazy loading techniques.",
    images: ["/im6.png?height=300&width=300", "/im4.png?height=300&width=300"],
  },
  {
    id: 3,
    title: "Project 3",
    description: "Project 3 focused on developing a mobile app for a startup in the fitness industry. We used React Native to create a cross-platform solution that works seamlessly on both iOS and Android. The app features personalized workout plans, progress tracking, and social sharing capabilities. One of our main challenges was optimizing the app's performance and ensuring smooth animations across different devices.",
    images: [
      "/im5.png?height=300&width=300",
      "/im2.jpeg?height=300&width=300",
      "/im6.png?height=300&width=300",
    ],
  },
  {
    id: 4,
    title: "Project 4",
    description: "For Project 4, we developed a data visualization dashboard for a large corporation. Using D3.js and React, we created interactive charts and graphs that help the company make data-driven decisions. The main challenge was handling and efficiently rendering large datasets without compromising the user experience. We implemented various optimization techniques, including data aggregation and lazy loading of chart components.",
    images: ["/im8.png?height=300&width=300", "/im7.jpeg?height=300&width=300"],
  },
]

export default function PortfolioGrid() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`project-${project.id}`}
            onClick={() => setSelectedId(project.id)}
            className="cursor-pointer overflow-hidden rounded-lg shadow-lg"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            // whileHover={{ scale: 1.05 }}
            // whileTap={{ scale: 0.95 }}
          >
            <motion.div className="w-full h-0 pb-[75%] md:pb-[100%] relative">
              <Image
                src={project.images[0] || "/placeholder.svg"}
                alt={project.title}
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      <AnimatePresence>
        {selectedId && (
          <ProjectModal
            project={projects.find(p => p.id === selectedId)!}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
