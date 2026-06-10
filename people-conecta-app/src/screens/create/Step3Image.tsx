import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, radius } from '@/tokens';
import { pickImage, uploadPlanImage, generatePlanImageAI } from '@/services/images';
import { CreatePlanStackParams } from './CreatePlanNavigator';
import Button from '@/components/atoms/Button';

type Nav = NativeStackNavigationProp<CreatePlanStackParams>;
type Route = RouteProp<CreatePlanStackParams, 'Step3'>;

const AI_IMAGE_BY_CATEGORY: Record<string, string> = {
  Deporte: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=900',
  Arte: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=900',
  Música: 'https://images.unsplash.com/photo-1532509156689-d9d151c890f6?auto=format&fit=crop&q=80&w=900',
  Gastronomía: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=900',
  Naturaleza: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=900',
  Juegos: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=900',
  Viajes: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=900',
  Social: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=900',
};

export default function Step3Image() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const [fotoUrl, setFotoUrl] = useState<string | undefined>();
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiUsed, setAiUsed] = useState(false);

  async function handlePickImage() {
    const uri = await pickImage();
    if (!uri) return;
    setLoadingUpload(true);
    try {
      if (Platform.OS === 'web') {
        setFotoUrl(uri);
        return;
      }
      // Upload temporal — el plan ID definitivo se asigna en Step4 al crear
      const url = await uploadPlanImage(uri, `temp_${Date.now()}`);
      setFotoUrl(url);
    } catch (e: any) {
      Alert.alert('Error al subir la imagen', e.message);
    } finally {
      setLoadingUpload(false);
    }
  }

  async function handleGenerateAI() {
    if (aiUsed) {
      Alert.alert('Límite alcanzado', 'El plan free incluye 1 generación de imagen con IA.');
      return;
    }
    setLoadingAI(true);
    try {
      const url = Platform.OS === 'web'
        ? AI_IMAGE_BY_CATEGORY[route.params.categoria] ?? AI_IMAGE_BY_CATEGORY.Social
        : await generatePlanImageAI(route.params.categoria, route.params.descripcion);
      setFotoUrl(url);
      setAiUsed(true);
    } catch (e: any) {
      Alert.alert('Error al generar imagen', e.message);
    } finally {
      setLoadingAI(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.inner, { paddingBottom: insets.bottom + 120 }]}>
        <Text style={styles.title}>Imagen del plan</Text>
        <Text style={styles.subtitle}>
          Podés subir una foto real del lugar o usar una imagen sugerida por IA para publicar más rápido.
        </Text>

        {/* Preview */}
        <View style={styles.preview}>
          {fotoUrl ? (
            <Image source={{ uri: fotoUrl }} style={styles.previewImage} contentFit="cover" />
          ) : (
            <View style={styles.previewPlaceholder}>
              <Text style={styles.previewPlaceholderIcon}>🖼️</Text>
              <Text style={styles.previewPlaceholderText}>Elegí cómo querés mostrar tu plan</Text>
            </View>
          )}
        </View>

        {/* Opciones */}
        <View style={styles.options}>
          <TouchableOpacity style={styles.optionBtn} onPress={handlePickImage} disabled={loadingUpload}>
            <Text style={styles.optionTitle}>📁 Subir foto propia</Text>
            <Text style={styles.optionDesc}>Elegí una imagen de tu compu o celular. Ideal si querés mostrar el lugar real.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionBtn, aiUsed && styles.optionDisabled]}
            onPress={handleGenerateAI}
            disabled={loadingAI || aiUsed}
          >
            <Text style={styles.optionTitle}>✨ Generar con IA{aiUsed ? ' (usado)' : ''}</Text>
            <Text style={styles.optionDesc}>
              {aiUsed ? 'Ya elegiste una imagen sugerida' : 'Sugerida según categoría y descripción. Para el MVP web funciona como preview rápida.'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing[4] }]}>
        <Button
          label={fotoUrl ? 'Revisar plan →' : 'Saltar por ahora →'}
          onPress={() => navigation.navigate('Step4', { ...route.params, fotoUrl })}
          loading={loadingUpload || loadingAI}
          fullWidth size="lg"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: { padding: spacing[4], gap: spacing[4] },
  title: { ...typography.titleLarge, color: colors.textPrimary },
  subtitle: { ...typography.bodyMedium, color: colors.textSecondary },
  preview: { height: 200, borderRadius: radius.lg, overflow: 'hidden' },
  previewImage: { width: '100%', height: '100%' },
  previewPlaceholder: {
    flex: 1, backgroundColor: colors.neutral[100],
    alignItems: 'center', justifyContent: 'center',
    padding: spacing[4],
  },
  previewPlaceholderIcon: { fontSize: 36, marginBottom: spacing[2] },
  previewPlaceholderText: { ...typography.bodyMedium, color: colors.neutral[500], textAlign: 'center' },
  options: { gap: spacing[3] },
  optionBtn: {
    backgroundColor: colors.surface,
    borderWidth: 1.5, borderColor: colors.neutral[200],
    borderRadius: radius.lg,
    padding: spacing[4], gap: spacing[1],
  },
  optionDisabled: { opacity: 0.5 },
  optionTitle: { ...typography.titleSmall, color: colors.textPrimary },
  optionDesc: { ...typography.bodySmall, color: colors.textSecondary },
  footer: {
    padding: spacing[4], backgroundColor: colors.surface,
    borderTopWidth: 1, borderTopColor: colors.neutral[100],
  },
});
