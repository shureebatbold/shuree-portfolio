"use client";

import { useEffect, useState } from "react";

type ArtItem = {
  src: string;
  title: string;
  caption: string;
  alt: string;
};

export default function DigitalArtGrid({ items }: { items: ArtItem[] }) {
  const [selected, setSelected] = useState<ArtItem | null>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <div className="digitalArtGrid">
        {items.map((item) => (
          <button
            className="artCard"
            key={item.src}
            onClick={() => setSelected(item)}
            aria-label={`View larger: ${item.title}`}
          >
            <img src={item.src} alt={item.alt} loading="lazy" />
          </button>
        ))}
      </div>

      {selected && (
        <div className="artLightbox" onClick={() => setSelected(null)}>
          <button
            className="artLightboxClose"
            onClick={() => setSelected(null)}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={selected.src}
            alt={selected.alt}
            className="artLightboxImg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
