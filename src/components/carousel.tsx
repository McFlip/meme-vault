"use client"
import { useState } from "react"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react"
import Image from "next/image"

export function Carousel({ memes }: { memes: string[] }) {
  const [slideIdx, setSlideIdx] = useState(0)
  const handlePrevious = () => {
    if (slideIdx === 0 || memes.length === 0) {
      return
    }
    setSlideIdx(slideIdx - 1)
  }
  const handleNext = () => {
    if (slideIdx === memes.length - 1 || memes.length === 0) {
      return
    }
    setSlideIdx(slideIdx + 1)
  }
  return (
    <section
      id="myCarousel"
      aria-roledescription="carousel"
      aria-label="Browse Search Results"
    >
      <div className="container">
        <div className="container">
          <button
            type="button"
            aria-controls="myCarousel-items"
            aria-label="Previous Slide"
            onClick={(_e) => handlePrevious()}
          >
            <ArrowBigLeft />
          </button>
          <button
            type="button"
            aria-controls="myCarousel-items"
            aria-label="Next Slide"
            onClick={(_e) => handleNext()}
          >
            <ArrowBigRight />
          </button>
          <span className="flex flex-row flex-wrap items-center">
            <span className="mr-2 max-h-6 rounded border border-blue-400 bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-400">
              {memes[slideIdx] && slideIdx + 1}
            </span>
            <span className="mr-2 px-0.5 text-2xl font-medium ">/</span>
            <span className="mr-2 max-h-6 rounded border border-blue-400 bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-400">
              {memes[slideIdx] && memes.length}
            </span>
          </span>
        </div>
        <div id="myCarousel-items" className="container" aria-live="off">
          <div
            className="container"
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIdx + 1} of ${memes.length}`}
          >
            <div className="container">
              {memes[slideIdx] && (
                <Image
                  src={memes[slideIdx] || ""}
                  width={700}
                  height={700}
                  alt="Meme Slide"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
