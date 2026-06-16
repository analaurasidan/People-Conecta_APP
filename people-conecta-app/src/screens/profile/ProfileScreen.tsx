import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MapPin } from 'phosphor-react-native/lib/commonjs/icons/MapPin';
import { Plant } from 'phosphor-react-native/lib/commonjs/icons/Plant';
import { SignOut } from 'phosphor-react-native/lib/commonjs/icons/SignOut';
import { UserCircle } from 'phosphor-react-native/lib/commonjs/icons/UserCircle';
import { colors, typography, spacing, radius, shadow } from '@/tokens';
import { useAuthStore } from '@/store/authStore';
import { signOut } from '@/services/auth';
import { RootStackParams } from '@/navigation/types';
import CategoryIcon from '@/components/atoms/CategoryIcon';

type Nav = NativeStackNavigationProp<RootStackParams>;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const { profile } = useAuthStore();

  if (!profile) return null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + spacing[8] }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing[4] }]}>
        <View style={styles.profileIcon}>
          <UserCircle color={colors.primary[600]} size={42} weight="regular" />
        </View>
        <Text style={styles.name}>{profile.nombre}</Text>
        <View style={styles.locationRow}>
          <MapPin color={colors.primary[500]} size={16} weight="bold" />
          <Text style={styles.location}>{profile.ciudad} · {profile.zona}</Text>
        </View>
        {profile.rating_promedio && (
          <Text style={styles.rating}>⭐ {profile.rating_promedio.toFixed(1)} promedio</Text>
        )}
      </View>

      {/* Intereses */}
      {profile.intereses?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mis intereses</Text>
          <View style={styles.chips}>
            {profile.intereses.map(i => (
              <View key={i} style={styles.interestChip}>
                <CategoryIcon category={i} color={colors.primary[600]} size={15} weight="bold" />
                <Text style={styles.interestText}>{i}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Plan */}
      <View style={styles.planCard}>
        <View style={styles.planTierRow}>
          <Plant color={colors.primary[600]} size={18} weight="bold" />
          <Text style={styles.planTier}>
            {profile.plan_tier === 'premium' ? 'Plan Plus' : 'Plan Free'}
          </Text>
        </View>
        {profile.plan_tier === 'free' && (
          <Text style={styles.planUpgrade}>
            Pasate a Plus para planes ilimitados y prioridad en cupos
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.onboardingBtn}
        onPress={() => navigation.navigate('OnboardingPreview')}
      >
        <Text style={styles.onboardingText}>Ver onboarding demo</Text>
      </TouchableOpacity>

      {/* Cerrar sesión */}
      <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
        <SignOut color={colors.error} size={18} weight="regular" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    alignItems: 'center', paddingHorizontal: spacing[6],
    paddingBottom: spacing[6], gap: spacing[2],
    backgroundColor: colors.surface, borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  profileIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { ...typography.headlineSmall, color: colors.textPrimary },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  location: { ...typography.bodyMedium, color: colors.textSecondary },
  rating: { ...typography.bodyMedium, color: colors.textSecondary },
  section: { padding: spacing[6], gap: spacing[3] },
  sectionTitle: { ...typography.titleSmall, color: colors.textPrimary },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
    marginRight: spacing[2],
    marginBottom: spacing[2],
  },
  interestText: {
    ...typography.labelMedium,
    color: colors.primary[600],
  },
  planCard: {
    margin: spacing[4],
    padding: spacing[4],
    backgroundColor: colors.primary[50],
    borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.primary[100],
    gap: spacing[2],
    ...shadow.sm,
  },
  planTierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  planTier: { ...typography.titleSmall, color: colors.primary[600] },
  planUpgrade: { ...typography.bodySmall, color: colors.textSecondary },
  onboardingBtn: {
    marginHorizontal: spacing[4],
    marginTop: spacing[1],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.primary[100],
    backgroundColor: colors.surface,
    alignSelf: 'flex-start',
  },
  onboardingText: { ...typography.labelMedium, color: colors.primary[500] },
  logoutBtn: {
    marginHorizontal: spacing[4],
    marginTop: spacing[2],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    backgroundColor: colors.surface,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  logoutText: { ...typography.bodyMedium, color: colors.error },
});
