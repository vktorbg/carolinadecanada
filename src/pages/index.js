import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import HeroSection from '../components/Home/HeroSection';
import AboutSnippet from '../components/Home/AboutSnippet';
import FeaturedRecipes from '../components/Home/FeaturedRecipes';
import CategoryShowcase from '../components/Home/CategoryShowcase';
import NewsletterSection from '../components/Home/NewsletterSection';

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSnippet />
      <FeaturedRecipes />
      <CategoryShowcase />
      <NewsletterSection />
    </Layout>
  );
};

export default HomePage;

export const Head = () => {
  return (
    <>
      <title>Carolina de Canadá | Canadian Recipes with Heart</title>
      <meta
        name="description"
        content="Discover authentic Canadian recipes and culinary traditions. Bilingual cooking content in English and Spanish."
      />
      <meta property="og:title" content="Carolina de Canadá | Canadian Recipes" />
      <meta property="og:type" content="website" />
      <html lang="en" />
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
