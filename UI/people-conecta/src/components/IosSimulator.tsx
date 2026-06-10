import React, { useState } from 'react';
import { Smartphone, RotateCcw, HelpCircle, HardDrive, ShieldCheck, Github } from 'lucide-react';

interface IosSimulatorProps {
  children: React.ReactNode;
  onResetData: () => void;
  onRestartOnboarding: () => void;
}

export default function IosSimulator({ children, onResetData, onRestartOnboarding }: IosSimulatorProps) {
  const [isIosFrame, setIsIosFrame] = useState(true);

  // Display status indicators for the 2026 system date
  const systemTime = "00:21";

  return (
    <div className="flex flex-col items-center">
      
      {/* Top Toggle Mode Selector */}
      <div className="w-full max-w-sm mb-4 flex justify-between items-center bg-sand-100 p-2 rounded-xl border border-sand-200">
        <span className="text-xs font-bold text-neutral-warm-700">Diseño iOS Mobile-First:</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setIsIosFrame(true)}
            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
              isIosFrame ? 'bg-primary text-white shadow-sm' : 'bg-transparent text-neutral-warm-600 hover:text-neutral-warm-800'
            }`}
          >
            Iphone 15 Pro
          </button>
          <button
            type="button"
            onClick={() => setIsIosFrame(false)}
            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
              !isIosFrame ? 'bg-primary text-white shadow-sm' : 'bg-transparent text-neutral-warm-600 hover:text-neutral-warm-800'
            }`}
          >
            Vista Fluida
          </button>
        </div>
      </div>

      {isIosFrame ? (
        /* 📱 REALISTIC IPHONE PROMockup FRAME */
        <div className="relative mx-auto my-2 shrink-0 select-none">
          {/* External Border */}
          <div className="w-[360px] h-[720px] rounded-[48px] border-[10px] border-neutral-warm-900 bg-[#FDFAF4] shadow-elevation-5 relative flex flex-col overflow-hidden">
            
            {/* Top Speaker Ear Speaker */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-neutral-warm-900 rounded-full z-30 flex items-center justify-around px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-900/40"></span>
              <span className="w-8 h-1 bg-neutral-800 rounded-full block"></span>
              <span className="w-2.5 h-1.5 rounded-full bg-neutral-800"></span>
            </div>

            {/* Simulated iOS Top Status Bar (2026 Specs) */}
            <div className="h-10 bg-white pt-2.5 px-6 flex justify-between items-center text-[11px] font-black tracking-normal text-neutral-warm-800 select-none shrink-0 z-20">
              <span className="font-sans">{systemTime}</span>
              <div className="flex items-center gap-1">
                {/* Connection bars */}
                <span className="flex items-end gap-0.5 h-2 w-4">
                  <span className="bg-neutral-warm-800 w-0.5 h-0.5"></span>
                  <span className="bg-neutral-warm-800 w-0.5 h-1"></span>
                  <span className="bg-neutral-warm-800 w-0.5 h-1.5"></span>
                  <span className="bg-neutral-warm-800 w-0.5 h-2"></span>
                </span>
                <span className="text-[9px] font-bold">LTE</span>
                {/* Battery icon */}
                <div className="w-5 h-2.5 border border-neutral-warm-800 rounded-sm p-0.5 flex items-center">
                  <div className="bg-neutral-warm-800 h-full w-[80%] rounded-2xs"></div>
                </div>
              </div>
            </div>

            {/* Inner App Stage */}
            <div className="flex-1 overflow-hidden relative bg-[#FDFAF4]">
              {children}
            </div>

            {/* Bottom iOS Home Indicator pill */}
            <div className="h-6 bg-white flex items-center justify-center shrink-0 w-full z-20">
              <div className="w-24 h-1 bg-neutral-warm-800 rounded-full"></div>
            </div>
            
          </div>

          {/* Leftside volume control buttons decoration */}
          <div className="absolute -left-3.5 top-28 w-1 h-8 bg-neutral-warm-800 rounded-l-md"></div>
          <div className="absolute -left-3.5 top-40 w-1 h-12 bg-neutral-warm-800 rounded-l-md"></div>
          <div className="absolute -left-3.5 top-[210px] w-1 h-12 bg-neutral-warm-800 rounded-l-md"></div>

          {/* Rightside lock screen button */}
          <div className="absolute -right-3.5 top-44 w-1 h-16 bg-neutral-warm-800 rounded-r-md"></div>
        </div>
      ) : (
        /* 💻 FLUID LAYOUT BOX */
        <div className="w-full max-w-sm h-[680px] rounded-3xl border border-sand-300 bg-[#FDFAF4] shadow-elevation-3 overflow-hidden relative flex flex-col">
          {/* Simple header tag for simulation */}
          <div className="h-1 bg-primary w-full"></div>
          <div className="flex-1 overflow-hidden relative">
            {children}
          </div>
        </div>
      )}

      {/* Under Frame Assistant utility controls */}
      <div className="w-full max-w-sm mt-4 p-3 bg-white border border-sand-200 rounded-2xl flex flex-col gap-2 shadow-elevation-1">
        <p className="text-[11px] font-black text-neutral-warm-500 uppercase tracking-wider text-center">Acciones Rápidas del Simulador</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button 
            type="button"
            onClick={onRestartOnboarding}
            className="p-2 border border-sand-200 bg-sand-50 rounded-lg hover:bg-sand-100 font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5 text-primary" /> Onboarding 📥
          </button>
          
          <button 
            type="button"
            onClick={onResetData}
            className="p-2 border border-red-150 bg-red-50/40 text-red-700 rounded-lg hover:bg-red-50 font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Resetear Demo 🔄
          </button>
        </div>
        <div className="flex items-center gap-1 bg-[#EAF2FB] p-2 rounded-xl text-[10px] text-neutral-warm-700 font-medium leading-relaxed">
          <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>Probá anotarte a planes, publicar eventos, dar valoraciones o cambiar de plan en tu Perfil. Todo se almacena localmente.</span>
        </div>
      </div>

    </div>
  );
}
