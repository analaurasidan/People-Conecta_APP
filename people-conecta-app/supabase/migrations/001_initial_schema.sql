-- People Conecta — Esquema inicial
-- Ejecutar en: Supabase Dashboard > SQL Editor

-- Habilitar extensiones
create extension if not exists "uuid-ossp";

-- =========================================
-- TABLAS
-- =========================================

create table public.users (
  id          uuid primary key references auth.users(id) on delete cascade,
  nombre      text not null,
  foto_url    text,
  ciudad      text not null default 'Mar del Plata',
  zona        text,
  intereses   text[] default '{}',
  plan_tier   text not null default 'free' check (plan_tier in ('free', 'premium')),
  aprobado    boolean not null default false,
  no_shows    integer not null default 0,
  rating_promedio decimal(3,2),
  created_at  timestamp with time zone default now()
);

create table public.plans (
  id               uuid primary key default uuid_generate_v4(),
  creator_id       uuid not null references public.users(id) on delete cascade,
  nombre           text not null,
  categoria        text not null,
  descripcion      text not null check (length(descripcion) <= 200),
  zona             text not null,
  fecha            date not null,
  hora             time not null,
  cupo_max         integer not null check (cupo_max between 3 and 20),
  cupo_actual      integer not null default 0,
  foto_url         text,
  es_gratuito      boolean not null default true,
  precio           decimal(10,2),
  preferencia_genero text check (preferencia_genero in ('todos', 'mujeres', 'hombres')),
  estado           text not null default 'publicado'
                     check (estado in ('borrador', 'publicado', 'cancelado', 'finalizado', 'en_revision')),
  created_at       timestamp with time zone default now()
);

create table public.participations (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references public.users(id) on delete cascade,
  plan_id    uuid not null references public.plans(id) on delete cascade,
  estado     text not null default 'confirmado' check (estado in ('confirmado', 'cancelado')),
  created_at timestamp with time zone default now(),
  unique(user_id, plan_id)
);

create table public.chat_messages (
  id         uuid primary key default uuid_generate_v4(),
  plan_id    uuid not null references public.plans(id) on delete cascade,
  user_id    uuid not null references public.users(id) on delete cascade,
  contenido  text not null,
  foto_url   text,
  created_at timestamp with time zone default now()
);

create table public.reviews (
  id              uuid primary key default uuid_generate_v4(),
  reviewer_id     uuid not null references public.users(id) on delete cascade,
  plan_id         uuid not null references public.plans(id) on delete cascade,
  organizador_id  uuid not null references public.users(id) on delete cascade,
  rating          integer not null check (rating between 1 and 5),
  comentario      text,
  created_at      timestamp with time zone default now(),
  unique(reviewer_id, plan_id)
);

create table public.reports (
  id          uuid primary key default uuid_generate_v4(),
  reporter_id uuid not null references public.users(id) on delete cascade,
  tipo        text not null check (tipo in ('plan', 'mensaje', 'usuario')),
  ref_id      uuid not null,
  motivo      text not null,
  estado      text not null default 'pendiente' check (estado in ('pendiente', 'resuelto', 'descartado')),
  created_at  timestamp with time zone default now()
);

-- =========================================
-- FUNCIONES RPC
-- =========================================

create or replace function increment_plan_cupo(plan_id uuid)
returns void language sql security definer as $$
  update public.plans set cupo_actual = cupo_actual + 1 where id = plan_id;
$$;

create or replace function decrement_plan_cupo(plan_id uuid)
returns void language sql security definer as $$
  update public.plans set cupo_actual = greatest(0, cupo_actual - 1) where id = plan_id;
$$;

-- =========================================
-- ROW LEVEL SECURITY
-- =========================================

alter table public.users           enable row level security;
alter table public.plans           enable row level security;
alter table public.participations  enable row level security;
alter table public.chat_messages   enable row level security;
alter table public.reviews         enable row level security;
alter table public.reports         enable row level security;

-- Users: cualquier aprobado puede ver perfiles; solo uno mismo puede editar el suyo
create policy "Ver perfiles" on public.users
  for select using (true);

create policy "Editar propio perfil" on public.users
  for update using (auth.uid() = id);

create policy "Insertar perfil propio" on public.users
  for insert with check (auth.uid() = id);

-- Plans: cualquier aprobado puede ver y crear; solo el creador puede editar
create policy "Ver planes publicados" on public.plans
  for select using (estado = 'publicado' or creator_id = auth.uid());

create policy "Crear plan" on public.plans
  for insert with check (
    auth.uid() = creator_id
    and exists (select 1 from public.users where id = auth.uid() and aprobado = true)
  );

create policy "Editar plan propio" on public.plans
  for update using (auth.uid() = creator_id);

-- Participations
create policy "Ver participaciones" on public.participations
  for select using (true);

create policy "Inscribirse" on public.participations
  for insert with check (
    auth.uid() = user_id
    and exists (select 1 from public.users where id = auth.uid() and aprobado = true)
  );

create policy "Cancelar propia" on public.participations
  for update using (auth.uid() = user_id);

-- Chat: solo participantes confirmados del plan
create policy "Ver mensajes del plan" on public.chat_messages
  for select using (
    exists (
      select 1 from public.participations
      where plan_id = chat_messages.plan_id
        and user_id = auth.uid()
        and estado = 'confirmado'
    )
  );

create policy "Enviar mensajes" on public.chat_messages
  for insert with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.participations
      where plan_id = chat_messages.plan_id
        and user_id = auth.uid()
        and estado = 'confirmado'
    )
  );

-- Reviews y Reports: usuarios aprobados
create policy "Ver reviews" on public.reviews for select using (true);
create policy "Crear review" on public.reviews
  for insert with check (
    auth.uid() = reviewer_id
    and exists (select 1 from public.users where id = auth.uid() and aprobado = true)
  );

create policy "Crear reporte" on public.reports
  for insert with check (
    auth.uid() = reporter_id
    and exists (select 1 from public.users where id = auth.uid() and aprobado = true)
  );

-- =========================================
-- STORAGE (ejecutar en Supabase Dashboard > Storage)
-- =========================================
-- 1. Crear bucket "images" (público)
-- 2. Política upload: solo usuarios autenticados
-- 3. Política lectura: pública
