"use client";

import {
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type MouseEvent,
  type TouchEvent,
} from "react";

interface Hover3DProps {
  children: ReactNode;
  className?: string;
  depth?: number;
}

export default function Hover3D({
  children,
  className = "",
  depth = 10,
}: Hover3DProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
  );

  const applyTilt = useCallback(
    (clientX: number, clientY: number) => {
      const el = sceneRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 22;
      const rotateX = (0.5 - y) * 16;

      setTransform(
        `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${depth}px) scale3d(1.04, 1.04, 1.04)`
      );
    },
    [depth]
  );

  const resetTilt = useCallback(() => {
    setTransform(
      "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    );
  }, []);

  return (
    <div
      ref={sceneRef}
      className={`hover-3d-scene${className ? ` ${className}` : ""}`}
      onMouseMove={(e: MouseEvent<HTMLDivElement>) => applyTilt(e.clientX, e.clientY)}
      onMouseLeave={resetTilt}
      onTouchMove={(e: TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0];
        if (touch) applyTilt(touch.clientX, touch.clientY);
      }}
      onTouchEnd={resetTilt}
    >
      <div className="hover-3d-inner" style={{ transform }}>
        {children}
      </div>
    </div>
  );
}
