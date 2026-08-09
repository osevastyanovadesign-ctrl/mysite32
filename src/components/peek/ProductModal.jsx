import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Eye } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useCart } from "./CartContext";
import { useLang } from "./LanguageContext";
import { MASCOT_DACHSHUND } from "@/data/products";

export default function ProductModal({ product, onClose }) {
  const { add } = useCart();
  const { t, lang } = useLang();
  const [zoom, setZoom] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end md:items-center justify-center p-0 md:p-6"
        >
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-5xl bg-background rounded-t-[2rem] md:rounded-[2.5rem] overflow-hidden grid md:grid-cols-2 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:text-primary transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* Image portrait — 70vh */}
            <div className="relative h-[40vh] md:h-[70vh] overflow-hidden bg-secondary/40">
              <Image
                src={product.image}
                alt={`${product.animal[lang]} mug`}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  zoom ? "scale-[1.8]" : "scale-100"
                }`}
                fittingType="fill"
              />
              <button
                onClick={() => setZoom((z) => !z)}
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/85 backdrop-blur px-4 py-2 text-sm text-foreground hover:text-primary transition-colors"
              >
                <Eye className="w-4 h-4" strokeWidth={1.5} />
                {zoom ? t("modal.pullBack") : t("modal.seeGaze")}
              </button>
            </div>

            {/* Detail — title vertically aligned left */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-sm uppercase tracking-[0.25em] text-primary mb-3">{product.animal[lang]}</p>
              <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-foreground">
                {product.name[lang]}
              </h2>
              <p className="mt-4 font-display text-3xl text-primary">${product.price}</p>

              <div className="mt-8 border-l-2 border-secondary pl-5">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {t("modal.soul")}
                </p>
                <p className="text-muted-foreground leading-relaxed italic font-display text-xl">
                  {product.narrative[lang]}
                </p>
              </div>

              <button
                onClick={() => {
                  add(product);
                  onClose();
                }}
                className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" strokeWidth={2} />
                {t("modal.add")}
              </button>

              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                <img src={MASCOT_DACHSHUND} alt="" className="w-8 h-8 object-contain" />
                <span>{t("modal.note")}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}