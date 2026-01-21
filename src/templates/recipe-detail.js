import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout/Layout';
import RecipeSchema from '../components/SEO/RecipeSchema';
import { motion } from 'framer-motion';
import { Clock, Users, ChefHat, Printer, Share2 } from 'lucide-react';

const RecipeDetailTemplate = ({ data }) => {
  const { t } = useTranslation();

  // Once Contentful is connected, this will have real data
  // For now, showing the structure
  const recipe = data?.contentfulRecipe || {
    title: 'Recipe Title',
    description: 'Recipe description will appear here',
    featuredImage: null,
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    servings: 4,
    difficulty: 'Medium',
    category: { name: 'Category' },
    ingredients: { raw: '' },
    instructions: { raw: '' },
  };

  const image = recipe.featuredImage ? getImage(recipe.featuredImage) : null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <Layout>
      <RecipeSchema recipe={recipe} siteUrl="https://carolinadecanada.com" />

      <article className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category Badge */}
              {recipe.category && (
                <span className="inline-block px-4 py-1 bg-brand-terracotta/10 text-brand-terracotta text-sm font-semibold rounded-full mb-4">
                  {recipe.category.name}
                </span>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-charcoal mb-6">
                {recipe.title}
              </h1>

              {/* Description */}
              {recipe.description && (
                <p className="text-lg text-neutral-600 mb-8">
                  {recipe.description}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                {recipe.prepTime && (
                  <div className="flex items-center text-neutral-600">
                    <Clock size={20} className="mr-2 text-brand-terracotta" />
                    <div>
                      <div className="text-xs text-neutral-500">{t('recipe.prepTime')}</div>
                      <div className="font-semibold">{recipe.prepTime} {t('recipe.minutes')}</div>
                    </div>
                  </div>
                )}

                {recipe.cookTime && (
                  <div className="flex items-center text-neutral-600">
                    <Clock size={20} className="mr-2 text-brand-terracotta" />
                    <div>
                      <div className="text-xs text-neutral-500">{t('recipe.cookTime')}</div>
                      <div className="font-semibold">{recipe.cookTime} {t('recipe.minutes')}</div>
                    </div>
                  </div>
                )}

                {recipe.servings && (
                  <div className="flex items-center text-neutral-600">
                    <Users size={20} className="mr-2 text-brand-terracotta" />
                    <div>
                      <div className="text-xs text-neutral-500">{t('recipe.servings')}</div>
                      <div className="font-semibold">{recipe.servings}</div>
                    </div>
                  </div>
                )}

                {recipe.difficulty && (
                  <div className="flex items-center text-neutral-600">
                    <ChefHat size={20} className="mr-2 text-brand-terracotta" />
                    <div>
                      <div className="text-xs text-neutral-500">{t('recipe.difficulty')}</div>
                      <div className="font-semibold">{t(`recipe.${recipe.difficulty.toLowerCase()}`)}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handlePrint}
                  className="flex items-center px-4 py-2 bg-white border-2 border-brand-terracotta text-brand-terracotta font-medium rounded-lg hover:bg-brand-terracotta hover:text-white transition-all"
                >
                  <Printer size={18} className="mr-2" />
                  {t('recipe.print')}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center px-4 py-2 bg-white border-2 border-brand-sage text-brand-sage font-medium rounded-lg hover:bg-brand-sage hover:text-white transition-all"
                >
                  <Share2 size={18} className="mr-2" />
                  {t('recipe.share')}
                </button>
              </div>
            </motion.div>

            {/* Featured Image */}
            {image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12 rounded-2xl overflow-hidden shadow-lg"
              >
                <GatsbyImage
                  image={image}
                  alt={recipe.title}
                  className="w-full"
                />
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Ingredients */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-xl shadow-card p-6 sticky top-24">
                  <h2 className="text-2xl font-display font-bold text-brand-charcoal mb-6">
                    {t('recipe.ingredients')}
                  </h2>
                  <div className="text-neutral-600">
                    {/* Ingredients will be rendered from Contentful rich text */}
                    <p className="text-sm italic">
                      Ingredients will appear here once recipe is added to Contentful
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-2"
              >
                <h2 className="text-2xl font-display font-bold text-brand-charcoal mb-6">
                  {t('recipe.instructions')}
                </h2>
                <div className="prose prose-lg max-w-none">
                  {/* Instructions will be rendered from Contentful rich text */}
                  <p className="text-neutral-600 text-sm italic">
                    Instructions will appear here once recipe is added to Contentful
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Notes Section */}
            {recipe.notes && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 bg-brand-cream rounded-xl p-8"
              >
                <h3 className="text-xl font-display font-semibold text-brand-charcoal mb-4">
                  {t('recipe.notes')}
                </h3>
                <div className="text-neutral-600">
                  {/* Notes will be rendered from Contentful rich text */}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default RecipeDetailTemplate;

export const Head = ({ data }) => {
  const recipe = data?.contentfulRecipe || {
    title: 'Recipe',
    description: 'Delicious recipe from Carolina de Canadá',
  };

  return (
    <>
      <title>{recipe.title} | Carolina de Canadá</title>
      <meta name="description" content={recipe.description} />
      <meta property="og:title" content={recipe.title} />
      <meta property="og:description" content={recipe.description} />
      {recipe.featuredImage?.url && (
        <meta property="og:image" content={recipe.featuredImage.url} />
      )}
      <meta property="og:type" content="article" />
    </>
  );
};

// This query will work once Contentful is set up
export const query = graphql`
  query RecipeDetailQuery($language: String!) {
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
