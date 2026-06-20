"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Card3D from "@/components/ui/Card3D";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeading from "@/components/ui/SectionHeading";

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
    <SectionReveal variant={0} className="section-padding bg-surface">
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

        <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="h-full"
              initial={{ opacity: 0, rotateX: 20, scale: 0.88 }}
              whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.75 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card3D className="card-solid flex h-full min-h-[140px] flex-col items-center justify-center rounded-2xl p-6 text-center">
                <AnimatedCounter
                  value={metric.value}
                  className="gradient-text font-heading text-3xl font-bold"
                  suffixClassName="text-xl text-primary"
                />
                <p className="mt-2 text-sm text-text-muted">{metric.label}</p>
              </Card3D>
            </motion.div>
          ))}
        </div>

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
