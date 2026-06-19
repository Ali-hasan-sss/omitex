"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const EXHIBITION_DATE = new Date(2027, 0, 11, 0, 0, 0, 0);

function getRemainingMonthsAndDays(from: Date, to: Date) {
  if (from >= to) return { months: 0, days: 0 };

  let months =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months -= 1;
    const lastDayOfPrevMonth = new Date(
      to.getFullYear(),
      to.getMonth(),
      0
    ).getDate();
    days += lastDayOfPrevMonth;
  }

  if (months < 0) {
    return { months: 0, days: 0 };
  }

  return { months, days };
}

export default function HeroCountdown() {
  const t = useTranslations("hero.countdown");
  const [remaining, setRemaining] = useState({ months: 0, days: 0 });

  useEffect(() => {
    const update = () => {
      setRemaining(getRemainingMonthsAndDays(new Date(), EXHIBITION_DATE));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero-countdown">
      <p className="hero-countdown-label">{t("title")}</p>
      <div className="hero-countdown-grid">
        <div className="hero-countdown-item">
          <span className="hero-countdown-value">{remaining.months}</span>
          <span className="hero-countdown-unit">{t("months")}</span>
        </div>
        <span className="hero-countdown-separator">:</span>
        <div className="hero-countdown-item">
          <span className="hero-countdown-value">{remaining.days}</span>
          <span className="hero-countdown-unit">{t("days")}</span>
        </div>
      </div>
      <p className="hero-countdown-date">{t("date")}</p>
    </div>
  );
}
