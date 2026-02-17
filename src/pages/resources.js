import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout/Layout';
import { motion } from 'framer-motion';
import { BookOpen, Utensils, Clock, Heart } from 'lucide-react';

const ResourcesPage = () => {
  const { t } = useTranslation();

  const resources = [
    {
      icon: BookOpen,
      title: 'Cooking Tips',
      description: 'Essential techniques and tips for better baking and cooking results',
    },
    {
      icon: Utensils,
      title: 'Kitchen Tools',
      description: 'Recommended tools and equipment for your kitchen',
    },
    {
      icon: Clock,
      title: 'Meal Planning',
      description: 'Tips for planning and preparing meals ahead of time',
    },
    {
      icon: Heart,
      title: 'Ingredient Guide',
      description: 'Learn about key ingredients used in Canadian cuisine',
    },
  ];

  return (
    <Layout minimal={true}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-charcoal mb-4">
            {t('nav.resources')}
          </h1>
          <p className="text-lg text-neutral-600 mb-12">
            Helpful guides and information to enhance your cooking journey
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white rounded-xl shadow-card p-8 opacity-50 grayscale pointer-events-none select-none"
              >
                <div className="w-14 h-14 bg-brand-terracotta/10 rounded-lg flex items-center justify-center mb-4">
                  <resource.icon size={28} className="text-brand-terracotta" />
                </div>
                <h3 className="text-xl font-display font-semibold text-brand-charcoal mb-3">
                  {resource.title}
                </h3>
                <p className="text-neutral-600">
                  {resource.description}
                </p>
                <span className="absolute top-4 right-4 text-xs font-semibold uppercase tracking-widest text-neutral-400 border border-neutral-200 rounded-full px-3 py-1">
                  Soon
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ResourcesPage;

export const Head = () => {
  return (
    <>
      <title>Resources | Carolina de Canadá</title>
      <meta
        name="description"
        content="Cooking tips, kitchen tools, and helpful guides for better baking"
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
