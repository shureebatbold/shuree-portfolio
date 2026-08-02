"use client";

import { useRef, useState } from "react";

type Skill = {
  id: string;
  label: string;
  icon: string; // path under /public/icons/
  rotate: number;
  top: string;
  left: string;
};

// Edit labels/icons here. Icon files should live in /public/icons/
const SKILLS: Skill[] = [
  { id: "photoshop", label: "Photoshop", icon: "/icons/photoshop.svg", rotate: -6, top: "11.0%", left: "8.8%" },
  { id: "illustrator", label: "Illustrator", icon: "/icons/illustrator.svg", rotate: 4, top: "16.2%", left: "24.3%" },
  { id: "indesign", label: "InDesign", icon: "/icons/indesign.svg", rotate: -3, top: "9.4%", left: "40.6%" },
  { id: "aftereffects", label: "After Effects", icon: "/icons/aftereffects.svg", rotate: 5, top: "17.9%", left: "56.9%" },
  { id: "revit", label: "Revit", icon: "/icons/revit.svg", rotate: -5, top: "11.0%", left: "74.0%" },
  { id: "enscape", label: "Enscape", icon: "/icons/enscape.svg", rotate: -7, top: "36.7%", left: "12.4%" },
  { id: "canva", label: "Canva", icon: "/icons/canva.svg", rotate: 3, top: "41.7%", left: "29.4%" },
  { id: "office", label: "Microsoft Office", icon: "/icons/office.svg", rotate: -4, top: "33.2%", left: "46.6%" },
  { id: "blender", label: "Blender", icon: "/icons/blender.svg", rotate: 6, top: "40.3%", left: "63.7%" },
  { id: "arcgis", label: "ArcGIS", icon: "/icons/arcgis.svg", rotate: -3, top: "35.0%", left: "80.0%" },
  { id: "sketchup", label: "SketchUp", icon: "/icons/sketchup.svg", rotate: 4, top: "64.1%", left: "17.4%" },
  { id: "procreate", label: "Procreate", icon: "/icons/procreate.svg", rotate: -6, top: "67.5%", left: "36.3%" },
  { id: "autodesk", label: "Autodesk", icon: "/icons/autodesk.svg", rotate: 5, top: "62.4%", left: "55.1%" },
];

type Pos = { x: number; y: number };

export default function SkillsBoard() {
  const [positions, setPositions] = useState<Record<string, Pos>>({});
  const [zIndexes, setZIndexes] = useState<Record<string, number>>({});
  const dragState = useRef<{
    id: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const topZ = useRef(1);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>, id: string) {
    e.currentTarget.setPointerCapture(e.pointerId);
    const current = positions[id] || { x: 0, y: 0 };
    dragState.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      origX: current.x,
      origY: current.y,
    };
    topZ.current += 1;
    setZIndexes((prev) => ({ ...prev, [id]: topZ.current }));
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const drag = dragState.current;
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    setPositions((prev) => ({
      ...prev,
      [drag.id]: { x: drag.origX + dx, y: drag.origY + dy },
    }));
  }

  function handlePointerUp() {
    dragState.current = null;
  }

  function resetLayout() {
    setPositions({});
  }

  return (
    <section className="skillsBoard siteContainer" id="skills">
      <div className="skillsBoardHeader">
        <div>
          <h3 className="skillsBoardTitle">My Tools &amp; Software</h3>
          <p className="skillsBoardHint">Drag the cards around ✨</p>
        </div>
        <button className="skillsBoardReset" onClick={resetLayout}>
          ↺ Reset layout
        </button>
      </div>

      <div className="skillsBoardCanvas">
        {SKILLS.map((skill) => {
          const pos = positions[skill.id] || { x: 0, y: 0 };
          const z = zIndexes[skill.id] || 1;
          return (
            <div
              key={skill.id}
              className="skillCard"
              style={{
                top: skill.top,
                left: skill.left,
                transform: `translate(${pos.x}px, ${pos.y}px) rotate(${skill.rotate}deg)`,
                zIndex: z,
              }}
              onPointerDown={(e) => handlePointerDown(e, skill.id)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <img src={skill.icon} alt={skill.label} draggable={false} />
              <span>{skill.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
