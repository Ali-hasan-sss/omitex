"use client";

import { Suspense, useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { siteImages } from "@/lib/site-images";
import { getCanvasDpr, getPanoramaSegments, isMobileDevice } from "@/lib/webgl";

function usePanoramaTexture(src: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();

    loader.load(
      src,
      (tex) => {
        if (cancelled) return;

        const img = tex.image as HTMLImageElement | HTMLCanvasElement;
        const mobile = isMobileDevice();

        if (mobile && img instanceof HTMLImageElement && img.width > 2048) {
          const scale = 2048 / img.width;
          const canvas = document.createElement("canvas");
          canvas.width = 2048;
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            tex.image = canvas;
            tex.needsUpdate = true;
          }
        }

        tex.mapping = THREE.EquirectangularReflectionMapping;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        setTexture(tex);
      },
      undefined,
      () => {
        if (!cancelled) setError(true);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [src]);

  return { texture, error };
}

function PanoramaSphere({
  src,
  rotX,
  rotY,
  autoRotate,
  isHovering,
  segments,
  onReady,
  onError,
}: {
  src: string;
  rotX: number;
  rotY: number;
  autoRotate: boolean;
  isHovering: boolean;
  segments: [number, number];
  onReady?: () => void;
  onError?: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { texture, error } = usePanoramaTexture(src);

  useEffect(() => {
    if (texture) onReady?.();
  }, [texture, onReady]);

  useEffect(() => {
    if (error) onError?.();
  }, [error, onError]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = rotX;
    meshRef.current.rotation.y = rotY;
    if (autoRotate && !isHovering) {
      meshRef.current.rotation.y += delta * 0.04;
    }
  });

  if (error || !texture) return null;

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, segments[0], segments[1]]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

export interface PanoramaViewerProps {
  className?: string;
  src?: string;
  rotX?: number;
  rotY?: number;
  autoRotate?: boolean;
  isHovering?: boolean;
  overlay?: boolean;
  overlayClassName?: string;
  fixed?: boolean;
  fadeOnScroll?: boolean;
  onWebGLFailed?: () => void;
  onReady?: () => void;
}

export default function PanoramaViewer({
  className = "",
  src = siteImages.hero360,
  rotX = 0,
  rotY = 0,
  autoRotate = true,
  isHovering = false,
  overlay = true,
  overlayClassName = "from-bg/70 via-bg-soft/25 to-bg/80",
  fixed = false,
  fadeOnScroll = false,
  onWebGLFailed,
  onReady,
}: PanoramaViewerProps) {
  const [mounted, setMounted] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [segments] = useState<[number, number]>(() =>
    typeof window !== "undefined"
      ? getPanoramaSegments()
      : [64, 32]
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!fadeOnScroll) return;
    const onScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      setScrollOpacity(1 - progress * 0.95);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fadeOnScroll]);

  const handleContextLost = useCallback(
    (e: Event) => {
      e.preventDefault();
      onWebGLFailed?.();
    },
    [onWebGLFailed]
  );

  const positionClass = fixed
    ? "fixed inset-0 z-0"
    : "absolute inset-0 h-full w-full";

  if (!mounted) return null;

  return (
    <div
      className={`${positionClass} overflow-hidden ${className}`}
      style={fadeOnScroll ? { opacity: scrollOpacity } : undefined}
    >
      <Canvas
        className="!absolute inset-0 !h-full !w-full"
        dpr={getCanvasDpr()}
        camera={{ position: [0, 0, 0.1], fov: 75 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", handleContextLost);
        }}
        gl={{
          antialias: !isMobileDevice(),
          alpha: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <PanoramaSphere
            src={src}
            rotX={rotX}
            rotY={rotY}
            autoRotate={autoRotate}
            isHovering={isHovering}
            segments={segments}
            onReady={() => onReady?.()}
            onError={() => onWebGLFailed?.()}
          />
        </Suspense>
      </Canvas>

      {overlay && (
        <div
          className={`pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b ${overlayClassName}`}
        />
      )}
    </div>
  );
}
