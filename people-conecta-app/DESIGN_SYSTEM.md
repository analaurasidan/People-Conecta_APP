# People Conecta Design System

Version: MVP web/mobile - Junio 2026

## 1. Proposito

People Conecta es una app para descubrir planes reales y conocer gente en la ciudad. El sistema visual debe sentirse cercano, claro y confiable: una interfaz tranquila para organizar actividades sociales sin parecer una red social ruidosa ni una app de eventos masiva.

Principios de diseño:

- Cercania: lenguaje simple, componentes amables y estados faciles de entender.
- Claridad: jerarquia visual directa, CTAs evidentes y poca decoracion.
- Consistencia: una sola familia de iconos, escala tipografica compartida y tokens reutilizables.
- Mobile first: la experiencia principal se disena para pantalla chica y uso tactil.
- Demo testeable: el MVP permite probar flujos sin depender de login real, Apple o verificacion por email.

## 2. Personalidad visual

La direccion visual combina costa, ciudad y encuentro:

- Base calida tipo arena para fondos.
- Azul costero como color principal para navegacion, CTAs y estados activos.
- Neutros marron/gris para texto, bordes y superficies secundarias.
- Bordes redondeados tipo pastilla en acciones y filtros.
- Cards limpias con imagen real o representativa del plan.

No usar:

- Emojis como iconos de interfaz.
- Tipografias serif en UI.
- Gradientes decorativos fuertes.
- Cards dentro de cards.
- Botones primarios compitiendo entre si en la misma pantalla.

## 3. Tokens de color

Fuente de verdad en codigo:

`src/tokens/colors.ts`

### Primary - Coastal Blue

| Token | Valor | Uso |
|---|---:|---|
| `primary.50` | `#EAF2F7` | Fondos activos suaves, chips seleccionados, mini bloques |
| `primary.100` | `#D5E5EF` | Bordes suaves sobre fondos azules claros |
| `primary.200` | `#ABCBDD` | Estados secundarios |
| `primary.300` | `#81B1CB` | Ilustracion o acento medio |
| `primary.400` | `#5797B9` | Hover/acento |
| `primary.500` | `#1A4F7A` | CTA principal, icono activo, boton central |
| `primary.600` | `#164466` | Texto activo, iconos destacados |
| `primary.700` | `#103D61` | Texto de badges o enfasis |
| `primary.800` | `#0B2D47` | Estados oscuros |
| `primary.900` | `#061D2E` | Maximo contraste |

### Secondary - Warm Accent

| Token | Valor | Uso |
|---|---:|---|
| `secondary.500` | `#D97706` | Accion secundaria, demo login |
| `secondary.600` | `#B45309` | Estado presionado/oscuro |

### Fondos y superficies

| Token | Valor | Uso |
|---|---:|---|
| `background` | `#FDFAF5` | Fondo general |
| `surface` | `#FFFFFF` | Cards, inputs, navbar |

### Texto

| Token | Valor | Uso |
|---|---:|---|
| `textPrimary` | `#362E1C` | Titulos y texto principal |
| `textSecondary` | `#574B30` | Bajadas, metadata, labels |
| `textDisabled` | `#B5B0AA` | Disabled/placeholders suaves |
| `textOnPrimary` | `#FFFFFF` | Texto sobre boton primario |

### Semanticos

| Token | Valor | Uso |
|---|---:|---|
| `success` | `#2D9E6B` | Confirmaciones |
| `error` | `#D64040` | Cerrar sesion, errores |
| `warning` | `#E8A020` | Alertas |
| `info` | `#3A7FD5` | Informacion |

### Neutrales

| Token | Valor | Uso |
|---|---:|---|
| `neutral.50` | `#FDFAF5` | Fondo claro |
| `neutral.100` | `#F5EFE0` | Separadores suaves |
| `neutral.200` | `#EDE3CC` | Bordes principales |
| `neutral.300` | `#DED0B5` | Bordes medios |
| `neutral.400` | `#B6A98E` | Iconos/placeholder suaves |
| `neutral.500` | `#8A7B60` | Texto auxiliar |
| `neutral.600` | `#6E6049` | Texto secundario fuerte |
| `neutral.700` | `#574B30` | Texto secundario |
| `neutral.800` | `#362E1C` | Texto principal |
| `neutral.900` | `#1A1C1F` | Negro suave |

## 4. Tipografia

Fuente de verdad en codigo:

`src/tokens/typography.ts`

Familias:

- Display: `Plus Jakarta Sans` en mobile/native.
- Body: `DM Sans` en mobile/native.
- Web fallback: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- Monospace: `JetBrains Mono` en native; `ui-monospace` en web.

Reglas:

- No usar serif en UI.
- No usar `fontFamily` hardcodeado fuera de tokens.
- Letter spacing siempre `0`, salvo etiquetas compactas puntuales.
- Los botones usan estilos `label`.
- Los titulos de pantalla usan `headline`.

### Escala

| Estilo | Fuente | Size | Line height | Uso |
|---|---|---:|---:|---|
| `displayLarge` | Display Bold | 57 | 64 | No usado en MVP, reservado |
| `displayMedium` | Display Bold | 45 | 52 | No usado en MVP, reservado |
| `displaySmall` | Display Bold | 36 | 44 | No usado en MVP, reservado |
| `headlineLarge` | Display SemiBold | 32 | 40 | Login/brand |
| `headlineMedium` | Display SemiBold | 28 | 36 | Pantallas principales grandes |
| `headlineSmall` | Display SemiBold | 24 | 32 | Titulos de pantalla |
| `titleLarge` | Body SemiBold | 22 | 28 | Titulos destacados |
| `titleMedium` | Body SemiBold | 16 | 24 | Titulos de cards |
| `titleSmall` | Body SemiBold | 14 | 20 | Secciones y cards compactas |
| `bodyLarge` | Body Regular | 16 | 24 | Texto largo |
| `bodyMedium` | Body Regular | 14 | 20 | Bajadas, formularios, metadata |
| `bodySmall` | Body Regular | 12 | 16 | Ayudas, timestamps |
| `labelLarge` | Body Medium | 14 | 20 | Botones y acciones |
| `labelMedium` | Body Medium | 12 | 16 | Chips, tabs, tags |
| `labelSmall` | Body Medium | 11 | 16 | Badges compactos |

## 5. Espaciado, radios y sombras

Fuente de verdad en codigo:

`src/tokens/spacing.ts`

### Spacing

Base: 4px.

| Token | Valor |
|---|---:|
| `0` | 0 |
| `1` | 4 |
| `2` | 8 |
| `3` | 12 |
| `4` | 16 |
| `5` | 20 |
| `6` | 24 |
| `7` | 28 |
| `8` | 32 |
| `10` | 40 |
| `12` | 48 |
| `16` | 64 |
| `20` | 80 |
| `24` | 96 |

### Radius

| Token | Valor | Uso |
|---|---:|---|
| `xs` | 4 | Detalles chicos |
| `sm` | 8 | Elementos compactos |
| `md` | 12 | Inputs, mini cards |
| `lg` | 16 | Cards y bloques |
| `xl` | 24 | Contenedores grandes |
| `full` | 9999 | Pills, botones redondos |

### Shadows

| Token | Uso |
|---|---|
| `shadow.sm` | Botones/iconos chicos |
| `shadow.md` | Cards principales |
| `shadow.lg` | Modales o elementos flotantes |

## 6. Iconografia

Sistema: Phosphor Icons para React Native.

Reglas:

- No usar emojis como iconos de interfaz.
- Icono activo en navbar: `fill`, color `primary.500`.
- Icono inactivo en navbar: `regular`, color `#3E4245`.
- Iconos de metadata: `regular`, 14-18px, `textSecondary`.
- Iconos de categoria: `bold` en chips/badges destacados.

### Mapeo de categorias

| Categoria | Icono |
|---|---|
| Todos | `Sparkle` |
| Deporte | `Waves` |
| Musica | `MusicNote` |
| Idiomas | `ChatCircleDots` |
| Gastronomia / Cocina | `ForkKnife` |
| Naturaleza | `Plant` |
| Juegos | `DiceFive` |
| Social / Arte | `Sparkle` |

### Iconos funcionales

| Uso | Icono |
|---|---|
| Ubicacion | `MapPin` |
| Fecha | `CalendarBlank` |
| Hora | `Clock` |
| Perfil | `UserCircle` |
| Buscar / Explorar | `MagnifyingGlass` |
| Crear | `Plus` |
| Mis planes | `CalendarBlank` |
| Filtros | `SlidersHorizontal` |
| Cupos/personas | `UsersThree` |
| Cerrar sesion | `SignOut` |

## 7. Componentes

### Button

Fuente: `src/components/atoms/Button.tsx`

Variantes:

- `primary`: fondo `primary.500`, texto blanco.
- `secondary`: fondo `secondary.500`, texto blanco.
- `outline`: fondo transparente, borde `primary.500`, texto `primary.500`.
- `ghost`: fondo transparente, texto `primary.500`.

Tamanos:

- `sm`: min height 36.
- `md`: min height 48.
- `lg`: min height 56.

Reglas:

- Usar `primary` solo para accion principal.
- Usar `outline` o botones terciarios para acciones de soporte.
- Botones full width solo en formularios o pasos de onboarding.
- Estado disabled baja opacidad a 45%.

### Chip

Fuente: `src/components/atoms/Chip.tsx`

Uso:

- Filtros.
- Intereses.
- Seleccion multiple en onboarding.

Estados:

- Default: fondo `surface`, borde `neutral.300`, texto `textSecondary`.
- Selected: fondo `primary.50`, borde `primary.500`, texto `primary.600`.

### CategoryIcon

Fuente: `src/components/atoms/CategoryIcon.tsx`

Uso:

- Chips de categoria en Home.
- Badges de card.
- Intereses del perfil.
- Pills de detalle de plan.

Regla: siempre debe coincidir con el mapeo de categorias definido en este documento.

### EventCard

Fuente: `src/components/molecules/EventCard.tsx`

Estructura:

- Imagen superior.
- Badge de categoria arriba izquierda.
- Badge de precio arriba derecha.
- Nombre del plan.
- Fecha en mini bloque azul claro.
- Metadata con ubicacion y hora.
- Progreso de cupos.
- CTA `+ ME SUMO`.

Reglas:

- La fecha usa mini card `primary.50` con borde `primary.100`.
- El CTA `+ ME SUMO` es el unico elemento de alto contraste en el footer.
- Metadata siempre usa iconos, no emojis.
- La imagen debe representar el plan o usar placeholder solo como fallback.

### Bottom Navigation

Fuente: `src/navigation/MainNavigator.tsx`

Tabs:

- Explorar: `MagnifyingGlass`.
- Crear: boton central flotante con `Plus`.
- Mis planes: `CalendarBlank`.
- Perfil: acceso desde header, no tab visible.

Estados:

- Activo: icono `fill`, `primary.500`.
- Inactivo: icono `regular`, `#3E4245`.
- Label: `fontFamily.bodyMedium`, 11px.

### Avatar

Fuente: `src/components/atoms/Avatar.tsx`

Uso actual:

- Fallback con iniciales para mensajes de chat y usuarios sin foto.
- Tipografia sans via tokens.

Nota de marca:

- Cuando el logo final este definido, puede reemplazar iniciales temporales en espacios institucionales como People Conecta dentro del chat.

## 8. Patrones por pantalla

### Login

Objetivo: permitir prueba rapida y acceso demo.

Reglas:

- Mostrar marca temporal `PC` hasta tener logo final.
- Mantener `Entrar en modo demo` visible para QA/profesor.
- No depender de Apple o codigo email para testear MVP.

### Explorar

Objetivo: descubrimiento rapido de planes.

Reglas:

- Header con ubicacion `Mar del Plata` e icono `MapPin`.
- No mostrar `Ver onboarding demo` en Home.
- Categorias en chips horizontales con iconos Phosphor.
- Cards con imagen y CTA claro.
- La fecha no debe competir con `+ ME SUMO`.

### Detalle de plan

Objetivo: confirmar lugar y entender el plan.

Reglas:

- Metadata con iconos: fecha, hora, ubicacion, cupos.
- CTA principal para sumarse.
- Si el usuario ya esta inscripto, cambiar estado a confirmado.

### Mis planes

Objetivo: acceder a planes confirmados y grupo.

Reglas:

- Mostrar cards con estado `Confirmado`.
- Metadata con `MapPin` y `Clock`.
- CTA principal: `Abrir grupo`.
- Empty state con `CalendarBlank`, no emoji.

### Chat

Objetivo: coordinar el plan.

Reglas:

- Header con nombre del plan.
- Card resumen con ubicacion, fecha y hora usando iconos.
- Burbujas simples: propias en azul, ajenas en blanco.
- Avatares temporales con iniciales hasta tener logo/fotos definitivas.

### Perfil

Objetivo: ver identidad, intereses y herramientas secundarias.

Reglas:

- Icono de perfil Phosphor en circulo.
- Ubicacion con `MapPin`.
- Intereses como chips con iconos de categoria.
- Plan Free con icono `Plant`.
- `Ver onboarding demo` vive aca como accion secundaria.
- `Cerrar sesion` es boton pastilla alineado a izquierda.

### Crear plan

Objetivo: flujo simple para publicar un plan.

Reglas:

- Formularios por pasos.
- Labels claros.
- CTA inferior persistente.
- Generacion/sugerencia de imagen puede ser demo si IA no esta disponible.

## 9. Copy y tono

Tono:

- Cercano.
- Directo.
- Local.
- Sin exceso de explicaciones.

Ejemplos aprobados:

- `Planes cerca tuyo`
- `Actividades reales para conocer gente en la calle.`
- `Me sumo`
- `Abrir grupo`
- `Mis planes`
- `Ver onboarding demo`

Reglas:

- Evitar lenguaje corporativo.
- Evitar prometer seguridad absoluta.
- Usar `zona aproximada` para ubicacion publica.
- Priorizar instrucciones cortas en flujos de demo.

## 10. Accesibilidad y QA visual

Checklist:

- Contraste suficiente en texto principal y botones.
- Touch targets cercanos a 44px o mas.
- Iconos no deben ser el unico indicador cuando hay informacion critica.
- Texto no debe cortarse en botones.
- No usar fuentes serif en web.
- No mezclar emojis con iconos del sistema.
- El tab activo debe distinguirse por color y peso visual.
- El CTA principal debe ser el elemento mas evidente de cada card o pantalla.

## 11. Estado actual del MVP

Incluido:

- Expo / React Native Web.
- Modo demo para testeo.
- Home Explorar con categorias e iconos.
- Detalle de plan.
- Mis planes.
- Chat demo.
- Crear plan.
- Perfil.
- Preparacion para Vercel con `vercel.json`.

Pendiente antes de entrega final:

- Logo definitivo.
- Reemplazar marca temporal `PC`.
- QA final completo previo a deploy.
- Deploy publico en Vercel.

## 12. Archivos fuente

Tokens:

- `src/tokens/colors.ts`
- `src/tokens/typography.ts`
- `src/tokens/spacing.ts`
- `src/tokens/index.ts`

Componentes:

- `src/components/atoms/Button.tsx`
- `src/components/atoms/Chip.tsx`
- `src/components/atoms/Avatar.tsx`
- `src/components/atoms/TabBarIcon.tsx`
- `src/components/atoms/CategoryIcon.tsx`
- `src/components/molecules/EventCard.tsx`

Navegacion y pantallas:

- `src/navigation/MainNavigator.tsx`
- `src/screens/explore/ExploreScreen.tsx`
- `src/screens/explore/PlanDetailScreen.tsx`
- `src/screens/plans/MyPlansScreen.tsx`
- `src/screens/chat/ChatScreen.tsx`
- `src/screens/profile/ProfileScreen.tsx`
- `src/screens/create/`
- `src/screens/auth/`
