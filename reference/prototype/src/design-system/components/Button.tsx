import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-surface text-ink border border-border hover:bg-surface/80',
  ghost: 'bg-transparent text-primary hover:bg-primary/10',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider',
  md: 'text-xs font-semibold px-4 py-2.5 rounded-lg',
  lg: 'text-sm font-semibold px-5 py-3 rounded-xl',
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
        'inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {loading ? <span className="opacity-70">...</span> : children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
