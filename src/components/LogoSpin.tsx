"use client";

import Image from "next/image";
import { siteImages } from "@/lib/site-images";

interface LogoSpinProps {
  className?: string;
  height?: number;
}

export default function LogoSpin({ className = "", height = 44 }: LogoSpinProps) {
  return (
    <div
      className={`logo-spin-scene ${className}`}
      style={{ height, width: height * 3.2 }}
    >
      <div className="logo-spin-inner">
        <Image
          src={siteImages.logo}
          alt="Oman Global Industrial Hub 2027"
          width={1600}
          height={379}
          className="h-full w-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}
