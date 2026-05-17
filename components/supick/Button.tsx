import type { ReactNode } from 'react';
import { Pressable, Text, type TextStyle, type ViewStyle } from 'react-native';

import { Fonts, FontSize, Palette, Radii, Shadows } from '@/constants/supick';

export type ButtonVariant = 'pill' | 'outline' | 'rect' | 'ghost' | 'ghost-active';

type Props = {
  variant?: ButtonVariant;
  children: ReactNode;
  onPress?: () => void;
  color?: string;
  style?: ViewStyle;
  disabled?: boolean;
  accessibilityLabel?: string;
};

type VariantStyle = { container: ViewStyle; text: TextStyle };

const variants: Record<ButtonVariant, VariantStyle> = {
  pill: {
    container: {
      height: 56,
      paddingHorizontal: 36,
      borderRadius: Radii.xl,
      backgroundColor: 'rgba(255,255,255,0.10)',
      ...Shadows.glassGlow(),
    },
    text: {
      fontFamily: Fonts.display,
      fontSize: FontSize.bodyLG,
      color: Palette.blue600,
      letterSpacing: 6,
    },
  },
  outline: {
    container: {
      height: 44,
      paddingHorizontal: 24,
      borderRadius: Radii.pill,
      backgroundColor: Palette.white,
      borderWidth: 1,
      borderColor: Palette.blue600,
    },
    text: {
      fontFamily: Fonts.display,
      fontSize: FontSize.body,
      color: Palette.blue600,
    },
  },
  rect: {
    container: {
      height: 47,
      paddingHorizontal: 20,
      borderRadius: Radii.sm,
      backgroundColor: 'rgba(96,169,255,0.18)',
      borderWidth: 1,
      borderColor: Palette.blue500,
      ...Shadows.glowBlue(),
    },
    text: {
      fontFamily: Fonts.display,
      fontSize: FontSize.bodyLG,
      color: Palette.black,
    },
  },
  ghost: {
    container: {
      height: 50,
      paddingHorizontal: 26,
      borderRadius: Radii.xl,
      backgroundColor: 'transparent',
    },
    text: {
      fontFamily: Fonts.display,
      fontSize: FontSize.body,
      color: Palette.black,
    },
  },
  'ghost-active': {
    container: {
      height: 50,
      paddingHorizontal: 26,
      borderRadius: Radii.xl,
      backgroundColor: 'rgba(255,255,255,0.10)',
      ...Shadows.glassGlow(),
    },
    text: {
      fontFamily: Fonts.display,
      fontSize: FontSize.body,
      color: Palette.black,
    },
  },
};

export function Button({
  variant = 'pill',
  children,
  onPress,
  color,
  style,
  disabled,
  accessibilityLabel,
}: Props) {
  const v = variants[variant];
  const autoLabel =
    accessibilityLabel ??
    (typeof children === 'string' ? children : undefined);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={autoLabel}
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.4 : 1,
          transform: [{ scale: pressed && !disabled ? 0.96 : 1 }],
        },
        v.container,
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text style={[v.text, color ? { color } : null]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
