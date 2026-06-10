import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { colors, typography, spacing, radius } from '@/tokens';
import { verifyOTP } from '@/services/auth';
import { AuthStackParams } from '@/navigation/types';
import Button from '@/components/atoms/Button';

type Route = RouteProp<AuthStackParams, 'VerifyEmail'>;

export default function VerifyEmailScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<Route>();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    if (code.length < 6) return;
    setLoading(true);
    try {
      await verifyOTP(route.params.email, code);
      // Auth listener en useAuth redirigirá al onboarding
    } catch (e: any) {
      Alert.alert('Código incorrecto', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing[8] }]}>
      <Text style={styles.title}>Verificá tu email</Text>
      <Text style={styles.subtitle}>
        Te enviamos un código de 6 dígitos a{'\n'}
        <Text style={styles.email}>{route.params.email}</Text>
      </Text>

      <TextInput
        style={styles.codeInput}
        placeholder="000000"
        placeholderTextColor={colors.neutral[300]}
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        maxLength={6}
        textAlign="center"
      />

      <Button label="Verificar" onPress={handleVerify} loading={loading} fullWidth size="lg" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colors.background,
    paddingHorizontal: spacing[6], gap: spacing[6],
  },
  title: { ...typography.headlineSmall, color: colors.textPrimary },
  subtitle: { ...typography.bodyMedium, color: colors.textSecondary, lineHeight: 22 },
  email: { fontFamily: 'DMSans-SemiBold', color: colors.textPrimary },
  codeInput: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.primary[200],
    borderRadius: radius.md,
    paddingVertical: spacing[5],
    fontSize: 32,
    fontFamily: 'JetBrainsMono-Regular',
    color: colors.textPrimary,
    letterSpacing: 16,
  },
});
