export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
    window.matchMedia("(max-width: 768px)").matches
  );
}

export function canUseWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function getCanvasDpr(): number {
  if (typeof window === "undefined") return 1;
  const mobile = isMobileDevice();
  const dpr = window.devicePixelRatio || 1;
  return mobile ? Math.min(dpr, 1.25) : Math.min(dpr, 2);
}

export function getPanoramaSegments(): [number, number] {
  return isMobileDevice() ? [48, 24] : [96, 48];
}
