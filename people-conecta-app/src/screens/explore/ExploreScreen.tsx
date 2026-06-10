import React, { useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, radius, shadow } from '@/tokens';
import { deletePlan, getPlans } from '@/services/plans';
import { Plan } from '@/services/database.types';
import { useFiltersStore } from '@/store/filtersStore';
import { RootStackParams } from '@/navigation/types';
import EventCard from '@/components/molecules/EventCard';

type Nav = NativeStackNavigationProp<RootStackParams>;

const CATEGORIAS = [
  { label: 'Todos', value: null, icon: '✨' },
  { label: 'Deporte', value: 'Deporte', icon: '🏄' },
  { label: 'Música', value: 'Música', icon: '🎵' },
  { label: 'Idiomas', value: 'Idiomas', icon: '🗣️' },
  { label: 'Gastronomía', value: 'Gastronomía', icon: '🍳' },
  { label: 'Naturaleza', value: 'Naturaleza', icon: '🌿' },
  { label: 'Juegos', value: 'Juegos', icon: '🎲' },
];

const ZONAS = ['Playa Grande', 'Güemes', 'Varese', 'Centro'];
const GROUP_SIZES = [
  { label: 'Chico', value: 'small' as const, helper: '3-6' },
  { label: 'Mediano', value: 'medium' as const, helper: '7-12' },
  { label: 'Grande', value: 'large' as const, helper: '13+' },
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const queryClient = useQueryClient();
  const { filters, setFilters, clearFilters } = useFiltersStore();
  const [search, setSearch] = React.useState('');
  const [categoriaActiva, setCategoriaActiva] = React.useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const activeFilterCount = [
    filters.zona,
    filters.tamanoGrupo,
    filters.soloGratuitos,
  ].filter(Boolean).length;

  const { data: plans = [], isLoading, refetch } = useQuery({
    queryKey: ['plans', filters, categoriaActiva],
    queryFn: () => getPlans({ ...filters, categoria: categoriaActiva ?? undefined }),
  });

  const filtered = search
    ? plans.filter(p => p.nombre.toLowerCase().includes(search.toLowerCase()))
    : plans;

  const deleteMutation = useMutation({
    mutationFn: (planId: string) => deletePlan(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      queryClient.invalidateQueries({ queryKey: ['myPlans'] });
      refetch();
    },
  });

  function handleDeletePlan(plan: Plan) {
    deleteMutation.mutate(plan.id);
  }

  const renderItem = useCallback(({ item }: { item: Plan }) => (
    <EventCard
      plan={item}
      onPress={() => navigation.navigate('PlanDetail', { planId: item.id })}
      canManage={item.creator_id === 'demo_web_user' || item.id.startsWith('demo_created_')}
      onDelete={() => handleDeletePlan(item)}
    />
  ), [navigation, deleteMutation]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>Mar del Plata</Text>
          <Text style={styles.title}>Planes cerca tuyo</Text>
          <Text style={styles.subtitle}>Actividades reales para conocer gente en la calle.</Text>
          {Platform.OS === 'web' && (
            <TouchableOpacity
              style={styles.previewLink}
              onPress={() => navigation.navigate('OnboardingPreview')}
            >
              <Text style={styles.previewLinkText}>Ver onboarding demo</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => navigation.navigate('Main', { screen: 'Profile' })}
        >
          <Text style={styles.profileBtnText}>👤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar planes..."
          placeholderTextColor={colors.neutral[400]}
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={[styles.filterBtn, activeFilterCount > 0 && styles.filterBtnActive]} onPress={() => setFiltersOpen(true)}>
          <Text style={styles.filterIcon}>☷</Text>
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsScroll}
        contentContainerStyle={styles.chipsContent}
      >
        {CATEGORIAS.map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={() => setCategoriaActiva(item.value)}
            style={[styles.chip, categoriaActiva === item.value && styles.chipActive]}
          >
            <Text style={styles.chipIcon}>{item.icon}</Text>
            <Text style={[styles.chipText, categoriaActiva === item.value && styles.chipTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Próximos planes</Text>
        <Text style={styles.sectionCount}>{filtered.length} activos</Text>
      </View>

      <FlashList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={colors.primary[500]}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🌊</Text>
            <Text style={styles.emptyTitle}>No encontramos planes</Text>
            <Text style={styles.emptySubtitle}>
              Probá cambiar la búsqueda o creá el primer plan para activar la ciudad.
            </Text>
          </View>
        }
      />

      {filtersOpen && (
        <View style={styles.modalBackdrop}>
          <View style={styles.filtersPanel}>
            <View style={styles.filtersHeader}>
              <View>
                <Text style={styles.filtersTitle}>Filtros</Text>
                <Text style={styles.filtersSubtitle}>Encontrá un plan que encaje con vos</Text>
              </View>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setFiltersOpen(false)}>
                <Text style={styles.closeText}>×</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.filterSectionTitle}>Zona</Text>
            <View style={styles.optionGrid}>
              {ZONAS.map(zona => (
                <FilterChip
                  key={zona}
                  label={zona}
                  selected={filters.zona === zona}
                  onPress={() => setFilters({ ...filters, zona: filters.zona === zona ? undefined : zona })}
                />
              ))}
            </View>

            <Text style={styles.filterSectionTitle}>Tipo de grupo</Text>
            <View style={styles.optionGrid}>
              {GROUP_SIZES.map(size => (
                <FilterChip
                  key={size.value}
                  label={`${size.label} · ${size.helper}`}
                  selected={filters.tamanoGrupo === size.value}
                  onPress={() => setFilters({ ...filters, tamanoGrupo: filters.tamanoGrupo === size.value ? undefined : size.value })}
                />
              ))}
            </View>

            <Text style={styles.filterSectionTitle}>Tipo de encuentro</Text>
            <TouchableOpacity
              style={[styles.priceToggle, filters.soloGratuitos && styles.priceToggleActive]}
              onPress={() => setFilters({ ...filters, soloGratuitos: filters.soloGratuitos ? undefined : true })}
            >
              <Text style={[styles.priceToggleText, filters.soloGratuitos && styles.priceToggleTextActive]}>
                Mostrar solo planes gratuitos
              </Text>
            </TouchableOpacity>

            <View style={styles.filtersActions}>
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => {
                  clearFilters();
                  setCategoriaActiva(null);
                }}
              >
                <Text style={styles.clearText}>Limpiar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={() => setFiltersOpen(false)}>
                <Text style={styles.applyText}>Aplicar filtros</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

function FilterChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.filterChip, selected && styles.filterChipActive]} onPress={onPress}>
      <Text style={[styles.filterChipText, selected && styles.filterChipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    paddingTop: spacing[5],
    paddingBottom: spacing[3],
    gap: spacing[4],
  },
  headerCopy: {
    flex: 1,
    gap: spacing[1],
  },
  eyebrow: {
    ...typography.labelMedium,
    color: colors.primary[500],
    textTransform: 'uppercase',
  },
  title: {
    ...typography.headlineSmall,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    maxWidth: 280,
  },
  previewLink: {
    alignSelf: 'flex-start',
    marginTop: spacing[2],
    backgroundColor: '#F0EBE1',
    borderWidth: 1,
    borderColor: '#E8DDC7',
    borderRadius: radius.full,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  previewLinkText: {
    ...typography.labelMedium,
    color: colors.primary[500],
    fontFamily: 'DMSans-SemiBold',
  },
  profileBtn: {
    backgroundColor: colors.surface,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EDE3CC',
    ...shadow.sm,
  },
  profileBtnText: {
    fontSize: 20,
    lineHeight: 24,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingHorizontal: spacing[5],
    marginBottom: spacing[3],
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    ...typography.bodyMedium,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: '#EDE3CC',
    minHeight: 44,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#EDE3CC',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  filterBtnActive: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  filterIcon: {
    fontSize: 20,
    color: colors.textPrimary,
  },
  filterBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  filterBadgeText: {
    ...typography.labelSmall,
    color: colors.white,
    lineHeight: 14,
  },
  chipsContent: {
    paddingLeft: spacing[5],
    paddingRight: spacing[5],
    paddingBottom: spacing[2],
    gap: spacing[2],
    alignItems: 'center',
  },
  chipsScroll: {
    minHeight: 40,
    maxHeight: 40,
    marginBottom: spacing[2],
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: 999,
    borderWidth: 0,
    borderColor: '#EDE3CC',
    backgroundColor: '#F0EBE1',
  },
  chipActive: {
    backgroundColor: colors.primary[500],
  },
  chipIcon: {
    fontSize: 16,
  },
  chipText: {
    ...typography.labelMedium,
    color: '#4A4138',
  },
  chipTextActive: {
    color: colors.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    marginBottom: spacing[2],
  },
  sectionTitle: {
    ...typography.titleMedium,
    color: colors.textPrimary,
  },
  sectionCount: {
    ...typography.labelMedium,
    color: colors.textSecondary,
  },
  listContent: {
    paddingTop: spacing[2],
    paddingBottom: spacing[16],
  },
  empty: {
    alignItems: 'center',
    paddingTop: spacing[12],
    paddingHorizontal: spacing[8],
    gap: spacing[2],
  },
  emptyIcon: {
    fontSize: 36,
  },
  emptyTitle: {
    ...typography.titleMedium,
    color: colors.textPrimary,
  },
  emptySubtitle: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(46, 40, 34, 0.28)',
    justifyContent: 'flex-end',
    zIndex: 20,
  },
  filtersPanel: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: spacing[5],
    gap: spacing[4],
    borderWidth: 1,
    borderColor: '#E8DDC7',
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing[3],
  },
  filtersTitle: { ...typography.headlineSmall, color: colors.textPrimary },
  filtersSubtitle: { ...typography.bodySmall, color: colors.textSecondary },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0EBE1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: { fontSize: 24, color: colors.textPrimary, lineHeight: 28 },
  filterSectionTitle: {
    ...typography.labelLarge,
    color: '#4A3E2B',
    textTransform: 'uppercase',
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  filterChip: {
    backgroundColor: '#F0EBE1',
    borderRadius: radius.full,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  filterChipActive: { backgroundColor: colors.primary[500] },
  filterChipText: { ...typography.labelMedium, color: '#4A3E2B' },
  filterChipTextActive: { color: colors.white },
  priceToggle: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E8DDC7',
    borderRadius: radius.md,
    padding: spacing[3],
  },
  priceToggleActive: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  priceToggleText: { ...typography.labelLarge, color: colors.textPrimary },
  priceToggleTextActive: { color: colors.primary[500] },
  filtersActions: {
    flexDirection: 'row',
    gap: spacing[3],
    marginTop: spacing[2],
  },
  clearBtn: {
    flex: 1,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#E8DDC7',
    alignItems: 'center',
    paddingVertical: spacing[3],
  },
  clearText: { ...typography.labelLarge, color: colors.textSecondary },
  applyBtn: {
    flex: 1,
    borderRadius: radius.full,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    paddingVertical: spacing[3],
  },
  applyText: { ...typography.labelLarge, color: colors.white },
});
