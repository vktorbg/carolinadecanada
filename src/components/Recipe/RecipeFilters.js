import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { X } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

const RecipeFilters = ({ categories = [] }) => {
  const { t } = useTranslation();
  const {
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    maxTime,
    setMaxTime,
    clearFilters,
    searchTerm
  } = useSearch();

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const timeOptions = [
    { label: '30 min', value: 30 },
    { label: '1 hour', value: 60 },
    { label: '2 hours', value: 120 },
  ];

  const hasActiveFilters = searchTerm || selectedCategory || selectedDifficulty || maxTime;

  return (
    <div className="bg-white rounded-xl shadow-card p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-brand-charcoal">
          {t('search.filters')}
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center text-sm text-brand-terracotta hover:text-brand-earth transition-colors font-medium"
          >
            <X size={16} className="mr-1" />
            {t('search.clearFilters')}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('search.category')}
          </label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-brand-terracotta focus:outline-none transition-colors"
          >
            <option value="">{t('search.allCategories')}</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('search.difficulty')}
          </label>
          <select
            value={selectedDifficulty || ''}
            onChange={(e) => setSelectedDifficulty(e.target.value || null)}
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-brand-terracotta focus:outline-none transition-colors"
          >
            <option value="">{t('search.allDifficulties')}</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {t(`recipe.${difficulty.toLowerCase()}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Max Time Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('search.maxTime')}
          </label>
          <select
            value={maxTime || ''}
            onChange={(e) => setMaxTime(e.target.value ? Number(e.target.value) : null)}
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-brand-terracotta focus:outline-none transition-colors"
          >
            <option value="">Any time</option>
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RecipeFilters;
