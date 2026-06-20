"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { siteImages } from "@/lib/site-images";
import Card3D from "@/components/ui/Card3D";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeading from "@/components/ui/SectionHeading";

const itemKeys = [
  "sohar",
  "salalah",
  "stability",
  "logistics",
  "duqm",
  "zones",
  "trade",
] as const;

const featuredPorts = ["duqm", "sohar", "salalah"] as const;

const featuredPortImages: Record<(typeof featuredPorts)[number], string> = {
  duqm: siteImages.whyOman.featured.duqm,
  sohar: siteImages.whyOman.featured.sohar,
  salalah: siteImages.whyOman.featured.salalah,
};

const cardImages: Record<
  (typeof itemKeys)[number],
  { src: string; contain?: boolean }
> = {
  sohar: { src: siteImages.whyOman.sohar },
  salalah: { src: siteImages.whyOman.salalah },
  duqm: { src: siteImages.whyOman.duqm },
  logistics: { src: siteImages.whyOman.logistics },
  stability: { src: siteImages.whyOman.stability, contain: true },
  zones: { src: siteImages.whyOman.zones },
  trade: { src: siteImages.whyOman.trade },
};

export default function WhyOmanSection() {
  const t = useTranslations("whyOman");

  return (
    <SectionReveal id="why-oman" variant={1} tone="alt" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, rotateY: -14, y: 40 }}
          whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <SectionHeading className="mb-4">{t("title")}</SectionHeading>
          <p className="text-text-muted">{t("subtitle")}</p>
        </motion.div>

        <div className="mb-12 grid gap-8 lg:grid-cols-3">
          {featuredPorts.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, rotateX: 20, y: 40, scale: 0.94 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.75 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card3D className="group overflow-hidden rounded-2xl">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={featuredPortImages[key]}
                    alt={t(`items.${key}.title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/20 to-transparent" />
                  <div className="absolute right-4 bottom-4 left-4 z-10">
                    <p className="font-heading text-lg font-semibold text-white">
                      {t(`items.${key}.title`)}
                    </p>
                    <p className="mt-1 text-sm text-white/80">
                      {t(`items.${key}.desc`)}
                    </p>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {itemKeys.map((key, i) => {
            const { src, contain } = cardImages[key];

            return (
              <motion.div
                key={key}
                className="h-full"
                initial={{ opacity: 0, rotateY: i % 2 === 0 ? -14 : 14, y: 30 }}
                whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.75 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card3D className="group card-solid hover-border flex h-full flex-col overflow-hidden rounded-xl border border-border transition-colors">
                  <div
                    className={`relative h-36 shrink-0 overflow-hidden ${
                      contain
                        ? "bg-gradient-to-br from-primary/10 via-surface to-teal/10"
                        : "bg-surface"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={t(`items.${key}.title`)}
                      fill
                      className={
                        contain
                          ? "object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                          : "object-cover transition-transform duration-500 group-hover:scale-105"
                      }
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                    <span className="absolute top-3 right-3 rounded-full bg-surface-light/95 px-2 py-0.5 text-xs font-bold text-primary shadow-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex min-h-[120px] flex-1 flex-col bg-surface-light p-5">
                    <h3 className="font-heading mb-1 font-semibold text-primary">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-text-muted">
                      {t(`items.${key}.desc`)}
                    </p>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, rotateX: 10, y: 20 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ transformStyle: "preserve-3d" }}
          className="font-heading mx-auto max-w-3xl border-s-4 border-primary ps-6 text-center text-lg font-medium text-primary italic md:text-xl"
        >
          &ldquo;{t("quote")}&rdquo;
        </motion.blockquote>
      </div>
    </SectionReveal>
  );
}
