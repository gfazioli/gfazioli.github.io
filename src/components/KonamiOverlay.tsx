"use client";

/**
 * Konami code easter egg.
 * Press ↑ ↑ ↓ ↓ ← → ← → B A to trigger an Amiga "Guru Meditation" overlay.
 * Visual is a homage — the canonical implementation is the React component
 * I maintain at https://github.com/gfazioli/react-amiga-guru-meditation
 */

import { useEffect, useState } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

function randomHex(length: number) {
  const chars = "0123456789ABCDEF";
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export function KonamiOverlay() {
  const [active, setActive] = useState(false);
  const [code, setCode] = useState("00000000.00000000");

  useEffect(() => {
    let buffer: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buffer = [...buffer, e.code].slice(-SEQUENCE.length);
      if (buffer.length === SEQUENCE.length && buffer.every((k, i) => k === SEQUENCE[i])) {
        setCode(`${randomHex(8)}.${randomHex(8)}`);
        setActive(true);
        buffer = [];
      } else if (active && e.key === "Escape") {
        setActive(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  if (!active) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Guru Meditation"
      onClick={() => setActive(false)}
      className="fixed inset-0 z-[10000] flex items-start justify-center bg-black/95 p-6 cursor-pointer"
      style={{
        fontFamily: '"Courier New", ui-monospace, monospace',
      }}
    >
      <div
        className="konami-frame mt-12 w-full max-w-3xl border-4 border-red-500 px-6 py-5 text-center text-red-500"
        style={{
          boxShadow: "inset 0 0 0 2px #000, inset 0 0 0 6px #ff2d2d",
        }}
      >
        <p className="text-lg sm:text-2xl font-bold tracking-wide">
          Software Failure. &nbsp;Press left mouse button to continue.
        </p>
        <p className="mt-2 text-sm sm:text-base">
          Guru Meditation #{code}
        </p>
        <p className="mt-6 text-xs opacity-70">
          (Press ESC or click anywhere to dismiss)
        </p>
      </div>
      <style>{`
        .konami-frame {
          animation: konami-blink 1s steps(2, end) infinite;
        }
        @keyframes konami-blink {
          0%, 100% { border-color: #ff2d2d; box-shadow: inset 0 0 0 2px #000, inset 0 0 0 6px #ff2d2d; }
          50% { border-color: #000; box-shadow: inset 0 0 0 2px #ff2d2d, inset 0 0 0 6px #000; }
        }
      `}</style>
    </div>
  );
}
