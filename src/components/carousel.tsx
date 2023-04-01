"use client"
import { useState } from "react"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react"

export function Carousel({ memes }: { memes: string[] }) {
  const [slideIdx, setSlideIdx] = useState(0)
  const handlePrevious = () => {
    if (slideIdx === 0 || memes.length === 0) { return }
    setSlideIdx(slideIdx - 1)
  }
  const handleNext = () => {
    if (slideIdx === memes.length - 1 || memes.length === 0) { return }
    setSlideIdx(slideIdx + 1)
  }
  return (
    <section
      id="myCarousel"
      aria-roledescription="carousel"
      aria-label="Browse Search Results">
      <div className="container">
        <div className="container">
          <button type="button" aria-controls="myCarousel-items" aria-label="Previous Slide" onClick={_e => handlePrevious()}><ArrowBigLeft /></button>
          <button type="button" aria-controls="myCarousel-items" aria-label="Next Slide" onClick={_e => handleNext()}><ArrowBigRight /></button>
        </div>
        <div id="myCarousel-items"
          className="container"
          aria-live="off">
          <div className="container"
            role="group"
            aria-roledescription="slide"
            aria-label="1 of 6">
            <div className="container">
              <img src={memes[slideIdx]} alt="Meme Slide" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}