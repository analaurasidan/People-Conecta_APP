import React from 'react';
import { Text, Stack, Divider } from '@ds/index';

function TypoRow({ variant, label, meta, sample }: { variant: any; label: string; meta: string; sample: string }) {
  return (
    <div className="flex items-start gap-6 py-4 border-b border-border last:border-0">
      <div className="w-32 shrink-0 pt-1">
        <Text variant="caption" className="font-semibold block">{label}</Text>
        <Text variant="caption" color="muted" className="leading-snug">{meta}</Text>
      </div>
      <Text variant={variant}>{sample}</Text>
    </div>
  );
}

export function TypographySection() {
  return (
    <Stack direction="vertical" gap={8}>
      <div>
        <Text variant="overline" color="muted" className="mb-1 block">Familias tipográficas</Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="p-5 bg-white rounded-lg border border-border">
            <Text variant="overline" color="muted" className="mb-3 block">Sans (cuerpo)</Text>
            <p className="font-sans text-2xl text-ink leading-snug">DM Sans</p>
            <p className="font-sans text-sm text-ink-muted mt-2">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
            <p className="font-sans text-sm text-ink-muted">a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
            <p className="font-sans text-sm text-ink-muted">0 1 2 3 4 5 6 7 8 9</p>
          </div>
          <div className="p-5 bg-white rounded-lg border border-border">
            <Text variant="overline" color="muted" className="mb-3 block">Display (títulos)</Text>
            <p className="font-display text-2xl font-bold text-ink leading-snug">Plus Jakarta Sans</p>
            <p className="font-display text-sm text-ink-muted mt-2">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
            <p className="font-display text-sm text-ink-muted">a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
            <p className="font-display text-sm text-ink-muted">0 1 2 3 4 5 6 7 8 9</p>
          </div>
        </div>
      </div>

      <div>
        <Text variant="overline" color="muted" className="mb-2 block">Escala de variantes</Text>
        <div className="bg-white rounded-lg border border-border px-5">
          <TypoRow variant="display"    label="display"    meta="Plus Jakarta · Bold · 24px"      sample="Conectá con gente real" />
          <TypoRow variant="heading"    label="heading"    meta="Plus Jakarta · Semibold · 15px"   sample="Actividades cerca tuyo en Mar del Plata" />
          <TypoRow variant="subheading" label="subheading" meta="Plus Jakarta · Semibold · 13px"   sample="Surf en Playa Grande · Domingo 9am" />
          <TypoRow variant="body"       label="body"       meta="DM Sans · Regular · 14px"         sample="Nos juntamos en el espigón sur con tabla y traje de neoprene. Principiantes bienvenidos." />
          <TypoRow variant="body-sm"    label="body-sm"    meta="DM Sans · Regular · 12px"         sample="Nos juntamos en el espigón sur con tabla y traje." />
          <TypoRow variant="caption"    label="caption"    meta="DM Sans · 11px"                   sample="Creado por Joaquín · hace 2 horas" />
          <TypoRow variant="label"      label="label"      meta="DM Sans · Extrabold · 10px · ALL CAPS" sample="Explorar actividades" />
          <TypoRow variant="overline"   label="overline"   meta="DM Sans · Semibold · 10px · ALL CAPS · wider" sample="Planes del mes" />
        </div>
      </div>

      <div>
        <Text variant="overline" color="muted" className="mb-4 block">Colores de texto</Text>
        <div className="flex flex-wrap gap-4">
          {([
            ['ink',     'Texto principal'],
            ['muted',   'Texto secundario'],
            ['light',   'Placeholders'],
            ['primary', 'Acción / énfasis'],
            ['success', 'Confirmación'],
            ['warning', 'Advertencia'],
            ['error',   'Error'],
          ] as const).map(([color, desc]) => (
            <div key={color} className="flex flex-col gap-0.5">
              <Text variant="body" color={color}>Texto de ejemplo</Text>
              <Text variant="caption" color="muted">{desc}</Text>
              <code className="text-[9px] text-ink-light font-mono">color="{color}"</code>
            </div>
          ))}
        </div>
      </div>
    </Stack>
  );
}
