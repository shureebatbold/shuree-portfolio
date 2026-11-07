"use client";

import { useEffect, useRef, useState } from "react";

// Edit this line to change the greeting that types itself out.
const PHRASE = "Thank you for being here.";

const TYPE_SPEED = 90; // ms per character while typing — higher = slower typing
const START_DELAY = 350; // ms before the first character appears

export default function Typewriter() {
  const [text, setText] = useState("");
  const [running, setRunning] = useState(false);
  const hostRef = useRef<HTMLSpanElement>(null);

  // Replay the animation every time the line scrolls back into view.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setText(PHRASE);
      return;
    }

    let startTimer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setText("");
          setRunning(false);
          startTimer = setTimeout(() => setRunning(true), START_DELAY);
        } else {
          clearTimeout(startTimer);
          setRunning(false);
          setText("");
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      clearTimeout(startTimer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!running || text.length >= PHRASE.length) return;
    const timeout = setTimeout(() => {
      setText(PHRASE.slice(0, text.length + 1));
    }, TYPE_SPEED);
    return () => clearTimeout(timeout);
  }, [running, text]);

  return (
    <span className="typewriter" ref={hostRef}>
      <span className="sr-only">{PHRASE}</span>

      {/* Invisible full phrase holds the final width, so nothing below
          shifts around while the visible text is still typing. */}
      <span className="typewriterSizer" aria-hidden="true">
        {PHRASE}
      </span>

      <span className="typewriterText" aria-hidden="true">
        {text}
        <span className="typewriterCursor">|</span>
      </span>
    </span>
  );
}
