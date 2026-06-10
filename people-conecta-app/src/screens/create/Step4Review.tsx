import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { colors, typography, spacing, radius, shadow } from '@/tokens';
import { createPlan } from '@/services/plans';
import { useAuthStore } from '@/store/authStore';
import { CreatePlanStackParams } from './CreatePlanNavigator';
import Button from '@/components/atoms/Button';
import { RootStackParams } from '@/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Route = RouteProp<CreatePlanStackParams, 'Step4'>;
type RootNav = NativeStackNavigationProp<RootStackParams>;

export default function Step4Review() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootNav>();
  const route = useRoute<Route>();
  const queryClient = useQueryClient();
  const { profile } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const p = route.params;
  const fechaLabel = new Date(p.fecha).toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  async function handlePublish() {
    if (!profile && Platform.OS !== 'web') return;
    setLoading(true);
    try {
      await createPlan({
        creator_id: profile?.id ?? 'demo_web_user',
        nombre: p.nombre,
        categoria: p.categoria,
        descripcion: p.descripcion,
        zona: p.zona,
        fecha: p.fecha,
        hora: p.hora,
        cupo_max: p.cupoMax,
        cupo_actual: 0,
        es_gratuito: p.esGratuito,
        foto_url: p.fotoUrl ?? null,
        estado: 'publicado',
      });
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      Alert.alert(
        '¡Plan publicado! 🎉',
        'Tu plan ya está visible. Cuando alguien se sume te avisamos.',
        [{ text: 'Ver planes', onPress: () => navigation.navigate('Main', { screen: 'Explore' }) }]
      );
    } catch (e: any) {
      Alert.alert('Error al publicar', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.inner, { paddingBottom: insets.bottom + 120 }]}>
        <Text style={styles.title}>Revisá tu plan</Text>

        {p.fotoUrl && (
          <Image source={{ uri: p.fotoUrl }} style={styles.hero} contentFit="cover" />
        )}

        <View style={styles.card}>
          <Text style={styles.planNombre}>{p.nombre}</Text>
          <Text style={styles.detail}>📂 {p.categoria}</Text>
          <Text style={styles.detail}>📍 {p.zona}</Text>
          <Text style={styles.detail}>📅 {fechaLabel} a las {p.hora}</Text>
          <Text style={styles.detail}>👥 Hasta {p.cupoMax} personas</Text>
          <Text style={styles.detail}>{p.esGratuito ? '✅ Gratis' : '💰 Con costo'}</Text>
        </View>

        <Text style={styles.descTitle}>Descripción</Text>
        <Text style={styles.desc}>{p.descripcion}</Text>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            Al publicar confirmás que el plan respeta las normas de la comunidad. Planes con contenido inapropiado serán revisados.
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing[4] }]}>
        <Button label="Publicar plan" onPress={handlePublish} loading={loading} fullWidth size="lg" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: { padding: spacing[4], gap: spacing[4] },
  title: { ...typography.titleLarge, color: colors.textPrimary },
  hero: { height: 200, borderRadius: radius.lg },
  card: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing[4], gap: spacing[2], ...shadow.sm,
  },
  planNombre: { ...typography.titleLarge, color: colors.textPrimary, marginBottom: spacing[2] },
  detail: { ...typography.bodyMedium, color: colors.textSecondary },
  descTitle: { ...typography.titleSmall, color: colors.textPrimary },
  desc: { ...typography.bodyMedium, color: colors.textSecondary, lineHeight: 22 },
  disclaimer: {
    backgroundColor: colors.neutral[50], borderRadius: radius.md,
    padding: spacing[4], borderWidth: 1, borderColor: colors.neutral[200],
  },
  disclaimerText: { ...typography.bodySmall, color: colors.textSecondary },
  footer: {
    padding: spacing[4], backgroundColor: colors.surface,
    borderTopWidth: 1, borderTopColor: colors.neutral[100],
  },
});
