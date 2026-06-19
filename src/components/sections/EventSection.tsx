"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Card3D from "@/components/ui/Card3D";

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
    <section className="section-padding bg-surface">
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

        <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card3D className="card-solid rounded-2xl p-6 text-center">
                <span className="gradient-text font-heading text-3xl font-bold">
                  {metric.value}
                </span>
                <p className="mt-2 text-sm text-text-muted">{metric.label}</p>
              </Card3D>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card3D className="flex items-start gap-3 rounded-xl border border-teal/20 bg-teal/5 p-5">
                <span className="mt-0.5 text-teal">✓</span>
                <p className="text-sm text-text-muted">{feature}</p>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
