import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout/Layout';
import { motion } from 'framer-motion';
import NewsletterSection from '../components/Home/NewsletterSection';
import { ChefHat, Globe, Heart, Quote, Star, Sparkles } from 'lucide-react';

const AboutPage = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <Layout minimal={true} noTopPadding={true}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-brand-cream overflow-hidden"
      >
        {/* --- HERO SECTION --- */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-brand-terracotta rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[20%] right-[5%] w-96 h-96 bg-brand-sage rounded-full blur-[150px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <motion.div variants={itemVariants} className="lg:w-3/5 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-terracotta/10 border border-brand-terracotta/20 mb-6">
                  <Sparkles size={16} className="text-brand-terracotta" />
                  <span className="text-sm font-semibold tracking-wider uppercase text-brand-terracotta">
                    {t('nav.about')}
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl xl:text-8xl font-display font-bold text-brand-charcoal mb-6 leading-[1.1]">
                  {t('about.title')}
                </h1>
                <p className="text-2xl md:text-3xl font-serif text-brand-terracotta italic mb-10 leading-relaxed lg:max-w-xl">
                  {t('about.subtitle')}
                </p>
                <div className="prose prose-xl text-neutral-600 leading-relaxed font-sans mb-12">
                  <p>{t('about.intro')}</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="lg:w-2/5 relative"
              >
                <motion.div
                  variants={floatVariants}
                  animate="animate"
                  className="relative z-10"
                >
                  <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-all duration-700 aspect-[3/4] group">
                    <img
                      src="/images/profile.jpeg"
                      alt="Carolina"
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 border border-brand-earth/10">
                    <div className="w-12 h-12 bg-brand-sage/20 rounded-2xl flex items-center justify-center text-brand-sage">
                      <ChefHat size={28} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-brand-charcoal leading-none">Canadian Soul</p>
                      <p className="text-xs text-neutral-400 mt-1">Bilingual Flavors</p>
                    </div>
                  </div>
                </motion.div>
                {/* Decorative blob */}
                <svg className="absolute -top-12 -left-12 w-32 h-32 text-brand-earth/20 -z-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M45.7,-67.2C59.1,-61.1,70.2,-48.9,76.5,-34.8C82.7,-20.7,84.1,-4.7,80.1,10.2C76.1,25.1,66.6,38.8,55.1,49.5C43.6,60.2,30.1,67.9,15.1,71.4C0.2,74.9,-16.2,74.2,-31.2,68.4C-46.2,62.6,-59.8,51.7,-68.8,38.2C-77.8,24.7,-82.2,8.6,-79.8,-6.4C-77.4,-21.4,-68.1,-35.3,-56.4,-42.6C-44.7,-49.9,-30.5,-50.5,-17.8,-57.4C-5.1,-64.3,6.2,-77.4,20.8,-79C35.3,-80.6,45.7,-67.2,45.7,-67.2Z" transform="translate(100 100)" />
                </svg>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- STORY SECTION --- */}
        <section className="bg-white py-32 rounded-t-[5rem] lg:rounded-t-[8rem] shadow-[0_-30px_60px_rgba(0,0,0,0.03)] relative">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              <motion.div variants={itemVariants} className="lg:col-span-5 space-y-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-charcoal mb-6">
                    {t('about.story_title')}
                  </h2>
                  <div className="w-16 h-1 bg-brand-terracotta mb-8"></div>
                  <div className="relative">
                    <Quote className="absolute -top-8 -left-8 w-16 h-16 text-brand-earth/10 -z-10" />
                    <p className="text-xl md:text-2xl text-neutral-600 leading-[1.8] font-serif italic italic-text">
                      {t('about.story_text')}
                    </p>
                    <div className="mt-8">
                      <span className="font-accent-script text-5xl text-brand-terracotta">Carolina</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="lg:col-span-7 grid md:grid-cols-2 gap-8">
                <div className="group p-10 rounded-[3rem] bg-brand-cream border border-brand-earth/5 hover:border-brand-terracotta/20 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-terracotta/10">
                  <div className="w-14 h-14 bg-brand-terracotta/10 rounded-2xl flex items-center justify-center text-brand-terracotta mb-8 group-hover:bg-brand-terracotta group-hover:text-white transition-colors duration-500">
                    <Globe size={28} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-brand-charcoal mb-4">{t('about.mission_title')}</h3>
                  <p className="text-neutral-500 leading-relaxed text-lg">{t('about.mission_text')}</p>
                </div>

                <div className="group p-10 rounded-[3rem] bg-brand-cream border border-brand-earth/5 hover:border-brand-terracotta/20 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-terracotta/10 md:mt-12">
                  <div className="w-14 h-14 bg-brand-sage/10 rounded-2xl flex items-center justify-center text-brand-sage mb-8 group-hover:bg-brand-sage group-hover:text-white transition-colors duration-500">
                    <Heart size={28} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-brand-charcoal mb-4">{t('about.unique_title')}</h3>
                  <p className="text-neutral-500 leading-relaxed text-lg">{t('about.unique_text')}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- FUN FACTS SECTION --- */}
        <section className="py-32 bg-brand-cream/80 relative overflow-hidden">
          {/* Decorative grain/noise pattern would go here via CSS */}
          <div className="container mx-auto px-4 relative z-10">
            <motion.div variants={itemVariants} className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-charcoal mb-4">
                {t('about.fun_facts_title')}
              </h2>
              <div className="w-24 h-1 bg-brand-earth/30 mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              {[1, 2, 3].map((num) => (
                <motion.div
                  key={num}
                  variants={itemVariants}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-brand-charcoal/5 border border-brand-earth/5 text-center relative overflow-hidden group"
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-earth/5 rounded-full transition-transform duration-700 group-hover:scale-150"></div>

                  <div className="w-20 h-20 bg-brand-sage/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-brand-sage group-hover:bg-brand-sage group-hover:text-white transition-all duration-500">
                    {num === 1 && <Star size={32} />}
                    {num === 2 && <Globe size={32} />}
                    {num === 3 && <Sparkles size={32} />}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-brand-charcoal mb-4">
                    {t(`about.fun_fact_${num}_title`)}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed text-lg">
                    {t(`about.fun_fact_${num}_desc`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- QUOTE SECTION --- */}
        <section className="py-40 bg-brand-charcoal text-white overflow-hidden relative">
          {/* Animated decorative circles */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-terracotta rounded-full -mr-64 -mt-64 blur-[100px] pointer-events-none"
          ></motion.div>
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-sage rounded-full -ml-64 -mb-64 blur-[100px] pointer-events-none"
          ></motion.div>

          <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
            <motion.div variants={itemVariants}>
              <Quote className="w-16 h-16 text-brand-terracotta mx-auto mb-10 opacity-50" />
              <p className="text-4xl md:text-6xl lg:text-7xl font-display italic font-medium leading-[1.2] mb-12">
                {t('about.quote')}
              </p>
              <div className="flex items-center justify-center gap-6 mb-12">
                <div className="h-px w-12 bg-white/20"></div>
                <p className="font-accent-script text-5xl text-brand-earth">Carolina</p>
                <div className="h-px w-12 bg-white/20"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- NEWSLETTER SECTION --- */}
        <div className="relative z-10">
          <NewsletterSection />
        </div>
      </motion.div>
    </Layout>
  );
};

export default AboutPage;

export const Head = () => {
  return (
    <>
      <title>Conoce a Carolina | Carolina de Canadá</title>
      <meta
        name="description"
        content="Descubre la historia detrás de Carolina de Canadá, su pasión por la repostería canadiense y su misión de unir culturas a través de la cocina."
      />
    </>
  );
};

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
