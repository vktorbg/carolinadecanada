export const colors = {
  primary: {
    cream: '#FFFBF5',
    terracotta: '#D97757',
    sage: '#8BA888',
    earth: '#C4A57B',
    charcoal: '#2D3436',
  },
  accent: {
    honey: '#E8B86D',
    olive: '#6B8E23',
    rose: '#D4A5A5',
  },
  text: {
    primary: '#2D3436',
    secondary: '#57534E',
    muted: '#78716C',
  },
  neutral: {
    50: '#FAFAF9',
    100: '#F5F5F4',
    200: '#E7E5E4',
    300: '#D6D3D1',
    400: '#A8A29E',
    500: '#78716C',
    600: '#57534E',
    700: '#44403C',
    800: '#292524',
    900: '#1C1917',
  },
};

export const fonts = {
  display: 'Lora, serif',
  body: 'Inter, sans-serif',
  sans: 'Inter, sans-serif',
  serif: 'Lora, serif',
};

export const animations = {
  smooth: { type: "spring", stiffness: 100, damping: 20 },
  bouncy: { type: "spring", stiffness: 300, damping: 15 },
  fade: { duration: 0.3, ease: "easeInOut" },
};

export const breakpoints = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
};

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  '2xl': '4rem',
  '3xl': '6rem',
};

export const borderRadius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
};

export default {
  colors,
  fonts,
  animations,
  breakpoints,
  spacing,
  borderRadius,
};
