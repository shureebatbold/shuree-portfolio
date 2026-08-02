import Link from "next/link";
import type { Metadata } from "next";
import ResumeViewer from "./ResumeViewer";

export const metadata: Metadata = {
  title: "Resume | Shuree Batbold",
  description: "Resume of Shuree Batbold — Interior Architecture MFA.",
};

export default function ResumePage() {
  return (
    <main className="resumeMain">
      <header className="topNav resumeNav">
        <div className="siteContainer topNavInner">
          <Link href="/" className="brand">Shuree Batbold</Link>

          <nav>
            <Link href="/#projects">Projects</Link>
            <Link href="/#about">About</Link>
            <Link href="/resume">Resume</Link>
            <a
              href="/files/Portfolio_Shuree Batbold.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio PDF
            </a>
          </nav>
        </div>
      </header>

      <ResumeViewer />
    </main>
  );
}
