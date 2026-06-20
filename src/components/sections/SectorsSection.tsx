"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { siteImages } from "@/lib/site-images";
import Card3D from "@/components/ui/Card3D";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeading from "@/components/ui/SectionHeading";

const sectorKeys = [
  "industry40",
  "machinery",
  "digital",
  "logistics",
  "investment",
  "green",
] as const;

const sectorImages = [
  siteImages.sectors.industry40,
  siteImages.sectors.machinery,
  siteImages.sectors.digital,
  siteImages.sectors.logistics,
  siteImages.sectors.investment,
  siteImages.sectors.green,
];

export default function SectorsSection() {
  const t = useTranslations("sectors");

  return (
    <SectionReveal id="sectors" variant={2} tone="base" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, rotateX: 18, y: 40 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <SectionHeading className="mb-4">{t("title")}</SectionHeading>
          <p className="mx-auto max-w-2xl text-text-muted">{t("subtitle")}</p>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-text-muted">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sectorKeys.map((key, i) => (
            <motion.div
              key={key}
              className="h-full"
              initial={{ opacity: 0, rotateX: 22, y: 50, scale: 0.92 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.75 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card3D className="group card-solid hover-border flex h-full flex-col overflow-hidden rounded-2xl border border-border transition-colors">
                <div className="relative h-44 shrink-0 overflow-hidden">
                  <Image
                    src={sectorImages[i]}
                    alt={t(`items.${key}.title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-surface-light/90 px-2 py-0.5 text-xs text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex min-h-[220px] flex-1 flex-col bg-surface-light p-6">
                  <h3 className="font-heading mb-2 text-lg font-semibold text-primary">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mb-3 shrink-0 text-sm font-medium text-teal italic">
                    &ldquo;{t(`items.${key}.tagline`)}&rdquo;
                  </p>
                  <p className="flex-1 text-sm leading-relaxed text-text-muted">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
