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
        const descriptionMatch = recipe.description?.toLowerCase().includes(searchLower);

        if (!titleMatch && !descriptionMatch) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory && recipe.category?.slug !== selectedCategory) {
        return false;
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
