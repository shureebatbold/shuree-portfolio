"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;

  const project = projects.find((p) => p.slug === slug);
  const [current, setCurrent] = useState(0);

  if (!project) {
    return (
      <main className="notFound">
        <Link href="/">← Back home</Link>
        <h1>Project not found</h1>
      </main>
    );
  }

  function goPrevious() {
    setCurrent((prev) =>
      prev === 0 ? project!.images.length - 1 : prev - 1
    );
  }

  function goNext() {
    setCurrent((prev) =>
      prev === project!.images.length - 1 ? 0 : prev + 1
    );
  }

  return (
    <main>
      <header className="topNav">
        <Link href="/" className="brand">SHUREE BATBOLD</Link>

        <nav>
          <Link href="/#projects">Projects</Link>
          <Link href="/#about">About</Link>
          <a href="/files/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
          <a href="/files/portfolio.pdf" target="_blank" rel="noopener noreferrer">Portfolio PDF</a>
        </nav>
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
            {project.software.map((item) => (
              <span key={item}>{item}</span>
            ))}
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
          <div className="projectSlideshow">
            {project.images.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`${project.title} — image ${index + 1}`}
                className={index === current ? "activeProjectSlide" : ""}
              />
            ))}

            <button className="projectArrow left" onClick={goPrevious} aria-label="Previous image">‹</button>
            <button className="projectArrow right" onClick={goNext} aria-label="Next image">›</button>
          </div>

          <div className="projectThumbs">
            {project.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setCurrent(index)}
                className={index === current ? "activeThumb" : ""}
                aria-label={`Go to image ${index + 1}`}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
