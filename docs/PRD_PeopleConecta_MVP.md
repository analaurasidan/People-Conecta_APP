# PRD — People Conecta MVP
**Versión:** 1.0  
**Fecha:** Mayo 2026  
**Autor:** Fundador  
**Estado:** Draft inicial  

---

## 1. Visión del Producto

People Conecta es una plataforma que conecta a personas entre 18 y 35 años que se sienten socialmente aisladas con actividades y grupos presenciales reales ya existentes en su ciudad. No es una red social. No genera contenido. Es un **gateway hacia la vida social presencial** de Mar del Plata.

El producto resuelve un problema concreto: quien llega nuevo a una ciudad, cambia de etapa de vida o reconstruye su red social no sabe dónde ni cómo entrar al tejido social que ya existe. People Conecta hace visible esa infraestructura humana invisible.

**Principio rector del MVP:** El móvil es el gateway, no el destino. El usuario entra a la app para salir a la calle.

---

## 2. Problema

### 2.1 Problema del usuario final
- Jóvenes de 18 a 35 años en Mar del Plata que no tienen red social activa por mudanza, cambio de trabajo, ruptura u otra transición de vida.
- No saben dónde ni cómo acceder a grupos y actividades donde conocer gente de forma natural.
- La vergüenza de llegar solo a un espacio nuevo es el principal freno, no la falta de ganas.

### 2.2 Problema del organizador
- Clubes, espacios culturales, centros deportivos y grupos de actividades tienen poca visibilidad digital orientada a atraer personas nuevas.
- No tienen una herramienta simple para publicar sus eventos y recibir interesados verificados.

### 2.3 Lo que no existe hoy
No hay un punto de entrada único, local y orientado a quien recién llega, que conecte la demanda de vínculos presenciales con la oferta de actividades y grupos reales ya operando en la ciudad.

---

## 3. Usuarios

### 3.1 Usuario primario — El que busca conectar

**Perfil:** Persona de 18 a 35 años, viviendo en Mar del Plata, con red social débil o en reconstrucción.

**Segmentos prioritarios:**

| Segmento | Situación | Urgencia |
|----------|-----------|----------|
| Recién llegado | Mudanza por estudio o trabajo | Alta |
| En transición | Separación, cambio de trabajo, nueva etapa | Alta |
| Digitalmente saturado | Tiene vínculos online pero quiere presenciales | Media |

**Momento de mayor intención de uso:** Los primeros 30 días después de la mudanza o el cambio de vida. En ese período el usuario está en modo búsqueda activa y tiene alta apertura emocional al cambio.

**Frenos principales:**
1. Vergüenza e inseguridad social ante lo desconocido
2. No saber dónde hay grupos reales y cuándo se reúnen
3. Miedo al encuentro 1 a 1 con desconocidos
4. Sensación de que "necesitar una app para hacer amigos" es una falla personal

### 3.2 Usuario secundario — El organizador

**Perfil:** Persona o entidad que gestiona un espacio, club, grupo o actividad en Mar del Plata y quiere atraer nuevos participantes.

**Tipos:**
- Clubes deportivos y de hobbies
- Espacios culturales y centros comunitarios
- Organizadores independientes de actividades grupales
- Grupos de idiomas, senderismo, cocina, música, etc.

**Motivación:** Conseguir participantes nuevos y comprometidos sin esfuerzo de marketing.

---

## 4. Propuesta de Valor

### Para quien busca conectar
> "En menos de 3 clics, encontrás un grupo real haciendo algo que te gusta, cerca de donde vivís, esta semana."

- Sin perfil extenso. Sin chat eterno. Sin citas de amistad.
- Primero la actividad, después las personas.
- Grupos pequeños (3 a 6 personas) para reducir el riesgo percibido.

### Para el organizador
> "Publicá tu actividad y recibí personas verificadas e interesadas, sin esfuerzo."

- Visibilidad ante un público que activamente busca participar.
- Panel simple para gestionar eventos y cupos.
- Reputación acumulada que atrae mejores participantes.

---

## 5. Alcance del MVP

### 5.1 Qué incluye el MVP

El MVP tiene tres flujos principales:

**Flujo 1 — Descubrimiento de actividades**
- El usuario indica zona, intereses y días disponibles.
- Ve una lista de eventos y grupos reales próximos.
- Cada evento muestra: nombre de actividad, organizador, zona, fecha, cantidad de cupos y cuántas personas ya confirmaron.

**Flujo 2 — Inscripción a un evento**
- El usuario marca interés en un evento.
- Completa un perfil mínimo: nombre, foto y hasta 3 intereses.
- Recibe confirmación con información del punto de encuentro.
- Puede ver quiénes más van (nombre e intereses, no datos de contacto).

**Flujo 3 — Publicación de evento por organizador**
- El organizador crea una cuenta verificada.
- Publica un evento con: nombre, descripción, zona, fecha, hora, capacidad máxima y si es gratuito o pago.
- Gestiona inscripciones desde un panel simple.
- Recibe reviews de los participantes al finalizar el evento.

### 5.2 Qué NO incluye el MVP

- Chat en tiempo real entre usuarios
- Feed de contenido o publicaciones
- Matching 1 a 1 entre personas
- Integración con redes sociales externas
- Notificaciones push avanzadas (solo email en MVP)
- Mapa interactivo (lista con zona es suficiente)
- Sistema de pagos integrado (los eventos pagos se gestionan fuera de la plataforma en MVP)

---

## 6. Funcionalidades del MVP

### 6.1 Registro y onboarding del usuario

**Registro:**
- Email + contraseña o autenticación con Google
- Verificación de número de teléfono (SMS) — obligatoria para participar en eventos
- Nombre real y foto de perfil — obligatorios

**Onboarding (máximo 3 pasos):**
1. ¿Por qué estás acá? (opciones: llegué nuevo a la ciudad / cambié de etapa / quiero salir más / otra)
2. ¿Qué te interesa hacer? (selección múltiple: deporte, música, cocina, idiomas, cine, naturaleza, arte, juegos, otro)
3. ¿En qué zona vivís y qué días tenés disponibles?

El onboarding determina qué eventos se muestran primero. No es un perfil público completo.

### 6.2 Descubrimiento de eventos

**Filtros disponibles:**
- Zona (barrio o radio en km)
- Categoría de actividad
- Día de la semana
- Tamaño del grupo (hasta 6 / hasta 12 / más de 12)
- Gratuito o pago

**Vista de evento:**
- Nombre de la actividad
- Organizador (nombre + reputación en estrellas)
- Descripción breve (máximo 200 caracteres)
- Zona
- Fecha y hora
- Cupos totales y cupos disponibles
- Perfiles mínimos de quiénes ya confirmaron (nombre e intereses)
- Botón: "Me anoto"

**Regla de negocio clave:** Si un evento tiene 0 inscriptos, el usuario lo ve igual pero con la etiqueta "Sé el primero en anotarte". No se ocultan eventos vacíos en MVP.

### 6.3 Inscripción a evento

**Pasos:**
1. Usuario toca "Me anoto"
2. Ve resumen del evento y lista de participantes actuales
3. Confirma con un toque
4. Recibe email de confirmación con detalles del encuentro

**Restricciones:**
- Un usuario puede cancelar su inscripción hasta 24 horas antes del evento
- Si cancela con menos de 24 horas, queda registrado como "no-show" (afecta reputación)
- Máximo 3 no-shows antes de restricción de inscripción (revisable por el fundador en MVP)

### 6.4 Perfil del usuario

**Campos públicos (visibles para otros participantes del mismo evento):**
- Nombre y foto
- Hasta 3 intereses
- Cantidad de eventos asistidos
- Rating promedio recibido de organizadores

**Campos privados (solo visible para el usuario):**
- Email y teléfono
- Historial de eventos
- Estado de cuenta (free o premium)

### 6.5 Sistema de reviews post-evento

**Al finalizar un evento:**
- Organizador puede calificar al grupo en general (1 a 5 estrellas) — no califica individualmente
- Cada participante puede calificar al organizador (1 a 5 estrellas + comentario opcional)
- Las reviews de organizadores son públicas. Las del grupo son privadas para el organizador.

**Ventana para dejar review:** 48 horas después de la fecha del evento. Después se cierra.

### 6.6 Panel del organizador

**Funcionalidades:**
- Crear, editar y cancelar eventos
- Ver lista de inscriptos con nombre, foto e intereses
- Marcar asistencia post-evento (quiénes vinieron y quiénes no)
- Ver historial de eventos y métricas básicas: inscriptos promedio, tasa de asistencia, rating promedio
- Gestionar su perfil público de organizador

**Verificación del organizador:**
- Email verificado
- Teléfono verificado
- Descripción del espacio o grupo que organiza
- En MVP: verificación manual por el fundador antes de publicar el primer evento

### 6.7 Seguridad y confianza

**Mecanismos incluidos en MVP:**
- Teléfono verificado obligatorio para inscribirse a eventos
- Foto de perfil obligatoria
- Sistema de no-shows con consecuencias
- Reviews públicas de organizadores
- Todos los encuentros son grupales (mínimo 3 personas incluyendo el organizador)
- Filtro: el usuario puede indicar preferencia por grupos mixtos o solo de su género

**Mecanismos excluidos del MVP (para versiones futuras):**
- Verificación de identidad con documento
- Reportes entre usuarios
- Moderación de contenido automatizada

---

## 7. Modelo de Monetización

### 7.1 Principio general

La monetización no debe interferir con la experiencia central del usuario. El valor free debe ser suficiente para que el usuario descubra y asista a su primer evento. El valor premium debe ser genuinamente mejor, no una barrera artificial.

### 7.2 Plan Free

- Acceso completo al descubrimiento de eventos
- Inscripción a hasta 2 eventos por mes
- Perfil básico (nombre, foto, intereses)
- Reviews de eventos asistidos

### 7.3 Plan Premium — "Conecta Plus"

**Precio sugerido para MVP:** ARS 4.900/mes (revisable según feedback del mercado)

**Beneficios:**
- Inscripciones ilimitadas a eventos
- Prioridad en eventos con cupo limitado (reserva el cupo 24 horas antes que usuarios free)
- Filtros avanzados de búsqueda (compatibilidad por intereses, tamaño exacto del grupo)
- Insignia "Verificado Plus" visible en el perfil (genera confianza en otros participantes)
- Acceso anticipado a eventos nuevos antes de que sean públicos
- Historial completo de asistencias y estadísticas personales

### 7.4 Plan Organizador — "Organizador Pro"

**Precio sugerido para MVP:** ARS 9.900/mes

**Incluye:**
- Publicación de eventos ilimitados (free permite hasta 2 por mes)
- Panel de métricas avanzadas (tasa de retorno de participantes, comparativa de eventos)
- Destacado en la lista de descubrimiento (aparece primero en su categoría)
- Acceso a datos agregados de su audiencia (intereses y zonas más frecuentes)
- Soporte prioritario del fundador

### 7.5 Estrategia de monetización en MVP

- Los primeros 90 días: todos los organizadores son gratuitos para tracción de oferta
- Meta de conversión a premium (usuarios): 5% en los primeros 6 meses
- Meta de conversión a Organizador Pro: 30% de organizadores activos al mes 3
- No hay sistema de pagos integrado en MVP: los pagos se procesan por Mercado Pago con link externo

---

## 8. Métricas de Éxito del MVP

### 8.1 Métricas de producto (primeros 90 días)

| Métrica | Definición | Meta MVP |
|---------|------------|----------|
| Activación | Usuario que completa onboarding y ve al menos 1 evento | 80% de registros |
| Momento mágico | Usuario que se inscribe a su primer evento | 40% de usuarios activados |
| Retención D30 | Usuario que asiste a al menos 1 evento en su primer mes | 25% |
| NPS post-evento | Puntuación de recomendación luego de asistir a un evento | >50 |
| Tasa de asistencia | Inscriptos que efectivamente asisten | >70% |

### 8.2 Métricas de oferta

| Métrica | Meta MVP (mes 3) |
|---------|-----------------|
| Organizadores verificados activos | 15 |
| Eventos publicados por semana | 10 |
| Eventos con cupo completo | >30% |

### 8.3 Métricas de monetización

| Métrica | Meta MVP (mes 6) |
|---------|-----------------|
| Usuarios Premium activos | 50 |
| Organizadores Pro activos | 5 |
| MRR (ingreso mensual recurrente) | ARS 300.000 |

---

## 9. Supuestos y Riesgos

### 9.1 Supuestos críticos

1. Hay suficientes organizadores dispuestos a publicar en una plataforma nueva si el proceso es simple.
2. Los usuarios de 18 a 35 en Mar del Plata están dispuestos a pagar por acceso prioritario a eventos sociales.
3. El tamaño del grupo reducido (3 a 6 personas) es efectivamente el formato que reduce la barrera de entrada.
4. La verificación por teléfono es suficiente para generar confianza básica en el MVP.

### 9.2 Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Problema del huevo y la gallina: pocos eventos = pocos usuarios | Alta | Alto | Lanzar con 15 organizadores comprometidos antes de abrir al público general |
| Usuarios se inscriben pero no asisten | Media | Alto | Sistema de no-shows + recordatorio por email 24h antes |
| Los organizadores no mantienen cadencia | Media | Alto | Contacto directo del fundador con cada organizador en MVP |
| Plataforma percibida como "app de citas" | Media | Medio | Comunicación explícita: "No hay citas, hay planes. Primero grupos, después amistad." |
| Baja conversión a premium | Alta | Medio | Validar precio y beneficios con primeros usuarios antes de mes 3 |

---

## 10. Estrategia de Lanzamiento

### 10.1 Fase 0 — Pre-lanzamiento (semanas 1 a 4)

**Objetivo:** Tener oferta real antes de tener demanda.

- Identificar y contactar manualmente 20 organizadores potenciales en Mar del Plata.
- Onboardear mínimo 15 organizadores activos con al menos 1 evento publicado cada uno.
- Validar el flujo completo de inscripción con un grupo cerrado de 20 usuarios beta.
- Categorías prioritarias para iniciar: deportes, idiomas, música y cocina.

### 10.2 Fase 1 — Lanzamiento cerrado (semanas 5 a 8)

**Objetivo:** Conseguir el primer evento con cupo completo.

- Apertura por invitación con lista de espera.
- Meta: 200 usuarios registrados, 10 eventos con al menos 4 inscriptos.
- Contacto directo con cada usuario para entender su experiencia.
- Iteración rápida de UX basada en feedback.

### 10.3 Fase 2 — Apertura y monetización (semanas 9 a 16)

**Objetivo:** Validar la conversión a premium.

- Apertura pública con registro libre.
- Activación del plan Premium con los primeros usuarios que demuestren recurrencia.
- Meta: 500 usuarios registrados, 50 premium, 5 organizadores Pro.

---

## 11. Dependencias y Restricciones

### 11.1 Técnicas

- La plataforma debe funcionar como web app responsive en mobile y desktop desde el día 1.
- El sistema de emails transaccionales debe estar operativo desde el primer registro (confirmaciones, recordatorios, reviews).
- La verificación por SMS requiere integración con un proveedor externo (ej: Twilio o equivalente local).
- El sistema de pagos Premium en MVP se procesa con Mercado Pago fuera de la plataforma, con activación manual de cuentas premium.

### 11.2 Operativas

- El fundador actúa como moderador y soporte en MVP (no hay equipo de soporte externo).
- La verificación de organizadores es manual en MVP: el fundador aprueba cada cuenta antes de que publique.
- No hay automatización de marketing en MVP: la adquisición de usuarios es manual (comunidades locales, redes sociales, boca a boca).

---

## 12. Fuera de Scope — Versiones Futuras

Las siguientes funcionalidades están identificadas pero explícitamente fuera del MVP:

- Chat entre participantes de un evento (aparece post MVP si el NPS lo justifica)
- Sistema de matching por compatibilidad de intereses
- Mapa interactivo de eventos
- Integración con calendarios externos (Google Calendar, etc.)
- Notificaciones push
- App nativa iOS y Android (MVP es web app)
- Expansión a otras ciudades
- Sistema de pagos integrado para eventos pagos
- Panel de analytics para organizadores avanzado
- Programa de referidos

---

## 13. Glosario

| Término | Definición |
|---------|------------|
| Organizador | Usuario que crea y gestiona eventos en la plataforma |
| Participante | Usuario que se inscribe y asiste a eventos |
| Evento | Actividad presencial con fecha, hora, lugar y cupo definido |
| No-show | Participante inscripto que no asistió sin cancelar a tiempo |
| Momento mágico | Primera inscripción completada por un usuario |
| Gateway | La app como punto de entrada hacia la vida social presencial, no como destino |

---

*Documento vivo. Se actualiza con cada iteración del producto basada en evidencia de usuarios reales.*
