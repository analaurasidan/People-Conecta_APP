import React from 'react';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';
export type BadgeSize    = 'sm' | 'md';

export interface BadgeProps {
  variant?:   BadgeVariant;
  size?:      BadgeSize;
  dot?:       boolean;
  className?: string;
  children:   React.ReactNode;
}

const variantClass: Record<BadgeVariant, string> = {
  default: 'bg-surface text-ink-muted border border-border',
  primary: 'bg-primary-50 text-primary',
  success: 'bg-success-bg text-success',
  warning: 'bg-warning-bg text-warning',
  error:   'bg-error-bg text-error',
  outline: 'bg-transparent text-ink border border-border',
};

const dotColor: Record<BadgeVariant, string> = {
  default: 'bg-ink-light',
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  error:   'bg-error',
  outline: 'bg-ink-muted',
};

const sizeClass: Record<BadgeSize, string> = {
  sm: 'text-[9px]  px-1.5 py-0.5',
  md: 'text-[10px] px-2   py-1',
};

export function Badge({
  variant  = 'default',
  size     = 'sm',
  dot      = false,
  className = '',
  children,
}: BadgeProps) {
  return (
    <span className={[
      'inline-flex items-center gap-1 font-semibold rounded-full uppercase tracking-wide',
      variantClass[variant],
      sizeClass[size],
      className,
    ].filter(Boolean).join(' ')}>
      {dot && <span className={['w-1.5 h-1.5 rounded-full', dotColor[variant]].join(' ')} />}
      {children}
    </span>
  );
}
