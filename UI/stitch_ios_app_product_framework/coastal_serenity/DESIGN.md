---
name: Coastal Serenity
colors:
  surface: '#f9f9fd'
  surface-dim: '#d9dade'
  surface-bright: '#f9f9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f7'
  surface-container: '#ededf2'
  surface-container-high: '#e7e8ec'
  surface-container-highest: '#e2e2e6'
  on-surface: '#1a1c1f'
  on-surface-variant: '#42474e'
  inverse-surface: '#2e3034'
  inverse-on-surface: '#f0f0f4'
  outline: '#72777f'
  outline-variant: '#c2c7d0'
  surface-tint: '#31628e'
  primary: '#00385d'
  on-primary: '#ffffff'
  primary-container: '#1a4f7a'
  on-primary-container: '#93c1f2'
  inverse-primary: '#9dcbfc'
  secondary: '#625e53'
  on-secondary: '#ffffff'
  secondary-container: '#e8e2d3'
  on-secondary-container: '#686459'
  tertiary: '#4e2f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#6d4300'
  on-tertiary-container: '#eeb269'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cfe4ff'
  primary-fixed-dim: '#9dcbfc'
  on-primary-fixed: '#001d34'
  on-primary-fixed-variant: '#124a74'
  secondary-fixed: '#e8e2d3'
  secondary-fixed-dim: '#cbc6b8'
  on-secondary-fixed: '#1d1c13'
  on-secondary-fixed-variant: '#4a473c'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#f8bb71'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f9f9fd'
  on-background: '#1a1c1f'
  surface-variant: '#e2e2e6'
  sand-50: '#FDFAF5'
  sand-700: '#574B30'
  sand-800: '#362E1C'
  white: '#FFFFFF'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
---

# People Conecta — Design System

**Versión:** 3.0 — Definitiva y unificada **Plataforma:** iOS nativa (React Native 0.74+) **Metodología:** Atomic Design **Stack:** React Native | React Navigation | Reanimated 3 **Herramienta:** Cursor / Windsurf

---

**Principio rector** El móvil es el gateway, no el destino. El usuario entra a la app para salir a la calle. El diseño debe sentirse como una mañana en Mar del Plata: claro, cálido, con el mar siempre presente. Minimalista pero vivo. Nunca frío. Nunca red social. Nunca corporativo.

---

## 2\. DESIGN TOKENS

### 2.1 Paleta de color

  ● AZUL MARINO (Mar profundo de Mar del Plata)
  navy-500   \#1A4F7A   ████  ★ PRIMARY — botones, CTAs, links

  ● ARENA (Tierra costera, Mar del Plata)
  sand-50    \#FDFAF5   ████  ★ Fondo principal de la app
  sand-100   \#F5EFE0   ████  Surface de cards
  sand-700   \#574B30   ████  Texto body principal
  sand-800   \#362E1C   ████  Títulos

  ● BLANCO (Luz natural, espacio limpio)
  white      \#FFFFFF   ████  Surface elevada (cards sobre fondo)

### 2.3 Espaciado
// Grid base: 4pt.
xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48

### 2.4 Border radius
xs: 4, sm: 8, md: 12, lg: 16, xl: 24, full: 9999
Botones y chips → full (pill)
Cards → lg (16) o xl (24)

---

## 3\. TIPOGRAFÍA
Títulos / Display   →  "Plus Jakarta Sans"   Bold 700 / SemiBold 600
Cuerpo / UI         →  "DM Sans"             Regular 400 / Medium 500

---

## 4\. ICONOGRAFÍA — SF SYMBOLS
Tab: Explorar          location.magnifyingglass
Tab: Mis Planes        calendar.circle
Tab: Perfil            person.circle
Acción: Crear plan     plus.circle.fill (navy)
