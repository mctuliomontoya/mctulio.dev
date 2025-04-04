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
      className="fixed inset-0 overflow-y-hidden bg-foreground/20 backdrop-filter-md bg-opacity-50 flex items-center justify-center p-4 z-50"
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
              {currentSlide + 1} / {project.images.length}
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
                    <svg width="48" height="48" viewBox="0 0 99 111" xmlns="http://www.w3.org/2000/svg"
                         strokeWidth="1px" strokeLinecap="round" strokeLinejoin="round"
                         className='fill-foreground/20 size-3/4'>
                      <path
                        d="M76.29 81.8519C76.29 83.6919 76.1901 85.4519 75.9901 87.1119C75.5701 90.7219 74.69 93.912 73.34 96.672C73.14 97.082 72.93 97.4919 72.71 97.8819C70.83 101.312 68.37 103.892 65.35 105.612C61.98 107.532 58.04 108.312 53.54 107.962C49.03 107.612 44.23 105.972 39.14 103.032C36.32 101.402 33.6101 99.4819 30.9901 97.2619C28.3801 95.0419 25.77 92.5019 23.15 89.6519L29.45 86.062C31.03 87.612 32.6301 89.0019 34.2401 90.2519C35.8601 91.5019 37.49 92.602 39.14 93.562C47.12 98.162 53.93 98.8619 59.57 95.6419C60.27 95.2419 60.92 94.8019 61.53 94.3219C63.84 92.4719 65.54 89.9719 66.6 86.8319C67.46 84.3719 67.9299 81.5219 68.0099 78.2619C68.0199 77.8719 68.03 77.4919 68.03 77.0919C68.03 76.2119 68 75.322 67.95 74.432C67.6 68.412 66.04 62.2719 63.27 56.0119C63.12 55.6519 62.96 55.3019 62.79 54.9519C61.91 53.0419 60.92 51.1319 59.82 49.2019C59.74 49.0519 59.66 48.9119 59.57 48.7619C58.8 47.4219 58 46.1319 57.18 44.9019C57.05 44.7019 56.92 44.502 56.78 44.312C52.63 38.152 47.92 33.2119 42.64 29.5119C41.84 28.9419 41.02 28.4019 40.19 27.9019C39.85 27.6719 39.49 27.4619 39.14 27.2619C36.53 25.7519 34.04 24.6619 31.68 23.9919C28.29 23.0319 25.17 22.9319 22.3 23.7119C21.06 24.0319 19.87 24.522 18.72 25.172C13.08 28.392 10.2599 34.5719 10.2599 43.7319C10.2599 45.6219 10.39 47.5819 10.67 49.5919C10.94 51.6019 11.36 53.682 11.91 55.812L5.72003 59.3419C4.48003 55.7819 3.54999 52.3119 2.92999 48.9119C2.30999 45.5219 2 42.2019 2 38.9619C2 33.1219 2.98 28.1819 4.94 24.1519C6.9 20.1119 9.57 17.1319 12.94 15.2119L14.5001 14.432C17.5101 13.082 20.9301 12.5519 24.7501 12.8519C25.0301 12.8719 25.3 12.902 25.58 12.932C29.13 13.332 32.8599 14.5219 36.7599 16.5019C37.5399 16.9019 38.34 17.3319 39.14 17.7919C44.23 20.7319 49.03 24.6219 53.54 29.4719C55.55 31.6319 57.44 33.8919 59.21 36.2419C61.44 39.1719 63.48 42.2419 65.35 45.4719C65.49 45.7219 65.64 45.9719 65.77 46.2219C68.02 50.1619 69.93 54.2319 71.52 58.4019C72.19 60.1319 72.79 61.8719 73.34 63.6419C75.31 69.9419 76.29 76.0119 76.29 81.8519Z"
                        stroke="currentColor" strokeLinejoin="round" />
                      <path
                        d="M83.8605 96.3621C84.3705 96.1421 84.8705 95.8821 85.3505 95.6121L83.8605 96.3621ZM43.1504 79.6521C43.1504 79.6521 43.2304 79.7421 43.2704 79.7821V79.582L43.1504 79.6521Z"
                        stroke="currentColor" strokeLinejoin="round" />
                      <path
                        d="M43.2703 64.6816V66.0916L27.7803 74.9216L7.78027 84.9216L27.1703 73.8616L43.2703 64.6816Z"
                        stroke="currentColor" strokeLinejoin="round" />
                      <path
                        d="M26.9597 48.6317L25.7197 49.3417L5.71973 59.3417L11.9097 55.8118L25.5897 48.9717L26.6298 48.4517L26.9597 48.6317Z"
                        stroke="currentColor" strokeLinejoin="round" />
                      <path
                        d="M51.52 53.3518V86.5018L47.69 84.2919L43.27 81.7318V64.6819L27.17 73.8618L7.77997 84.9219L2 74.9518L37.4901 54.7218L26.96 48.6318L26.6301 48.4518L25.1301 47.5818L22.64 46.1418V36.6719L30.97 41.4818L46.97 50.7218L51.52 53.3518Z"
                        stroke="currentColor" strokeLinejoin="round" />
                      <path
                        d="M96.2899 71.8516C96.2899 77.6916 95.31 82.6317 93.34 86.6717C91.38 90.7117 88.72 93.6916 85.35 95.6116L83.86 96.3616L65.35 105.612C68.37 103.892 70.83 101.312 72.71 97.8817C72.93 97.4917 73.14 97.0817 73.34 96.6717C74.69 93.9117 75.57 90.7216 75.99 87.1116C76.19 85.4516 76.2899 83.6916 76.2899 81.8516C76.2899 76.0116 75.31 69.9417 73.34 63.6417C72.79 61.8717 72.1899 60.1317 71.5199 58.4017C69.9299 54.2317 68.0199 50.1616 65.7699 46.2216C65.6399 45.9716 65.49 45.7216 65.35 45.4716C63.48 42.2416 61.44 39.1716 59.21 36.2416C57.44 33.8916 55.5499 31.6316 53.5399 29.4716C49.0299 24.6216 44.2299 20.7317 39.1399 17.7917C38.3399 17.3317 37.5399 16.9016 36.7599 16.5016C32.8599 14.5216 29.13 13.3317 25.58 12.9317C25.3 12.9017 25.03 12.8716 24.75 12.8516C20.93 12.5516 17.51 13.0817 14.5 14.4317L32.9399 5.21161C36.3099 3.29161 40.25 2.50163 44.75 2.85163C49.26 3.20163 54.0499 4.85169 59.1399 7.79169C64.2299 10.7317 69.0299 14.6216 73.5399 19.4716C78.0399 24.3216 81.98 29.6516 85.35 35.4716C88.72 41.2816 91.38 47.3417 93.34 53.6417C95.31 59.9417 96.2899 66.0116 96.2899 71.8516Z"
                        stroke="currentColor" strokeLinejoin="round" />
                      <path
                        d="M22.6398 36.6718V46.1417L25.1299 47.5817L26.6299 48.4517L25.5898 48.9717L11.9098 55.8118C11.3598 53.6818 10.9398 51.6017 10.6698 49.5917C10.3898 47.5817 10.2598 45.6217 10.2598 43.7317C10.2598 34.5717 13.0798 28.3918 18.7198 25.1718C19.8698 24.5218 21.0598 24.0317 22.2998 23.7117C25.1698 22.9317 28.2898 23.0317 31.6798 23.9917C30.8098 26.5217 30.3398 29.4817 30.2798 32.8517L22.6398 36.6718Z"
                        stroke="currentColor" strokeLinejoin="round" />
                      <path
                        d="M59.8197 49.2018L51.5197 53.3518L46.9697 50.7218L30.9697 41.4818L22.6396 36.6719L30.2797 32.8518L40.1897 27.9019C41.0197 28.4019 41.8396 28.9418 42.6396 29.5118C47.9196 33.2118 52.6297 38.1519 56.7797 44.3119C56.9197 44.5019 57.0497 44.7019 57.1797 44.9019C57.9997 46.1319 58.7997 47.4218 59.5697 48.7618C59.6597 48.9118 59.7397 49.0518 59.8197 49.2018Z"
                        stroke="currentColor" strokeLinejoin="round" />
                      <path
                        d="M68.0295 77.0917C68.0295 77.4917 68.0195 77.8717 68.0095 78.2517L58.3596 83.0817L51.5195 86.5017V53.3517L59.8196 49.2017C60.9196 51.1317 61.9096 53.0417 62.7896 54.9517C62.9596 55.3017 63.1195 55.6517 63.2695 56.0117C66.0395 62.2717 67.5996 68.4118 67.9496 74.4318C67.9996 75.3218 68.0295 76.2117 68.0295 77.0917Z"
                        stroke="currentColor" strokeLinejoin="round" />
                      <path
                        d="M66.6002 86.8318C65.5402 89.9718 63.8402 92.4718 61.5302 94.3218C60.9202 94.8018 60.2702 95.2418 59.5702 95.6418C53.9302 98.8618 47.1201 98.1619 39.1401 93.5619C37.4901 92.6019 35.8602 91.5018 34.2402 90.2518C32.6302 89.0018 31.0302 87.6119 29.4502 86.0619L43.2701 79.1519V79.5818L43.1501 79.6519C43.1501 79.6519 43.2301 79.7419 43.2701 79.7819V81.7318L47.6902 84.2919L51.5201 86.5018L58.3602 83.0818C58.6202 83.2518 58.8801 83.4119 59.1401 83.5619C61.7501 85.0719 64.2402 86.1618 66.6002 86.8318Z"
                        stroke="currentColor" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {project.description}
          </motion.div>

          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-background/50 rounded-full p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}