import React, { createContext, useContext, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAvailableLangs } from './i18n';

export type Lang = string;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  availableLangs: string[];
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  setLang: () => {},
  availableLangs: ['fr'],
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const availableLangs = useMemo(() => getAvailableLangs(), []);

  const lang = useMemo(() => {
    const segment = location.pathname.split('/')[1];
    return availableLangs.includes(segment) && segment !== 'fr' ? segment : 'fr';
  }, [location.pathname, availableLangs]);

  const setLang = (l: Lang) => {
    navigate(l === 'fr' ? '/' : `/${l}`);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, availableLangs }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
