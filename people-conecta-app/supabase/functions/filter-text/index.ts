// Supabase Edge Function: filtra texto de planes antes de publicar
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

const BLOCKED_TERMS = [
  'menores', 'solo adultos', 'sin ropa', 'desnudo', 'intimo',
  'violencia', 'pelea', 'golpe', 'arma', 'droga',
  'cita', 'solo 1 persona', 'solo una persona',
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders() });
  }

  const { texto } = await req.json();
  const textoLower = (texto ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  const triggered = BLOCKED_TERMS.find(term =>
    textoLower.includes(term.normalize('NFD').replace(/[̀-ͯ]/g, ''))
  );

  return new Response(
    JSON.stringify({ safe: !triggered, triggeredTerm: triggered ?? null }),
    { headers: { 'Content-Type': 'application/json', ...corsHeaders() } }
  );
});

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}
