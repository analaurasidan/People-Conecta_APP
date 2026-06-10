import React, { useState, useEffect } from 'react';
import { 
  Search, SlidersHorizontal, MapPin, Calendar, Clock, Users, CheckCircle, 
  Sparkles, ShieldCheck, ArrowLeft, Star, Heart, Share2, Plus, LogOut, 
  User as UserIcon, PlusCircle, Check, CreditCard, ChevronRight, MessageSquare,
  RefreshCw, MoreVertical, Upload, Image as ImageIcon
} from 'lucide-react';
import { EventActivity, User, Organizer, Review, CategoryType } from '../types';
import { CATEGORIES, MAR_DEL_PLATA_ZONES, getLocalState, saveLocalState } from '../data';

// Helper for local storage integration
const MAR_DEL_PLATA_USER_PHOTOS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
];

export const OUTDOOR_BANNER_PRESETS = [
  {
    id: 'picnic',
    label: 'Mate & Picnic 🧉',
    url: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=800',
    tags: ['mate', 'comida', 'merienda', 'charla', 'tarde', 'medialunas']
  },
  {
    id: 'guitarra',
    label: 'Fogón & Acústico 🔥',
    url: 'https://images.unsplash.com/photo-1520690216127-6f731297e174?q=80&w=800',
    tags: ['guitarra', 'fogon', 'fogón', 'fogata', 'musica', 'música', 'cantar', 'fuego']
  },
  {
    id: 'sports',
    label: 'Deporte & Vóley 🏐',
    url: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a27?q=80&w=800',
    tags: ['futbol', 'voley', 'deporte', 'tenis', 'arena', 'tejo', 'correr', 'pelota', 'entrenar']
  },
  {
    id: 'dinner',
    label: 'Bar & Cerveza 🍺',
    url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800',
    tags: ['cena', 'cerveza', 'bar', 'pinta', 'comida', 'tragos', 'burguer', 'pizza', 'comer', 'beber']
  },
  {
    id: 'cafe',
    label: 'Charla en Café ☕',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800',
    tags: ['cafe', 'café', 'literario', 'charla', 'libros', 'escribir', 'ajedrez', 'reunion', 'reunión']
  },
  {
    id: 'surf',
    label: 'Surf & Mar 🏄',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800',
    tags: ['surf', 'mar', 'playa', 'arena', 'olas', 'sol', 'costa', 'mdq', 'mardel', 'camet']
  }
];

interface AppScreensProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
  isOnboarding: boolean;
  setIsOnboarding: (onb: boolean) => void;
  isOrganizerMode: boolean;
  setIsOrganizerMode: (mode: boolean) => void;
  onStateUpdate?: () => void;
}

export default function AppScreens({
  currentTab,
  setCurrentTab,
  selectedEventId,
  setSelectedEventId,
  isOnboarding,
  setIsOnboarding,
  isOrganizerMode,
  setIsOrganizerMode,
  onStateUpdate
}: AppScreensProps) {
  // App local state synced to localStorage
  const [db, setDb] = useState(getLocalState());
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuEventId, setOpenMenuEventId] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState('todos');

  // New Event Form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryType>('deporte');
  const [newDate, setNewDate] = useState('2026-06-05');
  const [newTime, setNewTime] = useState('18:00');
  const [newZone, setNewZone] = useState('Playa Grande');
  const [newSpots, setNewSpots] = useState(6);
  const [newIsPaid, setNewIsPaid] = useState(false);
  const [newPrice, setNewPrice] = useState('$3.000');
  const [organizerMessage, setOrganizerMessage] = useState('');

  // Image states for plan creator
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=800');
  const [imageInputMethod, setImageInputMethod] = useState<'preset' | 'file' | 'ai'>('preset');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiGeneratorLogs, setAiGeneratorLogs] = useState<string[]>([]);

  // Onboarding workflow state
  const [onbStep, setOnbStep] = useState(1);
  const [onbReason, setOnbReason] = useState('Llegué nuevo a la ciudad');
  const [onbInterests, setOnbInterests] = useState<CategoryType[]>([]);
  const [onbDays, setOnbDays] = useState<string[]>(['Sábado', 'Domingo']);
  const [onbZone, setOnbZone] = useState('Playa Grande');
  const [onbName, setOnbName] = useState('');
  const [onbPhone, setOnbPhone] = useState('');
  const [onbPhoto, setOnbPhoto] = useState(MAR_DEL_PLATA_USER_PHOTOS[1]);
  const [onbGender, setOnbGender] = useState<'male' | 'female' | 'other'>('male');

  // Review state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewingEventId, setReviewingEventId] = useState<string | null>(null);

  // Adjacent social flows states
  const [activeOrganizerId, setActiveOrganizerId] = useState<string | null>(null);
  
  // Billing premium checkout state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'processing' | 'success'>('form');
  const [checkoutCardNumber, setCheckoutCardNumber] = useState('');
  const [checkoutCardName, setCheckoutCardName] = useState('');
  const [checkoutCardExpiry, setCheckoutCardExpiry] = useState('');
  const [checkoutCardCvv, setCheckoutCardCvv] = useState('');
  const [paymentError, setPaymentError] = useState('');

  // OTP/SMS registration verification state
  const [mockVerificationCode, setMockVerificationCode] = useState('');
  const [userEnteredOtp, setUserEnteredOtp] = useState('');
  const [onbOtpError, setOnbOtpError] = useState(false);
  const [showMockSmsNotification, setShowMockSmsNotification] = useState(false);

  // Organizer attendance checklist & penalty administration
  const [selectedEventForAttendanceId, setSelectedEventForAttendanceId] = useState<string | null>(null);
  const [attendanceMessage, setAttendanceMessage] = useState('');

  // Sync back state
  const refreshDb = () => {
    const fresh = getLocalState();
    setDb(fresh);
    if (onStateUpdate) {
      onStateUpdate();
    }
  };

  useEffect(() => {
    refreshDb();
  }, [selectedEventId, currentTab, isOnboarding, isOrganizerMode]);

  // Handle Event Enroll
  const handleEnroll = (eventId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const freshDb = getLocalState();
    const currentUser = freshDb.currentUser;

    if (!currentUser) {
      setIsOnboarding(true);
      return;
    }

    // Check Premium limit (Free plan users are restricted to maximum of 2 active events)
    const enrolledCount = freshDb.events.filter((ev: EventActivity) => 
      ev.registeredUserIds.includes(currentUser.id)
    ).length;

    if (currentUser.plan === 'free' && enrolledCount >= 2 && !freshDb.events.find((ev: EventActivity) => ev.id === eventId)?.registeredUserIds.includes(currentUser.id)) {
      alert('¡Límite del plan Free alcanzado! Has asistido/reservado 2 eventos este mes. Hazte Conecta Plus para disponer de reservas ilimitadas.');
      setCurrentTab('perfil');
      return;
    }

    const updatedEvents = freshDb.events.map((ev: EventActivity) => {
      if (ev.id === eventId) {
        if (ev.registeredUserIds.includes(currentUser.id)) {
          // Unenroll
          return {
            ...ev,
            registeredUserIds: ev.registeredUserIds.filter(id => id !== currentUser.id)
          };
        } else {
          // Enroll
          if (ev.registeredUserIds.length >= ev.spotsMax) {
            alert('Lo sentimos, este evento ya completó su límite de cupos.');
            return ev;
          }
          return {
            ...ev,
            registeredUserIds: [...ev.registeredUserIds, currentUser.id]
          };
        }
      }
      return ev;
    });

    const newState = {
      ...freshDb,
      events: updatedEvents
    };
    saveLocalState(newState);
    setDb(newState);
    if (onStateUpdate) onStateUpdate();
  };

  // Simulated AI Image generator with dynamic term-matching analyzer
  const runAIVisualGenerator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) {
      alert('Por favor, ingresá una idea o descripción para que la IA la procese.');
      return;
    }

    setIsGeneratingAI(true);
    setAiGeneratorLogs([]);

    const logSteps = [
      `🧠 Iniciando Imagen 3 Ultra: analizando tu idea "${aiPrompt}"...`,
      `⚙️ Decodificando ambiente: buscando referencias costeras de Mar del Plata...`,
      `🎨 Ajustando colorimetría: aplicando luz cálida de atardecer mediterráneo...`,
      `✨ ¡Imagen sintetizada con éxito!`
    ];

    // Push logs progressively for high fidelity simulation
    logSteps.forEach((log, index) => {
      setTimeout(() => {
        setAiGeneratorLogs(prev => [...prev, log]);

        // On the final step, calculate match and apply
        if (index === logSteps.length - 1) {
          const lowerPrompt = aiPrompt.toLowerCase();
          
          // Find the best matching preset based on tags
          let bestMatch = OUTDOOR_BANNER_PRESETS[0]; // Default fallback mate/picnic
          let maxScore = 0;

          OUTDOOR_BANNER_PRESETS.forEach(preset => {
            let score = 0;
            preset.tags.forEach(tag => {
              if (lowerPrompt.includes(tag)) {
                score++;
              }
            });
            if (score > maxScore) {
              maxScore = score;
              bestMatch = preset;
            }
          });

          // Fallbacks for extra creative prompts not matching regular tags
          if (maxScore === 0) {
            // General beach/surf keywords
            if (lowerPrompt.includes('mar') || lowerPrompt.includes('arena') || lowerPrompt.includes('costa') || lowerPrompt.includes('olas') || lowerPrompt.includes('playa')) {
              bestMatch = OUTDOOR_BANNER_PRESETS[5]; // Surf & Mar
            } else if (lowerPrompt.includes('amigo') || lowerPrompt.includes('reunion') || lowerPrompt.includes('juntada')) {
              bestMatch = OUTDOOR_BANNER_PRESETS[3]; // Bar & Cerveza
            }
          }

          setNewImage(bestMatch.url);
          setIsGeneratingAI(false);
        }
      }, (index + 1) * 550);
    });
  };

  const handleImageUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Por favor elegí una de menor de 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Submit New Event (Organizer)
  const handlePublishEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) {
      alert('Completá los campos obligatorios del evento por favor.');
      return;
    }

    const freshDb = getLocalState();
    const newEvent: EventActivity = {
      id: 'event_' + Date.now(),
      title: newTitle,
      description: newDesc,
      category: newCategory,
      organizerId: 'org_maria', // Default host is Maria in mock, or we can make dynamic organizer
      date: newDate,
      time: newTime,
      zone: newZone,
      image: newImage,
      spotsMax: Number(newSpots),
      registeredUserIds: [],
      isPaid: newIsPaid,
      price: newIsPaid ? newPrice : undefined,
      reviews: []
    };

    const newState = {
      ...freshDb,
      events: [newEvent, ...freshDb.events]
    };
    saveLocalState(newState);
    setDb(newState);

    setNewTitle('');
    setNewDesc('');
    // Reset image selection to default preset
    setNewImage('https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=800');
    setImageInputMethod('preset');
    setAiPrompt('');
    setAiGeneratorLogs([]);
    
    setOrganizerMessage('¡Evento guardado con éxito! Se listará enseguida en los recomendados de ' + newZone + '.');
    setTimeout(() => setOrganizerMessage(''), 4000);
    
    if (onStateUpdate) onStateUpdate();
  };

  // Delete event from DB
  const handleDeleteEvent = (eventId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const freshDb = getLocalState();
    const updatedEvents = freshDb.events.filter((ev: EventActivity) => ev.id !== eventId);
    
    const newState = {
      ...freshDb,
      events: updatedEvents
    };
    saveLocalState(newState);
    setDb(newState);
    setOpenMenuEventId(null);
    if (selectedEventId === eventId) {
      setSelectedEventId(null);
    }
    setOrganizerMessage('¡Evento eliminado con éxito!');
    setTimeout(() => setOrganizerMessage(''), 4000);
    if (onStateUpdate) onStateUpdate();
  };

  // Complete Onboarding Step
  const handleOnboardingSubmit = () => {
    if (!onbName || !onbPhone) {
      alert('Por favor, indicanos tu nombre y teléfono para que el organizador pueda validarte.');
      return;
    }

    const newUser: User = {
      id: 'user_' + Date.now(),
      name: onbName,
      photo: onbPhoto,
      email: onbName.toLowerCase().replace(/\s+/g, '') + '@gmail.com',
      phone: onbPhone,
      bio: `Hola, soy ${onbName}. ${onbReason}. Mis intereses giran en torno a: ${onbInterests.join(', ')}.`,
      interests: onbInterests.length > 0 ? onbInterests : ['deporte'],
      attendedCount: 1,
      ratingAverage: 5.0,
      plan: 'free',
      dateJoined: 'Mayo 2026',
      gender: onbGender,
      reason: onbReason,
      availableDays: onbDays,
      zonePreference: onbZone,
      noShowCount: 0
    };

    const freshDb = getLocalState();
    const newState = {
      ...freshDb,
      users: [...freshDb.users, newUser],
      currentUser: newUser
    };
    saveLocalState(newState);
    setDb(newState);
    setIsOnboarding(false);
    setOnbStep(1);
    setCurrentTab('explorar');
    if (onStateUpdate) onStateUpdate();
  };

  // Move to Step 5 (SMS verification) during onboarding
  const handleStartSmsVerification = () => {
    if (!onbName || !onbPhone) {
      alert('Por favor, indicanos tu nombre y teléfono para que el organizador pueda validarte.');
      return;
    }
    // Generate code
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setMockVerificationCode(generatedOtp);
    setUserEnteredOtp('');
    setOnbOtpError(false);
    setOnbStep(5);
    
    // Show mock push notification
    setShowMockSmsNotification(true);
    setTimeout(() => {
      setShowMockSmsNotification(false);
    }, 9000);
  };

  // Re-send OTP
  const handleResendOtp = () => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setMockVerificationCode(generatedOtp);
    setUserEnteredOtp('');
    setOnbOtpError(false);
    setShowMockSmsNotification(true);
    setTimeout(() => {
      setShowMockSmsNotification(false);
    }, 9000);
  };

  // Submit Review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingEventId) return;

    const freshDb = getLocalState();
    const updatedEvents = freshDb.events.map((ev: EventActivity) => {
      if (ev.id === reviewingEventId) {
        const newRev: Review = {
          id: 'rev_' + Date.now(),
          rating: reviewRating,
          comment: reviewComment,
          authorName: freshDb.currentUser?.name || 'Usuario Anónimo',
          authorAvatar: freshDb.currentUser?.photo,
          date: '25-05-2026',
          type: 'to_organizer'
        };
        return {
          ...ev,
          reviews: [...ev.reviews, newRev]
        };
      }
      return ev;
    });

    const newState = {
      ...freshDb,
      events: updatedEvents
    };
    saveLocalState(newState);
    setDb(newState);
    setReviewingEventId(null);
    setReviewComment('');
    alert('¡Muchas gracias por valorar tu experiencia!');
    if (onStateUpdate) onStateUpdate();
  };

  // Organizer Host administrative attendance checklist & no-show penalty rules
  const handleRecordAttendance = (userId: string, eventId: string, status: 'present' | 'noshow') => {
    const freshDb = getLocalState();
    
    // Update target user's attended count or penalize their rating due to no-show
    const updatedUsers = freshDb.users.map((u: User) => {
      if (u.id === userId) {
        const currentCount = u.attendedCount || 0;
        const currentNoShow = u.noShowCount || 0;
        const currentRating = u.ratingAverage || 5.0;

        if (status === 'present') {
          return {
            ...u,
            attendedCount: currentCount + 1
          };
        } else {
          // No-show penalty: decrease rating and increment noShowCount
          const newRating = Math.max(1.0, Number((currentRating - 0.4).toFixed(1)));
          return {
            ...u,
            noShowCount: currentNoShow + 1,
            ratingAverage: newRating
          };
        }
      }
      return u;
    });

    const newState = {
      ...freshDb,
      users: updatedUsers,
      currentUser: freshDb.currentUser && freshDb.currentUser.id === userId 
        ? (updatedUsers.find((u: User) => u.id === userId) || freshDb.currentUser)
        : freshDb.currentUser
    };

    saveLocalState(newState);
    setDb(newState);
    
    const targetName = freshDb.users.find((u: User) => u.id === userId)?.name || 'Usuario';
    setAttendanceMessage(`✓ Registrado: ${targetName} marcado como ${status === 'present' ? 'PRESENTE' : 'AUSENTE/NO-SHOW (Penalizando rating ⚠️)'}`);
    setTimeout(() => setAttendanceMessage(''), 4500);

    if (onStateUpdate) onStateUpdate();
  };

  // Toggle Conecta Plus Membership Plan
  const togglePremiumPlan = () => {
    const freshDb = getLocalState();
    if (!freshDb.currentUser) return;

    const updatedUser: User = {
      ...freshDb.currentUser,
      plan: freshDb.currentUser.plan === 'premium' ? 'free' : 'premium'
    };

    const updatedUsers = freshDb.users.map((u: User) => u.id === updatedUser.id ? updatedUser : u);
    
    const newState = {
      ...freshDb,
      users: updatedUsers,
      currentUser: updatedUser
    };
    saveLocalState(newState);
    setDb(newState);
    if (onStateUpdate) onStateUpdate();
  };

  // Launch payment checkout flow (Adjacent monetization flow)
  const handleLaunchCheckout = () => {
    setIsCheckingOut(true);
    setCheckoutStep('form');
    setCheckoutCardNumber('');
    setCheckoutCardName('');
    setCheckoutCardExpiry('');
    setCheckoutCardCvv('');
    setPaymentError('');
  };

  // Submit mock billing details (Adjacent payment processor simulation)
  const handleSubmitMockPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutCardNumber.replace(/\s+/g, '').length < 16) {
      setPaymentError('Por favor ingrese los 16 dígitos de la tarjeta.');
      return;
    }
    if (!checkoutCardExpiry.includes('/') || checkoutCardExpiry.length < 5) {
      setPaymentError('Fecha de vencimiento inválida (MM/AA).');
      return;
    }
    if (checkoutCardCvv.length < 3) {
      setPaymentError('CVC inválido.');
      return;
    }
    if (!checkoutCardName.trim()) {
      setPaymentError('Ingrese el nombre del titular de la tarjeta.');
      return;
    }

    setPaymentError('');
    setCheckoutStep('processing');
    
    // Simulate Mercado Pago / payment gateway latency
    setTimeout(() => {
      // Toggle to premium plan internally in DB
      const freshDb = getLocalState();
      if (freshDb.currentUser) {
        const uPremium: User = {
          ...freshDb.currentUser,
          plan: 'premium'
        };
        const updatedUsers = freshDb.users.map((u: User) => u.id === uPremium.id ? uPremium : u);
        
        const newState = {
          ...freshDb,
          users: updatedUsers,
          currentUser: uPremium
        };
        saveLocalState(newState);
        setDb(newState);
        if (onStateUpdate) onStateUpdate();
      }
      setCheckoutStep('success');
    }, 1800);
  };

  // Reset demo user
  const switchUser = (userId: string) => {
    const freshDb = getLocalState();
    const targetUser = freshDb.users.find((u: User) => u.id === userId);
    if (targetUser) {
      const newState = {
        ...freshDb,
        currentUser: targetUser
      };
      saveLocalState(newState);
      setDb(newState);
      if (onStateUpdate) onStateUpdate();
    }
  };

  const currentU = db.currentUser;

  // Handles switching top-level navigation tabs and cleans any detailed screens
  const handleTabClick = (tabName: string, isOrgMode: boolean = false) => {
    setIsOnboarding(false);
    setSelectedEventId(null);
    setSelectedEventForAttendanceId(null);
    setIsCheckingOut(false);
    setActiveOrganizerId(null);
    setIsOrganizerMode(isOrgMode);
    if (!isOrgMode) {
      setCurrentTab(tabName);
    }
  };

  // Filtered Activities
  const filteredEvents = db.events.filter((ev: EventActivity) => {
    // Category filter
    if (selectedCategory !== 'todos' && ev.category !== selectedCategory) {
      return false;
    }
    // Zone filter
    if (selectedZone !== 'todos' && ev.zone !== selectedZone) {
      return false;
    }
    // Search query
    if (searchQuery) {
      const txt = (ev.title + ' ' + ev.description + ' ' + ev.zone).toLowerCase();
      if (!txt.includes(searchQuery.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#FDFAF4] relative overflow-hidden select-none text-neutral-warm-800">
      
      {/* 💬 INTERACTIVE MOCKUP SMS PUSH NOTIFICATION (OTP FLOATER) */}
      {showMockSmsNotification && mockVerificationCode && (
        <div className="absolute top-2 left-2 right-2 bg-neutral-950 text-white rounded-2xl p-3.5 shadow-lg z-50 flex items-start gap-3 border border-neutral-800 transition-all duration-300">
          <div className="bg-[#FFE4E0] p-1.5 rounded-xl text-lg shrink-0">💬</div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black tracking-widest text-[#FF6347] uppercase">MENSAJE (SMS DE SEGURIDAD)</span>
              <span className="text-[8px] text-neutral-450 font-bold">AHORA</span>
            </div>
            <p className="text-xs text-neutral-200 mt-1 font-sans font-medium">
              Tu clave de activación de <strong>ConectaMdP</strong> es: <span className="font-mono bg-white/20 px-2 py-0.5 rounded font-black text-[#FF6347] text-sm tracking-widest">{mockVerificationCode}</span>
            </p>
          </div>
        </div>
      )}

      {/* Main Viewport Container */}
      <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col">

      {/* ⚙️ MODERATOR / RESIDENT HOST ATTENDANCE CHECKLIST & PENALTY OVERLAY */}
      {selectedEventForAttendanceId && (
        (() => {
          const ev = db.events.find(e => e.id === selectedEventForAttendanceId);
          if (!ev) return null;
          return (
            <div className="absolute inset-x-0 inset-y-0 bg-white z-40 flex flex-col">
              <div className="px-4 py-3 border-b border-sand-200 flex justify-between items-center shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedEventForAttendanceId(null)}
                  className="flex items-center gap-1.5 text-xs font-bold text-neutral-warm-700 hover:text-neutral-warm-900"
                >
                  <ArrowLeft className="w-4 h-4" /> Volver al panel
                </button>
                <span className="text-[10px] bg-red-50 text-[#CC3318] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                  PASE DE LISTA
                </span>
              </div>

              {/* Attendance Scroll Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="bg-sand-50 p-3 rounded-xl border border-sand-200">
                  <h4 className="font-extrabold text-sm text-neutral-warm-850 leading-tight">{ev.title}</h4>
                  <p className="text-[10px] text-neutral-warm-500 mt-1">🗓 {ev.date} · 📍 {ev.zone} · {ev.registeredUserIds.length} cupos reservados</p>
                </div>

                {attendanceMessage && (
                  <div className="p-3 bg-[#E6F7F7] text-[#005555] rounded-xl border border-primary/10 text-xs font-semibold">
                    {attendanceMessage}
                  </div>
                )}

                <div className="space-y-3">
                  <h5 className="text-[10px] font-bold text-neutral-warm-500 uppercase tracking-wider pl-1">Seleccionar asistencia de inscriptos:</h5>
                  {ev.registeredUserIds.length === 0 ? (
                    <p className="text-xs text-[#82756A] text-center py-6 italic bg-[#FBF9F6] rounded-xl border">Nadie se registró a este plan aún.</p>
                  ) : (
                    ev.registeredUserIds.map(uid => {
                      const userObj = db.users.find(u => u.id === uid);
                      if (!userObj) return null;

                      return (
                        <div key={uid} className="bg-white p-3 rounded-xl border border-sand-150 space-y-2.5 shadow-sm">
                          <div className="flex gap-2.5 items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                              <img src={userObj.photo} alt={userObj.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h6 className="text-xs font-bold text-[#3E3832] leading-none truncate pr-2">{userObj.name}</h6>
                                <span className="text-[10px] font-bold text-amber-500 shrink-0">★ {userObj.ratingAverage || 5.0}</span>
                              </div>
                              <p className="text-[10px] text-neutral-warm-500 mt-0.5">Asistidos: {userObj.attendedCount || 0} · Incurridos: <strong className={userObj.noShowCount && userObj.noShowCount > 0 ? "text-[#CC3318]" : "text-neutral-warm-600"}>{userObj.noShowCount || 0} No-Shows</strong></p>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-1 border-t border-sand-50 select-none">
                            <button
                              type="button"
                              onClick={() => handleRecordAttendance(uid, ev.id, 'present')}
                              className="flex-1 py-1.5 h-8 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 text-emerald-800 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
                            >
                              <Check className="w-3 h-3 text-emerald-600" /> Presente ✓
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRecordAttendance(uid, ev.id, 'noshow')}
                              className="flex-1 py-1.5 h-8 bg-red-50 hover:bg-red-100/70 border border-red-200 text-red-700 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
                            >
                              Reportar No-Show ⚠️
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-sand-200 bg-[#FDFAF4] shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedEventForAttendanceId(null)}
                  className="w-full py-3 h-11 rounded-full bg-primary text-white text-xs font-bold text-center hover:brightness-95 transition-all shadow-sm"
                >
                  Finalizar control ✕
                </button>
              </div>
            </div>
          );
        })()
      )}

      {/* 💳 CONECTA PLUS SIMULATED SECURE BILLING CHECKOUT PANEL */}
      {isCheckingOut && (
        <div className="absolute inset-x-0 inset-y-0 bg-white z-45 flex flex-col select-none">
          {/* Header */}
          <div className="px-4 py-3 border-b border-sand-200 flex justify-between items-center shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsCheckingOut(false);
                setCheckoutStep('form');
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-neutral-warm-700 hover:text-neutral-warm-900 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-warm-800" /> {checkoutStep === 'success' ? 'Volver a Mi Perfil' : 'Cancelar pago'}
            </button>
            <span className="text-[10px] bg-[#E6F7F7] text-primary px-3 py-0.5 rounded-full font-black uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Pago Seguro SSL
            </span>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {checkoutStep === 'form' && (
              <form onSubmit={handleSubmitMockPayment} className="space-y-4">
                <div className="text-center py-2.5">
                  <div className="w-14 h-14 bg-[#FFF0ED] rounded-full mx-auto flex items-center justify-center text-3xl mb-1.5">⚡</div>
                  <h3 className="text-lg font-black tracking-tight text-[#3E3832]">Pasarela de Facturación MdP</h3>
                  <p className="text-xs text-neutral-warm-600 mt-1">Simulador de comercio local para suscripciones Conecta Plus.</p>
                </div>

                <div className="bg-[#FEF6E4] rounded-xl p-3 border border-[#E6C280]/30 text-xs text-[#8B7550] flex gap-2 items-center leading-normal">
                  <div className="text-xl">💳</div>
                  <div>
                    <strong>Suscripción Conecta Plus:</strong> Se simulará un cobro mensual de <strong>ARS 4.900/mes</strong>. Podés volver a plan Free en cualquier momento con un click.
                  </div>
                </div>

                {paymentError && (
                  <p className="p-2 bg-red-50 text-[#CC3318] rounded-lg border border-red-150 text-[11px] font-bold text-center">
                    ⚠️ {paymentError}
                  </p>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-[#82756A] uppercase tracking-widest mb-0.5">Nombre del Titular de la Tarjeta</label>
                    <input
                      type="text"
                      required
                      value={checkoutCardName}
                      onChange={(e) => setCheckoutCardName(e.target.value)}
                      placeholder="Ej. Ana Laura Sidan"
                      className="w-full px-4 py-2 bg-[#F7F1E3] text-[#2E2822] border-transparent rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#82756A] uppercase tracking-widest mb-0.5">Número de Tarjeta (16 dígitos)</label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={checkoutCardNumber}
                      onChange={(e) => {
                        // Apply masking
                        const val = e.target.value.replace(/\D/g, '');
                        const matches = val.match(/\d{1,4}/g);
                        setCheckoutCardNumber(matches ? matches.join(' ') : val);
                      }}
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-2 bg-[#F7F1E3] text-[#2E2822] border-transparent rounded-lg text-xs font-mono tracking-wider"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-[#82756A] uppercase tracking-widest mb-0.5">Vencimiento (MM/AA)</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={checkoutCardExpiry}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length >= 2) {
                            setCheckoutCardExpiry(val.substring(0, 2) + '/' + val.substring(2, 4));
                          } else {
                            setCheckoutCardExpiry(val);
                          }
                        }}
                        placeholder="MM/AA"
                        className="w-full px-4 py-2 bg-[#F7F1E3] text-[#2E2822] border-transparent rounded-lg text-xs text-center font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#82756A] uppercase tracking-widest mb-0.5">Código CVC</label>
                      <input
                        type="password"
                        required
                        maxLength={3}
                        value={checkoutCardCvv}
                        onChange={(e) => setCheckoutCardCvv(e.target.value.replace(/\D/g, ''))}
                        placeholder="123"
                        className="w-full px-4 py-2 bg-[#F7F1E3] text-[#2E2822] border-transparent rounded-lg text-xs text-center font-mono"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-[52px] rounded-full bg-primary text-white text-xs font-bold shadow-md hover:brightness-95 transition-all flex items-center justify-center gap-1 mt-4"
                >
                  <CreditCard className="w-4 h-4" /> Procesar cobro seguro (ARS 4.900) 🌊
                </button>
              </form>
            )}

            {checkoutStep === 'processing' && (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <RefreshCw className="w-10 h-10 text-primary animate-spin" />
                <div className="text-center">
                  <h4 className="text-sm font-extrabold text-[#3E3832]">Estableciendo comunicación segura...</h4>
                  <p className="text-xs text-neutral-warm-500 mt-1 max-w-[200px] mx-auto">
                    Validando tokens de cobro con procesador de pagos locales de Mar del Plata.
                  </p>
                </div>
              </div>
            )}

            {checkoutStep === 'success' && (
              <div className="space-y-5 py-4 flex flex-col h-full shrink-0">
                <div className="text-center space-y-1.5 shrink-0">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full mx-auto flex items-center justify-center text-3xl font-bold">✓</div>
                  <h3 className="text-lg font-black tracking-tight text-neutral-warm-900">¡Pago Transaccionado Exitoso!</h3>
                  <p className="text-xs text-neutral-warm-600">Bienvenido a la membresía Premium de la costa.</p>
                </div>

                {/* Simulated Invoice/Receipt PDF visualizer aligned with WCAG 2.1 AA */}
                <div className="bg-white rounded-xl border border-sand-200 p-4 space-y-3 font-mono text-[10px] text-neutral-warm-700 shadow-sm">
                  <div className="flex justify-between border-b pb-1.5 mb-1.5 text-[9px]">
                    <span className="font-bold">CONECTA MAR DEL PLATA SRL</span>
                    <span>TICKET DE CONTROL</span>
                  </div>
                  <div className="space-y-1">
                    <p>TRANSACCIÓN ID: <span className="text-[#3E3832] font-bold">TX_CON_MBD_{Date.now().toString().substring(6)}</span></p>
                    <p>FECHA: <span className="text-[#3E3832] font-bold">25 de Mayo, 2026</span></p>
                    <p>TITULAR: <span className="text-[#3E3832] font-bold uppercase">{checkoutCardName || currentU?.name}</span></p>
                    <p>MÉTODO DE PAGO: <span className="text-[#3E3832] font-bold">TARJETA VISA (**** **** **** {checkoutCardNumber.substring(15) || '4021'})</span></p>
                    <p>ESTADO: <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">APROBADA (AUTH: 89342)</span></p>
                  </div>
                  <div className="border-t pt-1.5 flex justify-between font-bold text-xs text-neutral-warm-900">
                    <span>CONECTA PLUS SUSCRIPCIÓN</span>
                    <span>$ 4.900,00 ARS</span>
                  </div>
                </div>

                <div className="p-3 bg-primary/5 rounded-xl border border-primary/20 text-[11px] text-[#005555] leading-normal shrink-0">
                  ✨ <strong>Membresía Plus Activa:</strong> Tu insignia inteligente ya reluce en tu ficha. Ya tenés reservas ilimitadas para este mes. ¡A disfrutar la ciudad!
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsCheckingOut(false);
                    setCheckoutStep('form');
                  }}
                  className="w-full h-11 bg-primary text-white text-xs font-black rounded-full hover:brightness-95 transition-all text-center flex items-center justify-center gap-1 shadow-sm mt-4"
                >
                  Volver a Mi Perfil ✕
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 👤 ORGANIZER EXTENDED DETAIL PROFILE VIEW (Adjacent public exploration view) */}
      {activeOrganizerId && (
        (() => {
          const orgObj = db.organizers.find(o => o.id === activeOrganizerId);
          if (!orgObj) return null;
          
          const orgEvents = db.events.filter(e => e.organizerId === orgObj.id);

          return (
            <div className="absolute inset-x-0 inset-y-0 bg-[#FDFAF4] z-46 flex flex-col select-none">
              <div className="px-4 py-3 border-b border-sand-200 bg-white flex justify-between items-center shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveOrganizerId(null)}
                  className="flex items-center gap-1.5 text-xs font-bold text-neutral-warm-700 hover:text-neutral-warm-900"
                >
                  <ArrowLeft className="w-4 h-4" /> Volver al plan
                </button>
                <div className="flex gap-1">
                  <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-black">HOST VERIFICADO ✓</span>
                </div>
              </div>

              {/* Scroll Organizer Detail */}
              <div className="flex-1 overflow-y-auto pb-8">
                {/* Header card banner */}
                <div className="h-16 bg-gradient-to-r from-primary to-[#FF6347]"></div>
                <div className="px-5 pt-0 -mt-10 space-y-4">
                  
                  {/* Avatar and metadata name */}
                  <div className="text-center space-y-2">
                    <div className="w-18 h-18 rounded-full border-4 border-[#FDFAF4] overflow-hidden mx-auto shadow-sm">
                      <img src={orgObj.avatar} alt={orgObj.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base flex items-center gap-1 justify-center text-[#3E3832]">
                        {orgObj.name}
                        <ShieldCheck className="w-4 h-4 text-primary fill-blue-50/50 shrink-0" />
                      </h3>
                      <p className="text-[10px] text-neutral-warm-500 font-semibold uppercase tracking-wider mt-0.5">Conectando Mar del Plata desde el 2024</p>
                    </div>
                  </div>

                  {/* High level visual stats */}
                  <div className="grid grid-cols-3 gap-2 bg-white p-3.5 rounded-xl border border-sand-100 shadow-sm text-center">
                    <div>
                      <p className="text-[10px] text-neutral-warm-500 uppercase tracking-wider">Actividades</p>
                      <p className="text-xs font-extrabold text-neutral-warm-900">{orgObj.totalEventsOrganized || orgEvents.length + 3} armadas</p>
                    </div>
                    <div className="border-x border-sand-150">
                      <p className="text-[10px] text-neutral-warm-500 uppercase tracking-wider">Calificación</p>
                      <p className="text-xs font-extrabold text-amber-500">★ {orgObj.ratingAverage} ({orgObj.reviewCount} reviews)</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-warm-500 uppercase tracking-wider font-semibold">Preferencia</p>
                      <span className="text-[10px] font-bold text-primary uppercase">Playa & Sol</span>
                    </div>
                  </div>

                  {/* Short Bio description block */}
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold text-neutral-warm-500 uppercase tracking-widest">Biografía & Filosofía</h4>
                    <p className="text-xs text-[#5C5246] leading-relaxed bg-white/50 p-3 rounded-xl border border-sand-100 italic">
                      "{orgObj.description}"
                    </p>
                  </div>

                  {/* Active listings of meets */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-[#82756A] uppercase tracking-widest pl-1">Actividades de {orgObj.name.split(' ')[0]} ({orgEvents.length})</h4>
                    <div className="space-y-1.5">
                      {orgEvents.map(ev => {
                        const hasThisSpot = ev.spotsMax - ev.registeredUserIds.length;
                        return (
                          <div
                            key={ev.id}
                            onClick={() => { setSelectedEventId(ev.id); setActiveOrganizerId(null); }}
                            className="bg-white p-2.5 rounded-xl border border-sand-100 hover:border-sand-200 transition-all cursor-pointer flex justify-between items-center text-xs"
                          >
                            <div className="min-w-0 pr-2">
                              <h5 className="font-extrabold text-neutral-warm-850 tracking-tight truncate leading-tight">{ev.title}</h5>
                              <p className="text-[10px] text-neutral-warm-500 mt-1">🗓 {ev.date} · 📍 {ev.zone} · {ev.isPaid ? ev.price : 'Gratuito'}</p>
                            </div>
                            <span className="shrink-0 text-[10px] font-bold text-primary hover:underline font-mono">
                              {hasThisSpot === 0 ? 'COMPLETO' : `${hasThisSpot} libres`} →
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Reviews left to this organizer */}
                  <div className="space-y-2.5 pt-1">
                    <h4 className="text-[10px] font-bold text-[#82756A] uppercase tracking-widest pl-1">Valoraciones de la comunidad</h4>
                    <div className="space-y-1.5">
                      {orgEvents.flatMap(e => e.reviews).length === 0 ? (
                        <div className="p-4 bg-white/50 rounded-xl text-center text-xs text-neutral-warm-500 border border-dashed">
                          Este organizador no registra opiniones negativas ni denuncias de comportamiento. ¡Excelente anfitrión!
                        </div>
                      ) : (
                        orgEvents.flatMap(e => e.reviews).map(rev => (
                          <div key={rev.id} className="bg-white p-3 rounded-xl border border-sand-150 space-y-1 text-xs">
                            <div className="flex justify-between items-center">
                              <div className="flex gap-1.5 items-center">
                                {rev.authorAvatar && (
                                  <img src={rev.authorAvatar} alt={rev.authorName} className="w-4 h-4 rounded-full object-cover" />
                                )}
                                <span className="font-bold text-[#3E3832]">{rev.authorName}</span>
                              </div>
                              <span className="text-[10px] text-[#82756A]">{rev.date}</span>
                            </div>
                            <p className="text-[#5C5246] italic leading-relaxed text-[11px] mt-1 pl-0.5">"{rev.comment}"</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Sticky bottom CTA contact */}
              <div className="p-4 border-t border-sand-200 bg-white shadow-md text-center shrink-0">
                <p className="text-[10px] text-neutral-warm-500 mb-2">Ponte en contacto con el organizador solo para coordinaciones fidedignas</p>
                <div className="flex gap-2">
                  <a
                    href={`tel:${orgObj.phone}`}
                    className="flex-1 py-3 h-11 border border-sand-300 rounded-full text-xs font-bold text-neutral-warm-700 hover:bg-sand-50 transition-all flex items-center justify-center gap-1"
                  >
                    Llamar: {orgObj.phone.split(' ')[2] || orgObj.phone}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Contacto coordinado de WhatsApp enviado al organizador para el acceso rápido de seguridad del anfitrión.`);
                    }}
                    className="flex-1 py-3 h-11 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold transition-all"
                  >
                    Enviar Mensaje 🌊
                  </button>
                </div>
              </div>
            </div>
          );
        })()
      )}

      {/* 🚀 ONBOARDING OVERLAY */}
      {isOnboarding ? (
        <div className="flex flex-col h-full bg-[#FDFAF4]">
          {/* Header */}
          <div className="px-4 pt-6 pb-2 flex justify-between items-center border-b border-sand-200">
            {onbStep > 1 ? (
              <button 
                type="button"
                onClick={() => setOnbStep(onbStep - 1)} 
                className="text-neutral-warm-600 text-sm hover:text-neutral-warm-850 transition-all font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-neutral-warm-800" /> Volver
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => setIsOnboarding(false)} 
                className="text-neutral-warm-600 text-sm hover:text-neutral-warm-850 transition-all font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-neutral-warm-800" /> Cancelar
              </button>
            )}
            <div className="flex gap-1.5 justify-center items-center">
              <span className={`w-2 h-2 rounded-full ${onbStep === 1 ? 'bg-primary' : 'bg-sand-300'}`}></span>
              <span className={`w-2 h-2 rounded-full ${onbStep === 2 ? 'bg-primary' : 'bg-sand-300'}`}></span>
              <span className={`w-2 h-2 rounded-full ${onbStep === 3 ? 'bg-primary' : 'bg-sand-300'}`}></span>
              <span className={`w-2 h-2 rounded-full ${onbStep === 4 ? 'bg-primary' : 'bg-sand-300'}`}></span>
              <span className={`w-2 h-2 rounded-full ${onbStep === 5 ? 'bg-primary' : 'bg-sand-300'}`}></span>
            </div>
            <span className="text-[11px] font-mono text-neutral-warm-500">Paso {onbStep} de 5</span>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {onbStep === 1 && (
              <div className="space-y-4">
                <div className="text-center py-2">
                  <div className="w-16 h-16 bg-[#E6F7F7] rounded-full mx-auto flex items-center justify-center text-4xl mb-2">🌊</div>
                  <h3 className="text-xl font-bold tracking-tight">¿Por qué estás acá?</h3>
                  <p className="text-xs text-neutral-warm-600 mt-1">Usa People Conecta según tu momento de vida actual para sugerirte planes.</p>
                </div>
                
                <div className="space-y-2">
                  {[
                    'Llegué nuevo a la ciudad',
                    'Estoy en una nueva etapa',
                    'Quiero salir más de casa',
                    'Me separé o rompí mi red social',
                    'Quiero encontrar nuevos hobbies'
                  ].map((reason) => (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => setOnbReason(reason)}
                      className={`w-full p-4 rounded-xl text-left border text-sm font-medium transition-all flex justify-between items-center ${
                        onbReason === reason 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-sand-300 bg-white text-neutral-warm-700 hover:bg-sand-50'
                      }`}
                    >
                      <span>{reason}</span>
                      {onbReason === reason && <CheckCircle className="w-4 h-4 text-primary" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {onbStep === 2 && (
              <div className="space-y-4">
                <div className="text-center py-2">
                  <div className="w-16 h-16 bg-[#FFF0ED] rounded-full mx-auto flex items-center justify-center text-4xl mb-2">🏄‍♂️</div>
                  <h3 className="text-xl font-bold tracking-tight">¿Qué te interesa hacer?</h3>
                  <p className="text-xs text-neutral-warm-600 mt-1">Selecciona uno o varios hobbies para coincidir en grupos.</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-6">
                  {CATEGORIES.map((cat) => {
                    const isSelected = onbInterests.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setOnbInterests(onbInterests.filter(i => i !== cat.id));
                          } else {
                            setOnbInterests([...onbInterests, cat.id]);
                          }
                        }}
                        className={`p-3 rounded-xl border text-sm font-medium transition-all text-center flex flex-col items-center gap-1.5 ${
                          isSelected 
                            ? 'border-[#FF6347] bg-[#FFF0ED] text-[#CC3318]' 
                            : 'border-sand-300 bg-white text-neutral-warm-700 hover:bg-sand-50'
                        }`}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="capitalize">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {onbStep === 3 && (
              <div className="space-y-4">
                <div className="text-center py-2">
                  <div className="w-16 h-16 bg-amber-50 rounded-full mx-auto flex items-center justify-center text-4xl mb-2">📍</div>
                  <h3 className="text-xl font-bold tracking-tight">Tu Zona y Disponibilidad</h3>
                  <p className="text-xs text-neutral-warm-600 mt-1">Ayuda a filtrar por cercanía.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-warm-600 mb-1">¿Por qué área de Mar del Plata vivís?</label>
                    <select
                      value={onbZone}
                      onChange={(e) => setOnbZone(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-sand-300 rounded-xl text-sm"
                    >
                      {MAR_DEL_PLATA_ZONES.map(z => (
                        <option key={z} value={z}>{z}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-warm-600 mb-1">¿Qué días de la semana solés disponer de tiempo libre?</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['Lunes', 'Miércoles', 'Viernes', 'Sábado', 'Domingo'].map((day) => {
                        const contains = onbDays.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => {
                              if (contains) setOnbDays(onbDays.filter(d => d !== day));
                              else setOnbDays([...onbDays, day]);
                            }}
                            className={`py-2 px-1 text-xs rounded-lg border font-medium ${
                              contains ? 'bg-primary text-white border-primary' : 'bg-white border-sand-300 text-neutral-warm-700'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {onbStep === 4 && (
              <div className="space-y-4">
                <div className="text-center py-2">
                  <div className="w-16 h-16 bg-[#EAF2FB] rounded-full mx-auto flex items-center justify-center text-4xl mb-2">👤</div>
                  <h3 className="text-xl font-bold tracking-tight">Creá tu Perfil de Seguridad</h3>
                  <p className="text-xs text-neutral-warm-600 mt-1">Los organizadores requieren datos fidedignos para el acceso seguro.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-warm-600 mb-0.5">Nombre y Apellido Real</label>
                    <input
                      type="text"
                      value={onbName}
                      onChange={(e) => setOnbName(e.target.value)}
                      placeholder="Ej. Ana Laura Sidan"
                      className="w-full px-4 py-2.5 bg-white border border-sand-300 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-warm-600 mb-0.5">Número de Teléfono (SMS validado)</label>
                    <input
                      type="tel"
                      value={onbPhone}
                      onChange={(e) => setOnbPhone(e.target.value)}
                      placeholder="Ej. +54 223 543-5566"
                      className="w-full px-4 py-2.5 bg-white border border-sand-300 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-warm-600 mb-1">Elegí tu Avatar de Perfil</label>
                    <div className="flex gap-2 justify-center py-1">
                      {MAR_DEL_PLATA_USER_PHOTOS.map((ph, idx) => (
                        <button
                          key={ph}
                          type="button"
                          onClick={() => setOnbPhoto(ph)}
                          className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                            onbPhoto === ph ? 'border-[#FF6347] scale-110' : 'border-transparent'
                          }`}
                        >
                          <img src={ph} alt={`avatar-${idx}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-warm-600 mb-1">Género</label>
                    <div className="flex gap-2">
                      {['female', 'male', 'other'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setOnbGender(g as any)}
                          className={`flex-1 py-2 text-xs font-semibold rounded-lg border capitalize ${
                            onbGender === g ? 'bg-neutral-warm-800 text-white border-neutral-warm-800' : 'bg-white border-sand-300 text-neutral-warm-700'
                          }`}
                        >
                          {g === 'female' ? 'Mujer' : g === 'male' ? 'Varón' : 'Otro'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {onbStep === 5 && (
              <div className="space-y-4">
                <div className="text-center py-2">
                  <div className="w-16 h-16 bg-[#FFF9E6] rounded-full mx-auto flex items-center justify-center text-4xl mb-2">📲</div>
                  <h3 className="text-xl font-bold tracking-tight">Verificación SMS</h3>
                  <p className="text-xs text-neutral-warm-600 mt-1">
                    Te enviamos un código de 4 cifras por mensaje de texto SMS al teléfono <strong className="font-mono text-primary">{onbPhone}</strong>.
                  </p>
                </div>

                <div className="space-y-4 bg-white p-4 rounded-xl border border-sand-100 shadow-sm">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-warm-600 mb-1.5 text-center">Código de verificación</label>
                    <input
                      type="text"
                      maxLength={4}
                      value={userEnteredOtp}
                      onChange={(e) => {
                        setUserEnteredOtp(e.target.value.replace(/\D/g, ''));
                        setOnbOtpError(false);
                      }}
                      placeholder="Ej. 1234"
                      className="w-32 mx-auto tracking-[0.5em] font-mono font-black text-center text-lg px-2 py-3 bg-[#F7F1E3] text-[#2E2822] border-transparent rounded-xl focus:outline-none block focus:ring-0"
                    />
                  </div>

                  {onbOtpError && (
                    <p className="text-[11px] text-[#CC3318] text-center font-bold">
                      ⚠️ Código incorrecto. ¿Querés usar el código de prueba enviado o probar con "1234"?
                    </p>
                  )}

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Volver a enviar SMS 🔄
                    </button>
                    <p className="text-[10px] text-neutral-warm-500 mt-1 select-none">El simulador te mostrará una notificación flotante con el nuevo código.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="p-4 border-t border-sand-200 bg-white">
            {onbStep < 4 ? (
              <button
                type="button"
                onClick={() => setOnbStep(onbStep + 1)}
                className="w-full py-4 h-[56px] rounded-full bg-primary text-white font-bold hover:brightness-95 transition-all text-sm flex items-center justify-center gap-1 shadow-elevation-1"
              >
                Siguiente Paso <ChevronRight className="w-4 h-4" />
              </button>
            ) : onbStep === 4 ? (
              <button
                type="button"
                onClick={handleStartSmsVerification}
                className="w-full py-4 h-[56px] rounded-full bg-primary text-white font-bold hover:brightness-95 transition-all text-sm flex items-center justify-center gap-1 shadow-elevation-2"
              >
                Verificar Teléfono (SMS) 💬
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (userEnteredOtp === mockVerificationCode || userEnteredOtp === '1234') {
                    handleOnboardingSubmit();
                  } else {
                    setOnbOtpError(true);
                  }
                }}
                className="w-full py-4 h-[56px] rounded-full bg-[#FF6347] text-white font-bold hover:brightness-95 transition-all text-sm flex items-center justify-center gap-1 shadow-elevation-2"
              >
                Completar Registro 🌊
              </button>
            )}
          </div>
        </div>
      ) : selectedEventId ? (
        
        /* 📖 EVENT DETAIL VIEW */
        (() => {
          const ev = db.events.find(e => e.id === selectedEventId);
          if (!ev) return <p className="p-4 text-center">Plan no encontrado.</p>;

          const org = db.organizers.find(o => o.id === ev.organizerId) || db.organizers[0];
          const isUserRegistered = currentU ? ev.registeredUserIds.includes(currentU.id) : false;
          const spotsLeft = ev.spotsMax - ev.registeredUserIds.length;
          const spotsPercent = (ev.registeredUserIds.length / ev.spotsMax) * 100;

          return (
            <div className="flex flex-col h-full bg-[#FDFAF4]">
              {/* Back Bar */}
              <div className="px-4 py-3 flex justify-between items-center border-b border-sand-200 bg-white sticky top-0 z-10">
                <button 
                  type="button"
                  onClick={() => setSelectedEventId(null)}
                  className="p-1 text-neutral-warm-700 hover:text-neutral-warm-900 transition-all font-semibold flex items-center gap-1 text-sm"
                >
                  <ArrowLeft className="w-5 h-5 text-neutral-warm-800" /> Volver
                </button>
                <div className="flex items-center gap-1.5 bg-[#FFF0ED] py-1 px-2.5 rounded-full text-xs text-[#CC3318] font-bold uppercase tracking-wider">
                  <span>{CATEGORIES.find(c => c.id === ev.category)?.icon}</span>
                  <span>{ev.category}</span>
                </div>
              </div>

              {/* Scroll Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="h-44 w-full relative bg-neutral-200">
                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-[10px] font-bold bg-[#E6F7F7] text-[#005555] px-2.5 py-0.5 rounded-full uppercase tracking-widest block w-fit mb-1">
                      {ev.isPaid ? `PAGO · ${ev.price}` : 'GRATUITO'}
                    </span>
                    <h2 className="text-lg font-bold tracking-tight text-white leading-tight drop-shadow-md">
                      {ev.title}
                    </h2>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {/* Spots indicator */}
                  <div className="bg-white p-4 rounded-xl border border-sand-100 shadow-elevation-1 space-y-2.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-neutral-warm-600">Cupos confirmados:</span>
                      <span className="font-bold text-neutral-warm-800">
                        {ev.registeredUserIds.length} / {ev.spotsMax} ({spotsLeft} disponibles)
                      </span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="h-2 w-full bg-sand-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          spotsLeft <= 1 ? 'bg-coral-400' : spotsLeft <= 3 ? 'bg-amber-500' : 'bg-primary'
                        }`}
                        style={{ width: `${spotsPercent}%` }}
                      ></div>
                    </div>
                    <div className="flex gap-4 items-center text-xs text-neutral-warm-600 pt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span className="font-medium text-neutral-warm-800">{ev.zone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span className="font-medium text-neutral-warm-800">{ev.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span className="font-medium text-neutral-warm-800">{ev.time} hs</span>
                      </div>
                    </div>
                  </div>

                  {/* Over the plan */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-neutral-warm-500 uppercase tracking-widest">Sobre este plan</h4>
                    <p className="text-sm text-neutral-warm-700 leading-relaxed bg-white/70 p-3 rounded-xl border border-sand-100 italic">
                      "{ev.description}"
                    </p>
                  </div>

                  {/* Organizer section */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center pr-1">
                      <h4 className="text-xs font-bold text-neutral-warm-500 uppercase tracking-widest">Organiza</h4>
                      <button
                        type="button"
                        onClick={() => setActiveOrganizerId(org.id)}
                        className="text-[10px] font-extrabold text-primary hover:underline hover:cursor-pointer"
                      >
                        Ver perfil de Host →
                      </button>
                    </div>
                    <div 
                      onClick={() => setActiveOrganizerId(org.id)}
                      className="bg-white p-3.5 rounded-xl border border-sand-100 flex gap-3 items-center cursor-pointer hover:border-primary/20 hover:bg-sand-50 transition-all shadow-sm"
                    >
                      <div className="w-11 h-11 rounded-full overflow-hidden border border-primary/20 shrink-0">
                        <img src={org.avatar} alt={org.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 font-sans">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-neutral-warm-800 truncate">{org.name}</span>
                          {org.isVerified && <span className="bg-[#EAF2FB] text-primary p-0.5 rounded-full text-[9px] font-bold px-1.5 scale-90 shrink-0">Verificado ✓</span>}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5 text-xs text-neutral-warm-600 font-medium">
                          <div className="flex text-amber-500 shrink-0">
                            <Star className="w-3 h-3 fill-amber-500" />
                          </div>
                          <span>{org.ratingAverage} ({org.reviewCount} reseñas) · <strong className="text-primary hover:underline font-bold text-[11px]">Ver más</strong></span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-warm-500 leading-normal pl-1">
                      {org.description}
                    </p>
                  </div>

                  {/* Companions already in list */}
                  <div className="space-y-2 pb-8">
                    <h4 className="text-xs font-bold text-neutral-warm-500 uppercase tracking-widest">Quiénes se anotaron ({ev.registeredUserIds.length})</h4>
                    {ev.registeredUserIds.length === 0 ? (
                      <div className="text-center p-6 bg-white rounded-xl border border-dashed border-sand-300">
                        <Users className="w-6 h-6 text-neutral-warm-400 mx-auto mb-1.5" />
                        <p className="text-sm font-bold text-neutral-warm-700">¡Nadie anotado todavía!</p>
                        <p className="text-xs text-neutral-warm-500">Sé el primero en anotarte para romper el hielo 🌊</p>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {ev.registeredUserIds.map(uid => {
                          const companion = db.users.find(u => u.id === uid);
                          if (!companion) return null;
                          return (
                            <div key={uid} className="bg-white p-2.5 rounded-xl border border-sand-100 flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full overflow-hidden">
                                <img src={companion.photo} alt={companion.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-neutral-warm-800">{companion.name}</span>
                                  <span className="text-[10px] text-neutral-warm-500 font-medium">Asistió: {companion.attendedCount} planes</span>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {companion.interests.map(i => (
                                    <span key={i} className="text-[9px] bg-sand-100 text-[#6B5A3E] px-1.5 rounded-md py-0.5 uppercase tracking-wider font-semibold">
                                      {i}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sticky bottom CTA footer */}
              <div className="p-4 border-t border-sand-200 bg-white space-y-2">
                <div className="flex justify-between items-center text-xs text-neutral-warm-500 px-1">
                  <span>Reunión grupal presencial</span>
                  <span>Podés cancelar hasta 24h antes</span>
                </div>
                {isUserRegistered ? (
                  <button
                    type="button"
                    onClick={(e) => handleEnroll(ev.id, e)}
                    className="w-full py-4 h-[56px] rounded-full border-2 border-red-200 text-red-600 bg-red-50/50 font-bold hover:bg-red-50 text-sm transition-all"
                  >
                    Salir de este plan
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => handleEnroll(ev.id, e)}
                    disabled={spotsLeft === 0}
                    className={`w-full py-4 h-[56px] rounded-full text-white font-bold text-sm transition-all ${
                      spotsLeft === 0 
                        ? 'bg-neutral-warm-300 pointer-events-none' 
                        : 'bg-[#FF6347] hover:brightness-95 shadow-elevation-2'
                    }`}
                  >
                    {spotsLeft === 0 ? 'Sin cupos disponibles' : 'Confirmar: Me anoto al plan 🌊'}
                  </button>
                )}
              </div>
            </div>
          );
        })()

      ) : isOrganizerMode ? (
        
        /* ⚙ ORGANIZER ADMINISTRATIVE DASHBOARD (Flujo 3) */
        <div className="flex flex-col h-full bg-[#FDFAF4]">
          {/* Top Bar for dashboard */}
          <div className="px-4 pt-5 pb-3 border-b border-sand-200 bg-white flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => { setIsOrganizerMode(false); setCurrentTab('explorar'); }}
              className="p-1 hover:bg-sand-100 rounded-full text-neutral-warm-850 shrink-0 cursor-pointer"
              title="Volver a Explorar"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-warm-800" />
            </button>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-xl font-extrabold tracking-tight">Panel del Organizador</h2>
                <span className="text-[11px] font-bold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full uppercase">MODO HOST</span>
              </div>
              <p className="text-xs text-neutral-warm-600">Creá un grupo, mapeá tu infraestructura y da de alta actividades gratis.</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {organizerMessage && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-100 font-semibold">
                {organizerMessage}
              </div>
            )}

            {/* Quick stats for host verification */}
            <div className="grid grid-cols-3 gap-2 bg-white border border-sand-100 p-3 rounded-xl shadow-elevation-1 text-center">
              <div>
                <p className="text-xs text-neutral-warm-600">Eventos</p>
                <p className="text-base font-extrabold text-primary">
                  {db.events.filter(e => e.organizerId === 'org_maria').length}
                </p>
              </div>
              <div className="border-x border-sand-200">
                <p className="text-xs text-neutral-warm-600">Inscriptos</p>
                <p className="text-base font-extrabold text-primary">
                  {db.events.filter(e => e.organizerId === 'org_maria').reduce((acc, current) => acc + current.registeredUserIds.length, 0)}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-warm-600">Reputación</p>
                <p className="text-base font-extrabold text-amber-500">★ 4.8</p>
              </div>
            </div>

            {/* Event Form */}
            <form onSubmit={handlePublishEvent} className="bg-white p-4 rounded-xl border border-sand-200 shadow-elevation-1 space-y-3.5">
              <h3 className="text-xs font-bold text-neutral-warm-500 uppercase tracking-wider">➕ Dar de alta nuevo evento</h3>
              
              <div>
                <label className="block text-[11px] font-semibold text-neutral-warm-600 mb-0.5">Título del Plan (Ej. Fogón Acústico)</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. Taller literario en Plaza Mitre"
                  className="w-full px-3.5 py-2.5 bg-[#F7F1E3] text-[#2E2822] rounded-lg border border-transparent text-xs text-neutral-warm-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-warm-600 mb-0.5">Descripción de la Actividad</label>
                <textarea
                  required
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Detalla qué van a hacer, si hay que llevar algo y el punto de encuentro exacto..."
                  className="w-full px-3.5 py-2 bg-[#F7F1E3] text-[#2E2822] rounded-lg border border-transparent text-xs text-neutral-warm-800 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-warm-600 mb-0.5">Categoría</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CategoryType)}
                    className="w-full px-2 py-2 bg-white border border-sand-300 rounded-lg text-xs"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-warm-600 mb-0.5">Zona de encuentro</label>
                  <select
                    value={newZone}
                    onChange={(e) => setNewZone(e.target.value)}
                    className="w-full px-2 py-2 bg-white border border-sand-300 rounded-lg text-xs"
                  >
                    {MAR_DEL_PLATA_ZONES.map(z => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-warm-600 mb-0.5">Fecha</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-sand-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-warm-600 mb-0.5">Hora</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="18:30"
                    className="w-full px-2 py-1.5 bg-white border border-sand-300 rounded-lg text-xs text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 items-center">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-warm-600 mb-0.5">Cupos máximos</label>
                  <input
                    type="number"
                    min={3}
                    max={20}
                    value={newSpots}
                    onChange={(e) => setNewSpots(Number(e.target.value))}
                    className="w-full px-2 py-1.5 bg-white border border-sand-300 rounded-lg text-xs text-center"
                  />
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="paid"
                    checked={newIsPaid}
                    onChange={(e) => setNewIsPaid(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-0"
                  />
                  <label htmlFor="paid" className="text-[11px] font-semibold text-neutral-warm-800">¿Es un evento pago?</label>
                </div>
              </div>

              {newIsPaid && (
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-warm-600 mb-1">Precio (en pesos o consumisión)</label>
                  <input
                    type="text"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-sand-300 rounded-lg text-xs text-neutral-warm-800"
                  />
                </div>
              )}

              {/* Photo selection section */}
              <div className="border-t border-sand-150 pt-3.5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-neutral-warm-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-primary" /> Foto de Portada o Imagen del Plan
                  </span>
                  <span className="text-[10px] text-neutral-warm-500 font-medium">Recomendado horizontal</span>
                </div>

                {/* Cover Preview Image */}
                <div className="relative w-full h-32 rounded-xl overflow-hidden border border-sand-200 bg-sand-100 group shadow-inner">
                  <img src={newImage} alt="Portada de la actividad" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-1.5 flex justify-between items-center text-white text-[10px] backdrop-blur-sm font-semibold">
                    <span>Vista previa actual</span>
                    <span className="text-[9px] uppercase tracking-wider bg-white/25 px-1.5 py-0.5 rounded">
                      {imageInputMethod === 'preset' ? 'Preset' : imageInputMethod === 'file' ? 'Subido' : 'Con IA'}
                    </span>
                  </div>
                </div>

                {/* Mode Select Tabs */}
                <div className="grid grid-cols-3 gap-1 bg-sand-105 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setImageInputMethod('preset')}
                    className={`py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                      imageInputMethod === 'preset' ? 'bg-white text-neutral-warm-850 shadow-sm' : 'text-neutral-warm-600 hover:text-neutral-warm-800'
                    }`}
                  >
                    Estilos Predet.
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageInputMethod('file')}
                    className={`py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                      imageInputMethod === 'file' ? 'bg-white text-neutral-warm-850 shadow-sm' : 'text-neutral-warm-600 hover:text-neutral-warm-800'
                    }`}
                  >
                    Subir de PC
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageInputMethod('ai')}
                    className={`py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      imageInputMethod === 'ai' ? 'bg-white text-neutral-warm-850 shadow-sm' : 'text-neutral-warm-600 hover:text-neutral-warm-800'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" /> Crear con IA
                  </button>
                </div>

                {/* Sub-modes render */}
                {imageInputMethod === 'preset' && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-neutral-warm-500 pl-1">Elegí una estética para tu grupo:</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {OUTDOOR_BANNER_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setNewImage(preset.url)}
                          className={`relative h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            newImage === preset.url ? 'border-primary shadow-sm scale-[1.02]' : 'border-transparent opacity-80 hover:opacity-100'
                          }`}
                        >
                          <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors flex items-center justify-center p-0.5">
                            <span className="text-[8px] font-bold text-white leading-tight text-center truncate w-full drop-shadow-md">
                              {preset.label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {imageInputMethod === 'file' && (
                  <div className="p-3 bg-white border border-dashed border-sand-300 rounded-xl flex flex-col justify-center items-center text-center gap-1.5 hover:bg-sand-50/50 transition-colors relative">
                    <Upload className="w-5 h-5 text-neutral-warm-500" />
                    <div>
                      <p className="text-[10px] font-bold text-neutral-warm-800">Cargar foto del celular o PC</p>
                      <p className="text-[9px] text-neutral-warm-500">Haz click para buscar o soltar archivo (máx 5MB)</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUploadFiles}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                )}

                {imageInputMethod === 'ai' && (
                  <div className="bg-sand-50/85 p-3 rounded-xl border border-sand-200 space-y-2">
                    <div className="flex gap-1 items-center">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                      <p className="text-[10px] font-bold text-neutral-warm-800">Generá con IA (Imagen 3 Ultra integrada)</p>
                    </div>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="Ej. Fogata en la playa con gente cantando..."
                        className="flex-1 min-w-0 px-2.5 py-2 bg-white rounded-lg border border-sand-250 text-[11px] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={runAIVisualGenerator}
                        disabled={isGeneratingAI}
                        className="px-3 py-2 bg-[#FF6347] text-white rounded-lg text-[10px] font-bold hover:brightness-95 disabled:bg-neutral-warm-400 cursor-pointer shrink-0"
                      >
                        {isGeneratingAI ? 'Creando...' : 'Generar ✨'}
                      </button>
                    </div>

                    {isGeneratingAI && (
                      <div className="flex flex-col justify-center items-center py-2 gap-1.5 text-center">
                        <RefreshCw className="w-5 h-5 text-[#FF6347] animate-spin" />
                        <span className="text-[9px] text-[#FF6347] font-semibold font-sans">Simulando rendering Imagen 3...</span>
                      </div>
                    )}

                    {aiGeneratorLogs.length > 0 && (
                      <div className="p-2 bg-neutral-900 rounded-lg text-[9px] text-emerald-400 font-mono space-y-0.5 leading-normal max-h-24 overflow-y-auto">
                        {aiGeneratorLogs.map((log, i) => (
                          <div key={i} className="flex gap-1 items-start">
                            <span>&gt;</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-primary text-white text-xs font-bold rounded-full hover:brightness-95 transition-all shadow-elevation-1 mt-2 cursor-pointer"
              >
                Publicar actividad en cartelera 🚀
              </button>
            </form>

            {/* List of my hosted events */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-neutral-warm-500 uppercase tracking-widest pl-1">Tus eventos publicados</h3>
              {db.events.filter(e => e.organizerId === 'org_maria').map(ev => (
                <div key={ev.id} className="bg-white p-3 rounded-xl border border-sand-100 shadow-elevation-1 flex flex-col gap-2">
                  <div className="flex justify-between items-start relative">
                    <div className="flex-1 min-w-0 pr-2 flex flex-col justify-start">
                      <h4 className="text-sm font-bold text-neutral-warm-800 leading-tight truncate">{ev.title}</h4>
                      <p className="text-[10px] text-neutral-warm-500 mt-1">🗓 {ev.date} · 📍 {ev.zone} · {ev.isPaid ? 'PAGO' : 'MATE/GRATIS'}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-xs bg-[#E6F7F7] text-primary px-2 py-0.5 rounded-full font-bold">
                        {ev.registeredUserIds.length} / {ev.spotsMax} cupos
                      </span>
                      
                      {/* 3-dots options menu */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuEventId(openMenuEventId === ev.id ? null : ev.id);
                          }}
                          className="p-1 hover:bg-sand-100 rounded text-neutral-warm-600 hover:text-neutral-warm-850 cursor-pointer transition-colors"
                          title="Opciones"
                          id={`btn-options-${ev.id}`}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {openMenuEventId === ev.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-20" 
                              onClick={() => setOpenMenuEventId(null)}
                            />
                            <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-sand-100 py-1 z-30 text-right origin-top-right">
                              <button
                                type="button"
                                onClick={(e) => handleDeleteEvent(ev.id, e)}
                                className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                              >
                                🗑️ Eliminar plan
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {ev.registeredUserIds.length > 0 && (
                    <div className="border-t border-sand-100 pt-2 flex flex-col gap-1.5">
                      <div className="flex justify-between items-center bg-[#F9F7F4] p-1.5 rounded-lg border border-sand-100">
                        <p className="text-[9px] font-black tracking-wider text-[#796F65] uppercase">Inscriptos</p>
                        <button
                          type="button"
                          onClick={() => setSelectedEventForAttendanceId(ev.id)}
                          className="px-2 py-0.5 bg-[#FFF0ED] hover:bg-[#FFE4E0] text-[#CC3318] rounded text-[9px] font-bold uppercase tracking-wider transition-all"
                        >
                          📋 Pasar Lista / No-Show
                        </button>
                      </div>
                      <div className="space-y-1">
                        {ev.registeredUserIds.map(uid => {
                          const asis = db.users.find(u => u.id === uid);
                          if (!asis) return null;
                          return (
                            <div key={uid} className="flex justify-between items-center text-xs bg-sand-50 p-1.5 rounded-lg border border-sand-100">
                              <span className="font-semibold text-neutral-warm-800 truncate block max-w-[120px]">{asis.name}</span>
                              <span className="font-mono text-[10px] text-primary">{asis.phone}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      ) : (

        /* 📱 EXPLORACIÓN / PRINCIPAL APP WRAPPERS */
        <div className="flex flex-col h-full bg-[#FDFAF4]">
          {/* Main screens render by simple tabs */}
          {currentTab === 'explorar' && (
            <div className="flex flex-col h-full">
              {/* Dynamic Search box */}
              <div className="px-4 pt-5 pb-2 bg-white space-y-3 shadow-sm">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-warm-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar surf, idiomas, fogón..."
                    className="w-full bg-[#F7F1E3] text-[#2E2822] placeholder-[#A89468] pl-10 pr-4 py-2 rounded-full text-xs"
                  />
                </div>

                {/* Filter selects rows with category chips */}
                <div className="flex gap-2 items-center text-xs pb-1">
                  <span className="text-neutral-warm-600 font-bold whitespace-nowrap">Área:</span>
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="bg-transparent border-b border-sand-300 py-0.5 font-bold text-primary focus:outline-none"
                  >
                    <option value="todos">Todos los barrios</option>
                    {MAR_DEL_PLATA_ZONES.map(z => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Horizontal Categories chips bar */}
              <div className="flex gap-1.5 overflow-x-auto py-2.5 px-4 bg-[#FDFAF4] border-b border-sand-200">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('todos')}
                  className={`px-3 py-1.5 h-10 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === 'todos' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-neutral-warm-700 border border-sand-200 hover:bg-white'
                  }`}
                >
                  🌊 Todos
                </button>
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 h-10 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
                        isActive 
                          ? `${cat.bg} border-2 border-primary ${cat.text}` 
                          : 'bg-white text-neutral-warm-700 border border-neutral-warm-200 hover:bg-neutral-light'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span className="capitalize">{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Exploration Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                
                {/* Simulated matching callout for personalized feel */}
                {currentU && (
                  <div className="bg-[#E6F7F7] p-3 rounded-xl border border-primary/20 flex gap-2 items-center text-xs text-[#005555]">
                    <Sparkles className="w-4 h-4 text-primary shrink-0" />
                    <span>Planes sugeridos para <strong>{currentU.name}</strong> en {currentU.zonePreference}.</span>
                  </div>
                )}

                <div className="space-y-3.5 pb-6">
                  {filteredEvents.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-sand-300">
                      <p className="text-3xl mb-1">🏖️</p>
                      <h4 className="text-sm font-bold text-neutral-warm-800">No encontramos planes</h4>
                      <p className="text-xs text-neutral-warm-500 mt-1 max-w-[200px] mx-auto">Trata removiendo los filtros o busca en otros barrios.</p>
                      <button
                        type="button"
                        onClick={() => { setSelectedCategory('todos'); setSelectedZone('todos'); setSearchQuery(''); }}
                        className="mt-3 px-4 py-1.5 text-xs font-bold text-primary border border-primary rounded-full hover:bg-primary-container"
                      >
                        Limpiar filtros
                      </button>
                    </div>
                  ) : (
                    filteredEvents.map((ev: EventActivity) => {
                      const spotsRemaining = ev.spotsMax - ev.registeredUserIds.length;
                      const hasMe = currentU ? ev.registeredUserIds.includes(currentU.id) : false;

                      return (
                        <div 
                          key={ev.id}
                          onClick={() => setSelectedEventId(ev.id)}
                          className="bg-white rounded-2xl overflow-hidden border border-sand-100 shadow-elevation-1 cursor-pointer hover:shadow-elevation-2 active:scale-[0.99] transition-all flex flex-col"
                        >
                          {/* Image and Category badge */}
                          <div className="h-28 w-full relative bg-neutral-200">
                            <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm py-1 px-2.5 rounded-full text-[10px] font-black uppercase tracking-wider text-neutral-warm-800">
                              {CATEGORIES.find(c => c.id === ev.category)?.icon} {ev.category}
                            </div>
                            {spotsRemaining <= 1 ? (
                              <div className="absolute top-2 right-2 bg-[#FFF0ED] text-red-600 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
                                🔥 1 Lugar
                              </div>
                            ) : spotsRemaining <= 3 ? (
                              <div className="absolute top-2 right-2 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
                                ⏳ Últimos cupos
                              </div>
                            ) : null}
                          </div>

                          {/* Info area */}
                          <div className="p-3.5 space-y-2">
                            <div className="flex justify-between items-start">
                              <h4 className="font-extrabold text-sm text-neutral-warm-800 leading-tight hover:text-primary transition-colors">
                                {ev.title}
                              </h4>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-neutral-warm-600 font-medium">
                              <span className="flex items-center gap-1 font-bold text-neutral-warm-800">
                                <MapPin className="w-3 h-3 text-primary shrink-0" /> {ev.zone}
                              </span>
                              <span className="flex items-center gap-1 shadow-sm px-1.5 py-0.5 bg-neutral-warm-50 rounded">
                                <Calendar className="w-3 h-3 text-primary shrink-0" /> {ev.date} · {ev.time} hs
                              </span>
                            </div>

                            {/* Companion profiles */}
                            <div className="flex justify-between items-center pt-2.5 border-t border-sand-50">
                              <div className="flex items-center gap-1.5 text-[10px] text-neutral-warm-600">
                                <div className="flex -space-x-1.5 h-6">
                                  {ev.registeredUserIds.slice(0, 3).map((uid, idx) => {
                                    const userObj = db.users.find(u => u.id === uid);
                                    if (!userObj) return null;
                                    return (
                                      <img 
                                        key={uid} 
                                        src={userObj.photo} 
                                        alt={userObj.name} 
                                        className="w-5 h-5 rounded-full border border-white object-cover" 
                                      />
                                    );
                                  })}
                                </div>
                                <span className="text-[10px] text-neutral-warm-600 font-medium">
                                  {ev.registeredUserIds.length === 0 
                                    ? 'Sé el primero' 
                                    : `${ev.registeredUserIds.length} confirmados`}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={(e) => handleEnroll(ev.id, e)}
                                className={`px-4 py-1.5 h-9 rounded-full text-[11px] font-extrabold shadow-sm transition-all flex items-center gap-1 ${
                                  hasMe 
                                    ? 'bg-[#EAF2FB] text-primary border border-primary/20' 
                                    : 'bg-primary text-white hover:brightness-95'
                                }`}
                              >
                                {hasMe ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" /> Anotado
                                  </>
                                ) : (
                                  'Anotarme 🌊'
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {currentTab === 'planes' && (
            <div className="flex flex-col h-full">
              {/* Tab selector */}
              <div className="px-4 pt-5 pb-3 bg-white border-b border-sand-200 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setCurrentTab('explorar')}
                  className="p-1 hover:bg-sand-100 rounded-full text-neutral-warm-850 shrink-0 cursor-pointer"
                  title="Volver a Explorar"
                >
                  <ArrowLeft className="w-5 h-5 text-neutral-warm-800" />
                </button>
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight">Mis Planes</h2>
                  <p className="text-xs text-neutral-warm-600">Revisá tus próximas asistencias o valora eventos pasados.</p>
                </div>
              </div>

              {/* Display registered events list */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Filter registered */}
                {(() => {
                  if (!currentU) {
                    return (
                      <div className="text-center py-10 bg-white rounded-2xl p-4 border">
                        <p className="text-4xl">🔑</p>
                        <h4 className="text-sm font-bold text-neutral-warm-800">Registrate para guardar tus planes</h4>
                        <button 
                          type="button"
                          onClick={() => setIsOnboarding(true)} 
                          className="mt-4 px-6 py-2.5 bg-primary text-white font-bold text-xs rounded-full hover:brightness-95 shadow-sm"
                        >
                          Iniciar Onboarding
                        </button>
                      </div>
                    );
                  }

                  const myEnrolled = db.events.filter(e => e.registeredUserIds.includes(currentU.id));

                  if (myEnrolled.length === 0) {
                    return (
                      <div className="text-center py-10 bg-white rounded-2xl p-4 border border-dashed border-sand-300">
                        <p className="text-4xl">🏝️</p>
                        <h4 className="text-sm font-bold text-neutral-warm-800">No te anotaste a ningún plan todavía</h4>
                        <p className="text-xs text-neutral-warm-500 mt-1 max-w-[200px] mx-auto">
                          Empezá explorando las categorías costa o interior de Mar del Plata.
                        </p>
                        <button 
                          type="button"
                          onClick={() => setCurrentTab('explorar')} 
                          className="mt-4 px-6 py-2 h-10 bg-[#FF6347] text-white font-bold text-xs rounded-full hover:brightness-95"
                        >
                          Explorar actividades
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-4 pb-8">
                      {/* Enrolled activities */}
                      <h3 className="text-xs font-bold text-neutral-warm-500 uppercase tracking-widest pl-1">Próximas Reservas Confirmadas</h3>
                      
                      {myEnrolled.map(ev => {
                        const spotsPercent = ((ev.spotsMax - ev.registeredUserIds.length) / ev.spotsMax) * 100;
                        const isReviewOpen = reviewingEventId === ev.id;

                        return (
                          <div key={ev.id} className="bg-white rounded-xl border border-sand-100 p-3 shadow-elevation-1 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[9px] font-bold text-[#CC3318] bg-[#FFF0ED] px-2 py-0.5 rounded-full uppercase tracking-wider">
                                  {ev.category}
                                </span>
                                <h4 className="text-xs font-extrabold text-neutral-warm-800 mt-1">{ev.title}</h4>
                                <p className="text-[10px] text-neutral-warm-500 mt-0.5">🗓 {ev.date} hab. marplatense · 📍 {ev.zone}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setSelectedEventId(ev.id)}
                                className="text-[11px] font-bold text-primary hover:underline shrink-0"
                              >
                                Ver entrada
                              </button>
                            </div>

                            {/* Give review button simulator */}
                            <div className="flex justify-between items-center text-xs border-t border-sand-50 pt-2.5">
                              <span className="text-[10px] text-neutral-warm-500 font-medium">Asiste con {ev.registeredUserIds.length - 1} compañeros</span>
                              
                              <button
                                type="button"
                                onClick={() => setReviewingEventId(isReviewOpen ? null : ev.id)}
                                className="text-[11px] font-bold text-amber-600 hover:brightness-90 flex items-center gap-1"
                              >
                                <MessageSquare className="w-3.5 h-3.5" /> {isReviewOpen ? 'Cerrar Reseña' : 'Valorar plan post-encuentro'}
                              </button>
                            </div>

                            {/* Collapsible review sheet simulated inside molecule */}
                            {isReviewOpen && (
                              <form onSubmit={handleSubmitReview} className="bg-sand-50 p-3 rounded-lg border border-amber-100 space-y-2 mt-2 transition-all">
                                <p className="text-[11px] font-bold text-amber-800">Calificá al Organizador:</p>
                                <div className="flex gap-1.5 pb-2">
                                  {[1, 2, 3, 4, 5].map((val) => (
                                    <button
                                      key={val}
                                      type="button"
                                      onClick={() => setReviewRating(val)}
                                      className="text-amber-500 hover:scale-110 select-none"
                                    >
                                      <Star className={`w-5 h-5 ${reviewRating >= val ? 'fill-amber-500' : 'text-neutral-warm-300'}`} />
                                    </button>
                                  ))}
                                </div>
                                <textarea
                                  value={reviewComment}
                                  onChange={(e) => setReviewComment(e.target.value)}
                                  placeholder="Escribí un comentario breve sobre la onda del organizador y del grupo..."
                                  rows={2}
                                  className="w-full bg-white p-2 text-xs border border-sand-300 rounded focus:outline-none"
                                />
                                <button
                                  type="submit"
                                  className="w-full py-2 bg-amber-500 text-white font-bold text-[10px] rounded hover:brightness-95"
                                >
                                  Enviar valoración pública ⭐
                                </button>
                              </form>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {currentTab === 'perfil' && (
            <div className="flex flex-col h-full">
              {/* Profile Card details */}
              <div className="px-4 pt-5 pb-3 bg-white border-b border-sand-200 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setCurrentTab('explorar')}
                  className="p-1 hover:bg-sand-100 rounded-full text-neutral-warm-850 shrink-0 cursor-pointer"
                  title="Volver a Explorar"
                >
                  <ArrowLeft className="w-5 h-5 text-neutral-warm-800" />
                </button>
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight">Mi Perfil</h2>
                  <p className="text-xs text-neutral-warm-600">Gestionas tu cuenta segura e interés preferencial.</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentU ? (
                  <div className="space-y-4">
                    {/* Public details */}
                    <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-elevation-1">
                      <div className="h-10 bg-gradient-to-r from-primary to-primary-container"></div>
                      
                      <div className="p-4 pt-0 text-center -mt-8 relative space-y-2.5">
                        <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden mx-auto shadow-sm">
                          <img src={currentU.photo} alt={currentU.name} className="w-full h-full object-cover" />
                        </div>

                        <div>
                          <h3 className="font-extrabold text-base flex items-center gap-1 justify-center">
                            {currentU.name}
                            {currentU.plan === 'premium' && (
                              <span className="bg-[#FFF0ED] text-[#CC3318] text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-red-200 shadow-sm animate-pulse">
                                PLUS ✨
                              </span>
                            )}
                          </h3>
                          <p className="text-[10px] text-neutral-warm-500">{currentU.reason} · Miembro desde {currentU.dateJoined}</p>
                        </div>

                        {/* Interactive Bio */}
                        <p className="text-xs text-neutral-warm-700 italic px-2">
                          "{currentU.bio}"
                        </p>

                        <div className="border-t border-sand-100 pt-3 flex justify-around text-center">
                          <div>
                            <p className="text-[10px] text-neutral-warm-500 uppercase tracking-widest">Planes</p>
                            <p className="text-sm font-extrabold text-[#2E2822]">{currentU.attendedCount} asistidos</p>
                          </div>
                          <div className="border-l border-sand-100"></div>
                          <div>
                            <p className="text-[10px] text-neutral-warm-500 uppercase tracking-widest">Reputación</p>
                            <p className="text-sm font-extrabold text-amber-500">★ {currentU.ratingAverage}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CONECTA PLUS SUBSCRIPTION TOGGLE UPGRADE BANNER (PRD / Design system specs) */}
                    <div className={`p-4 rounded-xl border ${
                      currentU.plan === 'premium' 
                        ? 'bg-[#E6F7F7] border-primary/20 text-[#005555]' 
                        : 'bg-white border-sand-200 text-neutral-warm-700 shadow-elevation-1'
                    } space-y-3`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-widest text-[#CC3318] flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 fill-[#FF6347]" /> Conecta Plus Plan
                          </h4>
                          <p className="text-xs font-bold text-neutral-warm-800 mt-1">
                            {currentU.plan === 'premium' 
                              ? 'Inscripciones infinitas & prioridad activa (ARS 4.900/mes)' 
                              : 'Concluidos los límites de la cuenta gratuita.'}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold bg-[#FFF0ED] px-2 py-0.5 rounded text-[#CC3318]">
                          {currentU.plan === 'premium' ? 'ACTIVO' : 'FREE'}
                        </span>
                      </div>

                      <ul className="text-[11px] space-y-1 text-neutral-warm-600 pl-1 list-disc list-inside">
                        <li>Reservas ilimitadas sin cupo máximo mensual.</li>
                        <li>Soporte preferencial: reserva 24 horas antes.</li>
                        <li>Insignia visual de Verificación Plus destacada.</li>
                      </ul>

                      <button
                        type="button"
                        onClick={currentU.plan === 'premium' ? togglePremiumPlan : handleLaunchCheckout}
                        className={`w-full h-10 rounded-full text-xs font-bold transition-all ${
                          currentU.plan === 'premium'
                            ? 'bg-neutral-warm-800 text-white hover:brightness-90'
                            : 'bg-primary text-white hover:brightness-95 shadow-elevation-1'
                        }`}
                      >
                        {currentU.plan === 'premium' ? 'Volver al Plan Gratuito (Demo)' : 'Mejorar a Conecta Plus ($4.900/mes)'}
                      </button>
                    </div>

                    {/* Developer switch demo list for multi-user simulation */}
                    <div className="bg-white p-3.5 rounded-xl border border-sand-100 shadow-elevation-1">
                      <h4 className="text-[11px] font-bold text-neutral-warm-500 uppercase tracking-widest mb-2.5">🛠️ Simular otro Arquetipo de Usuario</h4>
                      <div className="space-y-1.5">
                        {db.users.filter(u => u.id !== currentU.id).map(u => (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => switchUser(u.id)}
                            className="w-full p-2 hover:bg-sand-50 transition-all rounded-lg border border-sand-100 text-left flex gap-2 items-center text-xs"
                          >
                            <img src={u.photo} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="font-bold truncate">{u.name}</p>
                              <p className="text-[10px] text-neutral-warm-500 truncate">{u.reason}</p>
                            </div>
                            <span className="text-[11px] text-primary font-bold">Cambiar 🔄</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsOnboarding(true)}
                        className="flex-1 py-2.5 text-xs font-bold rounded-full bg-sand-200 text-neutral-warm-700 hover:bg-sand-300"
                      >
                        Reiniciar Onboarding
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const freshDb = getLocalState();
                          const newState = {
                            ...freshDb,
                            currentUser: null
                          };
                          saveLocalState(newState);
                          setDb(newState);
                          if (onStateUpdate) onStateUpdate();
                        }}
                        className="p-2.5 rounded-full bg-red-50 text-red-600 border border-red-100"
                        title="Borrar Sesión"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 bg-white rounded-2xl p-4 border border-dashed border-sand-300">
                    <p className="text-4xl">👤</p>
                    <h4 className="text-sm font-bold text-neutral-warm-800 mt-2">No has iniciado sesión</h4>
                    <p className="text-xs text-neutral-warm-500 mt-1 max-w-[200px] mx-auto">
                      Registrate en unos segundos para disfrutar de la cartelera de actividades.
                    </p>
                    <button 
                      type="button"
                      onClick={() => setIsOnboarding(true)} 
                      className="mt-4 px-6 py-2.5 bg-primary text-white font-bold text-xs rounded-full hover:brightness-95 shadow-elevation-1"
                    >
                      Registrarme gratis
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      </div>

      {/* 🧭 NAVIGATION FOOTER BAR (Always displayed inside active App Screens) */}
      <div className="h-[76px] bg-white border-t border-sand-200 flex justify-around items-center px-2 shrink-0 z-10 select-none shadow-md">
        <button 
          type="button"
          onClick={() => handleTabClick('explorar', false)}
          className={`flex-1 flex flex-col justify-center items-center h-full transition-all cursor-pointer ${
            !isOrganizerMode && !isOnboarding && !selectedEventId && currentTab === 'explorar' ? 'text-primary' : 'text-neutral-warm-600'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Explorar</span>
        </button>

        <button 
          type="button"
          onClick={() => handleTabClick('planes', false)}
          className={`flex-1 flex flex-col justify-center items-center h-full transition-all cursor-pointer ${
            !isOrganizerMode && !isOnboarding && !selectedEventId && currentTab === 'planes' ? 'text-primary' : 'text-neutral-warm-600'
          }`}
        >
          <div className="relative">
            <Calendar className="w-5 h-5 mb-0.5" />
            {currentU && db.events.filter(e => e.registeredUserIds.includes(currentU.id)).length > 0 && (
              <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-[#FF6347] text-white text-[8px] font-bold flex items-center justify-center rounded-full">
                {db.events.filter(e => e.registeredUserIds.includes(currentU.id)).length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">Mis Planes</span>
        </button>

        <button 
          type="button"
          onClick={() => handleTabClick('explorar', true)}
          className={`flex-1 flex flex-col justify-center items-center h-full transition-all cursor-pointer ${
            isOrganizerMode && !isOnboarding && !selectedEventId ? 'text-[#FF6347]' : 'text-neutral-warm-600'
          }`}
        >
          <PlusCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Publicar</span>
        </button>

        <button 
          type="button"
          onClick={() => handleTabClick('perfil', false)}
          className={`flex-1 flex flex-col justify-center items-center h-full transition-all cursor-pointer ${
            !isOrganizerMode && !isOnboarding && !selectedEventId && currentTab === 'perfil' ? 'text-primary' : 'text-neutral-warm-600'
          }`}
        >
          <UserIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Perfil</span>
        </button>
      </div>
    </div>
  );
}
