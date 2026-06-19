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
      <div
        className={`hero-text-panel relative z-10 mx-auto w-full text-center ${
          isEn
            ? "max-w-[15rem] px-3 py-4 sm:max-w-[17rem] sm:px-4 sm:py-5"
            : "max-w-xs px-4 py-5 sm:max-w-md sm:px-5 sm:py-7 md:max-w-lg md:px-6 md:py-8 lg:max-w-xl"
        }`}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-heading hero-text-accent mb-2 text-xs font-semibold tracking-widest uppercase sm:mb-3 sm:text-sm"
        >
          {t("location")} · {t("date")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`font-heading hero-title mx-auto mb-3 max-w-full font-bold leading-snug sm:mb-4 ${
            isEn
              ? "text-lg sm:text-xl md:text-2xl"
              : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          }`}
        >
          {t("tagline")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`hero-subtitle mx-auto mb-5 max-w-full sm:mb-6 ${
            isEn ? "text-xs sm:text-sm" : "text-sm sm:text-base md:text-lg"
          }`}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-4 sm:gap-5"
        >
          <HeroCountdown />
          <Link
            href="/consultation"
            className="rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-white shadow-lg transition-all hover:bg-primary-light sm:px-8 sm:py-3 sm:text-sm"
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
