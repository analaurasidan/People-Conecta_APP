import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, radius, fontFamily } from '@/tokens';
import { signInWithEmail } from '@/services/auth';
import { createDemoProfile } from '@/services/demoProfile';
import { useAuthStore } from '@/store/authStore';
import { AuthStackParams } from '@/navigation/types';
import Button from '@/components/atoms/Button';
import PeopleConectaLogo from '@/components/atoms/PeopleConectaLogo';

type Nav = NativeStackNavigationProp<AuthStackParams>;

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setProfile = useAuthStore((state) => state.setProfile);

  async function handleEmailLogin() {
    if (!email || !password) return;
    setLoading(true);
    try {
      await signInWithEmail(email.trim(), password);
    } catch (e: any) {
      Alert.alert('Error al iniciar sesión', e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleDemoLogin() {
    setProfile(createDemoProfile());
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <View style={styles.logoArea}>
          <PeopleConectaLogo variant="horizontal" tone="color" width={260} />
          <Text style={styles.tagline}>Planes reales para conocer gente en tu ciudad</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Entrá a tu comunidad</Text>
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
            placeholder="Contraseña"
            placeholderTextColor={colors.neutral[400]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            label="Entrar"
            onPress={handleEmailLogin}
            loading={loading}
            fullWidth
            size="lg"
          />
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>o</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.demoButton} onPress={handleDemoLogin}>
          <Text style={styles.demoButtonText}>Entrar en modo demo</Text>
        </TouchableOpacity>
        <Text style={styles.demoHelper}>
          Para probar la app sin Apple, código por email ni aprobación manual.
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.registerLink}
        >
          <Text style={styles.registerText}>
            ¿No tenés cuenta?{' '}
            <Text style={styles.registerBold}>Registrate</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding')}
          style={styles.registerLink}
        >
          <Text style={styles.demoLink}>Probar onboarding</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: {
    flex: 1,
    paddingHorizontal: spacing[6],
    justifyContent: 'center',
    gap: spacing[6],
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  logoArea: { alignItems: 'center', gap: spacing[3], marginBottom: spacing[2] },
  tagline: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
  },
  form: {
    gap: spacing[3],
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: spacing[5],
    borderWidth: 1,
    borderColor: '#EDE3CC',
  },
  formTitle: {
    ...typography.titleMedium,
    color: colors.textPrimary,
    marginBottom: spacing[1],
  },
  input: {
    backgroundColor: '#F9F6F0',
    borderWidth: 1,
    borderColor: '#EDE3CC',
    borderRadius: radius.lg,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    ...typography.bodyMedium,
    color: colors.textPrimary,
    minHeight: 52,
  },
  divider: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], paddingHorizontal: spacing[2] },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#EDE3CC' },
  dividerText: { ...typography.bodySmall, color: colors.textSecondary },
  demoButton: {
    height: 52,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    backgroundColor: colors.secondary[500],
  },
  demoButtonText: { ...typography.labelLarge, color: colors.white, fontFamily: fontFamily.bodySemiBold },
  demoHelper: { ...typography.bodySmall, color: colors.textSecondary, textAlign: 'center' },
  registerLink: { alignItems: 'center' },
  registerText: { ...typography.bodyMedium, color: colors.textSecondary },
  registerBold: { color: colors.primary[500], fontFamily: fontFamily.bodySemiBold },
  demoLink: { ...typography.labelLarge, color: colors.primary[500] },
});
