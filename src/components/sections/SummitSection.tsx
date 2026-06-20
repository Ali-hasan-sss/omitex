"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Card3D from "@/components/ui/Card3D";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeading from "@/components/ui/SectionHeading";

const dayKeys = ["day1", "day2", "day3"] as const;

export default function SummitSection() {
  const t = useTranslations("summit");

  return (
    <SectionReveal id="summit" variant={3} className="section-padding">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, rotateY: 16, y: 40 }}
          whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <SectionHeading className="mb-4">{t("title")}</SectionHeading>
          <p className="text-text-muted">{t("subtitle")}</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {dayKeys.map((day, i) => (
            <motion.div
              key={day}
              className="h-full"
              initial={{ opacity: 0, rotateY: i % 2 === 0 ? -18 : 18, y: 40, scale: 0.93 }}
              whileInView={{ opacity: 1, rotateY: 0, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card3D className="card-solid relative flex h-full flex-col overflow-hidden rounded-2xl p-8">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
                <div className="relative flex flex-1 flex-col">
                  <span className="mb-4 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading mb-6 text-xl font-semibold">
                    {t(`days.${day}.title`)}
                  </h3>
                  <ul className="flex-1 space-y-3">
                    {(t.raw(`days.${day}.topics`) as string[]).map(
                      (topic, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-text-muted"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                          {topic}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
