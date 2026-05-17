import { Platform, type ViewStyle } from 'react-native';

import { alphaHex } from './categories';

const native = (
  color: string,
  opacity: number,
  radius: number,
  offsetY = 0,
  elevation = 0,
): ViewStyle => ({
  shadowColor: color,
  shadowOpacity: opacity,
  shadowRadius: radius,
  shadowOffset: { width: 0, height: offsetY },
  elevation,
});

export const Shadows = {
  drop: (): ViewStyle =>
    Platform.OS === 'web'
      ? { boxShadow: '0 4px 4px rgba(0,0,0,0.25)' }
      : native('#000', 0.25, 4, 4, 3),

  dropSoft: (): ViewStyle =>
    Platform.OS === 'web'
      ? { boxShadow: '0 2px 5px rgba(0,0,0,0.5)' }
      : native('#000', 0.5, 5, 2, 2),

  dropBig: (): ViewStyle =>
    Platform.OS === 'web'
      ? { boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }
      : native('#000', 0.5, 40, 12, 12),

  glassGlow: (): ViewStyle =>
    Platform.OS === 'web'
      ? { boxShadow: '0 0 20px rgba(22,86,132,0.9)' }
      : native('#165684', 0.9, 20, 0, 10),

  glowBlue: (): ViewStyle =>
    Platform.OS === 'web'
      ? { boxShadow: '0 4px 4px rgba(26,91,168,0.85)' }
      : native('#1A5BA8', 0.85, 6, 4, 6),

  glow: (hex: string, alpha = 0.9): ViewStyle =>
    Platform.OS === 'web'
      ? { boxShadow: `0 0 20px ${alphaHex(hex, alpha)}` }
      : native(hex, alpha, 20, 0, 10),

  sticker: (): ViewStyle =>
    Platform.OS === 'web'
      ? { boxShadow: '2px 4px 12px rgba(0,0,0,0.28)' }
      : native('#000', 0.28, 12, 4, 5),

  innerRow: (): ViewStyle =>
    Platform.OS === 'web'
      ? { boxShadow: '0 2px 6px rgba(0,0,0,.05), inset 0 0 0 1px rgba(0,0,0,0.08)' }
      : native('#000', 0.08, 6, 2, 2),
} as const;
