import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const CategoryShowcase = () => {
  const { t } = useTranslation();

  // Placeholder categories - will be replaced with Contentful data
  const categories = [
    { name: 'Breads', slug: 'breads', desc: t('home.categories.breads_desc') },
    { name: 'Cakes', slug: 'cakes', desc: t('home.categories.cakes_desc') },
    { name: 'Cookies', slug: 'cookies', desc: t('home.categories.cookies_desc') },
    { name: 'Desserts', slug: 'desserts', desc: t('home.categories.desserts_desc') },
  ];

  return (
    <section className="py-20 bg-white border-b border-neutral-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
        >
          <div>
            <span className="text-brand-terracotta font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
              Explora por Categoría
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-brand-charcoal">
              {t('home.categories.title')}
            </h2>
          </div>
          <Link
            to="/recipes"
            className="text-brand-charcoal font-semibold text-sm border-b-2 border-brand-terracotta pb-1 hover:text-brand-terracotta transition-colors"
          >
            Ver todas las recetas
          </Link>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <Link
                to={`/category/${category.slug}`}
                className="group relative"
              >
                {/* Circular Vignette */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 border-2 border-brand-terracotta/20 group-hover:border-brand-terracotta transition-all duration-500 mb-4">
                  <div className="w-full h-full rounded-full overflow-hidden bg-brand-cream relative">
                    {/* Placeholder with First Letter */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-terracotta/10 to-accent-honey/10 group-hover:scale-110 transition-transform duration-700">
                      <span className="text-2xl md:text-3xl font-display font-bold text-brand-terracotta/40">
                        {category.name[0]}
                      </span>
                    </div>
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/5 transition-colors duration-300" />
                  </div>
                </div>

                <h3 className="text-center font-display text-lg md:text-xl font-medium text-brand-charcoal group-hover:text-brand-terracotta transition-colors">
                  {category.name}
                </h3>

                <div className="w-0 h-0.5 bg-brand-terracotta mx-auto mt-1 group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
