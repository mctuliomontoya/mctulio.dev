"use client"

import { useState, useEffect, useRef, type TouchEvent } from "react"
import type { ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { TechCardProps } from "app/types/tech-card-props"
import type { TechCategory } from "app/types/tech-category"
import { technologies } from "app/sections/data/technologies"

function TechCard({ title, icon, color, description }: TechCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 p-4 sm:p-6 transition-all hover:scale-105 hover:shadow-lg">
      <div className={`absolute -right-8 -top-8 h-16 w-16 sm:h-24 sm:w-24 rounded-full ${color} opacity-50 blur-xl`} />
      <div className="relative z-10">
        <div className="mb-2 sm:mb-3 w-8 h-8 sm:w-10 sm:h-10 text-white">{icon}</div>
        <h3 className="mb-1 sm:mb-2 text-lg sm:text-xl font-bold text-white">{title}</h3>
        <p className="text-xs sm:text-sm text-white/70">{description}</p>
      </div>
    </div>
  )
}

function CategoryButton({
                          category,
                          activeCategory,
                          onClick,
                          label,
                        }: {
  category: TechCategory
  activeCategory: TechCategory
  onClick: (category: TechCategory) => void
  label: string
}) {
  const isActive = category === activeCategory

  return (
    <button
      onClick={() => onClick(category)}
      className={`
        px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all
        ${
        isActive
          ? 'bg-foreground text-[#1a2e0a] shadow-lg shadow-[#9eff5c]/20'
          : "bg-black/20 text-white/70 hover:bg-black/30 hover:text-white"
      }
      `}
    >
      {label}
    </button>
  )
}

function PaginationButton({
                            onClick,
                            disabled,
                            children,
                          }: {
  onClick: () => void
  disabled: boolean
  children: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all
        ${
        disabled
          ? "bg-black/10 text-white/30 cursor-not-allowed"
          : "bg-black/20 text-white/70 hover:bg-black/30 hover:text-white"
      }
      `}
    >
      {children}
    </button>
  )
}

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<TechCategory>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  const [isSwiping, setIsSwiping] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const itemsPerPage = 6

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  const filteredTechnologies = technologies.filter(
    (tech) =>
      activeCategory === "all" ||
      (Array.isArray(tech.category) ? tech.category.includes(activeCategory) : tech.category === activeCategory),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredTechnologies.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTechnologies = filteredTechnologies.slice(startIndex, endIndex)

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Touch event handlers for swipe
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
    setTouchEndX(null)
    setIsSwiping(true)
    setSwipeDirection(null)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchStartX) return

    const currentX = e.touches[0].clientX
    setTouchEndX(currentX)

    // Determine swipe direction for visual feedback
    if (currentX < touchStartX) {
      setSwipeDirection("left")
    } else if (currentX > touchStartX) {
      setSwipeDirection("right")
    }
  }

  const handleTouchEnd = () => {
    setIsSwiping(false)

    if (!touchStartX || !touchEndX) return

    const distance = touchEndX - touchStartX
    const isSignificantSwipe = Math.abs(distance) > 50 // Minimum swipe distance

    if (isSignificantSwipe) {
      if (distance > 0 && currentPage > 1) {
        // Swipe right -> previous page
        goToPrevPage()
      } else if (distance < 0 && currentPage < totalPages) {
        // Swipe left -> next page
        goToNextPage()
      }
    }

    setTouchStartX(null)
    setTouchEndX(null)
    setSwipeDirection(null)
  }

  // Calculate swipe transition style
  const getSwipeStyle = () => {
    if (!isSwiping || !swipeDirection || !touchStartX || !touchEndX) return {}

    const distance = touchEndX - touchStartX
    const maxTranslate = 50 // Maximum pixels to translate during swipe

    // Limit the translation to maxTranslate pixels
    const translateX = Math.min(Math.abs(distance), maxTranslate) * (distance < 0 ? -1 : 1)

    // Only apply translation if we can navigate in that direction
    if ((distance < 0 && currentPage >= totalPages) || (distance > 0 && currentPage <= 1)) {
      return {}
    }

    return {
      transform: `translateX(${translateX}px)`,
      transition: "none",
    }
  }

  return (
    <div className="border-b border-foreground/40 pb-4 pt-4 lg:pt-20 items-center justify-around lg:pb-36 overflow-x-hidden ">
      <div className="container mx-auto px-4">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="mt-10 md:mt-16 text-center text-4xl mb-3 sm:mb-4 text-3xl sm:text-4xl font-bold text-foreground ">Tech Stack</h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-white/80 mb-6 sm:mb-8">
            The technologies and tools I use to bring ideas to life
          </p>

          {/* Category Switcher */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8">
            <CategoryButton
              category="all"
              activeCategory={activeCategory}
              onClick={setActiveCategory}
              label="All Technologies"
            />
            <CategoryButton
              category="languages"
              activeCategory={activeCategory}
              onClick={setActiveCategory}
              label="Languages"
            />
            <CategoryButton
              category="frameworks"
              activeCategory={activeCategory}
              onClick={setActiveCategory}
              label="Frameworks"
            />
            <CategoryButton
              category="cloud"
              activeCategory={activeCategory}
              onClick={setActiveCategory}
              label="Cloud Services"
            />
            <CategoryButton
              category="tools"
              activeCategory={activeCategory}
              onClick={setActiveCategory}
              label="Tools & Databases"
            />
          </div>
        </div>

        {/* Fixed height container with swipe support */}
        <div
          className="relative"
          ref={containerRef}
          onTouchStart={totalPages > 1 ? handleTouchStart : undefined}
          onTouchMove={totalPages > 1 ? handleTouchMove : undefined}
          onTouchEnd={totalPages > 1 ? handleTouchEnd : undefined}
        >
          {/* Swipe indicator - only visible during swipe */}
          {isSwiping && swipeDirection && (
            <div
              className={`absolute inset-0 z-10 flex items-center justify-${swipeDirection === "left" ? "end" : "start"} pointer-events-none opacity-50`}
            >
              <div className="bg-[#9eff5c]/20 rounded-full p-4">
                {swipeDirection === "left" ? (
                  <ChevronRight className="w-8 h-8 text-[#9eff5c]" />
                ) : (
                  <ChevronLeft className="w-8 h-8 text-[#9eff5c]" />
                )}
              </div>
            </div>
          )}

          {/* Tech Cards Grid with fixed height */}
          <div className="min-h-[400px] sm:min-h-[500px] md:min-h-[400px] relative">
            <div
              className="grid grid-cols-1 w-2/3 mx-auto sm:w-full gap-3 sm:gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 content-start"
              style={getSwipeStyle()}
            >
              {currentTechnologies.map((tech, index) => (
                <TechCard
                  key={`${tech.title}-${index}`}
                  title={tech.title}
                  icon={tech.icon}
                  color={tech.color}
                  description={tech.description}
                  category={tech.category}
                />
              ))}
            </div>

            {/* Empty state */}
            {filteredTechnologies.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm sm:text-base text-white/70">No technologies found in this category.</p>
              </div>
            )}
          </div>

          {/* Mobile swipe hint - show only on first load */}
          {totalPages > 1 && (
            <div className="mt-4 text-center text-xs text-white/50 sm:hidden">
              Swipe left or right to navigate pages
            </div>
          )}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <PaginationButton onClick={goToPrevPage} disabled={currentPage === 1}>
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </PaginationButton>

            <div className="text-sm sm:text-base text-white/70">
              <span className="text-white font-medium">{currentPage}</span> / {totalPages}
            </div>

            <PaginationButton onClick={goToNextPage} disabled={currentPage === totalPages}>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </PaginationButton>
          </div>
        )}
      </div>
    </div>
  )
}

