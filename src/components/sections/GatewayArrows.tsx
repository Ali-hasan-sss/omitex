"use client";

import { useId } from "react";
import { motion } from "framer-motion";

function ArrowGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#c9a227" />
      <stop offset="50%" stopColor="#e8c547" />
      <stop offset="100%" stopColor="#b8941f" />
    </linearGradient>
  );
}

function ArrowHeadMarker({ id }: { id: string }) {
  return (
    <marker
      id={id}
      markerWidth="7"
      markerHeight="7"
      refX="5.5"
      refY="3.5"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <path
        d="M0.5 0.5 L6.5 3.5 L0.5 6.5 L2 3.5 Z"
        fill="#d4af37"
        stroke="#b8941f"
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
    </marker>
  );
}

export function GatewayArrowHorizontal({
  delay = 0,
  pointLeft = false,
}: {
  delay?: number;
  pointLeft?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const gradId = `gw-grad-h-${uid}`;
  const markerId = `gw-marker-h-${uid}`;

  const pathD = pointLeft
    ? "M76 28 C52 4, 28 4, 4 28"
    : "M4 28 C28 4, 52 4, 76 28";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, y: -16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className="gateway-arrow gateway-arrow--horizontal hidden shrink-0 lg:flex"
      aria-hidden
    >
      <svg viewBox="0 0 80 36" className="h-9 w-16 xl:w-20" fill="none">
        <defs>
          <ArrowGradient id={gradId} />
          <ArrowHeadMarker id={markerId} />
        </defs>
        <path
          d={pathD}
          stroke={`url(#${gradId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          markerEnd={`url(#${markerId})`}
        />
      </svg>
    </motion.div>
  );
}

export function GatewayArrowVertical({ delay = 0 }: { delay?: number }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `gw-grad-v-${uid}`;
  const markerId = `gw-marker-v-${uid}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className="gateway-arrow gateway-arrow--vertical flex lg:hidden"
      aria-hidden
    >
      <svg viewBox="0 0 36 56" className="h-12 w-9" fill="none">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9a227" />
            <stop offset="50%" stopColor="#e8c547" />
            <stop offset="100%" stopColor="#b8941f" />
          </linearGradient>
          <marker
            id={markerId}
            markerWidth="7"
            markerHeight="7"
            refX="5.5"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path
              d="M0.5 0.5 L6.5 3.5 L0.5 6.5 L2 3.5 Z"
              fill="#d4af37"
              stroke="#b8941f"
              strokeWidth="0.4"
              strokeLinejoin="round"
            />
          </marker>
        </defs>
        <path
          d="M18 4 C30 14, 30 28, 18 48"
          stroke={`url(#${gradId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          markerEnd={`url(#${markerId})`}
        />
      </svg>
    </motion.div>
  );
}
