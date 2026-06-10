import React from 'react';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-6 h-6 text-[9px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-sm',
  xl: 'w-14 h-14 text-base',
};

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();
}

export function Avatar({ src, name = '', size = 'md', className = '' }: AvatarProps) {
  const sizeClass = sizeClasses[size];

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        referrerPolicy="no-referrer"
        className={['rounded-full object-cover shrink-0 border border-border', sizeClass, className].join(' ')}
      />
    );
  }

  return (
    <div
      className={[
        'rounded-full bg-primary/15 text-primary font-semibold flex items-center justify-center shrink-0',
        sizeClass,
        className,
      ].join(' ')}
    >
      {getInitials(name)}
    </div>
  );
}
