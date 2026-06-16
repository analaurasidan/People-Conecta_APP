import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Clock } from 'phosphor-react-native/lib/commonjs/icons/Clock';
import { MapPin } from 'phosphor-react-native/lib/commonjs/icons/MapPin';
import { colors, typography, spacing, radius, shadow, fontFamily } from '@/tokens';
import { Plan } from '@/services/database.types';
import CategoryIcon from '@/components/atoms/CategoryIcon';

type Props = {
  plan: Plan;
  onPress: () => void;
  canManage?: boolean;
  onDelete?: () => void;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function EventCard({ plan, onPress, canManage = false, onDelete }: Props) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const cuposRestantes = plan.cupo_max - plan.cupo_actual;
  const porcentaje = plan.cupo_actual / plan.cupo_max;
  const esUrgente = cuposRestantes <= 2 && cuposRestantes > 0;

  const fecha = new Date(plan.fecha);
  const fechaLabel = fecha.toLocaleDateString('es-AR', { weekday: 'short' }).toUpperCase().replace('.', '');
  const dayLabel = fecha.toDateString() === new Date().toDateString()
    ? 'HOY'
    : `${fechaLabel} ${fecha.toLocaleDateString('es-AR', { day: 'numeric' })}`;

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.97, { damping: 15 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 15 }); }}
      activeOpacity={1}
      style={[styles.card, animStyle]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={plan.foto_url ? { uri: plan.foto_url } : require('@/assets/plan-placeholder.png')}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.categoryBadge}>
          <CategoryIcon category={plan.categoria} color={colors.primary[500]} size={13} weight="bold" />
          <Text style={styles.categoryText}>{plan.categoria}</Text>
        </View>
        <View style={[styles.priceBadge, canManage && styles.priceBadgeManaged]}>
          <Text style={styles.priceBadgeText}>
            {plan.es_gratuito ? 'Gratis' : `$${plan.precio?.toLocaleString('es-AR') ?? 'Pago'}`}
          </Text>
        </View>
        {canManage && (
          <View style={styles.manageMenuWrap}>
            <TouchableOpacity
              style={styles.manageBtn}
              onPress={() => setMenuOpen(open => !open)}
              activeOpacity={0.8}
            >
              <Text style={styles.manageBtnText}>⋯</Text>
            </TouchableOpacity>
            {menuOpen && (
              <TouchableOpacity
                style={styles.deleteMenuItem}
                onPress={() => {
                  setMenuOpen(false);
                  onDelete?.();
                }}
                activeOpacity={0.85}
              >
                <Text style={styles.deleteMenuText}>Eliminar plan</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>{plan.nombre}</Text>
          <View style={styles.datePill}>
            <Text style={styles.dateText}>{dayLabel}</Text>
          </View>
        </View>

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

        <View style={styles.footer}>
          <View style={styles.cuposBlock}>
            <View style={styles.cuposHeader}>
              <Text style={styles.cuposLabel}>Cupos ocupados</Text>
              <Text style={styles.cuposNumber}>{plan.cupo_actual}/{plan.cupo_max}</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${porcentaje * 100}%` }]} />
            </View>
            <Text style={[styles.cuposText, esUrgente && styles.cuposUrgente]}>
              {plan.cupo_actual === 0
                ? 'Sé el primero en sumarte'
                : esUrgente
                ? `Solo ${cuposRestantes} cupo${cuposRestantes > 1 ? 's' : ''} libre`
                : `${plan.cupo_actual}/${plan.cupo_max} confirmados`}
            </Text>
          </View>
          <View style={styles.joinPill}>
            <Text style={styles.joinText}>+ ME SUMO</Text>
          </View>
        </View>
      </View>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8DDC7',
    ...shadow.md,
  },
  imageContainer: {
    height: 152,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: spacing[3],
    left: spacing[3],
    backgroundColor: 'rgba(255,255,255,0.88)',
    paddingHorizontal: spacing[2],
    paddingVertical: 5,
    borderRadius: radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryText: {
    ...typography.labelSmall,
    color: colors.primary[500],
    textTransform: 'uppercase',
  },
  priceBadge: {
    position: 'absolute',
    top: spacing[3],
    right: spacing[3],
    backgroundColor: 'rgba(46,40,34,0.72)',
    paddingHorizontal: spacing[2],
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  manageMenuWrap: {
    position: 'absolute',
    top: spacing[3],
    right: spacing[3],
    alignItems: 'flex-end',
  },
  manageBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(237,227,204,0.9)',
  },
  manageBtnText: {
    color: colors.textPrimary,
    fontSize: 22,
    lineHeight: 18,
    fontFamily: fontFamily.bodySemiBold,
  },
  deleteMenuItem: {
    marginTop: spacing[2],
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderWidth: 1,
    borderColor: '#E8DDC7',
    ...shadow.sm,
  },
  deleteMenuText: {
    ...typography.labelMedium,
    color: colors.error,
    fontFamily: fontFamily.bodySemiBold,
  },
  priceBadgeText: {
    ...typography.labelSmall,
    color: colors.white,
  },
  priceBadgeManaged: {
    top: spacing[12],
  },
  content: {
    padding: spacing[3],
    gap: spacing[2],
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[3],
  },
  title: {
    ...typography.titleMedium,
    color: colors.textPrimary,
    flex: 1,
  },
  dateText: {
    ...typography.labelLarge,
    color: colors.primary[700],
    textAlign: 'center',
    letterSpacing: 0.8,
  },
  datePill: {
    minWidth: 62,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[50],
    borderColor: colors.primary[100],
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  metaDot: {
    color: colors.neutral[400],
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    marginTop: 0,
  },
  cuposBlock: {
    flex: 1,
    gap: spacing[1],
  },
  cuposHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cuposLabel: {
    ...typography.labelSmall,
    color: colors.textSecondary,
  },
  cuposNumber: {
    ...typography.labelSmall,
    color: colors.primary[500],
    fontFamily: fontFamily.bodySemiBold,
  },
  progressBarBg: {
    height: 5,
    backgroundColor: '#F0EBE1',
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary[500],
    borderRadius: radius.full,
  },
  cuposText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  cuposUrgente: {
    color: colors.primary[600],
    fontFamily: fontFamily.bodySemiBold,
  },
  joinPill: {
    backgroundColor: colors.primary[500],
    borderRadius: radius.full,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  joinText: {
    ...typography.labelSmall,
    color: colors.white,
    fontFamily: fontFamily.bodySemiBold,
  },
});
