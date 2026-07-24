"use client";

import { useState } from "react";

export default function ClickGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);

  function handleClick() {
    setCurrent((prev) => (prev + 1) % images.length);
  }

  return (
    <div className="clickGallery" onClick={handleClick}>
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`${title} — image ${index + 1}`}
          className={index === current ? "isActive" : ""}
          draggable={false}
        />
      ))}
    </div>
  );
}
