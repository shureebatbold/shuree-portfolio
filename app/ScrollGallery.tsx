"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [visible, setVisible] = useState<Record<number, boolean>>({});
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [index]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [images]);

  return (
    <div className="scrollGallery">
      {images.map((image, index) => (
        <div
          key={image}
          ref={(el) => {
            refs.current[index] = el;
          }}
          data-index={index}
          className={`scrollGalleryItem${visible[index] ? " isVisible" : ""}`}
        >
          <img
            src={image}
            alt={`${title} — image ${index + 1}`}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
