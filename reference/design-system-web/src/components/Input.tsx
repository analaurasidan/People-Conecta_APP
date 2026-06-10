import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?:     string;
  helper?:    string;
  error?:     string;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export function Input({
  label,
  helper,
  error,
  leftIcon,
  rightIcon,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={['flex flex-col gap-1', className].join(' ')}>
      {label && (
        <label htmlFor={inputId} className="font-sans font-extrabold text-[10px] uppercase tracking-wider text-ink-muted">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-ink-light flex items-center">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={[
            'w-full bg-white border rounded-md text-sm text-ink placeholder:text-ink-light/60',
            'px-3 py-2.5 outline-none transition-all',
            leftIcon  ? 'pl-9'  : '',
            rightIcon ? 'pr-9'  : '',
            error
              ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
              : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/15',
          ].filter(Boolean).join(' ')}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-ink-light flex items-center">
            {rightIcon}
          </span>
        )}
      </div>
      {(helper || error) && (
        <span className={['text-[11px]', error ? 'text-error' : 'text-ink-muted'].join(' ')}>
          {error ?? helper}
        </span>
      )}
    </div>
  );
}
