import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout/Layout';
import RecipeGrid from '../components/Recipe/RecipeGrid';
import { SearchProvider } from '../context/SearchContext';
import SearchBar from '../components/common/SearchBar';
import { useRecipeSearch } from '../hooks/useRecipeSearch';
import { motion } from 'framer-motion';

const CategoryPageContent = ({ category, recipes }) => {
  const { t } = useTranslation();
  const filteredRecipes = useRecipeSearch(recipes);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-charcoal mb-4">
          {category?.name || 'Category'}
        </h1>
        {category?.description && (
          <p className="text-lg text-neutral-600 max-w-3xl">
            {category.description}
          </p>
        )}
      </motion.div>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="mb-6">
        <p className="text-neutral-600">
          {filteredRecipes.length} {t('search.resultsFound')}
        </p>
      </div>

      <RecipeGrid recipes={filteredRecipes} />
    </div>
  );
};

const CategoryPage = () => {
  // Placeholder - will be replaced with Contentful data
  const category = null;
  const recipes = [];

  return (
    <Layout>
      <SearchProvider>
        <CategoryPageContent category={category} recipes={recipes} />
      </SearchProvider>
    </Layout>
  );
};

export default CategoryPage;

export const Head = ({ data }) => {
  const category = data?.contentfulCategory;

  return (
    <>
      <title>{category?.name || 'Category'} | Carolina de Canadá</title>
      <meta
        name="description"
        content={category?.description || 'Browse recipes in this category'}
      />
    </>
  );
};

export const query = graphql`
  query CategoryPageQuery($language: String!) {
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
