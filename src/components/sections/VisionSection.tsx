"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function VisionSection() {
  const t = useTranslations("vision");

  return (
    <section className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="flex h-64 w-64 items-center justify-center rounded-full border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-teal/10 md:h-80 md:w-80">
                <div className="text-center">
                  <span className="gradient-text text-6xl font-bold md:text-7xl">
                    {t("gdp")}
                  </span>
                  <p className="mt-2 max-w-[200px] text-sm text-text-muted">
                    {t("gdpLabel")}
                  </p>
                </div>
              </div>
              <div className="absolute -inset-4 animate-pulse-glow rounded-full border border-primary/10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-2 text-sm font-medium tracking-widest text-teal uppercase">
              Oman Vision 2040
            </p>
            <h2 className="font-heading mb-4 text-3xl font-bold md:text-4xl">
              <span className="gradient-text">{t("title")}</span>
            </h2>
            <h3 className="mb-6 text-xl text-primary">{t("subtitle")}</h3>
            <p className="leading-relaxed text-text-muted">{t("description")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
