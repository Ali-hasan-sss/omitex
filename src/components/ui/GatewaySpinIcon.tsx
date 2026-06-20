"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
  type MouseEvent,
  type TouchEvent,
} from "react";

interface GatewaySpinIconProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export default function GatewaySpinIcon({
  children,
  className = "",
  duration = 14,
  delay = 0,
}: GatewaySpinIconProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rotateYRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  const applyTransform = useCallback((deg: number) => {
    const inner = sceneRef.current?.querySelector<HTMLElement>(
      "[data-gateway-spin-inner]"
    );
    if (inner) {
      inner.style.transform = `rotateY(${deg}deg)`;
    }
  }, []);

  const tick = useCallback(
    (now: number) => {
      if (pausedRef.current) return;

      if (startTimeRef.current === null) {
        startTimeRef.current = now - delay * 1000;
      }

      const elapsed = (now - startTimeRef.current) / 1000;
      rotateYRef.current = (elapsed / duration) * 360;
      applyTransform(rotateYRef.current);
      rafRef.current = requestAnimationFrame(tick);
    },
    [applyTransform, delay, duration]
  );

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const onPointerEnter = () => {
    pausedRef.current = true;
    cancelAnimationFrame(rafRef.current);
    draggingRef.current = false;
  };

  const onPointerMove = (clientX: number) => {
    if (!pausedRef.current) return;

    if (!draggingRef.current) {
      draggingRef.current = true;
      lastXRef.current = clientX;
      return;
    }

    const delta = clientX - lastXRef.current;
    lastXRef.current = clientX;
    rotateYRef.current += delta * 0.65;
    applyTransform(rotateYRef.current);
  };

  const onPointerLeave = () => {
    pausedRef.current = false;
    draggingRef.current = false;
    startTimeRef.current =
      performance.now() - (rotateYRef.current / 360) * duration * 1000;
    rafRef.current = requestAnimationFrame(tick);
  };

  return (
    <div
      ref={sceneRef}
      className={`gateway-spin-scene cursor-grab active:cursor-grabbing${className ? ` ${className}` : ""}`}
      onMouseEnter={onPointerEnter}
      onMouseMove={(e: MouseEvent<HTMLDivElement>) => onPointerMove(e.clientX)}
      onMouseLeave={onPointerLeave}
      onTouchStart={onPointerEnter}
      onTouchMove={(e: TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0];
        if (touch) onPointerMove(touch.clientX);
      }}
      onTouchEnd={onPointerLeave}
      title=""
    >
      <div data-gateway-spin-inner className="gateway-spin-inner-static">
        {children}
      </div>
    </div>
  );
}
