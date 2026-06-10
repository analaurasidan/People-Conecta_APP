import React, { useState } from 'react';
import { PhIcon, Text, Stack, Input } from '@ds/index';

const APP_ICONS = [
  { name: 'map-pin',          label: 'Ubicación' },
  { name: 'map-trifold',      label: 'Mapa' },
  { name: 'chat-circle-dots', label: 'Chat' },
  { name: 'chat-circle',      label: 'Chat alt' },
  { name: 'star',             label: 'Favorito' },
  { name: 'heart',            label: 'Me gusta' },
  { name: 'user-circle',      label: 'Perfil' },
  { name: 'users',            label: 'Grupo' },
  { name: 'calendar-blank',   label: 'Fecha' },
  { name: 'calendar-check',   label: 'Confirmado' },
  { name: 'magnifying-glass', label: 'Buscar' },
  { name: 'plus',             label: 'Agregar' },
  { name: 'plus-circle',      label: 'Agregar alt' },
  { name: 'arrow-left',       label: 'Volver' },
  { name: 'arrow-right',      label: 'Siguiente' },
  { name: 'x',                label: 'Cerrar' },
  { name: 'check',            label: 'Check' },
  { name: 'check-circle',     label: 'Confirmado' },
  { name: 'warning',          label: 'Alerta' },
  { name: 'info',             label: 'Info' },
  { name: 'bell',             label: 'Notificación' },
  { name: 'bell-ringing',     label: 'Alerta' },
  { name: 'gear',             label: 'Ajustes' },
  { name: 'pencil',           label: 'Editar' },
  { name: 'trash',            label: 'Eliminar' },
  { name: 'share',            label: 'Compartir' },
  { name: 'camera',           label: 'Foto' },
  { name: 'image',            label: 'Imagen' },
  { name: 'upload',           label: 'Subir' },
  { name: 'download',         label: 'Descargar' },
  { name: 'arrow-square-up',  label: 'Bottom Sheet' },
  { name: 'island',           label: 'Sin sesión' },
  { name: 'crown',            label: 'Premium' },
  { name: 'diamond',          label: 'Plus' },
  { name: 'seal-check',       label: 'Verificado' },
  { name: 'shield-check',     label: 'Seguro' },
  { name: 'lock',             label: 'Bloqueado' },
  { name: 'phone',            label: 'Teléfono' },
  { name: 'envelope',         label: 'Email' },
  { name: 'eye',              label: 'Ver' },
];

export function IconsSection() {
  const [filter, setFilter] = useState('');
  const [activeStyle, setActiveStyle] = useState<'regular' | 'fill'>('regular');
  const [activeSize, setActiveSize] = useState(20);

  const filtered = APP_ICONS.filter(i => i.name.includes(filter.toLowerCase()) || i.label.toLowerCase().includes(filter.toLowerCase()));

  return (
    <Stack direction="vertical" gap={6}>
      <div className="p-4 bg-surface rounded-lg border border-border">
        <Text variant="caption" color="muted">
          Usá <code className="bg-white px-1 py-0.5 rounded text-ink font-mono text-[10px]">{'<PhIcon name="nombre" />'}</code> para cualquier ícono. Todos los íconos disponibles en{' '}
          <a href="https://phosphoricons.com" target="_blank" rel="noreferrer" className="text-primary underline">phosphoricons.com</a>.
        </Text>
      </div>

      <Stack direction="horizontal" gap={3} align="center" wrap>
        <Input placeholder="Filtrar iconos..." leftIcon={<PhIcon name="magnifying-glass" size={13} />}
          value={filter} onChange={e => setFilter(e.target.value)} className="flex-1 min-w-[160px] max-w-xs" />
        <Stack direction="horizontal" gap={1}>
          {(['regular', 'fill'] as const).map(s => (
            <button key={s} onClick={() => setActiveStyle(s)}
              className={['px-3 py-1.5 rounded-md text-xs font-semibold transition-colors', activeStyle === s ? 'bg-primary text-white' : 'bg-white border border-border text-ink-muted'].join(' ')}>
              {s}
            </button>
          ))}
        </Stack>
        <Stack direction="horizontal" gap={1}>
          {[14, 20, 28].map(s => (
            <button key={s} onClick={() => setActiveSize(s)}
              className={['px-3 py-1.5 rounded-md text-xs font-semibold transition-colors', activeSize === s ? 'bg-primary text-white' : 'bg-white border border-border text-ink-muted'].join(' ')}>
              {s}px
            </button>
          ))}
        </Stack>
      </Stack>

      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
        {filtered.map(({ name, label }) => (
          <Stack key={name} direction="vertical" align="center" gap={1}
            className="p-2.5 bg-white rounded-lg border border-border hover:border-primary/40 hover:bg-primary-50 transition-colors cursor-default group">
            <PhIcon name={name} style={activeStyle} size={activeSize} className="text-ink-muted group-hover:text-primary transition-colors" />
            <Text variant="caption" color="muted" className="text-center leading-tight" style={{ fontSize: 9 }}>{label}</Text>
            <code className="text-[8px] text-ink-light font-mono opacity-0 group-hover:opacity-100 transition-opacity">{name}</code>
          </Stack>
        ))}
      </div>
    </Stack>
  );
}
