import React from 'react';
import { Card, Text, Stack, Badge, Button, Avatar, PhIcon } from '@ds/index';
import { Preview } from '../Preview';

export function CardsSection() {
  return (
    <Stack direction="vertical" gap={8}>
      <Preview label="Variantes" code={`<Card variant="elevated">Elevated</Card>\n<Card variant="outlined">Outlined</Card>\n<Card variant="filled">Filled</Card>`}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Card variant="elevated">
            <Text variant="label" color="muted" className="mb-1 block">Elevated</Text>
            <Text variant="body-sm">Con sombra suave. Para el contenido principal.</Text>
          </Card>
          <Card variant="outlined">
            <Text variant="label" color="muted" className="mb-1 block">Outlined</Text>
            <Text variant="body-sm">Sin sombra. Solo borde.</Text>
          </Card>
          <Card variant="filled">
            <Text variant="label" color="muted" className="mb-1 block">Filled</Text>
            <Text variant="body-sm">Fondo surface. Para secciones secundarias.</Text>
          </Card>
        </div>
      </Preview>

      <Preview label="Padding" code={`<Card padding="sm">Small</Card>\n<Card padding="md">Medium</Card>\n<Card padding="lg">Large</Card>`}>
        <Stack direction="horizontal" gap={3} align="start" wrap>
          {(['sm', 'md', 'lg'] as const).map(p => (
            <Card key={p} padding={p} className="flex-1 min-w-[120px]">
              <Text variant="label" color="muted" className="block mb-1">padding="{p}"</Text>
              <Text variant="caption">Contenido</Text>
            </Card>
          ))}
        </Stack>
      </Preview>

      <Preview label="Card clickeable" code={`<Card onClick={() => alert('!')}>Clickeable</Card>`}>
        <div className="max-w-xs">
          <Card onClick={() => alert('Card clickeada!')}>
            <Stack direction="horizontal" align="center" gap={2}>
              <PhIcon name="cursor-click" size={16} className="text-primary" />
              <Text variant="body-sm">Hover para ver el efecto de borde</Text>
            </Stack>
          </Card>
        </div>
      </Preview>

      <Preview label="Ejemplo de uso — Plan card">
        <div className="max-w-sm">
          <Card variant="elevated">
            <Stack direction="horizontal" gap={3}>
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=96&h=96&fit=crop"
                className="w-14 h-14 rounded-lg object-cover border border-border shrink-0"
                alt="Playa"
              />
              <Stack direction="vertical" justify="between" className="flex-1 min-w-0">
                <div>
                  <Stack direction="horizontal" justify="between" align="start">
                    <Text variant="subheading" truncate>Surf en Playa Grande</Text>
                    <Badge variant="primary" dot>Activo</Badge>
                  </Stack>
                  <Stack direction="horizontal" gap={1} align="center" className="mt-1">
                    <PhIcon name="map-pin" size={10} className="text-ink-muted" />
                    <Text variant="caption" color="muted">Playa Grande · Dom 9am</Text>
                  </Stack>
                </div>
                <Stack direction="horizontal" justify="between" align="center" className="mt-2 pt-2 border-t border-border">
                  <Stack direction="horizontal" gap={1} align="center">
                    <Avatar name="Joaquín R" size="xs" />
                    <Text variant="caption" color="muted">Joaquín R.</Text>
                  </Stack>
                  <Button size="xs" leftIcon={<PhIcon name="chat-circle-dots" />}>Chat</Button>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </div>
      </Preview>
    </Stack>
  );
}
