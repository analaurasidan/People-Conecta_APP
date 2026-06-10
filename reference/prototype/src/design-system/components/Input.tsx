import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={['flex flex-col gap-1', className].join(' ')}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-ink-muted">{leftIcon}</span>
        )}
        <input
          id={inputId}
          className={[
            'w-full bg-white border rounded-lg text-xs text-ink placeholder:text-ink-muted/50 outline-none transition-colors',
            'px-3 py-2.5',
            leftIcon ? 'pl-9' : '',
            rightIcon ? 'pr-9' : '',
            error
              ? 'border-red-400 focus:border-red-500'
              : 'border-border focus:border-primary',
          ].filter(Boolean).join(' ')}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-ink-muted">{rightIcon}</span>
        )}
      </div>
      {error && (
        <span className="text-[10px] text-red-500">{error}</span>
      )}
    </div>
  );
}
