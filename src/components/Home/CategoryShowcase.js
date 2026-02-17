import React, { useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import { motion } from 'framer-motion';

const CategoryShowcase = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const data = useStaticQuery(graphql`
    query CategoryShowcaseQuery {
      allContentfulCategory {
        nodes {
          name
          node_locale
        }
      }
      allContentfulRecipe(sort: { createdAt: DESC }) {
        nodes {
          node_locale
          category {
            name
          }
          featuredImage {
            gatsbyImageData(placeholder: BLURRED, width: 200, height: 200)
          }
        }
      }
    }
  `);

  // Build a map of category name -> latest recipe's featured image
  const categoryImages = useMemo(() => {
    const map = {};
    (data?.allContentfulRecipe?.nodes || []).forEach(recipe => {
      const recipeLang = recipe.node_locale ? recipe.node_locale.split('-')[0] : '';
      if (recipeLang !== currentLang) return;
      (recipe.category || []).forEach(cat => {
        if (cat?.name && !map[cat.name]) {
          map[cat.name] = getImage(recipe.featuredImage);
        }
      });
    });
    return map;
  }, [data, currentLang]);

  // Filter categories by current language and only show those with recipes
  const categories = (data?.allContentfulCategory?.nodes || []).filter(node => {
    const nodeLang = node.node_locale ? node.node_locale.split('-')[0] : '';
    return nodeLang === currentLang && categoryImages[node.name];
  });

  return (
    <section className="pt-5 pb-8 lg:pt-6 lg:pb-10 bg-white border-b border-neutral-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-6 lg:mb-8 gap-2"
        >
          <div>
            <h2 className="text-brand-terracotta font-bold uppercase tracking-[0.2em] text-xs">
              {t('home.categories.badge')}
            </h2>
          </div>
          <Link
            to="/recipes"
            className="text-brand-charcoal font-semibold text-sm border-b-2 border-brand-terracotta pb-1 hover:text-brand-terracotta transition-colors"
          >
            {t('home.categories.viewAll')}
          </Link>
        </motion.div>

        <div className="flex overflow-x-auto lg:overflow-x-visible lg:flex-wrap lg:justify-center gap-6 lg:gap-8 pb-2 lg:pb-0 scrollbar-hide">
          {categories.map((category, index) => {
            const categorySlug = category.slug || (category.name ? category.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : '');

            if (!categorySlug) return null;

            const image = categoryImages[category.name];

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center flex-shrink-0"
              >
                <Link
                  to={`/category/${categorySlug}`}
                  className="group relative"
                >
                  {/* Circular Vignette */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-0.5 border-2 border-brand-terracotta/20 group-hover:border-brand-terracotta transition-all duration-500 mb-2">
                    <div className="w-full h-full rounded-full overflow-hidden bg-brand-cream relative">
                      {image ? (
                        <GatsbyImage
                          image={image}
                          alt={category.name}
                          className="!absolute inset-0 w-full h-full group-hover:scale-110 transition-transform duration-700"
                          objectFit="cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-terracotta/10 to-accent-honey/10 group-hover:scale-110 transition-transform duration-700">
                          <span className="text-lg md:text-xl font-display font-bold text-brand-terracotta/40">
                            {category.name?.[0] || 'C'}
                          </span>
                        </div>
                      )}
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/5 transition-colors duration-300 z-10" />
                    </div>
                  </div>

                  <h3 className="text-center font-display text-sm md:text-base font-medium text-brand-charcoal group-hover:text-brand-terracotta transition-colors">
                    {category.name}
                  </h3>

                  <div className="w-0 h-0.5 bg-brand-terracotta mx-auto mt-1 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CategoryShowcase;
