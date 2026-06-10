import React from 'react';

type PhIconStyle = 'regular' | 'fill';

interface PhIconProps {
  name: string;
  style?: PhIconStyle;
  size?: number | string;
  color?: string;
  className?: string;
}

export function PhIcon({ name, style = 'regular', size, color, className = '' }: PhIconProps) {
  const prefix = style === 'fill' ? 'ph-fill' : 'ph';
  return (
    <i
      className={[prefix, `ph-${name}`, className].filter(Boolean).join(' ')}
      style={{ fontSize: size, color }}
      aria-hidden
    />
  );
}
