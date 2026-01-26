import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout/Layout';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <Layout minimal={true}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-charcoal mb-8 text-center">
            {t('about.title')}
          </h1>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <img
                  src="/images/profile.jpeg"
                  alt="Carolina"
                  className="w-full h-full object-cover min-h-[300px]"
                />
              </div>
              <div className="md:w-2/3 p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <h2 className="font-display text-brand-terracotta mt-0">
                    {t('about.welcome')}
                  </h2>

                  <p className="text-neutral-600 leading-relaxed italic">
                    {t('about.intro')}
                  </p>

                  <h3 className="font-display text-brand-charcoal">
                    {t('about.mission_title')}
                  </h3>

                  <p className="text-neutral-600 leading-relaxed">
                    {t('about.mission_text')}
                  </p>

                  <h3 className="font-display text-brand-charcoal">
                    {t('about.unique_title')}
                  </h3>

                  <p className="text-neutral-600 leading-relaxed">
                    {t('about.unique_text')}
                  </p>

                  <div className="bg-brand-cream/50 p-6 rounded-2xl mt-8 border border-brand-terracotta/10">
                    <p className="text-brand-charcoal font-medium text-center italic mb-0">
                      "{t('about.quote')}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AboutPage;

export const Head = () => {
  return (
    <>
      <title>About | Carolina de Canadá</title>
      <meta
        name="description"
        content="Learn about Carolina and her passion for sharing Canadian recipes with the world"
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
