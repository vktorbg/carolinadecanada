import React from 'react';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[60vh] lg:min-h-[62vh] flex items-center overflow-hidden bg-brand-cream pb-2">
      {/* Editorial Grid Lines - Subtler */}
      <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none">
        <div className="absolute left-1/3 top-0 bottom-0 border-l border-brand-charcoal h-full" />
        <div className="absolute left-2/3 top-0 bottom-0 border-l border-brand-charcoal h-full" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-32 md:pt-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Content (span 6) */}
          <div className="lg:col-span-6 text-left max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-medium text-brand-charcoal mb-5 leading-[0.9] tracking-tighter">
                {t('home.hero.title')}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <p className="text-lg md:text-xl text-neutral-500 mb-6 font-light leading-relaxed max-w-md">
                {t('home.hero.subtitle')}
              </p>

              {/* Decorative script accent */}
              <div className="absolute -top-6 -left-4 text-brand-terracotta/20 font-accent-script text-4xl select-none">
                Bilingual
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                to="/recipes"
                className="group relative px-8 py-3 bg-brand-charcoal text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:bg-brand-terracotta hover:scale-105 hover:shadow-2xl active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('home.hero.cta')} <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/about"
                className="group px-8 py-3 border-2 border-brand-charcoal/10 text-brand-charcoal text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:border-brand-charcoal transition-all duration-300 hover:bg-white active:scale-95"
              >
                {t('nav.about')}
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Featured Image (span 6) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-6 relative flex justify-end pt-6 lg:pt-10"
          >
            <div className="relative z-10 w-full max-w-[440px] aspect-[4/3] overflow-hidden rounded-[40px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border-[10px] border-white">
              <img
                src="/images/hero_pancakes.jpeg"
                alt="Canadian Culinary Delights"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Soft decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-terracotta/5 rounded-full blur-[100px] -z-10" />

            {/* Floating Badge - Canada Flag */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-8 -right-4 w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white z-20 overflow-hidden"
            >
              <img
                src="/images/canada_flag_icon.png"
                alt="Canada"
                className="w-full h-full object-cover scale-[1.1]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
