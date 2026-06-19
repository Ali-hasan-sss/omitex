"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { siteImages } from "@/lib/site-images";
import Card3D from "@/components/ui/Card3D";

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
    <section id="sectors" className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading mb-4 text-3xl font-bold md:text-4xl">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-text-muted">{t("subtitle")}</p>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-text-muted">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sectorKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card3D className="group card-solid hover-border overflow-hidden rounded-2xl border border-border transition-colors">
                <div className="relative h-44 overflow-hidden">
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
                <div className="bg-surface-light p-6">
                  <h3 className="font-heading mb-2 text-lg font-semibold text-primary">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mb-3 text-sm font-medium text-teal italic">
                    &ldquo;{t(`items.${key}.tagline`)}&rdquo;
                  </p>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
