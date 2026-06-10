import React, { useState } from 'react';
import { 
  Sparkles, Smartphone, FileText, Palette, Users, BookOpen, 
  MapPin, RefreshCw, Layers, CheckCircle2 
} from 'lucide-react';
import IosSimulator from './components/IosSimulator';
import AppScreens from './components/AppScreens';
import ResearchTab from './components/ResearchTab';
import DesignSystemTab from './components/DesignSystemTab';
import PrdTab from './components/PrdTab';

export default function App() {
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'simulation' | 'research' | 'design' | 'prd'>('simulation');

  // Simulator deep states
  const [currentTab, setCurrentTab] = useState('explorar');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [isOrganizerMode, setIsOrganizerMode] = useState(false);
  const [stateVersion, setStateVersion] = useState(0);

  // Notify of state transitions inside prototype
  const handleStateUpdate = () => {
    setStateVersion(v => v + 1);
  };

  // Reset local storage to default states
  const handleResetData = () => {
    if (window.confirm('¿Quieres restablecer todos los datos del simulador (planes, inscriptos, organizadores y valoraciones)?')) {
      localStorage.removeItem('pc_users');
      localStorage.removeItem('pc_organizers');
      localStorage.removeItem('pc_events');
      localStorage.removeItem('pc_curr_user');
      setSelectedEventId(null);
      setCurrentTab('explorar');
      setIsOnboarding(false);
      setIsOrganizerMode(false);
      handleStateUpdate();
      alert('¡Datos restablecidos a los valores por defecto de Mar del Plata!');
    }
  };

  // Launch Onboarding simulator
  const handleRestartOnboarding = () => {
    setIsOnboarding(true);
    setSelectedEventId(null);
    handleStateUpdate();
  };

  return (
    <div className="min-h-screen bg-[#F0EBE1] flex flex-col font-sans antialiased text-[#2E2822]">
      
      {/* 🧭 SYSTEM TOP NAVIGATION PANEL */}
      <header className="bg-[#FDFAF4] border-b border-neutral-warm-200 sticky top-0 z-40 px-4 py-3 shadow-elevation-1">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          
          {/* Logo element with Mar del Plata references */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-elevation-1">
              🌊
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight flex items-center gap-1 leading-tight">
                People Conecta <span className="text-xs bg-[#FFF0ED] text-[#CC3318] px-2 py-0.5 rounded font-black tracking-widest">MVP PROTOTYPE</span>
              </h1>
              <p className="text-[10px] text-neutral-warm-600 font-medium">Gateway de Vida Social Presencial · Mar del Plata 2026</p>
            </div>
          </div>

          {/* Core high-level tabs for workspace audit */}
          <div className="flex bg-neutral-warm-105 p-1 rounded-xl border border-neutral-warm-250 shrink-0">
            <button
              type="button"
              onClick={() => setActiveWorkspaceTab('simulation')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeWorkspaceTab === 'simulation' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-neutral-warm-600 hover:text-neutral-warm-850'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>📱 Simulador App</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveWorkspaceTab('research')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeWorkspaceTab === 'research' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-neutral-warm-600 hover:text-neutral-warm-850'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>🔬 Investigación</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveWorkspaceTab('design')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeWorkspaceTab === 'design' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-neutral-warm-600 hover:text-neutral-warm-850'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>🎨 Design System</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveWorkspaceTab('prd')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeWorkspaceTab === 'prd' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-neutral-warm-600 hover:text-neutral-warm-850'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>📄 PRD MVP</span>
            </button>
          </div>

        </div>
      </header>

      {/* 🚀 RESPONSIVE WORKSPACE WRAPPER */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-6">
        
        {/* Desktop dual display layout or single tab focus according to selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDE COLUMN: The iPhone simulator. Always displayed on desktop view if active tab is simulation, or stays as the central hub. */}
          <div className={`lg:col-span-5 flex flex-col items-center ${activeWorkspaceTab === 'simulation' ? 'block' : 'hidden lg:block'}`}>
            <h3 className="text-xs font-bold text-neutral-warm-600 uppercase tracking-widest mb-3 text-center hidden lg:block">
              📱 Dispositivo de pruebas
            </h3>
            
            <IosSimulator 
              onResetData={handleResetData}
              onRestartOnboarding={handleRestartOnboarding}
            >
              <AppScreens 
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                selectedEventId={selectedEventId}
                setSelectedEventId={setSelectedEventId}
                isOnboarding={isOnboarding}
                setIsOnboarding={setIsOnboarding}
                isOrganizerMode={isOrganizerMode}
                setIsOrganizerMode={setIsOrganizerMode}
                onStateUpdate={handleStateUpdate}
              />
            </IosSimulator>
          </div>

          {/* RIGHT SIDE COLUMN: Exhibits details/spec docs or displays active audit. */}
          <div className={`bg-[#FDFAF4] rounded-3xl p-4 md:p-6 border border-neutral-warm-200 shadow-elevation-2 min-h-[600px] ${
            activeWorkspaceTab === 'simulation' ? 'lg:col-span-7 hidden lg:block' : 'col-span-12'
          }`}>
            
            {activeWorkspaceTab === 'simulation' && (
              <div className="space-y-6">
                <div className="border-b border-neutral-warm-250 pb-4">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="text-2xl">🌴</span>
                    <h2 className="text-2xl font-extrabold tracking-tight">Bienvenido a la Demo de People Conecta</h2>
                  </div>
                  <p className="text-xs text-neutral-warm-600 mt-1">
                    Esta versión simula detalladamente la vida social argentina (Mar del Plata). Explorá la barra lateral o interactuá con el teléfono simulado.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-white rounded-2xl border border-sand-150 shadow-sm space-y-1.5">
                    <span className="font-extrabold text-xs text-primary flex items-center gap-1">
                      <span>🏄‍♂️</span> Flujo 1: Explorador
                    </span>
                    <p className="text-[11px] text-neutral-warm-600 leading-normal">
                      Buscá actividades por interés (Surf, Fogón, Juegos). Revisa los cupos dinámicos que se contraen o expanden con alertas de <strong>"Último cupo"</strong>.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-sand-150 shadow-sm space-y-1.5">
                    <span className="font-extrabold text-xs text-primary flex items-center gap-1">
                      <span>📥</span> Flujo 2: Onboarding
                    </span>
                    <p className="text-[11px] text-neutral-warm-600 leading-normal">
                      Hacé click en "Onboarding" abajo de la pantalla para simular el registro en 4 pasos (Intereses, Zona preferida de Mar del Plata y número verificado).
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-sand-150 shadow-sm space-y-1.5">
                    <span className="font-extrabold text-xs text-[#FF6347] flex items-center gap-1">
                      <span>✨</span> Plus & Premium
                    </span>
                    <p className="text-[11px] text-neutral-warm-600 leading-normal">
                      Entrá a la pestaña Perfil, convertite a <strong>Conecta Plus</strong> y desbloqueá el límite de reservas mensuales con tu insignia brillante.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-sand-150 shadow-sm space-y-1.5">
                    <span className="font-extrabold text-xs text-[#FF6347] flex items-center gap-1">
                      <span>➕</span> Flujo 3: Organizadores
                    </span>
                    <p className="text-[11px] text-neutral-warm-600 leading-normal">
                      Hacé click en la pestaña <strong>"Publicar"</strong>, completá el formulario de evento y velo listado al instante en la cartelera del simulador.
                    </p>
                  </div>
                </div>

                {/* Integration checklist */}
                <div className="bg-sand-100 p-4 rounded-2xl border border-sand-200">
                  <h4 className="font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1 text-neutral-warm-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Auditoría del Design System & PRD
                  </h4>
                  <ul className="text-xs space-y-2 text-neutral-warm-600 leading-relaxed">
                    <li className="flex gap-1.5 items-start">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Accesibilidad WCAG 2.1 AA</strong> integrada (Bordes claros de 3:1, contrastes altos para textos en body, touch target de 48px).</span>
                    </li>
                    <li className="flex gap-1.5 items-start">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Mapeo de la costa:</strong> Playa Grande, Cabo Corrientes, Varese y Güemes representados en el mapa local de eventos.</span>
                    </li>
                    <li className="flex gap-1.5 items-start">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span><strong>Onboarding reactivo:</strong> se recalculan las búsquedas acorde a los intereses del perfil registrado.</span>
                    </li>
                  </ul>
                </div>

                {/* App summary */}
                <p className="text-xs text-neutral-warm-500 italic text-center pt-8">
                  Usá las pestañas superiores para leer detalladamente los documentos de investigación de soledad en jóvenes adultos.
                </p>
              </div>
            )}

            {activeWorkspaceTab === 'research' && <ResearchTab />}
            {activeWorkspaceTab === 'design' && <DesignSystemTab />}
            {activeWorkspaceTab === 'prd' && <PrdTab />}

          </div>

        </div>

      </main>

      {/* system footer footer */}
      <footer className="bg-neutral-warm-110 border-t border-neutral-warm-250 py-6 px-4 text-center mt-12 bg-[#FDFAF4]">
        <p className="text-xs text-[#6B6055] leading-relaxed">
          <strong>People Conecta</strong> — Desarrollado estrictamente según el Design System v1.0 y alineado con los requerimientos del PRD de Mar del Plata.
        </p>
        <p className="text-[10px] text-neutral-warm-500 mt-1">
          Stack de desarrollo: React 19 + Tailwind CSS v4 + Lucide Icons + LocalStorage para persistencia offline.
        </p>
      </footer>
    </div>
  );
}
