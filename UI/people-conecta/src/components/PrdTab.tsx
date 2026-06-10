import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertCircle, TrendingUp, Settings, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function PrdTab() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    vision: true,
    scope: false,
    monetization: false,
    metrics: false,
    risks: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 text-neutral-warm-800 p-1 md:p-4">
      {/* Header */}
      <div className="border-b border-neutral-warm-200 pb-4">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-warm-800 flex items-center gap-2">
          <FileText className="text-[#FF6347] w-8 h-8" />
          Documento de Requerimientos de Producto (PRD) — MVP
        </h2>
        <p className="text-neutral-warm-600 mt-2">
          Definición del catálogo funcional de People Conecta para Mar del Plata, Argentina.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {/* Section 1: Vision */}
        <div className="border border-neutral-warm-200 rounded-2xl bg-white overflow-hidden shadow-elevation-1">
          <button 
            type="button"
            onClick={() => toggleSection('vision')}
            className="w-full flex justify-between items-center p-5 font-semibold text-left text-neutral-warm-900 bg-neutral-warm-50 hover:bg-neutral-warm-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              1. Visión y Propuesta de Valor
            </span>
            {openSections.vision ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {openSections.vision && (
            <div className="p-6 space-y-4 text-sm text-neutral-warm-700 leading-relaxed border-t border-neutral-warm-200">
              <p>
                <strong>People Conecta</strong> es una plataforma diseñada para jóvenes de 18 a 35 años que transicionan hacia nuevas etapas de vida en Mar del Plata. Conecta a personas en aislamiento con actividades reducidas ya existentes en su ciudad.
              </p>
              <div className="p-4 bg-[#E6F7F7] text-[#005555] rounded-xl font-medium">
                "En menos de 3 clics, encontrás un grupo real haciendo algo que te gusta, cerca de donde vivís, esta semana."
              </div>
              <p>
                <strong>Principio rector del MVP:</strong> El dispositivo móvil ejerce de <em>gateway</em> para salir a la calle, desalentando la adicción digital pasiva.
              </p>
            </div>
          )}
        </div>

        {/* Section 2: Scope */}
        <div className="border border-neutral-warm-200 rounded-2xl bg-white overflow-hidden shadow-elevation-1">
          <button 
            type="button"
            onClick={() => toggleSection('scope')}
            className="w-full flex justify-between items-center p-5 font-semibold text-left text-neutral-warm-900 bg-neutral-warm-50 hover:bg-neutral-warm-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-indigo-500" />
              2. Alcance del MVP (In & Out of Scope)
            </span>
            {openSections.scope ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {openSections.scope && (
            <div className="p-6 space-y-4 text-sm text-neutral-warm-700 leading-relaxed border-t border-neutral-warm-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <h4 className="font-semibold text-emerald-900 mb-2">IN SCOPE (Se incluye en MVP)</h4>
                  <ul className="space-y-2 text-emerald-800 list-disc list-inside">
                    <li>Descubrimiento de eventos y filtrado hiperlocal.</li>
                    <li>Registro por SMS/Teléfono simulado + Onboarding en 3 pasos.</li>
                    <li>Ficha extendida de actividad con lista integrada de compañeros.</li>
                    <li>Creación de eventos por Organizadores Locales.</li>
                    <li>Visualización de métricas de Organizador del evento.</li>
                    <li>Inscripciones con control de cupos y penalización de no-shows.</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                  <h4 className="font-semibold text-red-900 mb-2">OUT OF SCOPE (Futuras Versiones)</h4>
                  <ul className="space-y-2 text-red-800 list-disc list-inside">
                    <li>Mensajería / Chat integrado libre (fomenta la dilación virtual).</li>
                    <li>Algoritmos avanzados de compatibilidad de IA.</li>
                    <li>Pago directo integrado y pasarela bancaria.</li>
                    <li>Aplicación nativa (Android / iOS con compilación Swift).</li>
                    <li>Mapa dinámico GPS en tiempo real.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Monetization */}
        <div className="border border-neutral-warm-200 rounded-2xl bg-white overflow-hidden shadow-elevation-1">
          <button 
            type="button"
            onClick={() => toggleSection('monetization')}
            className="w-full flex justify-between items-center p-5 font-semibold text-left text-neutral-warm-900 bg-neutral-warm-50 hover:bg-neutral-warm-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              3. Modelo de Monetización
            </span>
            {openSections.monetization ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {openSections.monetization && (
            <div className="p-6 space-y-4 text-sm text-neutral-warm-700 leading-relaxed border-t border-neutral-warm-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-neutral-warm-200 p-4 rounded-xl">
                  <h4 className="font-semibold text-neutral-warm-900 mb-2">Usuario Free</h4>
                  <p className="text-neutral-warm-600 mb-2">Asiste gratis, pero con límites:</p>
                  <ul className="space-y-1 list-disc list-inside text-neutral-warm-600">
                    <li>Unirse a un máximo de 2 eventos mensuales.</li>
                    <li>Búsqueda estándar por geozona.</li>
                    <li>Perfil e historial básico.</li>
                  </ul>
                </div>

                <div className="border border-primary/30 bg-primary-container/20 p-4 rounded-xl">
                  <h4 className="font-semibold text-primary mb-2">Conecta Plus (Premium - ARS 4.900/mes)</h4>
                  <p className="text-neutral-on-primary-container mb-2 text-xs font-semibold uppercase">Beneficios:</p>
                  <ul className="space-y-1 list-disc list-inside text-neutral-warm-700">
                    <li>Inscripciones ilimitadas sin cupo máximo mensual.</li>
                    <li>Soporte de reserva preferencial: reserva 24 horas antes.</li>
                    <li>Filtros extra avanzados por intereses y compatibilidad.</li>
                    <li>Insignia visual de Verificación Plus destacada.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Metrics */}
        <div className="border border-neutral-warm-200 rounded-2xl bg-white overflow-hidden shadow-elevation-1">
          <button 
            type="button"
            onClick={() => toggleSection('metrics')}
            className="w-full flex justify-between items-center p-5 font-semibold text-left text-neutral-warm-900 bg-neutral-warm-50 hover:bg-neutral-warm-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-rose-500" />
              4. Métricas de Éxito
            </span>
            {openSections.metrics ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {openSections.metrics && (
            <div className="p-6 space-y-4 text-sm text-neutral-warm-700 leading-relaxed border-t border-neutral-warm-200">
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-neutral-warm-100 pb-2">
                  <span className="font-medium">Activación de Onboarding:</span>
                  <span className="font-bold text-primary">80% de inicios completados</span>
                </div>
                <div className="flex justify-between items-center border-b border-neutral-warm-100 pb-2">
                  <span className="font-medium">Tasa de Asistencia en Eventos ("Show up"):</span>
                  <span className="font-bold text-emerald-600">&gt; 70% de inscriptos</span>
                </div>
                <div className="flex justify-between items-center border-b border-neutral-warm-100 pb-2">
                  <span className="font-medium">Conversión a Suscriptor Premium:</span>
                  <span className="font-bold text-amber-600">5% de usuarios activos recurrentes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Retención D30:</span>
                  <span className="font-bold text-neutral-warm-900">25% (asisten al menos a 1 evento adicional al mes)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 5: Risks */}
        <div className="border border-neutral-warm-200 rounded-2xl bg-white overflow-hidden shadow-elevation-1">
          <button 
            type="button"
            onClick={() => toggleSection('risks')}
            className="w-full flex justify-between items-center p-5 font-semibold text-left text-neutral-warm-900 bg-neutral-warm-50 hover:bg-neutral-warm-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              5. Riesgos y Mitigación
            </span>
            {openSections.risks ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {openSections.risks && (
            <div className="p-6 space-y-4 text-sm text-neutral-warm-700 leading-relaxed border-t border-neutral-warm-200">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-neutral-warm-900">Aparición de mala conducta o engaños</h4>
                  <p className="text-neutral-warm-600">
                    Mitigación: Registro obligatorio por teléfono en el MVP. Los encuentros siempre comienzan nucleados en grupos reducidos y en locales públicos con anfitriones presentes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-warm-900">El estigma social de admitir "no tengo amigos"</h4>
                  <p className="text-neutral-warm-600">
                    Mitigación: Enfocarse primero en el hobby o interés común (Surf, Café, Cine-debate) y tratar el aspecto de compañerismo de forma secundaria. Es un plan común, no una terapia de grupo.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
