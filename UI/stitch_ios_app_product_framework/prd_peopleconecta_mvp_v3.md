# PRD — People Conecta MVP
**Versión:** 3.0
**Fecha:** Mayo 2026
**Autor:** Fundador
**Estado:** Draft activo

**Historial de versiones:**
| Versión | Cambio principal |
|---------|-----------------|
| v1.0 | Modelo original con organizadores verificados institucionales |
| v2.0 | Cualquier usuario aprobado puede crear planes. Se eliminan organizadores institucionales. |
| v3.0 | App nativa iOS. Expansión multi-ciudad. Chat grupal por plan. Foto de plan con IA. Protocolo de seguridad ante planes de riesgo. |

---

## 1. Visión del Producto

People Conecta es una app para hacer amigos a través de actividades reales que la misma gente organiza. Conecta a personas de 18 a 35 años — en Mar del Plata, Chapadmalal, o cualquier ciudad donde se la necesite — que quieren salir, conocer gente y construir vínculos reales. Sin perfiles extensos, sin citas de amistad, sin scroll infinito.

El producto resuelve un problema concreto: quien llega nuevo a una ciudad, cambia de etapa de vida o reconstruye su red social no tiene un lugar simple donde proponer o sumarse a un plan real con gente cercana. People Conecta es ese lugar.

**Principio rector del MVP:** El móvil es el gateway, no el destino. El usuario entra a la app para salir a la calle.

**Sede de operaciones:** Mar del Plata / Chapadmalal. El MVP se lanza y valida aquí antes de expandirse. La plataforma es técnicamente multi-ciudad desde el inicio, pero el foco operativo, la adquisición de usuarios y la moderación manual del fundador opera desde esta sede.

---

## 2. Problema

### 2.1 Problema del usuario
- Jóvenes de 18 a 35 años que no tienen red social activa por mudanza, cambio de trabajo, ruptura u otra transición de vida.
- Quieren hacer cosas con gente real pero no saben cómo proponer un plan sin sentirse raros, ni cómo sumarse a uno sin conocer a nadie.
- La vergüenza de llegar solo a un espacio nuevo es el principal freno, no la falta de ganas.
- No existe un lugar simple donde proponer "¿alguien quiere ir a X el viernes?" a personas con intereses similares en la misma ciudad.

### 2.2 Lo que no existe hoy
No hay una plataforma local, simple y orientada a vínculos reales donde cualquier persona pueda proponer un plan, y otras personas con intereses afines puedan sumarse. Las redes sociales existentes no resuelven esto: requieren ya tener una red formada para que la propuesta llegue a alguien.

---

## 3. Usuarios

### 3.1 Un solo tipo de usuario — con dos modos de uso

En People Conecta hay **un único tipo de usuario**. Cualquier usuario con perfil aprobado puede tanto crear planes como unirse a los de otros. Los roles no son fijos: la misma persona puede crear un plan hoy y sumarse a tres planes de otros mañana.

**Perfil:** Persona de 18 a 35 años, con red social débil o en reconstrucción, en cualquier ciudad donde People Conecta esté activa.

**Segmentos prioritarios:**

| Segmento | Situación | Urgencia |
|----------|-----------|----------|
| Recién llegado | Mudanza por estudio o trabajo | Alta |
| En transición | Separación, cambio de trabajo, nueva etapa | Alta |
| Digitalmente saturado | Tiene vínculos online pero quiere presenciales | Media |

**Momento de mayor intención de uso:** Los primeros 30 días después de la mudanza o el cambio de vida. En ese período el usuario está en modo búsqueda activa y tiene alta apertura emocional al cambio.

**Frenos principales:**
1. Vergüenza e inseguridad social ante lo desconocido
2. No saber cómo proponer un plan sin parecer desesperado
3. Miedo al encuentro 1 a 1 con desconocidos
4. Sensación de que "necesitar una app para hacer amigos" es una falla personal

### 3.2 Modos de uso

| Modo | Descripción | Quién lo usa |
|------|-------------|--------------|
| **Crear un plan** | Propongo una actividad con fecha, zona y cupo — espero que otros se sumen | Cualquier usuario aprobado |
| **Sumarse a un plan** | Busco actividades que me interesan y me anoto en las de otros | Cualquier usuario aprobado |

Un mismo usuario puede alternar entre ambos modos libremente.

---

## 4. Propuesta de Valor

### Para quien quiere sumarse a un plan
> "En menos de 3 clics, encontrás un plan real con gente de tu ciudad haciendo algo que te gusta, esta semana."

- Sin perfil extenso. Sin citas de amistad.
- Primero la actividad, después las personas.
- Grupos pequeños (3 a 6 personas) para reducir el riesgo percibido.

### Para quien quiere crear un plan
> "Proponé lo que querés hacer, y la app te consigue con quién hacerlo."

- Sin tener que tener seguidores ni red previa.
- Tu plan llega a personas con intereses similares en tu zona.
- Vos decidís el cupo, la actividad y si es gratis o pago.

---

## 5. Plataforma y Alcance Geográfico

### 5.1 Plataforma del MVP

**El MVP es una app nativa para iOS**, disponible en el App Store desde el día de lanzamiento público.

| Decisión | Detalle |
|----------|---------|
| Plataforma | iOS nativa (Swift / SwiftUI o React Native) |
| Android | Fuera de scope del MVP — se evalúa en Fase 2 según tracción |
| Web | Fuera de scope del MVP |
| Distribución | App Store (Apple) |

**Razón de la decisión:** Concentrar el esfuerzo técnico en una sola plataforma permite lanzar más rápido, mantener mejor calidad de experiencia y reducir la complejidad de soporte en el MVP.

### 5.2 Alcance geográfico

**MVP — Sede de lanzamiento:** Mar del Plata y Chapadmalal.
Toda la adquisición, moderación y soporte del fundador opera desde aquí.

**Diseño técnico multi-ciudad:** La plataforma se construye con soporte de ciudades desde el inicio. Cada plan está asociado a una ciudad. El usuario al registrarse indica su ciudad. Los filtros de descubrimiento son siempre dentro de la ciudad del usuario.

**Expansión:** Nuevas ciudades se habilitan manualmente por el fundador. Para abrir una ciudad nueva se requiere un mínimo de 10 usuarios beta comprometidos en esa ciudad antes de la apertura pública.

---

## 6. Alcance del MVP

### 6.1 Qué incluye el MVP

El MVP tiene cinco flujos principales:

**Flujo 1 — Registro y aprobación de perfil**
- El usuario descarga la app, se registra con email + teléfono.
- Completa un perfil mínimo: nombre real, foto, hasta 3 intereses, ciudad y zona donde vive.
- El perfil queda en estado "pendiente" hasta aprobación manual del fundador.
- Al ser aprobado, recibe una notificación push de bienvenida y acceso completo a la app.

**Flujo 2 — Descubrimiento de planes**
- El usuario ve una lista de planes publicados por la comunidad de su ciudad.
- Puede filtrar por zona, categoría, día de la semana, tamaño del grupo y si es gratuito o pago.
- Cada plan muestra: foto del plan (generada por IA o subida por el creador), nombre de la actividad, quién lo propone, zona, fecha, cupos disponibles y quiénes ya se anotaron.

**Flujo 3 — Inscripción a un plan**
- El usuario toca "Me sumo".
- Ve el resumen del plan y los perfiles mínimos de quiénes ya confirmaron.
- Confirma con un toque.
- Recibe una notificación push de confirmación con detalles del encuentro.
- Si el plan ya tiene al menos 1 confirmado además del creador, accede inmediatamente al chat grupal del plan.

**Flujo 4 — Creación de un plan**
- Cualquier usuario con perfil aprobado puede crear un plan.
- El plan se publica automáticamente sin revisión adicional.
- El creador elige la imagen del plan: genera una con IA (basada en la categoría y descripción) o sube su propia foto.
- El creador recibe notificaciones push cuando alguien se suma o cancela.

**Flujo 5 — Chat grupal del plan**
- Se activa automáticamente cuando el plan tiene al menos 2 confirmados (creador + 1 participante).
- Es un grupo cerrado: solo participan quienes están en la lista de confirmados.
- El chat se cierra 24 horas después de la fecha del plan.
- No hay mensajes directos 1 a 1 entre usuarios fuera del chat del plan.

### 6.2 Qué NO incluye el MVP

- Mensajes directos 1 a 1 entre usuarios
- Feed de contenido o publicaciones
- Matching por compatibilidad de intereses
- Integración con redes sociales externas
- Mapa interactivo (lista con zona es suficiente)
- Sistema de pagos integrado (los planes pagos se coordinan fuera de la app)
- Verificación de identidad con documento
- App Android
- Expansión automática a nuevas ciudades

---

## 7. Funcionalidades del MVP

### 7.1 Registro y onboarding

**Registro:**
- Email + contraseña o autenticación con Apple ID (Sign in with Apple — obligatorio para apps iOS en App Store)
- Verificación de número de teléfono (SMS) — obligatoria para poder crear o unirse a planes
- Nombre real y foto de perfil — obligatorios
- Hasta 3 intereses — obligatorio
- Ciudad de residencia — obligatorio

**Onboarding (máximo 3 pasos):**
1. ¿Por qué estás acá? (opciones: llegué nuevo a la ciudad / cambié de etapa / quiero salir más / otra)
2. ¿Qué te interesa hacer? (selección múltiple: deporte, música, cocina, idiomas, cine, naturaleza, arte, juegos, otro)
3. ¿En qué zona de tu ciudad vivís y qué días tenés disponibles?

**Aprobación de perfil:**
- Tras el onboarding, el perfil queda en estado "pendiente de aprobación".
- El fundador revisa y aprueba manualmente (criterio: foto real de persona, nombre real, teléfono verificado, descripción coherente con el producto).
- Meta de tiempo de aprobación: menos de 24 horas.
- Al ser aprobado, el usuario recibe una notificación push de bienvenida + email con acceso completo.
- Hasta ser aprobado, puede navegar y ver planes pero no puede inscribirse ni crear.

**Criterios de rechazo de perfil:**
- Foto que no muestra una cara real (logos, dibujos, fotos de objetos, imágenes claramente falsas)
- Nombre claramente ficticio o nickname
- Teléfono no verificado
- Perfil que genera dudas razonables sobre identidad o intención

### 7.2 Descubrimiento de planes

**Filtros disponibles:**
- Zona (barrio o radio en km)
- Categoría de actividad
- Día de la semana
- Tamaño del grupo (hasta 6 / hasta 12 / más de 12)
- Gratuito o pago

**Vista de plan (card):**
- Foto del plan (generada por IA o subida por el creador)
- Nombre de la actividad
- Quién lo propone (nombre + foto + cantidad de planes anteriores + rating)
- Descripción breve (máximo 200 caracteres)
- Zona
- Fecha y hora
- Cupos totales y cupos disponibles
- Perfiles mínimos de quiénes ya confirmaron (nombre e intereses)
- Indicador si es gratuito o pago
- Botón: "Me sumo"

**Regla de negocio clave:** Si un plan tiene 0 inscriptos además del creador, se muestra igual con la etiqueta "Sé el primero en sumarte". No se ocultan planes vacíos en MVP.

**Ordenamiento por defecto:** Primero los planes con fecha más próxima y cupos disponibles. Los planes con cupo completo se muestran al final con etiqueta "Completo".

### 7.3 Inscripción a un plan

**Pasos:**
1. Usuario toca "Me sumo"
2. Ve resumen del plan y lista de participantes actuales
3. Si el plan es pago, ve la descripción de cómo se coordina el pago
4. Confirma con un toque
5. Recibe notificación push de confirmación con detalles del encuentro
6. Si el plan ya tiene otro confirmado, accede inmediatamente al chat grupal

**Restricciones:**
- Un usuario puede cancelar su inscripción hasta 24 horas antes del plan
- Si cancela con menos de 24 horas, queda registrado como "no-show" (afecta reputación)
- Máximo 3 no-shows antes de restricción temporal de inscripción (revisable por el fundador en MVP)
- El creador del plan recibe una notificación push cada vez que alguien se suma o cancela

### 7.4 Creación de un plan

**Campos del formulario:**
- Nombre del plan (ej: "Fútbol 5 en Punta Mogotes", "Cena italiana en casa", "Caminata por la costa")
- Categoría (deporte / gastronomía / música / arte / naturaleza / idiomas / juegos / cine / otro)
- Descripción libre (máx 200 caracteres)
- Zona / punto de referencia (no dirección exacta — se revela solo a los confirmados)
- Fecha y hora
- Cupo máximo (mínimo 3 incluyendo el creador, máximo 20 en MVP)
- Gratuito o pago
  - Si es pago: monto aproximado y cómo se coordina (ej: "Se paga en el lugar", "Transferencia previa", "Dividimos lo que salga")
- Preferencia de género del grupo: mixto / solo mujeres / sin preferencia
- Foto del plan (ver sección 7.5)

**Lógica de publicación:**
- El plan se publica automáticamente si el perfil está aprobado. Sin moderación adicional del contenido del plan en MVP.
- El sistema aplica un filtro de texto sobre el nombre y descripción antes de publicar (ver sección 7.9).
- El creador puede editar el plan hasta 24 horas antes del evento.
- El creador puede cancelar el plan hasta 24 horas antes. Si cancela, todos los inscriptos reciben notificación push + email.
- Si el creador cancela con menos de 24 horas, queda registrado como "cancelación tardía" (afecta su reputación).

**Límites de creación:**
- Plan Free: hasta 2 planes activos por mes
- Plan Premium: planes ilimitados

### 7.5 Foto del plan — IA o propia

Al crear un plan, el creador elige entre dos opciones:

**Opción A — Generar con IA:**
- La app genera automáticamente una imagen representativa basada en la categoría y descripción del plan.
- Tecnología: integración con API de generación de imágenes (DALL-E, Stable Diffusion via API, Replicate u otra).
- Plan Free: 1 generación por plan (sin reintentos).
- Plan Premium: hasta 3 regeneraciones por plan.
- Las imágenes generadas son ilustrativas — no representan personas reales.

**Opción B — Subir foto propia:**
- El creador sube una foto desde su cámara o galería.
- Restricciones: formato JPG/PNG, peso máximo 5MB, ratio mínimo 4:3.
- La foto pasa por un filtro automático de moderación (Google Vision SafeSearch, AWS Rekognition u otra API) antes de publicarse.
- Si el filtro detecta contenido inapropiado, la foto es rechazada automáticamente y el creador debe subir otra o usar la IA.

**Regla de negocio:** Si el creador no elige ninguna opción, la app genera automáticamente la imagen con IA al publicar. Ningún plan se publica sin imagen.

**Galería post-evento:** Los participantes pueden subir fotos del encuentro al plan durante las 48 horas posteriores al evento. Estas fotos son visibles solo para los confirmados del plan. Aplica el mismo filtro de moderación.

### 7.6 Chat grupal del plan

**Activación:**
- El chat se crea automáticamente cuando el plan tiene al menos 2 confirmados (creador + 1 participante).
- Antes de ese momento, el creador ve un indicador: "Esperando al primer participante para activar el chat".

**Funcionamiento:**
- Chat de grupo cerrado: solo acceden los usuarios en la lista de confirmados del plan.
- Si un usuario cancela su inscripción, pierde acceso al chat inmediatamente.
- Si un nuevo usuario se suma, entra al chat y puede ver el historial desde el inicio.
- El creador del plan es el administrador del chat: puede reportar mensajes inapropiados con un botón de reporte.

**Contenido permitido:**
- Texto libre para coordinar el encuentro.
- Fotos desde cámara o galería (mismo filtro de moderación que la foto del plan).
- No se permiten links externos en MVP (reduce riesgo de spam y phishing).

**Cierre del chat:**
- El chat se cierra automáticamente 24 horas después de la fecha del plan.
- Se envía una notificación push 1 hora antes del cierre.
- Después del cierre, los mensajes no son accesibles para ningún participante.

**Notificaciones del chat:**
- Notificación push por cada mensaje nuevo (configurable por el usuario: activar/silenciar por plan).

**Límites técnicos MVP:**
- Sin edición ni eliminación de mensajes propios.
- Sin mensajes de voz ni archivos adjuntos (solo texto y fotos).
- Historial disponible solo durante la vida activa del chat.

### 7.7 Perfil del usuario

**Campos públicos** (visibles para otros participantes del mismo plan):
- Nombre y foto
- Ciudad
- Hasta 3 intereses
- Cantidad de planes asistidos
- Cantidad de planes creados
- Rating como participante
- Rating como creador de planes

**Campos privados** (solo visible para el usuario):
- Email y teléfono
- Historial de planes (asistidos y creados)
- Estado de cuenta (free o premium)

**Reputación dual:** Dos indicadores separados — uno como participante y uno como creador. Permite confiar en alguien como buen participante aunque no haya creado planes, y viceversa.

### 7.8 Sistema de reviews post-plan

**Al finalizar un plan:**
- El creador puede calificar al grupo en general (1 a 5 estrellas) — no califica individualmente.
- Cada participante puede calificar el plan y al creador (1 a 5 estrellas + comentario opcional de máx 150 caracteres).
- Las reviews de planes son públicas y visibles en el perfil del creador.
- Las reviews del grupo son privadas para el creador.

**Ventana para dejar review:** 48 horas después de la fecha del plan. Después se cierra automáticamente.

**Protección contra reviews falsas:** Solo pueden dejar review quienes están en la lista de confirmados del plan.

### 7.9 Seguridad, confianza y moderación de riesgo

#### Mecanismos de confianza base

- Aprobación manual de perfiles por el fundador antes de poder actuar en la app
- Sign in with Apple + verificación de teléfono por SMS — doble capa de identidad
- Foto de perfil real obligatoria
- Sistema de no-shows con consecuencias para participantes
- Sistema de cancelación tardía con consecuencias para creadores
- Reviews públicas del creador del plan
- Todos los encuentros son grupales (mínimo 3 personas incluyendo el creador)
- Filtro de género disponible en la creación del plan
- La dirección exacta del punto de encuentro solo se revela a los inscriptos confirmados
- Filtro automático de imágenes (foto de plan, fotos en chat y galería post-evento) para contenido explícito

#### Protocolo de seguridad ante planes de riesgo

People Conecta opera con un principio claro: **la plataforma es responsable de lo que habilita**. Un plan creado aquí que derive en un abuso, una situación violenta o contenido de explotación sexual es un fallo del producto, no solo del usuario. Este protocolo existe para minimizar ese riesgo desde el diseño.

**Categorías de riesgo identificadas:**

| Categoría | Descripción | Señales de alerta |
|-----------|-------------|-------------------|
| **Violencia física** | Planes que deriven en agresión entre participantes o hacia terceros | Lenguaje agresivo o intimidatorio en descripción o chat; historial de cancelaciones abruptas; denuncias previas |
| **Abuso y acoso** | Hostigamiento, acoso o coerción dentro del grupo | Planes 1 a 1 disfrazados de grupales; creador que presiona por datos privados fuera de la app; reportes de participantes |
| **Contenido sexual explícito / explotación** | Planes con intención sexual encubierta o explícita, o que involucren menores | Descripción con lenguaje sugestivo; categorías incoherentes con la descripción; perfil nuevo que propone planes de cupo mínimo dirigidos a personas muy jóvenes |

**Filtro de texto al publicar un plan:**

El sistema aplica un filtro de palabras y frases clave sobre el nombre y descripción del plan en el momento de publicación. Si se detectan términos asociados a las categorías de riesgo:
- El plan **no se publica automáticamente**.
- Se envía una alerta al fundador para revisión manual antes de habilitarlo.
- El creador recibe un mensaje: "Tu plan está siendo revisado. Te avisamos pronto."

En MVP, la lista de términos se gestiona manualmente por el fundador. En versiones futuras se reemplaza por un clasificador de lenguaje con ML.

**Mecanismo de reporte:**
- Cualquier usuario puede reportar un plan o un mensaje del chat con un botón de reporte visible en todo momento.
- El reporte llega al fundador en tiempo real (notificación push + email).
- El fundador puede: pausar el plan (ocultar del descubrimiento), cancelarlo forzosamente, suspender al creador o al participante.
- Meta de tiempo de respuesta a reportes en MVP: menos de 2 horas en horario activo.

**Consecuencias ante violaciones:**

| Gravedad | Acción |
|----------|--------|
| Leve — lenguaje inapropiado en chat | Advertencia al usuario + eliminación del mensaje |
| Moderada — plan con descripción engañosa o sugestiva | Cancelación del plan + advertencia formal al creador |
| Grave — abuso, violencia, contenido sexual explícito | Suspensión permanente de la cuenta + reporte a las autoridades si corresponde |

**Política de cero tolerancia:**

People Conecta tiene política de cero tolerancia ante:
- Cualquier forma de abuso sexual o acoso
- Contenido sexual explícito en chat, imágenes o descripción del plan
- Violencia física o amenazas
- Cualquier plan que involucre o exponga a menores de edad

Las cuentas involucradas en estas situaciones son suspendidas de forma permanente e irrevocable, sin apelación en MVP.

**Comunicación a usuarios:**
Estas reglas se presentan de forma clara en el onboarding y en los Términos de Uso. El usuario confirma haberlas leído antes de completar el registro. La política de moderación es pública y accesible desde la app.

---

## 8. Modelo de Monetización

### 8.1 Principio general

La monetización no debe interferir con la experiencia central. El valor free debe ser suficiente para que el usuario descubra, se una a su primer plan y lo pase bien. El valor premium debe ser genuinamente mejor, no una barrera artificial.

### 8.2 Plan Free

- Acceso completo al descubrimiento de planes
- Inscripción a hasta 2 planes por mes
- Creación de hasta 2 planes activos por mes
- Foto del plan: 1 generación con IA por plan (sin reintentos) o foto propia
- Acceso al chat grupal de cada plan en el que participa
- Reviews de planes asistidos y creados

### 8.3 Plan Premium — "Conecta Plus"

**Precio sugerido para MVP:** ARS 4.900/mes (revisable según feedback del mercado)

**Beneficios:**
- Inscripciones ilimitadas a planes
- Creación de planes ilimitados
- Prioridad en planes con cupo limitado (reserva el cupo 24 horas antes que usuarios free)
- Foto del plan: hasta 3 regeneraciones con IA por plan
- Filtros avanzados de búsqueda (por intereses de otros participantes, tamaño exacto del grupo)
- Insignia "Verificado Plus" visible en el perfil
- Acceso anticipado a planes nuevos antes de que sean públicos
- Historial completo de planes asistidos y creados con estadísticas personales

### 8.4 Estrategia de monetización en MVP

- Los primeros 90 días: todos los usuarios tienen acceso completo gratis para tracción inicial.
- Meta de conversión a premium: 5% en los primeros 6 meses.
- Las suscripciones premium se gestionan vía **In-App Purchase de Apple** (obligatorio para apps en App Store que ofrezcan suscripciones).
- Los planes pagos entre usuarios se coordinan fuera de la plataforma.

> **Nota sobre In-App Purchase:** Apple cobra una comisión del 15–30% sobre las suscripciones procesadas por su plataforma. Esto debe considerarse en la estructura de precios: ARS 4.900 neto implica un precio de lista mayor.

---

## 9. Métricas de Éxito del MVP

### 9.1 Métricas de producto (primeros 90 días)

| Métrica | Definición | Meta MVP |
|---------|------------|----------|
| Activación | Usuario aprobado que ve al menos 1 plan disponible | 90% de aprobados |
| Momento mágico | Usuario que se suma a su primer plan | 40% de usuarios activados |
| Retención D30 | Usuario que asiste a al menos 1 plan en su primer mes | 25% |
| NPS post-plan | Puntuación de recomendación luego de asistir | >50 |
| Tasa de asistencia | Inscriptos que efectivamente asisten | >70% |
| Activación de chat | Planes que activan chat grupal (≥2 confirmados) | >60% de planes publicados |
| Planes creados | Planes publicados por semana por usuarios (no por el equipo) | 10 en mes 2 |

### 9.2 Métricas de oferta (generada por la comunidad)

| Métrica | Meta MVP (mes 3) |
|---------|-----------------|
| Usuarios aprobados activos | 150 |
| Planes publicados por semana | 15 |
| Planes con cupo completo | >30% |
| Usuarios que han creado al menos 1 plan | 30% de la base activa |

### 9.3 Métricas de seguridad

| Métrica | Meta MVP |
|---------|----------|
| Tiempo de respuesta a reportes | <2 horas en horario activo |
| Planes suspendidos o cancelados por moderación | <2% del total publicado |
| Cuentas suspendidas por violaciones graves | Acción en <1 hora — cero tolerancia |

### 9.4 Métricas de monetización

| Métrica | Meta MVP (mes 6) |
|---------|-----------------|
| Usuarios Premium activos | 50 |
| MRR (ingreso mensual recurrente, neto de comisión Apple) | ARS 175.000 |

---

## 10. Supuestos y Riesgos

### 10.1 Supuestos críticos

1. Con un proceso de aprobación simple, los usuarios están dispuestos a crear planes y no solo consumirlos.
2. La comunidad genera suficiente oferta de planes sin necesidad de organizadores institucionales externos.
3. El grupo pequeño (3 a 6 personas) sigue siendo el formato que reduce la barrera de entrada.
4. La verificación por teléfono + aprobación manual de perfil es suficiente para generar confianza básica en MVP.
5. El chat grupal acotado al plan reduce la fricción de coordinación sin convertir la app en una red social de mensajería.
6. La foto generada por IA mejora la percepción visual del plan y aumenta la tasa de inscripción.

### 10.2 Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Pocos usuarios crean planes — solo consumen | Alta | Alto | Seed de planes iniciales + grupo beta de 10 "super usuarios" antes del lanzamiento público |
| Creadores con baja tasa de asistencia | Media | Alto | Sistema de rating dual + penalización por cancelación tardía |
| Planes pagos generan conflictos o desconfianza | Media | Medio | Comunicación clara: "El pago se coordina entre los participantes, People Conecta no intermedia" |
| Plataforma percibida como "app de citas" | Media | Medio | Diseño, copy y comunicación explícita: "No hay citas, hay planes. Primero grupos, después amistad." |
| Baja masa crítica de planes en el lanzamiento | Alta | Alto | Fase 0 con 20 usuarios beta comprometidos a crear al menos 2 planes cada uno en el primer mes |
| Plan que derive en situación de abuso o violencia | Baja | Crítico | Filtro de texto al publicar + botón de reporte + respuesta en <2 horas + suspensión permanente |
| Rechazo de la app por Apple App Store Review | Media | Alto | Cumplir App Store Guidelines desde el diseño: moderación de contenido, Sign in with Apple, In-App Purchase, política de privacidad visible |
| Chat usado como canal de acoso entre participantes | Media | Alto | Solo chats grupales (sin DMs), acceso revocado al cancelar, botón de reporte visible en todo momento |
| Baja conversión a premium | Alta | Medio | Validar precio y beneficios con primeros usuarios antes de mes 3 |
| Costo de generación de imágenes IA escala con volumen | Media | Medio | Límite de regeneraciones en plan free (1 intento), caché de imágenes por categoría para planes similares |

---

## 11. Estrategia de Lanzamiento

### 11.1 Fase 0 — Pre-lanzamiento (semanas 1 a 4)

**Objetivo:** Masa crítica de planes reales antes de abrir al público. App lista para App Store Review.

- Reclutar manualmente 20 usuarios beta comprometidos en Mar del Plata / Chapadmalal.
- Cada beta crea al menos 2 planes en las primeras 2 semanas.
- Validar flujo completo: registro → aprobación → creación → foto IA → inscripción → chat → asistencia → review.
- Categorías prioritarias: deportes, gastronomía, música y naturaleza.
- Someter la app a App Store Review (planificar 1–7 días de revisión).
- Meta al final de Fase 0: 30 planes publicados, al menos 5 con cupo completo, app aprobada en App Store.

### 11.2 Fase 1 — Lanzamiento cerrado (semanas 5 a 8)

**Objetivo:** Primer ciclo completo de plan → asistencia → review → nuevo plan.

- Apertura por invitación (código de invitación o formulario).
- Meta: 200 usuarios registrados y aprobados, 20 planes activos por semana.
- Contacto directo con cada usuario para entender su experiencia.
- Iteración rápida de UX basada en feedback.

### 11.3 Fase 2 — Apertura y monetización (semanas 9 a 16)

**Objetivo:** Validar la conversión a premium y la autosuficiencia de la oferta.

- Apertura pública en App Store sin código de invitación.
- Activación del plan Conecta Plus con In-App Purchase.
- Meta: 500 usuarios registrados, 50 premium activos.
- Evaluación de apertura de segunda ciudad según métricas de Fase 1.

---

## 12. Dependencias y Restricciones

### 12.1 Técnicas

- **Apple Developer Program:** USD 99/año — requerido para distribuir en App Store.
- **Sign in with Apple:** obligatorio para apps iOS que ofrezcan login social.
- **In-App Purchase:** obligatorio para suscripciones dentro de la app en App Store (comisión Apple 15–30%).
- **Verificación por SMS:** Twilio o equivalente local.
- **Generación de imágenes IA:** API de generación de imágenes (DALL-E, Replicate, Stable Diffusion API u otra). Costo variable por imagen — monitorear desde el inicio.
- **Moderación de imágenes:** API de clasificación de contenido (Google Vision SafeSearch, AWS Rekognition u otra). Se aplica a todas las imágenes subidas o generadas.
- **Chat en tiempo real:** WebSockets o solución gestionada (Firebase Realtime Database, Supabase Realtime, Ably, Pusher). Evaluar costo a escala antes de elegir proveedor.
- **Notificaciones push:** APNs (Apple Push Notification service) — sin costo adicional para iOS.
- **Emails transaccionales** operativos desde el primer registro: confirmación de registro, aprobación de perfil, confirmación de inscripción, recordatorio 24h antes del plan, solicitud de review (48h después), notificación de cancelación, alerta de reporte al fundador.

### 12.2 Operativas

- El fundador actúa como moderador y soporte en MVP.
- Aprobación de perfiles: manual, meta < 24 horas.
- Respuesta a reportes de seguridad: manual, meta < 2 horas en horario activo.
- Adquisición de usuarios: manual en MVP (comunidades locales, redes sociales, boca a boca).

### 12.3 Legales y compliance

- Términos de Uso y Política de Privacidad visibles antes del registro (requerido por App Store).
- Política de moderación y protocolo de seguridad comunicados en el onboarding.
- Cumplimiento con Ley 25.326 de protección de datos personales (Argentina) y GDPR si hay usuarios europeos.

---

## 13. Fuera de Scope — Versiones Futuras

- Mensajes directos 1 a 1 entre usuarios
- Sistema de matching por compatibilidad de intereses
- Mapa interactivo de planes
- Integración con calendarios externos (Google Calendar, etc.)
- App Android
- Expansión automática a nuevas ciudades
- Sistema de pagos integrado para planes pagos entre usuarios
- Panel de analytics para creadores de planes
- Programa de referidos
- Planes recurrentes (ej: "todos los martes")
- Verificación de identidad con documento
- Clasificador de riesgo con ML (reemplaza lista de palabras clave del MVP)
- Edición o eliminación de mensajes propios en el chat
- Mensajes de voz o archivos adjuntos en el chat

---

## 14. Glosario

| Término | Definición |
|---------|------------|
| Usuario aprobado | Persona cuyo perfil fue revisado y aprobado por el fundador — puede crear y unirse a planes |
| Creador del plan | Usuario aprobado que propone una actividad con fecha, zona y cupo |
| Participante | Usuario aprobado que se inscribe al plan de otro |
| Plan | Actividad presencial propuesta por un usuario, con fecha, hora, zona, cupo y condiciones definidas |
| Chat del plan | Grupo de mensajería cerrado, activo cuando el plan tiene ≥2 confirmados, que se cierra 24h después del evento |
| Foto del plan | Imagen de portada del plan — generada por IA o subida por el creador |
| Galería post-evento | Fotos del encuentro subidas por los participantes, disponibles 48h después del plan |
| No-show | Participante inscripto que no asistió sin cancelar a tiempo |
| Cancelación tardía | Creador o participante que cancela con menos de 24 horas de anticipación |
| Momento mágico | Primera inscripción completada por un usuario |
| Reputación dual | Sistema de rating separado para el usuario como participante y como creador de planes |
| Gateway | La app como punto de entrada hacia la vida social presencial, no como destino final |
| Sede | Ciudad o región donde el fundador opera activamente la moderación y adquisición del MVP |
| Filtro de texto | Sistema de detección de términos de riesgo aplicado al nombre y descripción de cada plan antes de publicarse |

---

*Documento vivo. Se actualiza con cada iteración del producto basada en evidencia de usuarios reales.*
*v3.0 — Mayo 2026 — App nativa iOS. Multi-ciudad desde el inicio. Chat grupal por plan. Foto de plan con IA. Protocolo de seguridad ante planes de riesgo.*
