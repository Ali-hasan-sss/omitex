"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import HeroCountdown from "@/components/HeroCountdown";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <section className="relative flex min-h-screen items-center justify-center px-3 sm:px-4">
      <div className="hero-text-panel relative z-10 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hero-text-accent-slot"
        >
          <p
            className={`font-heading hero-text-accent font-semibold tracking-widest uppercase ${
              isEn ? "text-[0.65rem] sm:text-xs" : "text-xs sm:text-sm"
            }`}
          >
            {t("location")} · {t("date")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="hero-title-slot"
        >
          <h1
            className={`font-heading hero-title w-full font-bold ${
              isEn
                ? "text-[0.95rem] leading-snug sm:text-base md:text-lg lg:text-xl"
                : "text-2xl leading-snug sm:text-3xl md:text-4xl lg:text-5xl"
            }`}
          >
            {t("tagline")}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="hero-subtitle-slot"
        >
          <p
            className={`hero-subtitle w-full ${
              isEn ? "text-[0.7rem] sm:text-xs" : "text-sm sm:text-base md:text-lg"
            }`}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="hero-actions-slot"
        >
          <HeroCountdown />
          <Link
            href="/consultation"
            className="btn-3d rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-white shadow-lg transition-colors hover:bg-primary-light sm:px-8 sm:py-3 sm:text-sm"
          >
            {t("scrollDown")}
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-primary drop-shadow-sm"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
