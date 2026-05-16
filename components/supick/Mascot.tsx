import { Image } from 'expo-image';
import { Text, View, type ViewStyle } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

import { Fonts, Palette } from '@/constants/supick';

export type MascotPose = 'standing' | 'studying' | 'portal';
export type MascotPosition = 'bottomRight' | 'right' | 'bottomLeft' | 'centerRight';

export const MASCOT_SOURCES = {
  standing: require('@/assets/supick/mascot-wizard-standing.png'),
  studying: require('@/assets/supick/mascot-wizard-studying.png'),
  portal: require('@/assets/supick/mascot-wizard-portal.png'),
};

type Props = {
  pose?: MascotPose;
  speech?: string | null;
  position?: MascotPosition;
  size?: number;
};

export function Mascot({
  pose = 'standing',
  speech,
  position = 'bottomRight',
  size = 280,
}: Props) {
  const positionStyle: ViewStyle = (
    {
      bottomRight: { right: 0, bottom: 0 },
      right: { right: 0, top: 220 },
      bottomLeft: { left: 40, bottom: 0 },
      centerRight: { right: 40, top: '50%', marginTop: -size / 2 },
    } as const
  )[position];

  return (
    <View
      style={[
        { position: 'absolute', zIndex: 10, pointerEvents: 'none' },
        positionStyle,
      ]}
    >
      {speech ? (
        <View
          style={{
            position: 'absolute',
            bottom: size * 0.7,
            right: size * 0.6,
            backgroundColor: Palette.white,
            borderWidth: 1.5,
            borderColor: Palette.black,
            borderRadius: 18,
            paddingVertical: 12,
            paddingHorizontal: 18,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.display,
              fontSize: 17,
              color: Palette.black,
              lineHeight: 20,
            }}
          >
            {speech}
          </Text>
          {/* 삼각 꼬리 외곽 (검정) — 마스코트 쪽을 가리킴 */}
          <View
            style={{
              position: 'absolute',
              right: -10,
              bottom: 14,
              width: 12,
              height: 16,
            }}
          >
            <Svg width={12} height={16} viewBox="0 0 12 16">
              <Polygon points="0,0 12,8 0,16" fill={Palette.black} />
            </Svg>
          </View>
          {/* 삼각 꼬리 내부 (흰색) — 외곽보다 살짝 안쪽 + 작음 */}
          <View
            style={{
              position: 'absolute',
              right: -7,
              bottom: 16,
              width: 9,
              height: 12,
            }}
          >
            <Svg width={9} height={12} viewBox="0 0 9 12">
              <Polygon points="0,0 9,6 0,12" fill={Palette.white} />
            </Svg>
          </View>
        </View>
      ) : null}
      <Image
        source={MASCOT_SOURCES[pose]}
        style={{ width: size, height: size }}
        contentFit="contain"
      />
    </View>
  );
}
