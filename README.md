# People Conecta

People Conecta es una app mobile-first para descubrir, crear y sumarse a planes reales en Mar del Plata y zonas cercanas. El MVP prioriza un flujo simple: explorar planes, sumarse, verlos en Mis planes y entrar al grupo de chat del plan.

## Estado Actual

El proyecto tiene una app Expo/React Native Web funcional para testear UI en navegador, un design system de referencia, documentación de producto y skills locales con decisiones de diseño/producto.

Flujo central implementado:

1. Explorar planes.
2. Ver detalle del plan.
3. Sumarse al plan.
4. Ver el plan en Mis planes.
5. Entrar al grupo de chat desde Mis planes.
6. Crear un plan con nombre, categoria, descripcion, zona, fecha, hora, cupo, costo e imagen.

Para el MVP web se usan datos demo y `localStorage` para poder testear sin depender de Supabase en cada pantalla.

## Estructura Del Repo

```text
people-conecta-app/          App principal Expo / React Native
reference/design-system-web/ Design system web de referencia
reference/prototype/         Prototipo web anterior
docs/                        PRD, investigacion, contenido y diseno
skills/                      Skills locales con criterios del proyecto
UI/                          Referencias visuales y exports previos
MOCKUPS/                     Mockups e imagenes de referencia
```

## App Principal

Ruta:

```bash
cd "people-conecta-app"
```

Instalar dependencias:

```bash
npm install
```

Correr en web:

```bash
npx expo start --web
```

URL habitual:

```text
http://localhost:19006/
```

Variables de entorno:

```bash
cp .env.example .env
```

Configurar en `.env`:

```text
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

## Design System

Ruta:

```bash
cd "reference/design-system-web"
```

Correr:

```bash
npm install
npm run dev
```

URL habitual:

```text
http://localhost:5174/
```

Tokens actuales principales:

- Azul principal: `#1A4F7A`
- Fondo crema: `#FDFAF5`
- Texto principal: `#362E1C`
- Texto secundario: `#574B30`
- Tipografias: Plus Jakarta Sans y DM Sans

## Stack

App:

- Expo SDK 54
- React Native
- React Native Web
- React Navigation
- TanStack Query
- Zustand
- Supabase
- Webpack para web

Design system:

- Vite
- React
- Tailwind CSS v4

## Decisiones Del MVP

- El boton `+` para crear planes vive en el centro del navbar inferior.
- El acceso a perfil vive arriba a la derecha.
- El navbar inferior queda en tres zonas: Explorar, Crear, Mis planes.
- El chat se abre desde Mis planes, cuando el usuario ya esta sumado al plan.
- En el detalle del plan desde Explorar, la accion principal es `+ Sumarme al plan`.
- Los filtros deben abrirse dentro del marco del celular, no como modal del viewport completo.
- Los planes creados localmente muestran menu `...` para eliminar.

## Datos Demo En Web

Mientras el backend real se termina de conectar, el MVP web usa:

- `src/services/demoPlans.ts` para planes base.
- `localStorage.pc_joined_plan_ids` para planes sumados.
- `localStorage.pc_created_demo_plans` para planes creados.
- `localStorage.pc_demo_chat_<planId>` para mensajes demo de chat.

Esto permite probar el producto sin bloquearse por Supabase.

## Supabase

La carpeta `people-conecta-app/supabase` contiene:

- Migracion inicial de schema.
- Edge functions para moderacion/generacion de imagen.

Nota: `npx tsc --noEmit` actualmente reporta errores de tipos relacionados con Supabase/Deno y funciones Edge. No son bloqueantes para testear el MVP web, pero deben resolverse antes de endurecer backend y deploy productivo.

## Skills Locales

Las decisiones importantes de esta etapa quedaron documentadas en:

```text
skills/people-conecta-design-direction/SKILL.md
skills/people-conecta-product-flow/SKILL.md
skills/people-conecta-dev-workflow/SKILL.md
```

Sirven como memoria operativa para futuras sesiones de desarrollo.

## Git

Repo remoto:

```text
https://github.com/analaurasidan/People-Conecta_APP
```

Comandos utiles:

```bash
git status
git add .
git commit -m "Descripcion del cambio"
git push
```

## Proximos Pasos

- Terminar de aplicar el design system en todas las pantallas.
- Mejorar iconografia y estados visuales.
- Resolver tipos de Supabase y separar TS de Edge Functions Deno.
- Conectar creacion/borrado real de planes con ownership y RLS.
- Pulir onboarding.
- Agregar mapa/filtros avanzados por zona y tipo de encuentro.
- Evaluar deploy web en Vercel y backend en Supabase.
