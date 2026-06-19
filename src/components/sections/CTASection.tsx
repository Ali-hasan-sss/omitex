"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/5 to-teal/5" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="font-heading mb-4 text-3xl font-bold md:text-4xl">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="mb-10 max-w-2xl text-text-muted">{t("subtitle")}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/consultation"
              className="animate-pulse-glow rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light"
            >
              {t("bookConsultation")}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-primary/30 px-8 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/5"
            >
              {t("bookMeeting")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
