import React, { useState } from 'react';
import { Text, Stack, PhIcon } from '@ds/index';

interface PreviewProps {
  label:     string;
  code?:     string;
  children:  React.ReactNode;
}

export function Preview({ label, code, children }: PreviewProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-background">
        <Text variant="label" color="muted">{label}</Text>
        {code && (
          <button
            onClick={() => setShowCode(v => !v)}
            className={['flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-md transition-colors', showCode ? 'bg-primary text-white' : 'text-ink-muted hover:bg-surface'].join(' ')}
          >
            <PhIcon name="code" size={11} />
            {showCode ? 'Ocultar' : 'Ver código'}
          </button>
        )}
      </div>
      {/* Preview */}
      <div className="p-5 bg-background/60">
        {children}
      </div>
      {/* Code */}
      {code && showCode && (
        <div className="border-t border-border bg-neutral-900 px-5 py-4 overflow-x-auto">
          <pre className="text-[11px] text-green-300 font-mono leading-relaxed whitespace-pre">{code}</pre>
        </div>
      )}
    </div>
  );
}
