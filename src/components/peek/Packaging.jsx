import React from "react";
import { Image } from "@/components/ui/image";
import { PACKAGING_IMAGE } from "@/data/products";
import { useLang } from "./LanguageContext";
import Reveal from "./Reveal";

const STEPS = ["01", "02", "03"];

// The Keepsake — packaging philosophy.
export default function Packaging() {
  const { t } = useLang();
  const steps = t("packaging.steps");
  return (
    <section id="keepsake" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
        <Reveal className="md:col-span-5 order-2 md:order-1">
          <Image
            src={PACKAGING_IMAGE}
            alt="Raw kraft packaging with a die-cut hole, an animal peeking through"
            className="w-full aspect-[4/3] object-cover squircle-lg shadow-xl"
            fittingType="fill"
          />
        </Reveal>

        <div className="md:col-span-7 order-1 md:order-2">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-5">{t("packaging.eyebrow")}</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-foreground text-balance">
              {t("packaging.title")} <span className="italic text-primary">{t("packaging.accent")}</span> {t("packaging.tail")}
            </h2>
          </Reveal>

          <div className="mt-12 space-y-8">
            {STEPS.map((n, i) => (
              <Reveal key={n} delay={i * 0.1}>
                <div className="flex gap-6 border-t border-border pt-6">
                  <span className="font-display text-3xl text-primary/40 leading-none">{n}</span>
                  <div>
                    <h3 className="font-display text-2xl text-foreground">{steps[i].t}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{steps[i].b}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}