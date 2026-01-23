const path = require('path');

exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
  // Fix for Webpack 5 ESM resolution (especially for Framer Motion and Lucide)
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
  });

  // Force transpilation of modern ES6 packages that are known to have issues in Gatsby's build
  if (stage === 'build-javascript' || stage === 'develop' || stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /\.m?js$/,
            include: (modulePath) => {
              const normalizedPath = modulePath.replace(/\\/g, '/');
              return [
                'node_modules/framer-motion',
                'node_modules/motion-dom',
                'node_modules/motion-utils',
                'node_modules/lucide-react',
                'node_modules/react-hot-toast',
              ].some(pkg => normalizedPath.includes(pkg));
            },
            use: loaders.js(),
          },
        ],
      },
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Skip dynamic page creation if Contentful is not configured
  const hasContentful = process.env.CONTENTFUL_SPACE_ID &&
    process.env.CONTENTFUL_ACCESS_TOKEN &&
    process.env.CONTENTFUL_SPACE_ID !== 'placeholder' &&
    process.env.CONTENTFUL_ACCESS_TOKEN !== 'placeholder';

  if (!hasContentful) {
    reporter.info('Contentful is not configured. Skipping recipe and category page creation. Configure Contentful credentials in .env to enable dynamic pages.');
    return;
  }

  // Query all recipes
  const recipeResult = await graphql(`
    query {
      allContentfulRecipe {
        nodes {
          slug
          node_locale
        }
      }
      allContentfulCategory {
        nodes {
          slug
          node_locale
        }
      }
    }
  `);

  if (recipeResult.errors) {
    reporter.panicOnBuild('Error querying Contentful data', recipeResult.errors);
    return;
  }

  const recipeTemplate = path.resolve('./src/templates/recipe-detail.js');
  const categoryTemplate = path.resolve('./src/templates/category.js');

  // Create recipe detail pages
  if (recipeResult.data?.allContentfulRecipe?.nodes) {
    recipeResult.data.allContentfulRecipe.nodes.forEach(recipe => {
      const language = recipe.node_locale;
      const pathPrefix = language === 'es' ? '/es' : '';

      createPage({
        path: `${pathPrefix}/recipes/${recipe.slug}`,
        component: recipeTemplate,
        context: {
          slug: recipe.slug,
          language: language,
        },
      });
    });
    reporter.info(`Created ${recipeResult.data.allContentfulRecipe.nodes.length} recipe pages`);
  }

  // Create category pages
  if (recipeResult.data?.allContentfulCategory?.nodes) {
    recipeResult.data.allContentfulCategory.nodes.forEach(category => {
      const language = category.node_locale;
      const pathPrefix = language === 'es' ? '/es' : '';

      createPage({
        path: `${pathPrefix}/category/${category.slug}`,
        component: categoryTemplate,
        context: {
          slug: category.slug,
          language: language,
        },
      });
    });
    reporter.info(`Created ${recipeResult.data.allContentfulCategory.nodes.length} category pages`);
  }
};
