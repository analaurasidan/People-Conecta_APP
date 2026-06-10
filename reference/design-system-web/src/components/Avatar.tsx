import React from 'react';

export type AvatarSize   = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'away' | undefined;

export interface AvatarProps {
  src?:      string;
  name?:     string;
  size?:     AvatarSize;
  status?:   AvatarStatus;
  className?: string;
}

const sizeClass: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-[9px]',
  sm: 'w-8 h-8 text-[10px]',
  md: 'w-10 h-10 text-xs',
  lg: 'w-12 h-12 text-sm',
  xl: 'w-16 h-16 text-base',
};

const statusDotSize: Record<AvatarSize, string> = {
  xs: 'w-1.5 h-1.5 -bottom-px -right-px',
  sm: 'w-2 h-2 bottom-0 right-0',
  md: 'w-2.5 h-2.5 bottom-0 right-0',
  lg: 'w-3 h-3 bottom-0.5 right-0.5',
  xl: 'w-3.5 h-3.5 bottom-0.5 right-0.5',
};

const statusColor: Record<NonNullable<AvatarStatus>, string> = {
  online:  'bg-success',
  offline: 'bg-ink-light',
  away:    'bg-warning',
};

function initials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

export function Avatar({ src, name = '', size = 'md', status, className = '' }: AvatarProps) {
  return (
    <div className={['relative inline-flex shrink-0', className].join(' ')}>
      {src ? (
        <img
          src={src}
          alt={name}
          referrerPolicy="no-referrer"
          className={['rounded-full object-cover border border-border', sizeClass[size]].join(' ')}
        />
      ) : (
        <div className={[
          'rounded-full bg-primary-100 text-primary font-semibold flex items-center justify-center',
          sizeClass[size],
        ].join(' ')}>
          {initials(name)}
        </div>
      )}
      {status && (
        <span className={[
          'absolute rounded-full ring-2 ring-white',
          statusDotSize[size],
          statusColor[status],
        ].join(' ')} />
      )}
    </div>
  );
}
