"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Hover3D from "@/components/ui/Hover3D";

export default function VisionSection() {
  const t = useTranslations("vision");

  return (
    <SectionReveal variant={2} className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, rotateY: 20, scale: 0.88 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
            className="flex justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative">
              <div className="flex h-64 w-64 items-center justify-center rounded-full border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-teal/10 md:h-80 md:w-80">
                <div className="text-center">
                  <Hover3D className="inline-block">
                    <span className="gradient-text text-6xl font-bold md:text-7xl">
                      {t("gdp")}
                    </span>
                  </Hover3D>
                  <p className="mt-2 max-w-[200px] text-sm text-text-muted">
                    {t("gdpLabel")}
                  </p>
                </div>
              </div>
              <div className="absolute -inset-4 animate-pulse-glow rounded-full border border-primary/10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotateY: -16, x: 40 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.15 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <p className="mb-2 text-sm font-medium tracking-widest text-teal uppercase">
              Oman Vision 2040
            </p>
            <SectionHeading className="mb-4">{t("title")}</SectionHeading>
            <h3 className="mb-6 text-xl text-primary">{t("subtitle")}</h3>
            <p className="leading-relaxed text-text-muted">{t("description")}</p>
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  );
}
