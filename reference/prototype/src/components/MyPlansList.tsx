import React from 'react';
import { Plan, User } from '../types';
import { Button, Card, Text, Stack, PhIcon } from '@/design-system';

interface MyPlansListProps {
  plans: Plan[];
  currentUser: User | null;
  onSelectPlan: (planId: string) => void;
  onEnterChat: (planId: string) => void;
  onReviewPrompt: (plan: Plan) => void;
}

export default function MyPlansList({
  plans,
  currentUser,
  onSelectPlan,
  onEnterChat,
  onReviewPrompt
}: MyPlansListProps) {
  if (!currentUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <PhIcon name="island" size={32} className="text-ink-muted mb-1.5" />
        <Text variant="subheading" as="h3">No iniciaste sesión</Text>
        <Text variant="caption" color="muted" className="mt-1">
          Completa el registro manual de perfil para poder sumarte a planes.
        </Text>
      </div>
    );
  }

  const isJoinedOrCreated = (plan: Plan) =>
    plan.joinedUserIds.includes(currentUser.id) || plan.creatorId === currentUser.id;

  const userPlans = plans.filter(isJoinedOrCreated);
  const attendingPlans = userPlans.filter(p => p.creatorId !== currentUser.id);
  const hostingPlans = userPlans.filter(p => p.creatorId === currentUser.id);

  return (
    <div className="flex-1 flex flex-col justify-between bg-background">
      {/* Header */}
      <div className="h-11 bg-background border-b border-border/55 px-4 flex items-center shrink-0">
        <Text variant="subheading">Mis Planes</Text>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {userPlans.length === 0 ? (
          <Stack direction="vertical" gap={2} align="center" className="py-20 text-center">
            <PhIcon name="calendar-blank" size={32} className="text-ink-muted" />
            <Text variant="subheading" as="h3">No participas en ningún plan</Text>
            <Text variant="caption" color="muted" className="px-6 leading-relaxed">
              Explorá la sección del mapa de Mar del Plata, tocá en cualquier actividad interesante y unite con un solo toque.
            </Text>
          </Stack>
        ) : (
          <Stack direction="vertical" gap={4} className="font-semibold text-3xs">
            {/* Hosting list */}
            {hostingPlans.length > 0 && (
              <Stack direction="vertical" gap={2}>
                <Text variant="label" color="muted">
                  Coordinas como Organizador ({hostingPlans.length})
                </Text>
                {hostingPlans.map(plan => (
                  <Card key={plan.id} onClick={() => onSelectPlan(plan.id)}>
                    <div className="flex gap-3">
                      <img
                        src={plan.imageUrl}
                        alt={plan.title}
                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-surface"
                        referrerPolicy="no-referrer"
                      />
                      <Stack direction="vertical" justify="between" className="flex-1 min-w-0">
                        <div>
                          <Stack direction="horizontal" justify="between" align="start">
                            <Text variant="subheading" as="h4" className="truncate leading-none">{plan.title}</Text>
                            <Text variant="caption" color="primary" className="font-extrabold shrink-0">{plan.date}</Text>
                          </Stack>
                          <Text variant="caption" color="muted" className="flex items-center gap-0.5 truncate mt-1 opacity-75">
                            <PhIcon name="map-pin" /> {plan.zone}
                          </Text>
                        </div>

                        <Stack
                          direction="horizontal"
                          justify="between"
                          align="center"
                          className="pt-2 border-t border-border/50 mt-1"
                          onClick={e => e.stopPropagation()}
                        >
                          <Text variant="caption" color="primary" className="font-bold">
                            {plan.joinedUserIds.length} personas sugeridos
                          </Text>
                          <Button size="sm" leftIcon={<PhIcon name="chat-circle-dots" />} onClick={() => onEnterChat(plan.id)}>
                            Chat
                          </Button>
                        </Stack>
                      </Stack>
                    </div>
                  </Card>
                ))}
              </Stack>
            )}

            {/* Attending list */}
            {attendingPlans.length > 0 && (
              <Stack direction="vertical" gap={2}>
                <Text variant="label" color="muted">
                  Planes Suscripto ({attendingPlans.length})
                </Text>
                {attendingPlans.map(plan => (
                  <Card key={plan.id} onClick={() => onSelectPlan(plan.id)}>
                    <div className="flex gap-3">
                      <img
                        src={plan.imageUrl}
                        alt={plan.title}
                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-surface"
                        referrerPolicy="no-referrer"
                      />
                      <Stack direction="vertical" justify="between" className="flex-1 min-w-0">
                        <div>
                          <Stack direction="horizontal" justify="between" align="start">
                            <Text variant="subheading" as="h4" className="truncate leading-none">{plan.title}</Text>
                            <Text variant="caption" color="primary" className="font-extrabold shrink-0">{plan.date}</Text>
                          </Stack>
                          <Text variant="caption" color="muted" className="flex items-center gap-0.5 truncate mt-1 opacity-75">
                            <PhIcon name="map-pin" /> {plan.zone}
                          </Text>
                        </div>

                        <Stack
                          direction="horizontal"
                          justify="between"
                          align="center"
                          className="pt-2 border-t border-border/50 mt-1"
                          onClick={e => e.stopPropagation()}
                        >
                          <Text variant="caption" className="text-gray-400">
                            Creado por {plan.creatorName.split(' ')[0]}
                          </Text>
                          <Stack direction="horizontal" gap={1} align="center">
                            <Button size="sm" leftIcon={<PhIcon name="chat-circle-dots" />} onClick={() => onEnterChat(plan.id)}>
                              Chat
                            </Button>
                            {plan.status === 'completed' && (
                              <Button
                                size="sm"
                                variant="secondary"
                                leftIcon={<PhIcon name="star" />}
                                onClick={() => onReviewPrompt(plan)}
                              >
                                Review
                              </Button>
                            )}
                          </Stack>
                        </Stack>
                      </Stack>
                    </div>
                  </Card>
                ))}
              </Stack>
            )}
          </Stack>
        )}
      </div>

      <div className="h-1 bg-transparent shrink-0" />
    </div>
  );
}
