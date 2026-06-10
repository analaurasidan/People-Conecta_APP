import React from 'react';

type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardShadow = 'none' | 'sm' | 'md' | 'lg';
type CardRounded = 'md' | 'lg' | 'xl';

interface CardProps {
  padding?: CardPadding;
  shadow?: CardShadow;
  rounded?: CardRounded;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-2.5',
  md: 'p-3.5',
  lg: 'p-5',
};

const shadowStyles: Record<CardShadow, React.CSSProperties> = {
  none: {},
  sm: { boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  md: { boxShadow: '0 4px 12px rgba(0,0,0,0.10)' },
  lg: { boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
};

const roundedClasses: Record<CardRounded, string> = {
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
};

export function Card({
  padding = 'md',
  shadow = 'sm',
  rounded = 'xl',
  onClick,
  className = '',
  children,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      style={shadowStyles[shadow]}
      className={[
        'bg-white border border-border',
        paddingClasses[padding],
        roundedClasses[rounded],
        onClick ? 'cursor-pointer hover:border-primary/60 transition-colors' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}
