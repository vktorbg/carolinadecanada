import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden bg-brand-cream pb-12">
      {/* Editorial Grid Lines - Subtler */}
      <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none">
        <div className="absolute left-1/3 top-0 bottom-0 border-l border-brand-charcoal h-full" />
        <div className="absolute left-2/3 top-0 bottom-0 border-l border-brand-charcoal h-full" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-48 md:pt-60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Content (span 6) */}
          <div className="lg:col-span-6 text-left max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-display font-medium text-brand-charcoal mb-10 leading-[0.9] tracking-tighter">
                {t('home.hero.title')}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <p className="text-xl md:text-2xl text-neutral-500 mb-12 font-light leading-relaxed max-w-md">
                {t('home.hero.subtitle')}
              </p>

              {/* Decorative script accent */}
              <div className="absolute -top-8 -left-4 text-brand-terracotta/20 font-accent-script text-6xl select-none">
                Bilingual
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link
                to="/recipes"
                className="group relative px-10 py-4 bg-brand-charcoal text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:bg-brand-terracotta hover:scale-105 hover:shadow-2xl active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('home.hero.cta')} <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/about"
                className="group px-10 py-4 border-2 border-brand-charcoal/10 text-brand-charcoal text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:border-brand-charcoal transition-all duration-300 hover:bg-white active:scale-95"
              >
                Sobre Mí
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Featured Image (span 6) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-6 relative flex justify-end"
          >
            <div className="relative z-10 w-full max-w-[480px] aspect-[4/5] overflow-hidden rounded-[60px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border-[16px] border-white">
              <img
                src="/images/hero_pancakes.png"
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
              className="absolute -top-12 -right-6 w-28 h-28 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white z-20 overflow-hidden"
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

      {/* Scroll Down Hint - Subtler */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-8 left-12 flex items-center gap-4 text-brand-terracotta/30 hidden lg:flex"
      >
        <div className="h-px w-12 bg-current" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
