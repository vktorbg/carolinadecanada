import React from 'react';
import RecipeCard from './RecipeCard';
import { motion } from 'framer-motion';

const RecipeGrid = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-500 text-lg">
          No recipes found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe, index) => (
        <motion.div
          key={recipe.slug || index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <RecipeCard recipe={recipe} />
        </motion.div>
      ))}
    </div>
  );
};

export default RecipeGrid;
