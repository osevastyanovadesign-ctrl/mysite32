import React from "react";
import { Image } from "@/components/ui/image";
import { BRAND, LIFESTYLE_IMAGE } from "@/data/products";
import { useLang } from "./LanguageContext";
import Reveal from "./Reveal";

// Brand identity — philosophy, mission, values, voice.
export default function BrandStory() {
  const { t, lang } = useLang();
  return (
    <section id="philosophy" className="py-28 md:py-40 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Philosophy */}
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <Reveal className="md:col-span-7">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-5">{t("story.philosophyEyebrow")}</p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.15] text-foreground text-balance">
              {t("story.philosophyTitle")} <span className="italic text-primary">{t("story.philosophyAccent")}</span> {t("story.philosophyTail")}
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
              {BRAND.philosophy[lang]}
            </p>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-5">
            <Image
              src={LIFESTYLE_IMAGE}
              alt="A quiet sunlit morning with a single mug and an open book"
              className="w-full aspect-[4/3] object-cover squircle-lg"
              fittingType="fill"
            />
          </Reveal>
        </div>

        {/* Mission */}
        <Reveal className="mt-24 md:mt-32 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-5">{t("story.missionEyebrow")}</p>
          <p className="font-display text-3xl md:text-4xl italic leading-snug text-foreground text-balance">
            {BRAND.mission[lang]}
          </p>
        </Reveal>

        {/* Values */}
        <div className="mt-24 md:mt-32 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {BRAND.values.map((v, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="border-t border-border pt-6">
                <span className="font-display text-5xl text-primary/30 leading-none">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-display text-2xl text-foreground">{v.title[lang]}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed text-[0.95rem]">
                  {v.body[lang]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
