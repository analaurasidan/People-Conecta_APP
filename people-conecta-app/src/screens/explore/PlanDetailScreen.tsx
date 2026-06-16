import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CalendarBlank } from 'phosphor-react-native/lib/commonjs/icons/CalendarBlank';
import { Clock } from 'phosphor-react-native/lib/commonjs/icons/Clock';
import { MapPin } from 'phosphor-react-native/lib/commonjs/icons/MapPin';
import { UsersThree } from 'phosphor-react-native/lib/commonjs/icons/UsersThree';
import { colors, typography, spacing, radius, shadow } from '@/tokens';
import { getPlanById, joinPlan, leavePlan } from '@/services/plans';
import { useAuthStore } from '@/store/authStore';
import { RootStackParams } from '@/navigation/types';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import CategoryIcon from '@/components/atoms/CategoryIcon';
import { Participation } from '@/services/database.types';

type Route = RouteProp<RootStackParams, 'PlanDetail'>;
type Nav = NativeStackNavigationProp<RootStackParams>;
type PlanDetail = Awaited<ReturnType<typeof getPlanById>> & {
  participations?: Participation[];
};

export default function PlanDetailScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const queryClient = useQueryClient();
  const { profile } = useAuthStore();
  const { data: plan, isLoading } = useQuery<PlanDetail>({
    queryKey: ['plan', route.params.planId],
    queryFn: () => getPlanById(route.params.planId),
  });

  const joinMutation = useMutation({
    mutationFn: () => joinPlan(plan!.id, profile?.id ?? 'demo_web_user'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', plan!.id] });
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      queryClient.invalidateQueries({ queryKey: ['myPlans'] });
      navigation.navigate('Main', { screen: 'MyPlans' });
    },
  });

  const leaveMutation = useMutation({
    mutationFn: () => leavePlan(plan!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan', plan!.id] });
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      queryClient.invalidateQueries({ queryKey: ['myPlans'] });
      navigation.navigate('Main', { screen: 'MyPlans' });
    },
  });

  if (isLoading || !plan) {
    return <View style={styles.loading}><Text>Cargando...</Text></View>;
  }

  const yaInscripto = plan.participations?.some(
    p => p.user_id === profile?.id && p.estado === 'confirmado'
  ) || plan.participations?.some(p => p.user_id === 'demo_web_user' && p.estado === 'confirmado');
  const cuposLibres = plan.cupo_max - plan.cupo_actual;
  const fecha = new Date(plan.fecha);
  const fechaLabel = fecha.toLocaleDateString('es-AR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  const openedFromMyPlans = route.params.from === 'myPlans';

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <Image
            source={plan.foto_url ? { uri: plan.foto_url } : undefined}
            style={styles.hero}
            contentFit="cover"
          />
          <TouchableOpacity
            style={[styles.backBtn, { top: insets.top + spacing[2] }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.categoryPill}>
              <CategoryIcon category={plan.categoria} color={colors.textSecondary} size={14} weight="bold" />
              <Text style={styles.categoryText}>{plan.categoria}</Text>
            </View>
            {plan.es_gratuito && (
              <View style={[styles.categoryPill, { backgroundColor: colors.success }]}>
                <Text style={[styles.categoryText, { color: colors.white }]}>Gratis</Text>
              </View>
            )}
          </View>
          <Text style={styles.title}>{plan.nombre}</Text>
          <Text style={styles.subtitle}>Confirmá tu lugar para guardar este plan en Mis planes. Desde ahí vas a poder abrir el grupo y coordinar con el anfi.</Text>

          <View style={styles.infoCard}>
            <InfoRow icon={<CalendarBlank color={colors.primary[500]} size={18} weight="regular" />} label={fechaLabel} />
            <InfoRow icon={<Clock color={colors.primary[500]} size={18} weight="regular" />} label={`${plan.hora} hs`} />
            <InfoRow icon={<MapPin color={colors.primary[500]} size={18} weight="regular" />} label={plan.zona} />
            <InfoRow
              icon={<UsersThree color={colors.primary[500]} size={18} weight="regular" />}
              label={`${plan.cupo_actual}/${plan.cupo_max} confirmados · ${cuposLibres} cupos libres`}
            />
          </View>

          <Text style={styles.descTitle}>Descripción</Text>
          <Text style={styles.desc}>{plan.descripcion}</Text>

          {plan.creator && (
            <View style={styles.organizerSection}>
              <Text style={styles.descTitle}>Organizador</Text>
              <View style={styles.organizerRow}>
                <Avatar uri={plan.creator.foto_url} name={plan.creator.nombre} size="md" />
                <View style={styles.organizerInfo}>
                  <Text style={styles.organizerName}>{plan.creator.nombre}</Text>
                  {plan.creator.rating_promedio && (
                    <Text style={styles.organizerRating}>
                      ⭐ {plan.creator.rating_promedio.toFixed(1)} de calificación
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}

          <View style={styles.chatPreview}>
            <Text style={styles.chatTitle}>Después de sumarte</Text>
            <Text style={styles.chatCopy}>
              Este plan aparece en tu sección Mis planes. Ahí vas a encontrar el grupo del plan para presentarte, resolver dudas y coordinar punto exacto.
            </Text>
            <View style={styles.chatRules}>
              <Text style={styles.rule}>✓ Solo participantes confirmados</Text>
              <Text style={styles.rule}>✓ Se cierra 24 hs después del evento</Text>
            </View>
          </View>

          {plan.participations && plan.participations.length > 0 && (
            <View style={styles.participantsSection}>
              <Text style={styles.descTitle}>Ya estás en este plan</Text>
              <Text style={styles.desc}>Tu lugar quedó reservado. Revisalo desde Mis planes.</Text>
            </View>
          )}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Sticky footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing[4] }]}>
        {openedFromMyPlans && yaInscripto ? (
          <View style={styles.footerStack}>
            <Button
              label="SALIR DEL PLAN"
              onPress={() => leaveMutation.mutate()}
              variant="outline"
              loading={leaveMutation.isPending}
              fullWidth
              size="lg"
            />
            <Button
              label="ENTRAR AL GRUPO"
              onPress={() => navigation.navigate('Chat', { planId: plan.id, planName: plan.nombre })}
              variant="primary"
              fullWidth
              size="lg"
            />
          </View>
        ) : (
          <Button
            label={yaInscripto ? 'Ya estás en este plan ✓' : '+ Sumarme al plan'}
            onPress={() => joinMutation.mutate()}
            variant={yaInscripto ? 'outline' : 'primary'}
            loading={joinMutation.isPending}
            disabled={yaInscripto || cuposLibres === 0}
            fullWidth
            size="lg"
          />
        )}
      </View>
    </View>
  );
}

function InfoRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>{icon}</View>
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  heroContainer: { height: 260, position: 'relative' },
  hero: { width: '100%', height: '100%' },
  backBtn: {
    position: 'absolute', left: spacing[4],
    backgroundColor: 'rgba(0,0,0,0.45)',
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  backBtnText: { color: colors.white, fontSize: 22, lineHeight: 24 },
  content: { padding: spacing[4], gap: spacing[4] },
  row: { flexDirection: 'row', gap: spacing[2] },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.neutral[100],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radius.full,
  },
  categoryText: { ...typography.labelSmall, color: colors.textSecondary },
  title: { ...typography.headlineSmall, color: colors.textPrimary },
  subtitle: { ...typography.bodyMedium, color: colors.textSecondary },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: spacing[3],
    ...shadow.sm,
  },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing[3] },
  infoIcon: { width: 20, alignItems: 'center', paddingTop: 1 },
  infoLabel: { ...typography.bodyMedium, color: colors.textPrimary, flex: 1 },
  descTitle: { ...typography.titleSmall, color: colors.textPrimary },
  desc: { ...typography.bodyMedium, color: colors.textSecondary, lineHeight: 22 },
  organizerSection: { gap: spacing[3] },
  organizerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  organizerInfo: { flex: 1 },
  organizerName: { ...typography.titleSmall, color: colors.textPrimary },
  organizerRating: { ...typography.bodySmall, color: colors.textSecondary },
  participantsSection: { gap: spacing[3] },
  chatPreview: {
    backgroundColor: '#F7F1E3',
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: spacing[2],
    borderWidth: 1,
    borderColor: '#EDE3CC',
  },
  chatTitle: { ...typography.titleSmall, color: colors.textPrimary },
  chatCopy: { ...typography.bodySmall, color: colors.textSecondary },
  chatRules: { gap: spacing[1], marginTop: spacing[1] },
  rule: { ...typography.labelSmall, color: colors.primary[700] },
  avatarStack: { flexDirection: 'row', gap: -8 },
  moreParticipants: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.neutral[200],
    alignItems: 'center', justifyContent: 'center',
  },
  moreText: { ...typography.labelSmall, color: colors.textSecondary },
  footer: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
    ...shadow.lg,
  },
  footerStack: {
    gap: spacing[3],
  },
});
