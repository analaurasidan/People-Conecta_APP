import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, radius } from '@/tokens';
import { CreatePlanStackParams } from './CreatePlanNavigator';
import Chip from '@/components/atoms/Chip';
import Button from '@/components/atoms/Button';

const CATEGORIAS = ['Deporte', 'Arte', 'Música', 'Gastronomía', 'Naturaleza', 'Juegos', 'Viajes', 'Social'];
type Nav = NativeStackNavigationProp<CreatePlanStackParams>;

export default function Step1NameCategory() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const canContinue = nombre.length >= 5 && categoria && descripcion.length >= 10;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={[styles.inner, { paddingBottom: insets.bottom + 120 }]}>
        <Text style={styles.label}>Nombre del plan *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Fútbol 5 en la playa"
          placeholderTextColor={colors.neutral[400]}
          value={nombre}
          onChangeText={setNombre}
          maxLength={60}
        />
        <Text style={styles.counter}>{nombre.length}/60</Text>

        <Text style={styles.label}>Categoría *</Text>
        <View style={styles.chips}>
          {CATEGORIAS.map(c => (
            <Chip
              key={c}
              label={c}
              selected={categoria === c}
              onPress={() => setCategoria(c)}
            />
          ))}
        </View>

        <Text style={styles.label}>Descripción *</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Contá de qué se trata, qué van a hacer, qué llevar..."
          placeholderTextColor={colors.neutral[400]}
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
          maxLength={200}
        />
        <Text style={styles.counter}>{descripcion.length}/200</Text>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing[4] }]}>
        <Button
          label="Siguiente →"
          onPress={() => navigation.navigate('Step2', { nombre, categoria, descripcion })}
          disabled={!canContinue}
          fullWidth size="lg"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: { padding: spacing[4], gap: spacing[1] },
  label: { ...typography.labelLarge, color: colors.textPrimary, marginBottom: spacing[2], marginTop: spacing[4] },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.neutral[200],
    borderRadius: radius.md,
    paddingHorizontal: spacing[4], paddingVertical: spacing[3],
    ...typography.bodyMedium, color: colors.textPrimary,
  },
  textarea: { minHeight: 100, textAlignVertical: 'top' },
  counter: { ...typography.bodySmall, color: colors.neutral[400], textAlign: 'right' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing[2] },
  footer: {
    padding: spacing[4], backgroundColor: colors.surface,
    borderTopWidth: 1, borderTopColor: colors.neutral[100],
  },
});
