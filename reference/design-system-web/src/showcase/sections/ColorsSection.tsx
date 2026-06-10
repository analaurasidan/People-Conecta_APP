import React from 'react';
import { colors } from '@ds/tokens';
import { Text, Stack } from '@ds/index';

function Swatch({ name, hex, isPrimary }: { name: string; hex: string; isPrimary?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={['h-10 w-full rounded-md border border-black/5', isPrimary ? 'ring-2 ring-offset-2 ring-primary' : ''].join(' ')}
        style={{ backgroundColor: hex }}
      />
      <div>
        <Text variant="caption" className="font-semibold block">{name}</Text>
        <Text variant="caption" color="muted">{hex}</Text>
      </div>
    </div>
  );
}

export function ColorsSection() {
  return (
    <Stack direction="vertical" gap={8}>
      <div>
        <Text variant="overline" color="muted" className="mb-4 block">Paleta de marca</Text>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
          {Object.entries(colors.primary).map(([key, hex]) => (
            <Swatch key={key} name={key === '500' ? 'Primary' : key} hex={hex} isPrimary={key === '500'} />
          ))}
        </div>
      </div>
      <div>
        <Text variant="overline" color="muted" className="mb-4 block">Neutros</Text>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
          {Object.entries(colors.neutral).map(([key, hex]) => (
            <Swatch key={key} name={key} hex={hex} />
          ))}
        </div>
      </div>
      <div>
        <Text variant="overline" color="muted" className="mb-4 block">Colores semánticos</Text>
        <div className="grid grid-cols-3 gap-6 max-w-sm">
          <Stack direction="vertical" gap={1}>
            <Swatch name="Success" hex={colors.success[500]} />
            <Swatch name="BG" hex={colors.success[50]} />
          </Stack>
          <Stack direction="vertical" gap={1}>
            <Swatch name="Warning" hex={colors.warning[500]} />
            <Swatch name="BG" hex={colors.warning[50]} />
          </Stack>
          <Stack direction="vertical" gap={1}>
            <Swatch name="Error" hex={colors.error[500]} />
            <Swatch name="BG" hex={colors.error[50]} />
          </Stack>
        </div>
      </div>
      <div>
        <Text variant="overline" color="muted" className="mb-4 block">Roles de color en la UI</Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
          {[
            { role: 'Background',  token: '--color-background',  hex: '#FDFAF5', use: 'Fondo base de todas las pantallas' },
            { role: 'Surface',     token: '--color-surface',     hex: '#F5EFE0', use: 'Cards secundarias, chips, tags' },
            { role: 'Border',      token: '--color-border',      hex: '#EDEDF2', use: 'Líneas divisorias, bordes de inputs' },
            { role: 'Ink',         token: '--color-ink',         hex: '#362E1C', use: 'Texto principal' },
            { role: 'Ink Muted',   token: '--color-ink-muted',   hex: '#574B30', use: 'Texto secundario, labels' },
            { role: 'Ink Light',   token: '--color-ink-light',   hex: '#B0B0BC', use: 'Placeholders, iconos inactivos' },
          ].map(({ role, token, hex, use }) => (
            <div key={role} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-border">
              <div className="w-8 h-8 rounded-md shrink-0 border border-black/5" style={{ backgroundColor: hex }} />
              <div className="min-w-0">
                <Text variant="caption" className="font-semibold block">{role}</Text>
                <code className="text-[10px] text-primary font-mono">{token}</code>
                <Text variant="caption" color="muted" className="block mt-0.5">{use}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Stack>
  );
}
