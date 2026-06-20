"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { usePanoramaControls } from "@/hooks/usePanoramaControls";
import { siteImages } from "@/lib/site-images";
import { PanoramaLayer } from "@/components/HeroPanoramaBackground";

export default function PanoramaSection() {
  const t = useTranslations("panorama");
  const { rotX, rotY, isHovering, gyroActive, requestGyro, isMobile, gyroSupported } =
    usePanoramaControls(true, "any");

  return (
    <section id="panorama" className="relative">
      <div className="relative h-screen min-h-[600px]">
        <PanoramaLayer
          src={siteImages.hero360}
          rotX={rotX}
          rotY={rotY}
          isHovering={isHovering || gyroActive}
          autoRotate={!isHovering && !gyroActive}
          overlayClassName="from-bg/80 via-bg-soft/20 to-bg/40"
        />

        <div className="absolute inset-0 z-[3] flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-12 lg:px-8">
            <motion.div
              initial={{ opacity: 0, rotateX: 18, y: 50 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85 }}
              style={{ transformStyle: "preserve-3d" }}
              className="hero-text-panel max-w-lg px-6 py-5"
            >
              <p className="mb-2 text-sm font-medium tracking-widest text-teal uppercase">
                360° VR
              </p>
              <h2 className="font-heading hero-title mb-2 text-3xl font-bold md:text-4xl">
                {t("title")}
              </h2>
              <p className="hero-subtitle max-w-lg">{t("subtitle")}</p>
              <p className="mt-4 text-xs text-text-muted">{t("hint")}</p>
            </motion.div>
          </div>
        </div>

        {isMobile && gyroSupported && !gyroActive && (
          <button
            type="button"
            onClick={() => requestGyro()}
            className="btn-3d absolute bottom-24 left-1/2 z-10 -translate-x-1/2 rounded-full border border-primary/30 bg-surface/90 px-5 py-2 text-xs font-medium text-primary backdrop-blur-sm"
          >
            {t("enableGyro")}
          </button>
        )}
      </div>
    </section>
  );
}
