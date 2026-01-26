import { useMemo } from 'react';
import { useSearch } from '../context/SearchContext';

export const useRecipeSearch = (recipes) => {
  const { searchTerm, selectedCategory, selectedDifficulty, maxTime } = useSearch();

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];

    return recipes.filter(recipe => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const titleMatch = recipe.title?.toLowerCase().includes(searchLower);

        let descriptionMatch = false;
        if (recipe.description) {
          if (typeof recipe.description === 'string') {
            descriptionMatch = recipe.description.toLowerCase().includes(searchLower);
          } else if (recipe.description.raw) {
            // Simplified plain text extraction from rich text raw JSON
            descriptionMatch = recipe.description.raw.toLowerCase().includes(searchLower);
          }
        }

        if (!titleMatch && !descriptionMatch) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory) {
        const categoryMatch =
          recipe.category?.slug === selectedCategory ||
          recipe.category?.name === selectedCategory;
        if (!categoryMatch) return false;
      }

      // Difficulty filter
      if (selectedDifficulty && recipe.difficulty !== selectedDifficulty) {
        return false;
      }

      // Max time filter
      if (maxTime && recipe.totalTime > maxTime) {
        return false;
      }

      return true;
    });
  }, [recipes, searchTerm, selectedCategory, selectedDifficulty, maxTime]);

  return filteredRecipes;
};
