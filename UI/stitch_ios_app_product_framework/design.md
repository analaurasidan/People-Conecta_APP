# People Conecta — Design System

**Versión:** 3.0 — Definitiva y unificada **Plataforma:** iOS nativa (React Native 0.74+) **Metodología:** Atomic Design **Stack:** React Native | React Navigation | Reanimated 3 **Herramienta:** Cursor / Windsurf

---

**Principio rector** El móvil es el gateway, no el destino. El usuario entra a la app para salir a la calle. El diseño debe sentirse como una mañana en Mar del Plata: claro, cálido, con el mar siempre presente. Minimalista pero vivo. Nunca frío. Nunca red social. Nunca corporativo.

---

## ÍNDICE

1. [Filosofía Visual](#1-filosofía-visual)  
2. [Design Tokens](#2-design-tokens)  
3. [Tipografía](#3-tipografía)  
4. [Iconografía — SF Symbols](#4-iconografía--sf-symbols)  
5. [Motion & Haptics](#5-motion--haptics)  
6. [Layout iOS — Safe Areas](#6-layout-ios--safe-areas)  
7. [Atoms](#7-atoms)  
8. [Molecules](#8-molecules)  
9. [Organisms](#9-organisms)  
10. [Templates — Pantallas](#10-templates--pantallas)  
11. [Navegación iOS](#11-navegación-ios)  
12. [Accesibilidad](#12-accesibilidad)  
13. [Estructura de archivos](#13-estructura-de-archivos)  
14. [Prompt para Cursor / Windsurf](#14-prompt-para-cursor--windsurf)  
15. [Quick Reference](#15-quick-reference)

---

## 1\. FILOSOFÍA VISUAL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  PRINCIPIOS DE DISEÑO

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  1\. ACTIVIDAD PRIMERO

     La imagen del plan domina. Los perfiles son secundarios.

     Nunca mostrar avatar antes que el plan.

  2\. FRICCIÓN MÍNIMA

     3 clics desde abrir la app hasta confirmar inscripción.

     Formularios con máximo 3 campos visibles a la vez.

     El botón principal siempre visible, nunca detrás de scroll.

  3\. CALIDEZ SIN EXCESO

     Fondos arena (no blanco puro). Sombras cálidas (no grises neutros).

     Bordes redondeados generosos. Nunca esquinas filosas en tarjetas.

  4\. AZUL MARINO DOMINA LA ACCIÓN

     Todo lo que el usuario puede hacer → azul marino.

     Fondo, contenido, estados → arena y blanco.

     El azul marino es la voz de la app. Habla cuando importa.

  5\. LENGUAJE iOS NATIVO

     Bottom sheets en lugar de modales.

     Swipe-to-dismiss en todas las vistas secundarias.

     Large titles en navegación principal.

     SF Symbols siempre. Sin íconos custom salvo ilustraciones.

     Haptics en cada acción de alto impacto.

  6\. NO ES RED SOCIAL

     Sin feed de actividad de amigos.

     Sin likes. Sin comentarios públicos.

     Sin contadores de seguidores.

     Sin historias. Sin stories.

     El único contenido es el plan.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  REFERENCIA VISUAL AIRBNB (adaptada)

  ─────────────────────────────────────────────────────

  Lo que tomamos de la referencia:

  ├── Fondo blanco/arena limpio con espacio generoso

  ├── Cards con foto grande \+ metadata debajo limpia

  ├── Bottom bar con 5 ítems bien espaciados

  ├── Bottom sheets para filtros y acciones

  ├── Tipografía grande y bold en títulos de sección

  ├── Botón CTA siempre al pie, bien visible

  ├── Perfiles con avatar redondo \+ nombre \+ dato clave

  └── Rating con estrella dorada como único ornamento

  Lo que NO tomamos:

  ├── Mapa como vista principal

  ├── Precios como dato central

  ├── Favoritos como mecánica core

  └── El color rosa/rojo del CTA → usamos azul marino

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

---

## 2\. DESIGN TOKENS

### 2.1 Paleta de color

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  3 COLORES BASE — Tierra · Mar · Luz

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ● AZUL MARINO (Mar profundo de Mar del Plata)

  ─────────────────────────────────────────────

  navy-50    \#EEF2F7   ████  Superficie azul muy suave

  navy-100   \#D0DCEA   ████  Tint de fondo activo

  navy-200   \#A3BBDA   ████  Hover suave

  navy-300   \#6D95C4   ████  Activo claro

  navy-400   \#3D6F9E   ████  Primario claro

  navy-500   \#1A4F7A   ████  ★ PRIMARY — botones, CTAs, links

  navy-600   \#153F63   ████  Pressed state

  navy-700   \#0F2E48   ████  Dark variant

  navy-800   \#091E30   ████  On-primary text (sobre navy-500)

  navy-900   \#040F18   ████  Deep dark

  Uso:

  → Botones filled (todos)

  → Links y acciones textuales

  → Iconos activos en tab bar

  → Badge de cupos confirmados

  → Borde de campo de texto en foco

  → Indicador de paso activo (onboarding)

  ● ARENA (Tierra costera, Mar del Plata)

  ─────────────────────────────────────────────

  sand-50    \#FDFAF5   ████  ★ Fondo principal de la app

  sand-100   \#F5EFE0   ████  Surface de cards

  sand-200   \#EAE0CA   ████  Dividers

  sand-300   \#D9CBB0   ████  Bordes suaves

  sand-400   \#C0A97E   ████  Placeholder text

  sand-500   \#9E8A5E   ████  Texto secundario / metadata

  sand-600   \#7A6A46   ████  Texto cuerpo secundario

  sand-700   \#574B30   ████  Texto body principal

  sand-800   \#362E1C   ████  Títulos

  sand-900   \#1C170C   ████  On-dark

  Uso:

  → Fondo de toda la app: sand-50

  → Cards en reposo: sand-100

  → Separadores y hairlines: sand-200 / sand-300

  → Texto secundario (fecha, zona, cupos): sand-500

  → Texto body principal: sand-700

  → Títulos de pantalla: sand-800

  ● BLANCO (Luz natural, espacio limpio)

  ─────────────────────────────────────────────

  white      \#FFFFFF   ████  Surface elevada (cards sobre fondo)

  white-warm \#FEFCF8   ████  White con temperatura cálida

  overlay-8  rgba(255,255,255,0.08)  Glassmorphism suave

  overlay-16 rgba(255,255,255,0.16)  Glassmorphism medio

  Uso:

  → Cards principales sobre fondo sand-50

  → Bottom sheets

  → Navigation bar background

  → Input backgrounds

  → Avatar rings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  COLORES SEMÁNTICOS (derivados de los 3 bases)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  success    \#2D6E4E   ████  Plan confirmado / asistencia OK

  success-bg \#EAF3ED   ████  Surface de confirmación

  warning    \#8C6010   ████  Últimos cupos disponibles

  warning-bg \#FBF3E2   ████  Surface de alerta cupos

  error      \#8C2020   ████  Error / cancelación

  error-bg   \#F9E8E8   ████  Surface de error

  Nota: Los semánticos son oscuros deliberadamente.

  Sobre fondo arena deben pasar AA de contraste siempre.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 2.2 Tokens semánticos en código

// tokens/colors.ts

export const colors \= {

  // ── Primario — Azul marino ──────────────────────────

  primary:              '\#1A4F7A',  // navy-500

  primaryLight:         '\#3D6F9E',  // navy-400

  primaryContainer:     '\#EEF2F7',  // navy-50

  primaryPressed:       '\#153F63',  // navy-600

  onPrimary:            '\#FFFFFF',

  onPrimaryContainer:   '\#0F2E48',  // navy-700

  // ── Superficie — Arena ───────────────────────────────

  background:           '\#FDFAF5',  // sand-50

  surface:              '\#FFFFFF',

  surfaceVariant:       '\#F5EFE0',  // sand-100

  onBackground:         '\#362E1C',  // sand-800

  onSurface:            '\#574B30',  // sand-700

  onSurfaceVariant:     '\#9E8A5E',  // sand-500

  outline:              '\#D9CBB0',  // sand-300

  outlineVariant:       '\#EAE0CA',  // sand-200

  separator:            '\#EAE0CA',  // sand-200 (hairline)

  // ── Semánticos ────────────────────────────────────────

  success:              '\#2D6E4E',

  successContainer:     '\#EAF3ED',

  warning:              '\#8C6010',

  warningContainer:     '\#FBF3E2',

  error:                '\#8C2020',

  errorContainer:       '\#F9E8E8',

  // ── Transparencias ────────────────────────────────────

  scrim:                'rgba(28, 23, 12, 0.48)',   // overlay sobre foto

  shimmer:              '\#EAE0CA',                  // skeleton base

};

### 2.3 Espaciado

// tokens/spacing.ts

// Grid base: 4pt. NUNCA usar valores fuera de esta escala.

export const space \= {

  xs:   4,

  sm:   8,

  md:  16,

  lg:  24,

  xl:  32,

  xxl: 48,

  xxxl: 64,

};

// Usos canónicos:

// Padding interno de card:       space.md (16)

// Gap entre cards en lista:      space.sm (8)  o space.md (16)

// Padding horizontal de screen:  space.md (16)

// Espaciado de sección a sección: space.xl (32)

// Padding interno de botón:      space.md vertical, space.xl horizontal

// Padding de bottom sheet:       space.lg (24)

### 2.4 Border radius

// tokens/radii.ts

export const radii \= {

  xs:     4,    // Tags internos muy pequeños

  sm:     8,    // Inputs, campos de texto

  md:     12,   // Cards secundarias, chips

  lg:     16,   // Cards principales

  xl:     24,   // Bottom sheets, modales, cards hero

  full:   9999, // Botones pill, chips, avatares, badges

};

// Regla de oro:

// Todo lo que el usuario toca (botones, chips) → full (pill)

// Cards → lg (16) o xl (24) según tamaño

// Inputs → sm (8)

// Bottom sheets → xl (24) solo arriba (topLeft \+ topRight)

### 2.5 Sombras iOS

// tokens/shadows.ts

export const shadows \= {

  // Cards en reposo

  sm: {

    shadowColor:   '\#1C170C',

    shadowOffset:  { width: 0, height: 1 },

    shadowOpacity: 0.06,

    shadowRadius:  4,

    elevation:     2,

  },

  // Cards en hover / FAB

  md: {

    shadowColor:   '\#1C170C',

    shadowOffset:  { width: 0, height: 4 },

    shadowOpacity: 0.10,

    shadowRadius:  12,

    elevation:     6,

  },

  // Bottom sheets / Nav bar

  lg: {

    shadowColor:   '\#1C170C',

    shadowOffset:  { width: 0, height: \-2 },

    shadowOpacity: 0.08,

    shadowRadius:  16,

    elevation:     12,

  },

};

// Nota: shadowColor siempre derivado de sand-900 (\#1C170C)

// Nunca usar \#000000 como shadowColor — rompe la calidez.

---

## 3\. TIPOGRAFÍA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  FUENTES

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Títulos / Display   →  "Plus Jakarta Sans"   Bold 700 / SemiBold 600

  Cuerpo / UI         →  "DM Sans"             Regular 400 / Medium 500

  Instalación:

  assets/fonts/

  ├── PlusJakartaSans-Bold.ttf

  ├── PlusJakartaSans-SemiBold.ttf

  ├── PlusJakartaSans-Medium.ttf

  ├── DMSans-Regular.ttf

  ├── DMSans-Medium.ttf

  └── DMSans-SemiBold.ttf

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ESCALA TIPOGRÁFICA iOS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Token          Fuente              Size  LH    W    Uso

  ─────────────────────────────────────────────────────────

  displayLg      Plus Jakarta Sans   34    41   700   Splash / bienvenida

  displayMd      Plus Jakarta Sans   28    34   700   Hero onboarding

  headlineLg     Plus Jakarta Sans   24    30   700   Título de pantalla (Large Title)

  headlineMd     Plus Jakarta Sans   20    26   700   Título de plan en card grande

  headlineSm     Plus Jakarta Sans   17    22   600   Section headers

  titleLg        DM Sans             17    22   600   NavigationBar title

  titleMd        DM Sans             15    20   600   Card title secundaria

  titleSm        DM Sans             13    18   600   Chips, labels de tab bar

  bodyLg         DM Sans             17    24   400   Descripción del plan

  bodyMd         DM Sans             15    22   400   Texto general, listados

  bodySm         DM Sans             13    18   400   Metadata (fecha, zona, cupos)

  labelLg        DM Sans             17    22   500   Label de botón principal

  labelMd        DM Sans             15    20   500   Label de botón secundario

  labelSm        DM Sans             12    16   500   Overline, timestamp

  caption        DM Sans             11    15   400   Texto muy pequeño (solo si necesario)

  ─────────────────────────────────────────────────────────

  Regla letterSpacing:

  → displayLg / displayMd:  \-0.5

  → headlineLg / headlineMd: \-0.3

  → títulos en mayúsculas (overlines): \+0.8

  → body / label: 0 (sin tracking)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// tokens/typography.ts

import { TextStyle } from 'react-native';

export const typography: Record\<string, TextStyle\> \= {

  displayLg:  { fontFamily: 'PlusJakartaSans-Bold',     fontSize: 34, lineHeight: 41, letterSpacing: \-0.5 },

  displayMd:  { fontFamily: 'PlusJakartaSans-Bold',     fontSize: 28, lineHeight: 34, letterSpacing: \-0.5 },

  headlineLg: { fontFamily: 'PlusJakartaSans-Bold',     fontSize: 24, lineHeight: 30, letterSpacing: \-0.3 },

  headlineMd: { fontFamily: 'PlusJakartaSans-Bold',     fontSize: 20, lineHeight: 26, letterSpacing: \-0.3 },

  headlineSm: { fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 17, lineHeight: 22, letterSpacing: \-0.2 },

  titleLg:    { fontFamily: 'DMSans-SemiBold',          fontSize: 17, lineHeight: 22, letterSpacing: 0 },

  titleMd:    { fontFamily: 'DMSans-SemiBold',          fontSize: 15, lineHeight: 20, letterSpacing: 0 },

  titleSm:    { fontFamily: 'DMSans-SemiBold',          fontSize: 13, lineHeight: 18, letterSpacing: 0 },

  bodyLg:     { fontFamily: 'DMSans-Regular',           fontSize: 17, lineHeight: 24, letterSpacing: 0 },

  bodyMd:     { fontFamily: 'DMSans-Regular',           fontSize: 15, lineHeight: 22, letterSpacing: 0 },

  bodySm:     { fontFamily: 'DMSans-Regular',           fontSize: 13, lineHeight: 18, letterSpacing: 0 },

  labelLg:    { fontFamily: 'DMSans-Medium',            fontSize: 17, lineHeight: 22, letterSpacing: 0 },

  labelMd:    { fontFamily: 'DMSans-Medium',            fontSize: 15, lineHeight: 20, letterSpacing: 0 },

  labelSm:    { fontFamily: 'DMSans-Medium',            fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },

  caption:    { fontFamily: 'DMSans-Regular',           fontSize: 11, lineHeight: 15, letterSpacing: 0 },

};

---

## 4\. ICONOGRAFÍA — SF SYMBOLS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  REGLAS DE ÍCONOS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ├── SIEMPRE SF Symbols en iOS. Sin íconos custom de terceros.

  ├── Variante .fill para estado activo/seleccionado.

  ├── Variante outline (sin .fill) para estado inactivo.

  ├── Color activo: colors.primary (navy-500)

  ├── Color inactivo: colors.onSurfaceVariant (sand-500)

  └── Tamaños: 20pt (tab bar) · 22pt (acciones) · 24pt (hero)

  MAPA DE ÍCONOS — People Conecta

  ─────────────────────────────────────────────────────────

  Pantalla                SF Symbol              Estado

  ─────────────────────────────────────────────────────────

  Tab: Explorar          location.magnifyingglass  outline / .fill

  Tab: Mis Planes        calendar.circle           outline / .fill

  Tab: Perfil            person.circle             outline / .fill

  ─────────────────────────────────────────────────────────

  Acción: Crear plan     plus.circle.fill          siempre .fill navy

  Acción: Inscribirse    checkmark.circle          → .fill al confirmar

  Acción: Cancelar       xmark.circle              outline

  Acción: Compartir      square.and.arrow.up       outline

  Acción: Reportar       exclamationmark.triangle  outline

  Acción: Volver         chevron.left              outline

  Acción: Filtros        slider.horizontal.3       outline

  ─────────────────────────────────────────────────────────

  Metadata: Zona         mappin.and.ellipse        outline sand-500

  Metadata: Fecha        calendar                  outline sand-500

  Metadata: Hora         clock                     outline sand-500

  Metadata: Cupos        person.2                  outline sand-500

  Metadata: Gratuito     tag                       outline success

  Metadata: Pago         banknote                  outline sand-500

  ─────────────────────────────────────────────────────────

  Estado: Confirmado     checkmark.seal.fill       success

  Estado: Pendiente      clock.fill                warning

  Estado: Cancelado      xmark.seal.fill           error

  Estado: Último cupo    flame.fill                warning

  ─────────────────────────────────────────────────────────

  Rating: Estrella       star.fill                 \#C0A97E (sand-400 cálido)

  Rating: Verificado     checkmark.circle.fill     navy-500

  ─────────────────────────────────────────────────────────

  TAMAÑOS DE TOQUE (siempre ≥ 48×48pt)

  Si el ícono es ≤ 24pt → agregar hitSlop={{ top:12, bottom:12, left:12, right:12 }}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

---

## 5\. MOTION & HAPTICS

### 5.1 Principios de animación

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  REGLAS DE MOVIMIENTO

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ├── SIEMPRE react-native-reanimated 3\. Nunca Animated de RN.

  ├── Respetar useReduceMotionHook() antes de animar.

  ├── Duración máxima de transición: 400ms.

  ├── Easing preferido: Easing.out(Easing.cubic)

  ├── Entrada de pantalla: fade \+ slide desde abajo (translateY: 20 → 0\)

  ├── Salida de pantalla: fade (opacity: 1 → 0\)

  └── Bottom sheet: spring con damping 20, stiffness 200

  TABLA DE DURACIONES

  ──────────────────────────────────────────

  Acción                      Duración  Easing

  ──────────────────────────────────────────

  Tap en botón (scale)          100ms   linear

  Fade de card al cargar        250ms   easeOut

  Entrada de bottom sheet       350ms   spring

  Transición entre pantallas    350ms   easeInOut

  Confirmación de inscripción   400ms   spring (celebración)

  Skeleton → contenido          300ms   easeOut

  ──────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 5.2 Haptics

// utils/haptics.ts

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options \= { enableVibrateFallback: true, ignoreAndroidSystemSettings: false };

export const haptics \= {

  // Acción principal de alto impacto

  heavy:     () \=\> ReactNativeHapticFeedback.trigger('impactHeavy', options),

  // Confirmación exitosa (inscripción confirmada)

  success:   () \=\> ReactNativeHapticFeedback.trigger('notificationSuccess', options),

  // Botones secundarios, navegación

  medium:    () \=\> ReactNativeHapticFeedback.trigger('impactMedium', options),

  // Tap en card, toggle, selección

  light:     () \=\> ReactNativeHapticFeedback.trigger('impactLight', options),

  // Chips, estrellas de rating, step dots

  selection: () \=\> ReactNativeHapticFeedback.trigger('selection', options),

  // Error en formulario, validación fallida

  error:     () \=\> ReactNativeHapticFeedback.trigger('notificationError', options),

  // Acción destructiva (cancelar plan)

  warning:   () \=\> ReactNativeHapticFeedback.trigger('notificationWarning', options),

};

// MAPA DE USO

// "Me anoto" (confirmar inscripción)  → haptics.heavy() \+ haptics.success()

// Crear plan (botón publicar)          → haptics.heavy()

// Cancelar inscripción                 → haptics.warning()

// Error de formulario                  → haptics.error()

// Seleccionar chip de categoría        → haptics.selection()

// Tap en card de plan                  → haptics.light()

// Navegar entre tabs                   → haptics.selection()

// Toggle switch                        → haptics.light()

---

## 6\. LAYOUT iOS — SAFE AREAS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  REGLAS DE LAYOUT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  CRÍTICO: NUNCA usar padding fijo para status bar o home indicator.

  SIEMPRE useSafeAreaInsets() de react-native-safe-area-context.

  Zonas de pantalla:

  ┌────────────────────────────────────────┐

  │ Status Bar (insets.top)  44–59pt       │ ← No tocar. SafeArea.

  ├────────────────────────────────────────┤

  │ Navigation Bar           44–96pt       │ ← React Navigation header

  ├────────────────────────────────────────┤

  │                                        │

  │ CONTENT AREA                           │ ← ScrollView / FlatList

  │ padding horizontal: 16pt               │

  │ padding entre secciones: 24–32pt       │

  │                                        │

  ├────────────────────────────────────────┤

  │ Tab Bar custom            83pt         │ ← 49pt barra \+ insets.bottom

  │ Home Indicator (insets.bottom) 34pt    │ ← No tocar. SafeArea.

  └────────────────────────────────────────┘

  PADDING HORIZONTAL ESTÁNDAR: 16pt en ambos lados.

  Excepción: Cards de ancho completo (EventCard hero) → 0 padding, border-radius en card.

  SCROLL:

  ├── Listas largas → FlatList con keyExtractor

  ├── Listas de 2 columnas (chips) → FlatList numColumns={2}

  ├── Scroll horizontal (categorías) → FlatList horizontal showsHorizontalScrollIndicator={false}

  └── Nunca ScrollView dentro de ScrollView

  KEYBOARD:

  ├── KeyboardAvoidingView behavior="padding" en iOS

  ├── keyboardVerticalOffset \= headerHeight \+ insets.top

  └── Usar react-native-keyboard-controller para mejor manejo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

---

## 7\. ATOMS

Los átomos son los elementos mínimos indivisibles. No tienen lógica de negocio.

### 7.1 Text

VARIANTES:

  displayLg   → Splash, bienvenida

  displayMd   → Onboarding hero

  headlineLg  → Título de pantalla (Large Title)

  headlineMd  → Nombre del plan (card grande)

  headlineSm  → Título de sección

  titleLg     → NavigationBar

  bodyLg      → Descripción del plan

  bodyMd      → Texto general

  bodySm      → Metadata (fecha, zona, cupos)

  labelLg     → Texto de botón principal

  labelMd     → Texto de botón secundario

  labelSm     → Overline / timestamp

REGLAS:

  ├── allowFontScaling={true} SIEMPRE

  ├── maxFontSizeMultiplier={1.5} SIEMPRE

  ├── Color por defecto: colors.onSurface (sand-700)

  ├── Títulos de pantalla: colors.onBackground (sand-800)

  └── Metadata / secundario: colors.onSurfaceVariant (sand-500)

VISUAL:

  ┌──────────────────────────────────────────────────┐

  │  Caminata al atardecer en la costa         34px  │  displayLg  Plus Jakarta Sans Bold

  │  Caminata al atardecer                     28px  │  displayMd

  │  Explorar planes                           24px  │  headlineLg

  │  Caminata al atardecer en la playa         20px  │  headlineMd

  │  Esta semana en Mar del Plata              17px  │  headlineSm

  │  Descripción del plan con más detalle      17px  │  bodyLg     DM Sans Regular

  │  Texto general de la aplicación            15px  │  bodyMd

  │  Mar del Plata · Sáb 7 jun · 3 cupos      13px  │  bodySm

  │  ME ANOTO                                  17px  │  labelLg    DM Sans Medium

  └──────────────────────────────────────────────────┘

### 7.2 Avatar

TAMAÑOS:

  xs   → 24pt   Avatares apilados en cupos confirmados (hasta 5 en fila)

  sm   → 32pt   Lista compacta de participantes

  md   → 48pt   Perfil dentro de card de plan

  lg   → 64pt   ProfileCard secundario

  xl   → 96pt   Pantalla de perfil principal

ANATOMÍA:

  ┌─────────────────────────────────────────────────────┐

  │                                                     │

  │    ╭──────╮     ╭──────╮   ← borderRadius: full    │

  │   │  foto  │   │  J    │   ← inicial si sin foto   │

  │    ╰──────╯     ╰──────╯                            │

  │                                                     │

  │   con foto       sin foto \= fondo sand-200,         │

  │                  inicial en sand-700, 600 SemiBold  │

  │                                                     │

  │   ring (verificado):                                │

  │   border: 2pt navy-500, offset: 2pt, color: white  │

  │                                                     │

  └─────────────────────────────────────────────────────┘

APILADO (AvatarStack):

  → Hasta 5 avatares visibles, tamaño xs (24pt)

  → Margen izquierdo negativo: \-8pt por avatar

  → Si hay más de 5: último avatar muestra "+N" en sand-200

  → Usado en: cupos confirmados de EventCard

### 7.3 Badge

TIPOS:

  dot    → Círculo 8pt. Color según tipo. Notificaciones sin número.

  count  → Pill con número. Máx "99+". Navy-500 bg, white text.

  label  → Pill con texto corto. Varios colores semánticos.

ANATOMÍA — label badge:

  ┌─────────────────────────────────────┐

  │                                     │

  │  ┌─────────────────┐                │

  │  │  Últimos cupos  │ ← warning bg  │

  │  └─────────────────┘                │

  │   padding: 4 horizontal, 2 vertical │

  │   borderRadius: full                │

  │   typography: labelSm              │

  │   height: 20pt                     │

  │                                     │

  └─────────────────────────────────────┘

VARIANTES:

  confirmado   → success bg \+ success text \+ checkmark.circle.fill

  últimos      → warning bg \+ warning text \+ flame.fill

  gratuito     → primaryContainer \+ primary text \+ tag

  cancelado    → error bg \+ error text \+ xmark.circle.fill

  nuevo        → navy-50 bg \+ navy-500 text (sin ícono)

### 7.4 Icon

WRAPPER para SF Symbols o vector icons.

Props:

  name     → SF Symbol name (string)

  size     → 16 | 20 | 22 | 24 | 32

  color    → color token

  variant  → 'outline' | 'fill'

Reglas:

  → fill: acciones confirmadas, tabs activos, badges

  → outline: acciones disponibles, tabs inactivos, metadata

  → Nunca usar íconos de tamaño menor a 16pt

  → Siempre hitSlop mínimo para alcanzar 48×48pt

### 7.5 Skeleton

Placeholder de carga. Reemplaza contenido hasta que lleguen los datos.

ANATOMÍA — EventCard skeleton:

  ┌─────────────────────────────────────────────────┐

  │                                                 │

  │  ██████████████████████████████████  ← foto    │

  │  ████████████████████████████████████          │

  │  ██████████████████████████████████            │

  │  (ratio 16:9, borderRadius lg arriba)           │

  │                                                 │

  │  ████████████████████           ← título       │

  │  ████████████                   ← metadata     │

  │  ████████████████████████       ← descripción  │

  │                                                 │

  └─────────────────────────────────────────────────┘

Animación: shimmer horizontal (translateX de \-width a \+width)

Color base: sand-200 (\#EAE0CA)

Color shimmer: sand-100 (\#F5EFE0)

Duración: 1200ms loop infinito

### 7.6 Divider

TIPOS:

  full   → ancho completo de pantalla. Hairline (StyleSheet.hairlineWidth).

  inset  → con margen izquierdo de 72pt (para listas con avatar).

  middle → con margen en ambos lados de 16pt.

Color: colors.separator (sand-200)

USO:

  → Entre ítems de lista en sección

  → NUNCA en cards o bottom sheets (usan espacio para separar)

  → NUNCA entre secciones completas (usan spacing)

---

## 8\. MOLECULES

Las moléculas combinan átomos. Tienen un propósito específico y visible.

### 8.1 Button

ANATOMÍA GENERAL:

  ┌───────────────────────────────────────────────────────────┐

  │                                                           │

  │  FILLED (principal)          OUTLINED (secundario)        │

  │  ┌─────────────────────┐    ┌─────────────────────────┐  │

  │  │    ✓  Me anoto      │    │    ✓  Me anoto          │  │

  │  └─────────────────────┘    └─────────────────────────┘  │

  │  bg: navy-500               bg: transparent              │

  │  text: white                text: navy-500               │

  │  border: —                  border: 1.5pt navy-500       │

  │                                                           │

  │  TEXT (acción inline)        GHOST (destructivo)         │

  │  Ver todos →                ✕ Cancelar inscripción        │

  │  text: navy-500             text: error                   │

  │  sin borde ni bg            sin borde ni bg               │

  │                                                           │

  └───────────────────────────────────────────────────────────┘

TAMAÑOS:

  lg  → height: 56pt  padding: 16 v, 28 h  labelLg  → CTA principal

  md  → height: 48pt  padding: 12 v, 24 h  labelMd  → Acciones secundarias

  sm  → height: 36pt  padding: 8 v, 16 h   labelSm  → Acciones inline

BORDES: siempre borderRadius: full (pill). Sin esquinas.

ESTADOS:

  default   → navy-500 / opacidad 100%

  pressed   → scale: 0.97, navy-600 / duración: 100ms

  disabled  → sand-300 bg, sand-500 text, opacidad 50%

  loading   → ActivityIndicator white, en lugar del label

HAPTICS:

  filled lg → haptics.heavy()

  filled md → haptics.medium()

  outlined  → haptics.light()

  ghost     → sin haptic

REGLA DE JERARQUÍA:

  → Máximo UN botón filled por pantalla/sección

  → El botón filled va siempre al pie de la pantalla, sticky

  → Nunca dos filled uno al lado del otro

### 8.2 TextField

ANATOMÍA:

  ┌─────────────────────────────────────────────────────┐

  │                                                     │

  │  Label  (bodySm, sand-500)                         │

  │                                                     │

  │  ┌───────────────────────────────────────────────┐  │

  │  │  Placeholder text...                          │  │

  │  └───────────────────────────────────────────────┘  │

  │  height: 52pt | bg: white | borderRadius: sm (8)   │

  │  border: 1.5pt sand-300 (default)                  │

  │  border: 1.5pt navy-500 (focused)                  │

  │  border: 1.5pt error (error)                        │

  │                                                     │

  │  Helper text  (caption, sand-500 / error-main)      │

  │                                                     │

  └─────────────────────────────────────────────────────┘

VARIANTES:

  default   → borde sand-300

  focused   → borde navy-500 (1.5pt → 2pt en focus)

  filled    → con contenido, borde sand-300

  error     → borde error-main, helper en rojo

  disabled  → bg sand-100, borde sand-200, texto sand-400

BÚSQUEDA (SearchBar):

  → bg: sand-100 (no white)

  → borderRadius: full

  → sin border visible

  → ícono magnifyingglass a la izquierda en sand-500

  → clearButton (xmark.circle.fill) a la derecha si hay texto

  → height: 44pt

COMPORTAMIENTO TECLADO:

  → KeyboardAvoidingView behavior="padding"

  → Scroll to focused field automático

  → returnKeyType según contexto ("next" / "search" / "done")

### 8.3 Chip

ANATOMÍA:

  ┌──────────────────────────────────────────────────┐

  │                                                  │

  │  INACTIVO              ACTIVO                    │

  │  ┌─────────────┐       ┌─────────────┐           │

  │  │  Deportes   │       │● Deportes   │           │

  │  └─────────────┘       └─────────────┘           │

  │  bg: white             bg: navy-50               │

  │  border: sand-300      border: navy-500 (1.5pt)  │

  │  text: sand-700        text: navy-500            │

  │                                                  │

  └──────────────────────────────────────────────────┘

Tamaño: height 34pt | borderRadius: full | padding: 8 v · 16 h

Tipografía: labelMd (DMSans Medium 15pt)

VARIANTES:

  filter      → sin ícono. Para categorías, zonas, días.

  filter-icon → con SF Symbol a la izquierda (16pt)

  day         → solo el día abreviado. "Sáb" / "Dom". width fijo 48pt.

  input       → con × para eliminar. Usado en búsqueda con filtros aplicados.

COMPORTAMIENTO:

  → haptics.selection() al seleccionar

  → scale: 0.96 en pressed (100ms)

  → Scroll horizontal sin indicador en FilterBar

  → Estado activo persiste hasta que el usuario lo deselecciona

### 8.4 ListItem

ANATOMÍA DE 3 LÍNEAS (máxima):

  ┌───────────────────────────────────────────────────┐

  │                                                   │

  │  ╭──────╮   Nombre del usuario              \>    │

  │  │ foto │   Rol / intereses principales          │

  │  ╰──────╯   ★ 4.8  ·  12 planes creados          │

  │                                                   │

  │  leading: avatar md (48pt)                        │

  │  trailing: chevron.right o acción                 │

  │  height mínima: 72pt                              │

  │  padding: 16 horizontal                           │

  │  separador: Divider inset al pie                  │

  │                                                   │

  └───────────────────────────────────────────────────┘

VARIANTES:

  1-line  → Solo título. Listas simples de zonas, días.

  2-line  → Título \+ subtítulo. Listado de participantes.

  3-line  → Título \+ dos líneas meta. Creador del plan en detalle.

ESTADOS:

  default  → bg: transparent

  pressed  → bg: sand-100 (tint suave)

  selected → bg: navy-50, texto navy-500

### 8.5 RatingStars

LECTURA:

  ★ ★ ★ ★ ☆   4.0

  ─────────────────

  Estrella fill: \#C0A97E (sand-400 cálido, no amarillo estándar)

  Estrella vacía: sand-200

  Número a la derecha: bodySm sand-500

  Tamaño estrella: 14pt

  Gap entre estrellas: 2pt

INTERACTIVO (solo en pantalla de review):

  → Tamaño: 32pt

  → haptics.selection() al tocar cada estrella

  → Animación: scale 1.2 en estrella tocada (spring)

  → Solo media estrella o entera (sin decimales raros)

### 8.6 ProgressBar de cupos

ANATOMÍA:

  ┌─────────────────────────────────────────────────────┐

  │                                                     │

  │  3 / 6 cupos confirmados                            │

  │  ██████████░░░░░░░░░░  50%                         │

  │  bg rail: sand-200                                  │

  │  bg fill: navy-500                                  │

  │  height: 4pt | borderRadius: full                   │

  │                                                     │

  │  Cuando queda 1 cupo:                               │

  │  ████████████████████░  83%                        │

  │  fill: warning (\#8C6010)                           │

  │  label: "¡Último cupo\!" en warning                 │

  │                                                     │

  │  Completo:                                          │

  │  ██████████████████████  100%                       │

  │  fill: success                                      │

  │  label: "Completo"                                  │

  │                                                     │

  └─────────────────────────────────────────────────────┘

---

## 9\. ORGANISMS

Los organismos son componentes completos con lógica visual propia.

### 9.1 EventCard

El componente más importante de la app.

VARIANTES:

  hero    → ancho completo, foto 4:3. En pantalla de detalle.

  feed    → ancho pantalla \- 32pt padding. Lista principal.

  compact → fila horizontal. En "Mis Planes".

────────────────────────────────────────────────────────────────

  EVENTCARD — FEED (variante principal)

────────────────────────────────────────────────────────────────

  ┌──────────────────────────────────────────────────────┐

  │                                                      │

  │  ┌────────────────────────────────────────────────┐  │

  │  │                                                │  │

  │  │                   FOTO                        │  │

  │  │                (ratio 16:9)                   │  │

  │  │                                               │  │

  │  │  ┌──────────────┐              ♡              │  │

  │  │  │  Deportes    │    ← badge categoría        │  │

  │  │  └──────────────┘    ← top-left               │  │

  │  │                                               │  │

  │  └────────────────────────────────────────────────┘  │

  │  borderRadius: lg lg 0 0 (arriba redondeado)         │

  │                                                      │

  │  ─────────────────────────────────────────────────   │

  │                                                      │

  │  Caminata al atardecer en la playa     headlineMd   │

  │  Palermo · Sáb 7 jun · 09:00           bodySm       │

  │                                                      │

  │  ──────────────────────────────────────────────────  │

  │                                                      │

  │  ╭─╮ ╭─╮ ╭─╮ \+2      ██████░░░  3/6 cupos          │

  │  avatars stack        progress bar                   │

  │                                                      │

  └──────────────────────────────────────────────────────┘

  Dimensiones:

  bg: white | borderRadius: lg (16pt) | shadow: shadows.sm

  Margen entre cards: space.md (16pt)

  Padding interior (bajo foto): space.md (16pt)

  Interacción:

  → Tap en card → pantalla EventDetail

  → haptics.light() al tocar

  → Corazón (wishlist): sin función en MVP — ocultar o mostrar sin acción

  → Badge de categoría: pill, navy-50 bg, navy-500 text, labelSm

────────────────────────────────────────────────────────────────

  EVENTCARD — COMPACT (para Mis Planes)

────────────────────────────────────────────────────────────────

  ┌────────────────────────────────────────────────────────────┐

  │                                                            │

  │  ┌────────┐   Caminata al atardecer         Confirmado ✓  │

  │  │  foto  │   Sáb 7 jun · 09:00                           │

  │  │  64×64 │   Palermo · 3/6 cupos                         │

  │  └────────┘                                               │

  │  foto: borderRadius md (12pt)                             │

  │  height: 80pt                                             │

  │                                                            │

  └────────────────────────────────────────────────────────────┘

### 9.2 FilterBar

ANATOMÍA:

  ┌──────────────────────────────────────────────────────────┐

  │                                                          │

  │  ┌────────────────────────────────────────────────────┐  │

  │  │  🔍  Buscar planes...                              │  │

  │  └────────────────────────────────────────────────────┘  │

  │  SearchBar: height 44pt, bg sand-100, borderRadius full  │

  │                                                          │

  │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─    │

  │                                                          │

  │  Todos  Deportes  Gastronomía  Arte  Naturaleza  →       │

  │  ←──────────────────────────────────────────── scroll   │

  │                                                          │

  │  Chips: scroll horizontal, gap 8pt, sin indicator        │

  └──────────────────────────────────────────────────────────┘

  bg: colors.background (sand-50) | shadow: shadows.lg (abajo)

  Posición: sticky bajo NavigationBar

  padding: 12pt top, 16pt horizontal, 8pt bottom

### 9.3 NavigationBar (Tab Bar)

ANATOMÍA:

  ┌──────────────────────────────────────────────────────────┐

  │                                                          │

  │    Explorar        Mis Planes         Perfil             │

  │    location        calendar           person             │

  │  .magnifyingglass  .circle.fill     .circle.fill         │

  │                                                          │

  │    \[activo\]        \[inactivo\]        \[inactivo\]          │

  │    navy-500        sand-400          sand-400            │

  │                                                          │

  └──────────────────────────────────────────────────────────┘

  height: 49pt \+ insets.bottom

  bg: white con shadows.lg (sombra hacia arriba)

  separador: Divider full en el top

  ícono activo: fill, navy-500

  ícono inactivo: outline, sand-400

  label: labelSm, navy-500 (activo) / sand-400 (inactivo)

  label siempre visible (sin ocultar en scroll)

  FAB — Crear Plan:

  → Botón circular 56pt, navy-500 bg, plus blanco

  → Posicionado sobre el tab bar, alineado a la derecha (margin 16pt)

  → shadow: shadows.md

  → Al tocar: haptics.heavy() \+ bottom sheet de creación

  → SOLO visible en tab Explorar

### 9.4 NavigationHeader

VARIANTES:

  LARGE TITLE (pantallas principales — Explorar, Mis Planes):

  ┌──────────────────────────────────────────────────────────┐

  │  People Conecta                      ⚙  ícono settings  │

  │  ─────────────────── (Scrollea y se transforma en:)      │

  │  People Conecta           ←  compact centered title      │

  └──────────────────────────────────────────────────────────┘

  largeTitleStyle: headlineLg, sand-800

  compactTitleStyle: titleLg, sand-800

  bg: sand-50 (translucido con blur al hacer scroll)

  BACK NAVIGATION (pantallas de detalle — EventDetail, Perfil):

  ┌──────────────────────────────────────────────────────────┐

  │  ← Explorar              Nombre del Plan                 │

  └──────────────────────────────────────────────────────────┘

  backLabel: titleMd, navy-500

  backIcon: chevron.left, 20pt, navy-500

  title: titleLg, sand-800, centrado

  bg: white translucido (blur) al hacer scroll

### 9.5 BottomSheet

ANATOMÍA:

  ┌──────────────────────────────────────────────────────────┐

  │                                                          │

  │  ─────  drag indicator (40×4pt, sand-300, radius full)   │

  │                                                          │

  │  Título del sheet                    headlineSm          │

  │                                                          │

  │  ─────────────────────────────────────────── divider    │

  │                                                          │

  │  CONTENIDO                                               │

  │  (variable según sheet)                                  │

  │                                                          │

  │  ─────────────────────────────────────────────────────   │

  │                                                          │

  │  ┌──────────────────────────────────────────────────┐   │

  │  │               Acción principal                   │   │

  │  └──────────────────────────────────────────────────┘   │

  │                                                          │

  │  ← padding bottom: insets.bottom \+ space.md             │

  └──────────────────────────────────────────────────────────┘

  bg: white

  borderRadius: xl xl 0 0 (solo arriba)

  backdrop: scrim rgba(28,23,12,0.48)

  Librería: @gorhom/bottom-sheet

INSTANCIAS:

  FilterSheet     → filtros avanzados (zona, día, gratuito/pago, cupos)

  ConfirmSheet    → resumen antes de confirmar inscripción

  CancelSheet     → confirmación antes de cancelar (destructivo)

  ReviewSheet     → rating \+ comentario post-evento

  CreatePlanSheet → formulario de creación de plan (multipasos)

  ReportSheet     → motivos de reporte rápido

### 9.6 OnboardingStep

ANATOMÍA (3 pasos):

  ┌──────────────────────────────────────────────────────────┐

  │                                                          │

  │  ●  ○  ○    ← step indicator (dots 8pt, gap 8pt)        │

  │                                                          │

  │  ┌──────────────────────────────────────────────────┐   │

  │  │         ILUSTRACIÓN SVG                          │   │

  │  │         altura: 220pt                            │   │

  │  └──────────────────────────────────────────────────┘   │

  │                                                          │

  │  ¿Recién llegaste                       displayMd        │

  │  a la ciudad?                                            │

  │                                                          │

  │  Elegí un motivo:                       bodyMd          │

  │                                                          │

  │  ┌───────────────────┐  ┌───────────────────┐           │

  │  │  🏠 Me mudé      │  │  💼 Trabajo nuevo │           │

  │  └───────────────────┘  └───────────────────┘           │

  │  ┌───────────────────┐  ┌───────────────────┐           │

  │  │  💔 Separación   │  │  📱 Quiero salir  │           │

  │  └───────────────────┘  └───────────────────┘           │

  │  → Chips de selección (multi-select)                     │

  │                                                          │

  │  ┌──────────────────────────────────────────────────┐   │

  │  │                  Continuar                       │   │

  │  └──────────────────────────────────────────────────┘   │

  │  → Button filled lg, navy-500                           │

  │                                                          │

  └──────────────────────────────────────────────────────────┘

Pasos:

  1 → Motivo de uso (chips de contexto)

  2 → Intereses (chips de categorías: Deportes, Arte, Gastronomía...)

  3 → Zona / barrio en la ciudad

Transición entre pasos: slide horizontal \+ fade, 300ms easeInOut

Dot activo: navy-500 filled. Inactivo: sand-300.

### 9.7 ProfileCard

ANATOMÍA:

  ┌──────────────────────────────────────────────────────────┐

  │                                                          │

  │         ╭──────────────╮                                │

  │        │    AVATAR      │  96pt                         │

  │         ╰──────────────╯                                │

  │           ✓ (si verificado)                              │

  │                                                          │

  │         Valentina García          headlineMd            │

  │         Mar del Plata             bodySm sand-500        │

  │                                                          │

  │  ┌──────────┐  ┌──────────┐  ┌──────────┐              │

  │  │  12      │  │  ★ 4.8   │  │  Junio   │              │

  │  │ Planes   │  │ Rating   │  │ 2024     │              │

  │  └──────────┘  └──────────┘  └──────────┘              │

  │  → Stats row con dividers verticales                     │

  │                                                          │

  │  Deportes  ·  Arte  ·  Gastronomía                      │

  │  → Intereses como chips read-only (sand-100 bg)          │

  │                                                          │

  └──────────────────────────────────────────────────────────┘

### 9.8 EmptyState

ANATOMÍA:

  ┌──────────────────────────────────────────────────────────┐

  │                                                          │

  │         ILUSTRACIÓN SVG                                  │

  │         altura: 160pt                                    │

  │         (carácter amigable, paleta app)                  │

  │                                                          │

  │         No hay planes esta semana       headlineSm       │

  │                                                          │

  │         Sé el primero en proponer        bodyMd          │

  │         algo en tu zona.                sand-500         │

  │                                                          │

  │  ┌──────────────────────────────────────────────────┐   │

  │  │              Crear un plan                       │   │

  │  └──────────────────────────────────────────────────┘   │

  │  → Button filled md, navy-500 (si aplica)               │

  │                                                          │

  └──────────────────────────────────────────────────────────┘

INSTANCIAS:

  no-plans-zone    → Sin planes en zona del usuario

  no-plans-week    → Sin planes esta semana

  no-history       → Mis Planes vacío (nunca se inscribió)

  plan-full        → Plan sin cupos disponibles

  pending-approval → Perfil aún no aprobado

---

## 10\. TEMPLATES — PANTALLAS

Los templates definen el layout de cada pantalla. No contienen datos reales.

### 10.1 ExplorarScreen

LAYOUT:

  ┌──────────────────────────────────────────────────────────┐

  │  STATUS BAR (insets.top)                                 │

  ├──────────────────────────────────────────────────────────┤

  │  NavigationBar — Large Title "People Conecta"            │

  │  \+ ícono settings derecha                                │

  ├──────────────────────────────────────────────────────────┤

  │  FilterBar (sticky)                                      │

  │  → SearchBar                                             │

  │  → Chips scroll horizontal                              │

  ├──────────────────────────────────────────────────────────┤

  │                                                          │

  │  SCROLL (FlatList)                                       │

  │                                                          │

  │  "Esta semana"   headlineSm                              │

  │  ─────────────────────────────────────────────────────   │

  │  EventCard (feed)                                        │

  │  EventCard (feed)                                        │

  │  EventCard (feed) ← skeleton mientras carga             │

  │  ...                                                     │

  │                                                          │

  │  \[padding bottom: tab bar height \+ space.xl\]             │

  │                                                          │

  ├──────────────────────────────────────────────────────────┤

  │  TAB BAR \+ FAB crear plan                                │

  │  HOME INDICATOR (insets.bottom)                          │

  └──────────────────────────────────────────────────────────┘

ESTADOS:

  loading  → EventCard skeletons (3 ítems)

  empty    → EmptyState "no-plans-zone"

  error    → EmptyState con botón reintentar

  filled   → Lista de EventCards

### 10.2 EventDetailScreen

LAYOUT:

  ┌──────────────────────────────────────────────────────────┐

  │  STATUS BAR (insets.top)                                 │

  ├──────────────────────────────────────────────────────────┤

  │  NavigationBar — Back "Explorar" \+ título plan           │

  │  \+ share (square.and.arrow.up)                           │

  ├──────────────────────────────────────────────────────────┤

  │                                                          │

  │  SCROLL                                                  │

  │                                                          │

  │  ┌────────────────────────────────────────────────────┐  │

  │  │            FOTO PLAN (hero, ratio 4:3)             │  │

  │  └────────────────────────────────────────────────────┘  │

  │  → Foto de ancho completo, sin padding horizontal       │

  │  → Badge categoría top-left                             │

  │                                                          │

  │  \[padding 16pt\]                                          │

  │  Nombre del plan                    headlineLg           │

  │                                                          │

  │  📍 Palermo · 🗓 Sáb 7 jun · ⏰ 09:00   bodySm        │

  │                                                          │

  │  ██████████░░░░░░  3 / 6 cupos   ProgressBar            │

  │                                                          │

  │  ──────────────────────────────────────────────────      │

  │                                                          │

  │  Sobre el plan                      headlineSm           │

  │  Descripción completa del plan...   bodyLg               │

  │                                                          │

  │  ──────────────────────────────────────────────────      │

  │                                                          │

  │  Quién propone                      headlineSm           │

  │  ListItem creador (3-line)                               │

  │                                                          │

  │  ──────────────────────────────────────────────────      │

  │                                                          │

  │  Van a ir (3 de 6\)                  headlineSm           │

  │  ListItem participante 1                                 │

  │  ListItem participante 2                                 │

  │  ListItem participante 3                                 │

  │  Ver todos →   Text button                               │

  │                                                          │

  │  \[padding bottom: 120pt para el CTA sticky\]              │

  │                                                          │

  ├──────────────────────────────────────────────────────────┤

  │  CTA STICKY (fondo white, shadow arriba)                 │

  │  $precio o "Gratuito"  labelMd  \+  Button "Me anoto" lg  │

  │  HOME INDICATOR (insets.bottom)                          │

  └──────────────────────────────────────────────────────────┘

VARIANTES DEL CTA STICKY:

  disponible  → Button filled navy "Me anoto"

  completo    → Button disabled "Sin cupos"

  inscripto   → Button outlined navy "Cancelar inscripción" \+ badge "Confirmado ✓"

  propio      → Button ghost navy "Editar plan" (si es el creador)

### 10.3 MisPlanesScreen

LAYOUT:

  ┌──────────────────────────────────────────────────────────┐

  │  STATUS BAR \+ NavigationBar "Mis Planes"                 │

  ├──────────────────────────────────────────────────────────┤

  │                                                          │

  │  SELECTOR DE VISTA (segmented):                          │

  │  \[ Próximos \]  \[ Pasados \]                               │

  │  → Chips de selección ancho completo                     │

  │                                                          │

  │  SCROLL (FlatList)                                       │

  │                                                          │

  │  EventCard (compact) — plan 1                           │

  │  EventCard (compact) — plan 2                           │

  │  EventCard (compact) — plan 3                           │

  │                                                          │

  │  O si está vacío:                                        │

  │  EmptyState "no-history"                                 │

  │                                                          │

  ├──────────────────────────────────────────────────────────┤

  │  TAB BAR                                                 │

  └──────────────────────────────────────────────────────────┘

### 10.4 PerfilScreen

LAYOUT:

  ┌──────────────────────────────────────────────────────────┐

  │  STATUS BAR \+ NavigationBar "Mi perfil" \+ settings       │

  ├──────────────────────────────────────────────────────────┤

  │                                                          │

  │  SCROLL                                                  │

  │                                                          │

  │  ProfileCard (xl avatar \+ stats \+ intereses)             │

  │                                                          │

  │  ──────────────────────────────────────────────────      │

  │                                                          │

  │  Mis planes creados         headlineSm                   │

  │  EventCard compact × 3                                   │

  │  Ver todos →   Text button                               │

  │                                                          │

  │  ──────────────────────────────────────────────────      │

  │                                                          │

  │  Mis reseñas                headlineSm                   │

  │  ListItem reseña × 3                                     │

  │                                                          │

  ├──────────────────────────────────────────────────────────┤

  │  TAB BAR                                                 │

  └──────────────────────────────────────────────────────────┘

### 10.5 OnboardingScreen

LAYOUT:

  ┌──────────────────────────────────────────────────────────┐

  │  STATUS BAR (safe area)                                  │

  │  bg: sand-50                                             │

  │                                                          │

  │  ● ○ ○     step indicator (top-center)                  │

  │                                                          │

  │  SVG ilustración (center, h: 220pt)                      │

  │                                                          │

  │  Título del paso               displayMd navy/sand-800   │

  │                                                          │

  │  Subtítulo explicativo         bodyLg sand-500           │

  │                                                          │

  │  OPCIONES (chips grid 2 cols)                            │

  │  ┌─────────────┐ ┌─────────────┐                        │

  │  │  opción 1   │ │  opción 2   │                        │

  │  └─────────────┘ └─────────────┘                        │

  │  ┌─────────────┐ ┌─────────────┐                        │

  │  │  opción 3   │ │  opción 4   │                        │

  │  └─────────────┘ └─────────────┘                        │

  │                                                          │

  │  \[spacer flexible\]                                       │

  │                                                          │

  │  ┌──────────────────────────────────────────────────┐   │

  │  │                  Continuar                       │   │

  │  └──────────────────────────────────────────────────┘   │

  │  Button filled lg, navy-500                             │

  │                                                          │

  │  HOME INDICATOR (insets.bottom)                          │

  └──────────────────────────────────────────────────────────┘

NO HAY NavigationBar en Onboarding.

El botón "Continuar" puede decir "Empezar" en el último paso.

### 10.6 CreatePlanSheet (Bottom Sheet multipasos)

PASOS DEL FORMULARIO:

  1 → Nombre del plan \+ categoría

  2 → Descripción breve (máx 280 caracteres)

  3 → Fecha \+ hora

  4 → Zona / barrio

  5 → Cupo máximo (3–20 personas, stepper)

  6 → ¿Gratuito o pago? (si pago: monto \+ aclaración)

  7 → Foto del plan (generar con IA o subir foto)

  8 → Revisión y publicar

LAYOUT DE CADA PASO:

  ┌──────────────────────────────────────────────────────────┐

  │  ─────  drag indicator                                   │

  │                                                          │

  │  Paso 1 de 8    ← labelSm sand-500                       │

  │  ████████░░░░░░░░░░░░░  ← ProgressBar navy / sand-200   │

  │                                                          │

  │  Nombre del plan               headlineSm                │

  │                                                          │

  │  ┌────────────────────────────────────────────────────┐  │

  │  │  ¿Cómo se llama tu plan?                           │  │

  │  └────────────────────────────────────────────────────┘  │

  │  TextField                                               │

  │                                                          │

  │  \[spacer\]                                                │

  │                                                          │

  │  ┌──────────────────────────────────────────────────┐   │

  │  │                  Siguiente                       │   │

  │  └──────────────────────────────────────────────────┘   │

  │  padding bottom: insets.bottom \+ space.md               │

  └──────────────────────────────────────────────────────────┘

El paso de foto IA muestra:

  → Botón "Generar imagen ✨" (filled navy)

  → Preview de la imagen generada (ratio 16:9)

  → Botón "Regenerar" (outlined navy) — solo 1 intento en free

  → Botón "Subir mi foto" (text navy)

---

## 11\. NAVEGACIÓN iOS

// navigation/AppNavigator.tsx

// Stack principal con React Navigation 6+

// ESTRUCTURA:

//

// AppNavigator

// ├── AuthStack (si no hay sesión)

// │   ├── SplashScreen

// │   ├── RegisterScreen

// │   ├── VerifyPhoneScreen

// │   └── OnboardingScreen (3 pasos)

// │

// └── TabNavigator (si hay sesión \+ perfil aprobado)

//     ├── Tab: Explorar

//     │   └── Stack

//     │       ├── ExplorarScreen      (Large Title)

//     │       └── EventDetailScreen   (Back nav)

//     │

//     ├── Tab: Mis Planes

//     │   └── Stack

//     │       ├── MisPlanesScreen     (Large Title)

//     │       └── EventDetailScreen   (Back nav)

//     │

//     └── Tab: Perfil

//         └── Stack

//             ├── PerfilScreen        (Large Title)

//             └── SettingsScreen      (Back nav)

// PENDING APPROVAL STATE:

// Si perfil pendiente → mostrar PendingApprovalScreen en lugar de TabNavigator

// Sin tab bar. Solo pantalla de espera con estado de aprobación.

// TRANSICIONES:

// Stack estándar iOS: slide horizontal (por defecto en RN)

// Bottom Sheets: no son rutas — son componentes superpuestos

// Modales: NO usar para flujos principales — usar bottom sheets

REGLAS DE NAVEGACIÓN:

  ├── Large Title → aparece cuando la pantalla está scrolleada arriba

  ├── Compact Title → aparece al hacer scroll (automático en RN)

  ├── Back button → siempre chevron.left \+ label de pantalla anterior

  ├── Back label máximo 12 caracteres (truncar si es más largo)

  ├── swipeBack: true → SIEMPRE habilitado en stacks

  └── Gestures de iOS: nunca deshabilitar swipe-to-go-back

---

## 12\. ACCESIBILIDAD

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  REGLAS OBLIGATORIAS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  TEXTO:

  ├── allowFontScaling={true} en TODOS los \<Text\>

  ├── maxFontSizeMultiplier={1.5} en TODOS los \<Text\>

  └── Nunca tamaño de fuente menor a 11pt

  CONTRASTE (WCAG AA mínimo):

  ├── navy-500 (\#1A4F7A) sobre white → ratio 7.2:1 ✓ AAA

  ├── sand-800 (\#362E1C) sobre sand-50 → ratio 9.1:1 ✓ AAA

  ├── sand-500 (\#9E8A5E) sobre white → ratio 3.1:1 ✓ AA (texto grande)

  └── sand-700 (\#574B30) sobre white → ratio 6.2:1 ✓ AAA

  TOUCH TARGETS:

  ├── Mínimo: 48×48pt (Apple HIG)

  ├── Íconos ≤ 24pt: agregar hitSlop

  └── hitSlop \= { top: 12, bottom: 12, left: 12, right: 12 }

  ACCESIBILIDAD RN:

  ├── accessibilityLabel en íconos sin texto visible

  ├── accessibilityRole en elementos interactivos

  │   → "button" | "link" | "image" | "header" | "tab"

  ├── accessibilityState={{ selected, disabled, checked }}

  ├── accessibilityHint para acciones no obvias

  └── accessible={false} en elementos decorativos

  MOTION:

  ├── useReduceMotion() de Reanimated antes de toda animación

  └── Si reduceMotion: desactivar animaciones, mantener cambios instantáneos

  VOICEOVER (ORDEN DE LECTURA):

  ├── El orden de foco debe seguir el orden visual lógico

  ├── AvatarStack: "3 participantes confirmados. Valentina, Lucas y 1 más."

  ├── ProgressBar: "3 de 6 cupos confirmados"

  └── Botón CTA: "Me anoto al plan Caminata al atardecer. Botón."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

---

## 13\. ESTRUCTURA DE ARCHIVOS

src/

├── tokens/

│   ├── colors.ts           ← paleta \+ roles semánticos

│   ├── typography.ts       ← TextStyle objects

│   ├── spacing.ts          ← números (NO px ni pt como string)

│   ├── radii.ts            ← border radius values

│   ├── shadows.ts          ← iOS shadow objects

│   └── index.ts            ← barrel export { colors, typography, space, radii, shadows }

│

├── utils/

│   ├── haptics.ts          ← wrapper de haptics

│   └── dimensions.ts       ← useWindowDimensions helpers

│

├── components/

│   ├── atoms/

│   │   ├── Text/           ← Text con Dynamic Type

│   │   ├── Icon/           ← SF Symbol wrapper

│   │   ├── Avatar/         ← xs sm md lg xl \+ AvatarStack

│   │   ├── Badge/          ← dot · count · label

│   │   ├── Skeleton/       ← shimmer con Reanimated

│   │   ├── Divider/        ← full · inset · middle

│   │   └── PressableScale/ ← base de interacción

│   │

│   ├── molecules/

│   │   ├── Button/         ← filled · outlined · text · ghost

│   │   ├── TextField/      ← default · search · error

│   │   ├── Chip/           ← filter · filter-icon · day · input

│   │   ├── ListItem/       ← 1-line · 2-line · 3-line

│   │   ├── RatingStars/    ← read-only · interactive

│   │   ├── ProgressBar/    ← cupos con colores semánticos

│   │   └── SegmentedControl/ ← Próximos / Pasados

│   │

│   └── organisms/

│       ├── EventCard/      ← feed · compact · hero

│       ├── FilterBar/      ← SearchBar \+ ChipRow sticky

│       ├── NavigationBar/  ← tab bar \+ FAB crear plan

│       ├── NavigationHeader/ ← header \+ large title

│       ├── BottomSheet/    ← @gorhom wrapper

│       ├── OnboardingStep/ ← ilustración \+ chips \+ CTA

│       ├── ProfileCard/    ← avatar \+ stats \+ intereses

│       ├── EmptyState/     ← ilustración \+ texto \+ CTA

│       └── ReviewSheet/    ← rating \+ comentario post-evento

│

├── screens/

│   ├── Auth/

│   │   ├── SplashScreen.tsx

│   │   ├── RegisterScreen.tsx

│   │   ├── VerifyPhoneScreen.tsx

│   │   └── PendingApprovalScreen.tsx

│   ├── Onboarding/

│   │   └── OnboardingScreen.tsx

│   ├── Explorar/

│   │   └── ExplorarScreen.tsx

│   ├── EventDetail/

│   │   └── EventDetailScreen.tsx

│   ├── MisPlanes/

│   │   └── MisPlanesScreen.tsx

│   ├── Perfil/

│   │   └── PerfilScreen.tsx

│   └── CreatePlan/

│       └── CreatePlanSheet.tsx

│

├── navigation/

│   ├── AppNavigator.tsx    ← root (Auth vs Tab)

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

    └── illustrations/

        ├── onboarding-mudanza.svg

        ├── onboarding-intereses.svg

        ├── onboarding-zona.svg

        ├── empty-explorar.svg

        ├── empty-misplanes.svg

        └── empty-pendiente.svg

---

## 14\. PROMPT PARA CURSOR / WINDSURF

Pegar este bloque al inicio de cada sesión de trabajo:

Estás construyendo People Conecta, una app iOS nativa en React Native.

El archivo Design.md es la ÚNICA fuente de verdad visual. Seguilo siempre.

═══════════════════════════════════════════════════════

  REGLAS CRÍTICAS — NUNCA VIOLAR

═══════════════════════════════════════════════════════

  COLORES:

  → SIEMPRE importar de tokens/colors.ts

  → NUNCA hardcodear hex directamente en estilos

  → Mal: backgroundColor: '\#1A4F7A'

  → Bien: backgroundColor: colors.primary

  TIPOGRAFÍA:

  → SIEMPRE usar spread de tokens/typography.ts

  → Mal: fontSize: 17, fontWeight: '600'

  → Bien: ...typography.headlineSm

  ESPACIADO:

  → SIEMPRE usar números de tokens/spacing.ts

  → Mal: padding: 16

  → Bien: padding: space.md

  SOMBRAS:

  → SIEMPRE usar objects de tokens/shadows.ts

  → Nunca shadowColor: '\#000000' — usar sand-900 (\#1C170C)

  SAFE AREAS:

  → SIEMPRE useSafeAreaInsets() — NUNCA padding fijo para status bar

  → SIEMPRE SafeAreaView en pantallas con contenido en los bordes

  BOTONES:

  → borderRadius: radii.full (pill) en TODOS los botones

  → haptics obligatorio según tabla del Design.md

  → Un solo Button filled por pantalla/sección

  FUENTES:

  → Display/Títulos: PlusJakartaSans-Bold o PlusJakartaSans-SemiBold

  → Cuerpo/UI: DMSans-Regular, DMSans-Medium, DMSans-SemiBold

  → NUNCA System font, NUNCA Inter, NUNCA Roboto

  ANIMACIONES:

  → SIEMPRE react-native-reanimated 3

  → NUNCA Animated de React Native core

  → SIEMPRE verificar useReduceMotion() antes de animar

  TEXTO:

  → allowFontScaling={true} en TODOS los \<Text\>

  → maxFontSizeMultiplier={1.5} en TODOS los \<Text\>

═══════════════════════════════════════════════════════

  PALETA RESUMIDA (para referencia rápida)

═══════════════════════════════════════════════════════

  Primario (botones, links, activos):  \#1A4F7A  colors.primary

  Fondo de app:                        \#FDFAF5  colors.background

  Surface (cards, inputs):             \#FFFFFF  colors.surface

  Surface variante:                    \#F5EFE0  colors.surfaceVariant

  Texto principal:                     \#574B30  colors.onSurface

  Texto secundario:                    \#9E8A5E  colors.onSurfaceVariant

  Borde/separador:                     \#D9CBB0  colors.outline

  Confirmado:                          \#2D6E4E  colors.success

  Últimos cupos:                       \#8C6010  colors.warning

  Error:                               \#8C2020  colors.error

═══════════════════════════════════════════════════════

  JERARQUÍA VISUAL DE PANTALLA

═══════════════════════════════════════════════════════

  1\. Foto del plan → domina visualmente

  2\. Nombre del plan → headlineLg/Md, sand-800

  3\. Metadata (zona, fecha, cupos) → bodySm, sand-500

  4\. CTA → navy-500 filled, sticky al pie

  El azul marino navy habla cuando hay acción.

  La arena es el silencio entre acciones.

  Nunca dos elementos navy compitiendo en la misma vista.

---

## 15\. QUICK REFERENCE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  CHEATSHEET — People Conecta Design System v3.0

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  COLORES BASE (3):

  ████  Azul marino   colors.primary           \#1A4F7A

  ████  Arena         colors.background        \#FDFAF5

  ████  Blanco        colors.surface           \#FFFFFF

  COLORES SEMÁNTICOS:

  ████  Texto principal  colors.onSurface      \#574B30

  ████  Texto meta       colors.onSurfaceVar   \#9E8A5E

  ████  Borde            colors.outline        \#D9CBB0

  ████  Confirmado       colors.success        \#2D6E4E

  ████  Últimos cupos    colors.warning        \#8C6010

  ████  Error            colors.error          \#8C2020

  FUENTES:

  Títulos/Display  →  PlusJakartaSans-Bold / SemiBold

  Cuerpo/UI        →  DMSans-Regular / Medium / SemiBold

  SPACING (grid 4pt):

  xs=4  sm=8  md=16  lg=24  xl=32  xxl=48

  RADII:

  full=9999  xl=24  lg=16  md=12  sm=8  xs=4

  Botones y chips → full (pill)

  Cards → lg o xl

  Inputs → sm

  SOMBRAS:

  sm → cards reposo    md → FAB / hover    lg → bottom sheets

  BOTONES (jerarquía):

  Acción principal  → filled navy-500, height 56pt, borderRadius full

  Acción secundaria → outlined navy-500, height 48pt, borderRadius full

  Acción inline     → text navy-500, height 40pt

  Destructivo       → ghost error, height 48pt

  HAPTICS:

  "Me anoto" → haptics.heavy() \+ haptics.success()

  Crear plan → haptics.heavy()

  Cancelar   → haptics.warning()

  Chip       → haptics.selection()

  Tap card   → haptics.light()

  Error form → haptics.error()

  SF SYMBOLS CLAVE:

  Explorar    → location.magnifyingglass (outline) / .fill (activo)

  Mis Planes  → calendar.circle (outline) / .fill (activo)

  Perfil      → person.circle (outline) / .fill (activo)

  Crear       → plus.circle.fill (siempre fill, navy)

  Inscribirse → checkmark.circle → .fill al confirmar

  Zona        → mappin.and.ellipse

  Fecha       → calendar

  Hora        → clock

  Cupos       → person.2

  Gratuito    → tag (success)

  Volver      → chevron.left

  COMPONENTES CLAVE POR PANTALLA:

  ExplorarScreen      → FilterBar \+ FlatList de EventCard (feed)

  EventDetailScreen   → EventCard hero \+ ListItems \+ CTA sticky

  MisPlanesScreen     → SegmentedControl \+ FlatList EventCard (compact)

  PerfilScreen        → ProfileCard \+ EventCards \+ Reseñas

  OnboardingScreen    → SVG \+ Chips grid \+ Button filled

  REGLAS iOS:

  ├── NUNCA padding fijo para status bar → useSafeAreaInsets()

  ├── NUNCA Animated core → react-native-reanimated 3

  ├── NUNCA modal para flujos → bottom sheet (@gorhom)

  ├── NUNCA swipeBack deshabilitado

  ├── SIEMPRE allowFontScaling={true} en \<Text\>

  └── SIEMPRE hitSlop ≥ 48pt en íconos sin contenedor

  FILOSOFÍA EN UNA LÍNEA:

  "Azul marino cuando el usuario puede actuar.

   Arena cuando solo mira.

   Blanco cuando necesita enfocarse."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

\*Design System v3.0 — People Conecta MVP\*

\*Paleta: Azul Marino · Arena · Blanco — Mar del Plata\*

\*iOS nativa (React Native 0.74+) · Atomic Design · Mayo 2026\*

\*Fuente de verdad para Cursor / Windsurf — reemplaza v1.0 y v2.0\*  
