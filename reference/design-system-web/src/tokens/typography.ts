export const typography = {
  fontFamily: {
    sans:    '"DM Sans", ui-sans-serif, system-ui, sans-serif',
    display: '"Plus Jakarta Sans", sans-serif',
    mono:    '"JetBrains Mono", ui-monospace, monospace',
  },
  fontSize: {
    '2xs': '10px',
    xs:    '11px',
    sm:    '13px',
    base:  '15px',
    lg:    '17px',
    xl:    '20px',
    '2xl': '24px',
    '3xl': '30px',
  },
  lineHeight: {
    tight:   '1.2',
    snug:    '1.375',
    normal:  '1.5',
    relaxed: '1.625',
  },
  fontWeight: {
    regular:   '400',
    medium:    '500',
    semibold:  '600',
    bold:      '700',
    extrabold: '800',
  },
  letterSpacing: {
    tight:  '-0.01em',
    normal: '0em',
    wide:   '0.04em',
    wider:  '0.08em',
  },
} as const;

export type TypographyToken = typeof typography;
