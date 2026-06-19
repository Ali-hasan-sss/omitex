"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type DeviceOrientationEventCtor = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<PermissionState>;
};

function getDeviceOrientationEvent(): DeviceOrientationEventCtor | undefined {
  if (typeof window === "undefined") return undefined;
  if (typeof DeviceOrientationEvent === "undefined") return undefined;
  return DeviceOrientationEvent as DeviceOrientationEventCtor;
}

export function usePanoramaControls(
  active: boolean = true,
  zone: "hero" | "any" = "hero"
) {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [gyroActive, setGyroActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [gyroSupported, setGyroSupported] = useState(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setIsMobile(
      "ontouchstart" in window ||
        window.matchMedia("(max-width: 768px)").matches
    );
    setGyroSupported(Boolean(getDeviceOrientationEvent()));
  }, []);

  useEffect(() => {
    if (!active) return;

    const animate = () => {
      setRotX((prev) => {
        const next = prev + (targetRef.current.x - prev) * 0.06;
        return Math.abs(next - targetRef.current.x) < 0.0001
          ? targetRef.current.x
          : next;
      });
      setRotY((prev) => {
        const next = prev + (targetRef.current.y - prev) * 0.06;
        return Math.abs(next - targetRef.current.y) < 0.0001
          ? targetRef.current.y
          : next;
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  useEffect(() => {
    if (!active || isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      if (zone === "hero") {
        const heroHeight = window.innerHeight;
        if (window.scrollY > heroHeight) return;
      }

      setIsHovering(true);
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny =
        zone === "hero"
          ? (e.clientY / window.innerHeight - 0.5) * 2
          : (e.clientY / window.innerHeight - 0.5) * 2;

      targetRef.current.y = nx * Math.PI * 0.45;
      targetRef.current.x = -ny * Math.PI * 0.18;
    };

    const onMouseLeave = () => {
      setIsHovering(false);
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [active, isMobile, zone]);

  useEffect(() => {
    if (!active || !gyroActive || !getDeviceOrientationEvent()) return;

    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha == null || e.beta == null) return;

      const gamma = e.gamma ?? 0;
      const beta = e.beta ?? 45;

      targetRef.current.y = (gamma * Math.PI) / 180;
      targetRef.current.x = -((beta - 45) * Math.PI) / 180;
      targetRef.current.x = Math.max(
        -Math.PI * 0.25,
        Math.min(Math.PI * 0.25, targetRef.current.x)
      );
    };

    window.addEventListener("deviceorientation", onOrientation, true);
    return () =>
      window.removeEventListener("deviceorientation", onOrientation, true);
  }, [active, gyroActive]);

  const requestGyro = useCallback(async () => {
    const DOE = getDeviceOrientationEvent();
    if (!DOE) return false;

    try {
      if (typeof DOE.requestPermission === "function") {
        const permission = await DOE.requestPermission();
        if (permission === "granted") {
          setGyroActive(true);
          return true;
        }
        return false;
      }
      setGyroActive(true);
      return true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    if (!active || !isMobile) return;

    const DOE = getDeviceOrientationEvent();
    if (!DOE) return;

    if (typeof DOE.requestPermission !== "function") {
      setGyroActive(true);
    }
  }, [active, isMobile]);

  return {
    rotX,
    rotY,
    isHovering,
    gyroActive,
    requestGyro,
    isMobile,
    gyroSupported,
  };
}
