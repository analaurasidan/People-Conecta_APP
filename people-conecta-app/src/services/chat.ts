import { supabase } from './supabase';
import { Platform } from 'react-native';
import { ChatMessage } from './database.types';

export async function getChatMessages(planId: string) {
  if (Platform.OS === 'web') {
    return getDemoMessages(planId);
  }

  const { data, error } = await supabase
    .from('chat_messages')
    .select(`
      *,
      user:users!user_id(id, nombre, foto_url)
    `)
    .eq('plan_id', planId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data as ChatMessage[];
}

export async function sendMessage(planId: string, userId: string, contenido: string, fotoUrl?: string) {
  if (Platform.OS === 'web') {
    const message: ChatMessage = {
      id: `demo_msg_${Date.now()}`,
      plan_id: planId,
      user_id: userId,
      contenido,
      foto_url: fotoUrl ?? null,
      created_at: new Date().toISOString(),
      user: {
        id: userId,
        nombre: 'Vos',
        foto_url: null,
      },
    };
    const messages = [...getDemoMessages(planId), message];
    localStorage.setItem(getDemoChatKey(planId), JSON.stringify(messages));
    return message;
  }

  const { data, error } = await supabase
    .from('chat_messages')
    .insert({ plan_id: planId, user_id: userId, contenido, foto_url: fotoUrl ?? null })
    .select()
    .single();
  if (error) throw error;
  return data as ChatMessage;
}

export function subscribeToChatMessages(
  planId: string,
  onNewMessage: (message: ChatMessage) => void
) {
  if (Platform.OS === 'web') {
    return () => undefined;
  }

  const channel = supabase
    .channel(`chat:${planId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `plan_id=eq.${planId}`,
      },
      async (payload) => {
        // Fetch con join para tener datos del usuario
        const { data } = await supabase
          .from('chat_messages')
          .select('*, user:users!user_id(id, nombre, foto_url)')
          .eq('id', payload.new.id)
          .single();
        if (data) onNewMessage(data as ChatMessage);
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}

function getDemoChatKey(planId: string) {
  return `pc_demo_chat_${planId}`;
}

function getDemoMessages(planId: string) {
  const stored = localStorage.getItem(getDemoChatKey(planId));
  if (stored) {
    try {
      return JSON.parse(stored) as ChatMessage[];
    } catch {
      localStorage.removeItem(getDemoChatKey(planId));
    }
  }

  const now = Date.now();
  const seeded: ChatMessage[] = [
    {
      id: `${planId}_welcome`,
      plan_id: planId,
      user_id: 'demo_people_conecta',
      contenido: 'Grupo creado. Acá coordinamos punto de encuentro, horarios y cualquier cambio del plan.',
      foto_url: null,
      created_at: new Date(now - 1000 * 60 * 18).toISOString(),
      user: { id: 'demo_people_conecta', nombre: 'People Conecta', foto_url: null },
    },
    {
      id: `${planId}_host`,
      plan_id: planId,
      user_id: 'demo_host',
      contenido: '¡Bienvenidos! La idea es encontrarnos 10 minutos antes para presentarnos tranqui.',
      foto_url: null,
      created_at: new Date(now - 1000 * 60 * 11).toISOString(),
      user: { id: 'demo_host', nombre: 'Anfi local', foto_url: null },
    },
  ];

  localStorage.setItem(getDemoChatKey(planId), JSON.stringify(seeded));
  return seeded;
}
