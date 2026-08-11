import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Check, Loader2 } from "lucide-react";
import { useLang } from "./LanguageContext";
import { base44 } from "@/api/base44Client";
import { TIERS } from "@/data/products";

// Commission order dialog for the Pet Portrait and Mixed Media series.
// Collects the owner's contact, the pet's name and a photo, then saves
// the request as a CommissionRequest record.
export default function CommissionDialog({ open, onClose, series }) {
  const { t } = useLang();
  const [form, setForm] = useState({
    name: "",
    email: "",
    petName: "",
    message: "",
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => e.key === "Escape" && onClose();

    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setError("");
      setForm({
        name: "",
        email: "",
        petName: "",
        message: "",
      });
      setPhoto(null);
      setPreview(null);
    }
  }, [open]);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setPhoto(f);
    setPreview(URL.createObjectURL(f));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setError(t("commission.required"));
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      let photoUrl = "";

      if (photo) {
        const up = await base44.integrations.Core.UploadFile({
          file: photo,
        });

        photoUrl = up.file_url || "";
      }

      await base44.entities.CommissionRequest.create({
        series,
        name: form.name.trim(),
        email: form.email.trim(),
        pet_name: form.petName.trim(),
        photo_url: photoUrl,
        message: form.message.trim(),
        status: "new",
      });

      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(t("commission.error"));
    }
  };

  const field =
    "w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary transition-colors";

  const tier = TIERS.find((item) => item.id === series);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end md:items-center justify-center p-0 md:p-6"
        >
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 w-full max-w-5xl md:h-[70vh] bg-background rounded-t-[2rem] md:rounded-[2.5rem] overflow-hidden grid md:grid-cols-2 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:text-primary transition-colors"
              aria-label={t("commission.close")}
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* Editorial image */}
            <div className="relative min-h-[40vh] md:min-h-[70vh] h-full overflow-hidden bg-secondary/40">
              <img
                src={tier?.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Commission form */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              {status === "done" ? (
                <div className="text-center py-10">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Check
                      className="w-8 h-8 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>

                  <p className="font-display text-3xl text-foreground mb-3">
                    {t("commission.done")}
                  </p>

                  <button
                    onClick={onClose}
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                  >
                    {t("commission.close")}
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
                    {t(`tiers.${series}.badge`)}
                  </p>

                  <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-foreground">
                    {t(`tiers.${series}.cta`)}
                  </h2>

                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {t("commission.subtitle")}
                  </p>

                  <form onSubmit={submit} className="mt-8 space-y-5">
                    <input
                      className={field}
                      placeholder={t("commission.name")}
                      value={form.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value,
                        })
                      }
                    />

                    <input
                      type="email"
                      className={field}
                      placeholder={t("commission.email")}
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                    />

                    <input
                      className={field}
                      placeholder={t("commission.petName")}
                      value={form.petName}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          petName: e.target.value,
                        })
                      }
                    />

                    <div>
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {t("commission.photo")}
                      </span>

                      <div className="mt-2 flex items-center gap-4">
                        <label className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground hover:border-primary hover:text-primary transition-colors">
                          <Upload
                            className="w-4 h-4"
                            strokeWidth={1.5}
                          />

                          <span>
                            {photo
                              ? photo.name
                              : t("commission.photoHint")}
                          </span>

                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onFile}
                          />
                        </label>

                        {preview && (
                          <img
                            src={preview}
                            alt=""
                            className="w-14 h-14 rounded-full object-cover"
                          />
                        )}
                      </div>
                    </div>

                    <textarea
                      className={field + " resize-none"}
                      rows={2}
                      placeholder={t("commission.message")}
                      value={form.message}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          message: e.target.value,
                        })
                      }
                    />

                    {error && (
                      <p className="text-sm text-destructive">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2
                            className="w-4 h-4 animate-spin"
                            strokeWidth={2}
                          />
                          {t("commission.sending")}
                        </>
                      ) : (
                        t("commission.send")
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
