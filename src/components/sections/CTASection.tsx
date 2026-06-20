"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <SectionReveal variant={3} tone="alt" className="section-padding">
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, rotateX: 20, y: 50, scale: 0.94 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
          className="flex flex-col items-center text-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <SectionHeading className="mb-4">{t("title")}</SectionHeading>
          <p className="mb-10 max-w-2xl text-text-muted">{t("subtitle")}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/consultation"
              className="btn-3d animate-pulse-glow rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
            >
              {t("bookConsultation")}
            </Link>
            <Link
              href="/contact"
              className="btn-3d rounded-full border border-primary/30 px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              {t("bookMeeting")}
            </Link>
          </div>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
