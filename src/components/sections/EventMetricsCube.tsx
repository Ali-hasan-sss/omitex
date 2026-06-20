"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { useTranslations } from "next-intl";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export type EventMetric = {
  value: string;
  label: string;
};

const faceOrder = ["front", "right", "back", "left"] as const;

interface EventMetricsCubeProps {
  metrics: EventMetric[];
}

export default function EventMetricsCube({ metrics }: EventMetricsCubeProps) {
  const t = useTranslations("event");
  const sceneRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const rotXRef = useRef(-14);
  const rotYRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const rafRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  const applyTransform = useCallback(() => {
    if (cubeRef.current) {
      cubeRef.current.style.transform = `rotateX(${rotXRef.current}deg) rotateY(${rotYRef.current}deg)`;
    }
  }, []);

  const tick = useCallback(
    (now: number) => {
      if (pausedRef.current) return;

      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }

      const elapsed = (now - startTimeRef.current) / 1000;
      rotYRef.current = elapsed * 18;
      applyTransform();
      rafRef.current = requestAnimationFrame(tick);
    },
    [applyTransform]
  );

  useEffect(() => {
    applyTransform();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick, applyTransform]);

  const onPointerEnter = () => {
    pausedRef.current = true;
    cancelAnimationFrame(rafRef.current);
    draggingRef.current = false;
  };

  const onPointerMove = (clientX: number, clientY: number) => {
    if (!pausedRef.current) return;

    if (!draggingRef.current) {
      draggingRef.current = true;
      lastXRef.current = clientX;
      lastYRef.current = clientY;
      return;
    }

    const deltaX = clientX - lastXRef.current;
    const deltaY = clientY - lastYRef.current;
    lastXRef.current = clientX;
    lastYRef.current = clientY;

    rotYRef.current += deltaX * 0.55;
    rotXRef.current = Math.max(-35, Math.min(25, rotXRef.current - deltaY * 0.35));
    applyTransform();
  };

  const onPointerLeave = () => {
    pausedRef.current = false;
    draggingRef.current = false;
    startTimeRef.current = performance.now() - (rotYRef.current / 18) * 1000;
    rafRef.current = requestAnimationFrame(tick);
  };

  return (
    <div
      ref={sceneRef}
      className="event-cube-scene"
      onMouseEnter={onPointerEnter}
      onMouseMove={(e: MouseEvent<HTMLDivElement>) =>
        onPointerMove(e.clientX, e.clientY)
      }
      onMouseLeave={onPointerLeave}
      onTouchStart={onPointerEnter}
      onTouchMove={(e: TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0];
        if (touch) onPointerMove(touch.clientX, touch.clientY);
      }}
      onTouchEnd={onPointerLeave}
    >
      <div ref={cubeRef} className="event-cube">
        {faceOrder.map((face, i) => {
          const metric = metrics[i];
          if (!metric) return null;

          return (
            <div
              key={face}
              className={`event-cube-face event-cube-face--${face}`}
            >
              <AnimatedCounter
                value={metric.value}
                className="gradient-text font-heading text-4xl font-bold md:text-5xl"
                suffixClassName="text-2xl text-primary md:text-3xl"
              />
              <p className="event-cube-face-label">{metric.label}</p>
            </div>
          );
        })}

        <div className="event-cube-face event-cube-face--top" aria-hidden>
          <span className="event-cube-cap">OGIH</span>
        </div>
        <div className="event-cube-face event-cube-face--bottom" aria-hidden>
          <span className="event-cube-cap">2027</span>
        </div>
      </div>
      <p className="event-cube-hint">{t("cubeHint")}</p>
    </div>
  );
}
