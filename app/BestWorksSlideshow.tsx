"use client";

import { useEffect, useRef } from "react";

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

// Rendered twice back-to-back so the loop can wrap seamlessly.
const loopSlides = [...slides, ...slides];

const SPEED_PX_PER_SEC = 50; // continuous auto-scroll speed — higher = faster drift

export default function BestWorksSlideshow() {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSlideRef = useRef<HTMLDivElement>(null);
  const loopMarkerRef = useRef<HTMLDivElement>(null);

  const loopWidthRef = useRef(0);
  const positionRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  function measureLoopWidth() {
    if (firstSlideRef.current && loopMarkerRef.current) {
      const a = firstSlideRef.current.getBoundingClientRect().left;
      const b = loopMarkerRef.current.getBoundingClientRect().left;
      loopWidthRef.current = b - a;
    }
  }

  function applyTransform() {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-positionRef.current}px)`;
    }
  }

  useEffect(() => {
    measureLoopWidth();

    const observer = new ResizeObserver(() => measureLoopWidth());
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measureLoopWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureLoopWidth);
    };
  }, []);

  useEffect(() => {
    function frame(time: number) {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!pausedRef.current && !draggingRef.current && loopWidthRef.current > 0) {
        positionRef.current += SPEED_PX_PER_SEC * dt;
        if (positionRef.current >= loopWidthRef.current) {
          positionRef.current -= loopWidthRef.current;
        }
        applyTransform();
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    dragStartX.current = e.clientX;
    dragStartPos.current = positionRef.current;
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current || loopWidthRef.current === 0) return;
    const delta = e.clientX - dragStartX.current;
    const loop = loopWidthRef.current;
    let next = dragStartPos.current - delta;
    next = ((next % loop) + loop) % loop;
    positionRef.current = next;
    applyTransform();
  }

  function handlePointerUp() {
    draggingRef.current = false;
  }

  return (
    <section className="bestWorksFrame">
      <div className="bestWorksLabel">
        <h3>Selected Moments</h3>
        <p className="bestWorksHint">Drag to explore</p>
      </div>

      <div
        className="filmstripViewport"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="filmstripTrack" ref={trackRef}>
          {loopSlides.map((slide, index) => (
            <div
              className="filmstripSlide"
              key={`${slide}-${index}`}
              ref={
                index === 0
                  ? firstSlideRef
                  : index === slides.length
                  ? loopMarkerRef
                  : undefined
              }
            >
              <img src={slide} alt="" className="kenBurnsLoop" draggable={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
