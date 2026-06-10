import { User, Plan, Message, Review } from './types';

// Pre-seeded users in MDP/Chapadmalal
export const seedUsers: User[] = [
  {
    id: "user_lucia",
    name: "Lucía Bianchi",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    city: "Mar del Plata",
    zone: "La Perla",
    interests: ["Deportes", "Naturaleza", "Fotografía"],
    status: 'approved',
    isPremium: false,
    phone: "+54 9 223 555-1234",
    email: "lucia.b@example.com",
    joinedPlans: ["plan_masa_madre"],
    createdPlans: ["plan_caminata"],
    creatorRating: 4.9,
    participantRating: 5.0,
    plansAsCreatorCount: 8,
    plansAsParticipantCount: 14,
    noShowCount: 0
  },
  {
    id: "user_joaquin",
    name: "Joaquín Gómez",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    city: "Mar del Plata",
    zone: "Güemes",
    interests: ["Gastronomía", "Música", "Arte"],
    status: 'approved',
    isPremium: true,
    phone: "+54 9 223 555-5678",
    email: "joaco.g@example.com",
    joinedPlans: ["plan_caminata"],
    createdPlans: ["plan_masa_madre"],
    creatorRating: 4.8,
    participantRating: 4.9,
    plansAsCreatorCount: 15,
    plansAsParticipantCount: 6,
    noShowCount: 0
  },
  {
    id: "user_delfina",
    name: "Delfina Soler",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    city: "Mar del Plata",
    zone: "Bosque Peralta Ramos",
    interests: ["Naturaleza", "Yoga", "Idiomas"],
    status: 'approved',
    isPremium: false,
    phone: "+54 9 223 555-9012",
    email: "delfina.sol@example.com",
    joinedPlans: ["plan_caminata", "plan_masa_madre"],
    createdPlans: ["plan_yoga"],
    creatorRating: 5.0,
    participantRating: 4.8,
    plansAsCreatorCount: 4,
    plansAsParticipantCount: 19,
    noShowCount: 0
  },
  {
    id: "user_tomas",
    name: "Tomás Prieto",
    photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
    city: "Chapadmalal",
    zone: "Playa Los Lobos",
    interests: ["Deportes", "Naturaleza", "Música"],
    status: 'approved',
    isPremium: false,
    phone: "+54 9 223 555-4321",
    email: "tomi.p@example.com",
    joinedPlans: [],
    createdPlans: ["plan_surfing"],
    creatorRating: 4.7,
    participantRating: 4.9,
    plansAsCreatorCount: 12,
    plansAsParticipantCount: 22,
    noShowCount: 1
  },
  {
    id: "user_sofia",
    name: "Sofía Martínez",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    city: "Mar del Plata",
    zone: "Plaza Mitre",
    interests: ["Cine", "Literatura", "Idiomas"],
    status: 'approved',
    isPremium: false,
    phone: "+54 9 223 555-8765",
    email: "sofi.m@example.com",
    joinedPlans: ["plan_caminata"],
    createdPlans: [],
    creatorRating: 0,
    participantRating: 5.0,
    plansAsCreatorCount: 0,
    plansAsParticipantCount: 5,
    noShowCount: 0
  }
];

// Pre-seeded plans matching the screenshots and aesthetic
export const seedPlans: Plan[] = [
  {
    id: "plan_caminata",
    title: "Caminata por la costa",
    category: "Deportes",
    description: "Caminamos desde Playa Grande de MDP hasta cabo Corrientes charlando y parando a tomar mate con el atardecer. Un plan tranqui para conocernos e ir cerrando la semana.",
    zone: "Playa Grande, MDP",
    date: "Hoy",
    time: "18:00",
    creatorId: "user_lucia",
    creatorName: "Lucía Bianchi",
    creatorPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    maxCups: 6,
    joinedCount: 3,
    joinedUserIds: ["user_lucia", "user_joaquin", "user_delfina", "user_sofia"],
    isPaid: false,
    genderPreference: 'none',
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    imageGeneratedByAI: false,
    status: 'active'
  },
  {
    id: "plan_masa_madre",
    title: "Taller de Masa Madre",
    category: "Gastronomía",
    description: "Aprendé desde cero los secretos de la fermentación natural. Amasamos panes individuales, compartimos tips de horneado casero y cada quien se lleva su frasco de masa madre para cuidar.",
    zone: "Güemes, MDP",
    date: "Sáb 14",
    time: "10:30",
    creatorId: "user_joaquin",
    creatorName: "Joaquín Gómez",
    creatorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    maxCups: 8,
    joinedCount: 5,
    joinedUserIds: ["user_joaquin", "user_lucia", "user_delfina"],
    isPaid: true,
    priceAmount: "1500",
    priceDetails: "Cubre los materiales: harina orgánica, frascos, folletos e infusiones.",
    genderPreference: 'none',
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    imageGeneratedByAI: false,
    status: 'active'
  },
  {
    id: "plan_yoga",
    title: "Yoga al Amanecer",
    category: "Deportes",
    description: "Arrancamos el domingo con una sesión revitalizadora de Hatha Yoga en el Bosque de Peralta Ramos. Conectando con los sonidos de los árboles y respirando aire puro. Traer lona o colchoneta.",
    zone: "Bosque Peralta Ramos",
    date: "Dom 15",
    time: "07:30",
    creatorId: "user_delfina",
    creatorName: "Delfina Soler",
    creatorPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    maxCups: 10,
    joinedCount: 2,
    joinedUserIds: ["user_delfina", "user_lucia"],
    isPaid: false,
    genderPreference: 'none',
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    imageGeneratedByAI: false,
    status: 'active'
  },
  {
    id: "plan_surfing",
    title: "Surfeo y Fogón en Chapa",
    category: "Deportes",
    description: "Salimos por la tarde a remar unas olas en la bajada de Playa Los Lobos. Nos quedamos después a armar un fogón acústico con guitarreada en la playa. Si no surfeás, ¡venite al fogón igual!",
    zone: "Chapadmalal",
    date: "Sáb 21",
    time: "15:00",
    creatorId: "user_tomas",
    creatorName: "Tomás Prieto",
    creatorPhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
    maxCups: 12,
    joinedCount: 1,
    joinedUserIds: ["user_tomas"],
    isPaid: false,
    genderPreference: 'none',
    imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80",
    imageGeneratedByAI: false,
    status: 'active'
  }
];

// Seed chat messages
export const seedMessages: Message[] = [
  // Caminata por la costa
  {
    id: "msg_1",
    planId: "plan_caminata",
    userId: "user_lucia",
    userName: "Lucía Bianchi",
    userPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    text: "¡Buenas! Qué alegría que armamos el grupo de caminata. Mañana a las 18:00 nos vemos en la bajada de Playa Grande (frente a Biología).",
    timestamp: new Date(Date.now() - 3600000 * 5)
  },
  {
    id: "msg_2",
    planId: "plan_caminata",
    userId: "user_joaquin",
    userName: "Joaquín Gómez",
    userPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    text: "¡Hola! Genial el plan. Yo me llevo el termo listo y unas medialunas calentitas.",
    timestamp: new Date(Date.now() - 3600000 * 4.5)
  },
  {
    id: "msg_3",
    planId: "plan_caminata",
    userId: "user_sofia",
    userName: "Sofía Martínez",
    userPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    text: "Hola chicos! Re contenta, acabo de llegar hace 3 semanas a Marpla de Tucumán y me viene bárbaro para conocer gente. ¡Llevo otra lona para sentarnos!",
    timestamp: new Date(Date.now() - 3600000 * 3.2)
  },
  {
    id: "msg_4",
    planId: "plan_caminata",
    userId: "user_delfina",
    userName: "Delfina Soler",
    userPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    text: "¡Qué copado! Yo llevo mate también. Se va a poner linda la tarde de sol.",
    timestamp: new Date(Date.now() - 3600000 * 2.1)
  },

  // Masa Madre
  {
    id: "msg_m1",
    planId: "plan_masa_madre",
    userId: "user_joaquin",
    userName: "Joaquín Gómez",
    userPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    text: "¡Bienvenidos panaderos! Todo listo para mañana. Compré harinas orgánicas integrales y ya tengo los frascos esterilizados.",
    timestamp: new Date(Date.now() - 3600000 * 8)
  },
  {
    id: "msg_m2",
    planId: "plan_lucia",
    userId: "user_lucia",
    userName: "Lucía Bianchi",
    userPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    text: "Joaco, ¡qué buen taller! ¿Hay que coordinar transferencia?",
    timestamp: new Date(Date.now() - 3600000 * 7.5)
  },
  {
    id: "msg_m3",
    planId: "plan_masa_madre",
    userId: "user_joaquin",
    userName: "Joaquín Gómez",
    userPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    text: "Sí Lu, les mando un alias por privado o pagan directo acá mediante débito o efectivo, ¡cero drama! Nos tomamos unos ricos cafés mientras fermenta.",
    timestamp: new Date(Date.now() - 3600000 * 7.1)
  }
];

// Seed user reviews
export const seedReviews: Review[] = [
  {
    id: "rev_1",
    planId: "plan_masa_madre",
    planTitle: "Taller Masa Madre",
    reviewerId: "user_lucia",
    reviewerName: "Lucía Bianchi",
    reviewerPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    comment: "Excelente Joaquín, super didáctico, amoroso y nos dio cafecito riquísimo y pan caliente. ¡Tengo mi masa madre sana en la heladera!",
    role: "participant",
    timestamp: new Date(Date.now() - 3600000 * 24 * 3)
  },
  {
    id: "rev_2",
    planId: "plan_caminata",
    planTitle: "Caminata costera",
    reviewerId: "user_joaquin",
    reviewerName: "Joaquín Gómez",
    reviewerPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    comment: "La tarde fue un espectáculo total. Lucía tiene una onda divina, coordinó bárbaro y nos quedamos charlando hasta re tarde. ¡Recomiendo full!",
    role: "participant",
    timestamp: new Date(Date.now() - 3600000 * 24 * 1)
  }
];

// Available categories with aesthetic background icons/gradients
export const categoriesList = [
  "Todos",
  "Deportes",
  "Gastronomía",
  "Naturaleza",
  "Música",
  "Cine",
  "Arte",
  "Idiomas",
  "Juegos",
  "Otro"
];

// Areas list for Mar del Plata / Chapadmalal
export const mdpZonesCountMap: Record<string, string[]> = {
  "Mar del Plata": [
    "Playa Grande",
    "Güemes",
    "La Perla",
    "Punta Mogotes",
    "Bosque Peralta Ramos",
    "Plaza Mitre",
    "Constitución",
    "Centro",
    "Puerto",
    "Caisamar",
    "Varese",
    "Stella Maris"
  ],
  "Chapadmalal": [
    "Playa Los Lobos",
    "San Eduardo del Mar",
    "Santa Isabel",
    "Mar de Cobo",
    "Las Brusquitas"
  ]
};
