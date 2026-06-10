import React from 'react';
import { Text } from 'react-native';

// Usando emoji como iconos placeholder hasta tener un icon set definido
const icons: Record<string, string> = {
  search:   '🔍',
  calendar: '📅',
  person:   '👤',
  plus:     '➕',
  back:     '←',
};

type Props = {
  name: keyof typeof icons;
  color: string;
  size: number;
};

export default function TabBarIcon({ name, size }: Props) {
  return (
    <Text style={{ fontSize: size - 4 }}>{icons[name] ?? '●'}</Text>
  );
}
