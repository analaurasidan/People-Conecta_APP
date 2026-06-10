import React from 'react';
import { spacing, borderRadius, shadow } from '@ds/tokens';
import { Text, Stack } from '@ds/index';

export function SpacingSection() {
  return (
    <Stack direction="vertical" gap={10}>
      <div>
        <Text variant="overline" color="muted" className="mb-5 block">Espaciado</Text>
        <Stack direction="vertical" gap={2}>
          {Object.entries(spacing).map(([key, value]) => (
            <Stack key={key} direction="horizontal" align="center" gap={4}>
              <Text variant="caption" className="font-mono w-6 shrink-0 text-ink-muted">{key}</Text>
              <div className="bg-primary rounded" style={{ width: value, height: 16 }} />
              <Text variant="caption" color="muted">{value}</Text>
            </Stack>
          ))}
        </Stack>
      </div>

      <div>
        <Text variant="overline" color="muted" className="mb-5 block">Border radius</Text>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(borderRadius).map(([key, value]) => (
            <Stack key={key} direction="vertical" align="center" gap={2}>
              <div className="w-16 h-16 bg-primary-100 border-2 border-primary" style={{ borderRadius: value }} />
              <Text variant="caption" className="font-semibold">{key}</Text>
              <Text variant="caption" color="muted">{value}</Text>
            </Stack>
          ))}
        </div>
      </div>

      <div>
        <Text variant="overline" color="muted" className="mb-5 block">Sombras</Text>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {Object.entries(shadow).filter(([k]) => k !== 'none').map(([key, value]) => (
            <Stack key={key} direction="vertical" align="center" gap={3}>
              <div className="w-20 h-20 bg-white rounded-lg" style={{ boxShadow: value }} />
              <div className="text-center">
                <Text variant="caption" className="font-semibold block">{key}</Text>
                <code className="text-[9px] text-ink-light font-mono">{value}</code>
              </div>
            </Stack>
          ))}
        </div>
      </div>
    </Stack>
  );
}
