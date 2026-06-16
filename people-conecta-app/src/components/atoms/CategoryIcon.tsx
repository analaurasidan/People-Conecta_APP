import React from 'react';
import { ChatCircleDots } from 'phosphor-react-native/lib/commonjs/icons/ChatCircleDots';
import { DiceFive } from 'phosphor-react-native/lib/commonjs/icons/DiceFive';
import { ForkKnife } from 'phosphor-react-native/lib/commonjs/icons/ForkKnife';
import { MusicNote } from 'phosphor-react-native/lib/commonjs/icons/MusicNote';
import { Plant } from 'phosphor-react-native/lib/commonjs/icons/Plant';
import { Sparkle } from 'phosphor-react-native/lib/commonjs/icons/Sparkle';
import { Waves } from 'phosphor-react-native/lib/commonjs/icons/Waves';

type Props = {
  category?: string | null;
  color: string;
  size?: number;
  weight?: IconWeight;
};

type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

type PhosphorIcon = React.ComponentType<{
  color?: string;
  size?: number | string;
  weight?: IconWeight;
}>;

const ICON_BY_CATEGORY: Record<string, PhosphorIcon> = {
  Todos: Sparkle,
  Deporte: Waves,
  Música: MusicNote,
  Idiomas: ChatCircleDots,
  Gastronomía: ForkKnife,
  Cocina: ForkKnife,
  Naturaleza: Plant,
  Juegos: DiceFive,
  Social: Sparkle,
  Arte: Sparkle,
};

export default function CategoryIcon({
  category = 'Todos',
  color,
  size = 18,
  weight = 'regular',
}: Props) {
  const IconComponent = ICON_BY_CATEGORY[category ?? 'Todos'] ?? Sparkle;
  return <IconComponent color={color} size={size} weight={weight} />;
}
