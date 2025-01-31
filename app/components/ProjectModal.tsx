"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface Project {
  id: number
  title: string
  description: string
  images: string[]
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  let sliderRef: Slider | null = null
  const SlickArrowLeft = ({ currentSlide, ...props }) => (
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
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
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
    prevArrow: <SlickArrowLeft />,
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
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              {project.title}
            </h2>
            <p className="text-sm md:text-base">
              {project.description}
            </p>
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