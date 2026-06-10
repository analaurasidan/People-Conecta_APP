import React from 'react';

type TextVariant = 'heading' | 'subheading' | 'body' | 'caption' | 'label';
type TextColor = 'ink' | 'muted' | 'primary' | 'white' | 'inherit';
type TextAlign = 'left' | 'center' | 'right';

interface TextProps {
  variant?: TextVariant;
  color?: TextColor;
  align?: TextAlign;
  className?: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
}

const variantClasses: Record<TextVariant, string> = {
  heading: 'font-display font-semibold text-sm leading-snug',
  subheading: 'font-display font-medium text-xs leading-snug',
  body: 'font-sans font-normal text-xs leading-relaxed',
  caption: 'font-sans text-[10px] leading-normal',
  label: 'font-sans font-extrabold text-[10px] uppercase tracking-wider',
};

const colorClasses: Record<TextColor, string> = {
  ink: 'text-ink',
  muted: 'text-ink-muted',
  primary: 'text-primary',
  white: 'text-white',
  inherit: '',
};

const alignClasses: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export function Text({
  variant = 'body',
  color = 'ink',
  align = 'left',
  as: Tag = 'span',
  className = '',
  children,
}: TextProps) {
  return (
    <Tag
      className={[
        variantClasses[variant],
        colorClasses[color],
        alignClasses[align],
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </Tag>
  );
}
