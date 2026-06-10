import React, { useState } from 'react';
import { Text, Stack, PhIcon } from '@ds/index';
import { ColorsSection }     from './sections/ColorsSection';
import { TypographySection } from './sections/TypographySection';
import { ButtonsSection }    from './sections/ButtonsSection';
import { CardsSection }      from './sections/CardsSection';
import { AvatarsSection }    from './sections/AvatarsSection';
import { BadgesSection }     from './sections/BadgesSection';
import { InputsSection }     from './sections/InputsSection';
import { IconsSection }      from './sections/IconsSection';
import { SpacingSection }    from './sections/SpacingSection';

type SectionId = 'colors' | 'typography' | 'spacing' | 'buttons' | 'cards' | 'avatars' | 'badges' | 'inputs' | 'icons';

const NAV: { id: SectionId; label: string; icon: string; group: string }[] = [
  { id: 'colors',     label: 'Colores',      icon: 'palette',       group: 'Fundamentos' },
  { id: 'typography', label: 'Tipografía',   icon: 'text-aa',       group: 'Fundamentos' },
  { id: 'spacing',    label: 'Espaciado',    icon: 'rulers',        group: 'Fundamentos' },
  { id: 'buttons',    label: 'Botones',      icon: 'cursor-click',  group: 'Componentes' },
  { id: 'cards',      label: 'Cards',        icon: 'cards',         group: 'Componentes' },
  { id: 'avatars',    label: 'Avatars',      icon: 'user-circle',   group: 'Componentes' },
  { id: 'badges',     label: 'Badges',       icon: 'tag',           group: 'Componentes' },
  { id: 'inputs',     label: 'Inputs',       icon: 'text-cursor',   group: 'Componentes' },
  { id: 'icons',      label: 'Iconos',       icon: 'star-four',     group: 'Assets' },
];

const SECTIONS: Record<SectionId, { title: string; desc: string; component: React.FC }> = {
  colors:     { title: 'Colores',    desc: 'Paleta completa de la marca y roles semánticos de color.',         component: ColorsSection },
  typography: { title: 'Tipografía', desc: 'Familias tipográficas, escala de variantes y pesos.',              component: TypographySection },
  spacing:    { title: 'Espaciado',  desc: 'Escala de espaciado, border-radius y sombras del sistema.',        component: SpacingSection },
  buttons:    { title: 'Botones',    desc: 'Variantes, tamaños, estados y combinaciones con iconos.',          component: ButtonsSection },
  cards:      { title: 'Cards',      desc: 'Contenedores con variantes de borde, padding y elevación.',       component: CardsSection },
  avatars:    { title: 'Avatars',    desc: 'Imágenes de perfil con fallback de iniciales y estados.',         component: AvatarsSection },
  badges:     { title: 'Badges',     desc: 'Etiquetas de estado con variantes semánticas.',                   component: BadgesSection },
  inputs:     { title: 'Inputs',     desc: 'Campos de texto con labels, iconos, helper text y errores.',      component: InputsSection },
  icons:      { title: 'Iconos',     desc: 'Librería de iconos Phosphor usados en la app (regular y fill).',  component: IconsSection },
};

export default function App() {
  const [active, setActive] = useState<SectionId>('colors');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { title, desc, component: Section } = SECTIONS[active];

  const groups = [...new Set(NAV.map(n => n.group))];

  return (
    <div className="flex min-h-screen bg-background font-sans">
      {/* ── Sidebar ── */}
      <aside className={['fixed top-0 left-0 h-full z-20 flex flex-col bg-white border-r border-border transition-all duration-200', sidebarOpen ? 'w-56' : 'w-14'].join(' ')}>
        {/* Logo */}
        <div className="px-4 py-4 border-b border-border flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <PhIcon name="intersect" size={14} className="text-white" />
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <Text variant="label" className="block leading-none">People Conecta</Text>
              <Text variant="caption" color="muted" className="block mt-0.5">Design System v1.0</Text>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 scrollbar-hide">
          {groups.map(group => (
            <div key={group} className="mb-2">
              {sidebarOpen && (
                <Text variant="overline" color="muted" className="px-4 py-2 block">{group}</Text>
              )}
              {NAV.filter(n => n.group === group).map(item => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  title={!sidebarOpen ? item.label : undefined}
                  className={[
                    'w-full flex items-center gap-3 px-4 py-2 transition-colors',
                    active === item.id
                      ? 'bg-primary-50 text-primary'
                      : 'text-ink-muted hover:bg-surface hover:text-ink',
                  ].join(' ')}
                >
                  <PhIcon
                    name={item.icon}
                    style={active === item.id ? 'fill' : 'regular'}
                    size={16}
                    className="shrink-0"
                  />
                  {sidebarOpen && (
                    <Text variant="body-sm" color="inherit" className="font-medium truncate">{item.label}</Text>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(v => !v)}
          className="px-4 py-3 border-t border-border flex items-center gap-2 text-ink-muted hover:text-primary transition-colors"
        >
          <PhIcon name={sidebarOpen ? 'sidebar-simple' : 'sidebar-simple'} size={15} />
          {sidebarOpen && <Text variant="caption" color="inherit">Colapsar</Text>}
        </button>
      </aside>

      {/* ── Main ── */}
      <main className={['flex-1 transition-all duration-200', sidebarOpen ? 'ml-56' : 'ml-14'].join(' ')}>
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-border px-8 py-4">
          <Text variant="heading" as="h1">{title}</Text>
          <Text variant="caption" color="muted" className="mt-0.5 block">{desc}</Text>
        </header>

        {/* Content */}
        <div className="px-8 py-8 max-w-4xl">
          <Section />
        </div>
      </main>
    </div>
  );
}
