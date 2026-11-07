import Link from "next/link";
import { projects } from "@/data/projects";
import BestWorksSlideshow from "./BestWorksSlideshow";
import Typewriter from "./Typewriter";
import Footer from "./Footer";
import SkillsBoard from "./SkillsBoard";
import PhotoAlbum from "./PhotoAlbum";
import ContactLinks from "./ContactLinks";
import { albumPhotos } from "./albumPhotos";

export default function Home() {
  return (
    <main>
      <header className="topNav">
        <div className="siteContainer topNavInner">
          <Link href="/" className="brand">Shuree Batbold</Link>

          <nav>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <Link href="/resume">Resume</Link>
            <a href="/files/Portfolio_Shuree Batbold.pdf" target="_blank">Portfolio PDF</a>
          </nav>
        </div>
      </header>

   <section className="homeIntro">
  <div className="homeIntroText">
    <div className="introHeading">
      <p className="introTagline">Welcome to my portfolio website</p>

      <p>
        <Typewriter />
      </p>
    </div>

    <h1>
      Each project reflects my belief that thoughtful design can support
      people, strengthen communities, and bring more care into everyday
      life. I hope you enjoy exploring my work,
      <br />
      and I would love to connect.
    </h1>
  </div>

 <ContactLinks />

 <PhotoAlbum photos={albumPhotos} />
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
        <div className="aboutTop">
          <div className="aboutLeft">
            <h2>About Me</h2>

            <p>
              Growing up in Ulaanbaatar, Mongolia, and later building a life in the
              Washington, DC area has shaped how I see the world and the spaces we
              inhabit. Experiencing different cultures and communities has deepened my
              appreciation for the relationship between people, place, and design.
            </p>

            <p>
              My path to interior architecture began in Computer Science, where I
              developed a foundation in analytical thinking, problem-solving, and systems
              organization. A lifelong interest in art and the built environment
              eventually led me to pursue an MFA in Interior Architecture at The George
              Washington University, bringing together my technical background and
              creative interests.
            </p>

            <p>
              I approach design with curiosity, empathy, and an appreciation for the
              details that shape everyday experiences. From early research and concept
              development to spatial planning and technical documentation, I enjoy
              understanding how individual elements come together to create a cohesive
              whole. I am particularly interested in designing environments that bring
              people together, support well-being, and leave a lasting impact on their
              communities.
            </p>

            <p>
              Outside of design, I find inspiration in travel, art, film, nature, and the
              everyday moments that reveal how people live and connect. I look forward to
              continuing to learn, collaborate, and contribute to spaces that make a
              meaningful difference.
            </p>
          </div>

          <div className="aboutRight">
            <img src="/images/profile.jpg" alt="Shuree Batbold" />

            <div>
              <h3>Interests</h3>
              <p>
                Commercial Interiors   ·   Workplace   ·   Hospitality   ·   Healthcare   ·   Community Centered Design   ·   Multi-Family Residential   ·   Sustainability   ·   Interactive Architecture
              </p>
            </div>

            <div>
              <h3>Organizations / Involvement</h3>
              <p>IIDA   ·   ASID   ·   NEWH</p>
            </div>

            <div>
              <h3>Skills</h3>
              <div className="skills">
                <span>Revit</span>
                <span>Enscape</span>
                <span>Photoshop</span>
                <span>Illustrator</span>
                <span>InDesign</span>
                <span>AutoCAD</span>
                <span>SketchUp</span>
                <span>Blender</span>
                <span>Bluebeam Revu</span>
                <span>Microsoft Office</span>
                <span>ArcGIS</span>
                <span>HTML/CSS</span>
                <span>Javascript</span>
                <span>Procreate</span>
                <span>Canva</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SkillsBoard />

 <Footer />
    </main>
  );
}
