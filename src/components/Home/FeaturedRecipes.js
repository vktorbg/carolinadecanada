import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import { motion } from 'framer-motion';
import RecipeCard from '../Recipe/RecipeCard';

const FeaturedRecipes = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const data = useStaticQuery(graphql`
    query FeaturedRecipesQuery {
      allContentfulRecipe(limit: 3, sort: { createdAt: DESC }) {
        nodes {
          slug
          title
          description {
            raw
          }
          difficulty
          totalTime
          servings
          node_locale
          featuredImage {
            gatsbyImageData(placeholder: BLURRED, width: 600)
          }
          category {
            name
          }
        }
      }
    }
  `);

  // Filter recipes by current language
  const featuredRecipes = (data?.allContentfulRecipe?.nodes || [])
    .filter(node => {
      const nodeLang = node.node_locale ? node.node_locale.split('-')[0] : '';
      return nodeLang === currentLang;
    });

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
            {t('home.featured.badge')}
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
