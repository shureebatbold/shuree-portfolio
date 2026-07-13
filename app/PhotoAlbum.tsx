"use client";

import { useRef, useState } from "react";

type AlbumPhoto = {
  src: string;
  alt: string;
};

// Loose fan-out offsets per depth in the stack — depth 0 is the front photo.
const STACK_STYLES = [
  { x: 0, y: 0, rotate: -2 },
  { x: 6, y: 4, rotate: 4 },
  { x: 11, y: 8, rotate: -6 },
  { x: 15, y: 11, rotate: 7 },
  { x: 18, y: 14, rotate: -8 },
  { x: 20, y: 16, rotate: 9 },
];

const ANIMATION_MS = 420;

export default function PhotoAlbum({ photos }: { photos: AlbumPhoto[] }) {
  const [stack, setStack] = useState<number[]>(photos.map((_, i) => i));
  const [flyingIndex, setFlyingIndex] = useState<number | null>(null);
  const animating = useRef(false);

  function handleClick() {
    if (animating.current || stack.length < 2) return;
    animating.current = true;

    const frontPhotoIndex = stack[0];
    setFlyingIndex(frontPhotoIndex);

    setTimeout(() => {
      setStack((prev) => [...prev.slice(1), prev[0]]);
      setFlyingIndex(null);
      animating.current = false;
    }, ANIMATION_MS);
  }

  return (
    <div className="photoAlbumWrap">
      <p className="photoAlbumLabel">My Story</p>

      <div className="photoAlbum" onClick={handleClick}>
        {stack.map((photoIndex, depth) => {
          const photo = photos[photoIndex];
          const isFlying = photoIndex === flyingIndex;
          const s = STACK_STYLES[Math.min(depth, STACK_STYLES.length - 1)];

          const style: React.CSSProperties = isFlying
            ? {
                transform: "translate(130px, -70px) rotate(20deg)",
                opacity: 0,
                zIndex: 100,
              }
            : {
                transform: `translate(${s.x}px, ${s.y}px) rotate(${s.rotate}deg)`,
                zIndex: photos.length - depth,
                opacity: 1,
              };

          return (
            <div className="photoAlbumCard" key={photo.src} style={style}>
              <img src={photo.src} alt={photo.alt} draggable={false} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
