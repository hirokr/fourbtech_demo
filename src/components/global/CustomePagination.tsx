"use client"

import clsx from "clsx"
import { useEffect, useState } from "react"

interface CustomPaginationProps {
  totalSlides: number
  swiperRef: { current: { swiper: { realIndex: number; on: (event: string, callback: () => void) => void; off: (event: string, callback: () => void) => void; slideTo: (index: number) => void } } } | null
  customClass?: string
}

export function CustomPagination({ totalSlides, swiperRef, customClass }: CustomPaginationProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  // Remove unused swiper variable since we're using swiperRef directly
  const custom = customClass?.split(" ")
  const pageClass = custom?.[0] ?? ""
  const bgCol = custom?.[1] ?? ""

  useEffect(() => {
    if (!swiperRef?.current?.swiper) return

    const swiperInstance = swiperRef.current.swiper

    const updateActiveIndex = () => {
      setActiveIndex(swiperInstance.realIndex)
    }

    swiperInstance.on("slideChange", updateActiveIndex)

    return () => {
      swiperInstance.off("slideChange", updateActiveIndex)
    }
  }, [swiperRef]) // Only depend on swiperRef

  const handleBulletClick = (index: number) => {
    if (swiperRef?.current?.swiper) {
      swiperRef.current.swiper.slideTo(index)
    }
  }

  return (
    <div className={clsx("right-0 bottom-4 left-0 z-10 flex items-center justify-center space-x-2", pageClass)}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => handleBulletClick(index)}
          className={`${bgCol} h-2 rounded-full transition-all duration-300 ${
            activeIndex === index ? "w-8 opacity-100" : "w-4 opacity-50"
          }`}
          aria-label={`Go to slide ${index + 1}`}
          type="button"
        />
      ))}
    </div>
  )
}
