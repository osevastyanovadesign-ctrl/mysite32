import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Image } from "@/components/ui/image";
import { useLang } from "./LanguageContext";

// One product card. On hover the print "tilts its head" toward the cursor.
export default function ProductCard({ product, onOpen }) {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const rx = useMotionValue(0.5);
  const ry = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(ry, [0, 1], [8, -8]), { stiffness: 120, damping: 14 });
  const rotateY = useSpring(useTransform(rx, [0, 1], [-10, 10]), { stiffness: 120, damping: 14 });

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
    <motion.button
      type="button"
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={() => onOpen(product)}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group text-left block w-full"
    >
      <div className="relative overflow-hidden squircle bg-secondary/40 leading-[0]">
        <Image
          src={product.image}
          alt={`${product.animal[lang]} mug — ${product.name[lang]}`}
          className="block w-full aspect-[3/4] object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          fittingType="fill"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute bottom-5 left-5 right-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-primary-foreground font-display text-xl italic">
          {t("card.seeGaze")} →
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl text-foreground leading-tight">{product.name[lang]}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{product.animal[lang]}</p>
        </div>
        <p className="font-display text-xl text-primary">${product.price}</p>
      </div>
    </motion.button>
  );
}
