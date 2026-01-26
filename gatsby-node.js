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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type ContentfulRecipe implements Node {
      title: String
      slug: String
      node_locale: String
      difficulty: String
      totalTime: Int
      servings: Int
      description: ContentfulRecipeDescription
      ingredients: ContentfulRecipeIngredients
      instructions: ContentfulRecipeInstructions
      featuredImage: ContentfulAsset
      category: ContentfulCategory
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
    }

    type ContentfulRecipeDescription {
      raw: String
    }

    type ContentfulRecipeIngredients {
      raw: String
    }

    type ContentfulRecipeInstructions {
      raw: String
    }

    type ContentfulCategory implements Node {
      name: String
      slug: String
      node_locale: String
      createdAt: Date @dateformat
    }

    type ContentfulAsset implements Node {
      gatsbyImageData: JSON
      title: String
      description: String
      file: ContentfulAssetFile
    }

    type ContentfulAssetFile {
      url: String
      fileName: String
      contentType: String
    }
  `;
  createTypes(typeDefs);
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

  // Query all recipes and categories
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
          name
          node_locale
        }
      }
    }
  `);

  if (recipeResult.errors) {
    reporter.panicOnBuild('Error querying Contentful data', recipeResult.errors);
    return;
  }

  const recipeTemplate = path.resolve('./src/templates/recipe-template.js');
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
      // Use name as slug if slug is not available (slugify it)
      const categorySlug = category.slug || (category.name ? category.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : '');

      if (!categorySlug || !category.name) return;

      const language = category.node_locale;
      const pathPrefix = language === 'es' ? '/es' : '';

      createPage({
        path: `${pathPrefix}/category/${categorySlug}`,
        component: categoryTemplate,
        context: {
          slug: categorySlug,
          categoryName: category.name,
          language: language,
        },
      });
    });
    reporter.info(`Created ${recipeResult.data.allContentfulCategory.nodes.length} category pages`);
  }
};

