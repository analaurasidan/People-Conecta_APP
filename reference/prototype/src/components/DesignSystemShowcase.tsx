import React, { useState } from 'react';
import {
  Button, Text, Card, Avatar, Badge, Input, Divider, BottomSheet, PhIcon, Stack, Container, tokens
} from '@/design-system';

export default function DesignSystemShowcase() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-5 sticky top-0 z-10">
        <Stack direction="horizontal" align="center" gap={3}>
          <PhIcon name="layout" size={20} className="text-primary" />
          <div>
            <Text variant="heading" as="h1">People Conecta — Design System</Text>
            <Text variant="caption" color="muted">v1.0 · Tailwind CSS v4 · Phosphor Icons</Text>
          </div>
        </Stack>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-16">

        {/* ── COLORES ── */}
        <Section title="Colores" icon="palette">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {Object.entries(tokens.colors).map(([name, hex]) => (
              <div key={name} className="flex flex-col gap-2">
                <div
                  className="h-14 rounded-lg border border-border"
                  style={{ backgroundColor: hex }}
                />
                <div>
                  <Text variant="caption" className="font-semibold block">{name}</Text>
                  <Text variant="caption" color="muted">{hex}</Text>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* ── TIPOGRAFÍA ── */}
        <Section title="Tipografía" icon="text-aa">
          <Stack direction="vertical" gap={4}>
            <TypoRow label="heading" desc="font-display · semibold · 14px">
              <Text variant="heading">Actividades cerca tuyo en Mar del Plata</Text>
            </TypoRow>
            <TypoRow label="subheading" desc="font-display · medium · 12px">
              <Text variant="subheading">Surf en Playa Grande · Domingo 9am</Text>
            </TypoRow>
            <TypoRow label="body" desc="font-sans · regular · 12px">
              <Text variant="body">Nos juntamos en el espigón sur con tabla y traje de neoprene. Principiantes bienvenidos.</Text>
            </TypoRow>
            <TypoRow label="caption" desc="font-sans · 10px">
              <Text variant="caption" color="muted">Creado por Joaquín · hace 2 horas</Text>
            </TypoRow>
            <TypoRow label="label" desc="font-sans · extrabold · uppercase · 10px">
              <Text variant="label" color="muted">Explorar actividades</Text>
            </TypoRow>
          </Stack>
        </Section>

        <Divider />

        {/* ── BOTONES ── */}
        <Section title="Botones" icon="cursor-click">
          <Stack direction="vertical" gap={6}>
            <div>
              <Text variant="label" color="muted" className="mb-3 block">Variantes</Text>
              <Stack direction="horizontal" gap={2} align="center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="primary" loading>Loading</Button>
              </Stack>
            </div>
            <div>
              <Text variant="label" color="muted" className="mb-3 block">Tamaños</Text>
              <Stack direction="horizontal" gap={2} align="center">
                <Button size="sm">Pequeño</Button>
                <Button size="md">Mediano</Button>
                <Button size="lg">Grande</Button>
              </Stack>
            </div>
            <div>
              <Text variant="label" color="muted" className="mb-3 block">Con iconos</Text>
              <Stack direction="horizontal" gap={2} align="center">
                <Button leftIcon={<PhIcon name="chat-circle-dots" />} size="sm">Chat</Button>
                <Button leftIcon={<PhIcon name="star" />} size="sm" variant="secondary">Review</Button>
                <Button leftIcon={<PhIcon name="plus" />}>Crear Plan</Button>
                <Button rightIcon={<PhIcon name="arrow-right" />} variant="ghost">Ver más</Button>
              </Stack>
            </div>
            <div>
              <Text variant="label" color="muted" className="mb-3 block">Full width</Text>
              <Button fullWidth leftIcon={<PhIcon name="map-pin" />}>
                Unirme a este plan
              </Button>
            </div>
          </Stack>
        </Section>

        <Divider />

        {/* ── CARDS ── */}
        <Section title="Cards" icon="cards">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card padding="sm" shadow="none">
              <Text variant="label" color="muted" className="mb-1 block">shadow: none</Text>
              <Text variant="body">Contenido de la card sin sombra.</Text>
            </Card>
            <Card padding="md" shadow="sm">
              <Text variant="label" color="muted" className="mb-1 block">shadow: sm</Text>
              <Text variant="body">Contenido con sombra suave.</Text>
            </Card>
            <Card padding="lg" shadow="md">
              <Text variant="label" color="muted" className="mb-1 block">shadow: md</Text>
              <Text variant="body">Contenido con sombra media.</Text>
            </Card>
          </div>
          <Card padding="md" shadow="sm" onClick={() => alert('Card clickeable!')} className="mt-4">
            <Stack direction="horizontal" gap={3} align="center">
              <PhIcon name="cursor-click" size={20} className="text-primary" />
              <Text variant="body">Esta card es clickeable — hover para ver el efecto de borde azul.</Text>
            </Stack>
          </Card>
        </Section>

        <Divider />

        {/* ── AVATARS ── */}
        <Section title="Avatars" icon="user-circle">
          <Stack direction="vertical" gap={4}>
            <div>
              <Text variant="label" color="muted" className="mb-3 block">Con imagen</Text>
              <Stack direction="horizontal" gap={3} align="center">
                <Avatar src="https://i.pravatar.cc/150?img=1" name="Joaquín" size="sm" />
                <Avatar src="https://i.pravatar.cc/150?img=2" name="Sofía" size="md" />
                <Avatar src="https://i.pravatar.cc/150?img=3" name="Martín" size="lg" />
                <Avatar src="https://i.pravatar.cc/150?img=4" name="Ana" size="xl" />
              </Stack>
            </div>
            <div>
              <Text variant="label" color="muted" className="mb-3 block">Sin imagen (iniciales)</Text>
              <Stack direction="horizontal" gap={3} align="center">
                <Avatar name="Juan Pérez" size="sm" />
                <Avatar name="María García" size="md" />
                <Avatar name="Roberto López" size="lg" />
                <Avatar name="Ana Martín" size="xl" />
              </Stack>
            </div>
          </Stack>
        </Section>

        <Divider />

        {/* ── BADGES ── */}
        <Section title="Badges" icon="tag">
          <Stack direction="vertical" gap={4}>
            <div>
              <Text variant="label" color="muted" className="mb-3 block">Variantes</Text>
              <Stack direction="horizontal" gap={2} align="center">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Aprobado</Badge>
                <Badge variant="warning">Pendiente</Badge>
                <Badge variant="error">Suspendido</Badge>
              </Stack>
            </div>
            <div>
              <Text variant="label" color="muted" className="mb-3 block">Tamaños</Text>
              <Stack direction="horizontal" gap={2} align="center">
                <Badge size="sm" variant="primary">Pequeño</Badge>
                <Badge size="md" variant="primary">Mediano</Badge>
              </Stack>
            </div>
          </Stack>
        </Section>

        <Divider />

        {/* ── INPUTS ── */}
        <Section title="Inputs" icon="text-cursor">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            <Input
              label="Nombre"
              placeholder="Ej: María García"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <Input
              label="Zona"
              placeholder="Ej: Playa Grande"
              leftIcon={<PhIcon name="map-pin" size={14} />}
            />
            <Input
              label="Buscar"
              placeholder="Actividades, zonas..."
              leftIcon={<PhIcon name="magnifying-glass" size={14} />}
              rightIcon={<PhIcon name="x-circle" size={14} />}
            />
            <Input
              label="Email"
              placeholder="hola@ejemplo.com"
              error="Este email ya está registrado"
            />
          </div>
        </Section>

        <Divider />

        {/* ── ICONOS ── */}
        <Section title="Iconos Phosphor" icon="star-four">
          <Stack direction="vertical" gap={4}>
            <Text variant="body" color="muted">
              Usá <code className="bg-surface px-1 rounded text-ink text-xs">{'<PhIcon name="nombre" />'}</code> con cualquier ícono de{' '}
              <a href="https://phosphoricons.com" target="_blank" rel="noreferrer" className="text-primary underline">phosphoricons.com</a>
            </Text>
            <div>
              <Text variant="label" color="muted" className="mb-3 block">Regular</Text>
              <Stack direction="horizontal" gap={4} align="center">
                {['map-pin', 'chat-circle-dots', 'star', 'heart', 'user-circle', 'calendar-blank', 'magnifying-glass', 'plus', 'arrow-right', 'island'].map(name => (
                  <Stack key={name} direction="vertical" align="center" gap={1}>
                    <PhIcon name={name} size={22} className="text-ink-muted" />
                    <Text variant="caption" color="muted" className="text-center" style={{ fontSize: 9 }}>{name}</Text>
                  </Stack>
                ))}
              </Stack>
            </div>
            <div>
              <Text variant="label" color="muted" className="mb-3 block">Fill</Text>
              <Stack direction="horizontal" gap={4} align="center">
                {['map-pin', 'chat-circle-dots', 'star', 'heart', 'user-circle', 'calendar-blank'].map(name => (
                  <Stack key={name} direction="vertical" align="center" gap={1}>
                    <PhIcon name={name} style="fill" size={22} className="text-primary" />
                    <Text variant="caption" color="muted" className="text-center" style={{ fontSize: 9 }}>{name}</Text>
                  </Stack>
                ))}
              </Stack>
            </div>
          </Stack>
        </Section>

        <Divider />

        {/* ── BOTTOM SHEET ── */}
        <Section title="Bottom Sheet" icon="browser">
          <Button onClick={() => setSheetOpen(true)} leftIcon={<PhIcon name="arrow-square-up" />}>
            Abrir Bottom Sheet
          </Button>
          <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
            <div className="px-5 pb-6 pt-2">
              <Text variant="heading" as="h3" className="mb-3">Confirmar acción</Text>
              <Text variant="body" color="muted" className="mb-5">
                Esta es una Bottom Sheet con animación slideUp. Tocá el fondo oscuro o el botón para cerrarla.
              </Text>
              <Stack direction="horizontal" gap={2}>
                <Button fullWidth variant="secondary" onClick={() => setSheetOpen(false)}>Cancelar</Button>
                <Button fullWidth onClick={() => setSheetOpen(false)}>Confirmar</Button>
              </Stack>
            </div>
          </BottomSheet>
        </Section>

        <Divider />

        {/* ── STACK LAYOUT ── */}
        <Section title="Stack layout" icon="rows">
          <Stack direction="vertical" gap={4}>
            <div>
              <Text variant="label" color="muted" className="mb-2 block">Vertical (default) · gap={3}</Text>
              <Stack direction="vertical" gap={3} className="bg-surface p-4 rounded-lg">
                {['Elemento A', 'Elemento B', 'Elemento C'].map(t => (
                  <div key={t} className="bg-white border border-border rounded-lg px-3 py-2">
                    <Text variant="caption">{t}</Text>
                  </div>
                ))}
              </Stack>
            </div>
            <div>
              <Text variant="label" color="muted" className="mb-2 block">Horizontal · justify=between · align=center</Text>
              <Stack direction="horizontal" justify="between" align="center" className="bg-surface p-4 rounded-lg">
                <Text variant="subheading">Título del plan</Text>
                <Badge variant="primary">Activo</Badge>
              </Stack>
            </div>
          </Stack>
        </Section>

        <div className="h-10" />
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <section>
      <Stack direction="horizontal" align="center" gap={2} className="mb-6">
        <PhIcon name={icon} size={18} className="text-primary" />
        <Text variant="heading" as="h2">{title}</Text>
      </Stack>
      {children}
    </section>
  );
}

function TypoRow({ label, desc, children }: { label: string; desc: string; children: React.ReactNode }) {
  return (
    <Stack direction="horizontal" align="start" gap={4}>
      <div className="w-28 shrink-0 pt-0.5">
        <Text variant="label" color="muted">{label}</Text>
        <Text variant="caption" color="muted" className="mt-0.5 leading-tight">{desc}</Text>
      </div>
      <div className="flex-1 border-l border-border pl-4">{children}</div>
    </Stack>
  );
}
