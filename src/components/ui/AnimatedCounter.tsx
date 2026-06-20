"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

type ParsedValue = {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  useCommas: boolean;
  isRange: boolean;
  rangeStart: number;
  rangeEnd: number;
  finalDisplay: string;
};

function parseNumericValue(raw: string, extraSuffix = ""): ParsedValue | null {
  const value = raw.trim();
  const prefix = value.startsWith("+") ? "+" : "";
  const cleaned = value.replace(/^\+/, "");

  const rangeMatch = cleaned.match(/^([\d.,]+)[–-]([\d.,]+)(.*)$/);
  if (rangeMatch) {
    const rangeStart = parseFloat(rangeMatch[1].replace(/,/g, ""));
    const rangeEnd = parseFloat(rangeMatch[2].replace(/,/g, ""));
    const inlineSuffix = rangeMatch[3] + extraSuffix;
    const useCommas = rangeMatch[1].includes(",");
    const decimals = Math.max(
      (rangeMatch[1].split(".")[1] ?? "").length,
      (rangeMatch[2].split(".")[1] ?? "").length
    );

    return {
      prefix,
      suffix: inlineSuffix,
      target: rangeEnd,
      decimals,
      useCommas,
      isRange: true,
      rangeStart,
      rangeEnd,
      finalDisplay: `${prefix}${formatNumber(rangeStart, decimals, useCommas)}–${formatNumber(rangeEnd, decimals, useCommas)}${inlineSuffix}`,
    };
  }

  const trailingSuffixMatch = cleaned.match(/^([\d.,]+)(.*)$/);
  if (!trailingSuffixMatch) return null;

  const numStr = trailingSuffixMatch[1].replace(/,/g, "");
  const target = parseFloat(numStr);
  if (Number.isNaN(target)) return null;

  const inlineSuffix = trailingSuffixMatch[2] + extraSuffix;
  const decimals = (trailingSuffixMatch[1].split(".")[1] ?? "").length;
  const useCommas = trailingSuffixMatch[1].includes(",");

  return {
    prefix,
    suffix: inlineSuffix,
    target,
    decimals,
    useCommas,
    isRange: false,
    rangeStart: target,
    rangeEnd: target,
    finalDisplay: `${prefix}${formatNumber(target, decimals, useCommas)}${inlineSuffix}`,
  };
}

function formatNumber(
  n: number,
  decimals: number,
  useCommas: boolean
): string {
  if (useCommas) {
    return n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return decimals > 0 ? n.toFixed(decimals) : String(Math.round(n));
}

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  className = "gradient-text font-heading text-4xl font-bold md:text-5xl",
  suffixClassName = "text-2xl text-primary md:text-3xl",
  duration = 2000,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const parsed = useMemo(
    () => parseNumericValue(value, suffix),
    [value, suffix]
  );
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView || !parsed) return;

    const startTime = performance.now();
    const { target, decimals, useCommas, prefix, isRange, finalDisplay } =
      parsed;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (progress >= 1) {
        setDisplay(finalDisplay);
        return;
      }

      if (isRange) {
        setDisplay(`${prefix}${formatNumber(current, decimals, useCommas)}`);
      } else {
        setDisplay(
          `${prefix}${formatNumber(current, decimals, useCommas)}${parsed.suffix}`
        );
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, parsed, duration]);

  if (!parsed) {
    return (
      <span ref={ref} className={className}>
        {value}
        {suffix && <span className={suffixClassName}>{suffix}</span>}
      </span>
    );
  }

  const hasSeparateSuffix =
    suffix && !display.endsWith(suffix) && !parsed.suffix.includes(suffix);

  return (
    <span ref={ref} className={className}>
      {display}
      {hasSeparateSuffix && (
        <span className={suffixClassName}>{suffix}</span>
      )}
    </span>
  );
}
