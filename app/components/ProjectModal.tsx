"use client"

import { JSX, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { COLORS } from '@/app/constants/tag-colors'
import {Tag} from "@/app/types/tag";

interface Project {
  id: number
  title: string
  date: string
  description: JSX.Element
  images: string[]
  link?: string
  technologies: Tag[]
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  let sliderRef: Slider | null = null
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props } : {currentSlide: number, slideCount: number}) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" +
        (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0}
      type="button"
    >
      Previous
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props } : {currentSlide: number, slideCount: number}) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1}
      type="button"
    >
      Next
    </button>
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    slickPrev: <div></div>,
    slickNext: <div></div>,
    // @ts-expect-error: the attributes are passed by the package
    prevArrow: <SlickArrowLeft />,
    // @ts-expect-error: the attributes are passed by the package
    nextArrow: <SlickArrowRight />,
    adaptiveHeight: true,
  }

  const goToNext = () => {
    sliderRef?.slickNext()
  }

  const goToPrev = () => {
    sliderRef?.slickPrev()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 overflow-y-hidden bg-foreground/20 backdrop-blur-xl flex items-center justify-center p-4 z-50"
    >
      <motion.div
        layoutId={`project-${project.id}`}
        className="bg-background rounded-lg overflow-hidden shadow-xl w-full md:max-w-2xl"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div className="relative h-full flex flex-col">
          {/* Image Section */}
          <motion.div
            className="relative bg-background"
            style={{ height: "50vh" }}
          >
            <div className="absolute inset-0">
              {/*@ts-expect-error: this is not typed.*/}
                <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                  {project.images.map((image, index) => (
                    <div key={index} className="relative h-[50vh] w-full">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </Slider>
            </div>
            <AnimatePresence>
              <motion.div
                className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  onClick={goToPrev}
                  className="pointer-events-auto bg-background/50 rounded-full p-2 hover:bg-contrast/75 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                  onClick={goToNext}
                  className="pointer-events-auto bg-background/50 rounded-full p-2 hover:bg-contrast/75 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={24} />
                </motion.button>
              </motion.div>
            </AnimatePresence>
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/50 px-2 py-1 rounded-full text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-pixel text-xl">{currentSlide + 1} / {project.images.length}</p>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="p-6 bg-background overflow-y-auto"
            style={{ maxHeight: "calc(40vh - 2rem)" }}
          >
            <ul className="flex flex-row flex-wrap mb-2 gap-y-2 gap-x-2">
              {project.technologies.map((tech, index) => (
                <li key={index}>
                        <span
                          className={`flex gap-x-2 rounded-full text-xs ${
                            COLORS[tech.code] || "bg-gray-100 text-gray-800"
                          } py-1 px-2`}
                        >
                          <tech.icon className="hidden md:block size-4" />
                          <span>{tech.name}</span>
                        </span>
                </li>
              ))}
            </ul>
            <div>
              <p className="text-sm flex">
                {project.date}
              </p>
              <div className='flex  items-center'>
                <h2 className="text-xl md:text-2xl font-bold">
                  {project.title}
                </h2>
                {project.link && (
                  <a href={project.link} className='ml-4' target="_blank">
                    <svg fill="none" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-foreground/20 mb-2'>
                      <path
                        d="M21 11V3h-8v2h4v2h-2v2h-2v2h-2v2H9v2h2v-2h2v-2h2V9h2V7h2v4h2zM11 5H3v16h16v-8h-2v6H5V7h6V5z"
                        fill="currentColor" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {project.description}
          </motion.div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute transition  duration-300 ease-in-out  hover:scale-115 hover:bg-black top-4 right-4 z-10 bg-background/40 rounded-full p-1"

          >
            <X size={24} />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}