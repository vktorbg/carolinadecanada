import React from 'react';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { motion } from 'framer-motion';
import { Clock, ChefHat, Users, ArrowRight } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  const { t } = useTranslation();

  const image = recipe.featuredImage ? getImage(recipe.featuredImage) : null;

  const difficultyColors = {
    Easy: 'bg-brand-sage/20 text-brand-sage border-brand-sage/30',
    Medium: 'bg-accent-honey/20 text-accent-honey border-accent-honey/30',
    Hard: 'bg-brand-terracotta/20 text-brand-terracotta border-brand-terracotta/30',
  };

  return (
    <Link to={`/recipes/${recipe.slug}`} className="block group">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300 h-full"
      >
        {/* Recipe Image */}
        <div className="relative h-72 overflow-hidden bg-gradient-to-br from-brand-terracotta/10 to-brand-sage/10">
          {image ? (
            <>
              <GatsbyImage
                image={image}
                alt={recipe.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : recipe.featuredImage && typeof recipe.featuredImage === 'string' ? (
            <>
              <img
                src={recipe.featuredImage}
                alt={recipe.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-cream to-neutral-100">
              <ChefHat size={80} className="text-brand-terracotta/20" />
            </div>
          )}

          {/* Floating Badge - Difficulty */}
          {recipe.difficulty && (
            <div className="absolute top-5 left-5">
              <span className={`px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-sm border ${difficultyColors[recipe.difficulty] || 'bg-neutral-100 text-neutral-700'}`}>
                {t(`recipe.${recipe.difficulty.toLowerCase()}`)}
              </span>
            </div>
          )}

          {/* Hover Arrow Icon */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute bottom-5 right-5 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <ArrowRight size={20} className="text-brand-terracotta" />
          </motion.div>
        </div>

        {/* Recipe Info */}
        <div className="p-6">
          {/* Category Tag */}
          {recipe.category && (
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-brand-terracotta/10 to-accent-honey/10 text-brand-terracotta text-xs font-bold rounded-lg border border-brand-terracotta/20">
                {recipe.category.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-display font-bold text-brand-charcoal mb-3 group-hover:text-brand-terracotta transition-colors line-clamp-2 leading-tight">
            {recipe.title}
          </h3>

          {/* Description */}
          {recipe.description && (
            <p className="text-neutral-600 text-sm leading-relaxed mb-5 line-clamp-2">
              {typeof recipe.description === 'string'
                ? recipe.description
                : recipe.description?.raw
                  ? JSON.parse(recipe.description.raw).content.find(c => c.nodeType === 'paragraph')?.content.find(c => c.nodeType === 'text')?.value || ''
                  : ''}
            </p>
          )}

          {/* Meta Information Bar */}
          <div className="flex items-center gap-4 pt-4 border-t border-neutral-200">
            {recipe.totalTime && (
              <div className="flex items-center gap-1.5 text-neutral-600">
                <div className="w-8 h-8 rounded-full bg-brand-terracotta/10 flex items-center justify-center">
                  <Clock size={14} className="text-brand-terracotta" />
                </div>
                <span className="text-xs font-semibold">{recipe.totalTime} min</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-1.5 text-neutral-600">
                <div className="w-8 h-8 rounded-full bg-brand-sage/10 flex items-center justify-center">
                  <Users size={14} className="text-brand-sage" />
                </div>
                <span className="text-xs font-semibold">{recipe.servings} {t('recipe.servings')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-brand-terracotta/5 to-transparent rounded-bl-[60px] pointer-events-none" />
      </motion.div>
    </Link>
  );
};

export default RecipeCard;
