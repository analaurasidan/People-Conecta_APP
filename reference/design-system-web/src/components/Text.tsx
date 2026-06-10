import React from 'react';

export type TextVariant = 'display' | 'heading' | 'subheading' | 'body' | 'body-sm' | 'caption' | 'label' | 'overline';
export type TextColor   = 'ink' | 'muted' | 'light' | 'primary' | 'white' | 'success' | 'warning' | 'error' | 'inherit';

export interface TextProps {
  variant?:  TextVariant;
  color?:    TextColor;
  className?: string;
  children:  React.ReactNode;
  as?:       keyof React.JSX.IntrinsicElements;
  truncate?: boolean;
}

const variantClass: Record<TextVariant, string> = {
  display:    'font-display font-bold text-2xl leading-tight',
  heading:    'font-display font-semibold text-base leading-snug',
  subheading: 'font-display font-semibold text-sm leading-snug',
  body:       'font-sans font-normal text-sm leading-relaxed',
  'body-sm':  'font-sans font-normal text-xs leading-relaxed',
  caption:    'font-sans text-[11px] leading-normal',
  label:      'font-sans font-extrabold text-[10px] uppercase tracking-wider',
  overline:   'font-sans font-semibold text-[10px] uppercase tracking-widest',
};

const colorClass: Record<TextColor, string> = {
  ink:     'text-ink',
  muted:   'text-ink-muted',
  light:   'text-ink-light',
  primary: 'text-primary',
  white:   'text-white',
  success: 'text-success',
  warning: 'text-warning',
  error:   'text-error',
  inherit: '',
};

export function Text({
  variant = 'body',
  color   = 'ink',
  as: Tag = 'span',
  truncate = false,
  className = '',
  children,
}: TextProps) {
  return (
    <Tag
      className={[
        variantClass[variant],
        colorClass[color],
        truncate ? 'truncate' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </Tag>
  );
}
