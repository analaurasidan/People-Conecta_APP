// Supabase Edge Function: genera imagen con Hugging Face (Stable Diffusion free)
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

const HF_API_KEY = Deno.env.get('HF_API_KEY');
const HF_MODEL = 'stabilityai/stable-diffusion-xl-base-1.0';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders() });
  }

  const { categoria, descripcion } = await req.json();

  const prompt = buildPrompt(categoria, descripcion);

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${HF_MODEL}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { width: 768, height: 512, num_inference_steps: 20 },
      }),
    }
  );

  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: 'Error generando imagen. Intenta más tarde.' }),
      { status: 500, headers: corsHeaders() }
    );
  }

  // HF devuelve el blob de la imagen directamente
  const imageBlob = await response.blob();
  const arrayBuffer = await imageBlob.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  const imageUrl = `data:image/png;base64,${base64}`;

  return new Response(
    JSON.stringify({ imageUrl }),
    { headers: { 'Content-Type': 'application/json', ...corsHeaders() } }
  );
});

function buildPrompt(categoria: string, descripcion: string): string {
  const categoryMap: Record<string, string> = {
    'Deporte': 'people playing sports outdoors, sunny day, active lifestyle',
    'Arte':    'people doing art together, creative workshop, colorful studio',
    'Música':  'people enjoying live music, concert atmosphere, warm lights',
    'Gastronomía': 'people sharing food at a restaurant, social dining, delicious meal',
    'Naturaleza':  'people hiking in nature, green landscape, outdoor adventure',
    'Juegos':  'people playing board games, social gathering, fun atmosphere',
    'Viajes':  'people traveling together, sightseeing, travel adventure',
    'Social':  'group of friends socializing, casual gathering, happy people',
  };

  const base = categoryMap[categoria] ?? 'group of people having fun together';
  return `${base}, ${descripcion.slice(0, 80)}, photorealistic, high quality, warm tones, social event, Argentina`;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}
