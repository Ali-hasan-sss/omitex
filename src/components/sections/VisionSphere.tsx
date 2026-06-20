"use client";

import Hover3D from "@/components/ui/Hover3D";

interface VisionSphereProps {
  gdp: string;
  gdpLabel: string;
}

export default function VisionSphere({ gdp, gdpLabel }: VisionSphereProps) {
  return (
    <div className="vision-sphere-scene">
      <div className="vision-sphere-orbit" aria-hidden>
        <div className="vision-sphere-ring vision-sphere-ring--equator" />
        <div className="vision-sphere-ring vision-sphere-ring--meridian" />
      </div>

      <div className="vision-sphere-core">
        <div className="vision-sphere-highlight" aria-hidden />
        <div className="relative z-10 text-center">
          <Hover3D className="inline-block">
            <span className="gradient-text text-6xl font-bold md:text-7xl">
              {gdp}
            </span>
          </Hover3D>
          <p className="mt-2 max-w-[200px] text-sm text-text-muted">{gdpLabel}</p>
        </div>
      </div>

      <div className="vision-sphere-aura" aria-hidden />
    </div>
  );
}
