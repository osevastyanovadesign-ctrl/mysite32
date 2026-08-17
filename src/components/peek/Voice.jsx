import React from "react";
import { motion } from "framer-motion";
import { BRAND } from "@/data/products";
import mascotDog from "@/assets/peek-mascot-dog.webp";
import { useLang } from "./LanguageContext";
import Reveal from "./Reveal";

// Brand voice — the whispered invitation, with the dachshund muse.
export default function Voice() {
  const { t, lang } = useLang();
  return (
    <section id="voice" className="py-28 md:py-40 bg-secondary/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-5">{t("voice.eyebrow")}</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[1.1] text-foreground text-balance">
              {t("voice.title")} <span className="italic text-primary">{t("voice.accent")}</span>
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-lg">
              {BRAND.voice[lang]} {t("voice.body")}
            </p>
          </Reveal>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
            {BRAND.voiceLines.map((line, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <p className="font-display text-3xl md:text-4xl italic text-foreground">{line[lang]}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* The mascot — red dachshund muse */}
        <Reveal delay={0.2} className="md:col-span-5 flex justify-center md:justify-end">
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[70%] md:w-[85%]"
          >
            <img src={mascotDog} alt="The Peek mascot — a red dachshund" className="w-full h-auto" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-6 bg-primary/10 blur-2xl rounded-full" />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
