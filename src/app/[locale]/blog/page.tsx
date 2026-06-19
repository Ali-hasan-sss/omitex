"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { siteImages } from "@/lib/site-images";
import Card3D from "@/components/ui/Card3D";

const postKeys = ["post1", "post2", "post3", "post4"] as const;

export default function BlogPage() {
  const t = useTranslations("blog");

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

          <div className="grid gap-8 md:grid-cols-2">
            {postKeys.map((key, i) => (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card3D className="group card-solid hover-border overflow-hidden rounded-2xl border border-border transition-colors">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={siteImages.blog[i]}
                      alt={t(`posts.${key}.title`)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="bg-surface-light p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs text-primary">
                        {t(`posts.${key}.category`)}
                      </span>
                      <span className="text-xs text-text-muted">
                        {t(`posts.${key}.date`)}
                      </span>
                    </div>
                    <h2 className="font-heading mb-3 text-xl font-semibold transition-colors group-hover:text-primary">
                      {t(`posts.${key}.title`)}
                    </h2>
                    <p className="mb-4 text-sm leading-relaxed text-text-muted">
                      {t(`posts.${key}.excerpt`)}
                    </p>
                    <span className="text-sm font-medium text-teal">
                      {t("readMore")} →
                    </span>
                  </div>
                </Card3D>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
