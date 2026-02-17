import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout/Layout';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

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
        <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-brand-terracotta rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[20%] right-[5%] w-96 h-96 bg-brand-sage rounded-full blur-[150px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
              <motion.div variants={itemVariants} className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-display font-bold text-brand-charcoal mb-3 leading-[1.1]">
                  {t('about.title')}
                </h1>
                <p className="text-lg md:text-xl font-serif text-brand-terracotta italic mb-5 leading-relaxed">
                  {t('about.subtitle')}
                </p>
                <div className="prose prose-base md:prose-lg text-neutral-600 leading-relaxed font-sans">
                  <p>{t('about.intro')}</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="lg:w-1/2 flex justify-center"
              >
                <motion.div
                  variants={floatVariants}
                  animate="animate"
                  className="relative z-10 p-4"
                >
                  <div className="shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-all duration-700 group rounded-[2rem] w-[220px] h-[270px] sm:w-[260px] sm:h-[320px] lg:w-[300px] lg:h-[370px]">
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden">
                      <img
                        src="/images/profile.jpeg"
                        alt="Carolina"
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- STORY SECTION --- */}
        <section className="bg-white py-16 rounded-t-[3rem] lg:rounded-t-[5rem] shadow-[0_-30px_60px_rgba(0,0,0,0.03)] relative">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <motion.div variants={itemVariants} className="lg:col-span-5 space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal mb-4">
                    {t('about.story_title')}
                  </h2>
                  <div className="w-12 h-1 bg-brand-terracotta mb-6"></div>
                  <div className="relative">
                    <Quote className="absolute -top-6 -left-6 w-12 h-12 text-brand-earth/10 -z-10" />
                    <p className="text-lg md:text-xl text-neutral-600 leading-[1.8] font-serif italic italic-text">
                      {t('about.story_text')}
                    </p>
                    <div className="mt-6">
                      <span className="font-accent-script text-4xl text-brand-terracotta">Carolina</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="lg:col-span-7 grid md:grid-cols-2 gap-6">
                <div className="group p-7 rounded-[2rem] bg-brand-cream border border-brand-earth/5 hover:border-brand-terracotta/20 transition-all duration-500 hover:shadow-xl hover:shadow-brand-terracotta/10">
                  <h3 className="text-xl font-display font-bold text-brand-charcoal mb-3">{t('about.mission_title')}</h3>
                  <p className="text-neutral-500 leading-relaxed text-base">{t('about.mission_text')}</p>
                </div>

                <div className="group p-7 rounded-[2rem] bg-brand-cream border border-brand-earth/5 hover:border-brand-terracotta/20 transition-all duration-500 hover:shadow-xl hover:shadow-brand-terracotta/10 md:mt-8">
                  <h3 className="text-xl font-display font-bold text-brand-charcoal mb-3">{t('about.unique_title')}</h3>
                  <p className="text-neutral-500 leading-relaxed text-base">{t('about.unique_text')}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- FUN FACTS SECTION --- */}
        <section className="py-16 bg-brand-cream/80 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div variants={itemVariants} className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal mb-3">
                {t('about.fun_facts_title')}
              </h2>
              <div className="w-16 h-1 bg-brand-earth/30 mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((num) => (
                <motion.div
                  key={num}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white p-8 rounded-[2rem] shadow-lg shadow-brand-charcoal/5 border border-brand-earth/5 text-center relative overflow-hidden group"
                >
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-brand-earth/5 rounded-full transition-transform duration-700 group-hover:scale-150"></div>

                  <h3 className="text-xl font-display font-bold text-brand-charcoal mb-3">
                    {t(`about.fun_fact_${num}_title`)}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed text-base">
                    {t(`about.fun_fact_${num}_desc`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- QUOTE SECTION --- */}
        <section className="py-20 bg-brand-charcoal text-white overflow-hidden relative">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-terracotta rounded-full -mr-48 -mt-48 blur-[100px] pointer-events-none"
          ></motion.div>
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-sage rounded-full -ml-48 -mb-48 blur-[100px] pointer-events-none"
          ></motion.div>

          <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
            <motion.div variants={itemVariants}>
              <Quote className="w-10 h-10 text-brand-terracotta mx-auto mb-6 opacity-50" />
              <p className="text-3xl md:text-4xl lg:text-5xl font-display italic font-medium leading-[1.2] mb-8">
                {t('about.quote')}
              </p>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-10 bg-white/20"></div>
                <p className="font-accent-script text-4xl text-brand-earth">Carolina</p>
                <div className="h-px w-10 bg-white/20"></div>
              </div>
            </motion.div>
          </div>
        </section>

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
