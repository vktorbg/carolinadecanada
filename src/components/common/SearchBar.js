import React, { useState, useEffect } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Search, X } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

const SearchBar = () => {
  const { t } = useTranslation();
  const { searchTerm, setSearchTerm } = useSearch();
  const [localValue, setLocalValue] = useState(searchTerm);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, setSearchTerm]);

  const handleClear = () => {
    setLocalValue('');
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400"
        />
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={t('search.placeholder')}
          className="w-full pl-12 pr-12 py-3 border-2 border-neutral-200 rounded-lg focus:border-brand-terracotta focus:outline-none transition-colors"
        />
        {localValue && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-brand-terracotta transition-colors"
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
