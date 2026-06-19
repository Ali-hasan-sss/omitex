"use client";

import {
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type MouseEvent,
  type TouchEvent,
} from "react";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  depth?: number;
}

export default function Card3D({
  children,
  className = "",
  depth = 14,
}: Card3DProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [transform, setTransform] = useState(
    `perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)`
  );

  const applyTilt = useCallback(
    (clientX: number, clientY: number) => {
      const el = sceneRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 18;
      const rotateX = (0.5 - y) * 14;

      setTransform(
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${depth}px) scale3d(1.02, 1.02, 1.02)`
      );
    },
    [depth]
  );

  const resetTilt = useCallback(() => {
    setTransform(
      `perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)`
    );
  }, []);

  const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    setIsHovering(true);
    applyTilt(e.clientX, e.clientY);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isHovering) setIsHovering(true);
    applyTilt(e.clientX, e.clientY);
  };

  const onMouseLeave = () => {
    setIsHovering(false);
    resetTilt();
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsHovering(true);
    const touch = e.touches[0];
    if (touch) applyTilt(touch.clientX, touch.clientY);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) applyTilt(touch.clientX, touch.clientY);
  };

  const onTouchEnd = () => {
    setIsHovering(false);
    resetTilt();
  };

  const hasGroup = /\bgroup\b/.test(className);
  const innerClassName = className.replace(/\bgroup\b/g, "").replace(/\s+/g, " ").trim();

  return (
    <div
      ref={sceneRef}
      className={`card-3d-scene${hasGroup ? " group" : ""}${isHovering ? " card-3d-hovered" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={`card-3d-inner${innerClassName ? ` ${innerClassName}` : ""}`}
        style={{ transform }}
      >
        <div className="card-3d-shine" aria-hidden />
        <div className="card-3d-content">{children}</div>
        <div className="card-3d-shadow" aria-hidden />
      </div>
    </div>
  );
}
