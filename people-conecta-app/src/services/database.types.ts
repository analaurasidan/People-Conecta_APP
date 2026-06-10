// Tipos generados desde el esquema de Supabase
// Regenerar con: npx supabase gen types typescript --local > src/services/database.types.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type PlanTier = 'free' | 'premium';
export type PlanStatus = 'borrador' | 'publicado' | 'cancelado' | 'finalizado' | 'en_revision';
export type ParticipationStatus = 'confirmado' | 'cancelado';
export type ReportType = 'plan' | 'mensaje' | 'usuario';
export type ReportStatus = 'pendiente' | 'resuelto' | 'descartado';

export type UserProfile = {
  id: string;
  nombre: string;
  foto_url: string | null;
  ciudad: string;
  zona: string;
  intereses: string[];
  plan_tier: PlanTier;
  aprobado: boolean;
  no_shows: number;
  rating_promedio: number | null;
  created_at: string;
};

export type Plan = {
  id: string;
  creator_id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  zona: string;
  fecha: string;           // ISO 8601
  hora: string;
  cupo_max: number;
  cupo_actual: number;
  foto_url: string | null;
  es_gratuito: boolean;
  precio: number | null;
  preferencia_genero: 'todos' | 'mujeres' | 'hombres' | null;
  estado: PlanStatus;
  creator?: UserProfile;
  created_at: string;
};

export type Participation = {
  id: string;
  user_id: string;
  plan_id: string;
  estado: ParticipationStatus;
  created_at: string;
  user?: UserProfile;
};

export type ChatMessage = {
  id: string;
  plan_id: string;
  user_id: string;
  contenido: string;
  foto_url: string | null;
  created_at: string;
  user?: Pick<UserProfile, 'id' | 'nombre' | 'foto_url'>;
};

export type Review = {
  id: string;
  reviewer_id: string;
  plan_id: string;
  organizador_id: string;
  rating: number;
  comentario: string | null;
  created_at: string;
};

export type Report = {
  id: string;
  reporter_id: string;
  tipo: ReportType;
  ref_id: string;
  motivo: string;
  estado: ReportStatus;
  created_at: string;
};

// Tipo placeholder para el cliente de Supabase tipado
export type Database = {
  public: {
    Tables: {
      users: { Row: UserProfile; Insert: Partial<UserProfile>; Update: Partial<UserProfile> };
      plans: { Row: Plan; Insert: Partial<Plan>; Update: Partial<Plan> };
      participations: { Row: Participation; Insert: Partial<Participation>; Update: Partial<Participation> };
      chat_messages: { Row: ChatMessage; Insert: Partial<ChatMessage>; Update: Partial<ChatMessage> };
      reviews: { Row: Review; Insert: Partial<Review>; Update: Partial<Review> };
      reports: { Row: Report; Insert: Partial<Report>; Update: Partial<Report> };
    };
  };
};
