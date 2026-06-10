export const colors = {
  primary: {
    50:  '#EBF2F9',
    100: '#C2D9EF',
    200: '#99BFE4',
    300: '#70A6D9',
    400: '#478CCF',
    500: '#1A4F7A',  // brand principal
    600: '#163F62',
    700: '#112F49',
    800: '#0B1F31',
    900: '#060F18',
  },
  neutral: {
    0:   '#FFFFFF',
    50:  '#FDFAF5',  // background de la app
    100: '#F5EFE0',  // surface / cards claras
    200: '#EDEDF2',  // border por defecto
    300: '#D5D5DF',
    400: '#B0B0BC',
    500: '#574B30',  // texto secundario
    600: '#453C27',
    700: '#362E1C',  // texto principal
    800: '#241E12',
    900: '#120F09',
  },
  success: {
    50:  '#ECFDF5',
    500: '#10B981',
    700: '#065F46',
  },
  warning: {
    50:  '#FFFBEB',
    500: '#F59E0B',
    700: '#92400E',
  },
  error: {
    50:  '#FEF2F2',
    500: '#EF4444',
    700: '#991B1B',
  },
} as const;

export type ColorToken = typeof colors;
