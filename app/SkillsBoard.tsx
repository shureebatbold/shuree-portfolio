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
  { id: "photoshop", label: "Photoshop", icon: "/icons/photoshop.svg", rotate: -6, top: "3%", left: "2%" },
  { id: "illustrator", label: "Illustrator", icon: "/icons/illustrator.svg", rotate: 4, top: "9%", left: "20%" },
  { id: "indesign", label: "InDesign", icon: "/icons/indesign.svg", rotate: -3, top: "1%", left: "39%" },
  { id: "aftereffects", label: "After Effects", icon: "/icons/aftereffects.svg", rotate: 5, top: "11%", left: "58%" },
  { id: "revit", label: "Revit", icon: "/icons/revit.svg", rotate: -5, top: "3%", left: "78%" },
  { id: "enscape", label: "Enscape", icon: "/icons/enscape.svg", rotate: -7, top: "33%", left: "6%" },
  { id: "canva", label: "Canva", icon: "/icons/canva.svg", rotate: 3, top: "39%", left: "26%" },
  { id: "office", label: "Microsoft Office", icon: "/icons/office.svg", rotate: -4, top: "29%", left: "46%" },
  { id: "blender", label: "Blender", icon: "/icons/blender.svg", rotate: 6, top: "37%", left: "66%" },
  { id: "arcgis", label: "ArcGIS", icon: "/icons/arcgis.svg", rotate: -3, top: "31%", left: "85%" },
  { id: "sketchup", label: "SketchUp", icon: "/icons/sketchup.svg", rotate: 4, top: "65%", left: "12%" },
  { id: "procreate", label: "Procreate", icon: "/icons/procreate.svg", rotate: -6, top: "69%", left: "34%" },
  { id: "autodesk", label: "Autodesk", icon: "/icons/autodesk.svg", rotate: 5, top: "63%", left: "56%" },
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
          <h3 className="skillsBoardTitle">Tools &amp; Software</h3>
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
