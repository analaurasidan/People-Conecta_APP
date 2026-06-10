import { Platform, TextStyle } from 'react-native';

const systemSans = Platform.OS === 'web'
  ? 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  : undefined;

export const fontFamily = {
  displayBold:   systemSans ?? 'PlusJakartaSans-Bold',
  displaySemi:   systemSans ?? 'PlusJakartaSans-SemiBold',
  bodyRegular:   systemSans ?? 'DMSans-Regular',
  bodyMedium:    systemSans ?? 'DMSans-Medium',
  bodySemiBold:  systemSans ?? 'DMSans-SemiBold',
  monospace:     Platform.OS === 'web' ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : 'JetBrainsMono-Regular',
} as const;

export const typography: Record<string, TextStyle> = {
  // Display — Plus Jakarta Sans Bold
  displayLarge: {
    fontFamily: fontFamily.displayBold,
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: 0,
  },
  displayMedium: {
    fontFamily: fontFamily.displayBold,
    fontSize: 45,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: fontFamily.displayBold,
    fontSize: 36,
    lineHeight: 44,
  },

  // Headline — Plus Jakarta Sans SemiBold
  headlineLarge: {
    fontFamily: fontFamily.displaySemi,
    fontSize: 32,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: fontFamily.displaySemi,
    fontSize: 28,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: fontFamily.displaySemi,
    fontSize: 24,
    lineHeight: 32,
  },

  // Title — DM Sans SemiBold
  titleLarge: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 22,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  titleSmall: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },

  // Body — DM Sans Regular
  bodyLarge: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodyMedium: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },

  // Label — DM Sans Medium
  labelLarge: {
    fontFamily: fontFamily.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  labelMedium: {
    fontFamily: fontFamily.bodyMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  labelSmall: {
    fontFamily: fontFamily.bodyMedium,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0,
  },
};
