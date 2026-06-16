import { supabase } from './supabase';
import { Platform } from 'react-native';
import { ChatMessage } from './database.types';

const nativeDemoMessages: Record<string, ChatMessage[]> = {};

export async function getChatMessages(planId: string) {
  if (isDemoChat(planId)) {
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
  if (isDemoChat(planId) || isDemoUser(userId)) {
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
    setDemoMessages(planId, messages);
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
  if (isDemoChat(planId)) {
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
  if (Platform.OS !== 'web') {
    if (nativeDemoMessages[planId]) {
      return nativeDemoMessages[planId];
    }

    const seeded = buildSeededMessages(planId);
    nativeDemoMessages[planId] = seeded;
    return seeded;
  }

  const stored = localStorage.getItem(getDemoChatKey(planId));
  if (stored) {
    try {
      return JSON.parse(stored) as ChatMessage[];
    } catch {
      localStorage.removeItem(getDemoChatKey(planId));
    }
  }

  const seeded = buildSeededMessages(planId);
  localStorage.setItem(getDemoChatKey(planId), JSON.stringify(seeded));
  return seeded;
}

function setDemoMessages(planId: string, messages: ChatMessage[]) {
  if (Platform.OS === 'web') {
    localStorage.setItem(getDemoChatKey(planId), JSON.stringify(messages));
    return;
  }

  nativeDemoMessages[planId] = messages;
}

function buildSeededMessages(planId: string): ChatMessage[] {
  const now = Date.now();
  return [
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
}

function isDemoChat(planId: string) {
  return planId.startsWith('demo_');
}

function isDemoUser(userId?: string | null) {
  return userId === 'demo_user' || userId === 'demo_web_user';
}
