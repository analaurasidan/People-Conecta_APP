import { useEffect } from 'react';
import { Platform } from 'react-native';
import { supabase } from '@/services/supabase';
import { useAuthStore } from '@/store/authStore';
import { UserProfile } from '@/services/database.types';

export function useAuthListener() {
  const { setSession, setProfile, setLoading } = useAuthStore();

  useEffect(() => {
    // Fallback: si Supabase no responde en 5s, mostrar login igual
    const timeout = setTimeout(() => setLoading(false), 5000);

    // Sesión inicial
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        clearTimeout(timeout);
        setSession(session);
        if (session?.user) fetchProfile(session.user.id);
        else setLoading(false);
      })
      .catch(() => { clearTimeout(timeout); setLoading(false); });

    // Escucha cambios de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) fetchProfile(session.user.id);
      else { setProfile(null); setLoading(false); }
    });

    return () => { clearTimeout(timeout); subscription.unsubscribe(); };
  }, []);

  async function fetchProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.warn('No se pudo cargar el perfil', error.message);
    }

    if (!data && Platform.OS === 'web') {
      const fallbackProfile: UserProfile = {
        id: userId,
        nombre: 'Usuario demo',
        foto_url: null,
        ciudad: 'Mar del Plata',
        zona: 'Centro',
        intereses: ['Social', 'Arte', 'Gastronomía'],
        plan_tier: 'free',
        aprobado: true,
        no_shows: 0,
        rating_promedio: null,
        created_at: new Date().toISOString(),
      };

      setProfile(fallbackProfile);
      setLoading(false);
      return;
    }

    setProfile(data ?? null);
    setLoading(false);
  }
}
