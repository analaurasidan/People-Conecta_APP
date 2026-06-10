import React from 'react';
import { Badge, Text, Stack } from '@ds/index';
import { Preview } from '../Preview';

export function BadgesSection() {
  return (
    <Stack direction="vertical" gap={8}>
      <Preview label="Variantes" code={`<Badge variant="default">Default</Badge>\n<Badge variant="primary">Primary</Badge>\n<Badge variant="success">Aprobado</Badge>\n<Badge variant="warning">Pendiente</Badge>\n<Badge variant="error">Cancelado</Badge>\n<Badge variant="outline">Outline</Badge>`}>
        <Stack direction="horizontal" gap={2} align="center" wrap>
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Aprobado</Badge>
          <Badge variant="warning">Pendiente</Badge>
          <Badge variant="error">Cancelado</Badge>
          <Badge variant="outline">Outline</Badge>
        </Stack>
      </Preview>

      <Preview label="Con punto de estado (dot)" code={`<Badge variant="success" dot>Online</Badge>\n<Badge variant="warning" dot>Pendiente</Badge>`}>
        <Stack direction="horizontal" gap={2} align="center" wrap>
          <Badge variant="success" dot>Online</Badge>
          <Badge variant="warning" dot>En revisión</Badge>
          <Badge variant="error"   dot>Suspendido</Badge>
          <Badge variant="primary" dot>Activo</Badge>
          <Badge variant="default" dot>Inactivo</Badge>
        </Stack>
      </Preview>

      <Preview label="Tamaños" code={`<Badge size="sm">Small</Badge>\n<Badge size="md">Medium</Badge>`}>
        <Stack direction="horizontal" gap={2} align="center">
          <Badge size="sm" variant="primary">Small</Badge>
          <Badge size="md" variant="primary">Medium</Badge>
        </Stack>
      </Preview>

      <Preview label="Casos de uso en la app">
        <Stack direction="vertical" gap={3} className="max-w-xs">
          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-border">
            <Text variant="body-sm">Surf en Playa Grande</Text>
            <Badge variant="primary" dot>Activo</Badge>
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-border">
            <Text variant="body-sm">Joaquín Rivera</Text>
            <Badge variant="success">Aprobado</Badge>
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-border">
            <Text variant="body-sm">María López</Text>
            <Badge variant="warning" dot>En revisión</Badge>
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-border">
            <Text variant="body-sm">Conecta Plus</Text>
            <Badge variant="primary">Premium</Badge>
          </div>
        </Stack>
      </Preview>
    </Stack>
  );
}
