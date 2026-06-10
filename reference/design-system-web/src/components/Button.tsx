import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export type ButtonSize    = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  fullWidth?: boolean;
  loading?:   boolean;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary:   'bg-primary text-white hover:bg-primary-600 active:bg-primary-700',
  secondary: 'bg-surface text-ink border border-border hover:bg-surface/70',
  ghost:     'bg-transparent text-primary hover:bg-primary-50',
  danger:    'bg-error text-white hover:bg-red-600 active:bg-red-700',
  outline:   'bg-transparent text-primary border border-primary hover:bg-primary-50',
};

const sizeClass: Record<ButtonSize, string> = {
  xs: 'text-[10px] font-extrabold px-2 py-1 rounded-sm tracking-wider uppercase gap-1',
  sm: 'text-xs font-semibold px-3 py-1.5 rounded-sm tracking-wider uppercase gap-1.5',
  md: 'text-sm font-semibold px-4 py-2.5 rounded-md gap-2',
  lg: 'text-base font-semibold px-5 py-3 rounded-lg gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center transition-all cursor-pointer select-none',
        variantClass[variant],
        sizeClass[size],
        fullWidth ? 'w-full' : '',
        disabled || loading ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {leftIcon  && <span className="shrink-0 flex">{leftIcon}</span>}
      {loading   ? <span className="opacity-60">Cargando…</span> : children}
      {rightIcon && <span className="shrink-0 flex">{rightIcon}</span>}
    </button>
  );
}
