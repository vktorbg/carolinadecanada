import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { motion } from 'framer-motion';
import RecipeCard from '../Recipe/RecipeCard';

const FeaturedRecipes = () => {
  const { t } = useTranslation();

  // This query will be used once Contentful is set up
  // For now, we'll show a placeholder structure
  const data = useStaticQuery(graphql`
    query FeaturedRecipesQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  // Placeholder data - will be replaced with real Contentful data
  const featuredRecipes = [
    {
      slug: 'brownies-de-brooke',
      title: t('home.featured.brownies.title'),
      description: t('home.featured.brownies.desc'),
      featuredImage: '/images/brownies.png',
      difficulty: 'Easy',
      totalTime: 45,
      servings: 12,
      category: { name: 'Desserts' }
    },
    {
      slug: 'arroz-con-leche',
      title: t('home.featured.arroz.title'),
      description: t('home.featured.arroz.desc'),
      featuredImage: '/images/arroz-con-leche.png',
      difficulty: 'Easy',
      totalTime: 60,
      servings: 6,
      category: { name: 'Desserts' }
    },
    {
      slug: 'pan-artesanal',
      title: t('home.featured.bread.title'),
      description: t('home.featured.bread.desc'),
      featuredImage: '/images/canadian-bread.png',
      difficulty: 'Medium',
      totalTime: 180,
      servings: 1,
      category: { name: 'Breads' }
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left mb-16 relative"
        >
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-brand-terracotta/20 hidden md:block" />
          <span className="text-brand-terracotta font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
            Selección Especial
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-brand-charcoal max-w-2xl">
            {t('home.featured.title')}
          </h2>
        </motion.div>

        {featuredRecipes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {featuredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <RecipeCard recipe={recipe} />
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/recipes"
                className="inline-block px-8 py-3 bg-brand-terracotta text-white font-semibold rounded-lg hover:bg-brand-earth transition-all duration-300 hover:shadow-lg"
              >
                {t('home.featured.viewAll')}
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-lg">
              Featured recipes will appear here once you add recipes to Contentful.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedRecipes;
