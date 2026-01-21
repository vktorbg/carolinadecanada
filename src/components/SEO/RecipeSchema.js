import React from 'react';

const RecipeSchema = ({ recipe, siteUrl }) => {
  // Extract ingredients from rich text (simplified version)
  const extractIngredients = (ingredientsRaw) => {
    if (!ingredientsRaw) return [];
    // This would need to parse the rich text format from Contentful
    // For now, return empty array - will be implemented when Contentful is connected
    return [];
  };

  // Extract instructions from rich text (simplified version)
  const extractInstructions = (instructionsRaw) => {
    if (!instructionsRaw) return [];
    // This would need to parse the rich text format from Contentful
    return [];
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "image": recipe.featuredImage?.url || '',
    "author": {
      "@type": "Person",
      "name": recipe.author?.name || "Carolina"
    },
    "datePublished": recipe.publishDate,
    "description": recipe.description,
    "prepTime": recipe.prepTime ? `PT${recipe.prepTime}M` : undefined,
    "cookTime": recipe.cookTime ? `PT${recipe.cookTime}M` : undefined,
    "totalTime": recipe.totalTime ? `PT${recipe.totalTime}M` : undefined,
    "recipeYield": recipe.servings ? `${recipe.servings} servings` : undefined,
    "recipeCategory": recipe.category?.name,
    "recipeIngredient": extractIngredients(recipe.ingredients),
    "recipeInstructions": extractInstructions(recipe.instructions),
  };

  // Remove undefined values
  Object.keys(schema).forEach(key =>
    schema[key] === undefined && delete schema[key]
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default RecipeSchema;
