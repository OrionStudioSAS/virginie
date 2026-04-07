import React, { createContext, useContext, useState } from 'react';

export type Lang = string;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  setLang: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return localStorage.getItem('lang') || 'fr';
    } catch {
      return 'fr';
    }
  });

  const setLang = (l: Lang) => {
    try {
      localStorage.setItem('lang', l);
    } catch {}
    setLangState(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
