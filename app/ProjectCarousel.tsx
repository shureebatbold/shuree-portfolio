"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";

// How far the strip drifts right on hover to hint at more projects.
const HOVER_PEEK_PX = 64;

export default function ProjectCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const restPos = useRef(0);
  const peeked = useRef(false);
  const userMoved = useRef(false);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  // Scroll by roughly one card, so paging feels deliberate.
  function page(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    userMoved.current = true;
    const card = el.querySelector<HTMLElement>(".carouselCard");
    const step = card ? card.offsetWidth + 6 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  // A small drift right on hover — just enough to reveal there's more.
  function onEnter() {
    const el = trackRef.current;
    if (!el || peeked.current) return;
    if (el.scrollWidth <= el.clientWidth) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    peeked.current = true;
    userMoved.current = false;
    restPos.current = el.scrollLeft;
    el.scrollTo({ left: el.scrollLeft + HOVER_PEEK_PX, behavior: "smooth" });
  }

  function onLeave() {
    const el = trackRef.current;
    peeked.current = false;
    // Don't yank the strip back if they've started browsing for real.
    if (!el || userMoved.current) return;
    el.scrollTo({ left: restPos.current, behavior: "smooth" });
  }

  return (
    <div className="projectCarouselWrap">
      <div
        id="projects"
        className="projectCarouselTrackOuter"
        ref={trackRef}
        onScroll={updateEdges}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onPointerDown={() => {
          userMoved.current = true;
        }}
        onWheel={() => {
          userMoved.current = true;
        }}
      >
        {projects.map((project) => (
          <Link
            href={`/project/${project.slug}`}
            className="gridProject carouselCard"
            key={project.slug}
          >
            <img src={project.hero} alt={project.title} />

            <div className="projectOverlay">
              <h2>{project.title}</h2>
              <p>{project.program}</p>
            </div>
          </Link>
        ))}
      </div>

      <button
        className="carouselArrow left"
        onClick={() => page(-1)}
        aria-label="Previous projects"
        disabled={atStart}
      >
        <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true">
          <path
            d="M19 12H5M5 12l6-6M5 12l6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        className="carouselArrow right"
        onClick={() => page(1)}
        aria-label="More projects"
        disabled={atEnd}
      >
        <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true">
          <path
            d="M5 12h14M19 12l-6-6M19 12l-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
