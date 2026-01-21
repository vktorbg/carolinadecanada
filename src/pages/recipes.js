import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout/Layout';
import SearchBar from '../components/common/SearchBar';
import RecipeFilters from '../components/Recipe/RecipeFilters';
import RecipeGrid from '../components/Recipe/RecipeGrid';
import { SearchProvider } from '../context/SearchContext';
import { useRecipeSearch } from '../hooks/useRecipeSearch';

const RecipesPageContent = ({ recipes, categories }) => {
  const { t } = useTranslation();
  const filteredRecipes = useRecipeSearch(recipes);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-charcoal mb-4">
          {t('nav.recipes')}
        </h1>
        <p className="text-lg text-neutral-600">
          Explore our collection of delicious Canadian recipes
        </p>
      </div>

      <SearchBar />

      <div className="mt-8">
        <RecipeFilters categories={categories} />
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

const RecipesPage = () => {
  // Placeholder data - will be replaced with Contentful data
  const recipes = [];
  const categories = [];

  return (
    <Layout minimal={true}>
      <SearchProvider>
        <RecipesPageContent recipes={recipes} categories={categories} />
      </SearchProvider>
    </Layout>
  );
};

export default RecipesPage;

export const Head = () => {
  return (
    <>
      <title>Recipes | Carolina de Canadá</title>
      <meta
        name="description"
        content="Browse our collection of authentic Canadian recipes"
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
