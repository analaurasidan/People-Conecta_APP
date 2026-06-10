---
name: people-conecta-dev-workflow
description: Use when working on the local People Conecta codebase, running servers, debugging Expo web, using the design system reference, adding mocks, testing browser UI, or deciding which local folder is authoritative.
---

# People Conecta Dev Workflow

Use this skill when working locally on People Conecta.

## Important Local Paths

Main app:

```bash
/Users/analaura/Documents/Anita Jobs/PEOPLE CONECTA/people-conecta-app
```

Design system reference:

```bash
/Users/analaura/Documents/Anita Jobs/PEOPLE CONECTA/reference/design-system-web
```

Docs and product/design source material:

```bash
/Users/analaura/Documents/Anita Jobs/PEOPLE CONECTA/docs
```

Older UI/reference material:

```bash
/Users/analaura/Documents/Anita Jobs/PEOPLE CONECTA/UI
/Users/analaura/Documents/Anita Jobs/PEOPLE CONECTA/reference/prototype
```

Treat `people-conecta-app` as the active app.

## Running Locally

Run the app:

```bash
cd "/Users/analaura/Documents/Anita Jobs/PEOPLE CONECTA/people-conecta-app"
npx expo start --web
```

Main app URL:

```bash
http://localhost:19006/
```

Run the design system:

```bash
cd "/Users/analaura/Documents/Anita Jobs/PEOPLE CONECTA/reference/design-system-web"
npm run dev
```

Design system URL is usually:

```bash
http://localhost:5174/
```

If a localhost URL says connection refused, first check whether the server is running.

## Current Stack

Main app:

- Expo SDK 54 style project.
- React Native / React Native Web.
- React Navigation.
- TanStack Query.
- Zustand.
- Supabase client.
- Webpack config for Expo web.

Design system:

- Vite.
- React.
- Tailwind CSS v4.

## Web Compatibility

Expo web has native-only package issues. The app uses webpack aliases to mock native-only packages:

- `react-native-haptic-feedback`
- `expo-apple-authentication`
- `@shopify/flash-list`

Keep mocks in:

```bash
src/mocks/
```

Webpack should also inject `EXPO_PUBLIC_*` env vars with `DefinePlugin`.

## Known TypeScript Caveat

`npx tsc --noEmit` currently reports existing Supabase/Deno type issues, especially around:

- Supabase typed inserts returning `never`.
- Edge functions importing Deno URLs.
- Deno globals in `supabase/functions`.

When testing UI-only changes, note these as existing issues unless a new screen/file appears in the error list.

## Browser Testing

After frontend changes:

- Verify `http://localhost:19006/` responds.
- Reload the in-app browser or Chrome.
- Take visual screenshots for key screens.
- Check central flows manually:
  - Explore.
  - Filters.
  - Plan detail.
  - Join plan.
  - My Plans.
  - Chat.
  - Create plan.

Important web UI issue:

- React Native Web `Modal` renders outside the simulated iPhone frame.
- Use in-screen absolute overlays for filters and bottom sheets.

## Local Demo Persistence

Browser demo data can persist in `localStorage`:

- `pc_joined_plan_ids`
- `pc_created_demo_plans`
- `pc_demo_chat_<planId>`

If duplicate local plans appear, use the card `⋯` menu to delete created demo plans.

## Development Preference

When implementing:

- Preserve the active app folder and do not move project files casually.
- Keep demo/local fallbacks for web testing until Supabase is fully wired.
- Make small testable changes and verify visually.
- Avoid large refactors while the MVP interaction model is still being polished.
