export const spacing = {
  0:  '0px',
  1:  '4px',
  2:  '8px',
  3:  '12px',
  4:  '16px',
  5:  '20px',
  6:  '24px',
  8:  '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const;

export const borderRadius = {
  none: '0px',
  sm:   '8px',
  md:   '12px',
  lg:   '16px',
  xl:   '20px',
  '2xl':'24px',
  full: '9999px',
} as const;

export const shadow = {
  none: 'none',
  xs:   '0 1px 2px rgba(0,0,0,0.06)',
  sm:   '0 1px 3px rgba(0,0,0,0.08)',
  md:   '0 4px 12px rgba(0,0,0,0.10)',
  lg:   '0 8px 24px rgba(0,0,0,0.12)',
  xl:   '0 16px 40px rgba(0,0,0,0.14)',
} as const;
