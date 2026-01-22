import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import HeroSection from '../components/Home/HeroSection';
import AboutSnippet from '../components/Home/AboutSnippet';
import FeaturedRecipes from '../components/Home/FeaturedRecipes';
import CategoryShowcase from '../components/Home/CategoryShowcase';
import NewsletterSection from '../components/Home/NewsletterSection';

const HomePage = () => {
  // Diagnostic logs - ONLY in production to catch the Netlify issue
  if (typeof window !== 'undefined') {
    console.log("🛠️ [DIAGNOSTIC] Checking Home Page components...");
    console.log("HeroSection type:", typeof HeroSection);
    console.log("AboutSnippet type:", typeof AboutSnippet);
    console.log("FeaturedRecipes type:", typeof FeaturedRecipes);
    console.log("CategoryShowcase type:", typeof CategoryShowcase);
    console.log("NewsletterSection type:", typeof NewsletterSection);
  }

  // Safety fallback: if any component is an object (Error #130 candidate), we can log it
  const components = { HeroSection, AboutSnippet, FeaturedRecipes, CategoryShowcase, NewsletterSection };
  Object.entries(components).forEach(([name, comp]) => {
    if (comp && typeof comp === 'object' && !Array.isArray(comp)) {
      console.error(`🚨 component "${name}" is an OBJECT instead of a FUNCTION. This causes Error #130.`);
    }
  });

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
