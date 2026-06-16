import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius } from '@/tokens';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function Chip({ label, selected = false, onPress }: Props) {
  function handlePress() {
    onPress?.();
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.chip, selected && styles.selected]}
      activeOpacity={0.75}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.neutral[300],
    backgroundColor: colors.surface,
    marginRight: spacing[2],
    marginBottom: spacing[2],
  },
  selected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  label: {
    ...typography.labelMedium,
    color: colors.textSecondary,
  },
  labelSelected: {
    color: colors.primary[600],
  },
});
