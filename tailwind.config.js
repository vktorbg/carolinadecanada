const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors - Warm & Inviting
        'brand-cream': '#FFFBF5',      // Soft cream background
        'brand-terracotta': '#D97757',  // Warm terracotta (main CTA)
        'brand-sage': '#8BA888',        // Fresh sage green
        'brand-earth': '#C4A57B',       // Warm earth tone
        'brand-charcoal': '#2D3436',    // Deep charcoal for text

        // Secondary Colors
        'accent-honey': '#E8B86D',      // Honey gold accent
        'accent-olive': '#6B8E23',      // Olive green
        'accent-rose': '#D4A5A5',       // Dusty rose

        // Neutrals
        'neutral-50': '#FAFAF9',
        'neutral-100': '#F5F5F4',
        'neutral-200': '#E7E5E4',
        'neutral-300': '#D6D3D1',
        'neutral-400': '#A8A29E',
        'neutral-500': '#78716C',
        'neutral-600': '#57534E',
        'neutral-700': '#44403C',
        'neutral-800': '#292524',
        'neutral-900': '#1C1917',
      },
      fontFamily: {
        'display': ['Playfair Display', ...defaultTheme.fontFamily.serif],   // Elegant high-contrast serif
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
        'serif': ['Lora', ...defaultTheme.fontFamily.serif],
        'accent-script': ['Mrs Saint Delafield', 'cursive'],             // Subtle feminine script
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 8px 0 rgba(45, 52, 54, 0.08)',
        'md': '0 4px 12px -1px rgba(45, 52, 54, 0.12)',
        'lg': '0 10px 20px -3px rgba(45, 52, 54, 0.15)',
        'card': '0 1px 3px 0 rgba(45, 52, 54, 0.1), 0 1px 2px 0 rgba(45, 52, 54, 0.06)',
      },
    },
  },
  plugins: [],
};
