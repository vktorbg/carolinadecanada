import React from 'react';
import { Link, useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useI18next();

  return (
    <section className="relative min-h-[60vh] lg:min-h-[62vh] flex items-center overflow-hidden bg-brand-cream pb-2">
      {/* Editorial Grid Lines - Subtler */}
      <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none">
        <div className="absolute left-1/3 top-0 bottom-0 border-l border-brand-charcoal h-full" />
        <div className="absolute left-2/3 top-0 bottom-0 border-l border-brand-charcoal h-full" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-24 md:pt-32 lg:pt-36 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

          {/* Left Column: Content */}
          <div className="lg:col-span-6 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-medium text-brand-charcoal mb-4 leading-[0.95] tracking-tighter">
                {t('home.hero.title')}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <p className="text-base md:text-xl text-neutral-500 mb-6 font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                {t('home.hero.subtitle')}
              </p>

              {/* Decorative script accent — hidden on mobile to avoid overlap */}
              <div className="hidden md:block absolute -top-6 -left-4 text-brand-terracotta/20 font-accent-script text-4xl select-none">
                Bilingual
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-3"
            >
              <Link
                to="/recipes"
                className="group relative px-7 py-3 bg-brand-charcoal text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:bg-brand-terracotta hover:scale-105 hover:shadow-2xl active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('home.hero.cta')} <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                </span>
              </Link>
              <button
                onClick={() => changeLanguage(language === 'en' ? 'es' : 'en')}
                className="group px-7 py-3 border-2 border-brand-charcoal/10 text-brand-charcoal text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:border-brand-terracotta hover:text-brand-terracotta transition-all duration-300 hover:bg-white active:scale-95 flex items-center gap-2"
              >
                <img
                  src={language === 'en'
                    ? 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f1f2-1f1fd.svg'
                    : 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f1e8-1f1e6.svg'
                  }
                  alt={language === 'en' ? 'México' : 'Canada'}
                  className="w-5 h-5 rounded-sm object-cover"
                />
                {t('home.hero.switchLang')}
              </button>
            </motion.div>
          </div>

          {/* Right Column: Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-6 relative flex justify-center lg:justify-end pt-4 lg:pt-10"
          >
            <div className="relative z-10 w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] aspect-[4/3] overflow-hidden rounded-[28px] lg:rounded-[40px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border-[8px] lg:border-[10px] border-white">
              <img
                src="/images/hero_pancakes.jpeg"
                alt="Canadian Culinary Delights"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Soft decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-terracotta/5 rounded-full blur-[100px] -z-10" />

          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
