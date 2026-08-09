import React, { useState } from "react";
import { PRODUCTS, TIERS } from "@/data/products";
import { useLang } from "./LanguageContext";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import TierShowcase from "./TierShowcase";
import ChapterHeader from "./ChapterHeader";
import Reveal from "./Reveal";

// The Collection — three numbered chapters.
// 01 Prints: ten ready hand-illustrated animal mugs (the grid).
// 02 Pet Portrait: a hand-drawn portrait of your own pet (commission).
// 03 Mixed Media: your pet in a mixed photography + painting technique (commission).
export default function Collection() {
  const { t } = useLang();
  const [active, setActive] = useState(null);

  return (
    <section id="collection" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-5">{t("collection.eyebrow")}</p>
          <h2 className="font-display text-5xl md:text-6xl leading-tight text-foreground text-balance">
            {t("collection.title")} <span className="italic text-primary">{t("collection.accent")}</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">{t("collection.intro")}</p>
        </Reveal>

        {/* Chapter 01 — Prints */}
        <div className="mt-20 md:mt-28">
          <ChapterHeader
            number="01"
            id="chapter-prints"
            badge={t("tiers.prints.badge")}
            name={t("tiers.prints.name")}
            desc={t("tiers.prints.desc")}
          />
          <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08}>
                <ProductCard product={p} onOpen={setActive} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Chapter 02 — Pet Portrait */}
        <div className="mt-28 md:mt-40">
          <ChapterHeader
            number="02"
            id="chapter-portrait"
            badge={t("tiers.portrait.badge")}
            name={t("tiers.portrait.name")}
            desc={t("tiers.portrait.desc")}
          />
          <div className="mt-12">
            <TierShowcase tier={TIERS[0]} />
          </div>
        </div>

        {/* Chapter 03 — Mixed Media */}
        <div className="mt-28 md:mt-40">
          <ChapterHeader
            number="03"
            id="chapter-mixed"
            badge={t("tiers.mixed.badge")}
            name={t("tiers.mixed.name")}
            desc={t("tiers.mixed.desc")}
          />
          <div className="mt-12">
            <TierShowcase tier={TIERS[1]} />
          </div>
        </div>
      </div>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}