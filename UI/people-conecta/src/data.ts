import { EventActivity, Organizer, User, CategoryType } from './types';

export const CATEGORIES: { id: CategoryType; label: string; icon: string; bg: string; text: string }[] = [
  { id: 'deporte', label: 'Deporte', icon: '🏄‍♂️', bg: 'bg-[#E6F7F7]', text: 'text-[#005555]' },
  { id: 'música', label: 'Música', icon: '🎵', bg: 'bg-[#FFF0ED]', text: 'text-[#CC3318]' },
  { id: 'cocina', label: 'Cocina', icon: '🍳', bg: 'bg-[#FEF6E4]', text: 'text-[#8B7550]' },
  { id: 'idiomas', label: 'Idiomas', icon: '🗣️', bg: 'bg-[#EAF2FB]', text: 'text-[#4090D6]' },
  { id: 'cine', label: 'Cine', icon: '🎬', bg: 'bg-[#F2EAFB]', text: 'text-[#8A40D6]' },
  { id: 'naturaleza', label: 'Naturaleza', icon: '🏔️', bg: 'bg-[#EAFBEA]', text: 'text-[#2D9E6B]' },
  { id: 'arte', label: 'Arte', icon: '🎨', bg: 'bg-[#FBEAF4]', text: 'text-[#D6409F]' },
  { id: 'juegos', label: 'Juegos', icon: '🎮', bg: 'bg-[#FAEAEA]', text: 'text-[#D64040]' },
  { id: 'otro', label: 'Otro', icon: '✨', bg: 'bg-[#F7F1E3]', text: 'text-[#6B5A3E]' },
];

export const MAR_DEL_PLATA_ZONES = [
  'Playa Grande',
  'Güemes',
  'Varese',
  'Cabo Corrientes',
  'Centro',
  'Constitución',
  'Plaza Mitre',
  'Puerto',
  'Sierra de los Padres'
];

export const DEFAULT_ORGANIZERS: Organizer[] = [
  {
    id: 'org_maria',
    name: 'María Fernández',
    description: 'Amante del surf y las actividades al aire libre. Organizo encuentros grupales en la costa marplatense desde hace 2 años para conectar gente linda.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    ratingAverage: 4.8,
    reviewCount: 28,
    totalEventsOrganized: 12,
    phone: '+54 223 512-3456',
    isVerified: true,
    isPro: true
  },
  {
    id: 'org_juan',
    name: 'Juan Pérez',
    description: 'Cocinero y organizador cultural. Creo que la comida y el café de especialidad son las mejores excusas para charlar y conocer gente nueva.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    ratingAverage: 4.7,
    reviewCount: 15,
    totalEventsOrganized: 8,
    phone: '+54 223 588-9911',
    isVerified: true,
    isPro: false
  },
  {
    id: 'org_lucas',
    name: 'Lucas Rossi',
    description: 'Instructor de senderismo y guía de turismo alternativo en Sierra de los Padres. Apasionado por la desconexión digital de fin de semana.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    ratingAverage: 4.9,
    reviewCount: 10,
    totalEventsOrganized: 6,
    phone: '+54 223 444-1234',
    isVerified: true,
    isPro: true
  }
];

export const DEFAULT_USERS: User[] = [
  {
    id: 'user_sandy',
    name: 'Santiago García',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    email: 'santi.garcia@gmail.com',
    phone: '+54 223 666-1010',
    bio: 'Me mudé a Mar del Plata hace 2 meses desde Tucumán. Busco gente con buena onda para salir a surfear o tomar unas birras frente al mar.',
    interests: ['deporte', 'cine', 'cocina'],
    attendedCount: 12,
    ratingAverage: 4.9,
    plan: 'premium',
    dateJoined: 'Mayo 2026',
    gender: 'male',
    reason: 'Llegué nuevo a la ciudad',
    availableDays: ['Sábado', 'Domingo', 'Viernes'],
    zonePreference: 'Playa Grande'
  },
  {
    id: 'user_valen',
    name: 'Valentina Moyano',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
    email: 'valen.moyano@gmail.com',
    phone: '+54 223 555-4040',
    bio: 'Estudiante de Ciencias Ambientales en la UNMdP. Me gusta charlar de música, ecología y tocar la guitarra en la playa.',
    interests: ['música', 'cocina', 'naturaleza'],
    attendedCount: 5,
    ratingAverage: 4.8,
    plan: 'free',
    dateJoined: 'Mayo 2026',
    gender: 'female',
    reason: 'Estoy en una nueva etapa',
    availableDays: ['Jueves', 'Viernes', 'Sábado'],
    zonePreference: 'Varese'
  },
  {
    id: 'user_tomi',
    name: 'Tomás Díaz',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    email: 'tomas.diaz@gmail.com',
    phone: '+54 223 333-2222',
    bio: 'Programador remoto. Paso mucho tiempo en mi departamento, por eso busco actividades concretas para desenchufarme de la pantalla.',
    interests: ['juegos', 'deporte', 'arte'],
    attendedCount: 8,
    ratingAverage: 4.7,
    plan: 'free',
    dateJoined: 'Abril 2026',
    gender: 'male',
    reason: 'Quiero salir más de casa',
    availableDays: ['Miércoles', 'Sábado', 'Domingo'],
    zonePreference: 'Centro'
  },
  {
    id: 'user_antot',
    name: 'Antonella Prieto',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    email: 'anto.prieto@gmail.com',
    phone: '+54 223 444-5555',
    bio: 'Profesora de idiomas recién radicada en La Perla. Me encanta la literatura, el cine de autor y probar cafeterías de especialidad.',
    interests: ['idiomas', 'cine', 'arte'],
    attendedCount: 3,
    ratingAverage: 5.0,
    plan: 'premium',
    dateJoined: 'Mayo 2026',
    gender: 'female',
    reason: 'Llegué nuevo a la ciudad',
    availableDays: ['Lunes', 'Miércoles', 'Sábado'],
    zonePreference: 'Güemes'
  }
];

export const DEFAULT_EVENTS: EventActivity[] = [
  {
    id: 'event_surf',
    title: 'Surf grupal y atardecer en playa',
    description: 'Encuentro para surfear olas juntos (principiantes o intermedios). No importa tu nivel, la idea es divertirse y después quedarnos con unos mates a ver caer el sol en los acantilados de Playa Grande.',
    category: 'deporte',
    organizerId: 'org_maria',
    date: '2026-05-30',
    time: '17:00',
    zone: 'Playa Grande',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=600',
    spotsMax: 6,
    registeredUserIds: ['user_sandy', 'user_valen'],
    isPaid: false,
    reviews: [
      {
        id: 'rev_1',
        rating: 5,
        comment: '¡Increíble tarde! El grupo fue super amigable, María estuvo atenta a todos. Totalmente recomendado.',
        authorName: 'Santiago García',
        authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=50',
        date: '25-05-2026',
        type: 'to_organizer'
      }
    ]
  },
  {
    id: 'event_idiomas',
    title: 'Intercambio de Idiomas y Café de Especialidad',
    description: 'Encuentro relajado en una de las cafeterías más lindas de Güemes. Charlamos una hora en inglés y otra en español para ayudarnos mutuamente a perder el miedo. Ideal para recién llegados y expats.',
    category: 'idiomas',
    organizerId: 'org_juan',
    date: '2026-05-28',
    time: '18:30',
    zone: 'Güemes',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600',
    spotsMax: 10,
    registeredUserIds: ['user_valen', 'user_tomi', 'user_antot'],
    isPaid: true,
    price: '$2.500',
    reviews: []
  },
  {
    id: 'event_musica',
    title: 'Fogón Acústico frente al mar',
    description: 'Traé tu instrumento, tu mate o tu birra. Nos juntamos cerca de las piedras de Cabo Corrientes / Varese a cantar canciones clásicas del rock nacional y compartir el calor del fuego al anochecer.',
    category: 'música',
    organizerId: 'org_maria',
    date: '2026-05-31',
    time: '19:30',
    zone: 'Varese',
    image: 'https://images.unsplash.com/photo-1532509156689-d9d151c890f6?auto=format&fit=crop&q=80&w=600',
    spotsMax: 12,
    registeredUserIds: ['user_sandy', 'user_valen', 'user_antot'],
    isPaid: false,
    reviews: []
  },
  {
    id: 'event_cocina',
    title: 'Clase de Cocina de Mar e Introducción al Ceviche',
    description: 'Aprendemos a seleccionar pescado fresco marplatense en el puerto y elaboramos ceviches y empanadas tradicionales en formato taller participativo cerrado. Incluye degustación completa.',
    category: 'cocina',
    organizerId: 'org_juan',
    date: '2026-06-03',
    time: '12:00',
    zone: 'Puerto',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
    spotsMax: 6,
    registeredUserIds: ['user_sandy', 'user_tomi'],
    isPaid: true,
    price: '$6.000',
    reviews: []
  },
  {
    id: 'event_trekking',
    title: 'Senderismo serrano y picnics al sol',
    description: 'Escapada del ruido de la ciudad. Hacemos un circuito de baja dificultad en Sierra de los Padres subiendo a miradores panorámicos. Llevamos picnic para almorzar entre los pinos y aromáticas.',
    category: 'naturaleza',
    organizerId: 'org_lucas',
    date: '2026-05-30',
    time: '10:00',
    zone: 'Sierra de los Padres',
    image: 'https://images.unsplash.com/photo-1551632811-561730d164a6?auto=format&fit=crop&q=80&w=600',
    spotsMax: 5,
    registeredUserIds: ['user_sandy', 'user_tomi', 'user_antot', 'user_valen'], // 4 registered, 1 spot left
    isPaid: false,
    reviews: []
  },
  {
    id: 'event_juegos',
    title: 'Noche de Juegos de Mesa modernos y birra',
    description: '¿Conocés Catan, Carcassonne o Dixit? Nos juntamos en un bar del centro a jugar clásicos modernos y de estrategia. Explicamos las reglas desde cero, no hace falta experiencia previa.',
    category: 'juegos',
    organizerId: 'org_lucas',
    date: '2026-06-01',
    time: '20:30',
    zone: 'Centro',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=600',
    spotsMax: 8,
    registeredUserIds: [], // 0 registered - "Sé el primero" test
    isPaid: false,
    reviews: []
  },
  {
    id: 'event_cine',
    title: 'Ciclo Cine-Debate en el centro cultural',
    description: 'Proyección de joyitas del cine independiente nacional e internacional, seguido de una charla debate amena regada de un vermú marplatense. Lugar: Casa de Madera (Plaza Mitre).',
    category: 'cine',
    organizerId: 'org_juan',
    date: '2026-06-04',
    time: '19:00',
    zone: 'Plaza Mitre',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=600',
    spotsMax: 15,
    registeredUserIds: ['user_tomi', 'user_antot'],
    isPaid: false,
    reviews: []
  }
];

export function getLocalState() {
  const users = localStorage.getItem('pc_users');
  const organizers = localStorage.getItem('pc_organizers');
  const events = localStorage.getItem('pc_events');
  const currentUser = localStorage.getItem('pc_curr_user');

  if (!users || !organizers || !events || !currentUser) {
    // Initialize
    localStorage.setItem('pc_users', JSON.stringify(DEFAULT_USERS));
    localStorage.setItem('pc_organizers', JSON.stringify(DEFAULT_ORGANIZERS));
    localStorage.setItem('pc_events', JSON.stringify(DEFAULT_EVENTS));
    
    // Default current logged-in user is Sandy ( Santiago )
    localStorage.setItem('pc_curr_user', JSON.stringify(DEFAULT_USERS[0]));
    
    return {
      users: DEFAULT_USERS,
      organizers: DEFAULT_ORGANIZERS,
      events: DEFAULT_EVENTS,
      currentUser: DEFAULT_USERS[0]
    };
  }

  return {
    users: JSON.parse(users),
    organizers: JSON.parse(organizers),
    events: JSON.parse(events),
    currentUser: JSON.parse(currentUser)
  };
}

export function saveLocalState(state: { users: User[]; organizers: Organizer[]; events: EventActivity[]; currentUser: User | null }) {
  localStorage.setItem('pc_users', JSON.stringify(state.users));
  localStorage.setItem('pc_organizers', JSON.stringify(state.organizers));
  localStorage.setItem('pc_events', JSON.stringify(state.events));
  if (state.currentUser) {
    localStorage.setItem('pc_curr_user', JSON.stringify(state.currentUser));
  } else {
    localStorage.removeItem('pc_curr_user');
  }
}
