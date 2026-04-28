"use client";

import { useEffect } from "react";

const STORAGE_KEY = "gfazioli-lang-pref";

export function LanguageDetector() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname !== "/") return;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en") return;
    if (stored === "it") {
      window.location.replace("/it/");
      return;
    }

    const browserLang = (navigator.language || "en").toLowerCase();
    if (browserLang.startsWith("it")) {
      window.localStorage.setItem(STORAGE_KEY, "it");
      window.location.replace("/it/");
    } else {
      window.localStorage.setItem(STORAGE_KEY, "en");
    }
  }, []);

  return null;
}
