# People Conecta — Design System iOS
**Versión:** 2.0 | **Plataforma:** iOS (React Native) | **Metodología:** Atomic Design
**Stack:** React Native 0.74+ | **UI Language:** iOS Human Interface Guidelines (HIG) adaptado
**Herramienta:** Cursor / Windsurf

> **Filosofía visual:** Arena clara + océano vibrante. El producto es un gateway hacia la vida presencial.
> En iOS, el diseño respeta las convenciones nativas de Apple (safe areas, Dynamic Type, SF Symbols,
> haptics) sin perder la identidad de marca de People Conecta.
> Nunca frío, nunca corporativo, nunca una red social.

---

## ÍNDICE

1. [Setup React Native + iOS](#1-setup-react-native--ios)
2. [Design Tokens RN](#2-design-tokens-rn)
3. [Tipografía iOS](#3-tipografía-ios)
4. [Iconografía SF Symbols](#4-iconografía-sf-symbols)
5. [Motion & Haptics iOS](#5-motion--haptics-ios)
6. [Safe Areas & Layout iOS](#6-safe-areas--layout-ios)
7. [Atoms RN](#7-atoms-rn)
8. [Molecules RN](#8-molecules-rn)
9. [Organisms RN](#9-organisms-rn)
10. [Templates / Screens iOS](#10-templates--screens-ios)
11. [Navegación iOS (React Navigation)](#11-navegación-ios-react-navigation)
12. [Accesibilidad iOS](#12-accesibilidad-ios)
13. [Prompt Cursor / Windsurf](#13-prompt-cursor--windsurf)
14. [Estructura de archivos](#14-estructura-de-archivos)
15. [Quick Reference](#15-quick-reference)

---

## 1. SETUP REACT NATIVE + iOS

### Dependencias clave

```bash
# Core navigation
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

# Safe area + keyboard
npm install react-native-safe-area-context
npm install react-native-keyboard-controller

# Animaciones nativas iOS
npm install react-native-reanimated   # usar SIEMPRE sobre Animated de RN
npm install react-native-gesture-handler

# Imágenes + media
npm install react-native-fast-image

# Haptics (OBLIGATORIO para iOS)
npm install react-native-haptic-feedback

# Bottom sheet (reemplaza modales)
npm install @gorhom/bottom-sheet

# Blur (glassmorphism nativo iOS)
npm install @react-native-community/blur

# Íconos SF Symbols
npm install react-native-sfsymbols
# ALTERNATIVA si SF Symbols no disponible:
npm install react-native-vector-icons  # con MaterialCommunityIcons

# Fuentes custom
npm install react-native-google-fonts
# O instalar manualmente:
# Plus Jakarta Sans + DM Sans via react-native.config.js → assets/fonts
```

### react-native.config.js

```js
module.exports = {
  assets: ['./assets/fonts'],
  // Esto copia Plus Jakarta Sans y DM Sans al bundle iOS
};
```

### Diferencias críticas Web → React Native

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  WEB (CSS)              →   REACT NATIVE (StyleSheet)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  var(--color-primary)   →   colors.primary  (objeto JS)
  px units               →   números sin unidad (dp/pt)
  box-shadow             →   shadowColor + shadowOffset +
                             shadowOpacity + shadowRadius
                             (iOS) / elevation (Android)
  border-radius: full    →   borderRadius: 9999
  overflow: hidden       →   overflow: 'hidden'  (soportado)
  position: sticky       →   NO existe → usar SectionList
                             con stickyHeaderIndices
  :hover / :active       →   Pressable con pressed state
  CSS transitions        →   react-native-reanimated
  @media queries         →   useWindowDimensions() hook
  vh / vw                →   Dimensions.get('window')
  flexbox (row default)  →   flexbox (column default en RN)
  z-index                →   zIndex (funciona igual)
  CSS variables          →   Objeto JS con tokens
  display: grid          →   NO existe → FlatList + numColumns
  gap (CSS)              →   gap soportado desde RN 0.71+
  scroll-behavior: smooth→   scrollToIndex con animated: true
```

---

## 2. DESIGN TOKENS RN

La paleta de colores es IDÉNTICA a la versión web. Solo cambia el formato: de CSS custom properties a un objeto TypeScript.

### 2.1 tokens/colors.ts

```typescript
// tokens/colors.ts
// NUNCA usar estos valores directamente en componentes.
// Usar SIEMPRE los semantic tokens de abajo.

// ─── PRIMITIVOS ───────────────────────────────────────────

export const palette = {
  // Arena (Warm Sand)
  sand50:  '#FDFAF4',  // Fondo principal
  sand100: '#F7F1E3',  // Surface cards
  sand200: '#EDE3CC',  // Dividers suaves
  sand300: '#DDD0B3',  // Bordes
  sand400: '#C4B48E',  // Placeholder text
  sand500: '#A89468',  // Texto secundario
  sand600: '#8B7550',  // Texto body / Tertiary
  sand700: '#6B5A3E',  // Texto principal
  sand800: '#4A3E2B',  // Títulos dark
  sand900: '#2E2519',  // On dark bg

  // Océano (Ocean Teal)
  ocean50:  '#E6F7F7',  // Teal surface light
  ocean100: '#B3E8E8',  // Teal tint
  ocean200: '#80D9D8',  // Teal hover
  ocean300: '#4DC9C8',  // Teal active
  ocean400: '#26BABA',  // Primary light
  ocean500: '#00A8A8',  // ★ PRIMARY
  ocean600: '#008F8F',  // Primary pressed
  ocean700: '#007070',  // Primary dark / texto accesible
  ocean800: '#005555',  // On primary
  ocean900: '#003535',  // Deep ocean

  // Coral (Sunset Coral)
  coral50:  '#FFF0ED',  // Coral surface
  coral100: '#FFD5CC',  // Coral tint
  coral200: '#FFAA99',  // Coral hover
  coral300: '#FF8066',  // Coral active
  coral400: '#FF6347',  // ★ SECONDARY / CTA urgente
  coral500: '#E8482E',  // Secondary pressed
  coral600: '#CC3318',  // Secondary dark

  // Neutros
  neutral0:   '#FFFFFF',
  neutral50:  '#F9F6F0',
  neutral100: '#F0EBE1',
  neutral200: '#E4DDD1',
  neutral300: '#CEC5B6',
  neutral400: '#B0A594',
  neutral500: '#8E8070',
  neutral600: '#6B6055',
  neutral700: '#4A4138',
  neutral800: '#2E2822',
  neutral900: '#1A1512',

  // Semánticos directos
  successMain:  '#2D9E6B',
  successLight: '#E8F7F1',
  warningMain:  '#E8A020',
  warningLight: '#FEF6E4',
  errorMain:    '#D64040',
  errorLight:   '#FAEAEA',
  infoMain:     '#4090D6',
  infoLight:    '#EAF2FB',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

// ─── SEMÁNTICOS (usar estos en componentes) ───────────────

export const colors = {
  // Brand
  primary:               palette.ocean500,
  primaryContainer:      palette.ocean50,
  onPrimary:             palette.white,
  onPrimaryContainer:    palette.ocean800,
  secondary:             palette.coral400,
  secondaryContainer:    palette.coral50,
  onSecondary:           palette.white,
  onSecondaryContainer:  palette.coral600,
  tertiary:              palette.sand600,
  tertiaryContainer:     palette.sand100,
  onTertiary:            palette.white,
  onTertiaryContainer:   palette.sand800,

  // Surface
  background:                  palette.sand50,
  surface:                     palette.neutral0,
  surfaceVariant:              palette.sand100,
  surfaceContainerLowest:      palette.neutral0,
  surfaceContainerLow:         palette.neutral50,
  surfaceContainer:            palette.neutral100,
  surfaceContainerHigh:        palette.neutral200,
  surfaceContainerHighest:     palette.neutral300,

  // Text
  onSurface:        palette.neutral800,
  onSurfaceVariant: palette.neutral600,
  outline:          palette.neutral300,
  outlineVariant:   palette.neutral200,

  // Semantic
  error:            palette.errorMain,
  errorContainer:   palette.errorLight,
  onError:          palette.white,
  success:          palette.successMain,
  successContainer: palette.successLight,
  warning:          palette.warningMain,
  warningContainer: palette.warningLight,

  // iOS específicos
  scrim:            'rgba(26, 21, 18, 0.40)',
  shadow:           'rgba(46, 40, 34, 0.15)',
  separator:        palette.neutral200,   // UIColor.separator equivalent
  groupedBackground: palette.sand50,      // iOS grouped table bg

  // Estado disabled
  disabled:         'rgba(46, 40, 34, 0.38)',
  disabledBg:       'rgba(46, 40, 34, 0.12)',
} as const;
```

### 2.2 tokens/spacing.ts

```typescript
// tokens/spacing.ts
// En React Native, TODOS los valores son números (points/dp, NO px)

export const spacing = {
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  7:  28,
  8:  32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

// Aliases semánticos
export const space = {
  xs:  spacing[1],   // 4
  sm:  spacing[2],   // 8
  md:  spacing[4],   // 16
  lg:  spacing[6],   // 24
  xl:  spacing[8],   // 32
  xxl: spacing[12],  // 48
  screenH: spacing[4],  // padding horizontal de pantalla: 16
  screenV: spacing[4],  // padding vertical de pantalla:   16
  cardPad: spacing[4],  // padding interno de cards:       16
  sectionGap: spacing[6], // gap entre secciones:         24
} as const;
```

### 2.3 tokens/radii.ts

```typescript
// tokens/radii.ts
export const radii = {
  none: 0,
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   24,
  xxl:  28,
  full: 9999,

  // Aliases semánticos
  button:    9999,  // Botones: siempre pill
  card:      24,    // Cards: xl
  chip:      9999,  // Chips: pill
  input:     8,     // Inputs: sm
  avatar:    9999,  // Avatares: círculo
  modal:     24,    // Bottom sheets: xl (top corners)
  badge:     9999,  // Badges: círculo/pill
} as const;
```

### 2.4 tokens/shadows.ts

```typescript
// tokens/shadows.ts
// En iOS los shadows se definen como objeto de propiedades separadas
// NO se usa box-shadow

import { ViewStyle } from 'react-native';

export const shadows: Record<string, ViewStyle> = {
  none: {},

  elevation1: {
    shadowColor: '#2E2822',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    // Android fallback:
    elevation: 2,
  },
  elevation2: {
    shadowColor: '#2E2822',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  elevation3: {
    shadowColor: '#2E2822',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 6,
  },
  elevation4: {
    shadowColor: '#2E2822',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 8,
  },
  elevation5: {
    shadowColor: '#2E2822',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 10,
  },
};
```

### 2.5 tokens/index.ts (barrel export)

```typescript
// tokens/index.ts
export * from './colors';
export * from './spacing';
export * from './radii';
export * from './shadows';
export * from './typography';  // ver sección 3
```

---

## 3. TIPOGRAFÍA iOS

### 3.1 Fuentes y Dynamic Type

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  FUENTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Display / Headlines  →  "PlusJakartaSans" (custom)
  Body / UI            →  "DMSans" (custom)

  INSTALACIÓN:
  1. Descargar de Google Fonts:
     - Plus_Jakarta_Sans/  (400, 500, 600, 700, 800)
     - DM_Sans/            (300, 400, 500, 600)
  2. Copiar .ttf a: assets/fonts/
  3. Agregar en react-native.config.js:
     module.exports = { assets: ['./assets/fonts'] }
  4. Correr: npx react-native-asset
  5. En iOS: verificar que aparezcan en Info.plist bajo
     "Fonts provided by application"

  NOMBRES EXACTOS en StyleSheet (postscript names):
  ├── 'PlusJakartaSans-Regular'
  ├── 'PlusJakartaSans-Medium'
  ├── 'PlusJakartaSans-SemiBold'
  ├── 'PlusJakartaSans-Bold'
  ├── 'PlusJakartaSans-ExtraBold'
  ├── 'DMSans-Light'
  ├── 'DMSans-Regular'
  ├── 'DMSans-Medium'
  └── 'DMSans-SemiBold'

  FALLBACK si las custom fonts fallan:
  ├── Headlines → 'Georgia' (serif cálido)
  └── Body      → 'System'  (-apple-system en iOS)

  NOTA iOS: allowFontScaling={true} en TODOS los Text.
  iOS respeta Dynamic Type del sistema cuando allowFontScaling
  está activo. NUNCA usar allowFontScaling={false} salvo
  casos extremos (ej: badge numérico de 1 dígito).
```

### 3.2 tokens/typography.ts

```typescript
// tokens/typography.ts
import { TextStyle } from 'react-native';

const fontDisplay = 'PlusJakartaSans-Bold';
const fontDisplayMd = 'PlusJakartaSans-SemiBold';
const fontBody = 'DMSans-Regular';
const fontBodyMd = 'DMSans-Medium';
const fontBodySm = 'DMSans-SemiBold';

export const typography: Record<string, TextStyle> = {

  // ── DISPLAY ──────────────────────────────────────────
  displayLg: {
    fontFamily: fontDisplay,
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  displayMd: {
    fontFamily: fontDisplay,
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
  },
  displaySm: {
    fontFamily: fontDisplay,
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
  },

  // ── HEADLINE ─────────────────────────────────────────
  headlineLg: {
    fontFamily: fontDisplay,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  headlineMd: {
    fontFamily: fontDisplayMd,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  headlineSm: {
    fontFamily: fontDisplayMd,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },

  // ── TITLE ────────────────────────────────────────────
  titleLg: {
    fontFamily: fontBodySm,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  titleMd: {
    fontFamily: fontBodySm,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  titleSm: {
    fontFamily: fontBodySm,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },

  // ── BODY ─────────────────────────────────────────────
  bodyLg: {
    fontFamily: fontBody,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  bodyMd: {
    fontFamily: fontBody,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodySm: {
    fontFamily: fontBody,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },

  // ── LABEL ────────────────────────────────────────────
  labelLg: {
    fontFamily: fontBodyMd,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMd: {
    fontFamily: fontBodyMd,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSm: {
    fontFamily: fontBodySm,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },

  // ── iOS ESPECÍFICOS (HIG mapping) ────────────────────
  // Equivalencias con UIFont.TextStyle para Dynamic Type
  iosLargeTitle: {    // UIFont.TextStyle.largeTitle
    fontFamily: fontDisplay,
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: 0.37,
  },
  iosTitle1: {        // UIFont.TextStyle.title1
    fontFamily: fontDisplayMd,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 0.36,
  },
  iosTitle2: {        // UIFont.TextStyle.title2
    fontFamily: fontDisplayMd,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.35,
  },
  iosTitle3: {        // UIFont.TextStyle.title3
    fontFamily: fontBodySm,
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0.38,
  },
  iosHeadline: {      // UIFont.TextStyle.headline
    fontFamily: fontBodySm,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  iosBody: {          // UIFont.TextStyle.body
    fontFamily: fontBody,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  iosCallout: {       // UIFont.TextStyle.callout
    fontFamily: fontBody,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.32,
  },
  iosSubheadline: {   // UIFont.TextStyle.subheadline
    fontFamily: fontBody,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  iosFootnote: {      // UIFont.TextStyle.footnote
    fontFamily: fontBody,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  iosCaption1: {      // UIFont.TextStyle.caption1
    fontFamily: fontBody,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  iosCaption2: {      // UIFont.TextStyle.caption2
    fontFamily: fontBody,
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 0.07,
  },
};

// Uso recomendado en People Conecta (mapeo semántico → iOS):
//   headlineSm  →  pantallas de sección (HIG: title2)
//   titleLg     →  nombres de eventos (HIG: title3)
//   titleMd     →  toolbar titles (HIG: headline)
//   bodyLg      →  descripciones (HIG: body)
//   bodyMd      →  listas (HIG: callout)
//   bodySm      →  metadata (HIG: footnote)
//   labelMd     →  navigation labels (HIG: caption1)
//   labelSm     →  overlines, chips (HIG: caption2 uppercase)
```

---

## 4. ICONOGRAFÍA SF SYMBOLS

### 4.1 Librería y mapeo

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SF SYMBOLS — Nativos de iOS, disponibles desde iOS 13+
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Paquete: react-native-sfsymbols
  Alternativa fallback: @expo/vector-icons o
                        react-native-vector-icons

  VENTAJAS DE SF SYMBOLS EN iOS:
  ├── Renderizan como vectores nativos (no fuentes)
  ├── Escalan perfectamente con Dynamic Type
  ├── Animaciones nativas en iOS 17+ (bounce, pulse, etc.)
  ├── Variantes: outlined, filled, multicolor, hierarchical
  └── El usuario los reconoce: reduce fricción cognitiva

  MAPEO: Material Symbols → SF Symbols
  ┌───────────────────────────────────────────────────────┐
  │  FUNCIÓN           MATERIAL          SF SYMBOL        │
  ├───────────────────────────────────────────────────────┤
  │  Explorar          explore           location.magnifyingglass  │
  │  Evento / Planes   event             calendar.circle  │
  │  Perfil            person            person.circle    │
  │  Grupo             group             person.3.fill    │
  │  Me anoto          add_circle        plus.circle.fill │
  │  Confirmado        check_circle      checkmark.circle.fill │
  │  Ubicación         location_on       mappin.and.ellipse │
  │  Fecha             calendar_month    calendar         │
  │  Hora              schedule          clock            │
  │  Buscar            search            magnifyingglass  │
  │  Filtros           tune              slider.horizontal.3 │
  │  Verificado        verified          checkmark.seal.fill │
  │  Rating star       star              star.fill        │
  │  Deporte           sports_soccer     figure.run       │
  │  Música            music_note        music.note       │
  │  Cocina            restaurant        fork.knife       │
  │  Idiomas           translate         globe             │
  │  Cine              movie             film             │
  │  Arte              palette           paintbrush.fill  │
  │  Juegos            sports_esports    gamecontroller.fill │
  │  Naturaleza        hiking            figure.hiking    │
  │  Notificaciones    notifications     bell.fill        │
  │  Compartir         share             square.and.arrow.up │
  │  Volver            arrow_back        chevron.left     │
  │  Cerrar            close             xmark            │
  │  Cancelar          cancel            xmark.circle.fill │
  │  Organizar         manage_accounts   person.badge.gear │
  │  Premium           workspace_premium star.circle.fill │
  │  Favorito          favorite          heart.fill       │
  │  Editar            edit              pencil           │
  │  Más opciones      more_vert         ellipsis         │
  │  Compartir plan    share             square.and.arrow.up │
  └───────────────────────────────────────────────────────┘

  TAMAÑOS:
  ├── 16pt → metadata inline (junto a text bodySm)
  ├── 20pt → compact: chips, small buttons
  ├── 24pt → default: navigation bar, standalone
  ├── 28pt → tab bar icons iOS (HIG: 25pt + padding)
  └── 40pt → featured: empty states

  VARIANTES (renderWeight en SFSymbols):
  ├── Inactivo/neutral → outlined (weight: regular)
  ├── Activo/selected  → filled   (weight: medium/bold)
  └── Emphasis         → filled + color primary
```

### 4.2 Componente Icon wrapper

```tsx
// components/atoms/Icon/Icon.tsx
import React from 'react';
import { Platform } from 'react-native';
import SFSymbol from 'react-native-sfsymbols';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../tokens';

interface IconProps {
  name: string;          // SF Symbol name (iOS) o Material name (Android)
  androidName?: string;  // fallback explícito para Android
  size?: number;
  color?: string;
  filled?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  name,
  androidName,
  size = 24,
  color = colors.onSurfaceVariant,
  filled = false,
}) => {
  if (Platform.OS === 'ios') {
    return (
      <SFSymbol
        name={name}
        weight={filled ? 'semibold' : 'regular'}
        scale="medium"
        color={color}
        size={size}
        multicolor={false}
        resizeMode="center"
      />
    );
  }
  // Android fallback: Material Community Icons
  return (
    <MaterialIcon
      name={androidName ?? name.replace(/\./g, '-')}
      size={size}
      color={color}
    />
  );
};
```

---

## 5. MOTION & HAPTICS iOS

### 5.1 Principios de animación en RN/iOS

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MOTION — React Native Reanimated en iOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  REGLA FUNDAMENTAL:
  SIEMPRE usar react-native-reanimated.
  NUNCA usar Animated de React Native core (inferior en iOS).

  DURACIONES ESTÁNDAR:
  ├── Micro (press, tap):         150ms
  ├── Short (chip, toggle):       200ms
  ├── Medium (sheet open/close):  350ms
  ├── Long (screen transition):   400ms
  └── Extra long (celebration):   600ms

  EASINGS (Reanimated):
  ├── Easing.bezier(0.2, 0, 0, 1)        → standard
  ├── Easing.bezier(0, 0, 0, 1)          → decelerate (enter)
  ├── Easing.bezier(0.3, 0, 1, 1)        → accelerate (exit)
  └── withSpring({ damping: 15, stiffness: 150 }) → spring

  TRANSICIONES DE PANTALLA (React Navigation):
  ├── Push (forward):    slide from right (iOS nativo, default)
  ├── Pop  (back):       slide to right + fade (iOS nativo)
  ├── Modal:             slide from bottom
  └── Tab switch:        cross-fade

  MICRO-INTERACCIONES:
  ├── Button press:    scale 0.96, 150ms, standard easing
  ├── Card tap:        scale 0.98 + opacity 0.9, 150ms
  ├── Chip select:     background fill, 150ms
  ├── FAB appear:      scale 0→1 + opacity, 300ms spring
  ├── Badge count:     scale 1→1.2→1, 200ms spring
  └── Success state:   scale + color swap, 300ms spring

  CARGA / SKELETON:
  ├── Shimmer: interpolateColor entre surface y surfaceContainer
  │   con loop de 1.5s (withRepeat + withTiming)
  └── Pull-to-refresh: RefreshControl con tintColor=primary

  REDUCIR MOVIMIENTO:
  import { useReduceMotion } from 'react-native-reanimated';
  // Chequear SIEMPRE antes de animar
  const shouldReduceMotion = useReduceMotion();
```

### 5.2 Haptics (OBLIGATORIO en iOS)

```typescript
// utils/haptics.ts
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Platform } from 'react-native';

const options = { enableVibrateFallback: true, ignoreAndroidSystemSettings: false };

export const haptics = {
  // Tap ligero: chips, toggles, selección
  light: () => {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('impactLight', options);
    }
  },

  // Tap medio: botones primarios, confirmaciones
  medium: () => {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('impactMedium', options);
    }
  },

  // Tap fuerte: "Me anoto" (acción principal)
  heavy: () => {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('impactHeavy', options);
    }
  },

  // Éxito: inscripción confirmada, review enviada
  success: () => {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('notificationSuccess', options);
    }
  },

  // Error: validación fallida, no-show registrado
  error: () => {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('notificationError', options);
    }
  },

  // Warning: último cupo disponible
  warning: () => {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('notificationWarning', options);
    }
  },

  // Selección: rating stars, chip toggle
  selection: () => {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('selection', options);
    }
  },
};

// MAPA DE USO:
// haptics.heavy()    → onPress del botón "Me anoto"
// haptics.success()  → confirmación de inscripción
// haptics.medium()   → onPress de botones secundarios
// haptics.light()    → toggle chip, selección día semana
// haptics.selection()→ cada estrella en rating, cada paso onboarding
// haptics.error()    → validación fallida en form
// haptics.warning()  → mostrar modal "¿cancelar inscripción?"
```

---

## 6. SAFE AREAS & LAYOUT iOS

### 6.1 Safe Areas (CRÍTICO en iOS)

```typescript
// REGLA: NUNCA usar padding fijo para status bar o home indicator.
// SIEMPRE usar SafeAreaView o useSafeAreaInsets().

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Opción A — para pantallas completas:
const Screen = () => (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    {/* contenido */}
  </SafeAreaView>
);

// Opción B — para control granular (bottom sheets, navbars):
const BottomNavBar = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{
      paddingBottom: insets.bottom,  // home indicator space
      paddingTop: space.sm,
      // NO paddingTop del status bar aquí porque la nav va abajo
    }}>
      {/* nav items */}
    </View>
  );
};

// Valores de referencia (varían según dispositivo):
// iPhone con notch/Dynamic Island: top ≈ 59, bottom ≈ 34
// iPhone SE / sin notch:           top ≈ 20, bottom ≈ 0
// NUNCA hardcodear estos valores.
```

### 6.2 Layout base iOS

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  GRILLA DE PANTALLA — iPhone 14 Pro (393pt × 852pt)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌─────────────────────────────────────────────────┐
  │  STATUS BAR (safe area top ≈ 59pt)             │
  │  Dynamic Island / notch                         │
  ├─────────────────────────────────────────────────┤
  │  NAVIGATION HEADER (44pt height — HIG estándar)│
  │  No usar más de 44pt de altura                  │
  ├─────────────────────────────────────────────────┤
  │                                                 │
  │  CONTENT AREA                                   │
  │  padding horizontal: 16pt (space.md)            │
  │  max content width: 393 - 32 = 361pt            │
  │                                                 │
  │  ScrollView / FlatList                          │
  │  contentContainerStyle: {                       │
  │    paddingHorizontal: 16,                       │
  │    paddingBottom: 16 + insets.bottom,           │
  │  }                                              │
  │                                                 │
  ├─────────────────────────────────────────────────┤
  │  TAB BAR (49pt + safe area bottom ≈ 34pt)      │
  │  Total ≈ 83pt                                   │
  │  Color: surface + blur (UIBlurEffect equivalent)│
  ├─────────────────────────────────────────────────┤
  │  HOME INDICATOR (safe area bottom ≈ 34pt)      │
  └─────────────────────────────────────────────────┘

  TOUCH TARGETS iOS (HIG):
  ├── Mínimo recomendado por Apple: 44×44pt
  ├── Nuestro mínimo: 48×48pt (más accesible)
  └── hitSlop para expandir área sin cambiar visual:
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}

  KEYBOARD AVOIDANCE:
  └── Usar KeyboardAvoidingView con:
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight}
```

---

## 7. ATOMS RN

### 7.1 Text

```tsx
// components/atoms/Text/Text.tsx
import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { typography, colors } from '../../../tokens';

type TypographyVariant = keyof typeof typography;

interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  children: React.ReactNode;
}

export const Text: React.FC<AppTextProps> = ({
  variant = 'bodyMd',
  color = colors.onSurface,
  style,
  children,
  ...props
}) => (
  <RNText
    style={[typography[variant], { color }, style as TextStyle]}
    allowFontScaling={true}   // respetar Dynamic Type iOS
    maxFontSizeMultiplier={1.5} // evitar tamaños extremos
    {...props}
  >
    {children}
  </RNText>
);
```

### 7.2 Pressable Button base

```tsx
// components/atoms/PressableScale/PressableScale.tsx
// Atom de interacción: reemplaza TouchableOpacity con animación nativa

import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle, useSharedValue,
  withTiming, Easing
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PressableScaleProps extends PressableProps {
  scaleTo?: number;
  children: React.ReactNode;
}

export const PressableScale: React.FC<PressableScaleProps> = ({
  scaleTo = 0.96,
  onPress,
  children,
  ...props
}) => {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      style={animStyle}
      onPressIn={() => {
        scale.value = withTiming(scaleTo, { duration: 100, easing: Easing.out(Easing.quad) });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 150, easing: Easing.out(Easing.quad) });
      }}
      onPress={onPress}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
};
```

### 7.3 Avatar

```
  TAMAÑOS:
  ├──  24pt → Micro (stack de asistentes)
  ├──  32pt → Small (chips, comentarios)
  ├──  40pt → Default (listas, participantes)
  ├──  56pt → Medium (cards de perfil)
  └──  80pt → Large (pantalla de perfil)

  IMPLEMENTACIÓN:
  border-radius: 9999 (radii.avatar)
  overflow: 'hidden'
  backgroundColor: colors.primaryContainer

  FALLBACK (sin foto):
  → Inicial del nombre
  → fontFamily: PlusJakartaSans-Bold
  → color: colors.onPrimaryContainer

  VERIFIED BADGE:
  → Ícono SF Symbol: checkmark.seal.fill
  → Posición: absolute, bottom: -2, right: -2
  → Size: 16pt | Color: colors.primary
  → border: 2pt solid colors.surface

  PLUS RING:
  → borderWidth: 2.5
  → borderColor: colors.secondary
  → Se aplica a la View wrapper, NO al Image

  STACK:
  → marginLeft: -8 en cada avatar (salvo el primero)
  → borderWidth: 2, borderColor: colors.surface
  → zIndex decremental (primer avatar encima)
  → Máximo 4 visibles + "+N" View
```

### 7.4 Badge

```tsx
// Sizes:
// Dot:    8pt  — solo indicador de actividad
// Small: 16pt  — número ≤ 9
// Large: 20pt  — número ≥ 10

// Colores:
// Urgente:  colors.secondary  (coral)
// Info:     colors.primary    (ocean)
// Success:  colors.success

// Posición en ícono:
// position: 'absolute', top: -4, right: -4
// borderWidth: 2, borderColor: colors.surface
// zIndex: 1

// Texto: labelSm pero SIN uppercase, bold
```

### 7.5 Skeleton

```tsx
// components/atoms/Skeleton/Skeleton.tsx
import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle, useSharedValue,
  withRepeat, withTiming, interpolateColor
} from 'react-native-reanimated';
import { colors, radii } from '../../../tokens';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius = radii.sm,
  style,
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1, true
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.surfaceContainerLow, colors.surfaceContainerHigh]
    ),
  }));

  return (
    <Animated.View
      style={[{ width, height, borderRadius }, animStyle, style]}
    />
  );
};
```

### 7.6 Divider

```tsx
// Horizontal divider:
// height: StyleSheet.hairlineWidth (0.5pt en iOS — nativo)
// backgroundColor: colors.separator
// marginHorizontal: 0 (full) o 72 (inset con avatar)

// StyleSheet.hairlineWidth es PREFERIDO sobre 1pt en iOS
// ya que usa el pixel ratio real del display (Retina = 0.33pt)
```

---

## 8. MOLECULES RN

### 8.1 Button

```tsx
// components/molecules/Button/Button.tsx

// VARIANTES:
// 'filled'          → bg primary, text white            → CTA principal
// 'filledSecondary' → bg secondary (coral), text white  → CTA urgente
// 'tonal'           → bg primaryContainer, text onPrimaryContainer
// 'outlined'        → border outline, text primary
// 'text'            → transparent, text primary
// 'elevated'        → bg surface, shadow elevation1, text primary

// TAMAÑOS:
// 'large'  → height: 56, paddingHorizontal: 28, labelLg
// 'medium' → height: 48, paddingHorizontal: 24, labelLg
// 'small'  → height: 36, paddingHorizontal: 16, labelMd

// PROPIEDADES CLAVE:
// borderRadius: radii.button (9999)
// overflow: 'hidden'
// Usar PressableScale como base (scale: 0.96 on press)
// SIEMPRE llamar haptics.medium() o haptics.heavy() en onPress

// ESTADO LOADING:
// Reemplazar label con ActivityIndicator
// size="small", color={colors.onPrimary}

// ESTADO DISABLED:
// opacity: 0.38
// No llamar haptics

// ÍCONO:
// leading icon: SF Symbol 18pt, gap: 8
// paddingLeft reducido: 16 (vs 24 sin ícono)

// EJEMPLO MÍNIMO:
const styles = StyleSheet.create({
  buttonFilled: {
    height: 48,
    borderRadius: radii.button,
    backgroundColor: colors.primary,
    paddingHorizontal: space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
  },
  buttonLabel: {
    ...typography.labelLg,
    color: colors.onPrimary,
  },
});
```

### 8.2 TextField

```tsx
// FILLED (default en formularios):
// backgroundColor: colors.surfaceContainerHighest
// borderBottomWidth: 2
// borderBottomColor: colors.outline  →  colors.primary al focus
// borderTopLeftRadius: radii.sm, borderTopRightRadius: radii.sm
// borderBottomRadius: 0
// height: 56

// OUTLINED (búsquedas):
// backgroundColor: colors.surface
// borderWidth: 1.5  →  2 al focus
// borderColor: colors.outline  →  colors.primary al focus
// borderRadius: radii.sm
// height: 56

// SEARCH (barra de búsqueda):
// backgroundColor: colors.surfaceContainerHighest
// borderRadius: radii.full
// paddingLeft: 48 (para el ícono)
// height: 56

// LABEL ANIMADO:
// Usar Reanimated para mover el label:
// Posición vacío: translateY: 0, fontSize: 16 (bodyLg)
// Posición lleno/focus: translateY: -10, fontSize: 12 (bodySm)
// Duración: 150ms, easing: standard

// KEYBOARD TYPE:
// email    → keyboardType="email-address" + autoCapitalize="none"
// phone    → keyboardType="phone-pad"
// name     → autoCapitalize="words"
// password → secureTextEntry={true}

// iOS ESPECÍFICO:
// returnKeyType: 'next' (para ir al siguiente campo)
// returnKeyType: 'done' (último campo del form)
// textContentType: 'emailAddress' | 'telephoneNumber' | 'name'
//   → habilita autofill de iOS Keychain
```

### 8.3 Chip

```tsx
// FILTER CHIP:
// inactivo: border 1.5 outline, bg transparent, text onSurfaceVariant
// activo:   bg secondaryContainer, border none, text onSecondaryContainer
//           + leading checkmark SF Symbol (checkmark, 14pt)
// height: 32, borderRadius: radii.chip, paddingH: 14
// Haptic: haptics.selection() al toggle

// ASSIST CHIP:
// bg surface, border 1.5 outline, leading SF Symbol 16pt
// height: 32, borderRadius: radii.chip
// shadow: elevation1

// INPUT CHIP (tags):
// bg secondaryContainer, trailing xmark SF Symbol 16pt
// height: 32, borderRadius: radii.chip
// Haptic: haptics.light() al remover

// SUGGESTION CHIP (onboarding):
// bg surfaceVariant → primaryContainer al seleccionar
// height: 40, borderRadius: radii.chip, paddingH: 18
// text: labelLg

// DAY CHIP (disponibilidad):
// Igual a filter chip pero width fijo: 44pt (mínimo touch target)
// Texto: 'Lun', 'Mar', etc.
```

### 8.4 Event Card (Molecule base)

```
  PROPIEDADES DEL CONTENEDOR:
  backgroundColor: colors.surface
  borderRadius: radii.card  (24)
  overflow: 'hidden'
  shadow: shadows.elevation1
  borderWidth: 1
  borderColor: colors.outlineVariant

  MEDIA (imagen o placeholder):
  height: 180
  backgroundColor: colors.primaryContainer (placeholder)
  Usar react-native-fast-image para performance

  CHIP CATEGORÍA (top-left en media):
  position: 'absolute', top: 12, left: 12
  bg: rgba(255,255,255,0.92)
  blur: @react-native-community/blur (BlurView)
  borderRadius: radii.chip, padding: 4 12
  text: labelSm, color: onSurface

  CHIP CUPOS (top-right en media):
  position: 'absolute', top: 12, right: 12
  cupos > 3:  bg rgba(45,158,107,0.9)  → success
  cupos ≤ 3:  bg rgba(232,160,32,0.9) → warning + "⚠"
  cupo 1:     bg rgba(214,64,64,0.9)  → error + "!"
  text: labelSm, color: white

  BODY CONTENT:
  paddingHorizontal: 16, paddingTop: 16, paddingBottom: 0
  gap: 8

  FOOTER:
  paddingHorizontal: 16, paddingVertical: 12
  borderTopWidth: StyleSheet.hairlineWidth
  borderTopColor: colors.separator
  flexDirection: 'row', justifyContent: 'space-between'

  BOTÓN "Me anoto":
  variant: filled (primary)
  size: small (height 36)
  En último cupo: variant filledSecondary (coral)
  onPress: haptics.heavy() + inscripción

  PRESS STATE de la card completa:
  Usar PressableScale (scale 0.98) + ripple android
  onPress: haptics.light() + navigate to detail
```

### 8.5 List Item

```
  MÍNIMO DE ALTURA:
  1 línea:  56pt
  2 líneas: 72pt
  3 líneas: 88pt

  PADDING: horizontal 16pt, vertical 8pt

  LEADING: avatar 40pt o SF Symbol 24pt
  Alineación del leading: center vertical

  TRAILING: SF Symbol 24pt, texto labelMd, o Switch
  Switch: nativo (no implementar propio — iOS tiene uno perfecto)

  SEPARADOR entre items:
  StyleSheet.hairlineWidth, inset a 72pt (ancho del leading + gap)
  NUNCA usar border en cada item, solo separador compartido

  PRESS STATE: Pressable con highlighted bg surfaceContainerHigh
  Duración: 100ms, haptics.light()
```

### 8.6 Progress Bar

```
  height: 8, borderRadius: radii.full
  backgroundColor: colors.surfaceContainerHigh (track)

  FILL:
  cupos > 30%:  colors.primary
  cupos ≤ 30%:  colors.warning
  cupo último:  colors.error

  ANIMACIÓN del fill al aparecer:
  withTiming(targetWidth, { duration: 600, easing: Easing.out(Easing.exp) })
  Delay: 200ms (esperar que la card termine de entrar)
```

### 8.7 Rating Stars

```
  Star filled:    SF Symbol star.fill,  color: '#FFB830'
  Star empty:     SF Symbol star,       color: colors.outline
  Tamaño:         16pt (compacto) | 20pt (detalle) | 24pt (interactivo)

  INTERACTIVO (post-evento):
  Cada estrella: PressableScale + haptics.selection()
  Animación fill: withSpring({ damping: 10, stiffness: 200 })
  Half-star: NO (mantener enteros en iOS)
```

---

## 9. ORGANISMS RN

### 9.1 iOS Tab Bar (NavigationBar)

```tsx
// Usar @react-navigation/bottom-tabs con tabBarStyle customizado

const tabBarStyle = {
  backgroundColor: colors.surface,
  borderTopWidth: StyleSheet.hairlineWidth,
  borderTopColor: colors.separator,
  height: 49 + insets.bottom,     // 49 = HIG standard tab bar height
  paddingBottom: insets.bottom,
  // Efecto blur nativo iOS (HIG recomendado):
  // tabBarBlurEffect: 'light'
  // tabBarStyle: { position: 'absolute' }
  // + backgroundColor: 'transparent'
};

// ÍCONOS TAB BAR:
// Tamaño: 25pt (HIG recomendado) con padding visual implícito
// Inactivo: outlined, color onSurfaceVariant
// Activo:   filled,   color primary
// Indicator: NO usar (iOS no usa pill indicator como MD3)
//            En iOS la distinción activo/inactivo es solo por color e ícono filled

// LABEL:
// Siempre visible (HIG para tab bars)
// font: caption1/caption2 del sistema o labelMd nuestro
// color: onSurfaceVariant (inactivo) → primary (activo)

// VARIANTE USUARIO:
// Tab 1: location.magnifyingglass  → "Explorar"
// Tab 2: calendar.circle          → "Mis planes"
// Tab 3: person.circle            → "Mi perfil"

// VARIANTE ORGANIZADOR:
// Tab 1: location.magnifyingglass  → "Explorar"
// Tab 2: plus.circle.fill          → "Publicar" (color secondary)
// Tab 3: calendar.badge.checkmark  → "Mis eventos"
// Tab 4: person.circle             → "Perfil"
```

### 9.2 iOS Navigation Header

```tsx
// Usar @react-navigation/native-stack con options:

const screenOptions = {
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerTitleStyle: {
    ...typography.iosHeadline,
    color: colors.onSurface,
  },
  headerTintColor: colors.primary,     // back button + icons color
  headerBackTitleVisible: false,        // iOS 14+: ocultar texto "Back"
  headerLargeTitle: true,              // iOS Large Title (colapsa al scroll)
  headerLargeTitleStyle: {
    ...typography.iosLargeTitle,
    color: colors.onSurface,
  },
  headerBlurEffect: 'light',           // blur nativo al scroll
  headerTransparent: false,
  // Para pantalla de detalle con hero image:
  // headerTransparent: true,
  // headerTintColor: '#FFFFFF',
  // headerBackgroundContainerStyle: { opacity: scrollOffset > 200 ? 1 : 0 }
};

// BACK BUTTON iOS:
// SIEMPRE usar el back button nativo (chevron.left)
// NUNCA implementar back button propio a menos que sea necesario

// LARGE TITLE (HIG recomendado para pantallas principales):
// Home/Explorar:  headerLargeTitle: true
// Detail:         headerLargeTitle: false (standard small header)
// Onboarding:     sin header (fullscreen)
```

### 9.3 Bottom Sheet (iOS Sheet)

```tsx
// Usar @gorhom/bottom-sheet
// Reemplaza: modales, dialogs, filter sheets, review sheets

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

// CONFIGURACIÓN:
// snapPoints: ['50%', '90%']  o  [300, '90%']
// enablePanDownToClose: true
// backgroundStyle: { backgroundColor: colors.surface, borderRadius: radii.modal }
// handleIndicatorStyle: { backgroundColor: colors.outline, width: 32, height: 4 }

// BACKDROP:
// Usar BottomSheetBackdrop con:
// opacity: 0.4, color: colors.scrim
// disappearsOnIndex: -1, appearsOnIndex: 0

// iOS PRESENTACIÓN NATIVA (alternativa):
// Para iOS 15+, usar Modal con presentationStyle="formSheet"
// que da el sheet nativo de Apple con spring animation

// DRAG HANDLE:
// width: 32pt, height: 4pt
// borderRadius: 2
// backgroundColor: colors.outlineVariant
// centered, marginTop: 8, marginBottom: 4

// CASOS DE USO:
// → Filter sheet (filtros de búsqueda)
// → Review sheet (post-evento)
// → Confirmación de inscripción
// → "¿Cancelar asistencia?" (destructive action)
```

### 9.4 Onboarding Screen

```
  LAYOUT:
  SafeAreaView flex: 1, bg: colors.background

  HEADER:
  ├── Row: "Saltar" (text button, trailing) + step dots (centered)
  ├── height: 48pt
  └── paddingHorizontal: 16

  STEP DOTS:
  ├── Active:    width: 24, height: 8, borderRadius: 4, bg: primary
  ├── Done:      width: 8, height: 8, borderRadius: 4, bg: success
  └── Inactive:  width: 8, height: 8, borderRadius: 4, bg: outline
  Animación entre estados: withSpring

  CONTENT (flex: 1):
  ├── Ilustración: 200pt height, centrada
  │   → Usar SVG via react-native-svg
  ├── Pregunta: headlineSm, centrada, marginTop: 24
  ├── Subtexto: bodyMd, centrada, color: onSurfaceVariant
  └── Opciones: ListItems con radio visual
      Al seleccionar → haptics.selection() → avance automático

  FOOTER:
  ├── Button "Siguiente" filled, full width
  ├── Texto "Paso X de 3" labelSm, centrado, color onSurfaceVariant
  └── paddingBottom: insets.bottom + 8

  TRANSICIÓN entre pasos:
  FlatList horizontal + pagingEnabled: true
  O Stack Navigator con slide animation
```

### 9.5 Event Detail Screen

```
  SCROLL:
  ScrollView con scrollEventThrottle: 16
  Usar para animar header opacity al scroll

  HERO IMAGE (edge-to-edge):
  height: 280pt (iPhone 14 Pro)
  Usar Animated.Image o FastImage
  Back button overlay: position absolute, top: insets.top + 8, left: 16
  Favorite button: position absolute, top: insets.top + 8, right: 56
  Share button: position absolute, top: insets.top + 8, right: 16
  Botones sobre imagen: bg rgba(0,0,0,0.3), blur nativo, borderRadius: 20

  INFO CARD (outlined):
  marginTop: -24 (overlap sobre la imagen)
  borderRadius: radii.xl (24)
  bg: colors.surface
  shadow: shadows.elevation2
  paddingHorizontal: 16, paddingVertical: 16
  Contenido: fecha, zona, cupos + progress bar

  SECCIONES (paddingHorizontal: 16, gap: 24):
  ├── "Sobre este plan": bodyLg, 5 líneas max + "Ver más"
  ├── "Organizador": ListItem con avatar 56pt + rating
  └── "Quiénes van": ListItems max 5 + "Ver todos" button text

  STICKY BOTTOM BAR:
  position: absolute, bottom: 0
  bg: colors.surface + hairline top separator
  paddingBottom: insets.bottom
  paddingTop: 12, paddingHorizontal: 16
  Texto cancelación: bodySm, onSurfaceVariant, centrado
  Botón "Me anoto": filled large, full width
  → onPress: haptics.heavy() + mostrar BottomSheet de confirmación
```

### 9.6 Empty State

```
  LAYOUT: centrado vertical (flex: 1, justifyContent: 'center')
  paddingHorizontal: 32

  Ilustración: SVG, 160pt, color: surfaceContainerHigh
  Título: headlineSm, centrado, marginTop: 20
  Descripción: bodyMd, centrado, color: onSurfaceVariant, marginTop: 8
  CTA: Button tonal, marginTop: 24, alignSelf: 'center'

  VARIANTES:
  ├── Sin eventos en filtro: "Probá cambiando los filtros"
  ├── Sin inscripciones:     "Tu primer plan te espera 🌊" + haptics.light() al CTA
  ├── Error de red:          SF Symbol wifi.slash + "Revisar conexión" + retry
  └── Sin reviews:           "Estás al día ✓"
```

---

## 10. TEMPLATES / SCREENS iOS

### 10.1 Home / Explorar

```
  Stack: ScrollView anidado en SafeAreaView
  NUNCA usar View + FlatList para el layout completo
  Usar SectionList si las secciones son dinámicas

  ESTRUCTURA:
  ┌─────────────────────────────────────────────────┐
  │ STATUS BAR (automático iOS)                     │
  ├─────────────────────────────────────────────────┤
  │ LARGE TITLE HEADER "Explorar"   [avatar] [🔔]  │
  │ (colapsa a small header al scroll)              │
  ├─────────────────────────────────────────────────┤
  │ SEARCH BAR (permanente bajo header)             │
  │ → UISearchController equivalent                 │
  │ → height: 56, mx: 16, radius: full             │
  ├─────────────────────────────────────────────────┤
  │ FILTER CHIPS (horizontal ScrollView)            │
  │ → showsHorizontalScrollIndicator: false         │
  │ → contentContainerStyle: paddingH 16, gap: 8   │
  │ → stickyHeaderIndices en SectionList            │
  ╠═════════════════════════════════════════════════╣
  │ SECTION: "Esta semana"                          │
  │ → ScrollView horizontal (FlatList)              │
  │ → horizontal: true, showsHorizontalScrollIndicator: false │
  │ → EventCard compacta (200pt wide)               │
  │                                                 │
  │ SECTION: "Categorías"                           │
  │ → FlatList numColumns: 4                        │
  │ → Chips grandes con ícono + label               │
  │                                                 │
  │ SECTION: "Todos los eventos"                    │
  │ → FlatList vertical                             │
  │ → EventCard estándar                            │
  │ → onEndReached: load more                       │
  ╠═════════════════════════════════════════════════╣
  │ TAB BAR (blur nativo)                           │
  └─────────────────────────────────────────────────┘

  PERFORMANCE:
  ├── FlatList con getItemLayout para evitar layout recalculations
  ├── keyExtractor: (item) => item.id
  ├── windowSize: 5 (renderizar 5 pantallas de items)
  ├── removeClippedSubviews: true (Android; iOS lo hace solo)
  └── ListHeaderComponent para la search + filters
```

### 10.2 Event Detail

```
  Stack: native-stack con headerTransparent: true
  ScrollView con onScroll para animar header

  SCROLL HANDLER (Reanimated):
  const scrollY = useSharedValue(0);
  const headerOpacity = useDerivedValue(() =>
    interpolate(scrollY.value, [200, 240], [0, 1], Extrapolation.CLAMP)
  );
  // Al superar 200pt de scroll: mostrar header con título

  BOTTOM SHEET DE CONFIRMACIÓN:
  Al presionar "Me anoto":
  1. haptics.heavy()
  2. Abrir BottomSheet (snapPoint: 320pt)
  3. Mostrar: nombre del evento, fecha, cupos, avatares que van
  4. Botón "Confirmar" → haptics.success() → inscripción
  5. Cerrar sheet + mostrar HUD de éxito (2 segundos)
  6. HUD: centrado, bg surfaceContainerHighest, borderRadius: xl
     SF Symbol: checkmark.circle.fill (40pt, success color)
     Texto: "¡Te anotaste!" titleMd
```

### 10.3 Onboarding

```
  presentationStyle: 'fullScreen' (no se puede swipe-to-dismiss)
  StatusBar: hidden o lightContent sobre background sand

  FlatList horizontal con pagingEnabled: true
  → Cada paso es un item de la FlatList
  → scrollEnabled: false (navegamos programáticamente)
  → No mostrar scroll indicator

  TRANSICIÓN:
  withTiming(nextIndex * screenWidth, { duration: 300 })
  → slide horizontal suave

  KEYBOARD:
  En paso de zona (step 3): KeyboardAvoidingView
  behavior: 'padding', keyboardVerticalOffset: 0
```

### 10.4 Perfil

```
  Stack: ScrollView
  Header: small, sin large title

  PROFILE HERO:
  height: 120pt
  bg: LinearGradient de primaryContainer a ocean100
  Avatar 80pt: centrado horizontalmente, bottom: -40

  BODY:
  paddingTop: 48 (para el avatar que sobresale)
  paddingHorizontal: 16

  STATS ROW:
  flexDirection: 'row', justifyContent: 'space-evenly'
  borderTopWidth: hairlineWidth, borderBottomWidth: hairlineWidth
  borderColor: colors.separator
  marginHorizontal: -16 (full bleed)
  paddingVertical: 14

  SETTINGS NAVIGATION:
  iOS: usar UITableView style (GroupedListStyle)
  Implementar como secciones separadas de ListItems
  Seguir el patrón de Apple Settings.app
  Cada grupo: bg surface, borderRadius: radii.md, shadow: none
  Separadores: hairlineWidth, inset 16pt
```

### 10.5 Panel Organizador

```
  Header: large title "Mis eventos" + botón "+" en trailing
  Botón +: SF Symbol plus (20pt), color: primary
  → onPress: haptics.medium() + navigate to CreateEvent

  SEGMENTED CONTROL (HIG):
  iOS: usar el Segmented Control nativo
  react-native: <SegmentedControl> de @react-native-community/segmented-control
  Opciones: "Próximos" | "Pasados" | "Borradores"
  color: primary
  marginHorizontal: 16, marginBottom: 16

  STATS BANNER:
  bg: primaryContainer, borderRadius: radii.lg
  padding: 16, marginHorizontal: 16, marginBottom: 16
  flexDirection: 'row', justifyContent: 'space-around'

  EVENT LIST ITEMS (variante organizador):
  Misma EventCard base pero con trailing actions:
  → Swipe-to-reveal: "Editar" (primary) + "Cancelar" (error)
  Usar: react-native-swipeable o @gorhom/bottom-sheet
  iOS nativo: UISwipeActionsConfiguration vía RN gesture handler
```

---

## 11. NAVEGACIÓN iOS (REACT NAVIGATION)

```typescript
// navigation/AppNavigator.tsx

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ─── TAB NAVIGATOR ────────────────────────────────────────

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.onSurfaceVariant,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: colors.separator,
        borderTopWidth: StyleSheet.hairlineWidth,
      },
      tabBarLabelStyle: {
        ...typography.labelMd,
        marginBottom: 2,
      },
    }}
  >
    <Tab.Screen
      name="Explorar"
      component={ExplorarScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <Icon
            name={focused ? 'location.magnifyingglass' : 'location.magnifyingglass'}
            size={25}
            color={color}
            filled={focused}
          />
        ),
      }}
    />
    <Tab.Screen
      name="MisPlanes"
      component={MisPlanesScreen}
      options={{
        title: 'Mis planes',
        tabBarIcon: ({ focused, color }) => (
          <Icon
            name="calendar.circle"
            size={25}
            color={color}
            filled={focused}
          />
        ),
        tabBarBadge: undefined,   // agregar número si hay planes pendientes
      }}
    />
    <Tab.Screen
      name="Perfil"
      component={PerfilScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <Icon
            name="person.circle"
            size={25}
            color={color}
            filled={focused}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

// ─── STACK NAVIGATOR ──────────────────────────────────────

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: colors.primary,
        headerTitleStyle: {
          ...typography.iosHeadline,
          color: colors.onSurface,
        },
        headerStyle: { backgroundColor: colors.background },
        animation: 'ios',    // SIEMPRE usar animación nativa iOS
      }}
    >
      {/* Onboarding (sin tabs, fullscreen) */}
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />

      {/* Main app con tabs */}
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      {/* Detail screens (push desde cualquier tab) */}
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="OrganizerProfile"
        component={OrganizerProfileScreen}
        options={{ headerLargeTitle: true, title: '' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
```

---

## 12. ACCESIBILIDAD iOS

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ACCESIBILIDAD — iOS VoiceOver + Dynamic Type
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  DYNAMIC TYPE (obligatorio):
  ├── allowFontScaling={true} en TODOS los <Text>
  ├── maxFontSizeMultiplier={1.5} para evitar overflow extremo
  └── Testear con Accesibilidad → Tamaño del texto en Settings

  VOICEOVER:
  ├── accessibilityLabel en todos los íconos sin texto visible
  │   Ejemplo: accessibilityLabel="Me anoto al plan Surf al atardecer"
  ├── accessibilityHint para acciones no obvias
  │   Ejemplo: accessibilityHint="Abre los detalles del evento"
  ├── accessibilityRole:
  │   Botones:    'button'
  │   Links:      'link'
  │   Imágenes:   'image'
  │   Headers:    'header'
  │   Checkboxes: 'checkbox' (chips toggle)
  │   Tabs:       'tab'
  ├── accessibilityState:
  │   { selected: true/false }  → chips
  │   { disabled: true/false }  → botones
  │   { busy: true/false }      → loading states
  └── accessibilityLiveRegion="polite" → confirmaciones

  CONTRASTE (mismo que v1.0, no cambia):
  ├── ocean-700 (#007070) para texto body sobre fondo claro → 5.1:1 ✓
  ├── on-surface (#2E2822) sobre surface → 14:1 ✓
  └── Botones filled: contraste garantizado por el bg

  TOUCH TARGETS iOS (HIG):
  ├── Mínimo Apple: 44×44pt
  ├── Nuestro mínimo: 48×48pt
  ├── Usar hitSlop para expandir área: { top:8, bottom:8, left:8, right:8 }
  └── Verificar con Settings → Accesibilidad → AssistiveTouch

  REDUCE MOTION:
  import { useReduceMotion } from 'react-native-reanimated';
  const reduceMotion = useReduceMotion();
  if (reduceMotion) { /* skip animations, use instant transitions */ }

  CONTRASTE AUMENTADO:
  import { AccessibilityInfo, useColorScheme } from 'react-native';
  AccessibilityInfo.isReduceTransparencyEnabled()
  → Si true: no usar blur/transparency en overlays, usar bg sólidos

  DARK MODE (preparación, no en MVP pero definir desde ya):
  ├── Crear darkColors object con misma estructura que colors
  ├── primary: ocean-300 (#4DC9C8) en dark
  ├── background: neutral-900 (#1A1512) en dark
  ├── surface: neutral-800 (#2E2822) en dark
  └── Usar useColorScheme() hook para toggle

  TECLADO:
  ├── KeyboardAvoidingView en TODOS los formularios
  ├── behavior: 'padding' en iOS
  └── Nunca ocultar el field activo bajo el teclado
```

---

## 13. PROMPT CURSOR / WINDSURF

```
Estás construyendo People Conecta en React Native para iOS.
Seguí estrictamente el archivo Design-iOS.md como fuente de verdad.

STACK TÉCNICO:
- React Native 0.74+
- @react-navigation/native-stack + bottom-tabs
- react-native-reanimated (SIEMPRE, nunca Animated core)
- react-native-gesture-handler
- react-native-safe-area-context (useSafeAreaInsets() en todo)
- @gorhom/bottom-sheet para modales y sheets
- react-native-haptic-feedback (haptics.ts)
- react-native-sfsymbols para íconos en iOS
- react-native-fast-image para imágenes

REGLAS CRÍTICAS:
1. SIEMPRE importar colores de tokens/colors.ts → usar colors.X
   NUNCA strings de color directos (#00A8A8)
2. SIEMPRE usar StyleSheet.create() o StyleSheet.hairlineWidth
   NUNCA inline styles para layouts (solo overrides puntuales)
3. SIEMPRE llamar haptics en onPress de botones principales:
   "Me anoto" → haptics.heavy()
   Botones secundarios → haptics.medium()
   Chips / toggles → haptics.selection()
   Éxito → haptics.success()
4. SIEMPRE SafeAreaView o useSafeAreaInsets() en pantallas
   NUNCA padding hardcodeado para status bar o home indicator
5. SIEMPRE allowFontScaling={true} en <Text>
6. En iOS: usar animación 'ios' en navigation stack
7. Shadow en iOS: shadowColor + shadowOffset + shadowOpacity + shadowRadius
   NUNCA box-shadow (no existe en RN)
8. No existe: display:grid → usar FlatList con numColumns
   No existe: position:sticky → usar SectionList con stickyHeaderIndices
   No existe: :hover → usar Pressable con pressed state
   No existe: overflow:scroll → usar ScrollView o FlatList

PALETA RESUMIDA:
Primary:    colors.primary           #00A8A8
Secondary:  colors.secondary         #FF6347
Background: colors.background        #FDFAF4
Surface:    colors.surface           #FFFFFF
Text:       colors.onSurface         #2E2822
Subtle:     colors.onSurfaceVariant  #6B6055
Border:     colors.outline           #CEC5B6
Success:    colors.success           #2D9E6B
Error:      colors.error             #D64040

TIPOGRAFÍA: typography.titleLg, typography.bodyMd, etc.
SPACING:    space.sm (8), space.md (16), space.lg (24)
RADII:      radii.card (24), radii.button (9999), radii.chip (9999)
SHADOWS:    shadows.elevation1, shadows.elevation2, shadows.elevation3

COMPONENTES BASE:
- <Text variant="headlineSm">: tipografía semántica
- <PressableScale scaleTo={0.96}>: interacción con animación
- <Icon name="checkmark.circle.fill" filled>: SF Symbol con fallback
- <Skeleton width={200} height={16}>: loading state
- <Button variant="filled" size="large">: botón principal
- EventCard: card de evento completa
- BottomSheet + BottomSheetView: modales y confirmaciones
```

---

## 14. ESTRUCTURA DE ARCHIVOS

```
src/
├── tokens/
│   ├── colors.ts           ← palette + semantic colors
│   ├── typography.ts       ← TextStyle objects + iOS HIG mapping
│   ├── spacing.ts          ← spacing numbers (NO px)
│   ├── radii.ts            ← border radius values
│   ├── shadows.ts          ← iOS shadow objects
│   └── index.ts            ← barrel export
│
├── utils/
│   ├── haptics.ts          ← haptics wrapper (iOS/Android)
│   └── dimensions.ts       ← useWindowDimensions helpers
│
├── components/
│   ├── atoms/
│   │   ├── Text/           ← Text con Dynamic Type + typography
│   │   ├── Icon/           ← SF Symbol + Material fallback
│   │   ├── Avatar/         ← tamaños, verified, ring, stack
│   │   ├── Badge/          ← dot, number, label
│   │   ├── Skeleton/       ← shimmer con Reanimated
│   │   ├── Divider/        ← hairlineWidth separator
│   │   └── PressableScale/ ← base de interacción animada
│   │
│   ├── molecules/
│   │   ├── Button/         ← 6 variantes + tamaños + estados
│   │   ├── TextField/      ← filled, outlined, search
│   │   ├── Chip/           ← filter, assist, input, suggestion, day
│   │   ├── ListItem/       ← 1-2-3 líneas + leading/trailing
│   │   ├── RatingStars/    ← lectura + interactivo
│   │   ├── ProgressBar/    ← cupos con colores semánticos
│   │   └── Switch/         ← wrapper del Switch nativo iOS
│   │
│   └── organisms/
│       ├── EventCard/      ← card completa con media + footer
│       ├── FilterBar/      ← searchbar + chip scroll row
│       ├── NavigationBar/  ← tab bar customizado
│       ├── NavigationHeader/ ← header config + large title
│       ├── BottomSheet/    ← @gorhom wrapper con backdrop
│       ├── OnboardingStep/ ← paso de onboarding con ilustración
│       ├── EventDetail/    ← pantalla detalle completa
│       ├── ProfileCard/    ← perfil de usuario/organizador
│       ├── ReviewSheet/    ← bottom sheet de reseña post-evento
│       └── EmptyState/     ← ilustración + texto + CTA
│
├── screens/
│   ├── Onboarding/
│   │   └── OnboardingScreen.tsx
│   ├── Explorar/
│   │   └── ExplorarScreen.tsx
│   ├── MisPlanes/
│   │   └── MisPlanesScreen.tsx
│   ├── EventDetail/
│   │   └── EventDetailScreen.tsx
│   ├── Perfil/
│   │   └── PerfilScreen.tsx
│   └── Organizer/
│       ├── OrganizerScreen.tsx
│       └── CreateEventScreen.tsx
│
├── navigation/
│   ├── AppNavigator.tsx    ← root navigator
│   ├── TabNavigator.tsx    ← bottom tabs
│   └── types.ts            ← RootStackParamList
│
└── assets/
    ├── fonts/
    │   ├── PlusJakartaSans-Bold.ttf
    │   ├── PlusJakartaSans-SemiBold.ttf
    │   ├── PlusJakartaSans-Medium.ttf
    │   ├── DMSans-Regular.ttf
    │   ├── DMSans-Medium.ttf
    │   └── DMSans-SemiBold.ttf
    └── illustrations/      ← SVGs de onboarding y empty states
        ├── onboarding-city.svg
        ├── onboarding-interests.svg
        ├── onboarding-zone.svg
        └── empty-state-*.svg
```

---

## 15. QUICK REFERENCE

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CHEATSHEET iOS — People Conecta Design System
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  COLORES (importar de tokens/colors.ts):
  colors.primary               #00A8A8  teal ocean
  colors.primaryContainer      #E6F7F7  teal light
  colors.secondary             #FF6347  coral sunset
  colors.secondaryContainer    #FFF0ED  coral light
  colors.background            #FDFAF4  arena warm
  colors.surface               #FFFFFF  white
  colors.onSurface             #2E2822  texto principal
  colors.onSurfaceVariant      #6B6055  texto secundario
  colors.outline               #CEC5B6  bordes
  colors.separator             #E4DDD1  hairline separator
  colors.success               #2D9E6B  confirmado
  colors.warning               #E8A020  últimos cupos
  colors.error                 #D64040  error

  TIPOGRAFÍA (de tokens/typography.ts):
  typography.headlineSm   → sección/pantalla principal
  typography.titleLg      → nombre del evento en card
  typography.titleMd      → toolbar, dialog title
  typography.bodyLg       → descripción evento
  typography.bodyMd       → texto general
  typography.bodySm       → metadata (fecha, zona)
  typography.labelLg      → labels de botones
  typography.labelMd      → tab labels, chips
  typography.labelSm      → overlines uppercase

  SPACING (de tokens/spacing.ts — son NÚMEROS, no px):
  space.xs = 4    space.sm = 8    space.md = 16
  space.lg = 24   space.xl = 32   space.xxl = 48

  RADII (de tokens/radii.ts):
  radii.button = 9999   radii.card = 24
  radii.chip   = 9999   radii.input = 8
  radii.modal  = 24     radii.avatar = 9999

  SHADOWS (de tokens/shadows.ts):
  shadows.elevation1 → cards en reposo
  shadows.elevation2 → nav bar, FAB
  shadows.elevation3 → bottom sheets

  HAPTICS (de utils/haptics.ts):
  haptics.heavy()     → "Me anoto" (CTA principal)
  haptics.success()   → inscripción confirmada
  haptics.medium()    → botones secundarios
  haptics.light()     → toggle, tap en card
  haptics.selection() → chips, rating stars, step dots
  haptics.error()     → validación fallida
  haptics.warning()   → acción destructiva

  ÍCONOS (SF Symbols en iOS):
  checkmark.circle.fill  → confirmado
  plus.circle.fill       → me anoto
  location.magnifyingglass → explorar
  calendar.circle        → mis planes
  person.circle          → perfil
  slider.horizontal.3    → filtros
  star.fill              → rating
  mappin.and.ellipse     → ubicación
  person.3.fill          → grupo/asistentes

  DIFERENCIAS CLAVE WEB → RN:
  var(--color-X) → colors.X
  px             → número (RN dp/pt)
  box-shadow     → shadowColor + shadowOffset + ...
  CSS transition → react-native-reanimated
  :hover/:active → Pressable pressed state
  display:grid   → FlatList numColumns
  position:sticky→ SectionList stickyHeaderIndices
  overflow:scroll→ ScrollView o FlatList
  border-radius:full → borderRadius: 9999

  SAFE AREAS (CRÍTICO):
  SIEMPRE useSafeAreaInsets() o SafeAreaView
  NUNCA padding fijo para status bar o home indicator

  ACCESIBILIDAD:
  allowFontScaling={true} en TODOS los <Text>
  accessibilityLabel en íconos sin texto
  accessibilityRole en elementos interactivos
  Mínimo touch target: 48×48pt (usar hitSlop)
  useReduceMotion() antes de animar
```

---

*Design System v2.0 — People Conecta MVP — iOS (React Native)*
*Adaptación de v1.0 Material Design 3 → iOS Human Interface Guidelines*
*Stack: React Native 0.74+ | Plataforma: Cursor / Windsurf | Mayo 2026*
