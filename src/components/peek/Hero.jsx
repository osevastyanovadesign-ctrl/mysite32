```jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Image } from "@/components/ui/image";
import { HERO_MUG } from "@/data/products";
import { useLang } from "./LanguageContext";

// The Encounter — a calm, editorial hero.
// Full-width 4:3 image with the headline layered over the photograph.
export default function Hero() {
  const { t } = useLang();

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden bg-background"
    >
      {/* Full-width editorial photograph */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full aspect-[4/3]"
      >
        <Image
          src={HERO_MUG}
          alt="A white Peek ceramic mug with the Eva dachshund print"
          className="absolute inset-0 w-full h-full object-cover squircle-lg shadow-2xl shadow-primary/10"
          fittingType="fill"
        />

        {/* Headline over the photograph */}
        <div className="absolute inset-0 flex items-center">
          <div className="ml-auto w-full md:w-[48%] lg:w-[42%] px-6 md:px-10 lg:px-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm uppercase tracking-[0.3em] text-primary mb-6"
            >
              {t("hero.eyebrow")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-display text-[2.5rem] sm:text-5xl md:text-6xl leading-[1.05] text-foreground text-balance"
            >
              {t("hero.line1")}{" "}
              <span className="italic text-primary">
                {t("hero.accent")}
              </span>{" "}
              {t("hero.line2")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              className="mt-8 max-w-md text-muted-foreground text-lg leading-relaxed"
            >
              {t("hero.sub")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.95 }}
              className="mt-10"
            >
              <a
                href="#chapter-prints"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-primary-foreground font-medium hover:opacity-90 transition-opacity duration-300"
              >
                {t("hero.cta")}
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs uppercase tracking-[0.25em]">
          {t("hero.scroll")}
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
```
