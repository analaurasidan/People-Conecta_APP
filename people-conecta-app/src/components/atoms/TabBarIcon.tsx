import React from 'react';
import { CalendarBlank } from 'phosphor-react-native/lib/commonjs/icons/CalendarBlank';
import { MagnifyingGlass } from 'phosphor-react-native/lib/commonjs/icons/MagnifyingGlass';
import { Plus } from 'phosphor-react-native/lib/commonjs/icons/Plus';
import { UserCircle } from 'phosphor-react-native/lib/commonjs/icons/UserCircle';

const icons = {
  search: MagnifyingGlass,
  calendar: CalendarBlank,
  person: UserCircle,
  plus: Plus,
};

type Props = {
  name: keyof typeof icons;
  color: string;
  size: number;
  focused?: boolean;
};

export default function TabBarIcon({ name, color, size, focused = false }: Props) {
  const IconComponent = icons[name] ?? MagnifyingGlass;
  return <IconComponent color={color} size={size} weight={focused ? 'fill' : 'regular'} />;
}
