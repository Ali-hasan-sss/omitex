"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { siteImages } from "@/lib/site-images";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Card3D from "@/components/ui/Card3D";

export default function AboutSection() {
  const t = useTranslations("about");

  return (
    <SectionReveal id="about" variant={0} tone="alt" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, rotateX: 22, y: 36 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center md:mb-14"
          style={{ transformStyle: "preserve-3d" }}
        >
          <SectionHeading className="mb-0">{t("title")}</SectionHeading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotateY: 12, scale: 0.94 }}
          whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="mb-10 md:mb-14"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Card3D className="about-panorama-card overflow-hidden rounded-2xl border border-border shadow-lg">
            <div className="relative aspect-[3655/1536] w-full">
              <Image
                src={siteImages.about}
                alt="Oman Global Industrial Hub — Duqm"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-bg/10" />
            </div>
          </Card3D>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, rotateY: -12, x: -30 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.2 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Card3D className="card-solid h-full rounded-2xl p-6 md:p-8">
              <p className="text-base leading-[1.85] text-text-muted md:text-lg">
                {t("p1")}
              </p>
            </Card3D>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotateY: 12, x: 30 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.3 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Card3D className="card-solid h-full rounded-2xl border-primary/15 p-6 md:p-8">
              <p className="text-base leading-[1.85] text-text md:text-lg">
                {t("p2")}
              </p>
            </Card3D>
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  );
}
