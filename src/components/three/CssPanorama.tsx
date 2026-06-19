"use client";

import { useEffect, useRef, useState } from "react";

interface CssPanoramaProps {
  src: string;
  rotX?: number;
  rotY?: number;
  autoRotate?: boolean;
  isHovering?: boolean;
  className?: string;
}

export default function CssPanorama({
  src,
  rotX = 0,
  rotY = 0,
  autoRotate = true,
  isHovering = false,
  className = "",
}: CssPanoramaProps) {
  const [autoAngle, setAutoAngle] = useState(0);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  useEffect(() => {
    if (!autoRotate || isHovering) return;

    const tick = (now: number) => {
      if (!lastRef.current) lastRef.current = now;
      const delta = (now - lastRef.current) / 1000;
      lastRef.current = now;
      setAutoAngle((a) => a + delta * 0.12);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastRef.current = 0;
    };
  }, [autoRotate, isHovering]);

  const totalY = rotY + (autoRotate && !isHovering ? autoAngle : 0);
  const xPercent = (((totalY / Math.PI + 1) / 2) * 100) % 100;
  const yPercent = 50 - (rotX / (Math.PI / 4)) * 18;

  return (
    <div
      className={`absolute inset-0 h-full w-full bg-[#94a3b8] ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "auto 100%",
        backgroundRepeat: "repeat-x",
        backgroundPosition: `${xPercent}% ${yPercent}%`,
        willChange: "background-position",
      }}
      aria-hidden
    />
  );
}
