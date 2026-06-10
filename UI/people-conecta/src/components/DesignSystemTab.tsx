import React, { useState } from 'react';
import { Palette, Baseline, PlusCircle, Check, MapPin, Calendar, Star, CheckCircle, Info } from 'lucide-react';

export default function DesignSystemTab() {
  const [testText, setTestText] = useState('Probando input del Design System');
  const [selectedChip, setSelectedChip] = useState('música');

  return (
    <div className="space-y-8 text-neutral-warm-800 p-1 md:p-4">
      {/* Header */}
      <div className="border-b border-neutral-warm-200 pb-4">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-warm-800 flex items-center gap-2">
          <Palette className="text-[#00A8A8] w-8 h-8" />
          Sistema de Diseño v1.0 — People Conecta
        </h2>
        <p className="text-neutral-warm-600 mt-2">
          Tokens interactivos y componentes atómicos basados en la paleta <strong>Warm Sand + Ocean Teal</strong>.
        </p>
      </div>

      {/* Grid of details */}
      <div className="space-y-8">
        
        {/* Colors Swatches section */}
        <div>
          <h3 className="text-xl font-bold text-neutral-warm-800 mb-4 flex items-center gap-2">
            <span className="p-1.5 bg-[#E6F7F7] rounded-lg">🎨</span> Solución Cromática (Arena + Océano)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Arena */}
            <div className="bg-[#FDFAF4] border border-neutral-warm-200 p-4 rounded-xl shadow-elevation-1">
              <div className="h-12 bg-[#FDFAF4] border border-neutral-warm-200 rounded-lg mb-2"></div>
              <p className="font-bold text-xs">Fondo Arena (sand-50)</p>
              <p className="font-mono text-[10px] text-neutral-warm-500">#FDFAF4</p>
            </div>

            {/* Surface Warm */}
            <div className="bg-white border border-neutral-warm-200 p-4 rounded-xl shadow-elevation-1">
              <div className="h-12 bg-[#F7F1E3] rounded-lg mb-2"></div>
              <p className="font-bold text-xs">Caja Base (sand-100)</p>
              <p className="font-mono text-[10px] text-neutral-warm-500">#F7F1E3</p>
            </div>

            {/* Primary Ocean Teal */}
            <div className="bg-white border border-neutral-warm-200 p-4 rounded-xl shadow-elevation-1">
              <div className="h-12 bg-[#00A8A8] rounded-lg mb-2"></div>
              <p className="font-bold text-xs">Océano Principal (primary)</p>
              <p className="font-mono text-[10px] text-neutral-warm-500">#00A8A8</p>
            </div>

            {/* On primary container */}
            <div className="bg-white border border-neutral-warm-200 p-4 rounded-xl shadow-elevation-1">
              <div className="h-12 bg-[#005555] rounded-lg mb-2"></div>
              <p className="font-bold text-xs">Océano Obscuro (texts)</p>
              <p className="font-mono text-[10px] text-neutral-warm-500">#005555</p>
            </div>

            {/* Accent Coral Sunset */}
            <div className="bg-white border border-neutral-warm-200 p-4 rounded-xl shadow-elevation-1">
              <div className="h-12 bg-[#FF6347] rounded-lg mb-2"></div>
              <p className="font-bold text-xs">Coral Atardecer (secondary)</p>
              <p className="font-mono text-[10px] text-neutral-warm-500">#FF6347</p>
            </div>

            {/* Semantic Success */}
            <div className="bg-white border border-neutral-warm-200 p-4 rounded-xl shadow-elevation-1">
              <div className="h-12 bg-[#2D9E6B] rounded-lg mb-2"></div>
              <p className="font-bold text-xs">Confirmado (success)</p>
              <p className="font-mono text-[10px] text-neutral-warm-500">#2D9E6B</p>
            </div>

            {/* On Surface neutral-800 */}
            <div className="bg-white border border-neutral-warm-200 p-4 rounded-xl shadow-elevation-1">
              <div className="h-12 bg-[#2E2822] rounded-lg mb-2"></div>
              <p className="font-bold text-xs">Txt Principal (neutral-800)</p>
              <p className="font-mono text-[10px] text-neutral-warm-500">#2E2822</p>
            </div>

            {/* On Surface subtle neutral-600 */}
            <div className="bg-white border border-neutral-warm-200 p-4 rounded-xl shadow-elevation-1">
              <div className="h-12 bg-[#6B6055] rounded-lg mb-2"></div>
              <p className="font-bold text-xs">Txt Secundario (neutral-600)</p>
              <p className="font-mono text-[10px] text-neutral-warm-500">#6B6055</p>
            </div>

          </div>
        </div>

        {/* Fonts & Typography */}
        <div>
          <h3 className="text-xl font-bold text-neutral-warm-800 mb-4 flex items-center gap-2">
            <Baseline className="w-5 h-5 text-primary" />
            Fuentes Incorporadas
          </h3>
          <div className="bg-white border border-neutral-warm-200 p-6 rounded-2xl space-y-4">
            <div>
              <span className="text-xs text-neutral-warm-500 block uppercase tracking-wider font-mono">Display & Headings: Plus Jakarta Sans</span>
              <p className="text-3xl font-extrabold tracking-tight text-neutral-warm-800 mt-1">
                La Ola Perfecta de Mar del Plata
              </p>
            </div>
            <div className="border-t border-neutral-warm-150 pt-3">
              <span className="text-xs text-neutral-warm-500 block uppercase tracking-wider font-mono">Body & UI: DM Sans</span>
              <p className="text-base text-neutral-warm-700 mt-1 leading-relaxed">
                Nos juntamos cerca de las piedras de Cabo Corrientes / Varese a cantar canciones clásicas del rock nacional y compartir el calor del fuego al anochecer. No-shows recurrentes penalizan el sistema.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons Playground */}
        <div>
          <h3 className="text-xl font-bold text-neutral-warm-800 mb-4">
            🧪 Área de Prueba de Botones
          </h3>
          <div className="bg-white border border-neutral-warm-200 p-6 rounded-2xl">
            <div className="flex flex-wrap gap-4 items-center">
              
              <div>
                <p className="text-xs text-neutral-warm-500 mb-1 font-mono">1. FILLED (CTA principal)</p>
                <button type="button" className="py-3 px-6 h-[56px] rounded-full bg-primary text-white font-semibold shadow-elevation-1 hover:brightness-95 transition-all text-sm flex items-center gap-2">
                  <PlusCircle className="w-5 h-5" />
                  Me anoto gratis
                </button>
              </div>

              <div>
                <p className="text-xs text-neutral-warm-500 mb-1 font-mono">2. FILLED CORAL (CTAs urgentes)</p>
                <button type="button" className="py-3 px-6 h-[56px] rounded-full bg-[#FF6347] text-white font-semibold shadow-elevation-2 hover:brightness-95 transition-all text-sm flex items-center gap-2">
                  <span>🔥</span>
                  ¡Último cupo disponible!
                </button>
              </div>

              <div>
                <p className="text-xs text-neutral-warm-500 mb-1 font-mono">3. TONAL (CTA secundaria)</p>
                <button type="button" className="py-3 px-6 h-[56px] rounded-full bg-[#E6F7F7] text-[#005555] font-semibold hover:bg-[#b0e8e8] transition-all text-sm">
                  Ver participantes (12)
                </button>
              </div>

              <div>
                <p className="text-xs text-neutral-warm-500 mb-1 font-mono">4. OUTLINED (Acción menor)</p>
                <button type="button" className="py-2.5 px-5 h-[48px] rounded-full border border-neutral-warm-300 text-neutral-warm-700 hover:bg-neutral-warm-50 transition-all text-sm">
                  Cancelar inscripción
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Form Inputs & Interactive Chips inside DS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-neutral-warm-200 p-6 rounded-2xl">
            <h4 className="font-bold text-base text-neutral-warm-800 mb-3">Inputs Atómicos</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-warm-600 mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F7F1E3] text-[#2E2822] rounded-xl border border-transparent focus:border-primary/50 focus:outline-none transition-all text-sm"
                  placeholder="Ej. Santiago García"
                />
                <span className="text-[11px] text-neutral-warm-600 mt-1 block">Estado: {testText ? 'Listo' : 'Vacío'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-neutral-warm-200 p-6 rounded-2xl">
            <h4 className="font-bold text-base text-neutral-warm-800 mb-3">Chips Interactivos de Categoría</h4>
            <div className="flex flex-wrap gap-2">
              {['deporte', 'música', 'cocina', 'idiomas', 'naturaleza'].map((cat) => {
                const isActive = selectedChip === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedChip(cat)}
                    className={`px-4 py-2 h-10 rounded-full transition-all text-xs font-semibold flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-[#FFF0ED] border-2 border-[#FF6347] text-[#CC3318]' 
                        : 'bg-neutral-warm-50 border border-neutral-warm-200 text-neutral-warm-600 hover:bg-neutral-warm-100'
                    }`}
                  >
                    {isActive && <Check className="w-3.5 h-3.5 text-[#CC3318]" />}
                    <span className="capitalize">{cat}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-neutral-warm-500 mt-4">
              Al tocar se simula la alternancia entre filiaciones. El diseño adopta un borde contrastante color Coral para mayor asertividad del usuario.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
