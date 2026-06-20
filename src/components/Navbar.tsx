"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LogoSpin from "./LogoSpin";

const SCROLL_THRESHOLD = 8;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [atTop, setAtTop] = useState(true);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      setAtTop(y < 50);

      if (y < 50) {
        setVisible(true);
      } else if (delta > SCROLL_THRESHOLD) {
        setVisible(false);
        setMenuOpen(false);
      } else if (delta < -SCROLL_THRESHOLD) {
        setVisible(true);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  const headerBg = atTop
    ? "bg-transparent shadow-none backdrop-blur-none"
    : "bg-surface/95 shadow-md backdrop-blur-md";

  const linkClass = `${atTop
    ? isHome
      ? "font-heading text-sm font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] transition-colors hover:text-teal-light"
      : "font-heading text-sm font-bold text-primary transition-colors hover:text-primary-dark"
    : "font-heading text-sm font-semibold text-primary transition-colors hover:text-primary-dark"} nav-link-3d`;

  const localeClass = `${atTop
    ? isHome
      ? "rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
      : "rounded-full border border-primary/30 px-3 py-1 text-xs font-bold text-primary transition-colors hover:bg-primary/5"
    : "rounded-full border border-primary/20 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/5"} btn-3d`;

  const ctaClass = `${atTop && isHome
    ? "hidden rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-primary shadow-lg transition-all hover:bg-white sm:block"
    : "hidden rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-primary-light sm:block"} btn-3d`;

  const menuLineClass = atTop && isHome ? "bg-white" : "bg-primary";

  const links = [
    { href: "/", label: t("home") },
    { href: "/#about", label: t("about") },
    { href: "/#sectors", label: t("sectors") },
    { href: "/#summit", label: t("summit") },
    { href: "/#why-oman", label: t("whyOman") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  const switchLocale = locale === "ar" ? "en" : "ar";

  return (
    <header
      className={`fixed top-0 z-50 w-full border-0 transition-all duration-300 ease-out ${headerBg} ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:px-8">
        <Link href="/" className="flex items-center">
          <LogoSpin height={42} />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={pathname}
            locale={switchLocale}
            className={localeClass}
          >
            {switchLocale === "ar" ? "عربي" : "EN"}
          </Link>

          <Link
            href="/consultation"
            className={ctaClass}
          >
            {t("consultation")}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2 lg:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 transition-transform ${menuLineClass} ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 transition-opacity ${menuLineClass} ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 transition-transform ${menuLineClass} ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className={`border-t lg:hidden ${atTop && isHome ? "border-white/20 bg-primary-dark/90 backdrop-blur-md" : "border-border bg-surface/98 backdrop-blur-md"}`}>
          <div className="flex flex-col gap-1 px-4 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  atTop && isHome
                    ? "text-white/90 hover:bg-white/10 hover:text-white"
                    : "text-text-muted hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/consultation"
              onClick={() => setMenuOpen(false)}
              className="btn-3d mt-2 rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-white"
            >
              {t("consultation")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
