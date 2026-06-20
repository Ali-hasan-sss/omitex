"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import VisionSphere from "@/components/sections/VisionSphere";

export default function VisionSection() {
  const t = useTranslations("vision");

  return (
    <SectionReveal variant={2} tone="base" className="section-padding">
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
            <VisionSphere gdp={t("gdp")} gdpLabel={t("gdpLabel")} />
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
