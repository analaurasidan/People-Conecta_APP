import React from 'react';
import { Shield, Sparkles, AlertTriangle, Users, Flame, Landmark } from 'lucide-react';

export default function ResearchTab() {
  return (
    <div className="space-y-8 text-neutral-warm-800 p-1 md:p-4">
      {/* Header */}
      <div className="border-b border-neutral-warm-200 pb-4">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-warm-800 flex items-center gap-2">
          <Sparkles className="text-primary w-8 h-8" />
          Kit de Investigación — People Conecta
        </h2>
        <p className="text-neutral-warm-600 mt-2">
          Análisis del mercado de soledad no deseada y el contexto vincular en jóvenes adultos de 18 a 35 años.
        </p>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-neutral-warm-100 shadow-elevation-1">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-primary mb-3">
            <Users className="w-5 h-5 text-primary" />
            1. Soledad y Juventud en Latam
          </h3>
          <ul className="space-y-3 text-sm text-neutral-warm-700">
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>La prevalencia de soledad en jóvenes adultos en Latam oscila entre el <strong>25% y 32%</strong>, acentuándose en grandes áreas metropolitanas donde las redes tradicionales se disuelven.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>El grupo de 18 a 35 años presenta un declive global en el índice <strong>"Social Self"</strong>, caracterizándose por dificultades en autorregulación y motivación vincular tras la hiper-digitalización.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>En Argentina, convive con un índice de red familiar fuerte (70% reporta alta fortaleza vincular vs 61% promedio global). Esto genera un <strong>sesgo de estigma</strong> donde admitir la soledad es percibido como un fracaso personal.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-warm-100 shadow-elevation-1">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-[#FF6347] mb-3">
            <Flame className="w-5 h-5 text-[#FF6347]" />
            2. Análisis Competitivo
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-neutral-warm-800">Meetup (Directo)</p>
              <p className="text-neutral-warm-600">Fuerte en escala grupal pero con UX obsoleta y baja frecuencia de actividades informales para jóvenes fuera del nicho de tecnología o idiomas.</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-warm-800">Bumble BFF (Directo)</p>
              <p className="text-neutral-warm-600">UX de citas (swipe) arrastrada a amistad platónica. Tiende a generar chats infinitos en lugar de encuentros cara a cara, generando frustración digital.</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-warm-800">Couchsurfing Hangouts (Indirecto)</p>
              <p className="text-neutral-warm-600">Excelente espíritu "Conecta", pero con tracción orientada casi de forma exclusiva a viajeros transitorios en lugar de residentes permanentes.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-warm-100 shadow-elevation-1">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-amber-600 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            3. Factores de Riesgo / Fracaso
          </h3>
          <div className="space-y-3 text-sm text-neutral-warm-700">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
              <p className="font-medium text-amber-900">Efecto Huevo-Gallina</p>
              <p className="text-amber-800 mt-1">Si no hay actividades reales y consistentes al registrarse, el usuario entra, se frustra y no vuelve jamás. Debemos mapear redes preexistentes.</p>
            </div>
            <div className="p-3 bg-red-50 rounded-xl border border-red-100">
              <p className="font-medium text-red-900">Digitalización Temprana y Estancamiento Virtual</p>
              <p className="text-red-800 mt-1">El chat libre grupal mata la actividad presencial. Por eso el MVP limita el chat a favor del compromiso rápido y coordina via email o WhatsApp grupal.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-warm-100 shadow-elevation-1">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-[#2D9E6B] mb-3">
            <Landmark className="w-5 h-5 text-[#2D9E6B]" />
            4. Infraestructura Invisible
          </h3>
          <p className="text-sm text-neutral-warm-700">
            La solución no es fundar nuevos clubes u organizar masivamente eventos artificiales. En Mar del Plata y Latinoamérica, ya existe una inmensa infraestructura social informal:
          </p>
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            <div className="bg-neutral-warm-50 p-2 rounded-lg text-center font-medium">Clubes de Barrio</div>
            <div className="bg-neutral-warm-50 p-2 rounded-lg text-center font-medium">Plazas & Deporte</div>
            <div className="bg-neutral-warm-50 p-2 rounded-lg text-center font-medium">Cafeterías & Jams</div>
            <div className="bg-neutral-warm-50 p-2 rounded-lg text-center font-medium">Centros Culturales</div>
          </div>
          <p className="text-xs text-neutral-warm-500 mt-3 italic">
            El valor diferencial del producto consiste en hacer visible este tejido urbano mediante un portal simplificado y seguro.
          </p>
        </div>
      </div>
    </div>
  );
}
