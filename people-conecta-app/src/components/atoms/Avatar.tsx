import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { colors, typography, radius } from '@/tokens';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeMap: Record<Size, number> = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };
const fontSizeMap: Record<Size, number> = { xs: 10, sm: 12, md: 14, lg: 16, xl: 22 };

type Props = {
  uri?: string | null;
  name?: string;
  size?: Size;
};

export default function Avatar({ uri, name, size = 'md' }: Props) {
  const dim = sizeMap[size];
  const initials = name
    ? name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
    : '?';

  return (
    <View style={[styles.container, { width: dim, height: dim, borderRadius: dim / 2 }]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: dim, height: dim, borderRadius: dim / 2 }}
          contentFit="cover"
        />
      ) : (
        <Text style={[styles.initials, { fontSize: fontSizeMap[size] }]}>{initials}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: {
    ...typography.labelMedium,
    color: colors.primary[600],
    fontFamily: 'DMSans-SemiBold',
  },
});
