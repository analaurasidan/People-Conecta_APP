export const colors = {
  // Primary — Coastal Blue
  primary: {
    50:  '#EAF2F7',
    100: '#D5E5EF',
    200: '#ABCBDD',
    300: '#81B1CB',
    400: '#5797B9',
    500: '#1A4F7A',
    600: '#164466',
    700: '#103D61',
    800: '#0B2D47',
    900: '#061D2E',
  },

  // Secondary — Warm accent
  secondary: {
    500: '#D97706',
    600: '#B45309',
  },

  // Background — Warm Sand
  background: '#FDFAF5',
  surface: '#FFFFFF',

  // Text
  textPrimary:   '#362E1C',
  textSecondary: '#574B30',
  textDisabled:  '#B5B0AA',
  textOnPrimary: '#FFFFFF',

  // Semantic
  success: '#2D9E6B',
  error:   '#D64040',
  warning: '#E8A020',
  info:    '#3A7FD5',

  // Neutral
  neutral: {
    50:  '#FDFAF5',
    100: '#F5EFE0',
    200: '#EDE3CC',
    300: '#DED0B5',
    400: '#B6A98E',
    500: '#8A7B60',
    600: '#6E6049',
    700: '#574B30',
    800: '#362E1C',
    900: '#1A1C1F',
  },

  // Utility
  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',
} as const;

export type ColorKey = keyof typeof colors;
