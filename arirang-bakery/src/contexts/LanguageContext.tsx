import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Lang } from "../data/translations";
import { t as tFn } from "../data/translations";

interface LanguageContextType {
  lang: Lang;
  dir: "rtl" | "ltr";
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar", dir: "rtl", toggleLang: () => {}, t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem("arirang-lang") as Lang) ?? "ar";
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem("arirang-lang", lang);
  }, [lang, dir]);

  const toggleLang = () => setLang(prev => prev === "ar" ? "en" : "ar");
  const t = (key: string) => tFn(key, lang);

  return (
    <LanguageContext.Provider value={{ lang, dir, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
