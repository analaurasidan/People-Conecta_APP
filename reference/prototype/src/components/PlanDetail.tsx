import React from 'react';
import { ArrowLeft, MapPin, Calendar, Users, Sparkles, MessageSquare, Info, ShieldCheck, DollarSign, Star } from 'lucide-react';
import { Plan, User } from '../types';

interface PlanDetailProps {
  plan: Plan;
  onBack: () => void;
  onJoin: (planId: string) => void;
  onLeave: (planId: string) => void;
  onEnterChat: (planId: string) => void;
  currentUser: User | null;
  allUsers: User[];
}

export default function PlanDetail({
  plan,
  onBack,
  onJoin,
  onLeave,
  onEnterChat,
  currentUser,
  allUsers
}: PlanDetailProps) {
  // Find host details
  const host = allUsers.find(u => u.id === plan.creatorId);
  const isJoined = currentUser ? plan.joinedUserIds.includes(currentUser.id) : false;
  const isCreator = currentUser ? plan.creatorId === currentUser.id : false;

  // Resolve participants info using ids list
  const participants = allUsers.filter(u => plan.joinedUserIds.includes(u.id));

  const isFull = plan.joinedUserIds.length >= plan.maxCups;
  
  // Chat activates if Joined and at least 2 people confirmed (Creator + 1)
  const chatActivated = plan.joinedUserIds.length >= 2;

  return (
    <div className="flex-1 flex flex-col bg-[#FDFAF5]">
      {/* Detail Sticky Header bar */}
      <div className="h-11 bg-[#FDFAF5] border-b border-[#ededf2]/55 px-4 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-1 text-[#1A4F7A] hover:bg-[#F5EFE0]/50 rounded-lg">
          <ArrowLeft size={16} />
        </button>
        <span className="font-display font-semibold text-xs text-[#362E1C] truncate">Detalle del Plan</span>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Cover Photo */}
        <div className="h-48 relative bg-[#F5EFE0]">
          <img
            src={plan.imageUrl}
            alt={plan.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="absolute bottom-3 left-3 bg-[#00385d] text-white text-3xs font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider shadow">
            {plan.category}
          </span>
        </div>

        {/* Content area */}
        <div className="p-4 space-y-4">
          {/* Title */}
          <div className="space-y-1">
            <h2 className="font-display font-bold text-lg text-[#362E1C] tracking-tight leading-snug">
              {plan.title}
            </h2>
            <div className="flex items-center justify-between gap-3 bg-white border border-[#ededf2]/55 p-3 rounded-xl shadow-3xs mt-1.5">
              <div className="flex items-center gap-1.5 text-xs text-[#574B30]">
                <Calendar size={13} className="text-[#1A4F7A] shrink-0" />
                <span className="font-semibold">{plan.date} • {plan.time} hs</span>
              </div>

              {currentUser && (
                <button
                  onClick={() => {
                    if (isCreator) {
                      // creator logic
                    } else if (isJoined) {
                      onLeave(plan.id);
                    } else {
                      onJoin(plan.id);
                    }
                  }}
                  disabled={isFull && !isJoined && !isCreator}
                  className={`px-3 py-1.5 rounded-full font-sans font-bold text-[10px] uppercase tracking-wider transition-all duration-150 shrink-0 ${
                    isCreator
                      ? 'bg-amber-100 text-amber-800 border border-amber-200/50 cursor-default'
                      : isJoined
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : isFull
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#1A4F7A] text-white hover:bg-[#103D61] hover:scale-102 active:scale-98 shadow-3xs'
                  }`}
                  id={`detail-quick-join-btn-${plan.id}`}
                >
                  {isCreator 
                    ? '👑 Organizas' 
                    : isJoined 
                    ? '✓ Sumado' 
                    : isFull 
                    ? 'Completo' 
                    : '+ Me sumo'}
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-2 text-3xs font-semibold">
            {/* Spot Count */}
            <div className="bg-white border border-[#ededf2] p-2.5 rounded-xl flex items-center gap-2">
              <Users size={14} className="text-[#1A4F7A]" />
              <div>
                <span className="text-[#574B30]/70 block">Confirmados</span>
                <span className="text-xs font-bold text-[#1A4F7A]">
                  {plan.joinedUserIds.length} / {plan.maxCups}
                </span>
              </div>
            </div>

            {/* Price detail */}
            <div className="bg-white border border-[#ededf2] p-2.5 rounded-xl flex items-center gap-2">
              <DollarSign size={14} className="text-amber-600" />
              <div>
                <span className="text-[#574B30]/70 block">Costo</span>
                <span className="text-xs font-bold text-amber-700">
                  {plan.isPaid ? 'Consultar' : 'Gratis'}
                </span>
              </div>
            </div>
          </div>

          {/* Sourcing explanation if Paid */}
          {plan.isPaid && plan.priceDetails && (
            <div className="bg-amber-500/5 border border-amber-500/15 p-2.5 rounded-xl flex items-start gap-2">
              <Info size={11} className="text-amber-600 inline-block shrink-0 mt-0.5" />
              <p className="text-[10px] text-amber-800 leading-normal">
                <span className="font-bold">Nota de Costos:</span> {plan.priceDetails}
              </p>
            </div>
          )}

          {/* Description */}
          <div className="space-y-1.5">
            <span className="block text-2xs font-extrabold text-[#574B30] uppercase tracking-wider">¿De qué se trata?</span>
            <p className="text-xs text-[#574B30] leading-relaxed font-sans bg-white p-3 rounded-xl border border-[#ededf2]/75">
              {plan.description}
            </p>
          </div>

          {/* Group details */}
          <div className="grid grid-cols-2 gap-2 text-[11px] bg-white border border-[#ededf2] p-3 rounded-xl text-xs font-semibold">
            <div>
              <span className="text-[#574B30]/75 block text-[10px]">Preferencia de grupo:</span>
              <span className="text-[11px] text-[#362E1C]">
                {plan.genderPreference === 'women' ? 'Solo Mujeres' : plan.genderPreference === 'mixed' ? 'Mixto' : 'Sin preferencia'}
              </span>
            </div>
            <div>
              <span className="text-[#574B30]/75 block text-[10px]">Ubicación (Punto de encuentro):</span>
              <span className="text-[11px] text-[#1A4F7A] inline-flex items-center gap-0.5 truncate max-w-full">
                <MapPin size={10} />
                {plan.zone}
              </span>
            </div>
          </div>

          {/* Secure chat warning if Joined but 1 participant */}
          {isJoined && !chatActivated && (
            <div className="bg-amber-500/5 p-3 rounded-xl border border-amber-500/15 flex items-start gap-1.5">
              <Info size={12} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[10.5px] text-amber-800 leading-normal">
                <span className="font-bold">Chat pendiente:</span> Esperando que al menos otro participante se sume para habilitar el chat grupal cerrado del plan.
              </p>
            </div>
          )}

          {/* Interactive Chat button inside if Joined & 2+ confirmed */}
          {isJoined && chatActivated && (
            <button
              onClick={() => onEnterChat(plan.id)}
              className="w-full text-center py-2.5 bg-[#1A4F7A]/10 border border-[#1A4F7A]/25 rounded-xl text-[#1A4F7A] hover:bg-[#1A4F7A]/15 font-bold transition flex items-center justify-center gap-1.5 text-xs shadow-xs"
            >
              <MessageSquare size={14} />
              <span>Entrar al Chat Grupal (Activo 💬)</span>
            </button>
          )}

          {/* Host Card block */}
          {host && (
            <div className="border border-[#ededf2] bg-white rounded-xl p-3 space-y-2">
              <span className="block text-2xs font-extrabold text-[#574B30] uppercase tracking-wider">Creador del plan</span>
              <div className="flex items-start gap-2.5">
                <img
                  src={host.photoUrl}
                  alt={host.name}
                  className="w-10 h-10 object-cover rounded-full border border-[#F5EFE0]"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-[#362E1C] truncate">{host.name}</h4>
                    {host.isPremium && <span className="bg-amber-100 text-amber-700 font-extrabold text-[8px] px-1 py-0.2 rounded">Plus</span>}
                  </div>
                  <p className="text-3xs text-[#574B30]/70 truncate">Sede {host.city} • Zona {host.zone}</p>
                  
                  {/* Rating indicators dual based */}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-0.5 text-3xs font-extrabold text-[#574B30]">
                      <Star size={9} fill="#D97706" className="text-amber-500" />
                      <span>{host.creatorRating ? `${host.creatorRating} Creador` : 'Nuevo Creador'}</span>
                    </span>
                    <span className="text-[#574B30]/30 text-3xs">•</span>
                    <span className="text-3xs text-[#574B30]/70">{host.plansAsCreatorCount} creados</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Confirmed list */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-2xs font-extrabold text-[#574B30] uppercase tracking-wider">Participantes ({participants.length})</span>
              <span className="text-2xs text-[#574B30]/70 italic leading-none">{plan.maxCups - participants.length} lugares libres</span>
            </div>

            <div className="bg-white border border-[#ededf2] rounded-xl p-3 divide-y divide-[#ededf2]/55">
              {participants.map((person) => (
                <div key={person.id} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0 font-semibold gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={person.photoUrl}
                      alt={person.name}
                      className="w-7 h-7 object-cover rounded-full border border-gray-100 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#362E1C] block leading-none">{person.name}</span>
                      <span className="text-3xs text-[#574B30]/70 inline-block truncate max-w-40 mt-1">
                        {person.id === plan.creatorId ? 'Organizador' : (person.interests || []).slice(0,2).join(' • ')}
                      </span>
                    </div>
                  </div>
                  <span className="text-3xs font-bold bg-[#F5EFE0] text-[#574B30] px-2 py-0.5 rounded-full">
                    {person.id === plan.creatorId ? 'Organizador' : 'Confirmado'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Button Drawer for sumarse */}
      <div className="bg-white/95 border-t border-[#ededf2] p-4 shrink-0 shadow-lg">
        {isCreator ? (
          <div className="space-y-2">
            <button
              onClick={() => onEnterChat(plan.id)}
              disabled={!chatActivated}
              className={`w-full h-11 rounded-full font-bold flex items-center justify-center gap-1.5 text-xs shadow ${
                chatActivated
                  ? 'bg-[#1A4F7A] hover:bg-[#1A4F7A]/95 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <MessageSquare size={15} />
              <span>{chatActivated ? 'Administrar Chat Grupal' : 'Esperando Participantes para Chat'}</span>
            </button>
            <p className="text-center text-3xs text-[#574B30]/75">Organizas esta actividad. No puedes salir de tu propio plan.</p>
          </div>
        ) : isJoined ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onLeave(plan.id)}
              className="flex-1 h-11 border border-red-500/30 text-red-600 bg-red-50/50 hover:bg-red-50 hover:border-red-500 rounded-full font-bold text-xs transition"
            >
              Bajarme del plan
            </button>
            {chatActivated && (
              <button
                onClick={() => onEnterChat(plan.id)}
                className="flex-1 h-11 bg-[#1A4F7A] hover:bg-[#1A4F7A]/95 text-white rounded-full font-bold text-xs shadow flex items-center justify-center gap-1"
              >
                <MessageSquare size={14} />
                <span>Chat</span>
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => onJoin(plan.id)}
            disabled={isFull}
            className={`w-full h-11 rounded-full font-bold flex items-center justify-center gap-1 text-xs shadow transition ${
              isFull
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#1A4F7A] hover:bg-[#1A4F7A]/95 text-white'
            }`}
          >
            <Sparkles size={14} />
            <span>{isFull ? 'Plan Completo (Sin cupos)' : '¡Me sumo al plan! • Un clic'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
