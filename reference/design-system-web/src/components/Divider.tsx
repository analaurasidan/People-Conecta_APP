import React from 'react';

export interface DividerProps {
  label?:    string;
  className?: string;
}

export function Divider({ label, className = '' }: DividerProps) {
  if (label) {
    return (
      <div className={['flex items-center gap-3', className].join(' ')}>
        <hr className="flex-1 border-0 border-t border-border" />
        <span className="font-sans font-semibold text-[10px] uppercase tracking-wider text-ink-light shrink-0">
          {label}
        </span>
        <hr className="flex-1 border-0 border-t border-border" />
      </div>
    );
  }
  return <hr className={['border-0 border-t border-border', className].filter(Boolean).join(' ')} />;
}
