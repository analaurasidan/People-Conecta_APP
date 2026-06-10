import React from 'react';

export interface BottomSheetProps {
  open:       boolean;
  onClose?:   () => void;
  title?:     string;
  children:   React.ReactNode;
  className?: string;
}

export function BottomSheet({ open, onClose, title, children, className = '' }: BottomSheetProps) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={['relative bg-white rounded-t-2xl animate-slideUp', className].filter(Boolean).join(' ')}>
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-8 h-1 bg-border rounded-full" />
        </div>
        {title && (
          <div className="px-5 pt-2 pb-1">
            <span className="font-display font-semibold text-sm text-ink">{title}</span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
