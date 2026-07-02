"use client";

import { useRef, useState } from "react";

type Dot = {
  id: number;
  x: number;
  y: number;
  landed: boolean;
};

const DOT_RADIUS = 18; // px — size of each punched circle
const MIN_INITIAL_DOTS = 7;
const MAX_INITIAL_DOTS = 10;

export default function HolePunchArt({
  src,
  accentColor = "#ddc9a3",
  alt = "",
}: {
  src: string;
  accentColor?: string;
  alt?: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageSize, setImageSize] = useState({ w: 0, h: 0 });
  const [dots, setDots] = useState<Dot[]>([]);
  const nextId = useRef(0);
  const seeded = useRef(false);

  function randomPoint(w: number, h: number) {
    return {
      x: DOT_RADIUS + Math.random() * (w - DOT_RADIUS * 2),
      y: DOT_RADIUS + Math.random() * (h - DOT_RADIUS * 2),
    };
  }

  function handleImageLoad() {
    if (!imgRef.current) return;
    const w = imgRef.current.clientWidth;
    const h = imgRef.current.clientHeight;
    setImageSize({ w, h });

    if (!seeded.current) {
      seeded.current = true;
      const count =
        MIN_INITIAL_DOTS +
        Math.floor(Math.random() * (MAX_INITIAL_DOTS - MIN_INITIAL_DOTS + 1));

      const initialDots: Dot[] = Array.from({ length: count }).map(() => {
        const p = randomPoint(w, h);
        return { id: nextId.current++, x: p.x, y: p.y, landed: true };
      });

      setDots(initialDots);
    }
  }

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (
      x < DOT_RADIUS ||
      y < DOT_RADIUS ||
      x > rect.width - DOT_RADIUS ||
      y > rect.height - DOT_RADIUS
    ) {
      return;
    }

    const id = nextId.current++;
    setDots((prev) => [...prev, { id, x, y, landed: false }]);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDots((prev) =>
          prev.map((d) => (d.id === id ? { ...d, landed: true } : d))
        );
      });
    });
  }

  function resetDots() {
    setDots([]);
    seeded.current = true; // don't re-seed automatically after a manual reset
  }

  return (
    <div className="holePunchBlock">
      <p className="holePunchCaption">
        Click anywhere on the painting to punch a hole and reveal that piece on
        the panel beside it!
      </p>

      <div className="holePunchPair">
        <div className="holePunchSide" onClick={handleClick}>
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className="holePunchImg"
            onLoad={handleImageLoad}
            draggable={false}
          />
          {dots.map((dot) => (
            <div
              key={dot.id}
              className="holePunchHole paperGrain"
              style={{
                left: dot.x - DOT_RADIUS,
                top: dot.y - DOT_RADIUS,
                width: DOT_RADIUS * 2,
                height: DOT_RADIUS * 2,
                backgroundColor: accentColor,
                opacity: dot.landed ? 1 : 0,
                transform: dot.landed ? "scale(1)" : "scale(0.4)",
              }}
            />
          ))}
        </div>

        <div
          className="holePunchSide holePunchScatter paperGrain"
          style={{ backgroundColor: accentColor }}
        >
          {dots.map((dot) => (
            <div
              key={dot.id}
              className="holePunchFragment"
              style={{
                width: DOT_RADIUS * 2,
                height: DOT_RADIUS * 2,
                left: dot.x - DOT_RADIUS,
                top: dot.y - DOT_RADIUS,
                opacity: dot.landed ? 1 : 0,
                transform: dot.landed ? "scale(1)" : "scale(0.4)",
                backgroundImage: `url(${src})`,
                backgroundSize: `${imageSize.w}px ${imageSize.h}px`,
                backgroundPosition: `-${dot.x - DOT_RADIUS}px -${dot.y - DOT_RADIUS}px`,
              }}
            />
          ))}
        </div>

        {dots.length > 0 && (
          <button className="holePunchReset" onClick={resetDots}>
            ↺ Reset
          </button>
        )}
      </div>
    </div>
  );
}
