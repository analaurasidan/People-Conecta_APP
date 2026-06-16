import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarBlank } from 'phosphor-react-native/lib/commonjs/icons/CalendarBlank';
import { Clock } from 'phosphor-react-native/lib/commonjs/icons/Clock';
import { MapPin } from 'phosphor-react-native/lib/commonjs/icons/MapPin';
import { colors, typography, spacing, radius, shadow } from '@/tokens';
import { getMyPlans } from '@/services/plans';
import { useAuthStore } from '@/store/authStore';
import { RootStackParams } from '@/navigation/types';
import { Plan } from '@/services/database.types';

type Nav = NativeStackNavigationProp<RootStackParams>;
type MyPlanItem = {
  id: string;
  plan?: Plan;
};

export default function MyPlansScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const { profile } = useAuthStore();

  const { data = [], isLoading } = useQuery<MyPlanItem[]>({
    queryKey: ['myPlans', profile?.id],
    queryFn: () => getMyPlans(profile?.id ?? 'demo_web_user') as Promise<MyPlanItem[]>,
    enabled: !!profile,
  });

  const plans = data
    .map((item) => item.plan)
    .filter(Boolean) as Plan[];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing[10] }]}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Tus reservas</Text>
          <Text style={styles.title}>Mis planes</Text>
          <Text style={styles.subtitle}>
            Acá quedan los planes a los que te sumaste. Desde cada plan podés abrir el grupo para coordinar.
          </Text>
        </View>

        {plans.length > 0 ? (
          <View style={styles.list}>
            {plans.map((plan) => (
              <ConfirmedPlanCard
                key={plan.id}
                plan={plan}
                onOpenDetail={() => navigation.navigate('PlanDetail', { planId: plan.id, from: 'myPlans' })}
                onOpenChat={() => navigation.navigate('Chat', { planId: plan.id, planName: plan.nombre })}
              />
            ))}
          </View>
        ) : (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <CalendarBlank color={colors.primary[500]} size={34} weight="regular" />
            </View>
            <Text style={styles.emptyTitle}>
              {isLoading ? 'Cargando tus planes...' : 'Todavía no te sumaste a ningún plan'}
            </Text>
            {!isLoading && (
              <>
                <Text style={styles.emptySubtitle}>
                  Cuando confirmes un lugar, el plan aparece acá junto al acceso al grupo.
                </Text>
                <TouchableOpacity
                  style={styles.exploreBtn}
                  onPress={() => navigation.navigate('Main', { screen: 'Explore' })}
                >
                  <Text style={styles.exploreBtnText}>Explorar planes</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function ConfirmedPlanCard({
  plan,
  onOpenDetail,
  onOpenChat,
}: {
  plan: Plan;
  onOpenDetail: () => void;
  onOpenChat: () => void;
}) {
  const fecha = new Date(plan.fecha);
  const fechaLabel = fecha.toLocaleDateString('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <View style={styles.card}>
      <Image
        source={plan.foto_url ? { uri: plan.foto_url } : require('@/assets/plan-placeholder.png')}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.cardBody}>
        <View style={styles.statusRow}>
          <Text style={styles.statusPill}>Confirmado</Text>
          <Text style={styles.date}>{fechaLabel}</Text>
        </View>
        <Text style={styles.planTitle} numberOfLines={2}>{plan.nombre}</Text>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <MapPin color={colors.textSecondary} size={14} weight="regular" />
            <Text style={styles.metaText}>{plan.zona}</Text>
          </View>
          <Text style={styles.metaDot}>·</Text>
          <View style={styles.metaItem}>
            <Clock color={colors.textSecondary} size={14} weight="regular" />
            <Text style={styles.metaText}>{plan.hora} hs</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.secondaryBtn} onPress={onOpenDetail}>
            <Text style={styles.secondaryText}>Ver detalle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatBtn} onPress={onOpenChat}>
            <Text style={styles.chatText}>Abrir grupo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing[4], gap: spacing[4] },
  header: { gap: spacing[1], marginBottom: spacing[2] },
  eyebrow: {
    ...typography.labelMedium,
    color: colors.primary[500],
    textTransform: 'uppercase',
  },
  title: { ...typography.headlineSmall, color: colors.textPrimary },
  subtitle: { ...typography.bodyMedium, color: colors.textSecondary },
  list: { gap: spacing[4] },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8DDC7',
    ...shadow.md,
  },
  image: { width: '100%', height: 132 },
  cardBody: { padding: spacing[4], gap: spacing[2] },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusPill: {
    ...typography.labelSmall,
    color: colors.primary[700],
    backgroundColor: colors.primary[50],
    paddingHorizontal: spacing[2],
    paddingVertical: 4,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  date: { ...typography.labelSmall, color: colors.textSecondary, textTransform: 'uppercase' },
  planTitle: { ...typography.titleMedium, color: colors.textPrimary },
  meta: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { ...typography.bodySmall, color: colors.textSecondary },
  metaDot: { ...typography.bodySmall, color: colors.textSecondary },
  actions: { flexDirection: 'row', gap: spacing[2], marginTop: spacing[2] },
  secondaryBtn: {
    flex: 1,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#E8DDC7',
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  secondaryText: { ...typography.labelMedium, color: colors.textSecondary },
  chatBtn: {
    flex: 1,
    borderRadius: radius.full,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  chatText: { ...typography.labelMedium, color: colors.white },
  empty: { alignItems: 'center', paddingTop: spacing[16], paddingHorizontal: spacing[4], gap: spacing[3] },
  emptyIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: { ...typography.titleMedium, color: colors.textPrimary, textAlign: 'center' },
  emptySubtitle: { ...typography.bodyMedium, color: colors.textSecondary, textAlign: 'center' },
  exploreBtn: {
    marginTop: spacing[2],
    backgroundColor: colors.primary[500],
    borderRadius: radius.full,
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
  },
  exploreBtnText: { ...typography.labelLarge, color: colors.white },
});
