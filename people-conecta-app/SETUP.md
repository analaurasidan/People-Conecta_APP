# Setup — People Conecta App

## Prerequisitos
- Node.js 20+ (instalar desde https://nodejs.org)
- Xcode 15+ (para simulador iOS)
- Cuenta Supabase gratuita (https://supabase.com)

## 1. Instalar dependencias
```bash
npm install
```

## 2. Configurar Supabase
1. Crear proyecto en supabase.com
2. Ir a SQL Editor y pegar el contenido de `supabase/migrations/001_initial_schema.sql`
3. Crear bucket en Storage: nombre `images`, acceso público
4. Copiar `.env.example` a `.env` y completar con tu URL y ANON KEY:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```

## 3. Fuentes
Descargar y colocar en `assets/fonts/`:
- Plus Jakarta Sans Bold + SemiBold → https://fonts.google.com/specimen/Plus+Jakarta+Sans
- DM Sans Regular + Medium + SemiBold → https://fonts.google.com/specimen/DM+Sans
- JetBrains Mono Regular → https://www.jetbrains.com/legalnotice/fonts/

## 4. Assets placeholder
Crear un ícono de app y splash screen en `assets/`:
- `icon.png` (1024x1024)
- `splash-icon.png` (200x200)
- `notification-icon.png` (96x96)
- `fonts/` (carpeta con las fuentes)

Opcional: crear placeholder de plan en `src/assets/plan-placeholder.png`

## 5. Correr la app
```bash
npx expo start
# Presionar 'i' para abrir simulador iOS
```

## 6. Deploy Edge Functions de Supabase (opcional para dev)
```bash
# Instalar Supabase CLI
npm install -g supabase

# Configurar secrets
supabase secrets set HF_API_KEY=tu_huggingface_token

# Deploy
supabase functions deploy generate-image
supabase functions deploy filter-text
```

## 7. Habilitar Sign in with Apple (para TestFlight/App Store)
1. Ir a https://developer.apple.com
2. Registrarse en Apple Developer Program ($99/año)
3. En Supabase Auth Settings → habilitar Apple provider
4. Configurar servicios en Apple Developer Console

## Estructura del proyecto
```
src/
  tokens/        ← Design System: colores, tipografía, espaciado
  components/    ← atoms / molecules / organisms
  screens/       ← auth / explore / plans / create / profile / chat
  navigation/    ← Root, Auth, Main navigators
  services/      ← Supabase, auth, plans, chat, images
  hooks/         ← useAuth
  store/         ← Zustand (authStore, filtersStore)
supabase/
  migrations/    ← SQL schema
  functions/     ← Edge Functions (generate-image, filter-text)
```
