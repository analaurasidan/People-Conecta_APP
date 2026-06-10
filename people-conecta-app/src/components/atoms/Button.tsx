import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { colors, typography, spacing, radius } from '@/tokens';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
}: Props) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePressIn() {
    scale.value = withSpring(0.96, { damping: 15 });
  }

  function handlePressOut() {
    scale.value = withSpring(1, { damping: 15 });
  }

  function handlePress() {
    ReactNativeHapticFeedback.trigger('impactLight');
    onPress();
  }

  const containerStyle: ViewStyle[] = [
    styles.base,
    styles[`size_${size}`],
    styles[`variant_${variant}`],
    fullWidth ? styles.fullWidth : undefined,
    (disabled || loading) ? styles.disabled : undefined,
    style as ViewStyle,
  ].filter(Boolean) as ViewStyle[];

  const textStyle: TextStyle[] = [
    styles.label,
    styles[`label_${size}`],
    styles[`labelColor_${variant}`],
  ];

  return (
    <AnimatedTouchable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={1}
      style={[animStyle, containerStyle]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.white : colors.primary[500]}
        />
      ) : (
        <Text style={textStyle}>{label}</Text>
      )}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
  },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.45 },

  size_sm: { paddingVertical: spacing[2], paddingHorizontal: spacing[4], minHeight: 36 },
  size_md: { paddingVertical: spacing[3], paddingHorizontal: spacing[6], minHeight: 48 },
  size_lg: { paddingVertical: spacing[4], paddingHorizontal: spacing[8], minHeight: 56 },

  variant_primary:   { backgroundColor: colors.primary[500] },
  variant_secondary: { backgroundColor: colors.secondary[500] },
  variant_outline:   { backgroundColor: colors.transparent, borderWidth: 1.5, borderColor: colors.primary[500] },
  variant_ghost:     { backgroundColor: colors.transparent },

  label: { ...typography.labelLarge },
  label_sm: { fontSize: 13 },
  label_md: { fontSize: 15 },
  label_lg: { fontSize: 16 },

  labelColor_primary:   { color: colors.white },
  labelColor_secondary: { color: colors.white },
  labelColor_outline:   { color: colors.primary[500] },
  labelColor_ghost:     { color: colors.primary[500] },
});
