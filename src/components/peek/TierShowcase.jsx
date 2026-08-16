import React, { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLang } from "./LanguageContext";
import Reveal from "./Reveal";
import CommissionDialog from "./CommissionDialog";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

// Showcase block for the two commission series (Pet Portrait, Mixed Media).
export default function TierShowcase({ tier }) {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);

  const specs = t(`tiers.${tier.id}.specs`);

  // Tilt animation for the order card.
  const cardRef = useRef(null);
  const rx = useMotionValue(0.5);
  const ry = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(ry, [0, 1], [8, -8]),
    { stiffness: 120, damping: 14 }
  );

  const rotateY = useSpring(
    useTransform(rx, [0, 1], [-10, 10]),
    { stiffness: 120, damping: 14 }
  );

  const handleCardMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    rx.set((e.clientX - rect.left) / rect.width);
    ry.set((e.clientY - rect.top) / rect.height);
  };

  const resetCard = () => {
    rx.set(0.5);
    ry.set(0.5);
  };

  return (
    <Reveal>
      <div className="relative">

        {/* Full-width editorial stage */}
<div className="relative w-screen ml-[calc(50%-50vw)] overflow-hidden aspect-[4/3]">

  {/* Large calm editorial photograph — blended into the page */}
  <div
    className="
      absolute
      top-0
      left-[4%]
      w-[92%]
      h-[92%]
      overflow-hidden
    "
    style={{
      maskImage: `
        linear-gradient(
          to bottom,
          transparent 0%,
          black 10%,
          black 76%,
          transparent 100%
        ),
        linear-gradient(
          to right,
          transparent 0%,
          black 8%,
          black 92%,
          transparent 100%
        )
      `,
      maskComposite: "intersect",
      WebkitMaskImage: `
        linear-gradient(
          to bottom,
          transparent 0%,
          black 10%,
          black 76%,
          transparent 100%
        ),
        linear-gradient(
          to right,
          transparent 0%,
          black 8%,
          black 92%,
          transparent 100%
        )
      `,
      WebkitMaskComposite: "source-in",
    }}
  >
    <Image
      src={tier.image}
      alt={tier.alt[lang]}
      className="w-full h-full object-cover"
      fittingType="fill"
    />
  </div>

  {/* Soft side edges — same visual language as Hero */}
  <div
    className="
      pointer-events-none
      absolute
      inset-0
    "
    style={{
      background: `
        linear-gradient(
          to right,
          hsl(var(--background)) 0%,
          transparent 9%,
          transparent 91%,
          hsl(var(--background)) 100%
        )
      `,
    }}
  />

          {/* Vertical order card */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleCardMove}
            onMouseLeave={resetCard}
            style={{
              rotateX,
              rotateY,
              transformPerspective: 900,
            }}
            className="
              group
              absolute
              z-10
              right-40
              inset-y-0
              my-auto
              w-[72%]
              sm:w-[48%]
              md:w-[34%]
              lg:w-[22%]
              aspect-[3/4]
              bg-background
              p-6
              md:p-8
              shadow-2xl
            "
          >
            <div className="flex h-full flex-col justify-between">

              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t(`tiers.${tier.id}.badge`)}
                </div>

                <h3 className="mt-4 text-2xl md:text-3xl font-medium tracking-tight">
                  {t(`tiers.${tier.id}.name`)}
                </h3>

                <div className="mt-6">
                  {Array.isArray(specs) && (
                    <ul className="space-y-4">
                      {specs.map((s, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="inline-flex w-fit items-center gap-2 text-sm text-primary group/cta"
              >
                <span className="border-b border-primary/40 pb-0.5">
                  {t(`tiers.${tier.id}.cta`)}
                </span>

                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1"
                  strokeWidth={1.5}
                />
              </button>

            </div>
          </motion.div>

        </div>

      </div>

      <CommissionDialog
        open={open}
        onClose={() => setOpen(false)}
        series={tier.id}
      />
    </Reveal>
  );
}
