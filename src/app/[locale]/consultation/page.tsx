"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Card3D from "@/components/ui/Card3D";

const sectorKeys = [
  "industry40",
  "machinery",
  "digital",
  "logistics",
  "investment",
  "green",
  "other",
] as const;

export default function ConsultationPage() {
  const t = useTranslations("consultation");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-24">
      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="font-heading mb-4 text-4xl font-bold md:text-5xl">
              <span className="gradient-text">{t("title")}</span>
            </h1>
            <p className="max-w-xl text-text-muted">{t("subtitle")}</p>
          </motion.div>

          {submitted ? (
            <Card3D className="card-solid rounded-2xl p-12 text-center">
              <span className="mb-4 block text-5xl text-primary">✓</span>
              <p className="text-lg text-primary">{t("success")}</p>
            </Card3D>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
            <Card3D className="card-solid rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-text-muted">
                    {t("name")}
                  </label>
                  <input type="text" required className="input-field" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-text-muted">
                    {t("company")}
                  </label>
                  <input type="text" required className="input-field" />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-text-muted">
                    {t("email")}
                  </label>
                  <input type="email" required className="input-field" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-text-muted">
                    {t("phone")}
                  </label>
                  <input type="tel" required className="input-field" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm text-text-muted">
                  {t("sector")}
                </label>
                <select className="input-field">
                  {sectorKeys.map((key) => (
                    <option key={key} value={key}>
                      {t(`sectors.${key}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-text-muted">
                    {t("date")}
                  </label>
                  <input type="date" required className="input-field" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-text-muted">
                    {t("time")}
                  </label>
                  <input type="time" required className="input-field" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm text-text-muted">
                  {t("notes")}
                </label>
                <textarea rows={3} className="input-field" />
              </div>

              <button
                type="submit"
                className="animate-pulse-glow w-full rounded-full bg-primary py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light"
              >
                {t("book")}
              </button>
            </form>
            </Card3D>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
