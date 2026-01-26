import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import Layout from '../components/Layout/Layout';
import RecipeSchema from '../components/SEO/RecipeSchema';
import { motion } from 'framer-motion';
import { Clock, Users, ChefHat, Printer, Share2 } from 'lucide-react';

const RecipeTemplate = ({ data, pageContext }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const pageSlug = pageContext.slug;

  // Find the recipe match safely
  const allRecipes = data?.allContentfulRecipe?.nodes || [];

  // 1. Find all recipes that match this slug
  const matchingRecipes = allRecipes.filter(r =>
    r.slug?.toLowerCase() === pageSlug?.toLowerCase()
  );

  // 2. From those, find the one that matches our current language
  const recipe = matchingRecipes.find(r => {
    const nodeLang = r.node_locale ? r.node_locale.split('-')[0] : '';
    return nodeLang === currentLang;
  }) || matchingRecipes[0];

  if (!recipe) {
    return (
      <Layout minimal={true}>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-display font-bold text-brand-charcoal mb-4">Recipe not found</h1>
          <p className="text-neutral-600">We couldn't load the recipe content ({pageSlug}). Please check if it's published in Contentful.</p>
        </div>
      </Layout>
    );
  }

  const image = recipe.featuredImage ? getImage(recipe.featuredImage) : null;

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: "Check out this delicious recipe!",
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <Layout minimal={true}>
      <RecipeSchema recipe={recipe} siteUrl="https://carolinadecanada.com" />

      {/* Styles for Printing */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          header, footer, .no-print {
            display: none !important;
          }
          body {
            background-color: white !important;
            color: black !important;
            font-size: 10pt !important;
            line-height: 1.3 !important;
          }
          .print-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            border-bottom: 2px solid #eee !important;
            padding-bottom: 10px !important;
            margin-bottom: 15px !important;
          }
          .print-title {
            font-size: 20pt !important;
            margin: 0 !important;
          }
          .print-meta-bar {
            display: flex !important;
            gap: 20px !important;
            margin: 10px 0 !important;
            padding: 5px 0 !important;
            border-bottom: 1px solid #f0f0f0 !important;
            font-size: 9pt !important;
          }
          .print-image-wrap {
            width: 200px !important;
            float: right !important;
            margin-left: 20px !important;
            margin-bottom: 10px !important;
          }
          .print-content-layout {
            display: grid !important;
            grid-template-columns: 1fr 2fr !important;
            gap: 30px !important;
            clear: both !important;
          }
          h2 {
            font-size: 14pt !important;
            margin-top: 5pt !important;
            margin-bottom: 5pt !important;
            border-bottom: 1px solid #eee !important;
          }
          @page {
            margin: 1cm;
          }
          .prose { max-width: 100% !important; }
        }
      ` }} />

      <article className="pt-6 pb-12 print-container">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header for Print Only */}
            <div className="hidden print:flex print-header">
              <div>
                <span className="text-xl font-display font-medium text-brand-charcoal">
                  Carolina <span className="text-brand-terracotta italic font-accent-script">de</span> Canadá
                </span>
                <div className="text-[9px] text-neutral-400">www.carolinadecanada.com</div>
              </div>
              <div className="text-right text-[9px] text-neutral-400">
                {new Date().toLocaleDateString()}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col">
                <div className="order-1">
                  {recipe.category && (
                    <span className="inline-block px-4 py-1 bg-brand-terracotta/10 text-brand-terracotta text-sm font-semibold rounded-full mb-4 no-print">
                      {recipe.category.name}
                    </span>
                  )}

                  <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-charcoal mb-6 print-title">
                    {recipe.title}
                  </h1>
                </div>

                {/* Print Meta Line */}
                <div className="hidden print:flex print-meta-bar order-2">
                  {recipe.totalTime && <span><strong>{t('recipe.totalTime')}:</strong> {recipe.totalTime} min</span>}
                  {recipe.servings && <span><strong>{t('recipe.servings')}:</strong> {recipe.servings}</span>}
                  {recipe.difficulty && <span><strong>{t('recipe.difficulty')}:</strong> {recipe.difficulty}</span>}
                </div>

                {/* Web Meta Info & Actions */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 no-print order-3">
                  <div className="flex flex-wrap items-center gap-x-10 gap-y-6 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-brand-sage/10 shadow-sm flex-grow">
                    {recipe.totalTime && (
                      <div className="flex items-center text-neutral-700">
                        <div className="p-2.5 bg-brand-terracotta/10 rounded-xl mr-3">
                          <Clock size={20} className="text-brand-terracotta" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-0.5">{t('recipe.totalTime')}</div>
                          <div className="font-bold text-brand-charcoal">{recipe.totalTime} min</div>
                        </div>
                      </div>
                    )}
                    {recipe.servings && (
                      <div className="flex items-center text-neutral-700">
                        <div className="p-2.5 bg-brand-terracotta/10 rounded-xl mr-3">
                          <Users size={20} className="text-brand-terracotta" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-0.5">{t('recipe.servings')}</div>
                          <div className="font-bold text-brand-charcoal">{recipe.servings}</div>
                        </div>
                      </div>
                    )}
                    {recipe.difficulty && (
                      <div className="flex items-center text-neutral-700">
                        <div className="p-2.5 bg-brand-terracotta/10 rounded-xl mr-3">
                          <ChefHat size={20} className="text-brand-terracotta" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-0.5">{t('recipe.difficulty')}</div>
                          <div className="font-bold text-brand-charcoal">{recipe.difficulty}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handlePrint}
                      className="flex items-center px-6 py-3 bg-white border-2 border-brand-terracotta text-brand-terracotta font-bold rounded-xl hover:bg-brand-terracotta hover:text-white transition-all shadow-sm"
                    >
                      <Printer size={18} className="mr-2" />
                      {t('recipe.print')}
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex items-center px-4 py-3 bg-brand-sage/10 text-brand-sage font-bold rounded-xl hover:bg-brand-sage hover:text-white transition-all border-2 border-transparent hover:border-brand-sage"
                      title={t('recipe.share')}
                    >
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>

                {recipe.description && (
                  <div className="text-lg text-neutral-600 mb-8 prose prose-lg order-4 print:text-[10pt] print:mb-4">
                    {image && (
                      <div className="hidden print:block print-image-wrap">
                        <GatsbyImage
                          image={image}
                          alt={recipe.title}
                          className="w-full h-full rounded-lg"
                        />
                      </div>
                    )}
                    {renderRichText(recipe.description)}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Web Image */}
            {image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12 rounded-2xl overflow-hidden shadow-lg aspect-[16/9] md:aspect-[21/9] max-h-[500px] no-print"
              >
                <GatsbyImage
                  image={image}
                  alt={recipe.title}
                  className="w-full h-full"
                  imgClassName="object-cover"
                />
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 print:grid-cols-1 print:block print-content-layout">
              {/* Ingredients */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-1 print:col-span-1"
              >
                <div className="bg-white rounded-xl shadow-card p-6 sticky top-24 print:p-0 print:shadow-none print:static">
                  <h2 className="text-2xl font-display font-bold text-brand-charcoal mb-6">
                    {t('recipe.ingredients')}
                  </h2>
                  <div className="text-neutral-600 prose prose-sm print:text-[10pt]">
                    {recipe.ingredients && renderRichText(recipe.ingredients)}
                  </div>
                </div>
              </motion.div>

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-2 print:col-span-1"
              >
                <h2 className="text-2xl font-display font-bold text-brand-charcoal mb-6">
                  {t('recipe.instructions')}
                </h2>
                <div className="prose prose-lg max-w-none print:text-[10pt]">
                  {recipe.instructions && renderRichText(recipe.instructions)}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default RecipeTemplate;

export const Head = ({ data, i18n, pageContext }) => {
  const currentLang = i18n?.language || 'en';
  const pageSlug = pageContext.slug;
  const recipes = data?.allContentfulRecipe?.nodes || [];
  const recipe = recipes.find(r =>
    r.slug?.toLowerCase() === pageSlug?.toLowerCase() &&
    (r.node_locale?.split('-')[0] === currentLang)
  ) || recipes.find(r => r.slug?.toLowerCase() === pageSlug?.toLowerCase()) || recipes[0];

  if (!recipe) return <title>Recipe</title>;

  return (
    <>
      <title>{recipe.title} | Carolina de Canadá</title>
      <meta property="og:title" content={recipe.title} />
      <meta property="og:type" content="article" />
    </>
  );
};

export const query = graphql`
  query {
    allContentfulRecipe {
      nodes {
        slug
        title
        node_locale
        description {
          raw
        }
        totalTime
        servings
        difficulty
        featuredImage {
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, width: 1200, aspectRatio: 1.77)
        }
        category {
          name
        }
        ingredients {
          raw
        }
        instructions {
          raw
        }
      }
    }
    locales: allLocale(filter: {language: {regex: "/en|es/"}}) {
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
