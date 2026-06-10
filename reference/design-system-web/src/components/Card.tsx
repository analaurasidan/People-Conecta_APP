import React from 'react';

export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'ghost';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  variant?:  CardVariant;
  padding?:  CardPadding;
  onClick?:  () => void;
  className?: string;
  children:  React.ReactNode;
}

const variantClass: Record<CardVariant, string> = {
  elevated: 'bg-white border border-border',
  outlined: 'bg-transparent border border-border',
  filled:   'bg-surface border border-border',
  ghost:    'bg-transparent',
};

const variantShadow: Record<CardVariant, React.CSSProperties> = {
  elevated: { boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  outlined: {},
  filled:   {},
  ghost:    {},
};

const paddingClass: Record<CardPadding, string> = {
  none: '',
  sm:   'p-3',
  md:   'p-4',
  lg:   'p-5',
};

export function Card({
  variant  = 'elevated',
  padding  = 'md',
  onClick,
  className = '',
  children,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      style={variantShadow[variant]}
      className={[
        'rounded-lg overflow-hidden',
        variantClass[variant],
        paddingClass[padding],
        onClick ? 'cursor-pointer hover:border-primary/50 transition-colors' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}
