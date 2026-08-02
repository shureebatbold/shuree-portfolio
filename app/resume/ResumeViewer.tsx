"use client";

import { useEffect, useRef, useState } from "react";

const PAGE = "/resume/resume-1.webp";

const ZOOM_MIN = 1;
const ZOOM_MAX = 3.5;
const ZOOM_STEP = 0.5;

export default function ResumeViewer() {
  const [zoom, setZoom] = useState(1);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pan = useRef({ active: false, x: 0, y: 0, left: 0, top: 0 });

  const changeZoom = (delta: number) =>
    setZoom((z) => {
      const next = Math.round((z + delta) * 10) / 10;
      return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next));
    });

  // Keep the page centred as it grows
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
  }, [zoom]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "+" || e.key === "=") changeZoom(ZOOM_STEP);
      if (e.key === "-") changeZoom(-ZOOM_STEP);
      if (e.key === "0" || e.key === "Escape") setZoom(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (!el || zoom <= 1) return;
    pan.current = {
      active: true,
      x: e.clientX,
      y: e.clientY,
      left: el.scrollLeft,
      top: el.scrollTop,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (!el || !pan.current.active) return;
    el.scrollLeft = pan.current.left - (e.clientX - pan.current.x);
    el.scrollTop = pan.current.top - (e.clientY - pan.current.y);
  }

  const endPan = () => {
    pan.current.active = false;
  };

  return (
    <div className="resumeFrame">
      <div
        className="resumeScroller"
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
        style={{ cursor: zoom > 1 ? "grab" : "default" }}
      >
        <img
          src={PAGE}
          alt="Resume of Shuree Batbold"
          className="resumePage"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          style={{ height: `${zoom * 100}%` }}
        />
      </div>

      <div className="resumeZoomTools">
        <button
          onClick={() => changeZoom(ZOOM_STEP)}
          aria-label="Zoom in"
          disabled={zoom >= ZOOM_MAX}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <line x1="15.4" y1="15.4" x2="20.5" y2="20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="7.6" y1="10.5" x2="13.4" y2="10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="10.5" y1="7.6" x2="10.5" y2="13.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <button
          onClick={() => changeZoom(-ZOOM_STEP)}
          aria-label="Zoom out"
          disabled={zoom <= ZOOM_MIN}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <line x1="15.4" y1="15.4" x2="20.5" y2="20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="7.6" y1="10.5" x2="13.4" y2="10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
