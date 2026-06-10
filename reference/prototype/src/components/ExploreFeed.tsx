import React, { useState } from 'react';
import { Search, MapPin, Plus, Compass, Calendar, User, SearchIcon, Sparkles, SlidersHorizontal, ChevronRight, XCircle } from 'lucide-react';
import { Plan, User as UserType } from '../types';
import { categoriesList, mdpZonesCountMap } from '../data';

interface ExploreFeedProps {
  plans: Plan[];
  onSelectPlan: (planId: string) => void;
  onCreatePlan: () => void;
  currentUser: UserType | null;
  activeTab: 'explorar' | 'mis_planes' | 'perfil';
  onChangeTab: (tab: 'explorar' | 'mis_planes' | 'perfil') => void;
  currentCity: string;
  onChangeCity: (city: string) => void;
  onJoinPlan: (planId: string) => void;
  onLeavePlan: (planId: string) => void;
}

export default function ExploreFeed({
  plans,
  onSelectPlan,
  onCreatePlan,
  currentUser,
  activeTab,
  onChangeTab,
  currentCity,
  onChangeCity,
  onJoinPlan,
  onLeavePlan
}: ExploreFeedProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedZoneFilter, setSelectedZoneFilter] = useState('');
  const [groupSizeFilter, setGroupSizeFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('all'); // all, free, paid

  const filteredPlans = plans.filter(plan => {
    // 1. Filter by location
    const matchedCity = plan.zone.toLowerCase().includes(currentCity.toLowerCase()) || 
                        (currentCity === "Mar del Plata" && !plan.zone.toLowerCase().includes("chapadmalal")) ||
                        (currentCity === "Chapadmalal" && plan.zone.toLowerCase().includes("chapadmalal"));
    if (!matchedCity) return false;

    // 2. Filter by Search term
    const matchSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        plan.zone.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 3. Filter by Category
    const matchCategory = selectedCategory === 'Todos' || plan.category === selectedCategory;

    // 4. Advanced Filters (Zone, Group Size, Price)
    const matchZone = !selectedZoneFilter || plan.zone.toLowerCase().includes(selectedZoneFilter.toLowerCase());
    
    let matchSize = true;
    if (groupSizeFilter === 'small') {
      matchSize = plan.maxCups <= 6;
    } else if (groupSizeFilter === 'medium') {
      matchSize = plan.maxCups > 6 && plan.maxCups <= 12;
    } else if (groupSizeFilter === 'large') {
      matchSize = plan.maxCups > 12;
    }

    let matchPrice = true;
    if (priceFilter === 'free') {
      matchPrice = !plan.isPaid;
    } else if (priceFilter === 'paid') {
      matchPrice = plan.isPaid;
    }

    return matchSearch && matchCategory && matchZone && matchSize && matchPrice && plan.status === 'active';
  });

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#FDFAF5]">
      {/* Search & Top Action Bar Area */}
      <div className="bg-[#FDFAF5] shrink-0 border-b border-[#ededf2]/60 pb-3 px-4 pt-1.5 z-20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl text-[#00385d] tracking-tight">People Conecta</span>
            {/* Multi-city Selector badge to satisfy dynamic multi-city technical criteria */}
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={11} className="text-[#1A4F7A]" />
              <select
                value={currentCity}
                onChange={(e) => onChangeCity(e.target.value)}
                className="text-[10px] font-bold text-[#574B30] bg-transparent border-0 focus:ring-0 p-0 cursor-pointer align-middle"
              >
                <option value="Mar del Plata">Mar del Plata 🌅</option>
                <option value="Chapadmalal">Chapadmalal 🏄‍♂️</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={onCreatePlan}
            className="w-8 h-8 rounded-full bg-[#1A4F7A]/10 text-[#1A4F7A] flex items-center justify-center hover:bg-[#1A4F7A]/15 transition"
            id="create-plan-top-action-btn"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Search input with beautiful layout */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#574B30]/50" size={15} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar experiencias cerca de ti..."
              className="w-full h-9 pl-9 pr-4 bg-white border border-[#ededf2] rounded-full text-xs font-semibold placeholder-[#574B30]/40 focus:outline-none focus:ring-1 focus:ring-[#1A4F7A]"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-9 h-9 border rounded-full flex items-center justify-center transition shrink-0 ${
              showFilters || selectedZoneFilter || groupSizeFilter || priceFilter !== 'all'
                ? 'bg-[#1A4F7A]/10 border-[#1A4F7A] text-[#1A4F7A]'
                : 'bg-white border-[#ededf2] text-[#574B30]'
            }`}
          >
            <SlidersHorizontal size={14} />
          </button>
        </div>

        {/* Toggleable Advanced Filters Drawer */}
        {showFilters && (
          <div className="mt-2.5 p-3 bg-[#F5EFE0] rounded-xl border border-[#ededf2] text-3xs space-y-2.5 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-[#ededf2] pb-1.5">
              <span className="font-extrabold text-[#574B30] uppercase tracking-wider">Filtros Avanzados</span>
              <button
                onClick={() => {
                  setSelectedZoneFilter('');
                  setGroupSizeFilter('');
                  setPriceFilter('all');
                }}
                className="text-[#1A4F7A] font-bold hover:underline"
              >
                Limpiar filtros
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Zone Filter */}
              <div>
                <span className="block mb-1 font-semibold text-[#574B30]">Elegir Zona</span>
                <select
                  value={selectedZoneFilter}
                  onChange={(e) => setSelectedZoneFilter(e.target.value)}
                  className="w-full h-7 px-1.5 bg-white border border-[#ededf2] rounded-md text-3xs focus:outline-none"
                >
                  <option value="">Todas las zonas</option>
                  {(mdpZonesCountMap[currentCity] || []).map(z => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </div>

              {/* Group Size Filter */}
              <div>
                <span className="block mb-1 font-semibold text-[#574B30]">Tamaño de Grupo</span>
                <select
                  value={groupSizeFilter}
                  onChange={(e) => setGroupSizeFilter(e.target.value)}
                  className="w-full h-7 px-1.5 bg-white border border-[#ededf2] rounded-md text-3xs focus:outline-none"
                >
                  <option value="">Cualquiera</option>
                  <option value="small">Grupos chicos (hasta 6)</option>
                  <option value="medium">Prendas (7 a 12)</option>
                  <option value="large">Masivos (+12)</option>
                </select>
              </div>
            </div>

            {/* Price toggle */}
            <div>
              <span className="block mb-1 font-semibold text-[#574B30]">Costo del encuentro</span>
              <div className="flex gap-1.5">
                {['all', 'free', 'paid'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriceFilter(p)}
                    className={`flex-1 h-6 rounded-md font-bold text-3xs transition ${
                      priceFilter === p
                        ? 'bg-[#1A4F7A] text-white'
                        : 'bg-white text-[#574B30] border border-[#ededf2]'
                    }`}
                  >
                    {p === 'all' ? 'Todos' : p === 'free' ? 'Gratis' : 'Pago'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Swiper Categories Slider */}
        <div className="flex items-center gap-1.5 overflow-x-auto scroller-hide pt-3 -mx-4 px-4">
          {categoriesList.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-2xs font-extrabold transition tracking-wide whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#00385d] text-white shadow-sm'
                    : 'bg-[#F5EFE0]/60 text-[#574B30] border border-[#ededf2]/50 hover:bg-[#F5EFE0]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Events Feed Section */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {filteredPlans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <span className="text-3xl mb-2">🐚</span>
            <h3 className="font-display font-semibold text-sm text-[#362E1C]">No hay planes disponibles</h3>
            <p className="text-3xs text-[#574B30] px-6 mt-1 leading-relaxed">
              Prueba cambiando la categoría, limpiando filtros o sé el primero en proponer una experiencia haciendo clic en el botón '+' abajo.
            </p>
          </div>
        ) : (
          filteredPlans.map((plan) => {
            const isFull = plan.joinedUserIds.length >= plan.maxCups;
            const progressPercent = Math.min((plan.joinedUserIds.length / plan.maxCups) * 100, 100);

            return (
              <div
                key={plan.id}
                onClick={() => onSelectPlan(plan.id)}
                className="bg-white rounded-2xl border border-[#ededf2]/70 overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition transform duration-200"
                id={`explore-card-${plan.id}`}
              >
                {/* Event Cover Image */}
                <div className="relative h-44 w-full bg-[#F5EFE0] overflow-hidden">
                  <img
                    src={plan.imageUrl}
                    alt={plan.title}
                    className="w-full h-full object-cover transition duration-300 hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill Tag Overlay */}
                  <span className="absolute top-2.5 left-2.5 bg-white/80 backdrop-blur-sm text-[#1A4F7A] text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider border border-[#1A4F7A]/10">
                    {plan.category}
                  </span>

                  {/* Payment Type overlay indicator */}
                  {plan.isPaid && (
                    <span className="absolute top-2.5 right-2.5 bg-[#574B30] text-[#FDFAF5] text-[9px] font-extrabold px-2 py-0.5 rounded-full tracking-wider">
                      Pago
                    </span>
                  )}
                </div>

                {/* Card Text details */}
                <div className="p-3.5 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-display font-bold text-sm text-[#362E1C] tracking-tight hover:text-[#1A4F7A]">
                      {plan.title}
                    </h3>
                    <span className="text-3xs text-[#574B30] font-sans font-extrabold uppercase tracking-widest text-right whitespace-nowrap pt-0.5">
                      {plan.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-[#574B30]/80">
                    <MapPin size={11} className="text-[#1A4F7A]/75 shrink-0" />
                    <span className="truncate">{plan.zone}</span>
                    <span className="mx-1 text-[#574B30]/30">•</span>
                    <span className="text-3xs font-semibold">{plan.time} hs</span>
                  </div>

                  {/* Progressive Bar tracker */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center text-[10.5px] font-sans mb-1">
                      <span className="text-[#574B30]/70">Cupos ocupados</span>
                      <span className="font-bold text-[#1A4F7A]">{plan.joinedUserIds.length}/{plan.maxCups}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#F5EFE0]/80 rounded-full overflow-hidden flex">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isFull ? 'bg-[#574B30]' : 'bg-[#1A4F7A]'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Direct Join Action Button inside card */}
                  <div className="pt-3 flex items-center justify-between gap-1 border-t border-[#ededf2]/55 mt-2.5">
                    <span className="text-[10px] text-[#574B30]/65 italic">
                      {isFull && !plan.joinedUserIds.includes(currentUser?.id || '')
                        ? "Sin lugares" 
                        : plan.creatorId === currentUser?.id
                        ? "Tu propuesta"
                        : plan.joinedUserIds.includes(currentUser?.id || '')
                        ? "¡Inscripto!"
                        : `${plan.maxCups - plan.joinedUserIds.length} lugares libres`}
                    </span>
                    {currentUser && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (plan.creatorId === currentUser.id) {
                            // organiser
                          } else if (plan.joinedUserIds.includes(currentUser.id)) {
                            onLeavePlan(plan.id);
                          } else {
                            onJoinPlan(plan.id);
                          }
                        }}
                        disabled={isFull && !plan.joinedUserIds.includes(currentUser?.id || '') && plan.creatorId !== currentUser?.id}
                        className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider transition-all duration-150 ${
                          plan.creatorId === currentUser.id
                            ? 'bg-amber-100 text-amber-800 cursor-default border border-amber-200'
                            : plan.joinedUserIds.includes(currentUser.id)
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : isFull
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-[#1A4F7A] text-white hover:bg-[#103D61] hover:scale-103 active:scale-97'
                        }`}
                        id={`join-direct-btn-${plan.id}`}
                      >
                        {plan.creatorId === currentUser.id
                          ? '👑 Organizas'
                          : plan.joinedUserIds.includes(currentUser.id)
                          ? '✓ Sumado'
                          : '+ Me Sumo'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Action Button for prompt actions */}
      <button
        onClick={onCreatePlan}
        className="absolute bottom-16 right-4 w-12 h-12 bg-[#00385d] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#1A4F7A] hover:scale-105 active:scale-95 transition z-30 group"
      >
        <Plus size={24} className="group-hover:rotate-90 transition duration-300" />
      </button>

      {/* Bottom Global iOS Navigation Tab Bar persistent look */}
      <div className="h-14 bg-white/95 border-t border-[#ededf2] px-6 py-1 shrink-0 flex items-center justify-between z-30">
        <button
          onClick={() => onChangeTab('explorar')}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'explorar' ? 'text-[#1A4F7A]' : 'text-gray-400'
          }`}
        >
          <Compass size={18} fill={activeTab === 'explorar' ? "#1A4F7A" : "none"} />
          <span className="text-[9px] font-bold tracking-tight">Explorar</span>
        </button>

        <button
          onClick={() => onChangeTab('mis_planes')}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'mis_planes' ? 'text-[#1A4F7A]' : 'text-gray-400'
          }`}
        >
          <Calendar size={18} fill={activeTab === 'mis_planes' ? "#1A4F7A" : "none"} />
          <span className="text-[9px] font-bold tracking-tight">Mis Planes</span>
        </button>

        <button
          onClick={() => onChangeTab('perfil')}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'perfil' ? 'text-[#1A4F7A]' : 'text-gray-400'
          }`}
        >
          <User size={18} fill={activeTab === 'perfil' ? "#1A4F7A" : "none"} />
          <span className="text-[9px] font-bold tracking-tight">Mi Perfil</span>
        </button>
      </div>
    </div>
  );
}
