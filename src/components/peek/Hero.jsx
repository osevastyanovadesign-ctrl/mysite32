import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Image } from "@/components/ui/image";
import { HERO_MUG } from "@/data/products";
import { useLang } from "./LanguageContext";

// Temporary Hero gallery.
// Replace these images later with the final editorial photographs.
const HERO_GALLERY = [
  HERO_MUG,
  HERO_MUG,
  HERO_MUG,
  HERO_MUG,
];

export default function Hero() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % HERO_GALLERY.length);
  };

  const prev = () => {
    setCurrent(
      (prev) => (prev - 1 + HERO_GALLERY.length) % HERO_GALLERY.length
    );
  };

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-background"
    >
      {/* Hero photograph */}
      <div className="relative w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src={HERO_MUG}
            alt="A white Peek ceramic mug with the Eva dachshund print"
            className="w-full aspect-[4/3] object-cover squircle-lg shadow-2xl shadow-primary/10"
            fittingType="fill"
          />
        </motion.div>

        {/* Small editorial card */}
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute right-40 inset-y-0 my-auto w-[320px] md:w-[400px] aspect-[3/4] text-left"
          >
            <div className="relative overflow-hidden squircle bg-background/95 backdrop-blur-sm aspect-[3/4] p-7 md:p-8 shadow-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
                PEEK
              </p>

              <h1 className="font-display text-3xl md:text-4xl leading-tight text-foreground">
                Objects{" "}
                <span className="italic text-primary">with a gaze</span>
              </h1>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A little story about the objects, animals and moments behind
                PEEK.
              </p>

              <div className="mt-6 text-sm font-medium text-foreground">
                Discover PEEK →
              </div>
            </div>
          </motion.button>

        {/* Expanded Hero gallery */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] flex items-end md:items-center justify-center p-0 md:p-6"
            >
              <div
                className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              />

              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10 w-full max-w-6xl h-[70vh] bg-background rounded-[2.5rem] overflow-hidden grid md:grid-cols-2 shadow-2xl"
              >
                {/* Close */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:text-primary transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>

                {/* Gallery image */}
                <div className="relative h-[40vh] md:h-full overflow-hidden bg-secondary/40">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={HERO_GALLERY[current]}
                        alt={`PEEK editorial image ${current + 1}`}
                        className="w-full h-full object-cover"
                        fittingType="fill"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Gallery controls */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={prev}
                      className="w-10 h-10 rounded-full bg-background/85 backdrop-blur flex items-center justify-center text-foreground hover:text-primary transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                    </button>

                    <span className="rounded-full bg-background/85 backdrop-blur px-4 py-2 text-xs tracking-[0.2em] text-foreground">
                      {String(current + 1).padStart(2, "0")} /{" "}
                      {String(HERO_GALLERY.length).padStart(2, "0")}
                    </span>

                    <button
                      type="button"
                      onClick={next}
                      className="w-10 h-10 rounded-full bg-background/85 backdrop-blur flex items-center justify-center text-foreground hover:text-primary transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                {/* Editorial text */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
                    PEEK
                  </p>

                  <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-foreground">
                    Objects{" "}
                    <span className="italic text-primary">with a gaze</span>
                  </h2>

                  <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
                    Designed to bring a little character into everyday life.
                  </p>

                  <div className="mt-8 border-l-2 border-secondary pl-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">
                      {String(current + 1).padStart(2, "0")}
                    </p>

                    <p className="font-display text-xl italic text-foreground">
                      Every object has a story.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
