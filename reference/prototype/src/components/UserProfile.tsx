import React, { useState } from 'react';
import { User, Plan, Review } from '../types';
import { Star, Sparkles, LogOut, Check, Sliders, Milestone, CalendarCheck, ShieldCheck, Heart, UserCheck } from 'lucide-react';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
  onUpgrade: () => void;
  plans: Plan[];
  reviews: Review[];
}

export default function UserProfile({
  user,
  onLogout,
  onUpgrade,
  plans,
  reviews
}: UserProfileProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isProcessingPurchase, setIsProcessingPurchase] = useState(false);

  const userCreatedPlans = plans.filter(p => p.creatorId === user.id);
  const userJoinedPlans = plans.filter(p => p.joinedUserIds.includes(user.id) && p.creatorId !== user.id);
  const userReviews = reviews.filter(r => r.reviewerId !== user.id && r.reviewerId === user.id); // reviews written

  const handlePurchase = () => {
    setIsProcessingPurchase(true);
    setTimeout(() => {
      onUpgrade();
      setIsProcessingPurchase(false);
      setShowUpgradeModal(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#FDFAF5]">
      {/* Profile Header bar */}
      <div className="h-11 bg-[#FDFAF5] border-b border-[#ededf2]/55 px-4 flex items-center justify-between shrink-0">
        <span className="font-display font-semibold text-xs text-[#362E1C]">Mi Perfil</span>
        <button
          onClick={onLogout}
          className="text-red-500 hover:bg-red-50/50 p-1.5 rounded-lg text-3xs font-bold leading-none uppercase tracking-wide flex items-center gap-1"
        >
          <LogOut size={10} />
          <span>Salir</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Identity Profile Badge */}
        <div className="bg-white border border-[#ededf2]/75 p-4 rounded-2xl flex flex-col items-center text-center space-y-2 relative shadow-2xs">
          {user.isPremium && (
            <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[8px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5 shadow-sm">
              <Sparkles size={8} />
              <span>Plus</span>
            </span>
          )}

          <div className="relative">
            <img
              src={user.photoUrl}
              alt={user.name}
              className={`w-18 h-18 rounded-full object-cover border-4 ${user.isPremium ? 'border-amber-400' : 'border-[#F5EFE0]'}`}
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <h2 className="font-display font-bold text-base text-[#362E1C] tracking-tight">{user.name}</h2>
            <p className="text-3xs text-[#574B30]/75">{user.zone}, {user.city}</p>
          </div>

          <div className="text-3xs font-semibold text-[#574B30]/90 bg-[#F5EFE0]/65 px-3 py-1 rounded-full">
            📱 {user.phone}
          </div>
        </div>

        {/* Reputation Dual Indicators strictly matching */}
        <div className="grid grid-cols-2 gap-2 text-center text-3xs font-semibold">
          {/* As participant */}
          <div className="bg-white border border-[#ededf2] p-3 rounded-xl space-y-1">
            <span className="text-[#574B30]/75 uppercase font-extrabold tracking-wider block">Como Participante</span>
            <div className="flex items-center justify-center gap-0.5 text-xs font-black text-[#1A4F7A]">
              <Star size={11} fill="#1A4F7A" className="text-[#1A4F7A]" />
              <span>{user.participantRating.toFixed(1)}</span>
            </div>
            <span className="text-gray-400 block font-normal">{user.plansAsParticipantCount} asistidos</span>
          </div>

          {/* As Creator */}
          <div className="bg-white border border-[#ededf2] p-3 rounded-xl space-y-1">
            <span className="text-[#574B30]/75 uppercase font-extrabold tracking-wider block">Como Organizador</span>
            <div className="flex items-center justify-center gap-0.5 text-xs font-black text-amber-600">
              <Star size={11} fill="#D97706" className="text-amber-500" />
              <span>{user.plansAsCreatorCount > 0 ? user.creatorRating.toFixed(1) : 'Nuevo'}</span>
            </div>
            <span className="text-gray-400 block font-normal">{user.plansAsCreatorCount} creados</span>
          </div>
        </div>

        {/* Premium upsell tier promotion */}
        {!user.isPremium ? (
          <div className="bg-gradient-to-tr from-[#1A4F7A] to-[#103D61] p-4 rounded-xl text-white space-y-2.5 shadow-md">
            <div className="flex items-center gap-1.5 border-b border-white/10 pb-2">
              <Sparkles size={16} className="text-amber-300 fill-amber-300 shrink-0" />
              <h3 className="font-display font-extrabold text-xs tracking-wide uppercase">Mejorar a Conecta Plus</h3>
            </div>
            <p className="text-[11px] leading-relaxed text-white/90">
              Accede a planes ilimitados creados y asistidos por mes, prioridad en cupos, e imágenes con IA ilimitadas. ¡Por solo $4.900 ARS/mes!
            </p>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full h-8.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:scale-[1.01] transition duration-200 text-[#00385d] rounded-full font-black text-3xs uppercase tracking-widest shadow-xs"
              id="upgrade-conecta-plus-btn"
            >
              Conocer beneficios
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-tr from-[#1A4F7A]/5 to-[#103D61]/5 border border-[#1A4F7A]/20 p-3 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-[#1A4F7A]" size={18} />
              <div>
                <span className="font-bold text-[#362E1C] block">Membresía Plus Activa</span>
                <span className="text-3xs text-[#574B30]">Insignia verificada en tu perfil</span>
              </div>
            </div>
            <span className="text-3xs font-extrabold text-[#1A4F7A]">PREMIUM</span>
          </div>
        )}

        {/* Stats segment block */}
        <div className="bg-white border border-[#ededf2] rounded-xl p-3 space-y-2">
          <span className="block text-2xs font-extrabold text-[#574B30] uppercase tracking-wider">Historial de Actividades</span>
          <div className="grid grid-cols-3 gap-2 text-center text-3xs font-semibold py-1">
            <div className="border-r border-[#ededf2]/60 last:border-0">
              <span className="text-lg font-bold text-[#362E1C]">{userCreatedPlans.length}</span>
              <span className="text-gray-400 block font-normal">Creaciones</span>
            </div>
            <div className="border-r border-[#ededf2]/60 last:border-0">
              <span className="text-lg font-bold text-[#362E1C]">{userJoinedPlans.length}</span>
              <span className="text-gray-400 block font-normal">Suscripciones</span>
            </div>
            <div className="last:border-0">
              <span className="text-lg font-bold text-[#1A4F7A]">{user.noShowCount}</span>
              <span className="text-gray-400 block font-normal">No Shows ⚠️</span>
            </div>
          </div>
        </div>

        {/* User interests */}
        <div className="space-y-1.5">
          <span className="block text-2xs font-extrabold text-[#574B30] uppercase tracking-wider">Intereses</span>
          <div className="flex flex-wrap gap-1.5">
            {user.interests.map(interest => (
              <span key={interest} className="px-2.5 py-1 bg-[#F5EFE0]/65 text-[#574B30] border border-[#ededf2] text-3xs font-bold rounded-full">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Subscription Overlay Modal matching IAP specifications */}
      {showUpgradeModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-end justify-center z-50">
          <div className="bg-[#FDFAF5] w-full max-h-[85%] rounded-t-2xl p-5 space-y-4 shadow-2xl animate-slideUp overflow-y-auto">
            <div className="flex justify-between items-start border-b border-[#ededf2] pb-3">
              <div>
                <span className="text-[10px] uppercase font-black text-amber-600 tracking-widest flex items-center gap-0.5">
                  <Sparkles size={10} fill="currentColor" /> Conecta Plus
                </span>
                <h3 className="font-display font-bold text-lg text-[#362E1C] tracking-tight">Potenciá tu Red Social</h3>
              </div>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="p-1 text-gray-400 hover:bg-[#F5EFE0] rounded-full"
              >
                <X size={16} />
              </button>
            </div>

            {/* Price badge */}
            <div className="bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/25 text-center">
              <span className="text-3xs text-[#574B30] uppercase font-bold block">Acceso Preferencial</span>
              <span className="text-xl font-black text-amber-700">$4.900 ARS</span>
              <span className="text-3xs text-gray-500 font-semibold block mt-0.5">Suscripción mensual recurrente vía Apple IAP</span>
            </div>

            {/* List benefits */}
            <div className="space-y-2.5 text-xs text-[#574B30]">
              {[
                'Inscripciones ILIMITADAS: sumate a todos los planes que gustes.',
                'Creación ILIMITADA: armá más de 2 planes por mes sin límites.',
                'Reserva Prioritaria: obtené lugar 24hs antes en planes concurridos.',
                'Regeneraciones de IA: reintenta fotos creativas de cobertura.',
                'Insignia Unificada de verificación de perfil.'
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <Check size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-snug text-3xs font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#ededf2] space-y-2 shrink-0">
              <button
                onClick={handlePurchase}
                disabled={isProcessingPurchase}
                className="w-full h-11 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                {isProcessingPurchase ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Suscribirse con Apple Pay 💳</span>
                  </>
                )}
              </button>
              <span className="text-[9px] text-[#574B30]/60 block text-center">Apple App Store Guidelines: Cancela libremente en ajustes del dispositivo.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Small mock helper for the X button to build successfully
function X({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
