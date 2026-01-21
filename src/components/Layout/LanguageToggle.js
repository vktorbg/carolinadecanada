import React from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';

const LanguageToggle = () => {
  const { language, changeLanguage } = useI18next();

  return (
    <div className="relative flex items-center bg-white border border-neutral-200 rounded-full p-1 h-9 w-[90px] shadow-sm">
      {/* Sliding background */}
      <div
        className={`absolute h-7 w-10 bg-brand-terracotta rounded-full transition-all duration-300 ease-in-out ${language === 'es' ? 'left-[46px]' : 'left-1'
          }`}
      />

      <button
        onClick={() => changeLanguage('en')}
        className={`relative z-10 w-10 text-[10px] font-bold tracking-widest transition-colors duration-300 ${language === 'en' ? 'text-white' : 'text-neutral-400'
          }`}
        aria-label="Switch to English"
      >
        EN
      </button>

      <button
        onClick={() => changeLanguage('es')}
        className={`relative z-10 w-10 text-[10px] font-bold tracking-widest transition-colors duration-300 ${language === 'es' ? 'text-white' : 'text-neutral-400'
          }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
};

export default LanguageToggle;
