import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, radius } from '@/tokens';
import { signUpWithEmail } from '@/services/auth';
import { createDemoProfile } from '@/services/demoProfile';
import { useAuthStore } from '@/store/authStore';
import { AuthStackParams } from '@/navigation/types';
import Button from '@/components/atoms/Button';

type Nav = NativeStackNavigationProp<AuthStackParams>;

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setProfile = useAuthStore((state) => state.setProfile);

  async function handleRegister() {
    setError('');

    if (!email.trim()) {
      setError('Ingresá un email para crear tu cuenta.');
      return;
    }

    if (!password) {
      setError('Elegí una contraseña para continuar.');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setLoading(true);
    try {
      if (Platform.OS === 'web') {
        navigation.navigate('Onboarding');
        return;
      }

      await signUpWithEmail(email.trim(), password);
      navigation.navigate('VerifyEmail', { email: email.trim() });
    } catch (e: any) {
      setError(e.message ?? 'No pudimos crear la cuenta. Probá de nuevo.');
      Alert.alert('Error al registrarse', e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleDemoRegister() {
    setProfile(createDemoProfile());
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <View style={styles.inner}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>
          Revisamos cada perfil antes de aprobarlo para garantizar una comunidad segura.
        </Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.neutral[400]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña (mín. 8 caracteres)"
            placeholderTextColor={colors.neutral[400]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {!!error && <Text style={styles.errorText}>{error}</Text>}
          <Button label="Continuar" onPress={handleRegister} loading={loading} fullWidth size="lg" />
          <TouchableOpacity style={styles.demoButton} onPress={handleDemoRegister}>
            <Text style={styles.demoButtonText}>Entrar sin verificar email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing[6] },
  backBtn: { marginTop: spacing[2], marginBottom: spacing[4] },
  backText: { ...typography.bodyMedium, color: colors.primary[500] },
  inner: { gap: spacing[6] },
  title: { ...typography.headlineSmall, color: colors.textPrimary },
  subtitle: { ...typography.bodyMedium, color: colors.textSecondary, lineHeight: 22 },
  form: { gap: spacing[3] },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: radius.md,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    ...typography.bodyMedium,
    color: colors.textPrimary,
    minHeight: 52,
  },
  errorText: { ...typography.bodySmall, color: '#B42318' },
  demoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderRadius: radius.full,
    backgroundColor: colors.secondary[500],
    paddingHorizontal: spacing[4],
  },
  demoButtonText: { ...typography.labelLarge, color: colors.white },
});
