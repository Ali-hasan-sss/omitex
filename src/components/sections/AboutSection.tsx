"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { siteImages } from "@/lib/site-images";
import Card3D from "@/components/ui/Card3D";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AboutSection() {
  const t = useTranslations("about");

  const pillars = [
    t("pillars.entrepreneurs"),
    t("pillars.technology"),
    t("pillars.decisionMakers"),
    t("pillars.capital"),
    t("pillars.zones"),
  ];

  return (
    <SectionReveal id="about" variant={0} className="section-padding">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, rotateY: -14, x: -40 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <SectionHeading className="mb-6">{t("title")}</SectionHeading>
            <p className="mb-4 leading-relaxed text-text-muted">{t("p1")}</p>
            <p className="leading-relaxed text-text-muted">{t("p2")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotateY: 14, x: 40 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="space-y-6"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative h-64 overflow-hidden rounded-2xl">
              <Image
                src={siteImages.about}
                alt="Oman Global Industrial Hub"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
            </div>

            <Card3D className="card-solid rounded-2xl p-8">
              <p className="mb-6 text-lg font-medium text-primary">{t("gateway")}</p>
              <div className="flex flex-wrap gap-3">
                {pillars.map((pillar, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-teal/30 bg-teal/10 px-4 py-2 text-sm text-teal"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </Card3D>
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  );
}
