"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Card3D from "@/components/ui/Card3D";

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: string;
  suffix?: string;
}) {
  return (
    <span className="gradient-text font-heading text-4xl font-bold md:text-5xl">
      {value}
      {suffix && (
        <span className="text-2xl text-primary md:text-3xl">{suffix}</span>
      )}
    </span>
  );
}

export default function StatsSection() {
  const t = useTranslations("stats");

  const stats = [
    { value: "30", suffix: "+", label: t("fdiLabel") },
    { value: t("companies"), label: t("companiesLabel") },
    { value: t("countries"), label: t("countriesLabel") },
    { value: t("visitors"), label: t("visitorsLabel") },
    { value: t("deals"), suffix: "M$", label: t("dealsLabel") },
    {
      value: t("digitalTransform"),
      suffix: "T$",
      label: t("digitalTransformLabel"),
    },
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
          <p className="mb-2 text-sm font-medium tracking-widest text-teal uppercase">
            {t("subtitle")}
          </p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card3D className="card-solid animate-pulse-glow rounded-2xl p-8 text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="mt-3 text-sm text-text-muted">{stat.label}</p>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
