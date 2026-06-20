"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const variants = [
  {
    hidden: { opacity: 0, rotateX: 24, y: 80, scale: 0.92 },
    visible: { opacity: 1, rotateX: 0, y: 0, scale: 1 },
  },
  {
    hidden: { opacity: 0, rotateY: -20, x: -70, scale: 0.94 },
    visible: { opacity: 1, rotateY: 0, x: 0, scale: 1 },
  },
  {
    hidden: { opacity: 0, rotateX: -18, y: 60, rotateZ: -1.5, scale: 0.93 },
    visible: { opacity: 1, rotateX: 0, y: 0, rotateZ: 0, scale: 1 },
  },
  {
    hidden: { opacity: 0, rotateY: 20, x: 70, scale: 0.94 },
    visible: { opacity: 1, rotateY: 0, x: 0, scale: 1 },
  },
];

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: number;
}

export default function SectionReveal({
  children,
  className = "",
  id,
  variant = 0,
}: SectionRevealProps) {
  const v = variants[variant % variants.length];

  return (
    <motion.section
      id={id}
      className={className}
      style={{ perspective: 1400, transformStyle: "preserve-3d" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: "-60px" }}
      variants={v}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ transformStyle: "preserve-3d" }}>{children}</div>
    </motion.section>
  );
}
