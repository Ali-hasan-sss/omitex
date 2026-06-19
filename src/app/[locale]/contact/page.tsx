"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Card3D from "@/components/ui/Card3D";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-24">
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h1 className="font-heading mb-4 text-4xl font-bold md:text-5xl">
              <span className="gradient-text">{t("title")}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-text-muted">{t("subtitle")}</p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {submitted ? (
                <Card3D className="card-solid flex h-full items-center justify-center rounded-2xl p-12 text-center">
                  <div>
                    <span className="mb-4 block text-5xl text-primary">✓</span>
                    <p className="text-lg text-primary">{t("success")}</p>
                  </div>
                </Card3D>
              ) : (
                <Card3D className="card-solid rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-1 block text-sm text-text-muted">
                      {t("name")}
                    </label>
                    <input type="text" required className="input-field" />
                  </div>
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
                    <input type="tel" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-text-muted">
                      {t("country")}
                    </label>
                    <input type="text" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-text-muted">
                      {t("message")}
                    </label>
                    <textarea rows={4} required className="input-field" />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light"
                  >
                    {t("send")}
                  </button>
                </form>
                </Card3D>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {[
                { icon: "📍", label: t("info.address") },
                {
                  icon: "✉️",
                  label: t("info.email"),
                  href: `mailto:${t("info.email")}`,
                },
                { icon: "📞", label: t("info.phone1") },
                { icon: "📞", label: t("info.phone2") },
                {
                  icon: "🌐",
                  label: t("info.website"),
                  href: `https://${t("info.website")}`,
                },
              ].map((item, i) => (
                <Card3D key={i} className="card-solid flex items-center gap-4 rounded-xl p-5">
                  <span className="text-2xl">{item.icon}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm transition-colors hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-sm">{item.label}</span>
                  )}
                </Card3D>
              ))}

              <div className="card-solid h-64 overflow-hidden rounded-2xl">
                <iframe
                  title="Muscat Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.097!2d58.545!3d23.588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM1JzE2LjgiTiA1OMKwMzInNDIuMCJF!5e0!3m2!1sen!2som!4v1"
                  className="h-full w-full border-0 opacity-80"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
