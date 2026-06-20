"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Card3D from "@/components/ui/Card3D";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionReveal from "@/components/ui/SectionReveal";
import Hover3D from "@/components/ui/Hover3D";

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
    <SectionReveal variant={1} className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, rotateX: 16, y: 40 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <p className="mb-2 text-sm font-medium tracking-widest text-teal uppercase">
            {t("subtitle")}
          </p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            <Hover3D className="inline-block">
              <span>{t("title")}</span>
            </Hover3D>
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="h-full"
              initial={{ opacity: 0, rotateX: 20, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.75 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card3D className="card-solid animate-pulse-glow flex h-full min-h-[180px] flex-col items-center justify-center rounded-2xl p-8 text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="mt-3 text-sm text-text-muted">{stat.label}</p>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
