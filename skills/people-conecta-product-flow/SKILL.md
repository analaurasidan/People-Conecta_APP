---
name: people-conecta-product-flow
description: Use when changing People Conecta product behavior, MVP flows, onboarding, explore plans, join plan, my plans, plan detail, chat, create plan, filtering, or demo/localStorage behavior. Captures current product decisions and user-flow constraints.
---

# People Conecta Product Flow

Use this skill when implementing or reviewing People Conecta product logic.

## Product Premise

People Conecta helps people find and join real local plans. The MVP should prioritize the central loop over secondary features.

Central loop:

1. Explore plans.
2. Open plan detail.
3. Tap `+ Sumarme al plan`.
4. Plan appears in `Mis planes`.
5. From `Mis planes`, open detail or enter the group chat.
6. Group chat belongs to confirmed participants of that plan.

## Current Flow Decisions

Explore:

- Browse real-looking local demo plans.
- Filters should support zone, group size, and free plans.
- Category chips remain available above the feed.
- Created local plans appear before seeded demo plans.

Plan detail:

- From Explore, primary action is only `+ Sumarme al plan`.
- Do not make `Entrar al grupo` the primary action from Explore.
- After joining, navigate to `Mis planes`.
- From `Mis planes`, plan detail shows stacked actions:
  - `SALIR DEL PLAN`
  - `ENTRAR AL GRUPO`

My Plans:

- Contains only joined/confirmed plans.
- This is the place where chat access is expected.

Chat:

- Open chat from `Mis planes` or from a joined plan detail.
- Chat should show plan context and participant-confirmed framing.
- AI/chat agent support is future work and should not block core MVP testing.

Create Plan:

- Entry point is the central `+` button in bottom nav.
- Required steps:
  - Name, category, description.
  - Zone, date, time, capacity, cost.
  - Image: upload local photo or use IA/suggested image.
  - Review and publish.
- Date and time must be selectable from UI; do not rely on hidden or future native pickers for the MVP.

Profile:

- Profile/settings access is top-right in Explore.
- Do not duplicate profile in bottom navigation.

## Demo/Web MVP Behavior

The web MVP can use local/dummy behavior before Supabase is fully wired:

- Demo plans are seeded in `src/services/demoPlans.ts`.
- Joined plan ids are stored in `localStorage` under `pc_joined_plan_ids`.
- Created demo plans are stored in `localStorage` under `pc_created_demo_plans`.
- Uploaded local images can be preview/local URI in web MVP.
- IA image generation can use category-based suggested images in web MVP.
- Created plans can be deleted locally from the three-dot card menu.

Do not block UI testing on Supabase if a local fallback lets the flow be validated.

## Ownership And Deletion

For local demo plans:

- Show `⋯` only for plans created by `demo_web_user` or ids beginning with `demo_created_`.
- `Eliminar plan` removes from local created plans and joined plan ids.

For real Supabase plans:

- Deletion needs ownership validation and Row Level Security.
- Avoid implementing destructive real deletion without policies.

## Product Guardrails

- Keep the MVP oriented around making and joining real-world plans.
- Avoid adding broad social features before the central loop is stable.
- If a new feature competes with joining/creating plans, keep it secondary.
- Prefer testable local flows over half-wired backend features during MVP polish.
