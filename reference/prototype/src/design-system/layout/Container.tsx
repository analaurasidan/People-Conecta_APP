import React from 'react';

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function Container({ className = '', children }: ContainerProps) {
  return (
    <div className={['w-full px-4', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
