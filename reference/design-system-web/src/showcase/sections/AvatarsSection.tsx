import React from 'react';
import { Avatar, Text, Stack } from '@ds/index';
import { Preview } from '../Preview';

const PHOTO = 'https://i.pravatar.cc/150?img=';

export function AvatarsSection() {
  return (
    <Stack direction="vertical" gap={8}>
      <Preview label="Tamaños" code={`<Avatar size="xs" src="..." name="Ana" />\n<Avatar size="sm" src="..." name="Ana" />\n<Avatar size="md" src="..." name="Ana" />\n<Avatar size="lg" src="..." name="Ana" />\n<Avatar size="xl" src="..." name="Ana" />`}>
        <Stack direction="horizontal" gap={3} align="center">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s, i) => (
            <Stack key={s} direction="vertical" align="center" gap={1}>
              <Avatar size={s} src={`${PHOTO}${i + 1}`} name="Ana García" />
              <Text variant="caption" color="muted">{s}</Text>
            </Stack>
          ))}
        </Stack>
      </Preview>

      <Preview label="Sin foto — iniciales" code={`<Avatar name="Ana García" />\n<Avatar name="Juan P" />`}>
        <Stack direction="horizontal" gap={3} align="center">
          {['Ana García', 'Juan Pérez', 'María L', 'Roberto F', 'SO'].map((name, i) => (
            <Stack key={name} direction="vertical" align="center" gap={1}>
              <Avatar name={name} size={(['xs', 'sm', 'md', 'lg', 'xl'] as const)[i]} />
              <Text variant="caption" color="muted" className="max-w-[48px] text-center truncate">{name}</Text>
            </Stack>
          ))}
        </Stack>
      </Preview>

      <Preview label="Con estado online/offline" code={`<Avatar name="Ana" status="online" />\n<Avatar name="Juan" status="away" />\n<Avatar name="María" status="offline" />`}>
        <Stack direction="horizontal" gap={4} align="center">
          {([
            ['online',  'Online',  '1'],
            ['away',    'Away',    '2'],
            ['offline', 'Offline', '3'],
          ] as const).map(([status, label, img]) => (
            <Stack key={status} direction="vertical" align="center" gap={1}>
              <Avatar size="lg" src={`${PHOTO}${img}`} name="Ana" status={status} />
              <Text variant="caption" color="muted">{label}</Text>
            </Stack>
          ))}
        </Stack>
      </Preview>

      <Preview label="Grupo de avatares (stack)">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map(i => (
            <Avatar key={i} src={`${PHOTO}${i}`} name={`User ${i}`} size="md"
              className="ring-2 ring-white" />
          ))}
          <div className="w-10 h-10 rounded-full bg-surface border-2 border-white ring-2 ring-white flex items-center justify-center">
            <Text variant="caption" color="muted" className="font-bold">+8</Text>
          </div>
        </div>
      </Preview>
    </Stack>
  );
}
