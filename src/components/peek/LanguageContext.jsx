import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { translations, LANGUAGES, DEFAULT_LANG } from "@/data/i18n";

const LanguageContext = createContext(null);
const STORAGE_KEY = "peek-lang";

function detectInitial() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch {}
  const nav = (navigator.language || "").slice(0, 2).toLowerCase();
  if (translations[nav]) return nav;
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(() => {
    const dict = translations[lang] || translations[DEFAULT_LANG];
    // Nested key lookup: t("nav.collection"), t("hero.sub"), etc.
    return (key) => {
      const parts = key.split(".");
      let val = dict;
      for (const p of parts) {
        val = val?.[p];
        if (val === undefined) {
          val = translations[DEFAULT_LANG];
          for (const p2 of parts) val = val?.[p2];
          break;
        }
      }
      return val;
    };
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t, languages: LANGUAGES }),
    [lang, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}