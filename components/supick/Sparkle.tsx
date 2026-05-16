import { View, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Shadows } from '@/constants/supick';

type Props = {
  color?: string;
  size?: number;
  glow?: boolean;
  glowAlpha?: number;
  style?: ViewStyle;
};

export function Sparkle({
  color = '#1E8A52',
  size = 24,
  glow = true,
  glowAlpha = 0.9,
  style,
}: Props) {
  return (
    <View style={[glow ? Shadows.glow(color, glowAlpha) : undefined, style]}>
      <Svg width={size} height={(size * 24) / 25} viewBox="0 0 25 24">
        <Path
          d="M 12.5 0 L 16.919 7.757 L 25 12 L 16.919 16.243 L 12.5 24 L 8.081 16.243 L 0 12 L 8.081 7.757 L 12.5 0 Z"
          fill={color}
        />
      </Svg>
    </View>
  );
}
