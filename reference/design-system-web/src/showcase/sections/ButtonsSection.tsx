import React from 'react';
import { Button, Text, Stack, PhIcon, Divider } from '@ds/index';
import { Preview } from '../Preview';

export function ButtonsSection() {
  return (
    <Stack direction="vertical" gap={8}>
      <Preview label="Variantes" code={`<Button variant="primary">Primary</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="danger">Danger</Button>`}>
        <Stack direction="horizontal" gap={2} align="center" wrap>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Stack>
      </Preview>

      <Preview label="Tamaños" code={`<Button size="xs">Extra small</Button>\n<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>`}>
        <Stack direction="horizontal" gap={2} align="center" wrap>
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Stack>
      </Preview>

      <Preview label="Con iconos" code={`<Button leftIcon={<PhIcon name="map-pin" />}>Unirme</Button>\n<Button leftIcon={<PhIcon name="chat-circle-dots" />} size="sm">Chat</Button>\n<Button rightIcon={<PhIcon name="arrow-right" />} variant="ghost">Ver más</Button>`}>
        <Stack direction="horizontal" gap={2} align="center" wrap>
          <Button leftIcon={<PhIcon name="map-pin" />}>Unirme al plan</Button>
          <Button leftIcon={<PhIcon name="chat-circle-dots" />} size="sm">Chat</Button>
          <Button leftIcon={<PhIcon name="star" />} size="sm" variant="secondary">Review</Button>
          <Button rightIcon={<PhIcon name="arrow-right" />} variant="ghost">Ver más</Button>
          <Button leftIcon={<PhIcon name="plus" />} size="xs">Crear</Button>
        </Stack>
      </Preview>

      <Preview label="Estados" code={`<Button disabled>Disabled</Button>\n<Button loading>Loading</Button>`}>
        <Stack direction="horizontal" gap={2} align="center" wrap>
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </Stack>
      </Preview>

      <Preview label="Full width" code={`<Button fullWidth leftIcon={<PhIcon name="check-circle" />}>\n  Confirmar asistencia\n</Button>`}>
        <div className="max-w-xs">
          <Button fullWidth leftIcon={<PhIcon name="check-circle" />}>
            Confirmar asistencia
          </Button>
        </div>
      </Preview>
    </Stack>
  );
}
