declare module 'phosphor-react-native/lib/commonjs/icons/*' {
  import type React from 'react';

  export type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

  export type IconProps = {
    color?: string;
    size?: number | string;
    weight?: IconWeight;
  };

  export const CalendarBlank: React.ComponentType<IconProps>;
  export const CaretLeft: React.ComponentType<IconProps>;
  export const ChatCircleDots: React.ComponentType<IconProps>;
  export const Clock: React.ComponentType<IconProps>;
  export const DiceFive: React.ComponentType<IconProps>;
  export const ForkKnife: React.ComponentType<IconProps>;
  export const MagnifyingGlass: React.ComponentType<IconProps>;
  export const MapPin: React.ComponentType<IconProps>;
  export const MusicNote: React.ComponentType<IconProps>;
  export const Plant: React.ComponentType<IconProps>;
  export const Plus: React.ComponentType<IconProps>;
  export const SignOut: React.ComponentType<IconProps>;
  export const SlidersHorizontal: React.ComponentType<IconProps>;
  export const Sparkle: React.ComponentType<IconProps>;
  export const UserCircle: React.ComponentType<IconProps>;
  export const UsersThree: React.ComponentType<IconProps>;
  export const Waves: React.ComponentType<IconProps>;
}
