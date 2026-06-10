import React from 'react';

interface BottomSheetProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function BottomSheet({ open, onClose, children, className = '' }: BottomSheetProps) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      <div
        className={[
          'relative bg-white rounded-t-2xl animate-slideUp',
          className,
        ].filter(Boolean).join(' ')}
      >
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="w-8 h-1 bg-border rounded-full" />
        </div>
        {children}
      </div>
    </div>
  );
}
