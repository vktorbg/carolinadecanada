require('dotenv').config({ path: `.env` });

const supportedLanguages = ['en', 'es'];
const defaultLanguage = 'en';

// Helper to check if Contentful is configured
const hasContentfulConfig = () => {
  return process.env.CONTENTFUL_SPACE_ID &&
         process.env.CONTENTFUL_ACCESS_TOKEN &&
         process.env.CONTENTFUL_SPACE_ID !== 'placeholder' &&
         process.env.CONTENTFUL_ACCESS_TOKEN !== 'placeholder';
};

// Build plugins array
const plugins = [
  'gatsby-plugin-image',
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-postcss',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/src/locales`,
      name: 'locale',
    },
  },
  {
    resolve: 'gatsby-plugin-react-i18next',
    options: {
      localeJsonSourceName: 'locale',
      languages: supportedLanguages,
      defaultLanguage: defaultLanguage,
      siteUrl: 'https://carolinadecanada.com',
      prefixDefault: false,
      redirect: false,
      i18nextOptions: {
        defaultNS: 'translation',
      },
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'Carolina de Canadá',
      short_name: 'Carolina',
      start_url: '/',
      background_color: '#FFFBF5',
      theme_color: '#D97757',
      display: 'standalone',
      icon: 'static/images/icon.svg',
    },
  },
  'gatsby-plugin-sitemap',
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      policy: [
        { userAgent: '*', allow: '/' },
        { userAgent: '*', allow: '/es/' },
      ],
      sitemap: 'https://carolinadecanada.com/sitemap-index.xml',
    },
  },
];

// Add Contentful plugin only if configured
if (hasContentfulConfig()) {
  plugins.splice(5, 0, {
    resolve: 'gatsby-source-contentful',
    options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    },
  });
}

module.exports = {
  siteMetadata: {
    title: 'Carolina de Canadá',
    description: 'Canadian recipes and culinary traditions with a bilingual twist',
    siteUrl: 'https://carolinadecanada.com',
    author: 'Carolina',
    languages: {
      langs: supportedLanguages,
      defaultLangKey: defaultLanguage,
    },
  },
  plugins,
};
