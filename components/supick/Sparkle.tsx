import { Platform, View, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { alphaHex } from '@/constants/supick';

type Props = {
  color?: string;
  size?: number;
  glow?: boolean;
  glowAlpha?: number;
  style?: ViewStyle;
};

/**
 * 4-point 별 모양 sparkle. 카테고리 색상으로 채우고 같은 색 glow.
 *
 * Glow 처리:
 * - 웹: CSS `filter: drop-shadow()` — alpha 채널 (별 모양) 따라 그림자가 생성됨.
 *   기존엔 boxShadow 를 썼는데 View 의 사각형 bounding box 에 적용돼서
 *   별 밖으로 사각 halo 가 보이는 버그가 있었음.
 * - 네이티브: glow 없음 (드물게 쓰이는 경우 SVG <Filter>+<FeDropShadow> 로 보강 가능)
 */
export function Sparkle({
  color = '#1E8A52',
  size = 24,
  glow = true,
  glowAlpha = 0.9,
  style,
}: Props) {
  const dropShadow =
    Platform.OS === 'web' && glow
      ? ({
          // 모양을 따라가는 그림자 — sparkle 의 star shape 만 빛남
          filter: `drop-shadow(0 0 ${Math.max(size * 0.3, 4)}px ${alphaHex(
            color,
            glowAlpha,
          )})`,
        } as object)
      : undefined;

  return (
    <View style={[dropShadow, style]}>
      <Svg width={size} height={(size * 24) / 25} viewBox="0 0 25 24">
        <Path
          d="M 12.5 0 L 16.919 7.757 L 25 12 L 16.919 16.243 L 12.5 24 L 8.081 16.243 L 0 12 L 8.081 7.757 L 12.5 0 Z"
          fill={color}
        />
      </Svg>
    </View>
  );
}
