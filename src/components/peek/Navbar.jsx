import React, { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import { useLang } from "./LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { count, setOpen } = useCart();
  const { t } = useLang();

  const LINKS = [
    { label: t("nav.prints"), href: "#chapter-prints" },
    { label: t("nav.portrait"), href: "#chapter-portrait" },
    { label: t("nav.mixed"), href: "#chapter-mixed" },
    { label: t("nav.philosophy"), href: "#philosophy" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="font-display text-3xl tracking-tight text-foreground">
          Peek<span className="text-primary">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-10 text-sm">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <LanguageSwitcher />
          <button
            onClick={() => setOpen(true)}
            className="relative flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors duration-300"
            aria-label={t("nav.cart")}
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            <span className="hidden sm:inline">{t("nav.cart")}</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[11px] font-medium flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}