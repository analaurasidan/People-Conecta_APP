import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  LOGO_HORIZONTAL_COLOR,
  LOGO_HORIZONTAL_MONO,
  LOGO_HORIZONTAL_WHITE,
  LOGO_ISOTYPE,
} from '@/assets/brandSvg';

type Variant = 'isotype' | 'horizontal';
type Tone = 'color' | 'mono' | 'white';

type Props = {
  variant?: Variant;
  tone?: Tone;
  width?: number;
  height?: number;
};

const horizontalXml: Record<Tone, string> = {
  color: LOGO_HORIZONTAL_COLOR,
  mono: LOGO_HORIZONTAL_MONO,
  white: LOGO_HORIZONTAL_WHITE,
};

export default function PeopleConectaLogo({
  variant = 'horizontal',
  tone = 'color',
  width,
  height,
}: Props) {
  const isIsotype = variant === 'isotype';
  const viewRatio = isIsotype ? 1 : 1600 / 600;
  const resolvedWidth = width ?? (isIsotype ? 72 : 260);
  const resolvedHeight = height ?? Math.round(resolvedWidth / viewRatio);
  const xml = isIsotype ? LOGO_ISOTYPE : horizontalXml[tone];

  return (
    <View style={[styles.frame, { width: resolvedWidth, height: resolvedHeight }]}>
      <SvgXml xml={xml} width="100%" height="100%" />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
