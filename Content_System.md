# People Conecta — Content System

**Versión:** 1.0  
**Fecha:** Mayo 2026  
**Alcance:** UX Writing + Content Strategy  
**Fuente de verdad junto a:** Design.md y PRD_PeopleConecta_MVP_v3.md

---

## ÍNDICE

**PARTE 1 — VOZ Y TONO**
1. [Personalidad de la marca](#1-personalidad-de-la-marca)
2. [Voz](#2-voz)
3. [Tono por contexto](#3-tono-por-contexto)
4. [Principios de escritura](#4-principios-de-escritura)
5. [Lo que nunca decimos](#5-lo-que-nunca-decimos)

**PARTE 2 — UX WRITING**
6. [Onboarding y Registro](#6-onboarding-y-registro)
7. [Pendiente de Aprobación](#7-pendiente-de-aprobación)
8. [Explorar Planes](#8-explorar-planes)
9. [Detalle del Plan](#9-detalle-del-plan)
10. [Crear un Plan](#10-crear-un-plan)
11. [Mis Planes](#11-mis-planes)
12. [Perfil](#12-perfil)
13. [Chat Grupal](#13-chat-grupal)
14. [Empty States](#14-empty-states)
15. [Errores y Validaciones](#15-errores-y-validaciones)
16. [Push Notifications](#16-push-notifications)
17. [Emails Transaccionales](#17-emails-transaccionales)

**PARTE 3 — CONTENT STRATEGY**
18. [Posicionamiento externo](#18-posicionamiento-externo)
19. [Pilares de contenido](#19-pilares-de-contenido)
20. [Canales](#20-canales)
21. [Estrategia por fase de lanzamiento](#21-estrategia-por-fase-de-lanzamiento)
22. [Formatos y tipos de contenido](#22-formatos-y-tipos-de-contenido)
23. [Marco de calendario de contenido](#23-marco-de-calendario-de-contenido)

---

# PARTE 1 — VOZ Y TONO

---

## 1. Personalidad de la marca

People Conecta no es una app de citas. No es una red social. Es la persona que te dice "hay una caminata el sábado, ¿te sumás?" sin que te parezca raro.

La marca tiene la personalidad de alguien que ya estuvo ahí — que sabe lo que es llegar nuevo a una ciudad, querer salir y no saber cómo proponerlo sin sentirse raro. No habla desde arriba. Habla desde adentro.

**Tres palabras que definen la personalidad:**

| Palabra | Qué significa en la práctica |
|---------|------------------------------|
| **Real** | Habla de cosas concretas: un plan, una fecha, una zona. Sin vaguedades ni promesas vacías. |
| **Cálido** | Entiende que hay algo de vulnerabilidad en querer hacer amigos de grande. No lo ignora ni lo sobreexplica. |
| **Activador** | No describe — invita. Cada frase empuja suavemente hacia la acción, no hacia el scroll infinito. |

---

## 2. Voz

La voz es consistente en todos los canales. El tono cambia, la voz no.

### La voz ES:

- **Directa sin ser fría.** Oraciones cortas. Verbo al frente. "Sumáte al plan" no "Podés unirte a este plan si querés".
- **Humana sin ser infantil.** Hablamos de adultos a adultos. Sin emojis como puntuación. Sin exclamaciones múltiples.
- **Honesta sin ser brutal.** Si algo no va a funcionar, lo decimos claro. Si hay un límite, lo explicamos sin disculpas.
- **Local sin ser localista.** Mar del Plata está en el DNA del producto, no en el copy forzado. No metemos "mirá vos" o "che" en cada frase.

### La voz NO ES:

- Corporativa ("A fin de completar su registro...")
- Hiper-positiva ("¡Genial! ¡Increíble! ¡Perfecto!")
- Pasivo-agresiva ("Parece que algo salió mal...")
- Juvenil forzada ("¡Dale que va! 🔥🔥🔥")

---

## 3. Tono por contexto

El tono es la variación de la voz según el momento emocional del usuario.

| Contexto | Estado emocional del usuario | Tono |
|---------|------------------------------|------|
| Onboarding | Curioso, levemente ansioso | Empático, validador, sin presión |
| Descubrimiento de planes | Explorando, abierto | Activador, concreto, invitante |
| Confirmar inscripción | Decidido, algo nervioso | Celebratorio pero contenido, real |
| Crear un plan | Confiado, creativo | Cómplice, simple, sin fricción |
| Pendiente de aprobación | Expectante, impaciente | Tranquilizador, transparente |
| Error / validación | Frustrado o confundido | Claro, sin culpar, con solución |
| Post-plan / review | Reflexivo, nostálgico | Cálido, breve, sin presión |
| Cancelación | Arrepentido o alivio | Neutro, sin drama |

---

## 4. Principios de escritura

### 4.1 Verbo al frente
Empezar con la acción, no con el contexto.

> ✗ "Para poder sumarte al plan, primero tenés que confirmar."  
> ✓ "Confirmá tu inscripción para unirte."

### 4.2 Una idea por frase
Si una frase necesita dos puntos o tres comas, es dos frases.

> ✗ "Elegí tus intereses para que podamos mostrarte planes que sean relevantes para vos según tu zona y preferencias."  
> ✓ "Elegí lo que te gusta hacer. Vamos a mostrarte planes acordes."

### 4.3 Tuteo consistente
Siempre "vos", nunca "usted" ni "tú". Conjugación rioplatense.

> ✓ "Confirmá" / "Sumáte" / "Creá tu plan"  
> ✗ "Confirma" / "Únete" / "Crea tu plan"

### 4.4 Sin jerga técnica
El usuario no sabe qué es un "perfil pendiente de moderación". Sí entiende "estamos revisando tu perfil".

### 4.5 Los números, específicos
Nunca "pronto" ni "en un momento". Si hay un tiempo estimado, lo decimos.

> ✗ "Tu perfil será aprobado pronto."  
> ✓ "Revisamos perfiles en menos de 24 horas."

### 4.6 Los errores no culpan
El error le pasa al sistema, no al usuario.

> ✗ "El número de teléfono que ingresaste es incorrecto."  
> ✓ "No pudimos verificar ese número. Revisá que esté completo con código de área."

---

## 5. Lo que nunca decimos

| Nunca | Por qué | En cambio |
|-------|---------|-----------|
| "Comunidad" (sustantivo vacío) | Suena a startup genérica | "La gente de People Conecta", "los que van" |
| "Conectar" como verbo mágico | Overused, promete demasiado | "Sumarte", "ir juntos", "conocerse haciendo algo" |
| "Experiencia" | Abstracto | Describir qué pasa concretamente |
| "¡Perfecto!" | Sonríe demasiado | "Listo." o simplemente nada |
| "No olvides" | Paternalista | "Acordate de" o directo al punto |
| "Simplemente" | Minimiza fricciones reales | Eliminarlo |
| "¡Bienvenido/a!" con exclamación | Genérico | Un saludo específico al contexto |

---

# PARTE 2 — UX WRITING

---

## 6. Onboarding y Registro

### Splash / Carga inicial
```
People Conecta
```
*(Solo el nombre. Sin tagline en splash. El diseño habla.)*

### Pantalla de bienvenida (pre-registro)
```
Título:       Salí con gente de tu ciudad.
Subtítulo:    Sumáte a planes reales o proponé el tuyo.
              Sin perfiles eternos. Sin scroll infinito.

CTA primario: Empezar
CTA secundario: Ya tengo cuenta
```

### Registro — Paso 1 (email)
```
Título:       Creá tu cuenta

Label:        Email
Placeholder:  tu@email.com

Label:        Contraseña
Placeholder:  Mínimo 8 caracteres

CTA:          Continuar

Alternativa:  Continuar con Apple
               ─── o ───

Pie:          Al continuar aceptás los
              Términos de uso y la Política de privacidad.
```

### Verificación de teléfono
```
Título:       ¿Cuál es tu número?
Subtítulo:    Lo usamos para verificar tu identidad.
              No lo vemos otros usuarios.

Label:        Teléfono
Placeholder:  +54 9 223 000 0000

CTA:          Enviar código

──────────────────────────────────
[Pantalla código SMS]

Título:       Ingresá el código
Subtítulo:    Te enviamos un SMS a {número}.

Helper:       ¿No te llegó? Reenviar en 0:45

CTA:          Verificar

Link:         Cambiar número
```

### Perfil mínimo
```
Título:       Antes de empezar
Subtítulo:    Tres cosas y listo.

─── Paso 1 de 3 ───

Campo:        Nombre (cómo te llaman)
Placeholder:  Tu nombre real

Helper:       Otros usuarios van a ver este nombre.

─── Foto de perfil ───

Prompt:       Subí una foto tuya.
Helper:       Ayuda a que la gente sepa con quién va a ir.

CTA foto:     Sacar foto   /   Elegir de galería
```

### Onboarding — Paso 1 (motivo)
```
Indicador:    1 de 3

Título:       ¿Por qué estás acá?
Subtítulo:    No hay respuesta correcta.

Opciones (chips):
  Me mudé hace poco
  Cambié de trabajo
  Me separé
  Quiero salir más
  Otra razón

CTA:          Continuar
```

### Onboarding — Paso 2 (intereses)
```
Indicador:    2 de 3

Título:       ¿Qué te gusta hacer?
Subtítulo:    Elegí hasta 3. Podés cambiarlos después.

Opciones (chips):
  Deporte       Gastronomía    Música
  Arte          Naturaleza     Idiomas
  Juegos        Cine           Otro

CTA:          Continuar
```

### Onboarding — Paso 3 (zona)
```
Indicador:    3 de 3

Título:       ¿En qué zona vivís?
Subtítulo:    Vamos a mostrarte planes cerca tuyo.

Label:        Zona o barrio
Placeholder:  Ej: Centro, Güemes, La Perla...

Label:        ¿Qué días solés tener libres?
Opciones:     Lun  Mar  Mié  Jue  Vie  Sáb  Dom

CTA:          Listo, enviar perfil
```

### Confirmación post-onboarding
```
Título:       Listo, {nombre}.
Subtítulo:    Revisamos tu perfil y te avisamos en menos de 24 horas.
              Mientras tanto podés explorar los planes disponibles.

CTA:          Ver planes
```

---

## 7. Pendiente de Aprobación

```
Título:       Estamos revisando tu perfil.
Subtítulo:    Esto tarda menos de 24 horas.
              Te mandamos una notificación cuando esté listo.

Estado:       ⏳ Perfil en revisión

──────────────────────────────────

¿Por qué revisamos los perfiles?

Para que todos en People Conecta sean personas reales.
Es lo único que nos importa verificar.

──────────────────────────────────

Mientras tanto:
[CTA secundario]  Explorar planes disponibles

Nota al pie:  Podés ver los planes pero no inscribirte
              hasta que tu perfil sea aprobado.
```

### Notificación de aprobación (push)
*(ver sección 16)*

---

## 8. Explorar Planes

### Navegación principal
```
Large title:  People Conecta
Toggle:       Lista   🗺 Mapa

SearchBar:    Buscar planes...

Chips filtro: Todos · Deporte · Gastronomía · Arte · Naturaleza · Música · Más

Sección:      Esta semana
```

### Card de plan
```
Badge:        [categoría]

Título:       {Nombre del plan}
Metadata:     {Zona} · {Día, fecha} · {hora}

Stack:        {avatares} +{N}
Cupos:        {X}/{Y} cupos

CTA:          Me sumo
```

### Filtros (FilterSheet)
```
Título:       Filtrar planes

Sección:      Cuándo
Opciones:     Hoy · Esta semana · Este fin de semana · Elegir fecha

Sección:      Categoría
Opciones:     Todos · Deporte · Gastronomía · Arte · Naturaleza · Música · Idiomas · Juegos · Cine · Otro

Sección:      Zona
Opciones:     Cerca mío · Elegir barrio

Sección:      Tamaño del grupo
Opciones:     Hasta 6 · Hasta 12 · Más de 12

Sección:      Costo
Opciones:     Gratis · Pagos · Todos

CTA primario: Ver {N} planes
CTA ghost:    Borrar filtros
```

### Vista mapa — card flotante al tocar pin
```
{Foto pequeña}  {Nombre del plan}
                {Zona} · {fecha}
                {X}/{Y} cupos

CTA:            Ver plan →
```

---

## 9. Detalle del Plan

### Header
```
Título nav:   {Nombre del plan}
Back label:   Explorar
Acción:       Compartir ↑
```

### Secciones
```
Badge:        [categoría]

Título:       {Nombre del plan}

Metadata:
  📍 {Zona}
  📅 {Día, fecha}
  ⏰ {hora}
  💰 Gratis  /  ${monto} (se coordina entre participantes)

Cupos:        ██████░░░░  {X} de {Y} cupos confirmados
              [badge: "¡Último cupo!" si queda 1]
              [badge: "Completo" si está lleno]

──────────────────────────────────
Sobre el plan

{Descripción completa}

──────────────────────────────────
Quién propone

{ListItem creador}
  {Nombre} · ★ {rating} · {N} planes creados

──────────────────────────────────
Van a ir ({X} de {Y})

{ListItem participante 1}
{ListItem participante 2}
{ListItem participante 3}
Ver todos →
```

### CTAs sticky (variantes)
```
[Disponible]
  Gratis / ${monto}
  [Me sumo]

[Completo]
  Sin cupos disponibles
  [Sin cupos — disabled]

[Ya inscripto]
  ✓ Confirmado
  [Cancelar inscripción — ghost error]

[Plan propio]
  [Editar plan — ghost]  [Cancelar plan — ghost error]
```

### ConfirmSheet (antes de inscribirse)
```
Título:       Confirmá tu inscripción

Resumen:
  {Nombre del plan}
  📍 {Zona} · 📅 {fecha} · ⏰ {hora}

  Van a ir:
  {avatar} {avatar} {avatar}  +{N} más

  [Si es pago:]
  💰 ${monto} — {cómo se coordina el pago}
     El pago se coordina entre los participantes.
     People Conecta no intermedia.

CTA primario: Me sumo
CTA ghost:    Cancelar
```

### CancelSheet (cancelar inscripción)
```
Título:       ¿Seguro que querés cancelar?

Texto:        Cancelar con menos de 24 horas de anticipación
              suma un "no-show" a tu perfil.

              Tenés {N} no-shows registrados.
              [Solo si tiene 2+:]
              Con 3 no-shows tu cuenta queda restringida temporalmente.

CTA primario [destructivo]: Sí, cancelar inscripción
CTA ghost:    Quedarme en el plan
```

---

## 10. Crear un Plan

### Trigger
```
FAB tooltip:  Crear un plan
```

### CreatePlanSheet — paso a paso

```
── Paso 1 de 8 ──────────────────

Título:       ¿Cómo se llama tu plan?

Label:        Nombre del plan
Placeholder:  Ej: Fútbol 5 en Punta Mogotes, Cena en casa, Caminata por la costa
Helper:       Sé específico. Ayuda a que la gente entienda qué vas a hacer.

CTA:          Siguiente

── Paso 2 de 8 ──────────────────

Título:       ¿Qué categoría es?

Opciones (chips):
  Deporte · Gastronomía · Música · Arte
  Naturaleza · Idiomas · Juegos · Cine · Otro

CTA:          Siguiente

── Paso 3 de 8 ──────────────────

Título:       Contá un poco más.

Label:        Descripción
Placeholder:  ¿Qué van a hacer? ¿Qué llevar? ¿Qué nivel se necesita?
Counter:      {N}/200 caracteres

CTA:          Siguiente

── Paso 4 de 8 ──────────────────

Título:       ¿Cuándo es?

Label:        Fecha
Placeholder:  Elegir fecha

Label:        Hora de inicio
Placeholder:  Elegir hora

CTA:          Siguiente

── Paso 5 de 8 ──────────────────

Título:       ¿Dónde es?

Label:        Zona o punto de referencia
Placeholder:  Ej: Punta Mogotes, Güemes, Plaza España
Helper:       La dirección exacta solo la ven quienes confirman.

CTA:          Siguiente

── Paso 6 de 8 ──────────────────

Título:       ¿Cuántos pueden ir?

Label:        Cupo máximo (incluís vos)
Stepper:      − {N} +
Helper:       Mínimo 3, máximo 20.

Label:        Preferencia de género
Opciones:     Mixto · Solo mujeres · Sin preferencia

CTA:          Siguiente

── Paso 7 de 8 ──────────────────

Título:       ¿El plan tiene costo?

Opciones:
  ○ Es gratis
  ○ Tiene costo

  [Si tiene costo:]
  Label:        Monto aproximado
  Placeholder:  Ej: $2.000 por persona

  Label:        ¿Cómo se coordina el pago?
  Placeholder:  Ej: "Se paga en el lugar", "Transferencia previa"
  Helper:       People Conecta no procesa pagos. Esto es solo informativo.

CTA:          Siguiente

── Paso 8 de 8 ──────────────────

Título:       Elegí una imagen para el plan.

Opción A:     [Generar con IA ✨]
              Generamos una imagen según tu categoría y descripción.
              [Plan free: 1 intento]
              [Plan premium: hasta 3 intentos]

              [Preview imagen generada]
              [Regenerar — outlined]  ← solo premium
              [Usar esta imagen — filled]

Opción B:     [Subir mi foto]

CTA skip:     Continuar sin imagen ← genera automáticamente

── Revisión final ───────────────

Título:       Revisá tu plan antes de publicar.

{Preview completo del plan como card}

Nombre:       {nombre}
Categoría:    {categoría}
Descripción:  {descripción}
Fecha:        {fecha y hora}
Zona:         {zona}
Cupo:         {N} personas · {género}
Costo:        Gratis / ${monto}

[Editar] → vuelve al paso correspondiente

CTA primario: Publicar plan
CTA ghost:    Guardar como borrador ← futuro
```

### Confirmación de publicación
```
Título:       Tu plan está publicado.
Subtítulo:    Te avisamos cuando alguien se sume.

CTA primario: Ver mi plan
CTA ghost:    Volver a Explorar
```

### Límite free alcanzado
```
Título:       Llegaste al límite del mes.
Subtítulo:    Con el plan gratuito podés tener
              2 planes activos por mes.

CTA primario: Ver Conecta Plus
CTA ghost:    Entendido
```

---

## 11. Mis Planes

```
Large title:  Mis Planes

Segmented:    Próximos   |   Pasados

── Vista Próximos ───────────────

{EventCard compact}
  {foto}  {Nombre del plan}         Confirmado ✓
          {Día, fecha} · {hora}
          {Zona} · {X}/{Y} cupos

── Vista Pasados ────────────────

{EventCard compact}
  {foto}  {Nombre del plan}         Asistido ✓  /  No asistí
          {Día pasado}
          {Zona}
          [Dejar reseña →]  ← si está dentro de la ventana de 48hs
```

### ReviewSheet (post-plan)
```
Título:       ¿Cómo estuvo {Nombre del plan}?

Sección:      Calificá el plan
Estrellas:    ★ ★ ★ ★ ★

Label:        Comentario (opcional)
Placeholder:  ¿Qué fue lo mejor? ¿Algo que mejorarías?
Counter:      {N}/150

CTA:          Enviar reseña
CTA ghost:    Ahora no
```

---

## 12. Perfil

```
Large title:  Mi perfil

ProfileCard:
  {avatar xl}
  ✓ Verificado Plus  ← si aplica

  {Nombre}
  {Ciudad}

  {N} planes  |  ★ {rating}  |  Desde {mes año}

  Chips:  {interés 1}  {interés 2}  {interés 3}

──────────────────────────────────
Mis planes creados

{EventCard compact x3}
Ver todos →

──────────────────────────────────
Mis reseñas recibidas

{reseña 1}
{reseña 2}
{reseña 3}
```

### Pantalla de edición de perfil
```
Título:       Editar perfil

[Foto de perfil] → Cambiar foto

Label:        Nombre
Label:        Zona
Label:        Intereses (hasta 3)

CTA:          Guardar cambios
```

### SettingsScreen
```
Título:       Ajustes

Sección: Cuenta
  Mi suscripción         → {Free / Conecta Plus}
  Notificaciones         → toggle
  Cambiar contraseña     →
  Cerrar sesión          →

Sección: Legal
  Términos de uso        →
  Política de privacidad →
  Política de moderación →

Sección: Soporte
  Contactar al equipo    →
  Reportar un problema   →

Sección: Zona de peligro
  Eliminar cuenta        → [ghost error]
```

---

## 13. Chat Grupal

### Acceso desde EventDetail
```
Botón:        💬 Chat del grupo   ← solo visible para confirmados
Badge:        {N} mensajes nuevos  ← si hay no leídos
```

### Header del chat
```
Título:       {Nombre del plan}
Subtítulo:    {N} participantes · {X} horas para el encuentro
              ─── o ───
              Chat cerrado el {fecha}  ← si ya pasó el plan
```

### Primer mensaje del sistema (automático al activarse)
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Chat del grupo activado.
  Usálo para coordinar el encuentro.
  Se cierra 24 horas después del plan.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Mensaje de sistema: nuevo participante
```
{Nombre} se sumó al plan.
```

### Mensaje de sistema: participante cancela
```
{Nombre} canceló su inscripción.
```

### Input del chat
```
Placeholder:  Escribí algo...
Acciones:     📷 Foto  /  Enviar
```

### Chat cerrado
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Este chat está cerrado.
  El encuentro ya fue el {fecha}.
  Esperamos que haya salido genial.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Notificación push — 1 hora antes del cierre
```
Título:       El chat del grupo se cierra en 1 hora.
Cuerpo:       Coordiná lo último para {Nombre del plan}.
```

### ReportSheet (mensaje en chat)
```
Título:       Reportar mensaje

Opciones:
  ○ Lenguaje inapropiado u ofensivo
  ○ Spam o publicidad
  ○ Acoso o amenaza
  ○ Contenido sexual
  ○ Otro

Label:        Detalle (opcional)
Placeholder:  Contanos qué pasó

CTA:          Enviar reporte
Helper:       Revisamos todos los reportes en menos de 2 horas
              en horario activo.
```

---

## 14. Empty States

### Sin planes en tu zona
```
[Ilustración: persona mirando el horizonte]

Título:       No hay planes cerca esta semana.

Texto:        Podés ser el primero en proponer algo
              en tu zona.

CTA:          Crear un plan
CTA ghost:    Ampliar búsqueda
```

### Sin resultados con filtros
```
[Ilustración: binoculares vacíos]

Título:       No encontramos planes con esos filtros.

Texto:        Probá cambiando la categoría
              o el rango de fechas.

CTA:          Borrar filtros
```

### Mis Planes vacío (Próximos)
```
[Ilustración: calendario vacío]

Título:       No tenés planes próximos.

Texto:        Explorá lo que hay esta semana
              o proponé el tuyo.

CTA primario: Explorar planes
CTA ghost:    Crear un plan
```

### Mis Planes vacío (Pasados)
```
[Ilustración: huella en la arena]

Título:       Todavía no fuiste a ningún plan.

Texto:        Cuando vayas, acá vas a ver
              tu historial y las reseñas que te dejen.

CTA:          Explorar planes
```

### Perfil pendiente de aprobación (si intenta inscribirse)
```
[Ilustración: reloj de arena]

Título:       Tu perfil todavía está en revisión.

Texto:        En cuanto lo aprobemos podés inscribirte.
              Revisamos en menos de 24 horas.

CTA ghost:    Entendido
```

### Plan sin cupos
```
[Ilustración: asientos llenos]

Título:       Este plan ya está completo.

Texto:        Explorá otros planes de {categoría}
              en tu zona esta semana.

CTA:          Ver planes similares
```

---

## 15. Errores y Validaciones

### Errores de formulario (inline)

| Campo | Error | Mensaje |
|-------|-------|---------|
| Email | Formato inválido | "Revisá el formato del email." |
| Email | Ya registrado | "Ya hay una cuenta con ese email. ¿Querés ingresar?" |
| Contraseña | Muy corta | "La contraseña necesita al menos 8 caracteres." |
| Contraseña | No coincide (confirmación) | "Las contraseñas no coinciden." |
| Teléfono | Formato inválido | "Ingresá el número completo con código de área." |
| Código SMS | Incorrecto | "El código no es correcto. Revisalo e intentá de nuevo." |
| Código SMS | Expirado | "El código venció. Pedí uno nuevo." |
| Nombre del plan | Vacío | "Poné un nombre para tu plan." |
| Nombre del plan | Muy corto | "El nombre necesita al menos 5 caracteres." |
| Descripción | Demasiado larga | "Máximo 200 caracteres." |
| Fecha | En el pasado | "La fecha tiene que ser a partir de mañana." |
| Cupo | Fuera de rango | "El cupo tiene que ser entre 3 y 20 personas." |
| Foto | Archivo muy grande | "La foto no puede superar los 5MB." |
| Foto | Contenido rechazado | "No pudimos usar esa foto. Subí otra o generá una con IA." |

### Errores de red / sistema

```
Toast / Banner:
  "Sin conexión. Revisá tu internet e intentá de nuevo."

  "Algo salió mal. Intentá de nuevo en un momento."

  "No pudimos cargar los planes. [Reintentar]"
```

### Error de plan filtrado por moderación
```
Título:       Tu plan está siendo revisado.

Texto:        Algunos términos del nombre o la descripción
              requieren revisión manual.
              Te avisamos en cuanto esté listo.

              Si creés que es un error, escribinos a
              hola@peopleconecta.com

CTA:          Entendido
```

---

## 16. Push Notifications

Reglas generales:
- Máximo una notificación por evento. Sin duplicar con email en el mismo momento.
- Cuerpo: nunca más de dos líneas visibles en pantalla de bloqueo.
- Tono: directo, sin exaltación.

| Evento | Título | Cuerpo |
|--------|--------|--------|
| Perfil aprobado | "Tu perfil fue aprobado." | "Ya podés inscribirte y crear planes. ¡A explorar!" |
| Alguien se suma a tu plan | "{Nombre} se sumó a {plan}." | "Ya van {N} de {Y} confirmados." |
| Alguien cancela en tu plan | "{Nombre} canceló en {plan}." | "Quedan {X} cupos disponibles." |
| Tu inscripción confirmada | "Te sumaste a {plan}." | "{Día, fecha} en {zona}. Te avisamos antes." |
| Recordatorio 24hs antes | "Mañana es {plan}." | "{hora} en {zona}. ¿Todo listo?" |
| Chat activado | "El chat de {plan} está activo." | "Ya pueden coordinar el encuentro." |
| Mensaje nuevo en chat | "{Nombre} en {plan}:" | "{preview del mensaje}" |
| Cierre de chat (1hs antes) | "El chat de {plan} se cierra en 1 hora." | "Coordiná lo último antes del encuentro." |
| Ventana de review abierta | "¿Cómo estuvo {plan}?" | "Tenés 48 horas para dejar tu reseña." |
| Plan cancelado por creador | "{plan} fue cancelado." | "{Nombre} canceló el plan. Seguís libre esa fecha." |

---

## 17. Emails Transaccionales

Reglas generales:
- Asunto: máximo 50 caracteres. Sin emojis en el asunto.
- Remitente: People Conecta <hola@peopleconecta.com>
- Sin HTML complejo — diseño limpio, una columna.
- Siempre incluir enlace para abrir la app.

---

### E1 — Confirmación de registro

**Asunto:** Confirmá tu email — People Conecta

```
Hola {nombre},

Gracias por registrarte.

Tocá el botón para confirmar tu email y seguir
con el proceso de aprobación de perfil.

[Confirmar email]

Si no creaste esta cuenta, ignorá este mail.

— El equipo de People Conecta
```

---

### E2 — Perfil aprobado

**Asunto:** Tu perfil fue aprobado

```
Hola {nombre},

Tu perfil fue aprobado. Ya podés inscribirte
a planes y crear los tuyos.

Esta semana hay {N} planes disponibles en {ciudad}.

[Ver planes →]

— People Conecta
```

---

### E3 — Confirmación de inscripción

**Asunto:** Estás en {Nombre del plan}

```
Hola {nombre},

Te sumaste a:

{Nombre del plan}
📅 {Día, fecha completa}
⏰ {hora}
📍 {Zona} — la dirección exacta la ves en la app.

{Si hay chat activo:}
Ya podés hablar con el grupo para coordinar.
[Abrir chat →]

Te mandamos un recordatorio el día antes.

— People Conecta
```

---

### E4 — Alguien se suma a tu plan (al creador)

**Asunto:** {Nombre} se sumó a tu plan

```
Hola {nombre},

{Nombre participante} confirmó su asistencia a
{Nombre del plan}.

Cupos: {X} de {Y} confirmados.

[Ver mi plan →]

— People Conecta
```

---

### E5 — Recordatorio 24 horas antes

**Asunto:** Mañana es {Nombre del plan}

```
Hola {nombre},

Te recordamos que mañana es tu plan:

{Nombre del plan}
📅 {Día, fecha}
⏰ {hora}
📍 {Dirección exacta} — {Zona}

Van a ir {N} personas.

{Si hay chat:}
El grupo está coordinando los detalles.
[Ver chat →]

— People Conecta
```

---

### E6 — Solicitud de reseña (48hs después del plan)

**Asunto:** ¿Cómo estuvo {Nombre del plan}?

```
Hola {nombre},

¿Cómo estuvo el plan del {fecha}?

Tu reseña ayuda a que {Nombre creador} y los demás
sepan qué funcionó bien.

Tenés hasta el {fecha límite} para dejarla.

[Dejar reseña →]

— People Conecta

P.D.: Si no pudiste ir, ignorá este mail.
```

---

### E7 — Plan cancelado por creador

**Asunto:** {Nombre del plan} fue cancelado

```
Hola {nombre},

{Nombre creador} canceló el plan del {fecha}:
{Nombre del plan}.

Seguís libre ese día. Hay otros planes disponibles
en tu zona esta semana.

[Ver planes →]

— People Conecta
```

---

### E8 — Reporte recibido (al fundador)

**Asunto:** ⚠ Nuevo reporte — {tipo de reporte}

```
Reporte enviado por: {nombre usuario} ({user_id})
Tipo: {tipo}
Sobre: {plan o mensaje}

Detalle:
{texto del reporte}

—
Respondé en menos de 2 horas en horario activo.
[Ver en dashboard →]
```

---

# PARTE 3 — CONTENT STRATEGY

---

## 18. Posicionamiento externo

### Tagline principal
```
Salí con gente de tu ciudad.
```

### Taglines alternativos (para variaciones de contenido)
```
El plan lo ponés vos. La gente la ponemos entre todos.
No hace falta conocer a nadie para proponer un plan.
Primero la actividad. Después la amistad.
Hay gente en tu ciudad con ganas de lo mismo que vos.
```

### Lo que NO decimos en comunicación externa
- No prometemos "hacer amigos para siempre"
- No usamos "soledad" como palabra — usamos situaciones concretas
- No somos "la app de citas para amigos" — nunca ese frame
- No somos Meetup ni Bumble BFF — no nos comparamos

### Elevator pitch (30 segundos)
```
People Conecta es una app para hacer cosas con gente de tu ciudad.

No es una red social. No hay perfiles eternos ni scroll infinito.
Alguien propone un plan — una caminata, una cena, un partido de fútbol —
y otras personas con intereses similares se suman.

Está pensada para quien llega nuevo a una ciudad, cambia de etapa de vida
o simplemente quiere salir más sin depender de que alguien lo organice.
```

---

## 19. Pilares de contenido

El contenido de People Conecta se organiza en 4 pilares. Cada pieza de contenido pertenece a al menos uno.

### Pilar 1: LA SITUACIÓN
*Nombrar el momento de vida del usuario sin nombrarlo*

Contenido que habla de la experiencia de querer conectar con gente sin sonar a autoayuda. Situaciones cotidianas, reconocibles, que generan identificación.

Ejemplos:
- "El momento en que te mudaste y el primer fin de semana no sabías qué hacer"
- "Cuando querés proponer un plan y no sabés a quién mandárselo"
- "Tener una ciudad entera afuera y sentir que no sabés cómo entrar"

### Pilar 2: EL PLAN
*Mostrar que pasar algo real está a un tap de distancia*

Contenido que muestra planes reales que pasaron o están por pasar. Fotos del después. Historias cortas de encuentros reales. El proof of concept viviente.

Ejemplos:
- Foto post-plan con caption mínimo
- "El sábado había una caminata en Cabo. Fueron 5. Ninguno se conocía antes."
- Stories de planes disponibles esta semana

### Pilar 3: EL FUNDADOR
*Narrativa de quién está detrás y por qué*

Contenido de voz de fundadora: por qué existe el producto, qué se está aprendiendo, cómo se construye. Pensado para credibilidad, prensa y LinkedIn principalmente.

Ejemplos:
- Por qué decidí construir esto
- Qué aprendí en la primera semana de betas
- Las decisiones de diseño más difíciles

### Pilar 4: LA EDUCACIÓN
*Enseñar a usar la app sin que parezca un tutorial*

Contenido que muestra cómo funciona la app de manera natural, integrada a situaciones reales. No screencasts. Historias o situaciones que muestran el flujo.

Ejemplos:
- "¿Sabías que la dirección exacta solo la ven los que confirman?"
- "Así funciona el chat del grupo"
- "Podés proponer un plan en menos de 3 minutos"

---

## 20. Canales

### Instagram (canal principal)

**Objetivo:** Awareness + comunidad + conversión a waitlist/descarga  
**Frecuencia:** 4–5 veces por semana (feed + stories)  
**Tono:** Cálido, real, sin producción excesiva  
**Formatos:** Carruseles, reels cortos, fotos de planos reales, texto sobre fondo  

**Qué publicamos:**
- Pilar 1 y 2 principalmente
- Stories: planes disponibles esta semana, polls, behind the scenes
- Reels: situaciones cotidianas de 15-30 segundos, sin locutor

**Qué NO publicamos:**
- Screenshots de la app como contenido principal
- Infografías corporativas
- Frases motivacionales

---

### TikTok

**Objetivo:** Descubrimiento orgánico, llegar a 18-25 años  
**Frecuencia:** 2–3 veces por semana  
**Tono:** Honesto, ligeramente irónico, sin forzar el humor  
**Formatos:** Videos de 30-60 segundos, POV, "cuando..."  

**Qué publicamos:**
- Pilar 1: situaciones reconocibles ("cuando querés proponer un plan pero...")
- Pilar 2: mini-documentales de 60 segundos de un plan real
- Pilar 4: demo del producto en situación natural

---

### WhatsApp / Grupos locales

**Objetivo:** Reclutamiento beta + activación local en Mar del Plata  
**Frecuencia:** Puntual, no rutinario  
**Tono:** Directo, personal, de igual a igual  

**Qué publicamos:**
- Mensaje personal de la fundadora
- Invitación a planes disponibles
- Pedido de feedback post-plan

---

### LinkedIn

**Objetivo:** Prensa, inversores, credibilidad de fundadora  
**Frecuencia:** 1–2 veces por semana  
**Tono:** Reflexivo, honesto sobre el proceso, sin lenguaje startup genérico  

**Qué publicamos:**
- Pilar 3: narrativa de fundadora
- Aprendizajes del proceso de construcción
- Decisiones de producto con contexto

---

## 21. Estrategia por fase de lanzamiento

### Fase 0 — Pre-lanzamiento (semanas 1 a 4)
**Objetivo de contenido:** Generar expectativa + reclutar los 20 beta users

**Acciones clave:**
- Activar cuentas de Instagram y TikTok con los primeros 3 posts de pilar 1
- Post de fundadora en LinkedIn explicando qué es People Conecta y por qué
- Mensaje directo en grupos de WhatsApp de Mar del Plata con invitación a ser beta
- Stories de "detrás de escena" del proceso de desarrollo
- Landing page simple con formulario de waitlist

**Meta de contenido:** 500 seguidores en Instagram, 20 betas reclutados, 100 en waitlist

**Mensajes clave de esta fase:**
```
"Estamos armando People Conecta. Es una app para hacer planes
con gente de tu ciudad. Estamos buscando personas en Mar del Plata
que quieran probarla antes del lanzamiento."
```

---

### Fase 1 — Lanzamiento cerrado (semanas 5 a 8)
**Objetivo de contenido:** Mostrar que funciona + crecer lista de espera

**Acciones clave:**
- Publicar contenido de pilar 2: fotos reales de los primeros planes beta
- Stories semanales con los planes disponibles esa semana
- Reels de 30-60 segundos con mini-historias de los primeros encuentros
- Post de fundadora: "semana 1 del beta, esto aprendimos"
- Abrir formulario de lista de espera con fecha tentativa de apertura

**Meta de contenido:** 2.000 seguidores en Instagram, 500 en waitlist

---

### Fase 2 — Apertura pública (semanas 9 a 16)
**Objetivo de contenido:** Conversión a descarga + activación premium

**Acciones clave:**
- Post de lanzamiento en todos los canales el día de apertura en App Store
- Campaña de "tu primer plan" — acompañar a nuevos usuarios en su primera experiencia
- UGC: repostear fotos de planes que compartan los usuarios
- Contenido de pilar 4: mostrar el plan Premium con casos reales
- PR: notas en medios locales de Mar del Plata y medios digitales de lifestyle

**Meta de contenido:** 5.000 seguidores en Instagram, 500 usuarios descargaron la app

---

## 22. Formatos y tipos de contenido

### Formatos Instagram

| Formato | Pilar | Frecuencia | Descripción |
|---------|-------|------------|-------------|
| Carrusel texto | 1 | 2x/semana | Situación en primera persona, 4-6 slides, tipografía sobre fondo arena |
| Foto plan real | 2 | 1x/semana | Foto post-plan, caption mínimo, fecha y tipo de plan |
| Reel situación | 1 | 1x/semana | Video 15-30s, sin locutor, texto en pantalla, música |
| Story planes semana | 2 | 3x/semana | "Esta semana hay: caminata / cena / fútbol" |
| Story poll | 1 | 1x/semana | Pregunta de identificación ("¿Alguna vez quisiste proponer un plan y no supiste a quién?") |

### Formatos TikTok

| Formato | Pilar | Duración | Descripción |
|---------|-------|----------|-------------|
| POV | 1 | 15-30s | "POV: llegaste nuevo a Mar del Plata y..." |
| Mini-documental plan | 2 | 45-60s | Antes + durante + después de un plan real |
| Demo natural | 4 | 30-45s | Pantalla + voz en off explicando un flujo |

### Formatos LinkedIn

| Formato | Pilar | Descripción |
|---------|-------|-------------|
| Texto largo | 3 | Reflexión de fundadora sobre decisión de producto o aprendizaje |
| Foto + texto | 2 | Plan real + contexto de por qué el producto existe |

---

## 23. Marco de calendario de contenido

### Semana tipo (Fase 1 en adelante)

| Día | Instagram | TikTok | LinkedIn |
|-----|-----------|--------|----------|
| Lunes | Carrusel pilar 1 | — | Post fundadora (si hay) |
| Martes | Story: planes de la semana | — | — |
| Miércoles | — | Reel / POV | — |
| Jueves | Foto plan real | — | — |
| Viernes | Story: "¿Qué hacés este finde?" | Reel demo o plan real | — |
| Sábado | Story: repostear si hay plan ese día | — | — |
| Domingo | — | — | — |

### Reglas del calendario

1. **Primero el contenido real, después el producido.** Si hay un plan que salió bien, eso va antes que cualquier carrusel programado.
2. **Un solo CTA por post.** No mezclar "seguinos", "descargá" y "sumáte al waitlist" en la misma pieza.
3. **No publicar el día del lanzamiento de una función** sin tener el contenido preparado con 48hs de anticipación.
4. **Los comentarios y DMs se responden en menos de 24 horas** en fase de lanzamiento.

---

*Content System v1.0 — People Conecta MVP*  
*UX Writing + Content Strategy — Mayo 2026*  
*Trabaja junto a Design.md y PRD_PeopleConecta_MVP_v3.md*
