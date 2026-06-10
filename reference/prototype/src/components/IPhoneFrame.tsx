import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, UserCheck, Calendar, Bell, Clock, Compass, Zap, CheckCircle2, ChevronRight, MessageSquareCode } from 'lucide-react';
import { Notification } from '../types';

interface IPhoneFrameProps {
  children: React.ReactNode;
  userStatus: 'pending' | 'approved' | 'rejected';
  onApproveUser: () => void;
  isPremium: boolean;
  onTogglePremium: () => void;
  notifications: Notification[];
  onClearNotifications: () => void;
  onFastForwardTime: () => void;
  timeLabel: string;
  moderationLogs: { text: string; safe: boolean; timestamp: Date }[];
}

export default function IPhoneFrame({
  children,
  userStatus,
  onApproveUser,
  isPremium,
  onTogglePremium,
  notifications,
  onClearNotifications,
  onFastForwardTime,
  timeLabel,
  moderationLogs
}: IPhoneFrameProps) {
  const [phoneTime, setPhoneTime] = useState("10:00");
  const [showNotificationOverlay, setShowNotificationOverlay] = useState<Notification | null>(null);

  // Update device clock matching current system time or standard
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const strMinutes = minutes < 10 ? '0' + minutes : minutes;
      setPhoneTime(`${hours}:${strMinutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  // Show live popup when new notifications come in
  useEffect(() => {
    if (notifications.length > 0) {
      const latest = notifications[notifications.length - 1];
      if (!latest.read) {
        setShowNotificationOverlay(latest);
        const timer = setTimeout(() => {
          setShowNotificationOverlay(null);
        }, 4000);
        return () => clearTimeout(timer);
      }
    }
  }, [notifications]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-tr from-[#cfe4ff] via-[#FDFAF5] to-[#f9f9fd] p-4 lg:p-8 select-none font-sans overflow-x-hidden">
      {/* 1. Left panel: Founder Control Center / Sandbox dashboard */}
      <div className="w-full lg:w-96 mb-8 lg:mb-0 lg:mr-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-[#ededf2] shadow-xl flex flex-col justify-between max-h-[852px] overflow-y-auto">
        <div>
          <div className="flex items-center gap-2 mb-4 border-b border-[#ededf2] pb-3">
            <div className="w-8 h-8 rounded-full bg-[#1A4F7A] flex items-center justify-center text-white font-bold text-sm">
              PC
            </div>
            <div>
              <h2 className="text-[#1a1c1f] font-semibold text-lg tracking-tight">People Conecta MVP</h2>
              <p className="text-xs text-[#574B30] font-medium">Panel del Fundador y Moderador</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Simulation Speed & Time Controls */}
            <div className="bg-[#FDFAF5] p-3 rounded-xl border border-[#F5EFE0]">
              <span className="text-2xs font-extrabold text-[#574B30] uppercase tracking-wider block mb-1">Simulación Temporal</span>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#1a1c1f]">Tiempo Actual:</span>
                  <span className="text-xs bg-[#1A4F7A]/10 text-[#1A4F7A] px-2 py-0.5 rounded ml-2 font-mono font-bold">{timeLabel}</span>
                </div>
                <button
                  onClick={onFastForwardTime}
                  className="flex items-center gap-1.5 bg-[#1A4F7A] hover:bg-[#1A4F7A]/90 text-white text-xs px-2.5 py-1.5 rounded-lg transition font-medium"
                >
                  <Clock size={12} />
                  <span>Avanzar 3 días</span>
                </button>
              </div>
              <p className="text-3xs text-[#574B30] mt-1.5 leading-normal">
                Permite adelantar el tiempo para finalizar planes activos y disparar el protocolo de evaluación/reviews de usuarios.
              </p>
            </div>

            {/* Profile approval toggle */}
            <div className="bg-[#FDFAF5] p-3 rounded-xl border border-[#F5EFE0]">
              <span className="text-2xs font-extrabold text-[#574B30] uppercase tracking-wider block mb-1.5">Filtro de Registro Manual</span>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#1Charcoal] block font-medium">Estado del Perfil:</span>
                  <span className={`inline-flex items-center gap-1 text-xs font-bold mt-1 ${
                    userStatus === 'approved' ? 'text-green-600' : 'text-amber-500'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${userStatus === 'approved' ? 'bg-green-600' : 'bg-amber-500 animate-pulse'}`} />
                    {userStatus === 'approved' ? 'Aprobado y Activo' : 'Pendiente Manual'}
                  </span>
                </div>
                {userStatus !== 'approved' && (
                  <button
                    onClick={onApproveUser}
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg transition font-medium"
                  >
                    <UserCheck size={13} />
                    <span>Aprobar Perfil</span>
                  </button>
                )}
              </div>
              <p className="text-3xs text-[#574B30] mt-1.5 leading-normal">
                En el MVP, el fundador aprueba cada perfil para garantizar el onboarding de personas con fotos y nombres reales.
              </p>
            </div>

            {/* Premium toggle */}
            <div className="bg-[#FDFAF5] p-3 rounded-xl border border-[#F5EFE0]">
              <span className="text-2xs font-extrabold text-[#574B30] uppercase tracking-wider block mb-1">Membresía Conecta Plus</span>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#1a1c1f] block font-medium">Nivel de Cuenta:</span>
                  <span className={`text-xs font-bold ${isPremium ? 'text-amber-600' : 'text-[#574B35]'}`}>
                    {isPremium ? '★ Miembro Premium' : 'Usuario Free'}
                  </span>
                </div>
                <button
                  onClick={onTogglePremium}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition font-medium ${
                    isPremium 
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold shadow-md'
                  }`}
                >
                  <Sparkles size={12} />
                  <span>{isPremium ? 'Bajar a Free' : 'Hacer Premium'}</span>
                </button>
              </div>
            </div>

            {/* AI Security Log System */}
            <div className="space-y-1.5">
              <span className="text-2xs font-extrabold text-[#574B30] uppercase tracking-wider block">Bitácora de Moderación IA</span>
              <div className="bg-[#1a1c1f] text-gray-300 font-mono text-[10px] p-3 rounded-xl border border-gray-800 space-y-2 h-40 overflow-y-auto">
                <div className="text-blue-400 border-b border-gray-800 pb-1 flex items-center justify-between">
                  <span>System SafeSearch (Gemini 3.5)</span>
                  <Shield size={10} className="text-cyan-400" />
                </div>
                {moderationLogs.length === 0 ? (
                  <p className="text-gray-500 italic">Esperando creación de planes o triggers de seguridad para registrar logs...</p>
                ) : (
                  moderationLogs.map((log, idx) => (
                    <div key={idx} className="border-b border-gray-800/50 pb-1.5 last:border-0">
                      <div className="flex justify-between text-[9px] text-gray-500">
                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                        <span className={log.safe ? "text-green-400 font-bold" : "text-red-400 font-semibold"}>
                          {log.safe ? "CORRECTO" : "BLOQUEADO"}
                        </span>
                      </div>
                      <p className="text-white text-[10px] break-words leading-snug mt-0.5">{log.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live system status footer */}
        <div className="mt-4 pt-4 border-t border-[#ededf2] text-3xs text-[#574B30] flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
            <span className="font-semibold">MDP/Chapa Ingress Node: ONLINE (Port 3000)</span>
          </div>
          <div className="flex justify-between border-t border-dashed border-[#ededf2] pt-1 mt-1 text-[9px]">
            <span>Sede Operacional: Mar del Plata</span>
            <span>Estilo: Coastal Serenity v3.0</span>
          </div>
        </div>
      </div>

      {/* 2. Middle panel: Physical iPhone Device Simulator */}
      <div className="relative shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-[60px] border-[14px] border-[#1e2022] bg-[#1a1c1f] w-[393px] h-[852px] select-none flex flex-col justify-between overflow-hidden shrink-0 ring-4 ring-[#33373b] outline-none">
        {/* Dynamic Island Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-3 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
          <div className="flex items-center gap-1 text-[8px] text-gray-400">
            <span className="w-1 h-1 rounded-full bg-[#1144CC] animate-pulse" />
            <span className="font-bold font-mono tracking-tighter">iOS 17</span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#050510] border border-gray-900" />
        </div>

        {/* Device Status Bar */}
        <div className="h-10 bg-transparent flex items-end justify-between px-6 pb-1.5 text-xs font-semibold text-gray-900 z-40 select-none pointer-events-none shrink-0">
          <span className="text-[11px] font-bold tracking-tight text-[#1a1c1f] pr-6">{phoneTime}</span>
          <div className="flex items-center gap-1.5">
            {/* Cellular strength indicator */}
            <svg width="15" height="10" viewBox="0 0 17 12" className="fill-[#1a1c1f]">
              <rect x="0" y="8" width="2" height="4" rx="0.5" />
              <rect x="4" y="6" width="2" height="6" rx="0.5" />
              <rect x="8" y="4" width="2" height="8" rx="0.5" />
              <rect x="12" y="2" width="2" height="10" rx="0.5" />
              <rect x="16" y="0" width="2" height="12" rx="0.5" />
            </svg>
            <span className="text-[9px] font-bold tracking-tighter pr-0.5 text-[#1a1c1f]">LTE</span>
            {/* Battery */}
            <div className="w-5.5 h-2.5 border border-[#1a1c1f] rounded-sm p-0.5 flex items-center justify-start">
              <div className="h-full bg-[#1a1c1f] rounded-2xs w-4/5" />
            </div>
          </div>
        </div>

        {/* Dynamic App Notification Banner Overlay inside Simulated System Area */}
        {showNotificationOverlay && (
          <div className="absolute top-11 left-3 right-3 bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-3 border border-gray-100 z-50 flex items-start gap-2.5 transform translate-y-0 transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-[#1A4F7A] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow">
              PC
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-[#1A4F7A] tracking-wider uppercase">People Conecta</span>
                <span className="text-[9px] text-[#574B30]/70">ahora</span>
              </div>
              <h4 className="text-xs font-Bold text-[#362E1C] truncate mt-0.5">{showNotificationOverlay.title}</h4>
              <p className="text-[10.5px] text-[#574B30] leading-snug truncate">{showNotificationOverlay.body}</p>
            </div>
          </div>
        )}

        {/* iPhone screen area embedding active application pages */}
        <div className="flex-1 w-full bg-[#FDFAF5] relative flex flex-col justify-between overflow-hidden text-[#574B30] text-sm">
          {children}
        </div>

        {/* iPhone Physical Bottom Hand Indicator/Home Bar */}
        <div className="h-5 bg-[#FDFAF5] shrink-0 w-full flex items-center justify-center z-40 select-none pointer-events-none pb-1.5">
          <div className="w-32 h-1 bg-[#1a1c1f]/70 rounded-full" />
        </div>
      </div>
    </div>
  );
}
