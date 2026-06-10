import React from 'react';
import { Pressable, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

export enum AppleAuthenticationScope {
  FULL_NAME = 0,
  EMAIL = 1,
}

export enum AppleAuthenticationButtonType {
  SIGN_IN = 0,
  CONTINUE = 1,
  SIGN_UP = 2,
}

export enum AppleAuthenticationButtonStyle {
  WHITE = 0,
  WHITE_OUTLINE = 1,
  BLACK = 2,
}

export async function isAvailableAsync() {
  return false;
}

export async function signInAsync() {
  const error = new Error('Sign in with Apple is not available on web.');
  (error as Error & { code?: string }).code = 'ERR_UNAVAILABLE';
  throw error;
}

type AppleAuthenticationButtonProps = {
  buttonType?: AppleAuthenticationButtonType;
  buttonStyle?: AppleAuthenticationButtonStyle;
  cornerRadius?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function AppleAuthenticationButton({
  cornerRadius = 8,
  onPress,
  style,
}: AppleAuthenticationButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.button, { borderRadius: cornerRadius }, style]}
    >
      <Text style={styles.text}>Sign in with Apple</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
