"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { siteImages } from "@/lib/site-images";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Hover3D from "@/components/ui/Hover3D";
import GatewaySpinIcon from "@/components/ui/GatewaySpinIcon";
import {
  GatewayArrowHorizontal,
  GatewayArrowVertical,
} from "@/components/sections/GatewayArrows";

const pillarKeys = [
  "decisionMakers",
  "entrepreneurs",
  "zones",
  "capital",
  "technology",
] as const;

const pillarImages: Record<(typeof pillarKeys)[number], string> = {
  decisionMakers: siteImages.gateway.decisionMakers,
  entrepreneurs: siteImages.gateway.entrepreneurs,
  zones: siteImages.gateway.zones,
  capital: siteImages.gateway.capital,
  technology: siteImages.gateway.technology,
};

const pillarEnterVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    rotateY: i % 2 === 0 ? -110 : 110,
    rotateX: 28,
    scale: 0.35,
    y: 70,
    filter: "blur(10px)",
  }),
  visible: {
    opacity: 1,
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

function GatewayPillarItem({
  index,
  imageSrc,
  labelAr,
  labelEn,
  mobile = false,
}: {
  index: number;
  imageSrc: string;
  labelAr: string;
  labelEn: string;
  mobile?: boolean;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={pillarEnterVariants}
      transition={{
        duration: 0.85,
        delay: index * 0.14,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`gateway-pillar${mobile ? " gateway-pillar--mobile" : ""}`}
      style={{ transformStyle: "preserve-3d", perspective: 900 }}
    >
      <Hover3D depth={mobile ? 10 : 14}>
        <GatewaySpinIcon
          delay={index * 1.1}
          duration={14}
          className={`gateway-pillar-icon-wrap${mobile ? " gateway-pillar-icon-wrap--sm" : ""}`}
        >
          <Image
            src={imageSrc}
            alt={labelAr}
            width={mobile ? 100 : 140}
            height={mobile ? 100 : 140}
            className="gateway-pillar-icon"
            draggable={false}
          />
        </GatewaySpinIcon>
      </Hover3D>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.14 + 0.35 }}
        className="gateway-pillar-label-ar"
      >
        {labelAr}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.14 + 0.45 }}
        className="gateway-pillar-label-en"
      >
        {labelEn}
      </motion.p>
    </motion.div>
  );
}

export default function GatewaySection() {
  const t = useTranslations("gateway");
  const locale = useLocale();

  const displayOrder =
    locale === "ar"
      ? ([...pillarKeys].reverse() as (typeof pillarKeys)[number][])
      : [...pillarKeys];

  const arrowPointsLeft = locale === "ar";

  return (
    <SectionReveal id="gateway" variant={1} tone="base" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, rotateX: 35, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
          style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateY: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
          >
            <SectionHeading className="mb-4">{t("title")}</SectionHeading>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg font-medium text-primary md:text-xl"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <div className="gateway-pillars-row mb-16 hidden lg:flex lg:items-end lg:justify-center">
          {displayOrder.map((key, i) => (
            <div key={key} className="flex items-end">
              <GatewayPillarItem
                index={i}
                imageSrc={pillarImages[key]}
                labelAr={t(`items.${key}.ar`)}
                labelEn={t(`items.${key}.en`)}
              />
              {i < displayOrder.length - 1 && (
                <GatewayArrowHorizontal
                  pointLeft={arrowPointsLeft}
                  delay={i * 0.14 + 0.5}
                />
              )}
            </div>
          ))}
        </div>

        <div className="gateway-pillars-stack mb-16 flex flex-col items-center lg:hidden">
          {displayOrder.map((key, i) => (
            <div key={key} className="flex flex-col items-center">
              <GatewayPillarItem
                index={i}
                imageSrc={pillarImages[key]}
                labelAr={t(`items.${key}.ar`)}
                labelEn={t(`items.${key}.en`)}
                mobile
              />
              {i < displayOrder.length - 1 && (
                <GatewayArrowVertical delay={i * 0.14 + 0.5} />
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, rotateX: 40, y: 80, scale: 0.88 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="gateway-oman-banner"
          style={{ transformStyle: "preserve-3d", perspective: 1100 }}
        >
          <Hover3D depth={12} className="shrink-0">
            <GatewaySpinIcon duration={8} className="gateway-oman-pin">
              <Image
                src={siteImages.gateway.locationPin}
                alt="Oman"
                width={120}
                height={120}
                className="h-24 w-24 object-contain md:h-28 md:w-28"
                draggable={false}
              />
            </GatewaySpinIcon>
          </Hover3D>
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="gateway-oman-text"
            style={{ transformStyle: "preserve-3d" }}
          >
            <p className="gateway-oman-title">{t("locationTitle")}</p>
            <p className="gateway-oman-subtitle">{t("locationSubtitle")}</p>
          </motion.div>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
