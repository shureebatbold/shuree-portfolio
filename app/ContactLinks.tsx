"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "shureehne@gmail.com";
const LINKEDIN = "https://linkedin.com/in/shureebat";
const INSTAGRAM = "https://instagram.com/shueiverse";

const COPIED_RESET_MS = 2000;

export default function ContactLinks() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Clipboard API can be blocked; fall back to a hidden selection copy.
      const field = document.createElement("textarea");
      field.value = EMAIL;
      field.setAttribute("readonly", "");
      field.style.position = "absolute";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }

    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
  }

  return (
    <div className="contactStack">
      <a
        className="contactIcon"
        href={LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <span className="contactDot">
          <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
            <path
              d="M4.5 9.2h2.9V19H4.5zM5.95 4.6a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4zM10 9.2h2.78v1.34h.04c.39-.72 1.33-1.48 2.74-1.48 2.93 0 3.47 1.87 3.47 4.3V19h-2.9v-4.98c0-1.19-.02-2.72-1.68-2.72-1.68 0-1.94 1.3-1.94 2.64V19H10z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="contactLabel">LinkedIn</span>
      </a>

      <a
        className="contactIcon"
        href={INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <span className="contactDot">
          <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="4.6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="12"
              cy="12"
              r="3.6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="16.6" cy="7.4" r="1.05" fill="currentColor" />
          </svg>
        </span>
        <span className="contactLabel">Instagram</span>
      </a>

      <button
        className={`contactIcon${copied ? " isCopied" : ""}`}
        onClick={copyEmail}
        aria-label={copied ? "Email address copied" : "Copy email address"}
      >
        <span className="contactDot">
          <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
            <rect
              x="3.5"
              y="5.5"
              width="17"
              height="13"
              rx="2.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M4.4 7.3 12 12.7l7.6-5.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="contactLabel">
          {copied ? "Copied" : "Email"}
        </span>
      </button>

      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
