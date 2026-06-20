"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Card3D from "@/components/ui/Card3D";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import EventMetricsCube from "@/components/sections/EventMetricsCube";

export default function EventSection() {
  const t = useTranslations("event");

  const metrics = [
    { value: t("metrics.initiatives"), label: t("metrics.initiativesLabel") },
    { value: t("metrics.agreements"), label: t("metrics.agreementsLabel") },
    { value: t("metrics.meetings"), label: t("metrics.meetingsLabel") },
    { value: t("metrics.cLevel"), label: t("metrics.cLevelLabel") },
  ];

  const features = [
    t("features.deals"),
    t("features.access"),
    t("features.infrastructure"),
  ];

  return (
    <SectionReveal variant={0} tone="base" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, rotateX: -16, y: 40 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <SectionHeading className="mb-4">{t("title")}</SectionHeading>
          <p className="text-text-muted">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotateY: 30, scale: 0.82 }}
          whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <EventMetricsCube metrics={metrics} />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateY: -12, y: 30 }}
              whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.75 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card3D className="flex items-start gap-3 rounded-xl border border-teal/20 bg-teal/5 p-5">
                <span className="mt-0.5 text-teal">✓</span>
                <p className="text-sm text-text-muted">{feature}</p>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
