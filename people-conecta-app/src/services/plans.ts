import { supabase } from './supabase';
import { Platform } from 'react-native';
import { Plan } from './database.types';
import { demoPlans } from './demoPlans';

export type PlanFilters = {
  zona?: string;
  categoria?: string;
  diaSemana?: number;    // 0=Dom ... 6=Sab
  tamanoGrupo?: 'small' | 'medium' | 'large';
  soloGratuitos?: boolean;
};

export async function getPlans(filters: PlanFilters = {}) {
  if (Platform.OS === 'web') {
    return filterDemoPlans(filters);
  }

  let query = supabase
    .from('plans')
    .select(`
      *,
      creator:users!creator_id(id, nombre, foto_url, rating_promedio),
      participations(id, estado, user:users!user_id(id, nombre, foto_url))
    `)
    .eq('estado', 'publicado')
    .gte('fecha', new Date().toISOString())
    .order('fecha', { ascending: true });

  if (filters.zona)      query = query.eq('zona', filters.zona);
  if (filters.categoria) query = query.eq('categoria', filters.categoria);
  if (filters.soloGratuitos) query = query.eq('es_gratuito', true);
  if (filters.tamanoGrupo === 'small')  query = query.lte('cupo_max', 6);
  if (filters.tamanoGrupo === 'medium') query = query.gte('cupo_max', 7).lte('cupo_max', 12);
  if (filters.tamanoGrupo === 'large')  query = query.gte('cupo_max', 13);

  const { data, error } = await query;
  if (error) {
    console.warn('Usando planes demo porque Supabase no devolvió planes', error.message);
    return filterDemoPlans(filters);
  }

  const plans = data as Plan[];
  return plans.length > 0 ? plans : filterDemoPlans(filters);
}

function filterDemoPlans(filters: PlanFilters = {}) {
  return [...getCreatedDemoPlans(), ...demoPlans].filter((plan) => {
    if (filters.zona && plan.zona !== filters.zona) return false;
    if (filters.categoria && plan.categoria !== filters.categoria) return false;
    if (filters.soloGratuitos && !plan.es_gratuito) return false;
    if (filters.tamanoGrupo === 'small' && plan.cupo_max > 6) return false;
    if (filters.tamanoGrupo === 'medium' && (plan.cupo_max < 7 || plan.cupo_max > 12)) return false;
    if (filters.tamanoGrupo === 'large' && plan.cupo_max < 13) return false;
    return true;
  });
}

export async function getPlanById(id: string) {
  if (Platform.OS === 'web') {
    const plan = [...getCreatedDemoPlans(), ...demoPlans].find((item) => item.id === id);
    if (!plan) throw new Error('Plan no encontrado');

    const joined = getJoinedPlanIds().includes(id);
    return {
      ...plan,
      cupo_actual: joined ? Math.max(plan.cupo_actual, 1) : plan.cupo_actual,
      participations: joined
        ? [{
            id: `demo_participation_${id}`,
            user_id: 'demo_web_user',
            plan_id: id,
            estado: 'confirmado',
            created_at: new Date().toISOString(),
            user: {
              id: 'demo_web_user',
              nombre: 'Usuario demo',
              foto_url: null,
            },
          }]
        : [],
    } as Plan;
  }

  const { data, error } = await supabase
    .from('plans')
    .select(`
      *,
      creator:users!creator_id(*),
      participations(*, user:users!user_id(id, nombre, foto_url))
    `)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Plan;
}

export async function createPlan(plan: Partial<Plan>) {
  if (Platform.OS === 'web') {
    const createdPlan: Plan = {
      id: `demo_created_${Date.now()}`,
      creator_id: plan.creator_id ?? 'demo_web_user',
      nombre: plan.nombre ?? 'Plan sin nombre',
      categoria: plan.categoria ?? 'Social',
      descripcion: plan.descripcion ?? '',
      zona: plan.zona ?? 'Mar del Plata',
      fecha: plan.fecha ?? new Date().toISOString(),
      hora: plan.hora ?? '18:00',
      cupo_max: plan.cupo_max ?? 10,
      cupo_actual: 0,
      foto_url: plan.foto_url ?? null,
      es_gratuito: plan.es_gratuito ?? true,
      precio: plan.precio ?? null,
      preferencia_genero: plan.preferencia_genero ?? 'todos',
      estado: 'publicado',
      created_at: new Date().toISOString(),
      creator: {
        id: plan.creator_id ?? 'demo_web_user',
        nombre: 'Usuario demo',
        foto_url: null,
        ciudad: 'Mar del Plata',
        zona: plan.zona ?? 'Mar del Plata',
        intereses: [],
        plan_tier: 'free',
        aprobado: true,
        no_shows: 0,
        rating_promedio: 4.8,
        created_at: new Date().toISOString(),
      },
    };

    const created = [createdPlan, ...getCreatedDemoPlans()];
    localStorage.setItem('pc_created_demo_plans', JSON.stringify(created));
    return createdPlan;
  }

  const { data, error } = await supabase
    .from('plans')
    .insert(plan)
    .select()
    .single();
  if (error) throw error;
  return data as Plan;
}

export async function updatePlan(id: string, updates: Partial<Plan>) {
  const { data, error } = await supabase
    .from('plans')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Plan;
}

export async function deletePlan(planId: string) {
  if (Platform.OS === 'web') {
    const created = getCreatedDemoPlans().filter((plan) => plan.id !== planId);
    const joined = getJoinedPlanIds().filter((id) => id !== planId);
    localStorage.setItem('pc_created_demo_plans', JSON.stringify(created));
    localStorage.setItem('pc_joined_plan_ids', JSON.stringify(joined));
    return;
  }

  throw new Error('Eliminar planes reales requiere validar ownership en Supabase.');
}

export async function joinPlan(planId: string, userId: string) {
  if (Platform.OS === 'web') {
    const joined = new Set(getJoinedPlanIds());
    joined.add(planId);
    localStorage.setItem('pc_joined_plan_ids', JSON.stringify([...joined]));
    return {
      id: `demo_participation_${planId}`,
      plan_id: planId,
      user_id: userId,
      estado: 'confirmado',
      created_at: new Date().toISOString(),
    };
  }

  const { data, error } = await supabase
    .from('participations')
    .insert({ plan_id: planId, user_id: userId, estado: 'confirmado' })
    .select()
    .single();
  if (error) throw error;

  // Incrementar cupo_actual
  await supabase.rpc('increment_plan_cupo', { plan_id: planId });

  return data;
}

export async function leavePlan(planId: string) {
  if (Platform.OS === 'web') {
    const joined = getJoinedPlanIds().filter((id) => id !== planId);
    localStorage.setItem('pc_joined_plan_ids', JSON.stringify(joined));
    return;
  }

  throw new Error('Salir del plan todavía requiere la participación real en Supabase.');
}

function getJoinedPlanIds() {
  try {
    return JSON.parse(localStorage.getItem('pc_joined_plan_ids') ?? '[]') as string[];
  } catch {
    return [];
  }
}

function getCreatedDemoPlans() {
  try {
    return JSON.parse(localStorage.getItem('pc_created_demo_plans') ?? '[]') as Plan[];
  } catch {
    return [];
  }
}

export async function cancelParticipation(participationId: string, planId: string) {
  const { error } = await supabase
    .from('participations')
    .update({ estado: 'cancelado' })
    .eq('id', participationId);
  if (error) throw error;

  await supabase.rpc('decrement_plan_cupo', { plan_id: planId });
}

export async function getMyPlans(userId: string) {
  if (Platform.OS === 'web') {
    const joined = getJoinedPlanIds();
    return demoPlans
      .filter((plan) => joined.includes(plan.id))
      .map((plan) => ({
        id: `demo_participation_${plan.id}`,
        user_id: userId,
        plan_id: plan.id,
        estado: 'confirmado',
        created_at: new Date().toISOString(),
        plan,
      }));
  }

  const { data, error } = await supabase
    .from('participations')
    .select(`
      *,
      plan:plans(
        *,
        creator:users!creator_id(id, nombre, foto_url)
      )
    `)
    .eq('user_id', userId)
    .eq('estado', 'confirmado')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getMyCreatedPlans(userId: string) {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('creator_id', userId)
    .order('fecha', { ascending: false });
  if (error) throw error;
  return data as Plan[];
}
