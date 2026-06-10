import * as ImagePicker from 'expo-image-picker';
import { supabase } from './supabase';

export async function pickImage(): Promise<string | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8,
  });

  if (result.canceled) return null;
  return result.assets[0].uri;
}

export async function uploadPlanImage(localUri: string, planId: string): Promise<string> {
  const ext = localUri.split('.').pop() ?? 'jpg';
  const path = `plans/${planId}/cover.${ext}`;

  const response = await fetch(localUri);
  const blob = await response.blob();

  const { error } = await supabase.storage
    .from('images')
    .upload(path, blob, { contentType: `image/${ext}`, upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from('images').getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadProfilePhoto(localUri: string, userId: string): Promise<string> {
  const ext = localUri.split('.').pop() ?? 'jpg';
  const path = `profiles/${userId}/avatar.${ext}`;

  const response = await fetch(localUri);
  const blob = await response.blob();

  const { error } = await supabase.storage
    .from('images')
    .upload(path, blob, { contentType: `image/${ext}`, upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from('images').getPublicUrl(path);
  return data.publicUrl;
}

// Genera imagen con IA via Supabase Edge Function (que llama a Hugging Face)
export async function generatePlanImageAI(categoria: string, descripcion: string): Promise<string> {
  const { data, error } = await supabase.functions.invoke('generate-image', {
    body: { categoria, descripcion },
  });
  if (error) throw error;
  return data.imageUrl as string;
}
