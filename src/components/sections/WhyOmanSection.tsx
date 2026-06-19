"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { siteImages } from "@/lib/site-images";
import Card3D from "@/components/ui/Card3D";

const itemKeys = [
  "sohar",
  "salalah",
  "stability",
  "logistics",
  "duqm",
  "zones",
  "trade",
] as const;

const portImages: Partial<Record<(typeof itemKeys)[number], string>> = {
  sohar: siteImages.ports.sohar,
  duqm: siteImages.ports.duqm,
  salalah: siteImages.ports.salalah,
  logistics: siteImages.ports.logistics,
};

export default function WhyOmanSection() {
  const t = useTranslations("whyOman");

  return (
    <section id="why-oman" className="section-padding">
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
          <p className="text-text-muted">{t("subtitle")}</p>
        </motion.div>

        <div className="mb-12 grid gap-8 lg:grid-cols-3">
          {[siteImages.ports.duqm, siteImages.ports.sohar, siteImages.ports.salalah].map(
            (src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card3D className="relative h-56 overflow-hidden rounded-2xl">
                  <Image
                    src={src}
                    alt={["Duqm", "Sohar", "Salalah"][i]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 to-transparent" />
                  <p className="absolute bottom-4 right-4 left-4 text-sm font-semibold text-primary">
                    {i === 0
                      ? t("items.duqm.title")
                      : i === 1
                        ? t("items.sohar.title")
                        : t("items.salalah.title")}
                  </p>
                </Card3D>
              </motion.div>
            )
          )}
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {itemKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card3D className="card-solid overflow-hidden rounded-xl border border-border">
                {portImages[key] && (
                  <div className="relative h-24">
                    <Image
                      src={portImages[key]!}
                      alt={t(`items.${key}.title`)}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                )}
                <div className="bg-surface-light p-5">
                  <span className="mb-2 inline-block text-xs font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading mb-1 font-semibold">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-sm text-text-muted">{t(`items.${key}.desc`)}</p>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-heading mx-auto max-w-3xl border-s-4 border-primary ps-6 text-center text-lg font-medium text-primary italic md:text-xl"
        >
          &ldquo;{t("quote")}&rdquo;
        </motion.blockquote>
      </div>
    </section>
  );
}
