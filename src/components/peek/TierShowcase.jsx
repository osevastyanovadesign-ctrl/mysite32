import React, { useState } from "react";
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

  const ref = React.useRef(null);
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

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    rx.set((e.clientX - rect.left) / rect.width);
    ry.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    rx.set(0.5);
    ry.set(0.5);
  };

  return (
    <Reveal>
      <div className="relative">

        {/* Large editorial image */}
        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={reset}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 900,
          }}
          className="group relative w-full overflow-hidden squircle-lg bg-secondary/40 shadow-xl shadow-primary/5"
        >
          <Image
            src={tier.image}
            alt={tier.alt[lang]}
            className="w-full aspect-[4/3] object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            fittingType="fill"
          />
        </motion.div>

        {/* Vertical order card */}
        <div className="relative z-10 -mt-24 ml-auto mr-6 md:-mt-40 md:mr-10 w-[82%] sm:w-[62%] md:w-[38%] lg:w-[32%] aspect-[3/4] bg-background p-6 md:p-8 shadow-2xl">

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
