"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePanoramaControls } from "@/hooks/usePanoramaControls";
import { isMobileDevice } from "@/lib/webgl";
import { WebGLErrorBoundary } from "@/components/three/WebGLErrorBoundary";
import CssPanorama from "@/components/three/CssPanorama";
import { siteImages } from "@/lib/site-images";

const PanoramaViewer = dynamic(
  () => import("@/components/three/PanoramaViewer"),
  { ssr: false }
);

interface PanoramaLayerProps {
  src?: string;
  rotX: number;
  rotY: number;
  autoRotate: boolean;
  isHovering: boolean;
  fixed?: boolean;
  fadeOnScroll?: boolean;
  overlayClassName?: string;
}

function PanoramaLayer({
  src = siteImages.hero360,
  rotX,
  rotY,
  autoRotate,
  isHovering,
  fixed = false,
  fadeOnScroll = false,
  overlayClassName = "from-transparent via-transparent to-bg/25",
}: PanoramaLayerProps) {
  const [mobile, setMobile] = useState(false);
  const [useCssOnly, setUseCssOnly] = useState(true);
  const [webglReady, setWebglReady] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const isMobile = isMobileDevice();
    setMobile(isMobile);
    setUseCssOnly(isMobile);
  }, []);

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

  const positionClass = fixed
    ? "fixed inset-0 z-0"
    : "absolute inset-0 h-full w-full";

  const showWebGL = !mobile && !useCssOnly;
  const showCss = !showWebGL || !webglReady;

  return (
    <div
      className={`${positionClass} overflow-hidden`}
      style={fadeOnScroll ? { opacity: scrollOpacity } : undefined}
    >
      {/* CSS — يعمل دائماً كطبقة أساسية */}
      <CssPanorama
        src={src}
        rotX={rotX}
        rotY={rotY}
        autoRotate={autoRotate}
        isHovering={isHovering}
        className={showCss ? "opacity-100" : "opacity-0 transition-opacity duration-700"}
      />

      {/* WebGL — للديسكتوب فقط */}
      {showWebGL && (
        <WebGLErrorBoundary
          fallback={null}
        >
          <PanoramaViewer
            src={src}
            rotX={rotX}
            rotY={rotY}
            autoRotate={autoRotate}
            isHovering={isHovering}
            overlay={false}
            fixed={false}
            fadeOnScroll={false}
            onWebGLFailed={() => {
              setUseCssOnly(true);
              setWebglReady(false);
            }}
            onReady={() => setWebglReady(true)}
            className="!absolute inset-0 z-[1]"
          />
        </WebGLErrorBoundary>
      )}

      {showWebGL && !webglReady && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center bg-bg/30">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}

      <div
        className={`pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b ${overlayClassName}`}
      />
    </div>
  );
}

export default function HeroPanoramaBackground() {
  const t = useTranslations("panorama");
  const { rotX, rotY, isHovering, gyroActive, requestGyro, isMobile, gyroSupported } =
    usePanoramaControls(true);

  return (
    <>
      <PanoramaLayer
        fixed
        fadeOnScroll
        rotX={rotX}
        rotY={rotY}
        isHovering={isHovering || gyroActive}
        autoRotate={!isHovering && !gyroActive}
      />

      {isMobile && gyroSupported && !gyroActive && (
        <button
          type="button"
          onClick={() => requestGyro()}
          className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-full border border-primary/30 bg-surface/90 px-5 py-2 text-xs font-medium text-primary backdrop-blur-sm"
        >
          {t("enableGyro")}
        </button>
      )}
    </>
  );
}

export { PanoramaLayer };
