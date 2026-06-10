import React, { useState } from 'react';
import { Sparkles, MapPin, Target, Smile, Heart, ShieldAlert, CheckCircle } from 'lucide-react';
import { User } from '../types';

interface OnboardingFlowProps {
  onComplete: (user: Partial<User>) => void;
  user: Partial<User> | null;
  onApproveDemo: () => void;
}

export default function OnboardingFlow({ onComplete, user, onApproveDemo }: OnboardingFlowProps) {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [registrationReason, setRegistrationReason] = useState('Llegué nuevo a la ciudad');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [city, setCity] = useState('Mar del Plata');
  const [zone, setZone] = useState('');
  
  const reasons = [
    'Llegué nuevo a la ciudad 🎒',
    'Cambié de etapa de vida 🌱',
    'Quiero salir más y desconectar 🌊',
    'Hacer amigos locales 🐚'
  ];

  const availableInterests = [
    'Deportes',
    'Gastronomía',
    'Naturaleza',
    'Música',
    'Cine',
    'Arte',
    'Idiomas',
    'Juegos'
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      if (selectedInterests.length < 3) {
        setSelectedInterests([...selectedInterests, interest]);
      }
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!name || !phone) return;
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!zone) return;
      onComplete({
        name,
        phone,
        email: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        registrationReason,
        interests: selectedInterests,
        city,
        zone,
        photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", // beautiful clean profile photo
        status: 'pending',
        isPremium: false,
        joinedPlans: [],
        createdPlans: [],
        creatorRating: 0,
        participantRating: 5.0,
        plansAsCreatorCount: 0,
        plansAsParticipantCount: 0,
        noShowCount: 0
      });
    }
  };

  // If the user's registry already went through and is awaiting manual validation
  if (user && user.status === 'pending') {
    return (
      <div className="flex-1 flex flex-col justify-between p-6 bg-[#FDFAF5]">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
          {/* Wave animation simulation container */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-[#1A4F7A]/10 rounded-full flex items-center justify-center animate-pulse">
              <Smile size={42} className="text-[#1A4F7A]" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center border-2 border-[#FDFAF5]">
              <Sparkles size={11} className="text-white" />
            </div>
          </div>

          <h2 className="font-display font-bold text-2xl text-[#362E1C] tracking-tight mb-3">
            ¡Perfil Guardado!
          </h2>
          <p className="text-xs text-[#574B30] font-sans leading-relaxed mb-6">
            Hola <span className="font-semibold text-[#1A4F7A]">{user.name}</span>. Para asegurar la confianza grupal, el fundador de People Conecta aprueba manualmente cada cuenta certificando que sea un vecino real.
          </p>

          {/* Pending Status Box */}
          <div className="w-full bg-[#F5EFE0] p-4 rounded-xl border border-[#ededf2] text-left space-y-2.5 mb-6">
            <div className="flex items-center gap-1.5 text-amber-600 font-semibold text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
              <span>Verificación de Onboarding Pendiente</span>
            </div>
            <div className="text-3xs text-[#574B30] space-y-1">
              <div>• <span className="font-semibold">Sede:</span> Mar del Plata & Chapadmalal</div>
              <div>• <span className="font-semibold">Zonal:</span> {user.zone}, {user.city}</div>
              <div>• <span className="font-semibold">Verificación SMS:</span> Teléfono Registrado {user.phone}</div>
              <div>• <span className="font-semibold">Intereses:</span> {(user.interests || []).join(', ')}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#1A4F7A]/5 border border-[#1A4F7A]/15 rounded-lg p-3 text-left">
            <ShieldAlert size={16} className="text-[#1A4F7A] inline-block shrink-0" />
            <p className="text-[11px] text-[#574B30] leading-snug">
              Haz clic en el botón <span className="font-bold">"Aprobar Perfil"</span> del panel lateral del navegador para simular instantáneamente la aprobación del fundador y entrar al feed de planes.
            </p>
          </div>
        </div>

        {/* Demo Fast-Approval helper inside */}
        <button
          onClick={onApproveDemo}
          className="w-full h-11 bg-[#1A4F7A] hover:bg-[#1A4F7A]/90 text-white rounded-full font-bold flex items-center justify-center gap-1.5 shadow"
        >
          <span>Continuar como Tester (Ignorar cola)</span>
          <CheckCircle size={15} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#FDFAF5]">
      {/* Onboarding Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold text-[#1A4F7A] tracking-wider uppercase">Paso {step} de 3</span>
          <span className="text-[10px] text-[#574B30] font-semibold bg-[#F5EFE0] px-2 py-0.5 rounded-full">
            {step === 1 ? 'Identidad' : step === 2 ? 'Propósito' : 'Zona Costera'}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#F5EFE0] rounded-full mb-6">
          <div 
            className="h-full bg-[#1A4F7A] rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Dynamic step rendering */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="font-display font-bold text-2xl text-[#362E1C] tracking-tight mb-1.5">
                Creá tu perfil
              </h2>
              <p className="text-xs text-[#574B30] leading-relaxed mb-4">
                Usa tu nombre real y celular. People Conecta es para gente cercana que se junta posta en la calle.
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-2xs font-extrabold text-[#574B30] uppercase mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Clara Soler"
                  className="w-full h-10 px-3 bg-white border border-[#ededf2] rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#1A4F7A]"
                />
              </div>

              <div>
                <label className="block text-2xs font-extrabold text-[#574B30] uppercase mb-1">Teléfono Móvil (SMS)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej: +54 9 223 123-4567"
                  className="w-full h-10 px-3 bg-white border border-[#ededf2] rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#1A4F7A]"
                />
                <span className="text-[10px] text-[#574B30]/70 mt-1 block">Importante: Requerido para coordinar los encuentros reales de manera segura.</span>
              </div>

              <div>
                <label className="block text-2xs font-extrabold text-[#574B30] uppercase mb-1">Email (Opcional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ej: clara@example.com"
                  className="w-full h-10 px-3 bg-white border border-[#ededf2] rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#1A4F7A]"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="font-display font-bold text-2xl text-[#362E1C] tracking-tight mb-1.5">
                ¿Por qué estás acá?
              </h2>
              <p className="text-xs text-[#574B30] leading-relaxed mb-4">
                Decinos tu momento actual para recomendarte planes ideales cerca.
              </p>
            </div>

            <div className="space-y-2.5">
              {reasons.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setRegistrationReason(reason)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition ${
                    registrationReason === reason
                      ? 'bg-[#1A4F7A] border-[#1A4F7A] text-white'
                      : 'bg-white border-[#ededf2] text-[#362E1C] hover:bg-[#F5EFE0]/50'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="font-display font-bold text-2xl text-[#362E1C] tracking-tight mb-1.5">
                Tus gustos y zona
              </h2>
              <p className="text-xs text-[#574B30] leading-relaxed mb-4">
                Seleccioná hasta 3 intereses y dinos tu zona (barrio) de Mar de Plata / Chapadmalal.
              </p>
            </div>

            {/* Interest chip selector */}
            <div>
              <label className="block text-2xs font-extrabold text-[#574B30] uppercase mb-2">Intereses (Elegí hasta 3)</label>
              <div className="flex flex-wrap gap-1.5">
                {availableInterests.map((interest) => {
                  const selected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-full text-2xs font-bold transition ${
                        selected
                          ? 'bg-[#1A4F7A] text-white'
                          : 'bg-[#F5EFE0] text-[#574B30] hover:bg-opacity-80'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3.5 pt-3">
              <div>
                <label className="block text-2xs font-extrabold text-[#574B30] uppercase mb-1">Ciudad</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full h-10 px-2.5 bg-white border border-[#ededf2] rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#1A4F7A]"
                >
                  <option value="Mar del Plata">Mar del Plata 🌅</option>
                  <option value="Chapadmalal">Chapadmalal 🏄‍♂️</option>
                </select>
              </div>

              <div>
                <label className="block text-2xs font-extrabold text-[#574B30] uppercase mb-1">Barrio / Punto de referencia cercano</label>
                <input
                  type="text"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  placeholder="Ej: Playa Grande, Stella Maris o Güemes..."
                  className="w-full h-10 px-3 bg-white border border-[#ededf2] rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#1A4F7A]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Persistence and trigger action drawer buttons */}
      <div className="pt-4 mt-4 border-t border-[#ededf2]/50">
        <button
          onClick={handleNext}
          disabled={step === 1 ? (!name || !phone) : step === 3 ? !zone : false}
          className={`w-full h-11 font-semibold flex items-center justify-center gap-1.5 rounded-full shadow transition ${
            (step === 1 && (!name || !phone)) || (step === 3 && !zone)
              ? 'bg-[#1A4F7A]/30 text-white/50 cursor-not-allowed'
              : 'bg-[#1A4F7A] hover:bg-[#1A4F7A]/90 text-white'
          }`}
        >
          <span>Siguiente</span>
          <span>→</span>
        </button>
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="w-full mt-2 py-1 flex items-center justify-center text-3xs font-extrabold text-[#574B30] uppercase tracking-widest hover:underline"
          >
            ← Volver
          </button>
        )}
      </div>
    </div>
  );
}
