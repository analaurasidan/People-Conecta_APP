---
name: people-conecta-design-direction
description: Use when designing or refining People Conecta UI, visual language, mobile screens, cards, buttons, filters, modals, navigation, onboarding, plan detail, chat, or create-plan flows. Applies the local coastal design direction and prevents regressions to generic or off-brand UI.
---

# People Conecta Design Direction

Use this skill when making visual or UX changes to People Conecta.

## Core Direction

People Conecta should feel local, warm, coastal, trustworthy, and practical. The product is not a generic social app; it helps people in Mar del Plata and nearby coastal areas make real plans with real people.

Design for a mobile-first iPhone-sized viewport. Screens should feel compact, breathable, and usable inside the phone frame, not like desktop panels squeezed into mobile.

## Visual Tokens

Use these as the current source of truth:

- Primary blue: `#1A4F7A`
- Primary dark: `#103D61`
- Background: `#FDFAF5`
- Surface: `#FFFFFF`
- Soft surface: `#F5EFE0`
- Border: `#EDE3CC` or `#EDEDF2`
- Text primary: `#362E1C`
- Text secondary: `#574B30`
- Success: `#10B981`
- Error/destructive: `#D64040`

Typography direction:

- Display: Plus Jakarta Sans when available.
- Body/UI: DM Sans when available.
- On web fallback to system sans if custom fonts are not loaded.
- Do not use serif fallback in app UI.
- Do not use negative letter spacing.

## Component Rules

- Cards should be compact, rounded, and information-dense enough for mobile scanning.
- Use rounded pill chips for filters, categories, zones, dates, and time options.
- Primary CTAs use coastal blue, not the old turquoise/coral direction.
- Keep buttons readable and stable inside the phone width.
- Avoid duplicated actions across header and tab bar.
- Avoid decorative gradients, orbs, oversized marketing hero layouts, and generic landing-page patterns.

## Navigation And Layout

- The app first screen is the product experience, not a marketing page.
- Header should stay calm: location, screen title, supporting copy, and one light utility action when needed.
- The `+` create-plan action belongs in the center of the bottom navigation.
- Profile/settings access belongs in the top-right header, not duplicated in the tab bar.
- Bottom nav should stay simple: Explore, central Create button, My Plans.

## Modals And Overlays

React Native Web `Modal` renders outside the phone frame. Avoid it for UI inside the iPhone preview.

For filters, menus, and small sheets in the web MVP:

- Render overlays inside the current screen.
- Use `StyleSheet.absoluteFillObject` on the screen container.
- Keep the overlay width constrained by the phone frame.
- Bottom sheets should not escape the simulated phone.

## People Conecta Specific Screens

Explore:

- Show location as a first signal: Mar del Plata and nearby areas.
- Search and filters should be side-by-side and fit the width.
- Category chips should scroll horizontally.
- Created-by-user cards can expose a three-dot menu.

Plan cards:

- Image first.
- Category and price badges over image.
- Title, date, zone, time, capacity progress, and CTA.
- `+ ME SUMO` is a plan action, not a generic button.

Create plan:

- Date, time, zone, and image choices must be visible and tappable.
- Image step must clearly support upload/local photo and IA/suggested image.

Chat:

- Chat is tied to a confirmed plan and should show plan context at top.
