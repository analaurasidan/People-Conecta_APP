import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '@/tokens';
import { signOut } from '@/services/auth';
import Button from '@/components/atoms/Button';

export default function PendingApprovalScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing[16] }]}>
      <Text style={styles.emoji}>⏳</Text>
      <Text style={styles.title}>Estás en la lista</Text>
      <Text style={styles.body}>
        Revisamos cada perfil para asegurarnos de que People Conecta sea un espacio seguro y real.
        {'\n\n'}
        Vamos a aprobar tu cuenta en menos de 24 horas. Te avisamos por email cuando esté lista.
      </Text>
      <Button
        label="Cerrar sesión"
        onPress={signOut}
        variant="ghost"
        size="md"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colors.background,
    paddingHorizontal: spacing[8], alignItems: 'center', gap: spacing[6],
  },
  emoji: { fontSize: 64 },
  title: { ...typography.headlineSmall, color: colors.textPrimary, textAlign: 'center' },
  body: {
    ...typography.bodyLarge, color: colors.textSecondary,
    textAlign: 'center', lineHeight: 26,
  },
});
