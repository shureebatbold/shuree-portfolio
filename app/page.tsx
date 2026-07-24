import Link from "next/link";
import { projects } from "@/data/projects";
import BestWorksSlideshow from "./BestWorksSlideshow";
import Typewriter from "./Typewriter";
import Footer from "./Footer";
import SkillsBoard from "./SkillsBoard";
import PhotoAlbum from "./PhotoAlbum";
import { albumPhotos } from "./albumPhotos";

export default function Home() {
  return (
    <main>
      <header className="topNav">
        <div className="siteContainer topNavInner">
          <Link href="/" className="brand">SHUREE BATBOLD</Link>

          <nav>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="/files/Resume_Shuree Batbold.pdf" target="_blank">Resume PDF</a>
            <a href="/files/Portfolio_Shuree Batbold.pdf" target="_blank">Portfolio PDF</a>
          </nav>
        </div>
      </header>

   <section className="homeIntro">
  <div className="homeIntroText">
    <p>
      Welcome, I&rsquo;m <Typewriter />
    </p>

    <h1>
      Thank you for visiting my portfolio. Please
      feel free to explore my work, and if you have any questions or
      would like to connect, I would love to hear from you!
    </h1>

    <div className="contactLinks">
      <a href="mailto:shureehne@gmail.com">shureehne@gmail.com</a>
      <a href="https://linkedin.com/in/shureebat" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="https://instagram.com/shueiverse" target="_blank" rel="noopener noreferrer">Instagram</a>
    </div>
  </div>

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
              My name is Shuree, and I was born and raised in Ulaanbaatar, Mongolia. Now
              based in Arlington, Virginia, I have been shaped by both my Mongolian roots
              and my experience studying and working in the Washington, DC area. Moving
              between different cultures has made me especially attentive to how people
              experience spaces, and it has strengthened my belief that thoughtful design
              can help people feel welcomed, understood, and connected.
            </p>

            <p>
              Before pursuing interior architecture, I earned a bachelor&rsquo;s degree in
              Computer Science. Although technology and design may seem like very different
              paths, my technical background continues to influence the way I work. It
              taught me how to organize complex information, solve problems patiently, and
              think through how many individual parts come together as one complete system.
              Wanting to combine that analytical mindset with my lifelong interest in art
              and creativity led me to earn my MFA in Interior Architecture from The George
              Washington University.
            </p>

            <p>
              My work is centered in people and the stories behind the spaces they use. I
              enjoy every stage of the design process, from research, moodboards, and early
              concept development to space planning, and technical documentation. 
              I am especially interested in environments where design can make a
              meaningful difference in everyday life.
            </p>

            <p>
              When I am not designing, I enjoy creating digital art, exploring new places,
              watching films, and noticing the small details that give spaces their
              personality. I am constantly collecting ideas from architecture, culture,
              nature, food, and everyday experiences.
            </p>

            <p>Thank you for visiting and taking the time to learn more about me!</p>
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
              <h3>Awards / Recognition</h3>
              <p>2026 IIDA Student Premiere Awards - Student Winner (Whitefish Clinic)</p>
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
