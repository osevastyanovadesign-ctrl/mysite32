import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useCart } from "./CartContext";
import { useLang } from "./LanguageContext";
import { MASCOT_DACHSHUND } from "@/data/products";

export default function CartDrawer() {
  const { items, open, setOpen, remove, setQty, total, wagging } = useCart();
  const { t, lang } = useLang();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80]"
        >
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 h-full w-full max-w-md bg-background flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-border">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-primary">{t("cart.title")}</p>
                <h3 className="font-display text-3xl text-foreground mt-1">{t("cart.sub")}</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-7 py-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                  <img src={MASCOT_DACHSHUND} alt="" className="w-28 opacity-60" />
                  <p className="font-display text-2xl italic text-muted-foreground">
                    {t("cart.empty")}
                  </p>
                  <p className="text-sm text-muted-foreground">{t("cart.emptySub")}</p>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <Image
                        src={item.image}
                        alt={item.animal[lang]}
                        className="w-20 h-24 object-cover squircle bg-secondary/40 shrink-0"
                        fittingType="fill"
                      />
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="font-display text-xl text-foreground leading-tight">{item.name[lang]}</p>
                            <p className="text-xs text-muted-foreground">{item.animal[lang]}</p>
                          </div>
                          <p className="font-display text-lg text-primary">${item.price * item.qty}</p>
                        </div>
                        <div className="mt-auto flex items-center gap-3 pt-3">
                          <div className="flex items-center border border-border rounded-full">
                            <button
                              onClick={() => setQty(item.id, item.qty - 1)}
                              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm">{item.qty}</span>
                            <button
                              onClick={() => setQty(item.id, item.qty + 1)}
                              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary"
                              aria-label="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => remove(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors ml-auto"
                            aria-label="Remove"
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer with mascot curled up */}
            <div className="border-t border-border px-7 pt-5 pb-7">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t("cart.subtotal")}</span>
                <span className="font-display text-3xl text-foreground">${total}</span>
              </div>
              <button
                disabled={items.length === 0}
                className="w-full rounded-full bg-primary py-4 text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("cart.checkout")}
              </button>

              {/* Mascot curled up at the bottom, wagging when an item is added */}
              <div className="mt-6 flex items-end justify-between">
                <p className="text-xs text-muted-foreground max-w-[12rem] leading-relaxed">
                  {t("cart.note")}
                </p>
                <img
                  src={MASCOT_DACHSHUND}
                  alt="The Peek mascot keeping your order company"
                  className={`w-24 origin-bottom ${wagging ? "animate-wag" : ""}`}
                />
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}