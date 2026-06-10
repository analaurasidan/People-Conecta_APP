/**
 * Strong Type Definitions for People Conecta
 */

export type CategoryType = 
  | 'deporte' 
  | 'música' 
  | 'cocina' 
  | 'idiomas' 
  | 'cine' 
  | 'naturaleza' 
  | 'arte' 
  | 'juegos' 
  | 'otro';

export interface User {
  id: string;
  name: string;
  photo: string;
  email: string;
  phone?: string;
  bio?: string;
  interests: CategoryType[];
  attendedCount: number;
  ratingAverage: number; // Average rating from organizers
  plan: 'free' | 'premium';
  dateJoined: string;
  gender: 'male' | 'female' | 'other';
  reason?: string; // Onboarding Step 1
  availableDays: string[]; // Onboarding Step 3
  zonePreference: string; // Onboarding Step 3
  noShowCount?: number; // PRD: No-show penalty system tracking
}

export interface Organizer {
  id: string;
  name: string;
  description: string;
  avatar: string;
  ratingAverage: number; // Average rating from participants
  reviewCount: number;
  totalEventsOrganized: number;
  phone: string;
  isVerified: boolean;
  isPro: boolean;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  authorName: string;
  authorAvatar?: string;
  date: string;
  type: 'to_organizer' | 'to_group';
}

export interface EventActivity {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  organizerId: string; // references Organizer
  date: string; // e.g. "2026-06-08"
  time: string; // e.g. "18:00"
  zone: string; // e.g. "Playa Grande", "Güemes", "Varese", "Constitución"
  image?: string;
  spotsMax: number;
  registeredUserIds: string[]; // List of User IDs enrolled
  isPaid: boolean;
  price?: string; // e.g. "$4500"
  reviews: Review[];
}
