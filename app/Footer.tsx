import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/shureebat" },
  { label: "Instagram", href: "https://instagram.com/shueiverse" },
];

const SECTION_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Resume PDF", href: "/files/resume.pdf" },
  { label: "Portfolio PDF", href: "/files/portfolio.pdf" },
];

// Repeated once — the CSS animation shifts the track by exactly 50%,
// so this needs to render twice back-to-back for a seamless loop.
const MARQUEE_TEXT =
  "SHUREE BATBOLD \u00B7 \u00A0";

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="siteContainer footerTop">
        <div className="footerIntro">
          <p className="footerTagline">
            Interior Design ·  Visual Art
          </p>
          <a href="mailto:shureehne@gmail.com" className="footerEmail">
            shureehne@gmail.com
          </a>
        </div>

        <div className="footerColumns">
          <div className="footerColumn">
            <h4>Social</h4>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="footerColumn">
            <h4>Sections</h4>
            {SECTION_LINKS.map((link) =>
              link.href.startsWith("/#") ? (
                <Link key={link.label} href={link.href}>
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      </div>

      <div className="marqueeWrap" aria-hidden="true">
        <div className="marqueeTrack">
          <span className="marqueeGroup">
            {MARQUEE_TEXT.repeat(6)}
          </span>
          <span className="marqueeGroup">
            {MARQUEE_TEXT.repeat(6)}
          </span>
        </div>
      </div>

      <div className="siteContainer footerBottom">
        <p>© {new Date().getFullYear()} Shuree Batbold. All rights reserved.</p>
        <p className="footerLocation">
          <span className="footerDot" aria-hidden="true" />
          Based in Washington, D.C.
        </p>
      </div>
    </footer>
  );
}
