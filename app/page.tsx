import Link from "next/link";
import { projects } from "@/data/projects";
import BestWorksSlideshow from "./BestWorksSlideshow";

export default function Home() {
  return (
    <main>
      <header className="siteContainer topNav">
        <Link href="/" className="brand">SHUREE BATBOLD</Link>

        <nav>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="/files/resume.pdf" target="_blank">Resume</a>
          <a href="/files/portfolio.pdf" target="_blank">Portfolio PDF</a>
        </nav>
      </header>

   <section className="homeIntro">
  <p>Welcome ,</p>

  <h1>
    Thank you for visiting my portfolio. Please
    feel free to explore my work, and if you have any questions or
    would like to connect, I would love to hear from you!
  </h1>
</section>

<section className="projectsHeader">
  <h3>Selected Works</h3>
</section>

      <section id="projects" className="siteContainer projectGrid">
       {projects.slice(0, 6).map((project) => (
          <Link href={`/project/${project.slug}`} className="gridProject" key={project.slug}>
            <img src={project.hero} alt={project.title} />

           <div className="projectOverlay">
  <h2>{project.title}</h2>
  <p>{project.program}</p>
</div>

          </Link>
        ))}
      </section>

<BestWorksSlideshow />

      <section id="about" className="siteContainer aboutMe">
        <img src="/images/profile.jpg" alt="Shuree Batbold" />

        <div className="aboutText">
          <h2>About</h2>
          <p>
            I am an MFA Interior Architecture graduate from George Washington University
            focused on creating thoughtful, people-centered spaces that balance
            functionality, well-being, and aesthetics.
          </p>

          <h3>Interests</h3>
          <p>
            Commercial Interiors  ·  Workplace  ·  Hospitality  ·  Healthcare  ·  Community-Centered Design  ·  Sustainability
          </p>

          <h3>Awards / Recognition</h3>
          <p>IIDA Student Premiere Awards, 2026</p>

          <h3>Organizations / Involvement</h3>
          <p>IIDA · ASID · NEWH</p>

          <h3>Skills</h3>
          <div className="skills">
            <span>Photoshop</span>
            <span>Illustrator</span>
            <span>InDesign</span>
            <span>Revit</span>
            <span>Enscape</span>
            <span>Canva</span>
            <span>Microsoft Office</span>
            <span>Blender</span>
            <span>ArcGIS</span>
          </div>
        </div>
      </section>

 <footer className="siteContainer footer">

  <p className="footerCopyright">
    Copyright © Shuree Batbold
  </p>

<div className="footerLinks">
  <p>shureehne@gmail.com</p>
  <p>(571) 622-9401</p>

  <a
    href="https://linkedin.com/in/shureebat"
    target="_blank"
    rel="noopener noreferrer"
    className="linkedinLink"
  >
    <span className="linkedinIcon">in</span>
    LinkedIn
  </a>

  <a
    href="https://instagram.com/shueiverse"
    target="_blank"
    rel="noopener noreferrer"
    className="linkedinLink"
  >
    <span className="socialIcon">ig</span>
    Instagram
  </a>
</div>

</footer>
    </main>
  );
}