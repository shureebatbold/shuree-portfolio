"use client";

import { useState, useEffect, useRef } from "react";

const slides = [
  "/images/slideshow/slide1.jpeg",
  "/images/slideshow/slide2.png",
  "/images/slideshow/slide3.jpeg",
  "/images/slideshow/slide4.png",
  "/images/slideshow/slide6.png",
  "/images/slideshow/slide7.png",
  "/images/slideshow/slide8.jpeg",
  "/images/slideshow/slide9.png",
  "/images/slideshow/slide10.png",
  "/images/slideshow/slide11.png",
  "/images/slideshow/slide12.png",
  "/images/slideshow/slide13.png",
];

const INTERVAL = 4000;

export default function BestWorksSlideshow() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, INTERVAL);
  }

  function stopTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
  }

  useEffect(() => {
    if (!paused) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [paused]);

  function goPrevious() {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    // restart the timer from zero so it doesn't jump right after a manual click
    if (!paused) startTimer();
  }

  function goNext() {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    if (!paused) startTimer();
  }

  return (
    <section className="bestWorks">
      <div
        className="albumCarousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button className="carouselButton left" onClick={goPrevious} aria-label="Previous slide">
          ‹
        </button>

        <div className="albumTrack">
          {slides.map((slide, index) => (
            <img
              key={slide}
              src={slide}
              alt=""
              className={index === current ? "activeAlbumSlide" : ""}
            />
          ))}
        </div>

        <button className="carouselButton right" onClick={goNext} aria-label="Next slide">
          ›
        </button>

        {/* dot indicators */}
        <div className="slideDots" aria-hidden="true">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slideDot${index === current ? " activeDot" : ""}`}
              onClick={() => {
                setCurrent(index);
                if (!paused) startTimer();
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
