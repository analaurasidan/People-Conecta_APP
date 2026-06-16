import { UserProfile } from './database.types';

export function createDemoProfile(): UserProfile {
  return {
    id: 'demo_user',
    nombre: 'Usuario demo',
    foto_url: null,
    ciudad: 'Mar del Plata',
    zona: 'Güemes',
    intereses: ['Arte', 'Gastronomía', 'Naturaleza'],
    plan_tier: 'free',
    aprobado: true,
    no_shows: 0,
    rating_promedio: null,
    created_at: new Date().toISOString(),
  };
}
