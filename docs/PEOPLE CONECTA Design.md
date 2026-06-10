# People Conecta — Design System
**Versión:** 1.0 | **Framework:** Material Design 3 adaptado | **Metodología:** Atomic Design  
**Stack target:** React / React Native Web | **Plataforma:** Cursor / Windsurf

> **Filosofía visual:** Arena clara + océano vibrante. El producto es un gateway hacia la vida presencial.  
> El diseño debe sentirse cálido, confiable y lleno de vida — como Mar del Plata al atardecer.  
> Nunca frío, nunca corporativo, nunca una red social.

---

## ÍNDICE

1. [Design Tokens](#1-design-tokens)
2. [Tipografía](#2-tipografía)
3. [Iconografía](#3-iconografía)
4. [Motion & Elevación](#4-motion--elevación)
5. [Atoms](#5-atoms)
6. [Molecules](#6-molecules)
7. [Organisms](#7-organisms)
8. [Templates](#8-templates)
9. [Reglas de Accesibilidad](#9-reglas-de-accesibilidad)
10. [Uso en Cursor / Windsurf](#10-uso-en-cursor--windsurf)

---

## 1. DESIGN TOKENS

### 1.1 Paleta de Color — Arena + Océano

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PRIMITIVOS — No usar directamente en componentes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ARENA (Warm Sand)
  ┌─────────────────────────────────────────────────────┐
  │  sand-50   #FDFAF4   ████ Fondo principal           │
  │  sand-100  #F7F1E3   ████ Surface cards             │
  │  sand-200  #EDE3CC   ████ Dividers suaves           │
  │  sand-300  #DDD0B3   ████ Bordes                    │
  │  sand-400  #C4B48E   ████ Placeholder text          │
  │  sand-500  #A89468   ████ Texto secundario          │
  │  sand-600  #8B7550   ████ Texto body                │
  │  sand-700  #6B5A3E   ████ Texto principal           │
  │  sand-800  #4A3E2B   ████ Títulos dark              │
  │  sand-900  #2E2519   ████ On dark bg                │
  └─────────────────────────────────────────────────────┘

  OCÉANO (Ocean Teal)
  ┌─────────────────────────────────────────────────────┐
  │  ocean-50   #E6F7F7  ████ Teal surface light        │
  │  ocean-100  #B3E8E8  ████ Teal tint                 │
  │  ocean-200  #80D9D8  ████ Teal hover                │
  │  ocean-300  #4DC9C8  ████ Teal active               │
  │  ocean-400  #26BABA  ████ Primary light             │
  │  ocean-500  #00A8A8  ████ ★ PRIMARY                 │
  │  ocean-600  #008F8F  ████ Primary pressed           │
  │  ocean-700  #007070  ████ Primary dark              │
  │  ocean-800  #005555  ████ On primary                │
  │  ocean-900  #003535  ████ Deep ocean                │
  └─────────────────────────────────────────────────────┘

  CORAL (Sunset Coral)
  ┌─────────────────────────────────────────────────────┐
  │  coral-50   #FFF0ED  ████ Coral surface             │
  │  coral-100  #FFD5CC  ████ Coral tint                │
  │  coral-200  #FFAA99  ████ Coral hover               │
  │  coral-300  #FF8066  ████ Coral active              │
  │  coral-400  #FF6347  ████ ★ SECONDARY / CTA        │
  │  coral-500  #E8482E  ████ Secondary pressed         │
  │  coral-600  #CC3318  ████ Secondary dark            │
  └─────────────────────────────────────────────────────┘

  NEUTROS
  ┌─────────────────────────────────────────────────────┐
  │  neutral-0    #FFFFFF  ████ White                   │
  │  neutral-50   #F9F6F0  ████ Off-white warm          │
  │  neutral-100  #F0EBE1  ████ Surface 1               │
  │  neutral-200  #E4DDD1  ████ Surface 2               │
  │  neutral-300  #CEC5B6  ████ Outline                 │
  │  neutral-400  #B0A594  ████ Disabled                │
  │  neutral-500  #8E8070  ████ Placeholder             │
  │  neutral-600  #6B6055  ████ Subtitle                │
  │  neutral-700  #4A4138  ████ Body text               │
  │  neutral-800  #2E2822  ████ Title                   │
  │  neutral-900  #1A1512  ████ On surface              │
  └─────────────────────────────────────────────────────┘

  SEMÁNTICOS
  ┌─────────────────────────────────────────────────────┐
  │  success-main    #2D9E6B  ████ Confirmaciones       │
  │  success-light   #E8F7F1  ████ Success surface      │
  │  warning-main    #E8A020  ████ Alertas suaves       │
  │  warning-light   #FEF6E4  ████ Warning surface      │
  │  error-main      #D64040  ████ Errores              │
  │  error-light     #FAEAEA  ████ Error surface        │
  │  info-main       #4090D6  ████ Info neutral         │
  │  info-light      #EAF2FB  ████ Info surface         │
  └─────────────────────────────────────────────────────┘
```

### 1.2 Tokens Semánticos (usar SIEMPRE estos en componentes)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  COLOR ROLES — Material Design 3 adaptado
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  BRAND
  ├── color.primary             → ocean-500    #00A8A8
  ├── color.primary.container  → ocean-50     #E6F7F7
  ├── color.on-primary         → #FFFFFF
  ├── color.on-primary.container → ocean-800  #005555
  ├── color.secondary          → coral-400    #FF6347
  ├── color.secondary.container → coral-50   #FFF0ED
  ├── color.on-secondary       → #FFFFFF
  └── color.on-secondary.container → coral-600 #CC3318

  SURFACE
  ├── color.background         → sand-50      #FDFAF4
  ├── color.surface            → neutral-0    #FFFFFF
  ├── color.surface-variant    → sand-100     #F7F1E3
  ├── color.surface-container-lowest  → neutral-0
  ├── color.surface-container-low     → neutral-50  #F9F6F0
  ├── color.surface-container         → neutral-100 #F0EBE1
  ├── color.surface-container-high    → neutral-200 #E4DDD1
  └── color.surface-container-highest → neutral-300 #CEC5B6

  TEXT
  ├── color.on-surface         → neutral-800  #2E2822
  ├── color.on-surface-variant → neutral-600  #6B6055
  ├── color.outline            → neutral-300  #CEC5B6
  └── color.outline-variant    → neutral-200  #E4DDD1

  STATE LAYERS (opacidad sobre el color base)
  ├── state.hover    → 8% opacidad del on-color
  ├── state.focus    → 12% opacidad del on-color
  ├── state.pressed  → 16% opacidad del on-color
  └── state.disabled → 38% opacidad
```

### 1.3 CSS Custom Properties

```css
:root {
  /* BRAND */
  --color-primary: #00A8A8;
  --color-primary-container: #E6F7F7;
  --color-on-primary: #FFFFFF;
  --color-on-primary-container: #005555;
  --color-secondary: #FF6347;
  --color-secondary-container: #FFF0ED;
  --color-on-secondary: #FFFFFF;
  --color-on-secondary-container: #CC3318;

  /* TERTIARY (acento tierra) */
  --color-tertiary: #8B7550;
  --color-tertiary-container: #F7F1E3;
  --color-on-tertiary: #FFFFFF;
  --color-on-tertiary-container: #4A3E2B;

  /* SURFACE */
  --color-background: #FDFAF4;
  --color-surface: #FFFFFF;
  --color-surface-variant: #F7F1E3;
  --color-surface-container-lowest: #FFFFFF;
  --color-surface-container-low: #F9F6F0;
  --color-surface-container: #F0EBE1;
  --color-surface-container-high: #E4DDD1;
  --color-surface-container-highest: #CEC5B6;

  /* ON SURFACE */
  --color-on-surface: #2E2822;
  --color-on-surface-variant: #6B6055;
  --color-outline: #CEC5B6;
  --color-outline-variant: #E4DDD1;

  /* SEMANTIC */
  --color-error: #D64040;
  --color-error-container: #FAEAEA;
  --color-on-error: #FFFFFF;
  --color-success: #2D9E6B;
  --color-success-container: #E8F7F1;
  --color-warning: #E8A020;
  --color-warning-container: #FEF6E4;

  /* SCRIM & SHADOW */
  --color-scrim: rgba(26, 21, 18, 0.40);
  --color-shadow: rgba(46, 40, 34, 0.15);

  /* SPACING (base 4px) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  /* BORDER RADIUS */
  --radius-none:  0px;
  --radius-xs:    4px;
  --radius-sm:    8px;
  --radius-md:    12px;
  --radius-lg:    16px;
  --radius-xl:    24px;
  --radius-2xl:   28px;
  --radius-full:  9999px;

  /* ELEVATION (box-shadow tokens) */
  --elevation-0: none;
  --elevation-1: 0px 1px 2px rgba(46,40,34,.15);
  --elevation-2: 0px 1px 2px rgba(46,40,34,.10), 0px 2px 6px rgba(46,40,34,.12);
  --elevation-3: 0px 1px 3px rgba(46,40,34,.10), 0px 4px 8px rgba(46,40,34,.14);
  --elevation-4: 0px 2px 3px rgba(46,40,34,.10), 0px 6px 10px rgba(46,40,34,.14);
  --elevation-5: 0px 4px 4px rgba(46,40,34,.10), 0px 8px 12px rgba(46,40,34,.14);

  /* DURATION */
  --duration-short-1:  50ms;
  --duration-short-2:  100ms;
  --duration-short-3:  150ms;
  --duration-short-4:  200ms;
  --duration-medium-1: 250ms;
  --duration-medium-2: 300ms;
  --duration-medium-3: 350ms;
  --duration-medium-4: 400ms;
  --duration-long-1:   450ms;
  --duration-long-2:   500ms;
  --duration-extra-long: 700ms;

  /* EASING */
  --easing-standard:       cubic-bezier(0.2, 0, 0, 1);
  --easing-standard-decel: cubic-bezier(0, 0, 0, 1);
  --easing-standard-accel: cubic-bezier(0.3, 0, 1, 1);
  --easing-emphasized:     cubic-bezier(0.2, 0, 0, 1);
  --easing-spring:         cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 2. TIPOGRAFÍA

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  FUENTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Display / Headlines  →  "Plus Jakarta Sans"
  Body / UI            →  "DM Sans"
  Monospace            →  "JetBrains Mono" (solo datos técnicos)

  Google Fonts import:
  @import url('https://fonts.googleapis.com/css2?
    family=Plus+Jakarta+Sans:wght@400;500;600;700;800&
    family=DM+Sans:wght@300;400;500;600&
    family=JetBrains+Mono:wght@400;500&
    display=swap');

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ESCALA TIPOGRÁFICA — Material Design 3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  DISPLAY
  ┌──────────────┬────────┬────────┬──────────┬─────────────────────────────────────┐
  │  Token       │  Size  │  Line  │  Weight  │  Uso                                │
  ├──────────────┼────────┼────────┼──────────┼─────────────────────────────────────┤
  │  display-lg  │  57px  │  64px  │  700     │  Hero splash (raramente en mobile)  │
  │  display-md  │  45px  │  52px  │  700     │  Pantallas de bienvenida            │
  │  display-sm  │  36px  │  44px  │  700     │  Onboarding headings                │
  └──────────────┴────────┴────────┴──────────┴─────────────────────────────────────┘

  HEADLINE
  ┌──────────────┬────────┬────────┬──────────┬─────────────────────────────────────┐
  │  Token       │  Size  │  Line  │  Weight  │  Uso                                │
  ├──────────────┼────────┼────────┼──────────┼─────────────────────────────────────┤
  │  headline-lg │  32px  │  40px  │  700     │  Nombre del evento (card grande)    │
  │  headline-md │  28px  │  36px  │  600     │  Section titles                     │
  │  headline-sm │  24px  │  32px  │  600     │  Card title destacada               │
  └──────────────┴────────┴────────┴──────────┴─────────────────────────────────────┘

  TITLE
  ┌──────────────┬────────┬────────┬──────────┬─────────────────────────────────────┐
  │  Token       │  Size  │  Line  │  Weight  │  Uso                                │
  ├──────────────┼────────┼────────┼──────────┼─────────────────────────────────────┤
  │  title-lg    │  22px  │  28px  │  600     │  Nombre actividad en list           │
  │  title-md    │  16px  │  24px  │  600     │  Toolbar, dialogs, labels           │
  │  title-sm    │  14px  │  20px  │  600     │  Labels compactas                   │
  └──────────────┴────────┴────────┴──────────┴─────────────────────────────────────┘

  BODY
  ┌──────────────┬────────┬────────┬──────────┬─────────────────────────────────────┐
  │  Token       │  Size  │  Line  │  Weight  │  Uso                                │
  ├──────────────┼────────┼────────┼──────────┼─────────────────────────────────────┤
  │  body-lg     │  16px  │  24px  │  400     │  Descripción de evento              │
  │  body-md     │  14px  │  20px  │  400     │  Texto general, listas              │
  │  body-sm     │  12px  │  16px  │  400     │  Metadata, fechas, zonas            │
  └──────────────┴────────┴────────┴──────────┴─────────────────────────────────────┘

  LABEL
  ┌──────────────┬────────┬────────┬──────────┬─────────────────────────────────────┐
  │  Token       │  Size  │  Line  │  Weight  │  Uso                                │
  ├──────────────┼────────┼────────┼──────────┼─────────────────────────────────────┤
  │  label-lg    │  14px  │  20px  │  500     │  Buttons, tabs, chips               │
  │  label-md    │  12px  │  16px  │  500     │  Navigation labels, badges          │
  │  label-sm    │  11px  │  16px  │  500     │  Overlines, micro labels            │
  └──────────────┴────────┴────────┴──────────┴─────────────────────────────────────┘
```

```css
/* TYPOGRAPHY TOKENS */
:root {
  --font-display:    'Plus Jakarta Sans', sans-serif;
  --font-body:       'DM Sans', sans-serif;
  --font-mono:       'JetBrains Mono', monospace;

  --type-display-lg:   700 57px/64px var(--font-display);
  --type-display-md:   700 45px/52px var(--font-display);
  --type-display-sm:   700 36px/44px var(--font-display);
  --type-headline-lg:  700 32px/40px var(--font-display);
  --type-headline-md:  600 28px/36px var(--font-display);
  --type-headline-sm:  600 24px/32px var(--font-display);
  --type-title-lg:     600 22px/28px var(--font-body);
  --type-title-md:     600 16px/24px var(--font-body);
  --type-title-sm:     600 14px/20px var(--font-body);
  --type-body-lg:      400 16px/24px var(--font-body);
  --type-body-md:      400 14px/20px var(--font-body);
  --type-body-sm:      400 12px/16px var(--font-body);
  --type-label-lg:     500 14px/20px var(--font-body);
  --type-label-md:     500 12px/16px var(--font-body);
  --type-label-sm:     500 11px/16px var(--font-body);
}
```

---

## 3. ICONOGRAFÍA

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SISTEMA DE ÍCONOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Librería:  Material Symbols Rounded (Google)
  Tamaños:   20px (compact) | 24px (default) | 40px (featured)
  Optical:   opsz=24 para 24px, opsz=20 para 20px
  Fill:      0 = outlined | 1 = filled (estado activo)
  Weight:    400 (default) | 600 (emphasis)

  ÍCONOS CLAVE del producto:
  ┌─────────────────────────────────────────────────────┐
  │  Explorar         →  explore                        │
  │  Mis eventos      →  event                          │
  │  Perfil           →  person                         │
  │  Categoría deporte →  sports_soccer                 │
  │  Categoría música →  music_note                     │
  │  Categoría cocina →  restaurant                     │
  │  Categoría idiomas →  translate                     │
  │  Categoría cine   →  movie                          │
  │  Categoría arte   →  palette                        │
  │  Categoría juegos →  sports_esports                 │
  │  Categoría naturaleza → hiking                      │
  │  Ubicación        →  location_on                    │
  │  Fecha            →  calendar_month                 │
  │  Hora             →  schedule                       │
  │  Personas / cupos →  group                          │
  │  Verificado       →  verified                       │
  │  Rating star      →  star                           │
  │  Me anoto / CTA   →  add_circle                     │
  │  Confirmado       →  check_circle                   │
  │  No-show          →  cancel                         │
  │  Organizar        →  manage_accounts                │
  │  Free             →  workspace_premium              │
  │  Filtros          →  tune                           │
  │  Buscar           →  search                         │
  │  Notif            →  notifications                  │
  │  Share            →  share                          │
  │  Back             →  arrow_back                     │
  │  Menu             →  menu                           │
  │  Close            →  close                          │
  └─────────────────────────────────────────────────────┘

  TAMAÑOS SEGÚN CONTEXTO:
  ├── Nav bar icons:        24px filled cuando activo, outlined inactivo
  ├── Inside buttons:       18px, misma línea que label
  ├── Featured / empty states: 48px, color primary o surface-variant
  └── Metadata inline:     16px, color on-surface-variant
```

---

## 4. MOTION & ELEVACIÓN

### 4.1 Principios de Animación

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MOTION — People Conecta
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  FILOSOFÍA:
  "El movimiento debe sentirse como oleaje suave,
  nunca brusco. La app conecta personas; la transición
  entre pantallas debe sentirse como caminar hacia alguien."

  TRANSICIONES DE PANTALLA:
  ├── Forward navigation:  Shared Axis X, slide left 300ms easing-standard
  ├── Back navigation:     Shared Axis X, slide right 250ms easing-standard
  ├── Modal / bottom sheet: Fade + slide up 400ms easing-standard-decel
  ├── Dialog:              Container transform 300ms easing-emphasized
  └── Tab switch:          Fade through 200ms easing-standard

  MICRO-INTERACTIONS:
  ├── Button press:        Scale 0.96, 150ms easing-standard
  ├── Card tap:            Ripple + scale 0.98, 200ms easing-standard
  ├── Chip select:         Background fill 150ms + icon fade in 100ms
  ├── FAB appearance:      Scale 0→1 + fade 300ms easing-spring
  ├── Badge count:         Number flip 200ms easing-spring
  └── Star rating tap:     Scale 1→1.3→1 200ms easing-spring (cada estrella)

  ESTADOS DE CARGA:
  ├── Skeleton:            Shimmer de arena-100 a sand-200, 1.5s loop
  ├── Refresh pull:        Arc circular primary color
  └── Button loading:      Spinner 20px reemplaza label

  REGLA GENERAL:
  ├── Duración máxima pantalla completa:  400ms
  ├── Duración micro-interacción:         100–200ms
  ├── Nunca usar bounce exagerado en navigation (solo en celebration states)
  └── Reducir movimiento si prefers-reduced-motion está activo
```

### 4.2 Elevación

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ELEVACIÓN — Tonal + Shadow híbrido (MD3)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Nivel 0  →  Sin sombra. Background. Color: surface
  Nivel 1  →  Cards en reposo. Shadow elevation-1. 
              Tonal overlay: 5% primary sobre surface
  Nivel 2  →  Cards hover / FAB reposo.
              Tonal overlay: 8% primary sobre surface
  Nivel 3  →  Nav drawer, side panel.
              Tonal overlay: 11% primary sobre surface
  Nivel 4  →  FAB pressed, Modal header fijo.
              Tonal overlay: 12% primary sobre surface
  Nivel 5  →  Bottom sheets, dialogs.
              Tonal overlay: 14% primary sobre surface

  NOTA: En modo claro, usar preferentemente tonal overlay.
  Las sombras refuerzan la elevación solo en cards flotantes.
```

---

## 5. ATOMS

Los átomos son los elementos visuales más pequeños e indivisibles.

### 5.1 Color Token (uso visual)

```
  ████ color.primary              Botones primarios, links activos
  ████ color.secondary            CTAs de acción urgente ("Me anoto")
  ████ color.background           Fondo de pantalla
  ████ color.surface              Cards, sheets, dialogs
  ████ color.surface-variant      Input backgrounds, chips inactivos
  ████ color.on-surface           Texto principal
  ████ color.on-surface-variant   Texto secundario, metadata
  ████ color.outline              Bordes de inputs, dividers
  ████ color.success              Confirmado, asistió
  ████ color.warning              Pocos cupos disponibles
  ████ color.error                No-show, error
```

### 5.2 Typography Atom

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TEXTO — Jerarquía visual
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌────────────────────────────────────────────────────┐
  │                                                    │
  │  Surf en Mar del Plata              ← headline-sm  │
  │  Domingo 8 de junio · 9:00 AM       ← body-sm     │
  │  Playa Grande, 3 cupos disponibles  ← body-sm      │
  │                                                    │
  │  DEPORTE                            ← label-sm     │
  │  (overline, uppercase, tracking +2) │              │
  └────────────────────────────────────────────────────┘

  REGLAS:
  ├── Max 2 pesos de fuente por pantalla
  ├── Contraste mínimo: 4.5:1 para body, 3:1 para headlines grandes
  ├── Nunca justificar texto en mobile
  └── Line clamp en cards: 2 líneas para título, 3 para descripción
```

### 5.3 Icon Atom

```
  TAMAÑOS ESTANDARIZADOS:
  ├──  16px → Metadata inline (junto a texto body-sm)
  ├──  20px → Compact: inside chips, small buttons
  ├──  24px → Default: navigation, standalone
  ├──  40px → Featured: empty states, ilustraciones
  └──  48px → Hero: pantallas de celebration

  COLORES DE ÍCONOS:
  ├── Activo/Primary    →  color.primary
  ├── Acción secundaria →  color.secondary
  ├── Neutral/body      →  color.on-surface-variant
  ├── Desactivado       →  color.on-surface a 38%
  ├── Sobre primary bg  →  color.on-primary
  └── Success/Error     →  color.success / color.error
```

### 5.4 Divider

```css
/* Divider Atom */
.divider {
  height: 1px;
  background: var(--color-outline-variant);
  /* Uso: entre secciones de lista, cards, formularios */
}
.divider--inset {
  margin-left: 72px; /* alineado con avatar + padding */
}
.divider--full-bleed {
  margin: 0 -16px; /* rompe el padding del contenedor */
}
```

### 5.5 Badge

```
  ┌─────────────────────────────────┐
  │  TIPOS:                         │
  │                                 │
  │  ● Sin número  →  8px circle    │
  │  ● Con número  →  16px pill     │
  │  ● Con texto   →  "NUEVO" chip  │
  │                                 │
  │  COLOR:                         │
  │  ├── Urgente   →  coral-400     │
  │  ├── Info      →  ocean-500     │
  │  └── Success   →  success-main  │
  └─────────────────────────────────┘

  Posición: top-right del ícono padre, offset -4px -4px
  Borde: 2px solid color.surface (para contraste sobre fondos)
```

### 5.6 Avatar

```
  TAMAÑOS:
  ├──  24px → Micro (lista de asistentes comprimida)
  ├──  32px → Small (dentro de chips, comentarios)
  ├──  40px → Default (listas, participantes)
  ├──  56px → Medium (perfil en cards)
  └──  80px → Large (pantalla de perfil)

  ESTADOS:
  ├── Con foto:        Imagen circular, object-fit cover
  ├── Sin foto:        Inicial del nombre, bg primary-container
  ├── Verificado:      Badge verified 16px en bottom-right
  ├── Conecta Plus:    Ring 2px solid coral-400
  └── Organizador:     Badge "ORG" pill en bottom

  STACK DE AVATARES (asistentes):
  Máximo 4 visibles + "+N" si hay más.
  Overlap: -8px entre cada uno.
  Border: 2px solid color.surface
```

### 5.7 Skeleton Loader

```css
/* Skeleton shimmer */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface-container-low)     25%,
    var(--color-surface-container)         50%,
    var(--color-surface-container-low)     75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  border-radius: var(--radius-sm);
}
/* Variantes */
.skeleton--text    { height: 16px; width: 100%; }
.skeleton--title   { height: 22px; width: 70%; }
.skeleton--avatar  { width: 40px; height: 40px; border-radius: 50%; }
.skeleton--image   { width: 100%; height: 180px; }
```

---

## 6. MOLECULES

Las moléculas combinan átomos para crear componentes reutilizables con función propia.

### 6.1 Button

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  BUTTONS — 5 variantes MD3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  1. FILLED (CTA primaria)
  ┌──────────────────────────────────┐
  │  ●  Me anoto                     │
  └──────────────────────────────────┘
  bg: primary | text: on-primary | radius: full
  height: 56px (mobile) | padding: 0 24px
  Uso: "Me anoto", "Confirmar", "Continuar"

  2. FILLED TONAL (CTA secundaria)
  ┌──────────────────────────────────┐
  │  ●  Ver participantes            │
  └──────────────────────────────────┘
  bg: secondary-container | text: on-secondary-container
  height: 56px | padding: 0 24px | radius: full
  Uso: acciones importantes no destructivas

  3. OUTLINED (acción neutra)
  ┌──────────────────────────────────┐
  │     Cancelar inscripción         │
  └──────────────────────────────────┘
  border: 1px outline | text: primary | bg: transparent
  height: 48px | radius: full
  Uso: acciones secundarias, cancelaciones

  4. TEXT (acción menor)
  │  Ver todos los eventos →         │
  text: primary | bg: transparent | no border
  height: 40px | padding: 0 12px
  Uso: links in-context, "ver más"

  5. ELEVATED (acción contextual flotante)
  ┌──────────────────────────────────┐
  │  🔍  Explorar categorías         │
  └──────────────────────────────────┘
  bg: surface | shadow: elevation-1 | text: primary
  height: 48px | radius: full
  Uso: acciones flotantes sobre mapa o hero

  ESTADOS (todos los tipos):
  ├── Default:   sin overlay
  ├── Hover:     +8% on-color overlay
  ├── Focus:     +12% on-color overlay + ring 3px primary/50%
  ├── Pressed:   +16% on-color overlay + scale 0.96
  ├── Loading:   label oculto + spinner 20px centrado
  └── Disabled:  on-surface 38% + bg on-surface 12%

  TAMAÑOS:
  ├── Large:  height 56px | label-lg | icon 20px
  ├── Medium: height 48px | label-lg | icon 18px
  └── Small:  height 36px | label-md | icon 16px

  CON ÍCONO (leading icon):
  │  ✓  Me anoto al plan  │
  gap entre ícono y label: 8px
  padding-left reducido: 16px (vs 24px sin ícono)
```

### 6.2 Input Field

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TEXT FIELD — MD3 Filled + Outlined
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  FILLED (default en formularios)
  ┌────────────────────────────────────┐
  │ Nombre                             │
  │ ┌──────────────────────────────┐   │
  │ │  Santiago                    │   │
  │ └──────────────────────────────┘   │
  │ ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾ │
  └────────────────────────────────────┘
  bg: surface-container-highest
  border-bottom: 1px outline → 2px primary al focus
  label: title-sm flotante arriba al focus
  height: 56px | radius-top: radius-sm | radius-bottom: 0

  OUTLINED (búsquedas, filtros)
  ┌────────────────────────────────────┐
  │  ○  Buscar actividades...          │
  └────────────────────────────────────┘
  border: 1px outline → 2px primary al focus
  label: title-sm en borde superior
  height: 56px | radius: radius-sm

  ESTADOS:
  ├── Empty:    label centrado (placeholder)
  ├── Focused:  label arriba, border primary, caret primary
  ├── Filled:   label arriba, border outline
  ├── Error:    border error, label error, helper text rojo
  ├── Success:  trailing icon check, border success
  └── Disabled: bg + text a 38%

  VARIANTES ESPECIALES:
  ├── Search bar: leading icon 🔍, trailing icon clear ✕
  ├── Date picker: trailing icon calendar
  ├── Counter:    trailing text "X/200" para textareas
  └── Phone:      leading prefix "+54", teclado numérico
```

### 6.3 Chip

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CHIPS — Filtros e intereses
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  1. FILTER CHIP (selección de filtros)
  ┌───────────────┐   ┌────────────────┐
  │  🎵  Música   │   │ ✓  🎵  Música  │
  └───────────────┘   └────────────────┘
     inactivo               activo
  inactivo: border outline, bg transparent, text on-surface-variant
  activo:   bg secondary-container, text on-secondary-container, leading check

  2. ASSIST CHIP (acciones contextuales)
  ┌───────────────────────────┐
  │  📍  Playa Grande         │
  └───────────────────────────┘
  bg: surface | border: outline | leading icon 16px
  Uso: zona de evento, tags informativos

  3. INPUT CHIP (tags en perfil / intereses)
  ┌───────────────┐
  │  Surf    ✕    │
  └───────────────┘
  bg: secondary-container | trailing icon close 16px
  Uso: intereses seleccionados en perfil

  4. SUGGESTION CHIP (onboarding)
  ┌───────────────┐
  │  🏄  Deporte  │
  └───────────────┘
  bg: surface-variant | radius: full
  Tamaño grande: height 40px, label-lg

  TAMAÑOS:
  ├── Compact: height 28px | label-sm | icon 14px
  ├── Default: height 32px | label-md | icon 16px
  └── Large:   height 40px | label-lg | icon 18px

  LAYOUT:
  Chips en contenedor con flex-wrap, gap 8px
  En horizontal scroll (filtros): no wrap, overflow-x auto, padding 0 16px
```

### 6.4 Card Base

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CARD — Estructura base
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  3 variantes MD3:
  
  ELEVATED:   bg surface + elevation-1 → elevation-2 hover
  FILLED:     bg surface-container-low, sin sombra
  OUTLINED:   bg surface + border outline-variant

  ANATOMÍA INTERNA:
  ┌──────────────────────────────────────┐
  │  [Imagen / Media — opcional]         │  ← 180px height
  ├──────────────────────────────────────┤
  │  Header region                       │  ← padding 16px top
  │    Título (title-lg)                 │
  │    Subtítulo (body-sm, variant)      │
  ├──────────────────────────────────────┤
  │  Content region                      │  ← padding h 16px
  │    Descripción (body-md)             │
  ├──────────────────────────────────────┤
  │  Footer region                       │  ← padding 16px bottom
  │    Metadata + Actions                │
  └──────────────────────────────────────┘

  Propiedades:
  border-radius: radius-xl (12px)
  overflow: hidden
  Estado hover: elevation +1, cursor pointer
  Ripple: color.on-surface a 12% al tap
```

### 6.5 List Item

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  LIST ITEM — Participantes, eventos en lista
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌──────────────────────────────────────────┐
  │  [Avatar 40]  Nombre          [Trailing] │
  │               Subtítulo                  │
  │               [Chips de interés]         │
  └──────────────────────────────────────────┘

  Altura mínima: 56px (sin chips), 72px (con chips)
  Leading: avatar o ícono 40px
  Content: title-md + body-sm + chips opcionales
  Trailing: ícono 24px, text label-md, o switch

  VARIANTES:
  ├── 1-línea:  height 56px, solo headline
  ├── 2-líneas: height 72px, headline + subtext
  └── 3-líneas: height 88px, headline + 2 líneas subtext
```

### 6.6 Navigation Bar Item

```
  ┌──────────────────────────────────────────────────┐
  │                                                  │
  │    [ícono]       [ícono]       [ícono]           │
  │    Explorar      Mis eventos   Perfil             │
  │                                                  │
  └──────────────────────────────────────────────────┘

  Ancho: igual distribución (100% / n tabs)
  Ícono: 24px, filled cuando activo
  Indicator pill: 64px wide, 32px height, bg primary-container
  Label: label-md, visible siempre (MD3)
  Active color: on-secondary-container (sobre indicator) + primary (ícono)
  Inactive color: on-surface-variant
```

### 6.7 Rating Stars

```
  ┌─────────────────────────────────────┐
  │  ★ ★ ★ ★ ☆   4.2  (28 reseñas)    │
  └─────────────────────────────────────┘

  Star filled:   #FFB830 (ámbar cálido, no amarillo puro)
  Star empty:    outline-variant
  Tamaño: 16px (compacto en card), 20px (pantalla de detalle)
  Label: body-sm bold + body-sm regular + on-surface-variant

  INTERACTIVO (review post-evento):
  Estrellas 24px, con animación scale 1→1.3→1 al seleccionar
  Cada estrella hace fill progresivo hacia la izquierda
```

### 6.8 Progress Indicator

```
  LINEAL (cupos disponibles):
  ━━━━━━━━━━━━━━━████████░░░░   6/10 cupos
  
  Barra: height 8px, radius full
  Fill: primary (neutral) → warning (≤30% cupos) → error (último)
  bg: surface-container-highest

  CIRCULAR (carga):
  ○ → Spinner 24px, stroke primary, 2px
  Animación: rotación 360° en 1s linear infinito

  STEP (onboarding 3 pasos):
  ● ─── ○ ─── ○
  Dot activo: 12px primary
  Dot inactivo: 8px outline
  Dot completado: 12px success + check 8px
  Línea: 1px outline
```

### 6.9 Toggle / Switch

```
  OFF:   ○────    bg: surface-container-highest, thumb: outline
  ON:    ────●    bg: primary, thumb: on-primary

  Dimensiones: 52px wide × 32px height
  Thumb: 24px (off) → 28px (on), con spring animation
  Transición: 200ms easing-spring

  USO EN PEOPLE CONECTA:
  ├── Filtro "Solo grupos de mi género"
  ├── Recibir recordatorios por email
  └── Perfil visible para otros asistentes
```

---

## 7. ORGANISMS

Los organismos son secciones completas y funcionales de la UI.

### 7.1 Event Card (Card de Evento)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  EVENT CARD — Componente central del producto
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  VARIANTE ESTÁNDAR (lista):
  ┌─────────────────────────────────────────────────┐
  │  ┌───────────────────────────────────────────┐  │
  │  │          IMAGEN / PLACEHOLDER             │  │
  │  │   ┌──────────┐              ┌──────────┐  │  │
  │  │   │  DEPORTE │              │ 3 cupos  │  │  │
  │  │   └──────────┘              └──────────┘  │  │
  │  └───────────────────────────────────────────┘  │
  │                                                 │
  │  Surf al atardecer                   headline   │
  │  📍 Playa Grande  ·  Dom 8 jun  ·  18:00        │
  │                                                 │
  │  ┌──────────────────────────────────────────┐   │
  │  │  [AV][AV][AV] +2 van  ·  ★ 4.8 María    │   │
  │  └──────────────────────────────────────────┘   │
  │                                                 │
  │                         [   Me anoto   ]        │
  └─────────────────────────────────────────────────┘

  ANATOMÍA DETALLADA:
  ┌─────────────────────────────────────────────────┐
  │  MEDIA (opcional, 180px height)                 │
  │  ├── bg: surface-container si sin imagen        │
  │  ├── Chip categoría: top-left, 12px padding     │
  │  └── Chip cupos: top-right                      │
  │      · verde: >3 cupos                          │
  │      · ámbar: ≤3 cupos ("¡Últimos cupos!")      │
  │      · coral: 1 cupo ("¡Último lugar!")         │
  ├─────────────────────────────────────────────────┤
  │  CONTENT (padding 16px)                         │
  │  ├── Título: title-lg, 2 líneas max             │
  │  ├── Metadata row (body-sm, on-surface-variant):│
  │  │   📍 Zona  ·  📅 Día  ·  🕐 Hora            │
  │  └── gap: 8px                                   │
  ├─────────────────────────────────────────────────┤
  │  FOOTER (padding 16px, gap 8px)                 │
  │  ├── Stack avatares (max 4) + "N van"           │
  │  ├── Separador "·"                              │
  │  ├── ★ Rating organizador + nombre              │
  │  └── Button "Me anoto" (filled, small)          │
  └─────────────────────────────────────────────────┘

  ESTADO ESPECIAL — "Sé el primero":
  ├── Sin avatares: reemplazar por ilustración pequeña
  ├── Label: "Sé el primero en anotarte 🌊"
  └── Chip cupos: estilo outlined, texto on-surface-variant

  VARIANTE COMPACTA (horizontal scroll):
  ┌──────────────────────────┐
  │  [IMAGEN 120x120]        │
  │  Título (2 líneas)       │
  │  📍 Zona · 📅 Fecha      │
  │  ★ 4.8  [3 cupos]       │
  └──────────────────────────┘
  width: 200px | Scroll horizontal en sección "Esta semana"
```

### 7.2 Navigation Bar

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  BOTTOM NAVIGATION BAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌─────────────────────────────────────────────────┐
  │                                                 │
  │    [🧭]         [📅]         [👤]              │
  │   Explorar    Mis planes    Mi perfil           │
  │                                                 │
  └─────────────────────────────────────────────────┘

  bg: surface + elevation-2 (shadow top)
  height: 80px + safe area bottom (para notch)
  border-top: 1px outline-variant (alternativa a shadow)
  
  Ítems: 3 (MVP) — no usar más de 5
  Label: siempre visible (MD3)
  
  PARA ORGANIZADORES (vista alternativa):
  ┌─────────────────────────────────────────────────┐
  │    [🧭]       [➕]       [📋]       [👤]       │
  │  Explorar   Publicar  Mis eventos  Mi perfil    │
  └─────────────────────────────────────────────────┘
  El botón "Publicar" usa color secondary (coral) en el indicator
```

### 7.3 Top App Bar

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TOP APP BAR — 4 variantes MD3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  1. CENTER ALIGNED (pantalla principal Explorar)
  ┌─────────────────────────────────────────────────┐
  │   [Avt]      People Conecta          [🔔]       │
  └─────────────────────────────────────────────────┘
  Logo: display-sm o logotipo SVG | altura total: 64px

  2. SMALL (pantallas secundarias)
  ┌─────────────────────────────────────────────────┐
  │   [←]   Detalles del evento          [♡] [↗]   │
  └─────────────────────────────────────────────────┘
  altura: 64px | title-lg alineado al leading icon

  3. MEDIUM (pantalla de categoría)
  ┌─────────────────────────────────────────────────┐
  │  [←]                                 [filtros]  │
  │                                                 │
  │  Actividades de Deporte                         │
  └─────────────────────────────────────────────────┘
  altura: 112px | headline colapsa a small al scroll

  4. LARGE (pantalla de perfil organizador)
  ┌─────────────────────────────────────────────────┐
  │  [←]                                            │
  │                                                 │
  │                                                 │
  │  María Organizadora                             │
  └─────────────────────────────────────────────────┘
  altura: 152px | con imagen de fondo opcional

  COLOR:
  ├── Default: bg surface | color on-surface
  └── On scroll: bg surface + elevation-2 (tonal)
```

### 7.4 Filter Bar

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  FILTER BAR — Exploración de eventos
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌─────────────────────────────────────────────────┐
  │  [🔍 Buscar actividades...]                     │
  ├─────────────────────────────────────────────────┤
  │  [⚙ Filtros] [Deporte ✓] [Música] [Cocina] →  │
  └─────────────────────────────────────────────────┘

  SEARCH BAR:
  bg: surface-container-highest | radius: full
  height: 56px | leading icon 🔍 primary | trailing icon 🎙 optional
  padding: 0 16px

  CHIP ROW:
  overflow-x: auto, no scrollbar visible
  padding: 12px 16px | gap: 8px
  sticky: top 64px (bajo top app bar)
  
  FILTER SHEET (al tocar "Filtros"):
  Modal bottom sheet con:
  ├── Categoría: chips grid 2 columnas
  ├── Zona: input outlined + chips de barrios
  ├── Días: chips lunes–domingo
  ├── Tamaño: segmented button (≤6 / ≤12 / +12)
  ├── Precio: toggle gratuito/pago
  └── CTA: "Ver X eventos" (filled, full width)
```

### 7.5 Event Detail Organism

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PANTALLA DETALLE DE EVENTO (scroll vertical)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌─────────────────────────────────────────────────┐
  │          IMAGEN / HERO (240px)                  │
  │  [← Back]                          [♡]  [↗]   │
  └─────────────────────────────────────────────────┘
  │  [CATEGORÍA CHIP]                               │
  │  Nombre del evento (headline-md)                │
  │                                                 │
  │  ┌────────────────────────────────────────┐     │
  │  │  📅  Domingo, 8 de junio · 18:00       │     │
  │  │  📍  Playa Grande, Mar del Plata       │     │
  │  │  👥  6/10 cupos (4 disponibles)        │     │
  │  │  [████████░░░░] barra de cupos         │     │
  │  └────────────────────────────────────────┘     │
  │                                                 │
  │  ─── Sobre este plan ───                        │
  │  Descripción (body-lg, hasta 200 chars)         │
  │                                                 │
  │  ─── Organizador ───────────────────────────    │
  │  [AV]  María Fernández          ★ 4.8 (28)     │
  │        Verified · 12 eventos               │   │
  │                                                 │
  │  ─── Quiénes van ──────────────────────────     │
  │  [AV] Santiago  ·  Surf, Cine               │   │
  │  [AV] Valentina ·  Cocina, Música           │   │
  │  [AV] Tomás     ·  Deporte, Arte            │   │
  │  "Sé el 4to en anotarte"                        │
  │                                                 │
  │                         [     Me anoto     ]    │
  │              (sticky en bottom al scroll)       │
  └─────────────────────────────────────────────────┘

  STICKY FOOTER:
  ├── bg surface + top border outline-variant
  ├── Botón "Me anoto" full width - 32px margin
  ├── Texto micro: "Podés cancelar hasta 24h antes"
  └── height: 88px + safe area bottom
```

### 7.6 Onboarding Flow

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ONBOARDING — 3 pasos
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  PASO 1 — ¿Por qué estás acá?
  ┌─────────────────────────────────────────────────┐
  │                     ● ─ ○ ─ ○                  │
  │                                                 │
  │  [Ilustración: persona llegando a ciudad]       │
  │                                                 │
  │  ¿Qué te trajo por acá?          headline-sm   │
  │  Contanos un poco para mostrarte               │
  │  lo que más te sirve             body-md       │
  │                                                 │
  │  ┌───────────────────────────────────────────┐  │
  │  │  🏙  Llegué nuevo a la ciudad             │  │
  │  ├───────────────────────────────────────────┤  │
  │  │  🔄  Estoy en una nueva etapa             │  │
  │  ├───────────────────────────────────────────┤  │
  │  │  🌿  Quiero salir más de casa             │  │
  │  ├───────────────────────────────────────────┤  │
  │  │  ✨  Otra razón                           │  │
  │  └───────────────────────────────────────────┘  │
  │                                                 │
  └─────────────────────────────────────────────────┘
  Opciones: list items con leading icon + radio
  Al seleccionar → avanza solo (sin botón)

  PASO 2 — ¿Qué te interesa?
  Grid 2×4 de suggestion chips grandes con ícono
  ┌────────────────┐  ┌────────────────┐
  │ ⚽  Deporte    │  │ 🎵  Música     │
  └────────────────┘  └────────────────┘
  Selección múltiple. Al menos 1. Botón "Siguiente"

  PASO 3 — Tu zona y disponibilidad
  ├── Input zona: outlined con location icon
  ├── Label "¿Qué días solés tener tiempo?"
  └── Chips días semana: Lun Mar Mié Jue Vie Sáb Dom

  ILUSTRACIONES DE ONBOARDING:
  ├── Estilo: flat design, paleta sand + ocean
  ├── Personajes: siluetas sin rostro definido (inclusividad)
  └── Formato: SVG inline para performance
```

### 7.7 Profile Card Organism

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PERFIL DE USUARIO (vista pública)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌─────────────────────────────────────────────────┐
  │  ┌──────────────────────────────────────────┐   │
  │  │         COLOR BLOCK (primary-container)  │   │
  │  │              80px height                 │   │
  │  └──────────────────────────────────────────┘   │
  │          [Avatar 80px — centrado]               │
  │         [Badge verified si aplica]              │
  │                                                 │
  │         Santiago García           title-lg     │
  │         Mar del Plata             body-sm      │
  │                                                 │
  │         [Surf] [Cine] [Cocina]    chips        │
  │                                                 │
  │  ─────────────────────────────────────────────  │
  │  12 eventos    ★ 4.9    🌱 Desde mayo 2026      │
  │  asistidos     rating   miembro                 │
  │  ─────────────────────────────────────────────  │
  │                                                 │
  │  ─── Próximos planes ──────────────────────     │
  │  [Event Card compacta]                          │
  └─────────────────────────────────────────────────┘
```

### 7.8 Empty State

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  EMPTY STATES — Ilustración + acción
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌─────────────────────────────────────────────────┐
  │                                                 │
  │           [Ilustración SVG — 160px]             │
  │                                                 │
  │      Todavía no hay eventos de Música      │
  │      headline-sm, color on-surface              │
  │                                                 │
  │   Avisanos si querés que agreguemos más    │
  │   actividades musicales.                   │
  │   body-md, color on-surface-variant             │
  │                                                 │
  │        [   Explorar otras categorías   ]        │
  │             Button text / outlined              │
  │                                                 │
  └─────────────────────────────────────────────────┘

  VARIANTES:
  ├── Sin eventos en filtro:    "Probá cambiando los filtros"
  ├── Sin inscripciones:        "Tu primer plan te espera 🌊"
  ├── Sin reviews pendientes:   "Estás al día ✓"
  └── Error de red:             "Revisá tu conexión" + retry
```

### 7.9 Review Sheet

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  POST-EVENTO REVIEW — Bottom Sheet
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌─────────────────────────────────────────────────┐
  │         ─────  (drag handle)                    │
  │                                                 │
  │  ¿Cómo estuvo el plan?           headline-sm   │
  │  Surf al atardecer — 8 de junio  body-sm       │
  │                                                 │
  │         ★ ★ ★ ★ ☆                              │
  │    Calificá a la organizadora                   │
  │                                                 │
  │  ┌──────────────────────────────────────────┐   │
  │  │  Contanos algo (opcional)...             │   │
  │  │                                          │   │
  │  └──────────────────────────────────────────┘   │
  │  ─────────────────────────────────────────────  │
  │                [   Enviar reseña   ]            │
  └─────────────────────────────────────────────────┘

  Sheet: modal, bg surface, radius-top xl, elevation-5
  Drag handle: 32px × 4px, radius full, bg outline
  Timing de apertura: 48h post-evento, via email CTA
```

---

## 8. TEMPLATES

Los templates definen el layout de pantallas completas, sin contenido real.

### 8.1 Home / Explorar

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SCREEN: HOME — Explorar eventos
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  STATUS BAR (sistema)
  ────────────────────────────────────────────────
  TOP APP BAR — Center Aligned (64px)
  │  [Avt 32]    People Conecta    [🔔]
  ────────────────────────────────────────────────
  SEARCH BAR (56px, mx 16px)
  │  [🔍  Buscar actividades...]
  ────────────────────────────────────────────────
  FILTER CHIPS (56px scroll horizontal)
  │  [⚙ Filtros] [Deporte ✓] [Música] ...
  ════════════════════════════════════════════════
  SCROLL CONTENT (flex-col, gap 24px)

  SECCIÓN: "Esta semana cerca tuyo"
  │  título-section (title-md) + "Ver todo" (text btn)
  │  [→ Scroll horizontal Event Cards compactas]

  SECCIÓN: "Sé el primero" (eventos vacíos)
  │  título-section
  │  [Event Card estándar — estado Sé el primero]

  SECCIÓN: "Por categoría"
  │  Grid 4 columnas de category chips con ícono
  │  [⚽] [🎵] [🍳] [🏔]
  │  [🎬] [🎨] [🎮] [+]

  SECCIÓN: "Todos los eventos"
  │  List de Event Cards estándar
  │  Infinite scroll / "Ver más" button

  ════════════════════════════════════════════════
  BOTTOM NAV BAR (80px + safe area)
  │  [🧭 Explorar]  [📅 Mis planes]  [👤 Perfil]
  ────────────────────────────────────────────────
  HOME INDICATOR (sistema)
```

### 8.2 Detalle de Evento

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SCREEN: EVENT DETAIL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  STATUS BAR (transparente sobre imagen)
  ────────────────────────────────────────────────
  HERO IMAGE (240px, edge-to-edge)
  │  [← Volver]                     [♡]  [↗]
  │  (iconos con bg scrim 40%)
  ════════════════════════════════════════════════
  SCROLL CONTENT (padding 16px, gap 16px)

  [Chip categoría] 
  Título del evento (headline-md)

  INFO CARD (outlined, padding 16px, gap 12px)
  │  📅  Fecha y hora
  │  📍  Zona
  │  👥  X/N cupos  [barra de progreso]

  SECCIÓN: "Sobre este plan"
  │  Descripción (body-lg)

  SECCIÓN: "Organizador"
  │  [List item: avatar + nombre + rating + chip verified]

  SECCIÓN: "Quiénes van"
  │  [List items de participantes — max 5 visible]
  │  [Button text "Ver todos"]

  ════════════════════════════════════════════════
  STICKY FOOTER (88px + safe area)
  │  "Podés cancelar hasta 24h antes" (body-sm, variant)
  │  [   Me anoto al plan   ] (filled, full width)
  ────────────────────────────────────────────────
```

### 8.3 Onboarding

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SCREEN: ONBOARDING (3 pasos)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  STATUS BAR
  ────────────────────────────────────────────────
  TOP ACTION BAR (48px)
  │  [Saltar →] (text btn, trailing)
  │  [● ─ ○ ─ ○] step dots (centrado)
  ════════════════════════════════════════════════
  CONTENT (padding 24px, centrado)

  [Ilustración SVG — 200px altura, centrado]

  Pregunta (headline-sm, centrado, mt 24px)
  Subtexto (body-md, centrado, variant, mt 8px)

  [Opciones / Chips — según el paso]
  (mt 32px)

  ════════════════════════════════════════════════
  BOTTOM (padding 24px, safe area)
  │  [   Siguiente   ] (filled, full width)
  │  Indicador de paso: "Paso 2 de 3" (label-sm, variant)
  ────────────────────────────────────────────────
```

### 8.4 Perfil de Usuario

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SCREEN: MI PERFIL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  STATUS BAR
  ────────────────────────────────────────────────
  TOP APP BAR — Small (64px)
  │  Mi perfil (title-lg)              [⚙ Ajustes]
  ════════════════════════════════════════════════
  SCROLL CONTENT

  PROFILE HEADER (bg primary-container, padding 24px)
  │  [Avatar 80px — centrado]
  │  Nombre (headline-sm, centrado)
  │  Mar del Plata (body-sm, variant, centrado)
  │  [Chip: ✓ Verificado] [Chip: Conecta Plus ★]

  STATS ROW (bg surface, padding 16px)
  │  12 asistencias  |  ★ 4.9  |  🌱 Mayo 2026

  INTERESTS SECTION (padding 16px)
  │  "Mis intereses" (title-sm)
  │  [Chip Surf] [Chip Cine] [Chip Cocina] [+ Editar]

  PRÓXIMOS PLANES (padding 16px)
  │  "Mis planes" (title-md) + "Ver historial" (text btn)
  │  [Event Cards compactas]

  PLAN FREE / PREMIUM BANNER
  Si free: card outlined con CTA "Hacete Conecta Plus"
  Si premium: card success con badge activo

  ════════════════════════════════════════════════
  BOTTOM NAV BAR
  ────────────────────────────────────────────────
```

### 8.5 Panel Organizador

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SCREEN: PANEL ORGANIZADOR — Mis eventos
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  STATUS BAR
  ────────────────────────────────────────────────
  TOP APP BAR — Small (64px)
  │  Mis eventos (title-lg)           [+ Publicar]
  ════════════════════════════════════════════════
  TABS ROW (bg surface, height 48px)
  │  [Próximos]  [Pasados]  [Borradores]
  ────────────────────────────────────────────────
  SCROLL CONTENT

  STATS SUMMARY (bg primary-container, padding 16px)
  │  15 asistentes este mes  |  ★ 4.8 promedio

  LIST DE EVENTOS PROPIOS
  │  [Event Card con actions: editar / cancelar]
  │  Badge: inscriptos confirmados
  │  Footer: [Editar] [Ver inscriptos] [Cancelar]

  FAB — Publicar nuevo evento
  │  Floating action button: [➕] (secondary)
  │  Posición: bottom-right, 16px desde edges
  │  Ocultar al scroll down, mostrar al scroll up

  ════════════════════════════════════════════════
  BOTTOM NAV BAR (variante organizador)
  ────────────────────────────────────────────────
```

---

## 9. REGLAS DE ACCESIBILIDAD

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  WCAG 2.1 AA — Mínimo requerido
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  CONTRASTE:
  ├── Texto normal (body):       mínimo 4.5:1
  ├── Texto grande (headline):   mínimo 3:1
  ├── UI components (borders):   mínimo 3:1
  └── Texto sobre primary:       verificar siempre

  COMPROBACIONES CRÍTICAS DE PALETA:
  ├── ocean-500 (#00A8A8) sobre #FFFFFF → 3.1:1  ⚠ Solo para texto grande
  ├── ocean-700 (#007070) sobre #FFFFFF → 5.1:1  ✓ Body text OK
  ├── ocean-500 sobre sand-50 → verificar (usar ocean-700 si falla)
  ├── coral-400 (#FF6347) sobre #FFFFFF → 2.9:1  ⚠ Solo como color de acción decorativo
  ├── on-primary (#FFFFFF) sobre ocean-500 → 3.1:1  ✓ Aceptable en botones grandes
  └── on-surface (#2E2822) sobre surface (#FFF) → 14:1  ✓ Excelente

  REGLA: Para texto de acción dentro de botones filled, el bg provee el contraste.
  Para texto sin bg (links, labels), usar ocean-700 en lugar de ocean-500.

  TOUCH TARGETS:
  ├── Mínimo: 48×48px (WCAG 2.5.5 AAA es 44px, usamos 48 como mínimo)
  ├── Chips: aunque visualmente pequeños, hit area mínima 48px
  ├── Icons solos: siempre con padding invisible para alcanzar 48px
  └── Spacing entre targets: mínimo 8px

  FOCUS:
  ├── Ring visible: 3px, color primary, offset 2px
  ├── Nunca outline:none sin reemplazo visible
  └── Skip to content link en web

  MOTION:
  ├── @media (prefers-reduced-motion: reduce)
  │   └── Desactivar todas las animaciones, mantener transitions 0ms
  └── No usar animaciones para transportar información crítica

  SEMÁNTICA HTML:
  ├── Buttons: <button> nunca <div onclick>
  ├── Links: <a href> para navegación
  ├── Images: alt descriptivo siempre
  ├── Inputs: siempre con <label> asociado (for/id o aria-label)
  ├── Listas: <ul>/<ol> para chips de filtro grupales
  └── Headings: jerarquía correcta h1→h2→h3, sin saltar niveles

  ARIA:
  ├── aria-selected en chips de filtro activos
  ├── aria-label en icon buttons
  ├── aria-live="polite" en mensajes de confirmación
  ├── aria-expanded en bottom sheets / dropdowns
  └── role="status" en loading states
```

---

## 10. USO EN CURSOR / WINDSURF

### Prompt de sistema sugerido para el AI editor

```
Estás construyendo People Conecta, una web app mobile-first en React.
Seguí estrictamente el archivo Design.md como fuente de verdad visual.

REGLAS CRÍTICAS:
1. SIEMPRE usar los CSS custom properties definidos en :root para colores,
   spacing, border-radius, shadow y typography.
2. NUNCA hardcodear valores de color hexadecimal directamente.
   Usar: var(--color-primary) en lugar de #00A8A8
3. El stack de fuentes es Plus Jakarta Sans (display) + DM Sans (body).
   Importar desde Google Fonts en el index.html.
4. Todos los componentes siguen Material Design 3 con la paleta customizada.
5. Mobile-first: diseñar para 390px de ancho primero.
6. Touch targets mínimos 48px de altura.
7. Usar los tokens semánticos (color.primary, color.surface, etc.)
   no los primitivos (ocean-500, sand-100).

COMPONENTES DISPONIBLES (usar como referencia):
- EventCard: card de evento con media, metadata, avatares y CTA
- FilterBar: search + chip row horizontal scroll
- BottomNavBar: 3 ítems para usuario, 4 para organizador
- TopAppBar: 4 variantes (centerAligned, small, medium, large)
- OnboardingStep: layout de paso con ilustración + opciones + CTA

PALETA RESUMIDA:
- Primary:    #00A8A8 (ocean teal)
- Secondary:  #FF6347 (sunset coral)
- Background: #FDFAF4 (warm sand)
- Surface:    #FFFFFF
- On-surface: #2E2822
- Text body:  usar on-surface / on-surface-variant

TOKENS DE SPACING: múltiplos de 4px (space-1=4px ... space-20=80px)
BORDER RADIUS: radius-sm=8px, radius-md=12px, radius-lg=16px,
               radius-xl=24px, radius-full=9999px
ELEVATION: elevation-1 (cards) → elevation-5 (dialogs/sheets)
```

### Estructura de archivos sugerida

```
src/
├── styles/
│   ├── tokens.css          ← :root con todos los CSS custom properties
│   ├── typography.css      ← clases de tipo (.type-headline-sm, etc.)
│   └── global.css          ← reset + base styles
├── components/
│   ├── atoms/
│   │   ├── Badge/
│   │   ├── Avatar/
│   │   ├── Icon/
│   │   ├── Skeleton/
│   │   └── Divider/
│   ├── molecules/
│   │   ├── Button/
│   │   ├── TextField/
│   │   ├── Chip/
│   │   ├── Card/
│   │   ├── ListItem/
│   │   ├── RatingStars/
│   │   ├── ProgressBar/
│   │   └── Toggle/
│   └── organisms/
│       ├── EventCard/
│       ├── FilterBar/
│       ├── TopAppBar/
│       ├── BottomNavBar/
│       ├── OnboardingStep/
│       ├── EventDetail/
│       ├── ProfileCard/
│       ├── ReviewSheet/
│       └── EmptyState/
├── templates/
│   ├── HomeTemplate/
│   ├── EventDetailTemplate/
│   ├── OnboardingTemplate/
│   ├── ProfileTemplate/
│   └── OrganizerTemplate/
└── pages/
    ├── Home/
    ├── EventDetail/
    ├── Onboarding/
    ├── Profile/
    └── Organizer/
```

---

## APÉNDICE — Quick Reference Visual

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CHEATSHEET — People Conecta Design System
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  COLORES CORE:
  ████ Primary    var(--color-primary)           #00A8A8
  ████ Secondary  var(--color-secondary)         #FF6347
  ████ Background var(--color-background)        #FDFAF4
  ████ Surface    var(--color-surface)           #FFFFFF
  ████ Text       var(--color-on-surface)        #2E2822
  ████ Subtle     var(--color-on-surface-variant)#6B6055
  ████ Border     var(--color-outline)           #CEC5B6
  ████ Success    var(--color-success)           #2D9E6B
  ████ Error      var(--color-error)             #D64040

  FUENTES:
  Display   →  Plus Jakarta Sans 700
  Body      →  DM Sans 400/500/600

  SPACING (grid de 4px):
  xs=4  sm=8  md=16  lg=24  xl=32  2xl=48  3xl=64

  RADIUS:
  Chips/tags=full  Cards=xl(24)  Inputs=sm(8)  Sheets=xl top

  ELEVACIÓN:
  Cards=1  Hover=2  Drawer=3  FAB=3  Dialog=5  Sheet=5

  BUTTONS:
  CTA principal   →  Filled, primary, height 56px
  CTA urgente     →  Filled, secondary (coral), height 56px
  Acción neutra   →  Outlined, height 48px
  Link in-context →  Text, height 40px

  COMPONENTES CENTRALES:
  EventCard  →  Molecule + Organism más importante del producto
  FilterBar  →  Search + Chips, sticky bajo top bar
  OnboardingStep → 3 pasos, ilustración + opciones + CTA
  BottomNavBar → Explorar / Mis planes / Mi perfil

  ACCESIBILIDAD:
  Touch target mínimo: 48×48px
  Texto body sobre fondo: ocean-700 (#007070) no ocean-500
  Focus ring: 3px solid primary, offset 2px
  Motion: respetar prefers-reduced-motion
```

---

*Design System v1.0 — People Conecta MVP — Mayo 2026*  
*Basado en Material Design 3 + Atomic Design + paleta Arena + Océano*  
*Para uso en Cursor / Windsurf como fuente de verdad visual del proyecto*
