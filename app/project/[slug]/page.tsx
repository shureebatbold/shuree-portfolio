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

const AUTOPLAY_MS = 5000; // how long each hero image stays before auto-advancing
const SWIPE_THRESHOLD = 60; // px of drag needed to trigger a slide change

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

  return (
    <main>
      <header className="topNav">
        <div className="siteContainer topNavInner">
          <Link href="/" className="brand">SHUREE BATBOLD</Link>

          <nav>
            <Link href="/#projects">Projects</Link>
            <Link href="/#about">About</Link>
            <a href="/files/Resume_Shuree Batbold.pdf" target="_blank" rel="noopener noreferrer">Resume PDF</a>
            <a href="/files/Portfolio_Shuree Batbold.pdf" target="_blank" rel="noopener noreferrer">Portfolio PDF</a>
          </nav>
        </div>
      </header>

      <section className="projectDetailPage">
        <aside className="projectDetailText">
          <h1>{project.title}</h1>

          <div className="projectFacts">
            <p><strong>Program</strong> — {project.program}</p>
            <p><strong>Location</strong> — {project.location}</p>
            <p><strong>Area</strong> — {project.area}</p>
            <p><strong>Date</strong> — {project.date}</p>
          </div>

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

          <hr />

          <p className="introText">{project.intro}</p>
          <p>{project.body}</p>

          <Link href="/" className="backHomeButton">
            <span>←</span>
            All projects
          </Link>
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
                    alt={`${project.title} — image ${index + 1}`}
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
          </div>

          <div className="projectThumbs">
            {project.images.map((image, index) => (
              <button
                key={image}
                onClick={() => goTo(index)}
                className={index === current ? "activeThumb" : ""}
                aria-label={`Go to image ${index + 1}`}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </section>
      </section>

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
         
          </div>
          <DigitalArtGrid items={digitalArtGallery} />
        </section>
      )}

      {project.slug !== "sketches" && (
        <section className="projectGalleryFrame">
          <div className="siteContainer projectGallery" id="gallery">
            <div className="projectGalleryHeader">
              <h3>Process &amp; Gallery</h3>
              <p className="projectGalleryHint">A closer look at the full project</p>
            </div>

            <div className="projectGalleryGrid">
              {project.images.map((image, index) => (
                <div className="projectGalleryItem" key={image}>
                  <img
                    src={image}
                    alt={`${project.title} — image ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
