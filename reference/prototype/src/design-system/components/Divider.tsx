import React from 'react';

interface DividerProps {
  className?: string;
  opacity?: number;
}

export function Divider({ className = '', opacity = 1 }: DividerProps) {
  return (
    <hr
      className={['border-0 border-t border-border', className].filter(Boolean).join(' ')}
      style={{ opacity }}
    />
  );
}
