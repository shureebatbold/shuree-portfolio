"use client";

import { useEffect, useState } from "react";

// Edit this list to change which roles cycle through the typewriter.
const ROLES = [
  "an Interior Designer",
  "a Graphic Designer",
  "a Visual Artist",
  "a Storyteller",
];

const TYPE_SPEED = 90; // ms per character while typing — higher = slower typing
const DELETE_SPEED = 50; // ms per character while deleting — higher = slower deleting
const HOLD_TIME = 1900; // ms to hold the full word before deleting — higher = longer pause on each word
const PAUSE_TIME = 450; // ms pause on an empty string before typing the next word

type Phase = "typing" | "holding" | "deleting" | "pausing";

export default function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < currentRole.length) {
        timeout = setTimeout(() => {
          setText(currentRole.slice(0, text.length + 1));
        }, TYPE_SPEED);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), HOLD_TIME);
      }
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentRole.slice(0, text.length - 1));
        }, DELETE_SPEED);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), PAUSE_TIME);
      }
    } else if (phase === "pausing") {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      setPhase("typing");
    }

    return () => clearTimeout(timeout);
  }, [text, phase, roleIndex]);

  return (
    <span className="typewriter">
      {text}
      <span className="typewriterCursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}
