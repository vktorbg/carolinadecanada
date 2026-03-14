import React from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';

const FLAG_CA = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f1e8-1f1e6.svg';
const FLAG_MX = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f1f2-1f1fd.svg';

const LanguageToggle = () => {
  const { language, changeLanguage } = useI18next();

  const isEn = language === 'en';
  const currentFlag = isEn ? FLAG_CA : FLAG_MX;
  const otherFlag = isEn ? FLAG_MX : FLAG_CA;

  return (
    <button
      onClick={() => changeLanguage(isEn ? 'es' : 'en')}
      aria-label={isEn ? 'Cambiar a Español' : 'Switch to English'}
      className="group relative w-6 h-6 active:scale-95 transition-transform duration-150"
    >
      <img
        src={currentFlag}
        alt={isEn ? 'English' : 'Español'}
        className="absolute inset-0 w-6 h-6 transition-opacity duration-200 group-hover:opacity-0"
      />
      <img
        src={otherFlag}
        alt={isEn ? 'Español' : 'English'}
        className="absolute inset-0 w-6 h-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <span className="pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-brand-charcoal/50 font-light italic opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isEn ? 'en español' : 'in english'}
      </span>
    </button>
  );
};

export default LanguageToggle;
