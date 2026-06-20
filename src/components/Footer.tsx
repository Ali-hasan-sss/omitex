"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LogoSpin from "@/components/LogoSpin";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const contact = useTranslations("contact");

  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center lg:items-start">
            <Link href="/" className="mb-4 inline-flex">
              <LogoSpin height={52} />
            </Link>
            <p className="max-w-xs text-center text-sm text-white/70 lg:text-start">
              {t("description")}
            </p>
          </div>

          <div>
            <h3 className="font-heading mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {[
                { label: nav("home"), href: "/" },
                { label: nav("about"), href: "/#about" },
                { label: nav("sectors"), href: "/#sectors" },
                { label: nav("blog"), href: "/blog" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              {t("services")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/consultation"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {nav("consultation")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {nav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              {t("reachUs")}
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>{contact("info.address")}</li>
              <li>
                <a
                  href={`mailto:${contact("info.email")}`}
                  className="transition-colors hover:text-white"
                >
                  {contact("info.email")}
                </a>
              </li>
              <li>{contact("info.phone1")}</li>
              <li>{contact("info.phone2")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/50">
          {t("rights")}
        </div>
      </div>
    </footer>
  );
}
