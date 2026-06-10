import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, radius, shadow } from '@/tokens';
import { useAuthStore } from '@/store/authStore';
import { signOut } from '@/services/auth';
import Avatar from '@/components/atoms/Avatar';
import Chip from '@/components/atoms/Chip';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
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
        <Avatar uri={profile.foto_url} name={profile.nombre} size="xl" />
        <Text style={styles.name}>{profile.nombre}</Text>
        <Text style={styles.location}>📍 {profile.ciudad} · {profile.zona}</Text>
        {profile.rating_promedio && (
          <Text style={styles.rating}>⭐ {profile.rating_promedio.toFixed(1)} promedio</Text>
        )}
      </View>

      {/* Intereses */}
      {profile.intereses?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mis intereses</Text>
          <View style={styles.chips}>
            {profile.intereses.map(i => <Chip key={i} label={i} selected />)}
          </View>
        </View>
      )}

      {/* Plan */}
      <View style={styles.planCard}>
        <Text style={styles.planTier}>
          {profile.plan_tier === 'premium' ? '⭐ Plan Plus' : '🌱 Plan Free'}
        </Text>
        {profile.plan_tier === 'free' && (
          <Text style={styles.planUpgrade}>
            Pasate a Plus para planes ilimitados y prioridad en cupos
          </Text>
        )}
      </View>

      {/* Cerrar sesión */}
      <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
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
  name: { ...typography.headlineSmall, color: colors.textPrimary },
  location: { ...typography.bodyMedium, color: colors.textSecondary },
  rating: { ...typography.bodyMedium, color: colors.textSecondary },
  section: { padding: spacing[6], gap: spacing[3] },
  sectionTitle: { ...typography.titleSmall, color: colors.textPrimary },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  planCard: {
    margin: spacing[4],
    padding: spacing[4],
    backgroundColor: colors.primary[50],
    borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.primary[100],
    gap: spacing[2],
    ...shadow.sm,
  },
  planTier: { ...typography.titleSmall, color: colors.primary[600] },
  planUpgrade: { ...typography.bodySmall, color: colors.textSecondary },
  logoutBtn: { margin: spacing[4], alignItems: 'center', padding: spacing[4] },
  logoutText: { ...typography.bodyMedium, color: colors.error },
});
