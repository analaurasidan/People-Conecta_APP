import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, radius } from '@/tokens';
import { signInWithEmail, signInWithApple } from '@/services/auth';
import { AuthStackParams } from '@/navigation/types';
import Button from '@/components/atoms/Button';

type Nav = NativeStackNavigationProp<AuthStackParams>;

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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

  async function handleAppleLogin() {
    try {
      await signInWithApple();
    } catch (e: any) {
      if (e.code !== 'ERR_CANCELED') {
        Alert.alert('Error con Apple', e.message);
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <View style={styles.logoArea}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>PC</Text>
          </View>
          <Text style={styles.logoText}>People Conecta</Text>
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

        {Platform.OS !== 'web' && (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={radius.full}
            style={styles.appleBtn}
            onPress={handleAppleLogin}
          />
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.registerLink}
        >
          <Text style={styles.registerText}>
            ¿No tenés cuenta?{' '}
            <Text style={styles.registerBold}>Registrate</Text>
          </Text>
        </TouchableOpacity>

        {Platform.OS === 'web' && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Onboarding')}
            style={styles.registerLink}
          >
            <Text style={styles.demoLink}>Probar onboarding</Text>
          </TouchableOpacity>
        )}
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
  brandMark: {
    width: 68,
    height: 68,
    borderRadius: 24,
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: '#B3E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMarkText: {
    ...typography.titleLarge,
    color: colors.primary[700],
  },
  logoText: { ...typography.headlineLarge, color: colors.textPrimary },
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
  appleBtn: { height: 52, width: '100%' },
  registerLink: { alignItems: 'center' },
  registerText: { ...typography.bodyMedium, color: colors.textSecondary },
  registerBold: { color: colors.primary[500], fontFamily: 'DMSans-SemiBold' },
  demoLink: { ...typography.labelLarge, color: colors.primary[500] },
});
