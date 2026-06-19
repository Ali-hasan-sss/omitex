"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const contact = useTranslations("contact");

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center lg:items-start">
            <p className="font-heading text-lg font-bold text-primary">OGIH 2027</p>
            <p className="mt-4 max-w-xs text-center text-sm text-text-muted lg:text-start">
              {t("description")}
            </p>
          </div>

          <div>
            <h3 className="font-heading mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {[nav("home"), nav("about"), nav("sectors"), nav("blog")].map(
                (label, i) => (
                  <li key={i}>
                    <Link
                      href={i === 3 ? "/blog" : "/"}
                      className="text-sm text-text-muted transition-colors hover:text-primary"
                    >
                      {label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-heading mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              {t("services")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/consultation"
                  className="text-sm text-text-muted transition-colors hover:text-primary"
                >
                  {nav("consultation")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-text-muted transition-colors hover:text-primary"
                >
                  {nav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              {t("reachUs")}
            </h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>{contact("info.address")}</li>
              <li>
                <a
                  href={`mailto:${contact("info.email")}`}
                  className="transition-colors hover:text-primary"
                >
                  {contact("info.email")}
                </a>
              </li>
              <li>{contact("info.phone1")}</li>
              <li>{contact("info.phone2")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-text-muted">
          {t("rights")}
        </div>
      </div>
    </footer>
  );
}
