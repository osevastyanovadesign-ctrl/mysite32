import React from "react";
import { Instagram, Mail } from "lucide-react";
import { useLang } from "./LanguageContext";

export default function Footer() {
  const { t } = useLang();
  const NAV = [
    { label: t("nav.collection"), href: "#collection" },
    { label: t("nav.philosophy"), href: "#philosophy" },
    { label: t("nav.keepsake"), href: "#keepsake" },
    { label: t("nav.voice"), href: "#voice" },
  ];
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="font-display text-5xl text-background">
              Peek<span className="text-primary">.</span>
            </p>
            <p className="mt-5 text-background/70 max-w-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.25em] text-background/50 mb-5">{t("footer.wander")}</p>
            <ul className="space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-background/80 hover:text-primary transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.25em] text-background/50 mb-5">{t("footer.hello")}</p>
            <p className="text-background/70 mb-5 leading-relaxed">
              {t("footer.news")}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 border-b border-background/30 pb-3"
            >
              <input
                type="email"
                placeholder={t("footer.placeholder")}
                className="flex-1 bg-transparent text-background placeholder:text-background/40 outline-none text-sm"
              />
              <button type="submit" className="text-primary hover:opacity-70 transition-opacity text-sm">
                {t("footer.send")}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-5 text-background/70">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a href="mailto:hello@peek.studio" className="hover:text-primary transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/50">
          <p>© {new Date().getFullYear()} Peek Studio. {t("footer.rights")}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-primary transition-colors">{t("footer.terms")}</a>
            <a href="#" className="hover:text-primary transition-colors">{t("footer.shipping")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}