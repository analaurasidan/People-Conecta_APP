import React from 'react';

export type PhIconStyle = 'regular' | 'fill';

export interface PhIconProps {
  name:      string;
  style?:    PhIconStyle;
  size?:     number | string;
  color?:    string;
  className?: string;
}

export function PhIcon({ name, style = 'regular', size, color, className = '' }: PhIconProps) {
  return (
    <i
      className={[style === 'fill' ? 'ph-fill' : 'ph', `ph-${name}`, className].filter(Boolean).join(' ')}
      style={{ fontSize: size, color }}
      aria-hidden
    />
  );
}
