"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "../../Footer";
import { SOFTWARE_ICONS } from "../../softwareIcons";
import HolePunchArt from "../../HolePunchArt";
import DigitalArtGrid from "../../DigitalArtGrid";
import { digitalArtGallery } from "../../digitalArtGallery";
import ClickGallery from "../../ClickGallery";

const AUTOPLAY_MS = 5000; // how long each hero image stays before auto-advancing
const SWIPE_THRESHOLD = 60; // px of drag needed to trigger a slide change

// Renders **text** segments as <strong> for in-paragraph emphasis
function renderEmphasis(text: string) {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;

  const project = projects.find((p) => p.slug === slug);

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStartX = useRef(0);
  const imageCount = project?.images.length || 0;

  // Drag-to-scroll for the thumbnail strip
  const thumbsRef = useRef<HTMLDivElement>(null);
  const thumbDrag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  function onThumbsPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = thumbsRef.current;
    if (!el) return;
    thumbDrag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: false,
    };
  }

  function onThumbsPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = thumbsRef.current;
    if (!el || !thumbDrag.current.active) return;
    const delta = e.clientX - thumbDrag.current.startX;
    if (Math.abs(delta) > 4) thumbDrag.current.moved = true;
    el.scrollLeft = thumbDrag.current.startLeft - delta;
  }

  function onThumbsPointerUp() {
    thumbDrag.current.active = false;
  }

  // Suppress the click that ends a drag, so panning never changes the slide
  function onThumbClick(e: React.MouseEvent, index: number) {
    if (thumbDrag.current.moved) {
      e.preventDefault();
      thumbDrag.current.moved = false;
      return;
    }
    goTo(index);
  }

  function goTo(index: number) {
    setCurrent((index + imageCount) % imageCount);
  }

  function goNext() {
    goTo(current + 1);
  }

  function goPrevious() {
    goTo(current - 1);
  }

  function startTimer() {
    stopTimer();
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imageCount);
    }, AUTOPLAY_MS);
  }

  function stopTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
  }

  useEffect(() => {
    if (!project) return;
    if (!paused && !isDragging) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, isDragging, current, imageCount]);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartX.current = e.clientX;
    setIsDragging(true);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX.current);
  }

  function handlePointerUp() {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset < -SWIPE_THRESHOLD) {
      goNext();
    } else if (dragOffset > SWIPE_THRESHOLD) {
      goPrevious();
    }
    setDragOffset(0);
  }

  if (!project) {
    return (
      <main className="notFound">
        <Link href="/">← Back home</Link>
        <h1>Project not found</h1>
      </main>
    );
  }

  const trackTransform = isDragging
    ? `translateX(calc(-${current * 100}% + ${dragOffset}px))`
    : `translateX(-${current * 100}%)`;

  const galleryList =
    project.galleryImages.length > 0 ? project.galleryImages : project.images;

  return (
    <main>
      <header className="topNav">
        <div className="siteContainer topNavInner">
          <Link href="/" className="brand">Shuree Batbold</Link>

          <nav>
            <Link href="/#projects">Projects</Link>
            <Link href="/#about">About</Link>
            <Link href="/resume">Resume</Link>
            <a href="/files/Portfolio_Shuree Batbold.pdf" target="_blank" rel="noopener noreferrer">Portfolio PDF</a>
          </nav>
        </div>
      </header>

      <section className="projectTitleBar">
        <h1>{project.title}</h1>
        {project.concept && (
          <p className="projectConcept">{project.concept}</p>
        )}
      </section>

      <section className="projectDetailPage">
        <aside className="projectDetailText">
          <div className="projectFacts">
            <p><strong>Location</strong> — {project.location}</p>
            <p><strong>Area</strong> — {project.area}</p>
            <p><strong>Date</strong> — {project.date}</p>
          </div>

          {project.body.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className="descPara"
              style={{ animationDelay: `${0.15 + index * 0.25}s` }}
            >
              {renderEmphasis(paragraph)}
            </p>
          ))}

          <div className="software">
            {project.software.map((item) => {
              const icon = SOFTWARE_ICONS[item];
              return (
                <span key={item} className="softwareChip">
                  {icon && (
                    <img src={icon} alt="" className="softwareChipIcon" />
                  )}
                  {item}
                </span>
              );
            })}
          </div>

        </aside>

        <section className="projectImageSide">
          <div
            className="projectCarousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="projectCarouselTrack"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{
                transform: trackTransform,
                transition: isDragging
                  ? "none"
                  : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {project.images.map((image, index) => (
                <div className="projectCarouselSlide" key={image}>
                  <img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    className="slideBackdrop"
                    draggable={false}
                  />
                  <img
                    src={image}
                    alt={`${project.title} — image ${index + 1}`}
                    className="slideImage"
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            <div className="projectProgress">
              <div
                key={current}
                className="projectProgressFill"
                style={{
                  animationDuration: `${AUTOPLAY_MS}ms`,
                  animationPlayState: paused || isDragging ? "paused" : "running",
                }}
              />
            </div>

            {imageCount > 1 && (
              <>
                <button
                  className="projectCarouselArrow left"
                  onClick={goPrevious}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  className="projectCarouselArrow right"
                  onClick={goNext}
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
          </div>

          <div
            className="projectThumbs"
            ref={thumbsRef}
            onPointerDown={onThumbsPointerDown}
            onPointerMove={onThumbsPointerMove}
            onPointerUp={onThumbsPointerUp}
            onPointerLeave={onThumbsPointerUp}
            onPointerCancel={onThumbsPointerUp}
          >
            {project.images.map((image, index) => (
              <button
                key={image}
                onClick={(e) => onThumbClick(e, index)}
                className={index === current ? "activeThumb" : ""}
                aria-label={`Go to image ${index + 1}`}
              >
                <img src={image} alt="" draggable={false} />
                <span className="thumbNumber">{index + 1}</span>
              </button>
            ))}
          </div>
        </section>
      </section>

      <div className="backHomeRow">
        <Link href="/" className="backHomeButton">
          <span>←</span>
          All projects
        </Link>
      </div>

      {project.slug === "sketches" && (
        <section className="siteContainer holePunchSectionWrap">
          <HolePunchArt
            src="/images/sketches/HeroArt.jpg"
            accentColor="#B3E6F7"
            alt={`Interactive piece — ${project.title}`}
          />
        </section>
      )}

      {project.slug === "sketches" && (
        <section className="siteContainer digitalArtSection">
          <div className="digitalArtHeader">
            <h3>Digital Art Gallery</h3>
            <p className="digitalArtHint">A wall of ongoing digital work</p>
          </div>
          <DigitalArtGrid items={digitalArtGallery} />
        </section>
      )}

      {project.slug !== "sketches" && (
        <section className="projectGalleryFrame">
          <p className="siteContainer clickGalleryHint">Click to see the next image</p>
          <ClickGallery images={galleryList} title={project.title} />
        </section>
      )}

      <Footer />
    </main>
  );
}
