import React, { useState, useEffect } from 'react';
import { User, Plan, Message, Review, Notification } from './types';
import { seedUsers, seedPlans, seedMessages, seedReviews } from './data';
import IPhoneFrame from './components/IPhoneFrame';
import OnboardingFlow from './components/OnboardingFlow';
import ExploreFeed from './components/ExploreFeed';
import PlanDetail from './components/PlanDetail';
import CreatePlanWizard from './components/CreatePlanWizard';
import GroupChat from './components/GroupChat';
import MyPlansList from './components/MyPlansList';
import UserProfile from './components/UserProfile';
import ReviewModal from './components/ReviewModal';
import DesignSystemShowcase from './components/DesignSystemShowcase';

export default function App() {
  const [showDesignSystem, setShowDesignSystem] = useState(false);

  // Application models
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [plans, setPlans] = useState<Plan[]>(seedPlans);
  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentCity, setCurrentCity] = useState<string>("Mar del Plata");

  // Router State
  const [activePage, setActivePage] = useState<'onboarding' | 'explore' | 'detail' | 'create' | 'chat'>('onboarding');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'explorar' | 'mis_planes' | 'perfil'>('explorar');

  // Simulation controls
  const [simulatedTimeOffsetDays, setSimulatedTimeOffsetDays] = useState(0);
  const [moderationLogs, setModerationLogs] = useState<{ text: string; safe: boolean; timestamp: Date }[]>([]);
  const [reviewFormPlan, setReviewFormPlan] = useState<Plan | null>(null);

  // Auto-redirect if User registers or status changes
  useEffect(() => {
    if (!currentUser) {
      setActivePage('onboarding');
    } else if (currentUser.status === 'pending') {
      setActivePage('onboarding');
    } else if (activePage === 'onboarding' && currentUser.status === 'approved') {
      setActivePage('explore');
      setActiveTab('explorar');
    }
  }, [currentUser, activePage]);

  // Push notification helper
  const addNotification = (title: string, body: string, type: Notification['type'], planId?: string) => {
    const newNotice: Notification = {
      id: `notif_${Date.now()}`,
      title,
      body,
      type,
      planId,
      timestamp: new Date(),
      read: false
    };
    setNotifications((prev) => [...prev, newNotice]);
  };

  // Onboarding Complete Callback
  const handleOnboardingComplete = (newUser: Partial<User>) => {
    const filled: User = {
      ...newUser,
      id: `user_${Date.now()}`,
    } as User;
    setCurrentUser(filled);
    
    // Push alert
    addNotification(
      "Perfil en proceso de validación",
      "El fundador está revisando tu Onboarding. ¡Aprobamos en menos de 24 horas!",
      "system_alert"
    );
  };

  // Demo actions: Fast founder approves profile
  const handleApproveUser = () => {
    if (!currentUser) return;
    const updated = { ...currentUser, status: 'approved' as const };
    setCurrentUser(updated);
    
    // Log safe check
    setModerationLogs(prev => [
      { text: `Registro aprobado manualmente: ${currentUser.name} (${currentUser.phone})`, safe: true, timestamp: new Date() },
      ...prev
    ]);

    addNotification(
      "🎉 ¡Cuenta Aprobada!",
      `¡Hola ${currentUser.name.split(' ')[0]}! Ya puedes unirte y proponer actividades reales.`,
      "approved"
    );
  };

  // Toggle Conecta Plus status (Premium upgrade simulation)
  const handleTogglePremium = () => {
    if (!currentUser) return;
    const targetStatus = !currentUser.isPremium;
    setCurrentUser({ ...currentUser, isPremium: targetStatus });

    addNotification(
      targetStatus ? "💎 ¡Bienvenido a Conecta Plus!" : "Membresía Free",
      targetStatus ? "Gracias por transformarte en un miembro exclusivo de tu comunidad." : "Regresaste al plan de dos límites mensuales.",
      "system_alert"
    );
  };

  // Fast forward simulation days offset
  const handleFastForwardTime = () => {
    setSimulatedTimeOffsetDays(prev => prev + 3);
    addNotification(
      "🕒 Simulación: Avanzamos 3 días",
      "Las fechas de las actividades costeras correspondientes se han vencido.",
      "system_alert"
    );

    // Auto-complete active joined events so they can give a review!
    setPlans(prevPlans => {
      let isChanged = false;
      const updated = prevPlans.map(plan => {
        if (plan.status === 'active' && currentUser && plan.joinedUserIds.includes(currentUser.id)) {
          isChanged = true;
          // Prompt user to write feedback
          setTimeout(() => {
            setReviewFormPlan(plan);
          }, 600);
          return { ...plan, status: 'completed' as const };
        }
        return plan;
      });
      return updated;
    });
  };

  // Joins a Plan
  const handleJoinPlan = (planId: string) => {
    if (!currentUser) return;

    // Check account limits on Free plans to enforce Section 8.2 of PRD
    if (!currentUser.isPremium) {
      const activeReservations = plans.filter(p => p.joinedUserIds.includes(currentUser.id) && p.creatorId !== currentUser.id).length;
      if (activeReservations >= 2) {
        addNotification(
          "⚠️ Límite de Plan Gratuito alcanzado",
          "Como usuario Free puedes sumarte a un máximo de 2 planes paralelos. Mejora a Conecta Plus para unirte ilimitadamente.",
          "system_alert"
        );
        setActiveTab('perfil');
        setActivePage('explore');
        return;
      }
    }

    setPlans(prevPlans => {
      return prevPlans.map(p => {
        if (p.id === planId) {
          if (p.joinedUserIds.includes(currentUser.id)) return p;
          const updatedIds = [...p.joinedUserIds, currentUser.id];
          
          addNotification(
            "📋 Registro de asistencia",
            `Te sumaste exitosamente a "${p.title}" en ${p.zone}.`,
            "plan_joined",
            p.id
          );

          // Simulated chat welcome lines after a short period if chat activates (2+ participants)
          if (updatedIds.length >= 2) {
            setTimeout(() => {
              const systemMsg: Message = {
                id: `sys_msg_${Date.now()}`,
                planId: p.id,
                userId: "system",
                userName: "Sistema Conecta",
                userPhoto: "",
                text: `✨ ¡Se ha activado el chat grupal para ${p.title}! Coordina el lugar del mate o encuentro aquí.`,
                timestamp: new Date()
              };
              setMessages(prev => [...prev, systemMsg]);
            }, 800);
          }

          return {
            ...p,
            joinedUserIds: updatedIds,
            joinedCount: updatedIds.length
          };
        }
        return p;
      });
    });
  };

  // Leaves a Plan
  const handleLeavePlan = (planId: string) => {
    if (!currentUser) return;
    setPlans(prevPlans => {
      return prevPlans.map(p => {
        if (p.id === planId) {
          const updatedIds = p.joinedUserIds.filter(id => id !== currentUser.id);
          addNotification(
            "Cancelación",
            `Te has dado de baja de la actividad "${p.title}".`,
            "system_alert"
          );
          return {
            ...p,
            joinedUserIds: updatedIds,
            joinedCount: updatedIds.length
          };
        }
        return p;
      });
    });
  };

  // Publishes a New Plan (called from Creative Wizard after safe check)
  const handlePublishPlan = (newPlanData: Partial<Plan>) => {
    if (!currentUser) return;

    // Check account limits for Free plan creation (PRD 8.2)
    if (!currentUser.isPremium) {
      const activeCreations = plans.filter(p => p.creatorId === currentUser.id && p.status === 'active').length;
      if (activeCreations >= 2) {
        addNotification(
          "⚠️ Límite de creación alcanzado",
          "Como usuario Free puedes registrar hasta 2 planes activos simultáneamente. Actualiza a Conecta Plus para crear ilimitados.",
          "system_alert"
        );
        setActiveTab('perfil');
        setActivePage('explore');
        return;
      }
    }

    const compiled: Plan = {
      ...newPlanData,
      id: `plan_${Date.now()}`,
      creatorId: currentUser.id,
      creatorName: currentUser.name,
      creatorPhoto: currentUser.photoUrl,
      joinedUserIds: [currentUser.id],
      joinedCount: 1,
      status: 'active'
    } as Plan;

    setPlans(prev => [compiled, ...prev]);
    
    // Add positive founder audit log
    setModerationLogs(prev => [
      { text: `Plan auditado seguro: "${compiled.title}" publicado en categoría ${compiled.category}`, safe: true, timestamp: new Date() },
      ...prev
    ]);

    addNotification(
      "🚀 Plan Publicado",
      `Tu plan "${compiled.title}" ya es visible para toda la comunidad costera.`,
      "system_alert",
      compiled.id
    );

    // Simulated action: 2 minutes later, Joaquín or Sofía registers to your plan automatically!
    setTimeout(() => {
      const randomSeedUser = seedUsers[Math.floor(Math.random() * seedUsers.length)];
      if (randomSeedUser.id !== currentUser.id) {
        setPlans(currentPlans => {
          return currentPlans.map(p => {
            if (p.id === compiled.id) {
              if (p.joinedUserIds.includes(randomSeedUser.id)) return p;
              const updatedIds = [...p.joinedUserIds, randomSeedUser.id];
              
              // Trigger push notice
              addNotification(
                "🌊 Alguien se sumó a tu plan",
                `¡${randomSeedUser.name.split(' ')[0]} se anotó a tu propuesta "${p.title}"!`,
                "plan_joined",
                p.id
              );

              // Inject greeting inside the chatgrupal
              setTimeout(() => {
                const joinMsg: Message = {
                  id: `join_msg_${Date.now()}`,
                  planId: p.id,
                  userId: randomSeedUser.id,
                  userName: randomSeedUser.name,
                  userPhoto: randomSeedUser.photoUrl,
                  text: `¡Hola! Qué buena propuesta. Me re sumé, contá conmigo para ir.`,
                  timestamp: new Date()
                };
                setMessages(prev => [...prev, joinMsg]);
              }, 1000);

              return {
                ...p,
                joinedUserIds: updatedIds,
                joinedCount: updatedIds.length
              };
            }
            return p;
          });
        });
      }
    }, 4500);

    setActivePage('explore');
    setActiveTab('mis_planes');
  };

  // Sends message in Closed Chat
  const handleSendMessage = (text: string) => {
    if (!currentUser || !selectedPlanId) return;

    const newMsg: Message = {
      id: `msg_user_${Date.now()}`,
      planId: selectedPlanId,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhoto: currentUser.photoUrl,
      text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMsg]);

    // Simulated responsive automated agent replies matching Section 7.6 of PRD to make demo feel alive
    setTimeout(() => {
      const answersList = [
        "¡Excelente, dale! Yo llevo unas facturas calentitas que compré en Güemes.",
        "Buenísimo, ahí nos encontramos puntual en el punto de referencia.",
        "¿Llevamos reposera o con lona para el pasto/arena estamos bien?",
        "¡Re de acuerdo! Nos vemos mañana 🙌",
        "Dale, yo llevo mate amargo."
      ];
      
      // Select random answer
      const textReply = answersList[Math.floor(Math.random() * answersList.length)];
      
      // Select random seed participant
      const activePlan = plans.find(p => p.id === selectedPlanId);
      if (!activePlan) return;
      const peerIds = activePlan.joinedUserIds.filter(id => id !== currentUser.id);
      
      if (peerIds.length > 0) {
        const randomPeerId = peerIds[Math.floor(Math.random() * peerIds.length)];
        const peer = seedUsers.find(u => u.id === randomPeerId);
        if (!peer) return;

        const replyMsg: Message = {
          id: `msg_auto_${Date.now()}`,
          planId: selectedPlanId,
          userId: peer.id,
          userName: peer.name,
          userPhoto: peer.photoUrl,
          text: textReply,
          timestamp: new Date()
        };

        setMessages((prev) => [...prev, replyMsg]);
        
        // Shoot chat notice if they aren't actively on chat page
        addNotification(
          `Mensaje de ${peer.name.split(' ')[0]}`,
          textReply,
          "chat",
          selectedPlanId
        );
      }
    }, 1500);
  };

  // Conclude Plan (shifts state explicitly for reviews)
  const handleConcludePlan = (planId: string) => {
    setPlans(prev => prev.map(p => p.id === planId ? { ...p, status: 'completed' as const } : p));
    const targetPlan = plans.find(p => p.id === planId);
    if (targetPlan) {
      setReviewFormPlan(targetPlan);
    }
    
    addNotification(
      "⭐ Calificar encuentro",
      "La caminata o taller ya concluyó. Dejanos una valoración del organizador.",
      "review_prompt"
    );
  };

  // Save rating Review
  const handleSaveReview = (rating: number, comment: string) => {
    if (!currentUser || !reviewFormPlan) return;

    const newReview: Review = {
      id: `rev_user_${Date.now()}`,
      planId: reviewFormPlan.id,
      planTitle: reviewFormPlan.title,
      reviewerId: currentUser.id,
      reviewerName: currentUser.name,
      reviewerPhoto: currentUser.photoUrl,
      rating,
      comment,
      role: 'participant',
      timestamp: new Date()
    };

    setReviews(prev => [newReview, ...prev]);

    // Recalculate target host creator rating dynamically (PRD 7.8)
    const hostId = reviewFormPlan.creatorId;
    setPlans(prevPlans => prevPlans.map(p => {
      if (p.id === reviewFormPlan.id) {
        return { ...p, reviewsCount: (p.reviewsCount || 0) + 1, ratingAverage: rating };
      }
      return p;
    }));

    addNotification(
      "Reseña Publicada",
      "Tu valoración pública se ha guardado en la reputación del organizador.",
      "system_alert"
    );

    // Clean review wizard scope
    setReviewFormPlan(null);
    setActivePage('explore');
    setActiveTab('perfil');
  };

  // Helper log helper securely
  const logModerationCheck = (text: string, safe: boolean) => {
    setModerationLogs(prev => [{ text, safe, timestamp: new Date() }, ...prev]);
  };

  // Resolved current plan object details
  const activePlan = plans.find(p => p.id === selectedPlanId) || plans[0];
  const activeChatMessages = messages.filter(m => m.planId === selectedPlanId);

  // Time label computed based on Simulated days offset
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + simulatedTimeOffsetDays);
  const timeLabelStr = baseDate.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });

  if (showDesignSystem) {
    return (
      <>
        <DesignSystemShowcase />
        <button
          onClick={() => setShowDesignSystem(false)}
          className="fixed bottom-6 right-6 z-50 bg-ink text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2"
        >
          ← Volver al App
        </button>
      </>
    );
  }

  return (
    <>
    <IPhoneFrame
      userStatus={currentUser ? currentUser.status : 'pending'}
      onApproveUser={handleApproveUser}
      isPremium={currentUser ? currentUser.isPremium : false}
      onTogglePremium={handleTogglePremium}
      notifications={notifications}
      onClearNotifications={() => setNotifications([])}
      onFastForwardTime={handleFastForwardTime}
      timeLabel={timeLabelStr}
      moderationLogs={moderationLogs}
    >
      {/* 1. Onboarding Screen router */}
      {activePage === 'onboarding' && (
        <OnboardingFlow
          onComplete={handleOnboardingComplete}
          user={currentUser}
          onApproveDemo={handleApproveUser}
        />
      )}

      {/* 2. Main Tab View Router */}
      {activePage === 'explore' && (
        <>
          {activeTab === 'explorar' && (
            <ExploreFeed
              plans={plans}
              onSelectPlan={(planId) => {
                setSelectedPlanId(planId);
                setActivePage('detail');
              }}
              onCreatePlan={() => setActivePage('create')}
              currentUser={currentUser}
              activeTab={activeTab}
              onChangeTab={setActiveTab}
              currentCity={currentCity}
              onChangeCity={setCurrentCity}
              onJoinPlan={handleJoinPlan}
              onLeavePlan={handleLeavePlan}
            />
          )}

          {activeTab === 'mis_planes' && (
            <MyPlansList
              plans={plans}
              currentUser={currentUser}
              onSelectPlan={(planId) => {
                setSelectedPlanId(planId);
                setActivePage('detail');
              }}
              onEnterChat={(planId) => {
                setSelectedPlanId(planId);
                setActivePage('chat');
              }}
              onReviewPrompt={(plan) => setReviewFormPlan(plan)}
            />
          )}

          {activeTab === 'perfil' && currentUser && (
            <UserProfile
              user={currentUser}
              onLogout={() => {
                setCurrentUser(null);
                setActivePage('onboarding');
              }}
              onUpgrade={handleTogglePremium}
              plans={plans}
              reviews={reviews}
            />
          )}

          {/* Bottom Navigation persistence handled inside feed or lists directly */}
          {activeTab !== 'explorar' && (
            <div className="h-14 bg-white/95 border-t border-[#ededf2] px-6 py-1 shrink-0 flex items-center justify-between z-30 font-sans">
              <button
                onClick={() => setActiveTab('explorar')}
                className={`flex flex-col items-center gap-0.5 ${
                  activeTab === 'explorar' ? 'text-[#1A4F7A]' : 'text-gray-400'
                }`}
              >
                <LocationMagnifyingGlass fill={activeTab === 'explorar'} />
                <span className="text-[9px] font-bold tracking-tight">Explorar</span>
              </button>

              <button
                onClick={() => setActiveTab('mis_planes')}
                className={`flex flex-col items-center gap-0.5 ${
                  activeTab === 'mis_planes' ? 'text-[#1A4F7A]' : 'text-gray-400'
                }`}
              >
                <CalendarCircle fill={activeTab === 'mis_planes'} />
                <span className="text-[9px] font-bold tracking-tight">Mis Planes</span>
              </button>

              <button
                onClick={() => setActiveTab('perfil')}
                className={`flex flex-col items-center gap-0.5 ${
                  activeTab === 'perfil' ? 'text-[#1A4F7A]' : 'text-gray-400'
                }`}
              >
                <PersonCircle fill={activeTab === 'perfil'} />
                <span className="text-[9px] font-bold tracking-tight">Mi Perfil</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* 3. Detailed activity view */}
      {activePage === 'detail' && activePlan && (
        <PlanDetail
          plan={activePlan}
          onBack={() => {
            setActivePage('explore');
            // If they entered through "Mis Planes", return there
          }}
          onJoin={handleJoinPlan}
          onLeave={handleLeavePlan}
          onEnterChat={(planId) => {
            setSelectedPlanId(planId);
            setActivePage('chat');
          }}
          currentUser={currentUser}
          allUsers={seedUsers}
        />
      )}

      {/* 4. Creative multi-step Wizard form */}
      {activePage === 'create' && (
        <CreatePlanWizard
          onBack={() => setActivePage('explore')}
          onPublish={handlePublishPlan}
          currentUser={currentUser}
          currentCity={currentCity}
        />
      )}

      {/* 5. Closed communications group chatroom */}
      {activePage === 'chat' && activePlan && (
        <GroupChat
          plan={activePlan}
          messages={activeChatMessages}
          onBack={() => setActivePage('explore')}
          onSendMessage={handleSendMessage}
          currentUser={currentUser}
          allUsers={seedUsers}
          onConcludePlan={handleConcludePlan}
        />
      )}

      {/* 6. Rating feedback modal inside overlay layer */}
      {reviewFormPlan && (
        <ReviewModal
          plan={reviewFormPlan}
          host={seedUsers.find(u => u.id === reviewFormPlan.creatorId) || null}
          onSaveReview={handleSaveReview}
          onDismiss={() => setReviewFormPlan(null)}
        />
      )}
    </IPhoneFrame>
    <button
      onClick={() => setShowDesignSystem(true)}
      className="fixed bottom-6 right-6 z-50 bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2"
    >
      Design System →
    </button>
    </>
  );
}

// Custom SF Symbols replacement icons matching design instructions exactly
function LocationMagnifyingGlass({ fill }: { fill: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={fill ? "#1A4F7A" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CalendarCircle({ fill }: { fill: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={fill ? "#1A4F7A" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PersonCircle({ fill }: { fill: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={fill ? "#1A4F7A" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
