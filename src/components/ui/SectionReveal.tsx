"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import SectionWaves from "@/components/ui/SectionWaves";

const variants = [
  { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0 } },
  { hidden: { opacity: 0, y: 44 }, visible: { opacity: 1, y: 0 } },
  { hidden: { opacity: 0, y: 38 }, visible: { opacity: 1, y: 0 } },
];

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: number;
  /** base = أبيض كريمي صلب | alt = كريمي أغمق صلب */
  tone?: "base" | "alt";
  /** false للأقسام ذات صورة خلفية */
  solid?: boolean;
  waves?: boolean;
}

export default function SectionReveal({
  children,
  className = "",
  id,
  variant = 0,
  tone = "base",
  solid = true,
  waves = true,
}: SectionRevealProps) {
  const v = variants[variant % variants.length];
  const bgClass = solid
    ? tone === "alt"
      ? "section-solid-alt"
      : "section-solid"
    : "";

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${bgClass} ${className}`}
    >
      {waves && solid && <SectionWaves variant={variant} />}
      <motion.div
        className="relative z-[1]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-40px" }}
        variants={v}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
